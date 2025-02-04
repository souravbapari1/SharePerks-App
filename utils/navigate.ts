import { Href, router } from "expo-router";

export const navigate = <T>({
  params,
  pathname,
  type = "push",
}: {
  pathname: Href<string | object>;
  params?: T;
  type?: "push" | "replace";
}): void => {
  const pageData = {
    pathname: pathname as any,
    params: {
      ...params,
    },
  };
  if (type == "push") {
    router.push(pageData);
  } else {
    router.replace(pageData);
  }
};
