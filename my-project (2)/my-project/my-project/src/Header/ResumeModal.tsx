import { Modal, Button, Group, FileInput } from "@mantine/core";
import { IconUpload, IconDownload, IconEye } from "@tabler/icons-react";
import { useState } from "react";
import { uploadResume, getResume } from "../Services/UserService";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

interface ResumeModalProps {
  opened: boolean;
  onClose: () => void;
}

const ResumeModal = ({ opened, onClose }: ResumeModalProps) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleUpload = async () => {
  if (!resumeFile) {
    notifications.show({
      title: "Resume Required",
      message: "Please select a PDF resume to upload.",
      color: "yellow",
      icon: <IconX size={16} />
    });
    return;
  }

  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const formData = new FormData();
    formData.append("resume", resumeFile);

    await uploadResume(user.profileId || user.id, formData);

    notifications.show({
      title: "Resume Uploaded",
      message: "Your resume has been uploaded successfully",
      color: "green",
      icon: <IconCheck size={16} />
    });
  } catch (error) {
    console.error(error);
    notifications.show({
      title: "Upload Failed",
      message: "Unable to upload resume",
      color: "red",
      icon: <IconX size={16} />
    });
  }
};

  const handleView = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const profile = await getResume(user.profileId || user.id);

    
    if (!profile.resume) {
      notifications.show({
        title: "Resume Not Found",
        message: "Please upload your resume before viewing it.",
        color: "yellow",
        icon: <IconX size={16} />
      });
      return;
    }

   

    const pdfData = `data:application/pdf;base64,${profile.resume}`;

window.open(pdfData, "_blank");
  } catch (error) {
    console.error(error);
  }
};

  const handleDownload = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const profile = await getResume(user.profileId || user.id);

    if (!profile.resume) {
      notifications.show({
        title: "Resume Not Found",
        message: "Please upload your resume before downloading it.",
        color: "yellow",
        icon: <IconX size={16} />
      });
      return;
    }

    const link = document.createElement("a");

    link.href = `data:application/pdf;base64,${profile.resume}`;

    link.download = `${profile.name || "Resume"}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error(error);
  }
};

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Resume Manager"
      centered
      size="md"
    >
      <div className="flex flex-col gap-4">

        <FileInput
          label="Upload Resume"
          placeholder="Select PDF Resume"
          accept="application/pdf"
          value={resumeFile}
          onChange={setResumeFile}
        />

        <Group grow className="flex-col sm:flex-row">
          <Button
              fullWidth
              leftSection={<IconUpload size={18} />}
              color="blue"
              onClick={handleUpload}
            >
              Upload
            </Button>

          <Button
            leftSection={<IconEye size={18} />}
            color="green"
            onClick={handleView}
          >
            View
          </Button>

          <Button
            leftSection={<IconDownload size={18} />}
            color="orange"
            onClick={handleDownload}
          >
            Download
          </Button>
        </Group>

      </div>
    </Modal>
  );
};

export default ResumeModal;