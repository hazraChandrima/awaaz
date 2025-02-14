export interface IPetition {
  title: string;
  description: string;
  image_url: string;
  category: string;
  scope: "local" | "national" | "global";
  userId: string;
  location: string;
  goal: number;
  createdAt: Date;
  updatedAt: Date;
}