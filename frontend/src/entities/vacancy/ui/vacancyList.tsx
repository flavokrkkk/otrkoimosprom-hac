import { useNavigate } from "react-router-dom";
import { useGetVacancy } from "../hooks/useGetVacancy";
import { VacancyItem } from "./vacancyItem";
import { ERouteNames } from "@/shared";
import { useCallback } from "react";
import { LoadingCard } from "@/widgets/loadingCard/ui/loadingCard";
import { Image } from "@/shared/ui";

export const VacancyList = () => {
  const { data: vacancies, isLoading } = useGetVacancy();
  const navigate = useNavigate();

  const handleNavigateToDetail = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const vacancyId = event.currentTarget.value;
      if (vacancyId) {
        navigate(`${ERouteNames.VACANCY_DETAIL_ROUTE}/${vacancyId}`);
      }
    },
    [navigate]
  );

  return (
    <div className="space-y-3">
      {isLoading ? (
        <LoadingCard className="h-[460px]" />
      ) : vacancies && vacancies.length > 0 ? (
        vacancies.map((vacancy) => (
          <VacancyItem
            key={vacancy.id}
            vacancy={vacancy}
            onNavigate={handleNavigateToDetail}
          />
        ))
      ) : (
        <div className="flex justify-center flex-col items-center space-y-1 mt-10">
          <Image
            alt="empty-hack"
            src="/public/images/Blue Holo (49).png"
            width={120}
            height={120}
          />
          <p className="text-sm text-zinc-400">Вакансий нет.</p>
        </div>
      )}
    </div>
  );
};
