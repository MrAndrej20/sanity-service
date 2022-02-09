import Joi from "joi";
import { NotificationType } from "../entities/notifications";

export type CreateNotificationRequest = {
    type: NotificationType;
    metadata: Record<string, any>;
}

export const createNotificationRequest = Joi.object<CreateNotificationRequest>({
    type: Joi.string().valid(NotificationType.ACTIVITY).required(),
    metadata: Joi.object().required(),
});

export type FollowRequest = {
    targetUserId: string;
}

export const followRequest = Joi.object<FollowRequest>({
    targetUserId: Joi.string().required(),
});
