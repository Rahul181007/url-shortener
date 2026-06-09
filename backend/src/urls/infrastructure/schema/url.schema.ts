import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
export type UrlDocument = HydratedDocument<Url>;
@Schema({ timestamps: true })
export class Url {
  @Prop({
    required: true,
  })
  originalUrl!: string;

  @Prop({
    required: true,
    unique: true,
  })
  shortCode!: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId!: Types.ObjectId;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
