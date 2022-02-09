import { getConnection, Repository } from "typeorm";

import { InsertFeedEntity, Feed } from "../entities/feeds";
import { JWTPayload } from "../lib/extract-user-from-token";
import { CreateFeedRequest } from "../validation";


export class FeedManager {
    private readonly feedTable: Repository<Feed>;

    constructor(
        private readonly user: JWTPayload,
    ) {
        this.feedTable = getConnection().getRepository(Feed);
    }

    async getAll(): Promise<Feed[]> {
        const feeds = await this.feedTable.find({ order: { dateCreated: "DESC" } });
        return feeds;
    }

    async create(createData: CreateFeedRequest): Promise<{ done: true; }> {
        const feed: InsertFeedEntity = {
            userId: this.user.userId,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            metadata: createData.metadata,
            type: createData.type
        };
        await this.feedTable.insert(feed);
        return { done: true };
    }

}