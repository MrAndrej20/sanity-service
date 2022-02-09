import HTTP from "http-status-codes";
import { getConnection, Repository } from "typeorm";

import { InsertUserEntity, User } from "../entities/users";
import { codedError } from "../lib/coded-error";
import { JWTPayload } from "../lib/extract-user-from-token";
import { createAccessToken } from "../lib/jwt-authorization";
import { hashPassword } from "../lib/password-hash";
import { LoginUserRequest, SignupUserRequest, UpdateUserRequest } from "../validation";


export class UserManager {
    private readonly userTable: Repository<User>;

    constructor(
        private readonly user: JWTPayload,
    ) {
        this.userTable = getConnection().getRepository(User);
    }

    static async login({ email, password }: LoginUserRequest): Promise<{ done: true; accessToken: string; }> {
        const userTable = getConnection().getRepository(User);

        const user = await userTable.findOne({ email });
        if (!user || user.password !== hashPassword(password)) {
            throw codedError(HTTP.BAD_REQUEST, "Wrong Credentials");
        }

        const accessToken = createAccessToken({ ...user, userId: user.id });
        return { done: true, accessToken };
    }

    static async signup(signupData: SignupUserRequest): Promise<{ done: true; accessToken: string; }> {
        const userTable = getConnection().getRepository(User);

        const user = await userTable.findOne({ email: signupData.email });

        if (user) {
            throw codedError(HTTP.BAD_REQUEST, `User with email ${signupData.email} already exists`);
        }

        const newUser: InsertUserEntity = {
            email: signupData.email,
            firstName: signupData.firstName,
            password: hashPassword(signupData.password),
            lastName: signupData.lastName,
        };
        const { identifiers: [{ id }] } = await userTable.insert(newUser);
        const accessToken = createAccessToken({ ...newUser, userId: id });
        return { done: true, accessToken };
    }

    async get(): Promise<{ id: string; email: string; firstName: string; lastName: string }> {
        const user = await this.getRaw();
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        };
    }

    async update(updateData: UpdateUserRequest): Promise<{ done: true; }> {
        const user = await this.getRaw();
        const updateUser: Partial<User> = {
            firstName: updateData.firstName || user.firstName,
            password: updateData.password ?
                hashPassword(updateData.password) :
                user.password,
            lastName: updateData.lastName || user.lastName,
        };
        await this.userTable.update(this.user.userId, updateUser);
        return { done: true };
    }

    private async getRaw(): Promise<User> {
        const user = await this.userTable.findOne(this.user.userId);
        if (!user) {
            throw codedError(HTTP.NOT_FOUND, `User does not exist`);
        }
        return user;
    }

}