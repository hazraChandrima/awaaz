import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  });

export default mongoose.model<ICategory>("Category", CategorySchema);