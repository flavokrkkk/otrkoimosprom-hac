import { InternshipList } from "@/entities/vacancy/ui/internshipList";
import { InternshipFilter } from "./internshipFilter";

export const InternshipContent = () => {
  return (
    <div className="space-y-3">
      <InternshipFilter />
      <InternshipList />
    </div>
  );
};
