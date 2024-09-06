import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";




const updateFollow_Body = z.object({ follow: z.array(UpdateFollow).min(2).max(2) }).strict().passthrough();
const patchProfileEditScreen_Body = z.object({ portraitImage: z.instanceof(File).nullable().default("<binary>"), nickName: z.string().nullable().default("<string>"), password: z.string().nullable().default("<string>"), phoneNumber: z.string().nullable().default("<string>") }).partial().strict().passthrough();
const patchReadNotice_Body = z.object({ noticeId: z.array(z.string().default("<string>")).min(2).max(2) }).strict().passthrough();
const patchFormattingStyle_Body = z.object({ fontSize: z.number().default(<double>), lineHeight: z.number().default(<double>) }).strict().passthrough();

export const schemas = {
	updateFollow_Body,
	patchProfileEditScreen_Body,
	patchReadNotice_Body,
	patchFormattingStyle_Body,
};

const endpoints = makeApi([
	{
		method: "patch",
		path: "/v2/picks/:pickId/like",
		alias: "updateMyPickByPickIdV2",
		description: `내가 PickId 를 픽 또는 언픽을 합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "pickId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "isPicked",
				type: "Query",
				schema: z.boolean().default("<boolean>")
			},
			{
				name: "selectedPickType",
				type: "Query",
				schema: z.enum(["sympathy", "suggestion", "expectancy"]).default("<string>")
			},
			{
				name: "contentType",
				type: "Query",
				schema: z.enum(["none", "pick", "series", "secret", "live", "poll", "all"]).default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ pickId: z.string().default("<string>"), isPicked: z.boolean().default("<boolean>"), selectedPickType: PickCountType.optional().default("<string>"), contentType: ContentTypeDto.default("<string>") }).strict().passthrough(),
	},
	{
		method: "put",
		path: "/:contentType/:contentId/scrap",
		alias: "updateScrapByContentId",
		description: `ContentId 를 스크랩 또는 언스크랩을 합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "contentId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "contentType",
				type: "Path",
				schema: z.enum(["pick", "series", "secret", "live", "all"]).default("<string>")
			},
			{
				name: "isScraped",
				type: "Query",
				schema: z.boolean().default("<boolean>")
			},
		],
		response: z.object({ content: z.string().default("<string>"), contentType: ScrapTypeDto.default("<string>"), isScraped: z.boolean().default("<boolean>") }).strict().passthrough(),
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
	{
		method: "get",
		path: "/me/follows_brief",
		alias: "getMyFollows",
		description: `내가 팔로우 한 목록을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.array(FollowDto).max(2),
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
	{
		method: "put",
		path: "/masters/:masterId/follows",
		alias: "updateFollowByMasterId",
		description: `MasterId 를 팔로우 또는 언팔로우를 합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "masterId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "isFollowed",
				type: "Query",
				schema: z.boolean().default("<boolean>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ followed: z.string().default("<string>"), isFollowed: z.boolean().default("<boolean>") }).strict().passthrough(),
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
	{
		method: "put",
		path: "/masters/follows",
		alias: "updateFollow",
		description: `MyMaster에서 팔로우를 합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: updateFollow_Body
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ follows: z.array(UpdateFollowResponseDto).max(2) }).strict().passthrough(),
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
	{
		method: "patch",
		path: "/profile_edit",
		alias: "patchProfileEditScreen",
		requestFormat: "form-data",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: patchProfileEditScreen_Body
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ portraitUrl: z.string().default("<url>"), nickName: z.string().default("<string>"), phoneNumber: z.string().nullish().default("<string>"), email: z.string().email().nullish().default("<email>"), LoginTypeDto: LoginTypeDto.default("<string>"), addPhoneNumber: z.boolean().default("<boolean>") }).strict().passthrough(),
	},
	{
		method: "patch",
		path: "/tutorials",
		alias: "patchIsReadTUT",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ isFinishedTUT: z.boolean().default("<boolean>") }).strict().passthrough()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ isFinishedTUT: z.boolean().default("<boolean>") }).strict().passthrough(),
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
	{
		method: "patch",
		path: "/masterNotice/:noticeId",
		alias: "patchIsReadByMasterNotice",
		requestFormat: "json",
		parameters: [
			{
				name: "noticeId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "isRead",
				type: "Query",
				schema: z.boolean().default("<boolean>")
			},
			{
				name: "masterId",
				type: "Query",
				schema: z.string().default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ masterNoticeHistory: z.array(PatchIsReadByMasterNoticeDto).max(2) }).strict().passthrough(),
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
	{
		method: "patch",
		path: "/notices/read",
		alias: "patchReadNotice",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: patchReadNotice_Body
			},
			{
				name: "isRead",
				type: "Query",
				schema: z.boolean().default("<boolean>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ noticeHistory: z.array(NoticeHistoryDto).max(2) }).strict().passthrough(),
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
	{
		method: "patch",
		path: "/formattingStyle",
		alias: "patchFormattingStyle",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: patchFormattingStyle_Body
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ fontSize: z.number().default(<double>), lineHeight: z.number().default(<double>) }).strict().passthrough(),
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
	{
		method: "patch",
		path: "/clubLetter/:masterId",
		alias: "patchClubLetterByReadValue",
		requestFormat: "json",
		parameters: [
			{
				name: "masterId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "isRead",
				type: "Query",
				schema: z.boolean().default("<boolean>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ clubLetterHistory: z.array(PatchClubLetterByReadValue).max(2) }).strict().passthrough(),
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

export const ActionsApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
