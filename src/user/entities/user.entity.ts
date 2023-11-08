import { Column, Entity, Generated, PrimaryColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryColumn({ type: 'varchar', generated: 'uuid', length: 36 })
  id: string;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  desc: string;

  /* @Column({ select: true, comment: '注释', default: '123', nullable: true })
  password: string;

  @Generated('uuid')
  uuid: string;

  @Column({ type: 'timestamp' })
  createTime: Date;

  @Column({ type: 'enum', enum: [1, 2, 3], default: 1 })
  test: number;

  @Column({ type: 'simple-array' })
  names: string[];

  @Column({ type: 'simple-json' })
  json: { name: string; age: number }; */
}
