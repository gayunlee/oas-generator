import createClient from "openapi-fetch";
import { paths } from "./types";

const client = createClient<paths>({ baseUrl: "https://myapi.dev/v1/" });

export const getPicks = () => {
  return client.GET("/v2/picks/{pickId}/like", {
    params: {
      path: { post_id: "my-post" },
      query: { version: 2 },
    },
  });
};
