import { Bank } from "../../interface/bank";
import { CouponData } from "../../interface/coupon";
import { client, UserAuthToken } from "../action";

export const getBanks = async () => {
  const token = await UserAuthToken();
  const req = await client.get("/api/v1/bank").send<{ banks: Bank[] }>(token);
  return req;
};

export const createBank = async (data: {
  name: string;
  accountNumber: string;
  ifscCode: string;
}) => {
  const token = await UserAuthToken();
  const req = await client.post("/api/v1/bank").json(data).send<{
    status: boolean;
    message: string;
    bank: Bank;
    banks: Bank[];
  }>(token);
  return req;
};

export const updateBank = async (
  id: string,
  data: {
    name: string;
    accountNumber: string;
    ifscCode: string;
  }
) => {
  const token = await UserAuthToken();
  const req = await client
    .put("/api/v1/bank/" + id)
    .json(data)
    .send<{
      status: boolean;
      message: string;
      process: any;
      banks: Bank[];
    }>(token);
  return req;
};

export const deleteBank = async (id: string) => {
  const token = await UserAuthToken();
  const req = await client
    .delete("/api/v1/bank/" + id)
    .send<{ status: boolean; message: string }>(token);
  return req;
};
