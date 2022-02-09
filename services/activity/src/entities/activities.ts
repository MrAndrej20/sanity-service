import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export type InsertActivityEntity = Omit<Activity, "id" | "dateCreated" | "dateUpdated">;

@Entity()
export class Activity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column("uuid")
	userId!: string;

	@Column()
	type!: string;

	@Column()
	duration!: number;

	@Column()
	caloriesBurned!: number;

	@CreateDateColumn({ type: "timestamp" })
	dateCreated!: string;

	@UpdateDateColumn({ type: "timestamp" })
	dateUpdated!: string;
}
