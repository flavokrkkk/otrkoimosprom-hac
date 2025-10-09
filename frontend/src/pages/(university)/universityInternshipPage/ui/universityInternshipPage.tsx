import { useState } from "react";
import { motion } from "framer-motion";
import {
  internshipListingsMock,
  studentsMock,
} from "@/entities/university/lib/constants";
import { InternshipListing } from "@/entities/vacancy/types/types";
import { InternshipCard } from "@/entities/university/ui/universityInternshipCard";
import { Image } from "@/shared/ui";
import { useActions } from "@/shared/hooks/useActions";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";

const UniversityInternshipPage = () => {
  const { setOpenModal } = useActions();
  const [internshipListings, setInternshipListings] = useState<
    InternshipListing[]
  >(internshipListingsMock);
  const [selectedListing, setSelectedListing] =
    useState<InternshipListing | null>(null);

  const handleAttachStudents = (listingId: string) => {
    const listing = internshipListings.find((l) => l.id === listingId);
    if (listing) {
      setSelectedListing(listing);
      setOpenModal({
        isOpen: true,
        type: EModalVariables.ATTACH_STUDENT_ON_INTERNSHIP,
        data: {
          listing: listing,
          allStudents: studentsMock,
        },
      });
    }
  };

  //   const handleSaveAttachedStudents = (listingId: string, selectedStudentIds: string[]) => {
  //     setInternshipListings(prevListings =>
  //       prevListings.map(listing =>
  //         listing.id === listingId
  //           ? { ...listing, attachedStudents: selectedStudentIds }
  //           : listing
  //       )
  //     );
  //   };

  return (
    <div className="space-y-6 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="relative"
      >
        <Image
          src="/images/vacancy_main.png"
          alt="vacancy-banner"
          className="rounded-3xl w-full"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-lg font-medium text-white">
                Прикрепляйте студентов к открытым вакансиям компаний-партнеров.
              </h1>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internshipListings.map((listing) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.1 * internshipListings.indexOf(listing),
            }}
          >
            <InternshipCard
              listing={listing}
              onAttachStudents={handleAttachStudents}
              allStudents={studentsMock}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UniversityInternshipPage;
