import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";






const endpoints = makeApi([
	{
		method: "get",
		path: "/membership-waitlists",
		alias: "getMembershipWaitlist",
		requestFormat: "json",
		parameters: [
			{
				name: "isDisplay",
				type: "Query",
				schema: z.boolean().optional().default("<boolean>")
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
		response: z.object({ membershipWaitlists: z.array(MembershipWaitlist).max(2) }).strict().passthrough(),
	},
]);

export const MembershipWaitlistApi = new Zodios("http://localhost:3000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
