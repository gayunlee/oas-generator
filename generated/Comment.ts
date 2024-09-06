import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";




const postCommentV3_Body = z.object({ contentCmsId: z.string().default("<string>"), contentType: CMS_TYPE.default("<string>"), value: z.string().default("<string>"), parentCommentId: z.string().nullish().default("<string>") }).strict().passthrough();

export const schemas = {
	postCommentV3_Body,
};

const endpoints = makeApi([
	{
		method: "get",
		path: "/v4/comments/:commentId",
		alias: "getCommentsByCommentId",
		requestFormat: "json",
		parameters: [
			{
				name: "commentId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comment: ContentCommentData }).strict().passthrough(),
	},
	{
		method: "get",
		path: "/comments/:commentId/child-comments",
		alias: "getChildCommentsByParentCommentId",
		requestFormat: "json",
		parameters: [
			{
				name: "commentId",
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
		response: z.object({ comments: z.array(ContentCommentData).max(2) }).strict().passthrough(),
	},
	{
		method: "post",
		path: "/v3/comments",
		alias: "postCommentV3",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postCommentV3_Body
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comment: CommentIdData }).strict().passthrough(),
		errors: [
			{
				status: 404,
				description: `Not Found`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
	{
		method: "patch",
		path: "/v3/comments/:commentId",
		alias: "updateCommentByCommentIdV3",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ value: z.string().default("<string>") }).strict().passthrough()
			},
			{
				name: "commentId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comment: CommentIdData }).strict().passthrough(),
		errors: [
			{
				status: 403,
				description: `Forbidden`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
			{
				status: 404,
				description: `Not Found`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
	{
		method: "delete",
		path: "/v2/comments/:commentId",
		alias: "deleteCommentByCommentIdV2",
		requestFormat: "json",
		parameters: [
			{
				name: "commentId",
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
		errors: [
			{
				status: 403,
				description: `Forbidden`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
			{
				status: 404,
				description: `Not Found`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
	{
		method: "post",
		path: "/comments/:commentId/reports",
		alias: "createReportByCommentId",
		requestFormat: "json",
		parameters: [
			{
				name: "commentId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comment: CommentIdData }).strict().passthrough(),
		errors: [
			{
				status: 403,
				description: `Forbidden`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
			{
				status: 404,
				description: `Not Found`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
			{
				status: 409,
				description: `Conflict`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
	{
		method: "patch",
		path: "/comments/:commentId/likes",
		alias: "upsertLikeByCommentId",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ isLike: z.boolean().default("<boolean>") }).strict().passthrough()
			},
			{
				name: "commentId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comment: CommentIdData }).strict().passthrough(),
		errors: [
			{
				status: 404,
				description: `Not Found`,
				schema: z.object({}).partial().strict().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/comments/:commentId/masters",
		alias: "getMasterByCommentId",
		requestFormat: "json",
		parameters: [
			{
				name: "commentId",
				type: "Path",
				schema: z.string()
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

export const CommentApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
