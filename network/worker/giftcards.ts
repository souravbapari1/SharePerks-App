import { GiftCardPaymentComplete } from "../../interface/cashfree";
import { GiftCardOffers } from "../../interface/giftcard";
import { WhoowCards } from "../../interface/whoowCard";
import { client, UserAuthToken } from "../action";

export const getGiftCards = async () => {
  const token = await UserAuthToken();
  const req = await client
    .get("/api/v1/giftcard")
    .send<GiftCardOffers[]>(token);
  return req;
};

export const getGiftCard = async (id: string) => {
  const token = await UserAuthToken();
  const req = await client
    .get("/api/v1/giftcard/" + id)
    .send<GiftCardOffers>(token);
  return req;
};

export const getGiftCardId = async (id: string) => {
  const token = await UserAuthToken();
  const req = await client
    .get("/api/v1/giftcard/code/" + id)
    .send<GiftCardPaymentComplete>(token);
  return req;
};

export const getMyGiftCards = async (id: string) => {
  const token = await UserAuthToken();
  const req = await client
    .get("/api/v1/giftcard/mycards/" + id)
    .send<GiftCardPaymentComplete[]>(token);
  return req;
};

export const getWhoowGiftCards = async () => {
  const token = await UserAuthToken();
  const req = await client
    .get("/api/v1/whoow/active")
    .send<WhoowCards[]>(token);
  return req;
};

export const getWhoowGiftCard = async (id: string) => {
  const token = await UserAuthToken();
  const req = await client.get("/api/v1/whoow/" + id).send<WhoowCards>(token);
  return req;
};
