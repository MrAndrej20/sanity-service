import nf from "node-fetch";
import HTTP from "http-status-codes";

import { config } from "../config";
import { codedError } from "../lib/coded-error";

export enum NotificationType {
    "ACTIVITY" = "ACTIVITY"
}

type CreateNotificationRequest = {
    type: NotificationType;
    metadata: Record<string, any>;
}

export class NotificationService {

    private readonly endpoint = config.services.notification.endpoint;
    constructor(private readonly accessToken: string) { }

    async create(body: CreateNotificationRequest) {
        const response = await nf(`${this.endpoint}/notifications`, {
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
