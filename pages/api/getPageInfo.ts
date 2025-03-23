import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";
import { PageInfo } from "../../typings";

const query = groq`
    *[_type == 'pageInfo'][0]
`;

type Data = {
    pageInfo?: PageInfo;
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const pageInfo: PageInfo = await sanityClient.fetch(query);

        if (!pageInfo) {
            throw new Error("No PageInfo found");
        }

        res.status(200).json({ pageInfo });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Failed to fetch page info" });
    }
}
