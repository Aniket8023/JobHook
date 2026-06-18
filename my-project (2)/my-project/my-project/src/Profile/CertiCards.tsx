import { ActionIcon, Group } from "@mantine/core";
import { IconTrash, IconPencil, IconCertificate } from "@tabler/icons-react";
import { useState } from "react";
import CertiInput from "./CertiInput";

interface CertiCardProps {
    index: number;
    name: string;
    issuer: string;
    issueDate: string;
    certificated: string;
    edit: boolean;
    onSave: (index: number, data: any) => void;
    onDelete: (index: number) => void;
}

const CertiCard = (props: CertiCardProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    if (isEditing) {
        return <CertiInput 
            {...props} 
            setEdit={setIsEditing} 
            onSave={(data: any) => {
                props.onSave(props.index, data);
                setIsEditing(false);
            }} 
        />;
    }

    return (
        <div className="flex flex-col md:flex-row md:justify-between gap-4 bg-mine-shaft-900 p-4 rounded-xl">
            <div className="flex gap-3 items-start">
                <div className="p-2 bg-mine-shaft-800 rounded-md">
                    <IconCertificate className="h-6 w-6 md:h-7 md:w-7 text-bright-sun-400" />
                </div>
                <div className="flex flex-col">
                    <div className="font-semibold text-sm md:text-base">
                        {props.name}
                    </div>
                   <div className="text-xs md:text-sm text-mine-shaft-300">
                        {props.issuer}
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex flex-col md:items-end">
                    <div className="text-xs md:text-sm text-mine-shaft-300">{formatDate(props.issueDate)}</div>
                    <div className="text-sm text-mine-shaft-300">ID: {props.certificated}</div>
                </div>
                {props.edit && (
                    <Group gap="xs" className="justify-start md:justify-end">
                        <ActionIcon size="lg" color="bright-sun.4" variant="subtle" onClick={() => setIsEditing(true)}>
                            <IconPencil className="h-4/5 w-4/5" stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon size="lg" color="red.8" variant="subtle" onClick={() => props.onDelete(props.index)}>
                            <IconTrash className="h-4/5 w-4/5" stroke={1.5} />
                        </ActionIcon>
                    </Group>
                )}
            </div>
        </div>
    );
};

export default CertiCard;
