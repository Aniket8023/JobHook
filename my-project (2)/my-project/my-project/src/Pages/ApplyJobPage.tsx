import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import ApplyJobComp from "../ApplyJob/ApplyJobComp";

const ApplyJobPage = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4 py-3 md:p-4">

            <Button
                leftSection={<IconArrowLeft size={20}/>}
                color="bright-sun.4"
                variant="light"
                onClick={() => navigate(-1)}
            >
                Back
            </Button>

            <ApplyJobComp/>
        </div>
    );
};

export default ApplyJobPage;