import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  profile_image: string;
  password: string;
  petitions: mongoose.Types.ObjectId[];
  location: string;
  phone_number: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    profile_image: { type: String, required: true },
    password: { type: String, required: true },
    petitions: [{ type: Schema.Types.ObjectId, ref: "Petition" }],
    location: { type: String, required: true },
    phone_number: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);