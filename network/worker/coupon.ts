import { CouponData } from "../../interface/coupon";
import { client, UserAuthToken } from "../action";

export const loadIdByCoupon = async (id: string) => {
  const token = await UserAuthToken();
  const req = await client.get("/api/v1/coupon/" + id).send<CouponData>(token);
  return req;
};
