import { UserData } from "../../interface/user";
import { client, UserAuthToken } from "../action";

export const getUser = async () => {
  const token = await UserAuthToken();
  const req = await client.get("/api/v1/user").send<UserData>(token);
  return req;
};

export const importHoldings = async (data: any) => {
  const token = await UserAuthToken();
  const req = await client
    .post("/api/v1/user/holdings")
    .json(data)
    .send<UserData>(token);
  return req;
};

export const updateProfile = async (data: any) => {
  const token = await UserAuthToken();
  const req = await client.put("/api/v1/user").json(data).send<UserData>(token);
  return req;
};
