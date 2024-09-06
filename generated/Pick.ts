import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const endpoints = makeApi([
  {
    method: "get",
    path: "/v4/picks/meta",
    alias: "getPicksMetaPageV4",
    requestFormat: "json",
    parameters: [
      {
        name: "authorization",
        type: "Header",
        schema: z.string().optional().default("<string>"),
      },
    ],
    response: z
      .object({
        poll: PollCardModel,
        stocks: z.array(FinanceCardModel).max(2),
        hasNew: z.boolean().default("<boolean>"),
      })
      .strict()
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z
          .object({})
          .partial()
          .strict()
          .passthrough()
          .default("<object>"),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z
          .object({})
          .partial()
          .strict()
          .passthrough()
          .default("<object>"),
      },
    ],
  },
]);

export const PickApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
