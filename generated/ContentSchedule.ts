import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";






const endpoints = makeApi([
	{
		method: "get",
		path: "/content-schedules/target-date",
		alias: "getContentSchedulesTargetDate",
		description: `컨텐츠 일정들을 가져옵니다. 현재 시간 바로 이전, 바로 이후 컨텐츠를 하나씩 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "targetDate",
				type: "Query",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contentSchedules: z.array(ContentScheduleMetaData).min(2).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/content-schedules",
		alias: "getContentSchedules",
		description: `컨텐츠 일정들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "startAt",
				type: "Query",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "endAt",
				type: "Query",
				schema: z.string().optional().default("<string>")
			},
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
		response: z.object({ contentSchedules: z.array(ContentScheduleMetaData).min(2).max(2) }).strict().passthrough(),
	},
]);

export const ContentScheduleApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
