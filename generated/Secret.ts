import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";






const endpoints = makeApi([
	{
		method: "get",
		path: "/v4/series/:id",
		alias: "getSeriesScreenByIdV4",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string()
			},
			{
				name: "order",
				type: "Query",
				schema: z.enum(["episode", "latest"]).optional().default("<string>")
			},
			{
				name: "isRead",
				type: "Query",
				schema: z.boolean().optional().default("<boolean>")
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ coverImageUrl: z.string().default("<url>"), portraitUrl: z.string().default("<url>"), name: z.string().default("<string>"), creatorClubId: z.string().default("<string>"), rateCount: z.number().int().nullish().default(<integer>), title: z.string().default("<string>"), desc: z.string().default("<string>"), tierType: UserTierTypeDto.optional().default("<string>"), recommendationSeries: z.array(SeriesCardDto).max(2).nullish(), isScraped: z.boolean().default("<boolean>"), hasUnReadCount: z.number().int().default(<integer>), totalCount: z.number().int().default(<integer>), secrets: z.array(SecretBriefCardDtoV3).max(2) }).strict().passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
]);

export const SecretApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
