import Joi from "joi";

export type CreateRecordRequest = {
    date: string;
    time: string;
    text: string;
    numberOfCalories?: number;
}

export const createRecordRequest = Joi.object<CreateRecordRequest>({
    date: Joi.string().length(10),
    time: Joi.string().length(8),
    text: Joi.string(),
    numberOfCalories: Joi.number().min(0).optional(),
});
