import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const endpoints = makeApi([
  {
    method: "get",
    path: "/faqs",
    alias: "getFaqs",
    description: `FAQ들을 가져옵니다.`,
    requestFormat: "json",
    parameters: [
      {
        name: "type",
        type: "Query",
        schema: z
          .enum(["USER", "SERVICE", "PAYMENT"])
          .optional()
          .default("<string>"),
      },
    ],
    response: z
      .object({ faqs: z.array(FAQData).max(2) })
      .strict()
      .passthrough(),
  },
]);

export const FAQApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
