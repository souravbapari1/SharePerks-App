import { CategoryData } from "../../interface/category";

import { client, UserAuthToken } from "../action";

export const loadCategories = async () => {
  const token = await UserAuthToken();
  const req = await client
    .get("/api/v1/categories")
    .send<CategoryData[]>(token);
  return req;
};

export const loadIdByCategory = async (id: string) => {
  const token = await UserAuthToken();
  const req = await client
    .get("/api/v1/categories/" + id)
    .send<CategoryData>(token);
  return req;
};
