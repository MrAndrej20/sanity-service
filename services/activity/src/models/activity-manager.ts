import { getConnection, Repository } from "typeorm";
import HTTP from "http-status-codes";

import { FeedService, FeedType } from "../actions/feed-service";
import { NotificationService, NotificationType } from "../actions/notification-service";
import { InsertActivityEntity, Activity } from "../entities/activities";
import { codedError } from "../lib/coded-error";
import { JWTPayload } from "../lib/extract-user-from-token";
import { CreateActivityRequest } from "../validation";


export class ActivityManager {
    private readonly activityTable: Repository<Activity>;

    constructor(
        private readonly user: JWTPayload,
        private readonly accessToken: string,
    ) {
        this.activityTable = getConnection().getRepository(Activity);
    }

    async getAll(): Promise<Activity[]> {
        const activities = await this.activityTable.find({ userId: this.user.userId });
        return activities;
    }

    async create(createData: CreateActivityRequest): Promise<{ done: true; }> {
        const createActivity: InsertActivityEntity = {
            userId: this.user.userId,
            type: createData.type,
            duration: createData.duration,
            caloriesBurned: createData.caloriesBurned,
        };
        const { identifiers: [{ id }] } = await this.activityTable.insert(createActivity);
        const activity = await this.getRaw(id);
        await Promise.all([
            new FeedService(this.accessToken).create({
                type: FeedType.ACTIVITY,
                metadata: activity
            }),
            new NotificationService(this.accessToken).create({
                type: NotificationType.ACTIVITY,
                metadata: activity,
            }),
        ]);
        return { done: true };
    }

    private async getRaw(id: string) {
        const activity = await this.activityTable.findOne(id);
        if (!activity) {
            throw codedError(HTTP.NOT_FOUND, `User does not exist`);
        }
        return activity;
    }

}
