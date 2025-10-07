import { VacancyList } from "@/entities/vacancy/ui/vacancyList";
import { VacancyFIlter } from "./vacancyFIlter";

export const VacancyContent = () => {
  return (
    <div className="space-y-3">
      {/* Табы для обычный вакансий и стажировок */}
      <VacancyFIlter />
      <VacancyList />
    </div>
  );
};
