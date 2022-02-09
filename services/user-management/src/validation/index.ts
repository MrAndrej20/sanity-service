import Joi from "joi";

export type LoginUserRequest = {
    email: string;
    password: string;
}

export const loginUserRequest = Joi.object<LoginUserRequest>({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export type SignupUserRequest = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export const signupUserRequest = Joi.object<SignupUserRequest>({
    email: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
});

export type UpdateUserRequest = {
    password?: string;
    firstName?: string;
    lastName?: string;
}

export const updateUserRequest = Joi.object<UpdateUserRequest>({
    password: Joi.string().optional(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
});
