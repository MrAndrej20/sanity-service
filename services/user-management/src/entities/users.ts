import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export type InsertUserEntity = Omit<User, "id" | "dateCreated" | "dateUpdated">;

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	firstName!: string;

	@Column()
	lastName!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@CreateDateColumn({ type: "timestamp" })
	dateCreated!: string;

	@UpdateDateColumn({ type: "timestamp" })
	dateUpdated!: string;
}
