import { ActionIcon, Divider, TagsInput, Textarea, TextInput, FileInput, NumberInput, Group, Button, Loader, Center } from "@mantine/core";
import { IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil, IconPlus, IconFileCv, IconPhoto, IconCheck, IconX } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import ExpCards from "./ExpCards";
import CertiCards from "./CertiCards";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";
import { notifications } from "@mantine/notifications";
import { getProfile, updateProfile } from "../Services/UserService";
import { Avatar, Overlay } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useHover } from "@mantine/hooks";

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    
    const [edit, setEdit] = useState([false, false, false, false, false]);
    const [addExp, setAddExp] = useState(false);
    const [addCerti, setAddCerti] = useState(false);

    const { hovered, ref } = useHover();

        const getBase64 = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = error => reject(error);
            });
        };

        const handleFileChange = async (image: File | null) => {
            if (!image) return;

            try {
                const picture = await getBase64(image);

                const updatedProfile = {
                    ...profile,
                    picture: picture.split(",")[1]
                };

                setProfile(updatedProfile);
                await handleUpdate(updatedProfile);

            } catch (error) {
                notifications.show({
                    title: "Error",
                    message: "Failed to update profile photo",
                    color: "red",
                    icon: <IconX size={16} />
                });
            }
        };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            // Use profileId if available, fallback to id
            const idToFetch = userData.profileId || userData.id;
            console.log("Fetching profile for ID:", idToFetch);
            if (idToFetch) {
                fetchProfile(idToFetch);
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const fetchProfile = async (id: number) => {
        try {
            const data = await getProfile(id);
            setProfile(data);
        } catch (error: any) {
            console.error("Fetch profile error:", error);
            notifications.show({
                title: 'Error',
                message: error.message || 'Failed to load profile data',
                color: 'red',
                icon: <IconX size={16} />
            });
        } finally {
            setLoading(false);
        }
    };

   ;

    const handleUpdate = async (updatedData: any) => {
    setUpdating(true);
    try {
        await updateProfile(updatedData);

        setProfile(updatedData);

        notifications.show({
            title: 'Success',
            message: 'Profile updated successfully',
            color: 'green',
            icon: <IconCheck size={16} />
        });
    } catch (error: any) {
        notifications.show({
            title: 'Update Failed',
            message: error.message || 'Something went wrong',
            color: 'red',
            icon: <IconX size={16} />
        });
    } finally {
        setUpdating(false);
    }
};
    const handleEditToggle = (index: number) => {
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
        
        // If we are closing the edit mode for the top section or about/skills, we trigger a full update
        if (newEdit[index] === false) {
            handleUpdate(profile);
        }
    };

    if (loading) return <Center h="80vh"><Loader color="bright-sun.4" size="xl" /></Center>;
    if (!profile) return <Center h="80vh">Profile not found</Center>;

    return (
        <div className="w-[95%] md:w-[90%] lg:w-4/5 mx-auto relative">
            {updating && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 z-50 flex items-center justify-center">
                    <Loader color="bright-sun.4" size="lg" />
                </div>
            )}
            
            {}

            <div className="relative">
            <img
                className="rounded-t-2xl h-32 md:h-48 w-full object-cover"
                src="/Profile/banner.jpg"
                alt=""
            />

            <div
                ref={ref}
                className="absolute flex items-center justify-center -bottom-14 md:-bottom-20 left-3 md:left-6"
            >
                <Avatar
                    className="!w-28 !h-28 md:!w-40 md:!h-40 lg:!w-48 lg:!h-48 border-mine-shaft-950 border-4 md:border-8 rounded-full"
                    src={
                        profile.picture
                            ? `data:image/jpeg;base64,${profile.picture}`
                            : "/avatar.png"
                    }
                    alt=""
                />

                {hovered && (
                    <Overlay
                        className="!rounded-full"
                        color="#000"
                        backgroundOpacity={0.75}
                    />
                )}

                {hovered && (
                    <IconEdit className="absolute z-[300] !w-16 !h-16 text-white" />
                )}

                {hovered && (
                    <FileInput
                        onChange={handleFileChange}
                        className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full w-full"
                        variant="transparent"
                        accept="image/png,image/jpeg,image/jpg"
                    />
                )}
            </div>
        </div>

            <div className="px-3 mt-20 md:mt-24">
               <div className="text-xl md:text-2xl lg:text-3xl font-semibold flex justify-between items-center">
                    {profile.name}
                    <ActionIcon onClick={() => handleEditToggle(0)} variant="subtle" color="bright-sun.4" size="lg">
                        {edit[0] ? <IconDeviceFloppy className="h-4/5 w-4/5 " /> : <IconPencil className="h-4/5 w-4/5 " />}
                    </ActionIcon>
                </div>
                
                {edit[0] ? (
                    <div className="flex flex-col gap-3 mt-3">
                        <Group grow className="flex-col md:flex-row">
                            <TextInput label="Full Name" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                            <TextInput label="Email" disabled value={profile.email} />
                        </Group>
                        <Group grow className="flex-col md:flex-row">
                            <TextInput label="Job Title" placeholder="Enter job title" value={profile.jobTitle || ""} onChange={(e) => setProfile({...profile, jobTitle: e.target.value})} />
                            <TextInput label="Company" placeholder="Enter company" value={profile.company || ""} onChange={(e) => setProfile({...profile, company: e.target.value})} />
                        </Group>
                        <Group grow className="flex-col md:flex-row">
                            <TextInput label="Location" placeholder="Enter location" value={profile.location || ""} onChange={(e) => setProfile({...profile, location: e.target.value})} />
                            <NumberInput label="Total Experience" value={profile.totalExp} onChange={(val) => setProfile({...profile, totalExp: val})} placeholder="Years of experience" min={0} max={50} decimalScale={1} />
                        </Group>
                    </div>
                ) : (
                    <>
                        <div className="text-sm md:text-lg flex gap-1 items-center mt-1 flex-wrap">
                            <IconBriefcase className="h-5 w-5" stroke={1.5} />
                            {profile.jobTitle || "Job Title Not Set"} &bull; {profile.company || "Company Not Set"}
                        </div>
                        <div className="flex gap-1 text-lg text-mine-shaft-300 items-center">
                            <IconMapPin className="h-5 w-5" stroke={1.5} />
                            {profile.location || "Location Not Set"}
                        </div>
                        <div className="text-sm text-mine-shaft-400 mt-1">
                            Experience: {profile.totalExp || "0"} Years
                        </div>
                    </>
                )}
            </div>

            <Divider mx="xs" my="xl" />

            <div className="px-3">
                <div className="text-xl md:text-2xl font-semibold mb-5 flex justify-between items-center">
                    About 
                    <ActionIcon onClick={() => handleEditToggle(1)} variant="subtle" color="bright-sun.4" size="lg">
                        {edit[1] ? <IconDeviceFloppy className="h-4/5 w-4/5 " /> : <IconPencil className="h-4/5 w-4/5 " />}
                    </ActionIcon>
                </div>
                {edit[1] ? (
                    <Textarea value={profile.about || ""} placeholder="Tell us about yourself..." autosize minRows={3} onChange={(e) => setProfile({...profile, about: e.target.value})} />
                ) : (
                    <div className="text-sm text-mine-shaft-300 text-justify">{profile.about || "No description provided."}</div>
                )}
            </div>

            <Divider mx="xs" my="xl" />

            <div className="px-3">
                <div className="text-xl md:text-2xl font-semibold mb-5 flex justify-between items-center">
                    Skills
                    <ActionIcon onClick={() => handleEditToggle(2)} variant="subtle" color="bright-sun.4" size="lg">
                        {edit[2] ? <IconDeviceFloppy className="h-4/5 w-4/5 " /> : <IconPencil className="h-4/5 w-4/5 " />}
                    </ActionIcon>
                </div>
                {edit[2] ? (
                    <TagsInput value={profile.skills || []} onChange={(tags) => setProfile({...profile, skills: tags})} placeholder="Add Skills" splitChars={[',', ' ', '|']} />
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {(profile.skills || []).map((skill: string, index: number) => (
                            <div
                                key={index}
                                className="bg-bright-sun-300 bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1 text-xs md:text-sm font-medium"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Divider mx="xs" my="xl" />

            <div className="px-3">
                <div className="text-xl md:text-2xl font-semibold mb-5 flex justify-between items-center">
                    Experience 
                    <div className="flex gap-2">
                        <ActionIcon onClick={() => setAddExp(true)} variant="subtle" color="bright-sun.4" size="lg">
                            <IconPlus className="h-4/5 w-4/5 " />
                        </ActionIcon>
                        <ActionIcon onClick={() => setEdit([edit[0], edit[1], edit[2], !edit[3], edit[4]])} variant="subtle" color="bright-sun.4" size="lg">
                            {edit[3] ? <IconDeviceFloppy className="h-4/5 w-4/5 " /> : <IconPencil className="h-4/5 w-4/5 " />}
                        </ActionIcon>
                    </div>
                </div>
               
                <div className="flex flex-col gap-8">
                    {(profile.experiences || []).map((exp: any, index: number) => (
                        <ExpCards 
                            key={index} 
                            index={index} 
                            {...exp} 
                            edit={edit[3]} 
                            onSave={(idx, data) => {
                                const newExp = [...profile.experiences];
                                newExp[idx] = data;
                                handleUpdate({...profile, experiences: newExp});
                            }} 
                            onDelete={(idx) => {
                                const newExp = profile.experiences.filter((_:any, i:number) => i !== idx);
                                handleUpdate({...profile, experiences: newExp});
                            }} 
                            
                        />
                        
                    ))}
                   {addExp && <ExpInput
    add
    setEdit={setAddExp}
    onSave={(data:any) =>
        handleUpdate({
            ...profile,
            experiences: [...(profile.experiences || []), data]
        })
    }
/>}
                </div>
            </div>

            <Divider mx="xs" my="xl" />

            <div className="px-3">
                <div className="text-xl md:text-2xl font-semibold mb-5 flex justify-between items-center">
                    Certification 
                    <div className="flex gap-2">
                        <ActionIcon onClick={() => setAddCerti(true)} variant="subtle" color="bright-sun.4" size="lg">
                            <IconPlus className="h-4/5 w-4/5 " />
                        </ActionIcon>
                        <ActionIcon onClick={() => setEdit([edit[0], edit[1], edit[2], edit[3], !edit[4]])} variant="subtle" color="bright-sun.4" size="lg">
                            {edit[4] ? <IconDeviceFloppy className="h-4/5 w-4/5 " /> : <IconPencil className="h-4/5 w-4/5 " />}
                        </ActionIcon>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    {(profile.certifications || []).map((certi: any, index: number) => (
                        <CertiCards 
                            key={index} 
                            index={index} 
                            {...certi} 
                            edit={edit[4]} 
                            onSave={(idx, data) => {
                                const newCerti = [...profile.certifications];
                                newCerti[idx] = data;
                                handleUpdate({...profile, certifications: newCerti});
                            }} 
                            onDelete={(idx) => {
                                const newCerti = profile.certifications.filter((_:any, i:number) => i !== idx);
                                handleUpdate({...profile, certifications: newCerti});
                            }} 
                        />
                    ))}
                    {addCerti && <CertiInput setEdit={setAddCerti} onSave={(data:any) => handleUpdate({...profile, certifications: [...(profile.certifications || []), data]})} />}
                </div>
            </div>

            
        </div>
        
    );
    
};



export default Profile;
