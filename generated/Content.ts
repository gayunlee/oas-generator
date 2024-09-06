import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";






const endpoints = makeApi([
	{
		method: "get",
		path: "/contents",
		alias: "getContents",
		description: `컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "type",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).optional().default("<string>")
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
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(z.union([PickMetadataContent, SecretMetadataContent])).min(2).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/v2/contents",
		alias: "getContentsV2",
		description: `컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "type",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).optional().default("<string>")
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
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(z.union([PickMetadataContent, SecretMetadataContent])).max(2), pagination: Pagination }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/contents/most-viewed",
		alias: "getMostViewedContents",
		description: `시작날짜와 종료날짜를 기준으로 조회수가 높은 멤버십 컨텐츠들을 가져옵니다.`,
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
				name: "startAt",
				type: "Query",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "endAt",
				type: "Query",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(MostViewedContent).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/contents/join-recommendation",
		alias: "getJoinRecommendationContents",
		description: `isShownJoinRecommendation이 true인 커뮤니티 컨텐츠들을 가져옵니다.`,
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
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(PickMetadataContent).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/contents/picked",
		alias: "getPickedContents",
		description: `함께픽하기의 일정 갯수 이상인 컨텐츠들을 가져옵니다.`,
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
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(PickMetadataContent).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/contents/pick/:cmsId",
		alias: "getPickContentByCmsId",
		description: `아이디에 해당하는 커뮤니티 컨텐츠를 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "cmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ content: PickDetailMetaDataContent }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/contents/free-recommendation",
		alias: "getFreeRecommendationContent",
		description: `isDisplayFreeRecommendation가 true인 멤버십 컨텐츠를 가져옵니다.`,
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
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(SecretMetadataContent).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/contents/secret/:cmsId",
		alias: "getSecretContentByCmsId",
		description: `아이디에 해당하는 커뮤니티 컨텐츠들을 가져옵니다. APP 전용`,
		requestFormat: "json",
		parameters: [
			{
				name: "cmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ content: SecretDetailMetadataContent }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/v2/contents/secret/:cmsId",
		alias: "getSecretContentByCmsIdV2",
		description: `아이디에 해당하는 커뮤니티 컨텐츠들을 가져옵니다. WEB 전용`,
		requestFormat: "json",
		parameters: [
			{
				name: "cmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ content: SecretDetailMetadataContentV2 }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/contents/:contentCmsId/comments",
		alias: "getCommentsByContent",
		description: `컨텐츠의 댓글들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "contentCmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "contentCmsType",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).default("<string>")
			},
			{
				name: "order",
				type: "Query",
				schema: z.enum(["latest", "like"]).default("<string>")
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
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comments: z.array(ContentCommentData).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/v2/contents/:contentCmsId/comments",
		alias: "getCommentsByContentV2",
		description: `컨텐츠의 댓글들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "contentCmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "contentCmsType",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).default("<string>")
			},
			{
				name: "order",
				type: "Query",
				schema: z.string().default("<string>")
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
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comments: z.array(ContentCommentData).max(2), pagination: Pagination }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/contents/:contentCmsId/comments/count",
		alias: "getCommentCountByContent",
		description: `컨텐츠의 댓글의 총 갯수를 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "contentCmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "contentCmsType",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).default("<string>")
			},
		],
		response: z.object({ commentCount: z.number().int().default(<integer>) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/contents/series/:seriesCmsId/secrets",
		alias: "getSecretContentsBySeriesCmsId",
		description: `시리즈의 시크릿 컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "seriesCmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "isRead",
				type: "Query",
				schema: z.boolean().default("<boolean>")
			},
			{
				name: "order",
				type: "Query",
				schema: z.enum(["ROUND", "LATEST"]).default("<string>")
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
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(SeriesSecretMetadataContent).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/contents/series/:seriesCmsId",
		alias: "getSeriesByCmsId",
		description: `아이디에 해당하는 시리즈를 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "seriesCmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ content: SeriesDetailMetadataContent }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/contents/:contentCmsId/masters",
		alias: "getMasterByContentCmsId",
		requestFormat: "json",
		parameters: [
			{
				name: "contentCmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "contentType",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ master: Master }).strict().passthrough(),
	},
]);

export const ContentApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
