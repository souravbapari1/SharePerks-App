import { FeedData } from "../../interface/feed";
import { client, UserAuthToken } from "../action";

export const loadFeeds = async (user?: string) => {
  const token = await UserAuthToken();
  const req = await client
    .get("/api/v1/feed/" + user || "")
    .send<FeedData>(token);
  return req;
};
