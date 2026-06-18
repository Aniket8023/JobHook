
import { Divider } from "@mantine/core";
import SearchBar from "../FindTalent/SearchBar";
import Talents from "../FindTalent/Talents";

const FindTalentPage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
      
      <SearchBar />
      <Divider mr="xs" mx="md" />
      <Talents />
    </div>
  );
};

export default FindTalentPage;
