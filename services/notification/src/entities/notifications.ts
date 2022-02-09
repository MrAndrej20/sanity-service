import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export type InsertNotificationEntity = Omit<Notification, "id" | "read" | "dateCreated" | "dateUpdated">;

export enum NotificationType {
	"ACTIVITY" = "ACTIVITY"
}

@Entity()
export class Notification {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	userId!: string;

	@Column()
	type!: NotificationType;

	@Column()
	firstName!: string;

	@Column()
	lastName!: string;

	@Column({ type: "json" })
	metadata!: Record<string, any>;

	@Column({ default: false })
	read!: boolean;

	@CreateDateColumn({ type: "timestamp" })
	dateCreated!: string;

	@UpdateDateColumn({ type: "timestamp" })
	dateUpdated!: string;
}
