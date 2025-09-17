import { Entity, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './BaseEntity';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity()
export class Task extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.createdTasks, { nullable: true, eager: true })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.assignedTasks, { nullable: true, eager: true })
  assignedTo: User;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;
}
