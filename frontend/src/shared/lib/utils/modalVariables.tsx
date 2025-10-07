import { JSX } from "react";

export const enum EModalVariables {}

export const modalComponents: Record<EModalVariables, JSX.Element> = {};

export const getModalComponent = (type: EModalVariables): React.ReactNode => {
  return modalComponents[type];
};
