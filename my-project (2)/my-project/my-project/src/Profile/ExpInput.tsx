import { Button, Checkbox, Textarea, TextInput, Group } from "@mantine/core";
import { useState } from "react";
import { MonthPickerInput } from "@mantine/dates";

const ExpInput = (props: any) => {
    const [title, setTitle] = useState(props.title || "");
    const [company, setCompany] = useState(props.company || "");
    const [location, setLocation] = useState(props.location || "");
    const [startDate, setStartDate] = useState<Date | null>(props.startDate ? new Date(props.startDate) : new Date());
    const [endDate, setEndDate] = useState<Date | null>(props.endDate && props.endDate !== "Present" ? new Date(props.endDate) : new Date());
    const [working, setWorking] = useState(props.working || props.endDate === "Present" || false);
    const [description, setDescription] = useState(props.description || "");

    const handleSave = () => {
        const data = {
            title,
            company,
            location,
            startDate: startDate?.toISOString().split('.')[0],
            endDate: working ? null : endDate?.toISOString().split('.')[0],
            working,
            description
        };
        props.onSave(data);
    };

    return (
        <div className="flex flex-col gap-3 p-4 bg-mine-shaft-900 rounded-lg border border-mine-shaft-800">
            <div className="text-lg font-semibold">{props.add ? "Add" : "Edit"} Experience</div>
            
            <div className="flex flex-col md:flex-row gap-4 [&>*]:flex-1">
                <TextInput withAsterisk label="Title" placeholder="Software Engineer" value={title} onChange={(e) => setTitle(e.target.value)} />
                <TextInput withAsterisk label="Company" placeholder="Google" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>

            <TextInput withAsterisk label="Location" placeholder="Bangalore, India" value={location} onChange={(e) => setLocation(e.target.value)} />

            <Textarea 
                withAsterisk 
                label="Summary" 
                value={description} 
                placeholder="Enter Summary..." 
                autosize 
                minRows={3} 
                onChange={(event) => setDescription(event.currentTarget.value)} 
            />

            <div className="flex gap-4 [&>*]:flex-1">
                <MonthPickerInput withAsterisk maxDate={working ? new Date() : (endDate || undefined)} label="Start Date" placeholder="Pick date" value={startDate} onChange={setStartDate} />
                <MonthPickerInput disabled={working} withAsterisk minDate={startDate || undefined} maxDate={new Date()} label="End Date" placeholder="Pick date" value={endDate} onChange={setEndDate} />
            </div>

            <Checkbox checked={working} onChange={(event) => setWorking(event.currentTarget.checked)} autoContrast label="Currently working here" />

            <Group mt="md" className="flex-col sm:flex-row">
                <Button
                    onClick={handleSave}
                    color="bright-sun.4"
                    variant="outline"
                    className="w-full sm:w-auto"
                >Save</Button>
                <Button onClick={() => props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
            </Group>
        </div>
    );
}
export default ExpInput;