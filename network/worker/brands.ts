import { Brand } from "../../interface/feed";
import { client, UserAuthToken } from "../action";

export const loadBrands = async () => {
  const token = await UserAuthToken();
  const req = await client.get("/api/v1/brand").send<Brand[]>(token);
  return req;
};

export const loadBrand = async (id: string) => {
  const token = await UserAuthToken();
  const req = await client.get("/api/v1/brand/" + id).send<Brand>(token);
  return req;
};

export const searchBrand = async (query: string) => {
  const token = await UserAuthToken();
  const req = await client
    .get("/api/v1/brand/search/" + query)
    .send<Brand[]>(token);
  return req;
};
