import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const CompanyEmployees = () => {
  return (
    <div
      className="
      mt-6
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-3
      gap-5
      "
    >
      {talents.map(
        (talent, index) =>
          index < 6 && (
            <TalentCard
              key={index}
              {...talent}
            />
          )
      )}
    </div>
  );
};

export default CompanyEmployees;