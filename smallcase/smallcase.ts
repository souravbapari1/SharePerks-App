import SmallcaseGateway from "react-native-smallcase-gateway";
import { createJwt } from "./jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SC_GATEWAYNAME, SC_USER_CONNECT_TOKEN, SC_APISecret } from "./keys";
import axios from "axios";
import { importHoldings } from "../network/worker/user";
import * as LocalAuthentication from "expo-local-authentication";

export const ConfigSmallCaseENV = async () => {
  await SmallcaseGateway.setConfigEnvironment({
    isLeprechaun: false,
    isAmoEnabled: true,
    gatewayName: "shareperks",
    environmentName: "production",
    brokerList: [],
  });
  console.log("INIT SMALLCASE");
};

export const smallCaseProvideUserToken = async () => {
  const data = createJwt({ guest: true });
  await AsyncStorage.setItem(SC_USER_CONNECT_TOKEN, data.toString());
  const init = await SmallcaseGateway.init(data);
  console.log({ init });
  return data;
};

export const SmallcaseGatewayTriggerTransaction = async (
  transactionId: string
) => {
  const res = await SmallcaseGateway.triggerTransaction(transactionId);
  return res;
};

export const connectBroker = async () => {
  const localAuth = await LocalAuthentication.authenticateAsync({});

  if (!localAuth.success) {
    throw new Error("Local Authentication Failed");
  }

  const authtoken = await AsyncStorage.getItem(SC_USER_CONNECT_TOKEN);
  let data = JSON.stringify({
    intent: "CONNECT",
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://gatewayapi.smallcase.com/gateway/${SC_GATEWAYNAME}/transaction`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-gateway-authtoken": authtoken,
      "x-gateway-secret": SC_APISecret,
    },
    data: data,
  };
  try {
    const res = await axios.request(config);

    const resSC = await SmallcaseGatewayTriggerTransaction(
      res.data.data.transactionId
    );
    const smallcaseAuthToken = JSON.parse(
      resSC.data.toString()
    ).smallcaseAuthToken;



    const allHoldings = await fetchHoldings(smallcaseAuthToken);
    const userdata = await importHoldings(allHoldings.data);
    await AsyncStorage.setItem("lastConnect", new Date().toISOString());
    return userdata;
  } catch (error) {
    throw error;
  }
};

export const fetchHoldings = async (authtoken: string) => {
  let data = JSON.stringify({
    intent: "HOLDINGS_IMPORT",
    version: "v2",
    assetConfig: {
      mfHoldings: false,
    },
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://gatewayapi.smallcase.com/gateway/${SC_GATEWAYNAME}/transaction`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-gateway-authtoken": authtoken,
      "x-gateway-secret": SC_APISecret,
    },
    data: data,
  };
  try {
    const res = await axios.request(config);

    const resSC = await SmallcaseGatewayTriggerTransaction(
      res.data.data.transactionId
    );

    const resData: any =
      typeof resSC.data == "object" ? resSC.data : JSON.parse(resSC.data);

    const finalHoldings = await getHoldings(resData.smallcaseAuthToken);

    return finalHoldings;
  } catch (error: any) {
    console.log(
      "Error SmallCase Api on Try Fetch 'HOLDINGS_IMPORT' to gen transactionId in Stage 1",
      error?.response?.data
    );

    throw error;
  }
};

const getHoldings = async (authKey: string) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://gatewayapi.smallcase.com/v1/${SC_GATEWAYNAME}/engine/user/holdings?version=v2`,
      headers: {
        accept: "application/json",
        "x-gateway-authtoken": authKey,
        "x-gateway-secret": SC_APISecret,
      },
    };
    const res = await axios.request(config);
    return res.data;
  } catch (error: any) {
    console.log(
      "Error SmallCase Api on Final Fetch 'holdings' to gen transactionId in Stage 2",
      error?.response?.data
    );
    throw error;
  }
};
