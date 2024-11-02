import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Url } from './Url';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text', unique: true })
    email: string;

    @Column({ type: 'text' })
    password: string;

    @OneToMany(() => Url, (url) => url.user)
    urls: Url[];

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true, default: () => 'NULL' })
    updatedAt: Date | null;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt: Date | null;
}