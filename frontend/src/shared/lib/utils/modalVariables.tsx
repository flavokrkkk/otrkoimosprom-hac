import { UniversityAttachInternshipModal } from "@/entities/university/ui/universityAttachInternshipModal";
import { JSX } from "react";

export const enum EModalVariables {
  ATTACH_STUDENT_ON_INTERNSHIP = "ATTACH_STUDENT_ON_INTERNSHIP",
}

export const modalComponents: Record<EModalVariables, JSX.Element> = {
  [EModalVariables.ATTACH_STUDENT_ON_INTERNSHIP]: (
    <UniversityAttachInternshipModal />
  ),
};

export const getModalComponent = (type: EModalVariables): React.ReactNode => {
  return modalComponents[type];
};
