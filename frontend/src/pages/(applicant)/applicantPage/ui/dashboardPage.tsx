import { InternshipContent } from "@/features/vacancy/ui/internshipContent";
import { VacancyContent } from "@/features/vacancy/ui/vacancyContent";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/tabs/tabs";
import { ProfileWidget } from "@/widgets/profileWidget";

const DashboardPage = () => {
  return (
    <div className="text-white space-y-8 pb-4">
      <ProfileWidget />
      <Tabs defaultValue="vacancy" className="w-full">
        <TabsList className="w-full bg-neutral-900 text-white p-1">
          <TabsTrigger value="vacancy" className="text-white p-3.5">
            Вакансии
          </TabsTrigger>
          <TabsTrigger value="internship" className="text-white p-3.5">
            Стажировки
          </TabsTrigger>
        </TabsList>
        <TabsContent value="vacancy" className="pt-4">
          <VacancyContent />
        </TabsContent>
        <TabsContent value="internship" className="pt-4">
          <InternshipContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
