import { TransitionsData } from "../../interface/transitions";
import { client, UserAuthToken } from "../action";

export const getUserTransitions = async (id: string) => {
  const token = await UserAuthToken();
  const req = await client
    .get("/api/v1/transition/" + id)
    .send<TransitionsData[]>(token);
  return req;
};
