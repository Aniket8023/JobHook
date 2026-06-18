import { Button, Divider, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core";
import { IconBuilding, IconCheck, IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { Notification } from '@mantine/core';
import { useLocation, useNavigate } from "react-router-dom";
import { applyToJob } from "../Services/JobService";

const ApplyJobComp = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [preview, setPreview] = useState(false);

    const [submit, setSubmit] = useState(false);
    const [sec, setSec] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();
    const job = location.state?.job;

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            website: '',
            cv: null,
            coverLetter: '',
        },
        validate: {
            name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            phone: (value) => (!value || value.toString().length !== 10 ? 'Phone number must be 10 digits' : null),
            website: (value) => (!value ? 'Website URL is required' : !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(value) ? 'Invalid website URL' : null),
            cv: (value) => (!value ? 'Please attach your CV' : null),
            coverLetter: (value) => (value.length < 10 ? 'Cover letter must be at least 10 characters' : null),
        },
    });

    const handlePreview = () => {
        const validation = form.validate();
        if (!validation.hasErrors) {
            setPreview(!preview);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSubmit = async () => {
        setSubmit(true);
        try {
            const data = {
                ...form.values,
                applicantId: user.id,
                resume: null
            };
            await applyToJob(job.id, data);
            
            let x = 5;
            const interval = setInterval(() => {
                x--;
                setSec(x);
                if (x == 0) {
                    clearInterval(interval);
                    navigate('/find-jobs');
                }
            }, 1000)
        } catch (error: any) {
            setSubmit(false);
            console.error("Application failed:", error);
        }
    }

    if (!job) return <div className="text-white p-10">No job selected to apply.</div>;

    if (submit) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-5 text-center animate-fade-in">
                <div className="p-5 bg-bright-sun-400/10 rounded-full animate-bounce">
                    <IconCheck size={100} className="text-bright-sun-400" stroke={2.5} />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-2xl md:text-4xl font-bold text-mine-shaft-100">Application Submitted!</div>
                    <div className="text-base md:text-xl text-mine-shaft-300">
                        You have successfully applied to the <span className="text-bright-sun-400 font-semibold">{job.jobTitle}</span> role at <span className="text-bright-sun-400 font-semibold">{job.company}</span>.
                    </div>
                </div>
                <div className="text-mine-shaft-400 mt-5">
                    Redirecting to Job Board in <span className="font-bold text-bright-sun-400">{sec}</span> seconds...
                </div>
               <div className="flex flex-col sm:flex-row gap-4 mt-5 w-full max-w-md">
                    <Button variant="light" color="bright-sun.4" onClick={() => navigate('/find-jobs')}>Go to Job Board</Button>
                    <Button variant="outline" color="bright-sun.4" onClick={() => navigate('/job-history')}>View Applications</Button>
                </div>
            </div>
        );
    }

    return <>
        <div className="w-full lg:w-2/3 mx-auto">
            <div className="flex justify-between items-center">
                <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start text-center sm:text-left">
                    <div className="p-3 bg-mine-shaft-800 rounded-xl">
                        <IconBuilding className="h-14 w-14 text-bright-sun-400" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold text-xl md:text-2xl">{job.jobTitle}</div>
                        <div className="text-sm md:text-lg text-mine-shaft-300">
                            {job.company} &bull; {new Date(job.postTime).toLocaleDateString()} &bull; {job.applicants?.length || 0} Applicants</div>
                    </div>
                </div>
            </div>
            <Divider my="xl" />
            <div className="text-xl font-semibold mb-5">{preview ? "Review Your Application" : "Submit Your Application"}</div>
            <div className=" flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5 [&>*]:flex-1">
                    <TextInput
                        readOnly={preview}
                        variant={preview ? "unstyled" : "default"}
                        className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
                        label="Full Name" withAsterisk placeholder="Enter name"
                        {...form.getInputProps('name')}
                    />

                    <TextInput
                        readOnly={preview}
                        variant={preview ? "unstyled" : "default"}
                        className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
                        label="Email" withAsterisk placeholder="Enter Email"
                        {...form.getInputProps('email')}
                    />
                </div>

               <div className="flex flex-col md:flex-row gap-5 [&>*]:flex-1">
                    <NumberInput
                        readOnly={preview}
                        variant={preview ? "unstyled" : "default"}
                        className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
                        label="Phone Number" withAsterisk placeholder="Enter Phone Number"
                        hideControls min={0} max={9999999999} clampBehavior="strict"
                        {...form.getInputProps('phone')}
                    />
                    <TextInput
                        readOnly={preview}
                        variant={preview ? "unstyled" : "default"}
                        className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
                        label="Personal Website" withAsterisk placeholder="Enter Url "
                        {...form.getInputProps('website')}
                    />
                </div>
                <FileInput
                    readOnly={preview}
                    variant={preview ? "unstyled" : "default"}
                    className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
                    withAsterisk leftSection={<IconPaperclip stroke={1.5} />} label="Attach your CV"
                    placeholder="Your CV" leftSectionPointerEvents="none"
                    {...form.getInputProps('cv')}
                />

                <Textarea
                    readOnly={preview}
                    variant={preview ? "unstyled" : "default"}
                    className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
                    withAsterisk placeholder="Type Something About Yourself..." label="Cover Letter"
                    autosize minRows={4}
                    {...form.getInputProps('coverLetter')}
                />

                {!preview && <Button onClick={handlePreview} color="bright-sun.4"
                    variant="light" >Preview</Button>}
                {
                    preview && <div className="flex flex-col sm:flex-row gap-4 [&>*]:flex-1">
                        <Button fullWidth onClick={() => setPreview(false)} color="bright-sun.4"
                            variant="outline" >Edit</Button>
                        <Button fullWidth onClick={handleSubmit} color="bright-sun.4"
                            variant="light" >Submit</Button>
                    </div>
                }
            </div>
        </div>
    </>
}
export default ApplyJobComp;