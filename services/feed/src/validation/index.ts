import Joi from "joi";
import { FeedType } from "../entities/feeds";

export type CreateFeedRequest = {
    type: FeedType;
    metadata: Record<string, any>;
}

export const updateUserRequest = Joi.object<CreateFeedRequest>({
    type: Joi.string().valid(FeedType.ACTIVITY).required(),
    metadata: Joi.object().required(),
});
