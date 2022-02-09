import { getConnection, Repository } from "typeorm";
import { NutritionX } from "../actions/nutritionx";

import { InsertRecordEntity, Record } from "../entities/records";
import { JWTPayload } from "../lib/extract-user-from-token";
import { CreateRecordRequest } from "../validation";


export class RecordManager {
    private readonly recordTable: Repository<Record>;

    constructor(
        private readonly user: JWTPayload,
    ) {
        this.recordTable = getConnection().getRepository(Record);
    }

    async getAll(): Promise<Record[]> {
        const records = await this.recordTable.find({ userId: this.user.userId });
        return records;
    }

    async create(createData: CreateRecordRequest): Promise<{ done: true; }> {
        const record: InsertRecordEntity = {
            userId: this.user.userId,
            date: createData.date,
            time: createData.time,
            numberOfCalories: createData.numberOfCalories || await new NutritionX().getCalories(createData.text),
            text: createData.text
        };
        await this.recordTable.insert(record);
        return { done: true };
    }
}
