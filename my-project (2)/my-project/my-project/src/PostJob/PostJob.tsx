import { Button, TagsInput, TextInput, Textarea } from "@mantine/core";
import { fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";
import { useForm } from "@mantine/form";
import { postJob } from "../Services/JobService";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
    const navigate = useNavigate();
    const select = fields;

    const form = useForm({
        initialValues: {
            jobTitle: '',
            company: '',
            experience: '',
            jobType: '',
            location: '',
            packageOffered: '',
            
            skillsRequired: [],
            about: '',
            description: '',
        },
        validate: {
            jobTitle: (value) => (value.length < 2 ? 'Job Title is required' : null),
            company: (value) => (value.length < 2 ? 'Company is required' : null),
            experience: (value) => (value ? null : 'Experience is required'),
            jobType: (value) => (value ? null : 'Job Type is required'),
            location: (value) => (value ? null : 'Location is required'),
            packageOffered: (value) => (value ? null : 'Salary is required'),
            skillsRequired: (value) => (value.length > 0 ? null : 'At least one skill is required'),
            about: (value) => (value.length < 10 ? 'About must be at least 10 characters' : null),
            description: (value) => (value.length < 50 ? 'Description must be at least 50 characters' : null),
        },
    });

    const handlePost = async (values: any) => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        
        // Clean salary: e.g. "10 LPA" -> 1000000
        let salary = values.packageOffered.toString();
        let salaryNum = parseInt(salary.replace(/[^0-9]/g, ""));
        if (salary.includes("LPA")) salaryNum *= 100000;

        const jobData = {
            ...values,
             jobTitle: values.jobTitle,
            company: values.company,
            companyWebsite: values.companyWebsite,
            packageOffered: salaryNum,
            postedBy: user.id || 1,
            postTime: new Date().toISOString(),
            jobStatus: "ACTIVE",
            applicants: []
        };

        try {
            console.log("Posting Job Data:", jobData);
            await postJob(jobData);
            notifications.show({
                title: 'Job Posted Successfully!',
                message: 'Your job has been added to the database.',
                color: 'green',
                icon: <IconCheck size={16} />,
            });
            navigate('/posted-job');
        } catch (error: any) {
            console.error("Failed to post job:", error);
            notifications.show({
                title: 'Failed to Post Job',
                message: error.errorMessage || 'Internal Server Error',
                color: 'red',
                icon: <IconX size={16} />,
            });
        }
    };

    return (
        <div className="w-full lg:w-4/5 mx-auto py-6 px-4">
            <div className="text-2xl font-semibold mb-5">Post a Job</div>
            <form onSubmit={form.onSubmit(handlePost)} className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-4 [&>*]:w-full">
                    <SelectInput {...select[0]} {...form.getInputProps('jobTitle')} />
                    <SelectInput {...select[1]} {...form.getInputProps('company')} />
                </div>
                <div className="flex flex-col md:flex-row gap-4 [&>*]:w-full">
                    <SelectInput {...select[2]} {...form.getInputProps('experience')} />
                    <SelectInput {...select[3]} {...form.getInputProps('jobType')} />
                </div>
                <div className="flex flex-col md:flex-row gap-4 [&>*]:w-full">
                    <SelectInput {...select[4]} {...form.getInputProps('location')} />
                    <SelectInput {...select[5]} {...form.getInputProps('packageOffered')} />
                    
                </div>
                            <TextInput
                label="Company Website"
                placeholder="google.com"
                {...form.getInputProps("companyWebsite")}
            />
                <TagsInput withAsterisk label="Skills Required" placeholder="Enter Skill" splitChars={[',', ' ', '|']} clearable acceptValueOnBlur {...form.getInputProps('skillsRequired')} />
                
                
                <Textarea 
                    withAsterisk 
                    label="About Job" 
                    placeholder="Briefly describe the job opportunity" 
                    rows={3}
                    {...form.getInputProps('about')} 
                />

                <div className="[&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:!bg-bright-sun-400/20
                [&_button]:!bg-mine-shaft-900">
                    <div className="text-sm font-medium mb-1">Job Description <span className="text-red-500">*</span></div>
                    <TextEditor form={form} />
                    {form.errors.description && <div className="text-red-500 text-xs mt-1">{form.errors.description}</div>}
                </div>
               <div className="flex flex-col sm:flex-row gap-4 mt-5">
                    <Button type="submit" color="bright-sun.4" variant="filled">Publish Job</Button>
                    <Button color="bright-sun.4" variant="outline" onClick={() => navigate('/find-jobs')}>Cancel</Button>
                </div>
            </form>
        </div>
    );
};
export default PostJob;
