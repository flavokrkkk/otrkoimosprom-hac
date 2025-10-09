// components/internship/InternshipCard.tsx
import React from "react";
import { Users, Briefcase, Calendar, XCircle, CheckCircle } from "lucide-react";
import { Student } from "../types/types";
import { InternshipListing } from "@/entities/vacancy/types/types";
import { cn } from "@/shared/lib/utils/twMerge";
import { Badge } from "@/shared/ui/badge/ui/badge";
import { Button } from "@/shared/ui";

interface InternshipCardProps {
  listing: InternshipListing;
  onAttachStudents: (listingId: string) => void;
  allStudents: Student[]; // Передаем всех студентов для отображения прикрепленных
}

export const InternshipCard: React.FC<InternshipCardProps> = ({
  listing,
  onAttachStudents,
  allStudents,
}) => {
  const attachedStudentsCount = listing.attachedStudents.length;
  const remainingSlots = listing.availableSlots - attachedStudentsCount;
  const isFull = remainingSlots <= 0;
  const isClosed = listing.status === "closed";

  const getStudentNames = (studentIds: number[]) => {
    return studentIds
      .map((id) => allStudents.find((s) => s.id === id)?.name || `ID: ${id}`)
      .join(", ");
  };

  return (
    <div
      className={cn(
        "relative bg-neutral-900 text-white rounded-3xl p-6 flex flex-col gap-5 shadow-lg transition-all duration-300",
        isClosed ? "opacity-70 grayscale" : "hover:shadow-xl"
        //   isRecommended && "border-2 border-emerald-600" // Оставил этот пропс, если хотите использовать его здесь
      )}
    >
      {isClosed && (
        <div className="absolute inset-0 bg-neutral-900 bg-opacity-80 flex items-center justify-center rounded-3xl z-10">
          <span className="text-xl font-bold text-red-500 flex items-center gap-2">
            <XCircle className="w-6 h-6" /> Набор закрыт
          </span>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Здесь можно добавить лого компании, если есть */}
          <Briefcase className="w-8 h-8 text-indigo-400" />
          <div>
            <h3 className="text-xl font-bold">{listing.companyName}</h3>
            <p className="text-zinc-400 text-sm">{listing.position}</p>
          </div>
        </div>
        <Badge
          className={cn(
            "px-3 py-1 text-xs font-semibold",
            isFull ? "bg-red-600" : "bg-indigo-600",
            isClosed && "bg-gray-700"
          )}
        >
          {isClosed ? "Закрыт" : isFull ? "Мест нет" : `${remainingSlots} мест`}
        </Badge>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-zinc-400 text-sm flex items-center gap-2">
          <Calendar className="w-4 h-4" /> Крайний срок:{" "}
          <span className="font-medium text-white">
            {new Date(listing.deadline).toLocaleDateString()}
          </span>
        </p>
        <p className="text-zinc-400 text-sm">
          Навыки:{" "}
          <span className="font-medium text-white">
            {listing.requiredSkills.join(", ")}
          </span>
        </p>
        {listing.attachedStudents.length > 0 && (
          <p className="text-zinc-400 text-sm flex items-center gap-2">
            <Users className="w-4 h-4" /> Прикреплено:{" "}
            <span className="font-medium text-white">
              {getStudentNames(listing.attachedStudents)} (
              {attachedStudentsCount} из {listing.availableSlots})
            </span>
          </p>
        )}
      </div>

      <Button
        onClick={() => onAttachStudents(listing.id)}
        disabled={isFull || isClosed}
        className={cn(
          "w-full py-4",
          "bg-indigo-600 hover:bg-indigo-700 text-white",
          (isFull || isClosed) &&
            "bg-gray-700 cursor-not-allowed hover:bg-gray-700"
        )}
      >
        Прикрепить студентов
      </Button>
    </div>
  );
};
