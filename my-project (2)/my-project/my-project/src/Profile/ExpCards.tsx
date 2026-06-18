import { Button, Group } from "@mantine/core";
import { IconBuilding } from "@tabler/icons-react";
import { useState } from "react";
import ExpInput from "./ExpInput";

interface ExpCardProps {
    index: number;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | null;
    working: boolean;
    description: string;
    edit: boolean;
    onSave: (index: number, data: any) => void;
    onDelete: (index: number) => void;
}

const ExpCard = (props: ExpCardProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "Present";
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    if (isEditing) {
        return <ExpInput 
            {...props} 
            setEdit={setIsEditing} 
            onSave={(data: any) => {
                props.onSave(props.index, data);
                setIsEditing(false);
            }} 
        />;
    }

    return (
        <div className="flex flex-col gap-3 bg-mine-shaft-900 p-4 rounded-xl">
            <div className="flex flex-col md:flex-row md:justify-between gap-3">
                <div className="flex gap-2 items-start">
                    <div className="p-2 bg-mine-shaft-800 rounded-md">
                        <IconBuilding className="h-7 w-7 text-bright-sun-400" />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold text-sm md:text-base">
                            {props.title}
                        </div>
                        <div className="text-sm text-mine-shaft-300">
                            {props.company} &#x2022; {props.location}
                        </div>
                    </div>
                </div>
               <div className="text-xs md:text-sm text-mine-shaft-300 md:text-right">
                    {formatDate(props.startDate)} - {props.working ? "Present" : formatDate(props.endDate)}
                </div>
            </div>
            <div className="text-sm md:text-base text-mine-shaft-300 text-justify">{props.description}</div>
            {props.edit && (
               <Group mt="xs" className="flex-wrap">
                    <Button
                        color="bright-sun.4"
                        variant="outline"
                        size="xs"
                        className="w-full sm:w-auto"
                        onClick={() => setIsEditing(true)}>
                        Edit
                    </Button>
                    <Button
                        color="bright-sun.4"
                        variant="outline"
                        size="xs"
                        className="w-full sm:w-auto"
                        onClick={() => props.onDelete(props.index)}>
                        Delete
                    </Button>
                </Group>
            )}
        </div>
    );
};

export default ExpCard;
