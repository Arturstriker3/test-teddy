import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity('urls')
export class Url {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true })
    shortUrl: string;

    @Column({ type: 'text' })
    originalUrl: string;

    @ManyToOne(() => User, (user) => user.urls, { nullable: true })
    user: User;

    @Column({ type: 'int', default: 0 })
    clickCount: number;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    updatedAt: Date | null;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt: Date | null;
}