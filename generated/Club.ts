import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";






const endpoints = makeApi([
	{
		method: "get",
		path: "/v3/clubs/club_meta/:id",
		alias: "getClubMetaPageV3",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "type",
				type: "Query",
				schema: z.enum(["pick", "series", "live", "secret", "all"]).optional().default("<string>")
			},
		],
		response: z.object({ name: z.string().default("<string>"), followers: z.number().int().default(<integer>), clubOfficialImage: z.string().default("<url>"), clubTextImage: z.string().default("<url>"), clubLetter: z.string().nullable().default("<string>"), userTierType: UserTierTypeDto.default("<string>"), accessState: MasterAccessStateDto, secretCount: z.number().int().default(<integer>), seriesCount: z.number().int().default(<integer>), didReadLetter: z.boolean().default("<boolean>"), hasNew: z.boolean().default("<boolean>"), membershipIntroduction: MembershipIntroductionDto.optional() }).strict().passthrough(),
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
		path: "/clubs/:id/master",
		alias: "getClubScreenDetailById",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string()
			},
		],
		response: z.object({ name: z.string().default("<string>"), masterDetailIntroduction: z.string().default("<string>"), masterDetailKeyCareer: z.string().default("<string>"), description: z.string().default("<string>"), cumulativeDonation: z.string().default("<string>"), masterDetailCareers: z.array(CareerData).max(2) }).strict().passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/v2/clubs/:id/notice",
		alias: "getClubNoticesV2",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ notices: z.array(getClubNoticesV2Dto).max(2) }).strict().passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/clubs/notice/:noticeId",
		alias: "getClubNoticeById",
		requestFormat: "json",
		parameters: [
			{
				name: "noticeId",
				type: "Path",
				schema: z.string()
			},
		],
		response: z.object({ id: z.string().default("<string>"), title: z.string().default("<string>"), description: z.string().default("<string>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), creator: z.string().default("<string>") }).strict().passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
]);

export const ClubApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
