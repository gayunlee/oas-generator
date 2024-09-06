import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const endpoints = makeApi([
  {
    method: "get",
    path: "/products/assets/android",
    alias: "getAssetProductsAndroid",
    requestFormat: "json",
    parameters: [
      {
        name: "authorization",
        type: "Header",
        schema: z.string().optional().default("<string>"),
      },
    ],
    response: z
      .object({ products: z.array(AssetsProduct).min(2).max(2) })
      .strict()
      .passthrough(),
    errors: [
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
  {
    method: "get",
    path: "/products/assets/ios",
    alias: "getAssetProductsIos",
    requestFormat: "json",
    parameters: [
      {
        name: "authorization",
        type: "Header",
        schema: z.string().optional().default("<string>"),
      },
    ],
    response: z
      .object({ products: z.array(AssetsProduct).min(2).max(2) })
      .strict()
      .passthrough(),
    errors: [
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
  {
    method: "get",
    path: "/products/memberships/android",
    alias: "getMembershipProductsAndroid",
    requestFormat: "json",
    parameters: [
      {
        name: "masterId",
        type: "Query",
        schema: z.string().default("<string>"),
      },
      {
        name: "authorization",
        type: "Header",
        schema: z.string().optional().default("<string>"),
      },
    ],
    response: z
      .object({
        masterId: z.string().default("<string>"),
        groupId: z.string().default("<string>"),
        groupName: z.string().default("<string>"),
        products: z.array(MembershipsProduct).min(2).max(2),
      })
      .strict()
      .passthrough(),
    errors: [
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
  {
    method: "get",
    path: "/v2/products/memberships/ios",
    alias: "getMembershipProductsIosV2",
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
        masterId: z.string().default("<string>"),
        groupId: z.string().default("<string>"),
        groupName: z.string().default("<string>"),
        products: z.array(MembershipsProduct).min(2).max(2),
      })
      .strict()
      .passthrough(),
    errors: [
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
  {
    method: "get",
    path: "/products/memberships/hecto",
    alias: "getMembershipProductsHecto",
    description: `헥토 멤버십 상품 리스트 조회`,
    requestFormat: "json",
    parameters: [
      {
        name: "authorization",
        type: "Header",
        schema: z.string().optional().default("<string>"),
      },
      {
        name: "masterId",
        type: "Query",
        schema: z.string().default("<string>"),
      },
      {
        name: "productGroupId",
        type: "Query",
        schema: z.string().default("<string>"),
      },
    ],
    response: z
      .object({
        masterId: z.string().default("<string>"),
        mchtId: z.string().default("<string>"),
        mchtName: z.string().default("<string>"),
        mchtEName: z.string().default("<string>"),
        products: z.array(membershipProductHectoModel).min(2).max(2).optional(),
      })
      .strict()
      .passthrough(),
    errors: [
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
  {
    method: "get",
    path: "/products/memberships/hecto/no-auth",
    alias: "getMembershipProductsHectoNoAuth",
    description: `헥토 멤버십 상품 리스트 조회 + 개인화된 데이터 제외`,
    requestFormat: "json",
    parameters: [
      {
        name: "masterId",
        type: "Query",
        schema: z.string().default("<string>"),
      },
      {
        name: "productGroupId",
        type: "Query",
        schema: z.string().default("<string>"),
      },
    ],
    response: z
      .object({
        masterId: z.string().default("<string>"),
        mchtId: z.string().default("<string>"),
        mchtName: z.string().default("<string>"),
        mchtEName: z.string().default("<string>"),
        products: z.array(membershipProductHectoModel).min(2).max(2).optional(),
      })
      .strict()
      .passthrough(),
    errors: [
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
  {
    method: "get",
    path: "/products/memberships/hecto/:mchtTrdNo",
    alias: "getMembershipProductDetailHecto",
    description: `헥토 멤버십 상품 상세 조회, 호출 시점에 결제 방식이 결정되어 있어야 함`,
    requestFormat: "json",
    parameters: [
      {
        name: "authorization",
        type: "Header",
        schema: z.string().optional().default("<string>"),
      },
      {
        name: "mchtTrdNo",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "method",
        type: "Query",
        schema: z.enum(["card", "corp", "unknown"]).default("<string>"),
      },
      {
        name: "cardGb",
        type: "Query",
        schema: z.string().default("<string>"),
      },
      {
        name: "corpPayCode",
        type: "Query",
        schema: z.string().default("<string>"),
      },
    ],
    response: z
      .object({
        mchtId: z.string().default("<string>"),
        method: HectoMethodType.default("<string>"),
        cardGb: HectoCardGBType.optional().default("<string>"),
        corpPayCode: HectoCorpPayCodeType.optional().default("<string>"),
        mchtName: z.string().default("<string>"),
        mchtEName: z.string().default("<string>"),
        notiUrl: z.string().default("<string>"),
        nextUrl: z.string().default("<string>"),
        cancUrl: z.string().default("<string>"),
        trdDt: z.string().default("<string>"),
        trdTm: z.string().default("<string>"),
        pktHash: z.string().default("<string>"),
        product: membershipProductHectoModel,
      })
      .strict()
      .passthrough(),
    errors: [
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

export const ProductsApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
