import { Divider } from "@mantine/core";
import Profile from "../Profile/Profile";



const ProfilePage=()=>{
    // return <div className="min-h-[900vh] bg-mine-shaft-950 font-['poppins']">
    return <div className="min-h-screen bg-mine-shaft-950 font-['poppins']">
        <Divider mx="md" mb="xl"/>
        <Profile/>
    </div>
}
export default ProfilePage;