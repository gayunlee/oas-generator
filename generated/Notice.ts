import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";






const endpoints = makeApi([
	{
		method: "get",
		path: "/notices",
		alias: "getNotices",
		description: `공지사항을 조회합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
		],
		response: z.object({ notices: z.array(NoticeMetadata).max(2) }).strict().passthrough(),
	},
]);

export const NoticeApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
