import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";






const endpoints = makeApi([
	{
		method: "get",
		path: "/users/:userId/follows/contents",
		alias: "getContentsByFollows",
		description: `유저가 팔로우 한 마스터들의 컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
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
		path: "/v2/users/:userId/follows/contents",
		alias: "getContentsByFollowsV2",
		description: `유저가 팔로우 한 마스터들의 컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
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
		path: "/users/:userId/my-products",
		alias: "getMyProductsByUserId",
		description: `유저의 멤버십을 가져옵니다. - 배너 전용`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "status",
				type: "Query",
				schema: z.enum(["active", "inactive"]).optional().default("<string>")
			},
			{
				name: "filter",
				type: "Query",
				schema: z.literal("BANNER").optional().default("<string>")
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
		response: z.object({ myProduct: z.array(MyProductMetadata).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/my-products/content-schedules",
		alias: "getContentSchedulesByMyProducts",
		description: `나의 상품의 마스터의 컨텐츠 일정들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
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
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contentSchedules: z.array(ContentScheduleMetaData).min(2).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/follows/content-schedules",
		alias: "getContentSchedulesByFollows",
		description: `팔로우 한 마스터들의 컨텐츠 일정들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
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
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contentSchedules: z.array(ContentScheduleMetaData).min(2).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/scraps/contents",
		alias: "getScrappedContentsByUserId",
		description: `유저가 스크랩 한 컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
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
		response: z.object({ contents: z.array(z.union([PickMetadataContent, SecretMetadataContent, SeriesMetadataContent])).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/comments",
		alias: "getCommentsByUserId",
		description: `유저가 작성한 댓글을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
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
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comments: z.array(UserCommentData).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/alarm-history",
		alias: "getAlarmHistoryByUserId",
		description: `유저의 알림내역을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "filter",
				type: "Query",
				schema: z.enum(["UNREAD", "ALL"]).default("<string>")
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
		response: z.object({ alarmHistory: z.array(UserAlarmHistory).max(2) }).strict().passthrough(),
	},
	{
		method: "patch",
		path: "/users/:userId/alarm-history/read",
		alias: "patchAlarmHistoryReadByUserId",
		description: `유저의 알림내역을 모두 읽음처리합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.void(),
	},
	{
		method: "patch",
		path: "/users/:userId/alarm-history/:alarmHistoryId/read",
		alias: "patchAlarmHistoryIsReadByAlarmHistoryId",
		description: `유저의 알림내역을 읽음처리합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "alarmHistoryId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.void(),
	},
	{
		method: "get",
		path: "/users/:userId/my-assets",
		alias: "getMyAssetsByUserId",
		description: `유저의 에셋정보를 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
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
				schema: z.enum(["CHARGED", "USED", "REWARD", "AVAILABLE"]).optional().default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ myAssets: z.array(MyAssetMetadata).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/my-assets/balance",
		alias: "getMyAssetsBalanceByUserId",
		description: `유저의 에셋의 타입에 따른 총 양를 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "type",
				type: "Query",
				schema: z.enum(["CHARGED", "USED", "REWARD", "AVAILABLE"]).optional().default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ balances: z.array(MyAssetBalanceMetadata).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/purchased-contents",
		alias: "getPurchasedContentsByUserId",
		description: `유저가 구매한 컨텐츠 목록을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
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
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(PurchasedSecretMetaData).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/follows/masters",
		alias: "getFollowedMasterByUserId",
		description: `유저가 팔로우 한 마스터들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
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
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ masters: z.array(FollowedMaster).max(2), pagination: Pagination }).strict().passthrough(),
	},
]);

export const UserApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
