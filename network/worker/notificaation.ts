import { NotificationData } from "../../interface/notifications";
import { client, UserAuthToken } from "../action";

export const loadNotification = async (id: string) => {
  const token = await UserAuthToken();
  const req = await client
    .get("/api/v1/user/notifications/" + id)
    .send<NotificationData[]>(token);
  return req.reverse;
};

export const deleteNotification = async (id: string) => {
  const token = await UserAuthToken();
  console.log(token);

  const req = await client
    .delete("/api/v1/user/notifications/" + id)
    .json({})
    .send<NotificationData[]>(token);

  return req;
};
