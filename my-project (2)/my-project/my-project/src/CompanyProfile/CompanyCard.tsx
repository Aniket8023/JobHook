import { ActionIcon } from "@mantine/core";
import { IconBuilding, IconExternalLink } from "@tabler/icons-react";

const CompanyCard = (props: any) => {
  return (
    <div className="w-full">
      <div
        className="
        flex justify-between items-center
        bg-mine-shaft-900
        rounded-lg
        p-3
        hover:shadow-[0_0_5px_1px_yellow]
        transition-all duration-300
        "
      >
        <div className="flex gap-3 items-center min-w-0">
          <div className="p-2 bg-mine-shaft-800 rounded-md shrink-0">
            <IconBuilding className="h-6 w-6 md:h-7 md:w-7 text-bright-sun-400" />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="font-semibold text-sm md:text-base truncate">
              {props.name}
            </div>

            <div className="text-xs text-mine-shaft-300">
              {props.employees} Employees
            </div>
          </div>
        </div>

        <ActionIcon
          color="bright-sun.4"
          variant="subtle"
          size="lg"
          className="shrink-0"
        >
          <IconExternalLink size={18} />
        </ActionIcon>
      </div>
    </div>
  );
};

export default CompanyCard;