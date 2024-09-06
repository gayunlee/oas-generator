import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";






const endpoints = makeApi([
	{
		method: "get",
		path: "/masters",
		alias: "getMasters",
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
			{
				name: "type",
				type: "Query",
				schema: z.literal("RECOMMEND").optional().default("<string>")
			},
		],
		response: z.object({ masters: z.array(Master).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/masters/:masterCmsId",
		alias: "getMasterByMasterCmsId",
		requestFormat: "json",
		parameters: [
			{
				name: "masterCmsId",
				type: "Path",
				schema: z.string()
			},
		],
		response: z.object({ master: Master }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/masters/:masterCmsId/contents",
		alias: "getContentsByMasterId",
		description: `마스터의 컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "masterCmsId",
				type: "Path",
				schema: z.string()
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
			{
				name: "type",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).optional().default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(z.union([PickMetadataContent, SecretMetadataContent])).min(2).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/v2/masters/:masterCmsId/contents",
		alias: "getContentsByMasterIdV2",
		description: `마스터의 컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "masterCmsId",
				type: "Path",
				schema: z.string()
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
			{
				name: "type",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).optional().default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(z.union([PickMetadataContent, SecretMetadataContent, SeriesMetadataContent])).max(2), pagination: Pagination }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/masters/:masterCmsId/comments",
		alias: "getCommentsByMasterCmsId",
		description: `마스터 컨텐츠의 댓글들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "masterCmsId",
				type: "Path",
				schema: z.string()
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
			{
				name: "type",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).optional().default("<string>")
			},
		],
		response: z.object({ comments: z.array(LoungeCommentData).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/masters/:masterCmsId/master-notices",
		alias: "getMasterNoticesByMasterCmsId",
		description: `마스터의 공지사항들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "masterCmsId",
				type: "Path",
				schema: z.string()
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
		response: z.object({ masterNotices: z.array(MasterNoticesData).max(2), pagination: Pagination }).strict().passthrough(),
	},
]);

export const MasterApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
