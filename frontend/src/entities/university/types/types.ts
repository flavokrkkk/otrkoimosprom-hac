export interface UniversityData {
  universityName: string;
  groupName: string;
  course: number;
}

export interface UniversitySuggest {
  value: string;
  unrestricted_value: string;
  data: {
    address: string;
    inn: string;
    orgn: string;
    okpo: string;
  };
}
