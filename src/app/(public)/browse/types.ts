export interface Petition {
  id: string;
  title: string;
  description: string;
  image_url: string;
  location: string;
  category: string;
  goal: number;
  scope: string;
  userId: string;
  createdAt: { seconds: number; nanoseconds: number };
  updatedAt: { seconds: number; nanoseconds: number };
}

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

interface Update {
  text: string;
  time: string;
}

interface ReasonForSigning {
  name: string;
  time: string;
  reason: string;
  likes: number;
}
