import { PayoutData } from "../../interface/payout";
import { client, UserAuthToken } from "../action";

export const requestPayout = async (data: {
  bank: string;
  amount: number;
  user: string;
}) => {
  const token = await UserAuthToken();
  const req = await client.post("/api/v1/payout").json(data).send<{
    status: boolean;
    message: string;
    data: PayoutData;
  }>(token);
  return req;
};

export const getUserPayouts = async (id: string) => {
  const token = await UserAuthToken();
  const req = await client
    .get("/api/v1/payout/" + id)
    .send<PayoutData[]>(token);
  return req;
};
