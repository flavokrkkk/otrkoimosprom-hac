import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select/select";
import { motion } from "framer-motion";
import { REGISTER_ROLE } from "../lib/constants";
import { Button } from "@/shared/ui";
import { useActions } from "@/shared/hooks/useActions";
import { EAuthRoles } from "../types/types";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { selectAuthRole } from "../model/store/authSlice";

interface RegisterRoleProps {
  onNextStep: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const RegisterRole = ({ onNextStep }: RegisterRoleProps) => {
  const selectRole = useAppSelector(selectAuthRole);
  const { setAuthRole } = useActions();

  const handleRoleChange = (value: EAuthRoles) => {
    setAuthRole(value);
  };

  return (
    <div className="space-y-6 flex flex-col w-full items-center h-full border bg-neutral-800 border-zinc-700 p-6 md:p-10 rounded-3xl">
      <section className="space-y-1">
        <h2 className="font-medium text-white text-lg text-center">
          Выберите вашу роль
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300 text-center">
          Это необходимо для того, чтобы вы могли получить доступ{" "}
          <br className="hidden sm:block" /> ко всем функциям нашего сервиса.
        </p>
      </section>
      <div className="w-full space-y-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="w-full"
        >
          <Select onValueChange={handleRoleChange}>
            <SelectTrigger className="w-full rounded-xl bg-neutral-900 border-zinc-700 text-zinc-300 text-[13px] focus:ring-1 focus:ring-indigo-500 py-6 px-3">
              <SelectValue placeholder="Выбрать роль" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-900 border-zinc-700 text-zinc-300 rounded-xl">
              {REGISTER_ROLE.map((role) => (
                <SelectItem key={role.id} value={role.role} className="p-3">
                  {role.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
        <Button
          value={"info"}
          variant={"outline"}
          disabled={!selectRole}
          onClick={onNextStep}
          className="px-10 py-5 w-full"
        >
          Далее
        </Button>
      </div>
    </div>
  );
};
