import { json as parseJSON } from "body-parser";
import express from "express";

import * as errorHandler from "../lib/async-response-handler";
import { extractUserFromAuthorization } from "../lib/extract-user-from-token";
import { authorize } from "../lib/jwt-authorization";
import { validate } from "../lib/validate";
import { FollowerManager } from "../models/follower-manager";
import { followRequest } from "../validation";

const app = express();

app.post(
    "/",
    authorize(),
    parseJSON(),
    validate(followRequest),
    errorHandler.wrap(req => {
        const { body } = req;
        const user = extractUserFromAuthorization(req.get("Authorization"));
        return new FollowerManager(user).create(body);
    })
);

export const route = app;
