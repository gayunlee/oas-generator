import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const endpoints = makeApi([
  {
    method: "get",
    path: "/admin/userJoinCount",
    alias: "AdminController_getUserJoinCount",
    requestFormat: "json",
    response: z.object({}).partial().strict().passthrough(),
  },
  {
    method: "get",
    path: "/admin/perchasedUserCount",
    alias: "AdminController_getPerchasedUserCount",
    requestFormat: "json",
    response: z.object({}).partial().strict().passthrough(),
  },
  {
    method: "get",
    path: "/admin/salesAmount",
    alias: "AdminController_getSalesAmount",
    requestFormat: "json",
    response: z.object({}).partial().strict().passthrough(),
  },
  {
    method: "get",
    path: "/v2/admin/salesAmount",
    alias: "AdminController_getSalesAmountV2",
    requestFormat: "json",
    response: z.object({}).partial().strict().passthrough(),
  },
  {
    method: "get",
    path: "/admin/purchased/safeAsset",
    alias: "AdminController_getPurchasedSafeAsset",
    requestFormat: "json",
    response: z.object({}).partial().strict().passthrough(),
  },
  {
    method: "get",
    path: "/admin/purchased/economicFreedom",
    alias: "AdminController_getPurchasedEconomicFreedom",
    requestFormat: "json",
    response: z.object({}).partial().strict().passthrough(),
  },
  {
    method: "get",
    path: "/v2/admin/userJoinCount",
    alias: "AdminController_getUserJoinCountV2",
    requestFormat: "json",
    response: z.object({}).partial().strict().passthrough(),
  },
]);

export const AdminApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
