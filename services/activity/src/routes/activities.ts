import { json as parseJSON } from "body-parser";
import express from "express";

import * as errorHandler from "../lib/async-response-handler";
import { extractUserFromAuthorization } from "../lib/extract-user-from-token";
import { authorize } from "../lib/jwt-authorization";
import { validate } from "../lib/validate";
import { ActivityManager } from "../models/activity-manager";
import { createActivityRequest } from "../validation";

const app = express();

app.get(
    "/",
    authorize(),
    errorHandler.wrap(req => {
        const user = extractUserFromAuthorization(req.get("Authorization"));
        return new ActivityManager(user, req.get("Authorization")!).getAll();
    })
);

app.post(
    "/",
    authorize(),
    parseJSON(),
    validate(createActivityRequest),
    errorHandler.wrap(req => {
        const user = extractUserFromAuthorization(req.get("Authorization"));
        return new ActivityManager(user, req.get("Authorization")!).create(req.body);
    })
);

export const route = app;
