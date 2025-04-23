import { z } from "zod";
import { getDomainWithoutSuffix } from "tldts";

const supportedDomains = ["amazon", "mercadolivre", "magazineluiza", "olx"];

export const CreateProductSchema = z.object({
    url: z
        .string()
        .url()
        .startsWith("https://", {
            message: "Please enter a valid url.",
        })
        .refine(
            (url) => {
                const domain = getDomainWithoutSuffix(url);
                return domain && supportedDomains.includes(domain);
            },
            {
                message: "Please enter a supported website.",
            }
        ),
});
