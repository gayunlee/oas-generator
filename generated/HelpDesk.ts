import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";






const endpoints = makeApi([
	{
		method: "get",
		path: "/v2/helpDesk",
		alias: "getHelpDeskScreenV2",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ noticeCount: z.number().int().default(<integer>), kakaoOpenChat: z.string().default("<string>") }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/helpDesk/notices/:id",
		alias: "getNoticeScreenById",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string()
			},
		],
		response: z.object({ title: z.string().default("<string>"), desc: z.string().default("<string>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), creator: z.string().default("<string>") }).strict().passthrough(),
	},
]);

export const HelpDeskApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
