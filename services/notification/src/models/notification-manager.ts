import { getConnection, Repository } from "typeorm";

import { InsertNotificationEntity, Notification } from "../entities/notifications";
import { JWTPayload } from "../lib/extract-user-from-token";
import { CreateNotificationRequest } from "../validation";
import { FollowerManager } from "./follower-manager";


export class UserManager {
    private readonly notificationTable: Repository<Notification>;

    constructor(
        private readonly user: JWTPayload,
    ) {
        this.notificationTable = getConnection().getRepository(Notification);
    }

    async getAll(): Promise<Notification[]> {
        const notifications = await this.notificationTable.find({
            where: { userId: this.user.userId },
            order: { dateCreated: "DESC" }
        });
        return notifications;
    }

    async create(createData: CreateNotificationRequest): Promise<{ done: true; }> {
        const followers = await new FollowerManager(this.user).getFollowers();

        const notifications: InsertNotificationEntity[] = followers.map(follower => ({
            userId: follower.userId,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            metadata: createData.metadata,
            type: createData.type
        }));
        await getConnection().getRepository(Notification).insert(notifications);
        return { done: true };
    }

}