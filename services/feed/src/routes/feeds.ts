import { json as parseJSON } from "body-parser";
import express from "express";

import * as errorHandler from "../lib/async-response-handler";
import { extractUserFromAuthorization } from "../lib/extract-user-from-token";
import { authorize } from "../lib/jwt-authorization";
import { validate } from "../lib/validate";
import { FeedManager } from "../models/feed-manager";
import { updateUserRequest } from "../validation";

const app = express();

app.get(
    "/",
    authorize(),
    errorHandler.wrap(req => {
        const user = extractUserFromAuthorization(req.get("Authorization"));
        return new FeedManager(user).getAll();
    })
);

app.post(
    "/",
    authorize(),
    parseJSON(),
    validate(updateUserRequest),
    errorHandler.wrap(req => {
        const user = extractUserFromAuthorization(req.get("Authorization"));
        return new FeedManager(user).create(req.body);
    })
);

export const route = app;
