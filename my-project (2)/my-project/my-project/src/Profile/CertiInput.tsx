import { Button, TextInput, Group } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";

const CertiInput = (props: any) => {
    const [name, setName] = useState(props.name || "");
    const [issuer, setIssuer] = useState(props.issuer || "");
    const [issueDate, setIssueDate] = useState<Date | null>(props.issueDate ? new Date(props.issueDate) : new Date());
    const [certificated, setCertificated] = useState(props.certificated || "YES");

    const handleSave = () => {
        const data = {
            name,
            issuer,
            issueDate: issueDate?.toISOString().split('.')[0],
            certificated
        };
        props.onSave(data);
    };

    return (
        <div className="flex flex-col gap-3 p-4 bg-mine-shaft-900 rounded-lg border border-mine-shaft-800">
            <div className="text-lg font-semibold">{props.index !== undefined ? "Edit" : "Add"} Certificate</div>
            <div className="flex flex-col md:flex-row gap-4 [&>*]:flex-1">
                <TextInput label="Title" withAsterisk placeholder="AWS Solutions Architect" value={name} onChange={(e) => setName(e.target.value)} />
                <TextInput label="Issuer" withAsterisk placeholder="Amazon Web Services" value={issuer} onChange={(e) => setIssuer(e.target.value)} />
            </div>
            <div className="flex flex-col md:flex-row gap-4 [&>*]:flex-1">
                <MonthPickerInput withAsterisk maxDate={new Date()} label="Issue Date" placeholder="Pick date" value={issueDate} onChange={setIssueDate} />
                <TextInput label="Certificated" withAsterisk placeholder="YES/NO" value={certificated} onChange={(e) => setCertificated(e.target.value)} />
            </div>
           <Group mt="md" className="flex-col sm:flex-row">
                <Button
                onClick={handleSave}
                color="bright-sun.4"
                variant="outline"
                className="w-full sm:w-auto"
                >Save</Button>
                <Button
                onClick={() => props.setEdit(false)}
                color="red.8"
                variant="light"
                className="w-full sm:w-auto"
                >Cancel</Button>
            </Group>
        </div>
    );
}
export default CertiInput;