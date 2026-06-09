import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>; //this type of the user schema
//this class should be converted into mongoDb/Moongoose schema
//equivalent to  const UserSchema=new mongoose.Schema({we write the fields},{timestamps:true})
@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    trim: true,
  })
  name!: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email!: string;

  @Prop({
    required: true,
  })
  password!: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
// mongoose doesnot understand classes  mongoose need schena so nestjs needs converts
// using SchemaFactory we convert into schema
