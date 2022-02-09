import { json as parseJSON } from "body-parser";
import express from "express";

import * as errorHandler from "../lib/async-response-handler";
import { extractUserFromAuthorization } from "../lib/extract-user-from-token";
import { authorize } from "../lib/jwt-authorization";
import { validate } from "../lib/validate";
import { RecordManager } from "../models/record-manager";
import { createRecordRequest } from "../validation";

const app = express();

app.get(
    "/",
    authorize(),
    errorHandler.wrap(req => {
        const user = extractUserFromAuthorization(req.get("Authorization"));
        return new RecordManager(user).getAll();
    })
);

app.post(
    "/",
    authorize(),
    parseJSON(),
    validate(createRecordRequest),
    errorHandler.wrap(req => {
        const user = extractUserFromAuthorization(req.get("Authorization"));
        return new RecordManager(user).create(req.body);
    })
);

export const route = app;
