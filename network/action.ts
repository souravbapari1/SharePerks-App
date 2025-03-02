import { NextClient } from "./request";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const client = new NextClient("https://api.shareperks.in");
// export const client = new NextClient("http://192.168.1.13:7565");

export async function UserAuthToken() {
  return {
    Authorization: "Bearer " + (await AsyncStorage.getItem("token")) || "",
  };
}

export async function getUserAuthToken() {
  return await AsyncStorage.getItem("token");
}

export async function setUserAuthToken(token: string) {
  return await AsyncStorage.setItem("token", token);
}
