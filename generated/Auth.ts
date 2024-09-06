import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

import { validateAuthCode_Body } from "./common"



const postDeviceV3_Body = z.object({ deviceType: DeviceTypeDto.default("<string>"), deviceToken: z.string().default("<string>"), deviceModel: z.string().default("<string>"), deviceId: z.string().default("<string>"), permissionStatus: PermissionStatusTypeDto.default("<string>") }).strict().passthrough();
const sendAuthCodeV2_Body = z.object({ phoneNumber: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>"), subId: z.string().nullish().default("<string>"), type: AuthCodeTypeV2Dto.default("<string>") }).strict().passthrough();
const directLoginV2_Body = z.object({ subId: z.string().default("<string>"), password: z.string().default("<password>") }).strict().passthrough();
const naverAuthWithNative_Body = z.object({ data: NaverAuthDto }).strict().passthrough();
const signUpByWeb_Body = z.object({ subId: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>"), nickName: z.string().default("<string>"), portraitURL: z.string().default("<url>"), password: z.string().min(8).nullish().default("<string>"), phoneNumber: z.string().nullish().default("<string>"), marketingAgree: z.boolean().default("<boolean>"), signPath: SignPathType.default("<string>") }).strict().passthrough();
const signUpByApp_Body = z.object({ subId: z.string().default("<string>"), nickName: z.string().default("<string>"), password: z.string().min(8).nullish().default("<string>"), phoneNumber: z.string().nullish().default("<string>"), deviceType: DeviceTypeDto.default("<string>"), deviceModel: z.string().nullish().default("<string>"), deviceToken: z.string().default("<string>"), isMarketingAgreed: z.boolean().default("<boolean>"), isNightMarketingAgreed: z.boolean().default("<boolean>"), permissionStatus: PermissionStatusTypeDto.default("<string>"), deviceId: z.string().default("<string>"), portraitImage: z.string().default("<binary>") }).strict().passthrough();
const updateMarketingAgree_Body = z.object({ name: MarketingAgreeTypeDto.default("<string>"), value: z.boolean().default("<boolean>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), updatedAt: z.string().datetime({ offset: true }).default("<dateTime>") }).strict().passthrough();

export const schemas = {
	postDeviceV3_Body,
	sendAuthCodeV2_Body,
	directLoginV2_Body,
	naverAuthWithNative_Body,
	signUpByWeb_Body,
	signUpByApp_Body,
	updateMarketingAgree_Body,
};

const endpoints = makeApi([
	{
		method: "get",
		path: "/v2/auth/me",
		alias: "getMyAuthV2",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ provider: LOGIN_TYPE.default("<string>"), subId: z.string().default("<string>"), id: z.string().default("<string>"), nickName: z.string().default("<string>"), portraitUrl: z.string().default("<url>"), phoneNumber: z.string().nullish().default("<string>"), email: z.string().email().nullish().default("<email>"), currentAsset: z.number().int().default(<integer>), role: USER_ROLE.default("USER"), isFinishedTUT: z.boolean().default("<boolean>") }).strict().passthrough(),
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
		method: "post",
		path: "/v3/auth/devices",
		alias: "postDeviceV3",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postDeviceV3_Body
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ userId: z.string().default("<string>"), country: z.string().default("<string>"), language: z.string().default("<string>"), timezone: z.number().int().default(<integer>), deviceType: DeviceTypeDto.default("<string>"), deviceToken: z.string().default("<string>"), id: z.string().default("<string>"), deviceModel: z.string().default("<string>"), pushTopics: z.array(PushTopicDto).max(2), deleted: z.boolean().nullish().default("<boolean>") }).strict().passthrough(),
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
		method: "post",
		path: "/auth/refreshtokens",
		alias: "refreshTokens",
		description: `refresh token 을 이용해서 refresh token 과 access token 을 재발급합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ refreshToken: z.string().default("<string>") }).strict().passthrough()
			},
		],
		response: z.object({ access: TokenDto, refresh: TokenDto }).strict().passthrough(),
		errors: [
			{
				status: 404,
				description: `Not found`,
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
		path: "/auth/validate",
		alias: "validateAccessToken",
		description: `access token 에 대한 유효성을 검증합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ subId: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>"), password: z.string().min(8).nullish().default("<string>"), portraitURL: z.string().default("<url>"), nickName: z.string().default("<string>"), phoneNumber: z.string().nullish().default("<string>"), pushTopics: z.array(PushTopicDto).max(2), id: z.string().default("<string>") }).strict().passthrough(),
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
		method: "post",
		path: "/auth/direct/code/validate",
		alias: "validateAuthCode",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: validateAuthCode_Body
			},
		],
		response: z.object({ subId: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>"), code: z.number().int().default(<integer>), phoneNumber: z.string().default("<string>"), expires: z.string().datetime({ offset: true }).default("<dateTime>"), id: z.string().default("<string>") }).strict().passthrough(),
		errors: [
			{
				status: 401,
				description: `Bad Request`,
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
		method: "post",
		path: "/auth/direct/code/generate/v2",
		alias: "sendAuthCodeV2",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: sendAuthCodeV2_Body
			},
		],
		response: z.object({ subId: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>"), phoneNumber: z.string().default("<string>"), expires: z.string().datetime({ offset: true }).default("<dateTime>"), id: z.string().default("<string>"), code: z.number().int().default(<integer>) }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Bad request`,
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
		method: "post",
		path: "/v2/auth/direct",
		alias: "directLoginV2",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: directLoginV2_Body
			},
		],
		response: z.object({ auth: z.boolean().default("<boolean>"), join: z.boolean().default("<boolean>"), subId: z.string().default("<string>"), accessToken: z.string().default("<string>"), accessExpires: z.string().datetime({ offset: true }).default("<dateTime>"), refreshToken: z.string().default("<string>"), refreshExpires: z.string().datetime({ offset: true }).default("<dateTime>"), shouldRecommendation: z.boolean().default("<boolean>"), user: getMyAuthDto }).strict().passthrough(),
		errors: [
			{
				status: 401,
				description: `비밀번호가 틀린 경우`,
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
		method: "post",
		path: "/v1/auth/phone-numbers/check-duplication",
		alias: "phoneNumberCheckDuplication",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ phoneNumber: z.string().default("<string>") }).strict().passthrough()
			},
		],
		response: z.object({ isDuplicate: z.boolean().default("<boolean>"), users: z.array(DuplicateUser).max(2).nullish() }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/auth/google",
		alias: "googleAuth",
		description: `구글 로그인`,
		requestFormat: "json",
		response: z.void(),
		errors: [
			{
				status: 307,
				description: `성공`,
				schema: z.void()
			},
		]
	},
	{
		method: "get",
		path: "/auth/apple",
		alias: "appleAuth",
		description: `애플 로그인`,
		requestFormat: "json",
		response: z.void(),
		errors: [
			{
				status: 307,
				description: `성공`,
				schema: z.void()
			},
		]
	},
	{
		method: "get",
		path: "/auth/naver",
		alias: "naverAuth",
		description: `네이버 로그인`,
		requestFormat: "json",
		response: z.void(),
		errors: [
			{
				status: 307,
				description: `성공`,
				schema: z.void()
			},
		]
	},
	{
		method: "post",
		path: "/auth/naver/native",
		alias: "naverAuthWithNative",
		description: `네이버 로그인 (Flutter navtive only)`,
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: naverAuthWithNative_Body
			},
		],
		response: z.object({ data: z.union([LoginSuccessDto, LoginNoJoinDto]) }).partial().strict().passthrough(),
	},
	{
		method: "get",
		path: "/auth/kakao",
		alias: "kakaoAuth",
		description: `카카오 로그인`,
		requestFormat: "json",
		response: z.void(),
		errors: [
			{
				status: 307,
				description: `성공`,
				schema: z.void()
			},
		]
	},
	{
		method: "post",
		path: "/v1/auth/signUp/web",
		alias: "signUpByWeb",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: signUpByWeb_Body
			},
		],
		response: z.object({ user: AuthWebSignUpUserResponse, tokens: AuthSignUpTokenResponse, shouldRecommendation: z.boolean().default("<boolean>") }).strict().passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
	{
		method: "post",
		path: "/v1/auth/signUp/app",
		alias: "signUpByApp",
		requestFormat: "form-data",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: signUpByApp_Body
			},
			{
				name: "provider",
				type: "Query",
				schema: z.enum(["direct", "apple", "google", "naver", "kakao"]).default("<string>")
			},
			{
				name: "signPath",
				type: "Query",
				schema: z.enum(["IOS", "ANDROID", "WEB", "UNKNOWN"]).default("<string>")
			},
		],
		response: z.object({ user: AuthAppSignUpUserResponse, tokens: AuthSignUpTokenResponse, shouldRecommendation: z.boolean().default("<boolean>"), password: z.string().nullish().default("<string>"), pushTopics: z.array(AuthPushTopicsResponse).max(2) }).strict().passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
	{
		method: "post",
		path: "/v1/auth/device",
		alias: "registerDevice",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postDeviceV3_Body
			},
		],
		response: z.object({ pushTopics: z.array(AuthPushTopicsResponse).max(2), deleted: z.boolean().nullish().default("<boolean>"), deviceModel: z.string().default("<string>"), userId: z.string().default("<string>"), country: z.string().default("<string>"), language: z.string().default("<string>"), timezone: z.number().int().default(<integer>), deviceType: DeviceTypeDto.default("<string>"), deviceToken: z.string().default("<string>"), id: z.string().default("<string>") }).strict().passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({ code: z.number().default(401), message: z.string().default("<string>") }).strict().passthrough()
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
	{
		method: "post",
		path: "/v1/auth/token/refresh",
		alias: "refreshToken",
		description: `refresh token 을 이용해서 refresh token 과 access token 을 재발급합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ refreshToken: z.string().default("<string>") }).strict().passthrough()
			},
		],
		response: z.object({ access: AuthTokenResponse, refresh: AuthTokenResponse }).strict().passthrough(),
		errors: [
			{
				status: 404,
				description: `Not found`,
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
		method: "post",
		path: "/v1/auth/login/direct",
		alias: "directToLogin",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: directLoginV2_Body
			},
		],
		response: z.object({ user: AuthAppSignUpUserResponse, auth: z.boolean().default("<boolean>"), join: z.boolean().default("<boolean>"), subId: z.string().default("<string>"), accessToken: z.string().default("<string>"), accessExpires: z.string().datetime({ offset: true }).default("<dateTime>"), refreshToken: z.string().default("<string>"), refreshExpires: z.string().datetime({ offset: true }).default("<dateTime>"), shouldRecommendation: z.boolean().default("<boolean>") }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `존재하지 않은 유저입니다.`,
				schema: z.object({ code: z.number().default(400), message: z.string().default("<string>") }).strict().passthrough()
			},
			{
				status: 401,
				description: `비밀번호가 일치하지 않습니다.`,
				schema: z.object({ code: z.number().default(401), message: z.string().default("<string>") }).strict().passthrough()
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
		path: "/v1/auth/validate",
		alias: "validateToken",
		description: `token 에 대한 유효성을 검증합니다.`,
		requestFormat: "json",
		response: z.object({ subId: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>"), password: z.string().min(8).nullish().default("<string>"), portraitURL: z.string().default("<url>"), nickName: z.string().default("<string>"), phoneNumber: z.string().nullish().default("<string>"), pushTopics: z.array(AuthPushTopicsResponse).max(2), id: z.string().default("<string>") }).strict().passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({ code: z.number().default(401), message: z.string().default("<string>") }).strict().passthrough()
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
		path: "/v1/auth/marketingAgree",
		alias: "updateMarketingAgree",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: updateMarketingAgree_Body
			},
		],
		response: z.object({ name: MarketingAgreeTypeDto.default("<string>"), value: z.boolean().default("<boolean>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), updatedAt: z.string().datetime({ offset: true }).default("<dateTime>") }).strict().passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({ code: z.number().default(401), message: z.string().default("<string>") }).strict().passthrough()
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
		path: "/v1/auth/me",
		alias: "getMyInfo",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ provider: LOGIN_TYPE.default("<string>"), subId: z.string().default("<string>"), id: z.string().default("<string>"), nickName: z.string().default("<string>"), portraitUrl: z.string().default("<url>"), phoneNumber: z.string().nullish().default("<string>"), email: z.string().email().nullish().default("<email>"), currentAsset: z.number().int().default(<integer>), role: USER_ROLE.default("USER"), isFinishedTUT: z.boolean().default("<boolean>") }).strict().passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({ code: z.number().default(401), message: z.string().default("<string>") }).strict().passthrough()
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
	{
		method: "delete",
		path: "/v1/auth/withdraw",
		alias: "withdraw",
		requestFormat: "json",
		response: z.void(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({ code: z.number().default(401), message: z.string().default("<string>") }).strict().passthrough()
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
	{
		method: "delete",
		path: "/auth/signOut/V2",
		alias: "signOutV2",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.void(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({ code: z.number().default(401), message: z.string().default("<string>") }).strict().passthrough()
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
]);

export const AuthApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
