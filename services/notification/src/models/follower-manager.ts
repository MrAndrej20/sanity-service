import { getConnection, Repository } from "typeorm";

import { InsertFollowerEntity, Follower } from "../entities/followers";
import { JWTPayload } from "../lib/extract-user-from-token";
import { FollowRequest } from "../validation";


export class FollowerManager {
    private readonly followerTable: Repository<Follower>;

    constructor(
        private readonly user: JWTPayload,
    ) {
        this.followerTable = getConnection().getRepository(Follower);
    }

    async getFollowers(): Promise<Follower[]> {
        const followers = await this.followerTable.find({ targetUserId: this.user.userId });
        return followers;
    }

    async create({ targetUserId }: FollowRequest): Promise<{ done: true; }> {
        const follower: InsertFollowerEntity = {
            userId: this.user.userId,
            targetUserId,
        };
        await getConnection().getRepository(Follower).insert(follower);
        return { done: true };
    }

}