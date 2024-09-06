import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";




const postAssetsProducts_Body = z.object({ transcationToken: z.string().default("<string>"), product: AssetsProduct }).strict().passthrough();
const postMyContents_Body = z.object({ contentId: z.string().default("<string>"), contentType: MyContentType.default("<string>") }).strict().passthrough();

export const schemas = {
	postAssetsProducts_Body,
	postMyContents_Body,
};

const endpoints = makeApi([
	{
		method: "get",
		path: "/v3/me",
		alias: "getMeScreenV3",
		description: `3.0부터 사용`,
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ name: z.string().default("<string>"), portraitUrl: z.string().default("<url>"), usGauge: UserLevelTypeDto.default("<string>"), followingCount: z.number().int().default(<integer>), assetCount: z.number().int().default(<integer>), readContentCount: z.number().int().default(<integer>), checkPoints: z.array(z.number().int().default(<integer>)).max(2), achievementRate: z.number().default(<double>), interestType: InterestType.default("<string>"), membershipCount: z.number().int().default(<integer>), scrapCount: z.number().int().default(<integer>), commentCount: z.number().int().default(<integer>), purchasedContentCount: z.number().int().default(<integer>), unreadHelpdeskCount: z.number().int().default(<integer>), unreadNotificationCount: z.number().int().default(<integer>) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/v2/me/settings",
		alias: "getSettingsScreenV2",
		requestFormat: "json",
		parameters: [
			{
				name: "deviceToken",
				type: "Query",
				schema: z.string().default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ loginType: LoginTypeDto.default("<string>"), userId: z.string().default("<string>"), didEventNotificationAgree: z.boolean().default(false), didMasterNotificationAgree: z.boolean().default(false) }).strict().passthrough(),
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
		path: "/v4/me/memberships",
		alias: "getMyMembershipScreenV4",
		requestFormat: "json",
		parameters: [
			{
				name: "status",
				type: "Query",
				schema: z.enum(["active", "inactive"]).default("<string>")
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
		response: z.object({ memberships: z.array(MyMembershipCardModelV3).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/me/memberships/:membershipId",
		alias: "getMyMembershipDetailScreen",
		requestFormat: "json",
		parameters: [
			{
				name: "membershipId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ membership: MyMembershipCardModel, transcations: z.array(z.union([PurchaseSuccessCardModel, PurchaseFailCardModel, SubscriptionCancelCardModel, SubscriptionChangeCardModel, SubscriptionCancelWithdrawCardModel])).max(2) }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/me/memberships/:membershipId/paymentMethodChange",
		alias: "getMyMembershipPaymentMethodChange",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "membershipId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "method",
				type: "Query",
				schema: z.enum(["card", "corp", "unknown"]).default("<string>")
			},
		],
		response: z.object({ mchtId: z.string().default("<string>"), method: HectoMethodType.default("<string>"), cardGb: HectoCardGBType.optional().default("<string>"), corpPayCode: HectoCorpPayCodeType.optional().default("<string>"), mchtName: z.string().default("<string>"), mchtEName: z.string().default("<string>"), notiUrl: z.string().default("<string>"), nextUrl: z.string().default("<string>"), cancUrl: z.string().default("<string>"), trdDt: z.string().default("<string>"), trdTm: z.string().default("<string>"), pktHash: z.string().default("<string>"), product: membershipProductHectoModel, paymentMethodChangeType: PaymentMethodChangeType.default("<string>") }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/me/memberships/:membershipId/cancel",
		alias: "getMyMembershipCancelScreen",
		requestFormat: "json",
		parameters: [
			{
				name: "membershipId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ product: MembershipsProduct, expiredAt: z.string().default("<string>") }).strict().passthrough(),
	},
	{
		method: "post",
		path: "/me/memberships/:membershipId/cancel",
		alias: "postMyMembershipCancel",
		requestFormat: "json",
		parameters: [
			{
				name: "membershipId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ expiredAt: z.string().default("<string>"), result: CancelResultDto.default("<string>") }).strict().passthrough(),
	},
	{
		method: "post",
		path: "/me/memberships/:membershipId/renew",
		alias: "postMyMembershipRenew",
		requestFormat: "json",
		parameters: [
			{
				name: "membershipId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ expiredAt: z.string().default("<string>"), result: RenewResultDto.default("<string>") }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/me/memberships/:membershipId/change",
		alias: "getMyMembershipChange",
		requestFormat: "json",
		parameters: [
			{
				name: "membershipId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ memberships: z.array(membershipProductHectoChangeModel).max(2) }).strict().passthrough(),
	},
	{
		method: "post",
		path: "/me/memberships/:membershipId/change",
		alias: "postMyMembershipChange",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ productId: z.string().default("<string>") }).strict().passthrough()
			},
			{
				name: "membershipId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ changedExpiredAt: z.string().default("<string>"), result: RenewResultDto.default("<string>") }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/v2/me/masters",
		alias: "getMyMastersScreenV2",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ masters: z.array(MasterCardModelV2).max(2) }).strict().passthrough(),
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
		path: "/me/profile_edit",
		alias: "getProfileEditScreen",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ portraitUrl: z.string().default("<url>"), nickName: z.string().default("<string>"), phoneNumber: z.string().nullish().default("<string>"), email: z.string().email().nullish().default("<email>"), LoginTypeDto: LoginTypeDto.default("<string>"), addPhoneNumber: z.boolean().default("<boolean>") }).strict().passthrough(),
	},
	{
		method: "post",
		path: "/me/products/assets",
		alias: "postAssetsProducts",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postAssetsProducts_Body
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ transcationToken: z.string().default("<string>"), transcationState: TransactionStatus.default("<string>"), product: AssetsProduct }).strict().passthrough(),
	},
	{
		method: "post",
		path: "/me/contents",
		alias: "postMyContents",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postMyContents_Body
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ content: MyContentDto }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/me/redDot",
		alias: "getRedDot",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ data: GetRedDotResponseDto }).strict().passthrough(),
	},
]);

export const MeApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
