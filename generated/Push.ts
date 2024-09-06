import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const subscribedTopicV3_Body = z
  .object({
    topic: PushTopicType.default("<string>"),
    deviceToken: z.string().default("<string>"),
    deviceType: DeviceTypeDto.default("<string>"),
    permissionStatus: PermissionStatusTypeDto.default("<string>"),
    deviceId: z.string().default("<string>"),
  })
  .strict()
  .passthrough();

export const schemas = {
  subscribedTopicV3_Body,
};

const endpoints = makeApi([
  {
    method: "put",
    path: "/v3/push/subscribe",
    alias: "subscribedTopicV3",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: subscribedTopicV3_Body,
      },
      {
        name: "authorization",
        type: "Header",
        schema: z.string().optional().default("<string>"),
      },
    ],
    response: z
      .object({
        didEventNotificationAgree: z.boolean().default(false),
        didMasterNotificationAgree: z.boolean().default(false),
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
    ],
  },
  {
    method: "put",
    path: "/v3/push/unsubscribe",
    alias: "unsubscribedTopicV3",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: subscribedTopicV3_Body,
      },
      {
        name: "authorization",
        type: "Header",
        schema: z.string().optional().default("<string>"),
      },
    ],
    response: z
      .object({
        didEventNotificationAgree: z.boolean().default(false),
        didMasterNotificationAgree: z.boolean().default(false),
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
    ],
  },
]);

export const PushApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
