import { json as parseJSON } from "body-parser";
import express from "express";

import * as errorHandler from "../lib/async-response-handler";
import { extractUserFromAuthorization } from "../lib/extract-user-from-token";
import { authorize } from "../lib/jwt-authorization";
import { validate } from "../lib/validate";
import { UserManager } from "../models/notification-manager";
import { createNotificationRequest } from "../validation";

const app = express();

app.get(
    "/",
    authorize(),
    errorHandler.wrap(req => {
        const user = extractUserFromAuthorization(req.get("Authorization"));
        return new UserManager(user).getAll();
    })
);

app.post(
    "/",
    authorize(),
    parseJSON(),
    validate(createNotificationRequest),
    errorHandler.wrap(req => {
        const { body } = req;
        const user = extractUserFromAuthorization(req.get("Authorization"));
        return new UserManager(user).create(body);
    })
);

export const route = app;
