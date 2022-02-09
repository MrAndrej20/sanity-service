import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, } from "typeorm";

export type InsertRecordEntity = Omit<Record, "id" | "dateCreated" | "dateUpdated">;

@Entity()
export class Record {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("uuid")
    userId!: string;

    @Column()
    text!: string;

    @Column()
    date!: string;

    @Column()
    time!: string;

    @Column()
    numberOfCalories!: number;

    @CreateDateColumn({ type: "timestamp" })
    dateCreated!: string;

    @UpdateDateColumn({ type: "timestamp" })
    dateUpdated!: string;
}
