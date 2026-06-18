import { IconCertificate } from "@tabler/icons-react";


interface CertiCardProps {
  name: string;
  issuer: string;
  issueDate: string;
  certificateId: string;
}

const CertiCard = ({ name, issuer, issueDate, certificateId }: CertiCardProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-mine-shaft-800 rounded-md">
          <IconCertificate className="h-7 w-7 text-bright-sun-400" />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-mine-shaft-300">{issuer}</div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-sm text-mine-shaft-300">{issueDate}</div>
        <div className="text-sm text-mine-shaft-300">{certificateId}</div>
      </div>
    </div>
  );
};

export default CertiCard;
