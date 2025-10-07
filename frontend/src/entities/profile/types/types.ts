import { UniversityData } from "@/entities/university/types/types";

export interface Profile {
  id: number;
  email: string;
  username: string;
  image_url: string;
  cv_file: string;
  is_admin: true;
  university: UniversityData;
}
