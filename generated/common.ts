import { z } from "zod";


export const validateAuthCode_Body = z.object({ phoneNumber: z.string().default("<string>"), code: z.number().int().default(<integer>), provider: ProviderTypeDto.default("<string>") }).strict().passthrough();
