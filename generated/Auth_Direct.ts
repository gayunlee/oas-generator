import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

import { validateAuthCode_Body } from "./common"



const generateAuthCode_Body = z.object({ subId: z.string().nullish().default("<string>"), type: AuthCodeTypeV2Dto.default("<string>"), phoneNumber: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>") }).strict().passthrough();
const validatePassword_Body = z.object({ subId: z.string().default("<string>"), password: z.string().min(8).default("<string>") }).strict().passthrough();

export const schemas = {
	generateAuthCode_Body,
	validatePassword_Body,
};

const endpoints = makeApi([
	{
		method: "post",
		path: "/v1/auth/direct/code/validate",
		alias: "checkAuthCode",
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
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
	{
		method: "post",
		path: "/v1/auth/direct/code/generate",
		alias: "generateAuthCode",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: generateAuthCode_Body
			},
		],
		response: z.void(),
		errors: [
			{
				status: 400,
				description: `Bad request`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/v1/auth/direct/password/check",
		alias: "validatePassword",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: validatePassword_Body
			},
		],
		response: z.void(),
		errors: [
			{
				status: 400,
				description: `New password is same as old password`,
				schema: z.object({ code: z.number().default(400), message: z.string().default("<string>") }).strict().passthrough()
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
		path: "/v1/auth/direct/password/reset",
		alias: "updatePassword",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: validatePassword_Body
			},
		],
		response: z.object({ subId: z.string().default("<string>"), provider: ProviderType.default("<string>"), password: z.string().min(8).nullish().default("<string>"), portraitURL: z.string().default("<url>"), nickName: z.string().default("<string>"), phoneNumber: z.string().nullish().default("<string>"), pushTopics: z.array(AuthPushTopicsResponse).max(2), id: z.string().default("<string>") }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `New password is same as old password`,
				schema: z.object({ code: z.number().default(400), message: z.string().default("<string>") }).strict().passthrough()
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
		path: "/v1/auth/direct/phone-number/check-duplication",
		alias: "checkDuplicatePhoneNumber",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ phoneNumber: z.string().default("<string>") }).strict().passthrough()
			},
		],
		response: z.object({ isDuplicate: z.boolean().default("<boolean>"), users: z.array(AuthDuplicateUserResponse).max(2).nullish() }).strict().passthrough(),
	},
]);

export const Auth_DirectApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
