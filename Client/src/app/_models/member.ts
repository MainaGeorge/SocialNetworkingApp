import {Photo} from "./photo";

export interface Member {
  id: number;
  age: number;
  photoUrl: string;
  username: string;
  knownAs: string;
  createdAt: Date;
  lastActive: Date;
  gender: string;
  interests: string;
  lookingFor: string;
  introduction: string;
  city: string;
  country: string;
  photos: Photo[];
}
