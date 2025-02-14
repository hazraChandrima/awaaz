import mongoose, { Schema, Document } from "mongoose";

export interface IPetition extends Document {
  title: string;
  description: string;
  image_url: string;
  category: mongoose.Types.ObjectId;
  scope: "local" | "national" | "global";
  user: mongoose.Types.ObjectId
  location: string;
  goal: number;
  expiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PetitionSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image_url: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: false },
    scope: {
      type: String,
      enum: ["local", "national", "global"],
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: String, required: true },
    goal: { type: Number, required: true },
    expiry: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Petition || mongoose.model<IPetition>("Petition", PetitionSchema);