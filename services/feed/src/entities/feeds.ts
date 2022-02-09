import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export type InsertFeedEntity = Omit<Feed, "id" | "dateCreated" | "dateUpdated">;

export enum FeedType {
	ACTIVITY = "ACTIVITY"
}

@Entity()
export class Feed {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	userId!: string;

	@Column()
	type!: FeedType;

	@Column()
	firstName!: string;

	@Column()
	lastName!: string;

	@Column({ type: "json" })
	metadata!: Record<string, any>;

	@CreateDateColumn({ type: "timestamp" })
	dateCreated!: string;

	@UpdateDateColumn({ type: "timestamp" })
	dateUpdated!: string;
}
