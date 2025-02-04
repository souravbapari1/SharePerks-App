import { OfferData } from "../../interface/offer";

import { client, UserAuthToken } from "../action";

export const loadOffers = async () => {
  const token = await UserAuthToken();
  const req = await client.get("/api/v1/offers").send<OfferData[]>(token);
  return req;
};

export const loadOfferById = async (id: string) => {
  const token = await UserAuthToken();
  const req = await client.get("/api/v1/offers/" + id).send<OfferData>(token);
  return req;
};

export const loadOfferByCategory = async (id: string) => {
  const token = await UserAuthToken();
  const req = await client
    .get("/api/v1/offers/category/" + id)
    .send<OfferData[]>(token);
  return req;
};

export const loadOfferByBroker = async (id: string) => {
  const token = await UserAuthToken();
  const req = await client
    .get("/api/v1/offers/broker/" + id)
    .send<OfferData[]>(token);
  return req;
};
