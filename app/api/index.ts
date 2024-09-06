import { FeedApi, MeApi } from "@/generated";

export const getFeedList = () => {
  return FeedApi.getFeedMetaPageV4({
    headers: {
      authorization: "",
    },
  });
};

export const createMyContents = () => {
  return MeApi.postMyContents({});
};
