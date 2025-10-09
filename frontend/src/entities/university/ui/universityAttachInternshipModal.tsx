import { modalSelectors } from "@/entities/modal/model/store/modalSlice";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import { Button, Image } from "@/shared/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog/dialog";
import { useState, useMemo, useEffect } from "react";
import { PlusCircle, MinusCircle, UserPlus, X } from "lucide-react";
import { InternshipListing } from "@/entities/vacancy/types/types";
import { Student } from "../types/types";
import { useActions } from "@/shared/hooks/useActions";
import { Label } from "@/shared/ui/label/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select/select";
import { Checkbox } from "@/shared/ui/checkbox/checkbox";
import { Badge } from "@/shared/ui/badge/ui/badge";
import { cn } from "@/shared/lib/utils/twMerge";

export const UniversityAttachInternshipModal = () => {
  const isOpen = useAppSelector(modalSelectors.isOpen);
  const type = useAppSelector(modalSelectors.selectType);
  const { allStudents, listing } = useAppSelector(modalSelectors.data) as {
    listing: InternshipListing;
    allStudents: Student[];
  };

  const { toggleModal } = useActions();

  const isModalOpen =
    isOpen && type === EModalVariables.ATTACH_STUDENT_ON_INTERNSHIP;

  const handleClose = () => {
    toggleModal(false);
  };
  const [selectedStudents, setSelectedStudents] = useState<Set<number>>(
    new Set()
  );
  const [filterSkill, setFilterSkill] = useState<string>("all");

  useEffect(() => {
    if (listing) {
      setSelectedStudents(new Set(listing.attachedStudents));
    } else {
      setSelectedStudents(new Set());
    }
  }, [listing]);

  const availableSlots = listing?.availableSlots || 0;
  const currentAttachedCount = selectedStudents.size;
  const canAddMore = currentAttachedCount < availableSlots;

  const relevantSkills = useMemo(() => {
    if (!listing) return [];
    return Array.from(new Set(listing.requiredSkills));
  }, [listing]);

  const filteredStudents = useMemo(() => {
    if (!listing) return [];
    const studentsWhoCanApply = allStudents
      .filter(
        (student) =>
          // Студент не должен быть уже прикреплен к этой стажировке
          !listing.attachedStudents.includes(student.id) ||
          selectedStudents.has(student.id)
      )
      .filter((student) =>
        // Студент должен иметь хотя бы один из требуемых навыков
        listing.requiredSkills.some((skill) => student.skills.includes(skill))
      );

    if (filterSkill === "all") {
      return studentsWhoCanApply;
    }
    return studentsWhoCanApply.filter((student) =>
      student.skills.includes(filterSkill)
    );
  }, [allStudents, listing, filterSkill, selectedStudents]);

  const handleCheckboxChange = (studentId: number, isChecked: boolean) => {
    setSelectedStudents((prev) => {
      const newSet = new Set(prev);
      if (isChecked && canAddMore) {
        newSet.add(studentId);
      } else if (!isChecked) {
        newSet.delete(studentId);
      }
      return newSet;
    });
  };

  const handleSave = () => {
    if (listing) {
    }
  };

  if (!listing) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] bg-neutral-900 text-white border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Прикрепить студентов к "{listing.position}"
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Для компании{" "}
            <span className="font-semibold text-indigo-300">
              {listing.companyName}
            </span>
            . Доступно{" "}
            <span className="font-bold text-white">{availableSlots}</span> мест.
            Выбрано:{" "}
            <span className="font-bold text-indigo-300">
              {currentAttachedCount}
            </span>{" "}
            из <span className="font-bold text-white">{availableSlots}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="flex items-center gap-4">
            <Label htmlFor="skill-filter" className="text-zinc-300">
              Фильтр по навыку:
            </Label>
            <Select onValueChange={setFilterSkill} defaultValue="all">
              <SelectTrigger
                id="skill-filter"
                className="w-[180px] bg-neutral-800 border-neutral-700 text-white"
              >
                <SelectValue placeholder="Все навыки" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
                <SelectItem value="all">Все навыки</SelectItem>
                {relevantSkills.map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border",
                    selectedStudents.has(student.id)
                      ? "bg-indigo-900/30 border-indigo-600"
                      : "bg-neutral-800 border-neutral-700",
                    !canAddMore &&
                      !selectedStudents.has(student.id) &&
                      "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Checkbox
                    id={`student-${student.id}`}
                    checked={selectedStudents.has(student.id)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(student.id, checked as boolean)
                    }
                    disabled={!canAddMore && !selectedStudents.has(student.id)}
                    className="data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white border-neutral-600"
                  />
                  <Label
                    htmlFor={`student-${student.id}`}
                    className="flex-1 cursor-pointer flex items-center gap-3"
                  >
                    <Image
                      src={student.imageUrl}
                      alt={student.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-white">{student.name}</p>
                      <p className="text-zinc-400 text-xs">
                        {student.groupName} - {student.course} курс
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {student.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className={cn(
                              "text-xs px-2 py-0.5",
                              listing.requiredSkills.includes(skill)
                                ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                                : "bg-neutral-700 text-zinc-400"
                            )}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Label>
                </div>
              ))
            ) : (
              <p className="col-span-2 text-center text-zinc-500">
                Нет подходящих студентов.
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 border-t border-neutral-800">
          <Button
            variant="ghost"
            onClick={handleClose}
            className="text-white hover:bg-neutral-700"
          >
            <X className="mr-2 h-4 w-4" /> Отмена
          </Button>
          <Button
            onClick={handleSave}
            disabled={!listing || currentAttachedCount > availableSlots}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <UserPlus className="mr-2 h-4 w-4" /> Сохранить (
            {currentAttachedCount})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
