import { CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

export type InsertFollowerEntity = Omit<Follower, "dateCreated" | "dateUpdated">;

@Entity()
export class Follower {
    @PrimaryColumn("uuid")
    userId!: string;

    @PrimaryColumn("uuid")
    targetUserId!: string;

    @CreateDateColumn({ type: "timestamp" })
    dateCreated!: string;

    @UpdateDateColumn({ type: "timestamp" })
    dateUpdated!: string;
}
