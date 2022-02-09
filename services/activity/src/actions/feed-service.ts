import nf from "node-fetch";
import HTTP from "http-status-codes";

import { config } from "../config";
import { codedError } from "../lib/coded-error";

export enum FeedType {
    ACTIVITY = "ACTIVITY"
}

type CreateFeedRequest = {
    type: FeedType;
    metadata: Record<string, any>;
}

export class FeedService {

    private readonly endpoint = config.services.feed.endpoint;
    constructor(private readonly accessToken: string) {
    }

    async create(body: CreateFeedRequest) {
        const response = await nf(`${this.endpoint}/feeds`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.accessToken,
            },
            body: JSON.stringify(body)
        });
        if (response.status !== HTTP.OK) {
            throw codedError(response.status, await response.json());
        }
    }
}
