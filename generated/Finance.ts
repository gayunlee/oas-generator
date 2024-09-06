import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const endpoints = makeApi([
  {
    method: "get",
    path: "/indexes",
    alias: "getIndexesScreen",
    requestFormat: "json",
    parameters: [
      {
        name: "authorization",
        type: "Header",
        schema: z.string().optional().default("<string>"),
      },
    ],
    response: z
      .object({ indexes: z.array(IndexListTileModel).max(2) })
      .strict()
      .passthrough(),
  },
]);

export const FinanceApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
