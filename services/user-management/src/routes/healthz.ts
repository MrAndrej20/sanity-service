import express from "express";

const app = express();

app.get(
    "/",
    (req, res) => {
        return res.send({
            service: "user-management",
            url: req.url,
            hostname: req.hostname,
            baseUrl: req.baseUrl,
            healthy: true,
            ip: req.ip,
            params: req.params,
            query: req.query,
        });
    }
);

export const route = app;
