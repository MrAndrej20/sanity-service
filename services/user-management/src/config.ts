/* eslint-disable @typescript-eslint/no-non-null-assertion */
const {
    PORT,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASS,
    JWT_SECRET,
    HASH_SECRET,
} = process.env;

if (
    !DB_HOST ||
    !DB_PORT ||
    !DB_NAME ||
    !DB_USER ||
    !DB_PASS ||
    !JWT_SECRET ||
    !HASH_SECRET
) {
    throw new Error("Missing config parameters");
}

export const config = {
    PORT: parseInt(PORT!) || 80,
    hash: {
        secret: HASH_SECRET
    },
    jwt: {
        secret: JWT_SECRET,
        duration: 3600
    },
    database: {
        type: "postgres",
        host: DB_HOST,
        port: parseInt(DB_PORT),
        password: DB_PASS,
        username: DB_USER,
        name: DB_NAME
    },
};
