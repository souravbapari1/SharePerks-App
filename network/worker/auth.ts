import { client, UserAuthToken } from "../action";

export const authUser = async (mobile: number) => {
  const req = await client.post("/api/v1/auth").json({ mobile }).send<{
    status: boolean;
    message: string;
    user: {
      mobile: number;
    };
  }>();
  return req;
};

export const authUserResendOtp = async (mobile: number) => {
  const req = await client.post("/api/v1/auth/resend").json({ mobile }).send<{
    status: boolean;
    message: string;
    user: {
      mobile: number;
    };
  }>();
  return req;
};

export const authUserVerifyOtp = async (mobile: number, otp: number) => {
  const req = await client
    .post("/api/v1/auth/verify")
    .json({ mobile, otp })
    .send<{
      status: boolean;
      user: {
        _id: string;
        referCode: string;
        image: string;
        mobile: number;
        walletAmount: number;
        completeProfile: boolean;
        brokerConnected: boolean;
        role: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
        email: string;
        name: string;
      };
      token: string;
    }>();
  return req;
};

export const completeUserProfile = async ({
  email,
  name,
  referCode,
}: {
  name: string;
  email: string;
  referCode?: string;
}) => {
  const token = await UserAuthToken();
  const req = await client
    .post("/api/v1/auth/complete")
    .json({ email, name, referCode })
    .send<{
      _id: string;
      referCode: string;
      image: string;
      mobile: number;
      walletAmount: number;
      completeProfile: boolean;
      brokerConnected: boolean;
      role: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
      email: string;
      name: string;
      referByUser: string;
      referPaymentComplete: boolean;
    }>(token);
  return req;
};
