import Joi from "joi";

export type CreateActivityRequest = {
    type: string;
    duration: number;
    caloriesBurned: number;
}

export const createActivityRequest = Joi.object<CreateActivityRequest>({
    type: Joi.string().required(),
    duration: Joi.number().min(0).required(),
    caloriesBurned: Joi.number().min(0).required(),
});
