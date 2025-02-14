import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  clerk_id: string;
  profile_image: string;
  petitions: mongoose.Types.ObjectId;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  clerk_id: { type: String, required: true },
  profile_image: { type: String, required: true },
  petitions: [{ type: Schema.Types.ObjectId, ref: "Petition" }],
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  });

export default mongoose.model<IUser>("User", UserSchema);