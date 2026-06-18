import { Modal, TextInput, Button, Stepper, PinInput, PasswordInput, Text, Group, LoadingOverlay } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconShieldCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { changePassword, sendOtp, verifyOtp } from "../Services/UserService";
import { notifications } from "@mantine/notifications";

const ResetPassword = (props: { opened: boolean, close: () => void }) => {
    const [active, setActive] = useState(0);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async () => {
        if (!/^\S+@\S+$/.test(email)) {
            notifications.show({ title: "Invalid Email", message: "Please enter a valid email address", color: "red", icon: <IconX size={16} /> });
            return;
        }
        setLoading(true);
        try {
            await sendOtp(email);
            notifications.show({ title: "OTP Sent", message: "OTP has been sent to your email", color: "green", icon: <IconCheck size={16} /> });
            setActive(1);
        } catch (error: any) {
            const errorMessage = typeof error === 'object' ? error.errorMessage || error.message : error;
            notifications.show({ title: "Error", message: errorMessage || "Failed to send OTP", color: "red", icon: <IconX size={16} /> });
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            notifications.show({ title: "Invalid OTP", message: "Please enter a 6-digit OTP", color: "red", icon: <IconX size={16} /> });
            return;
        }
        setLoading(true);
        try {
            await verifyOtp(email, otp);
            notifications.show({ title: "Verified", message: "OTP has been verified successfully", color: "green", icon: <IconCheck size={16} /> });
            setActive(2);
        } catch (error: any) {
            const errorMessage = typeof error === 'object' ? error.errorMessage || error.message : error;
            notifications.show({ title: "Verification Failed", message: errorMessage || "Invalid OTP", color: "red", icon: <IconX size={16} /> });
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        if (password.length < 1) {
            notifications.show({ title: "Error", message: "Password is required", color: "red", icon: <IconX size={16} /> });
            return;
        }
        setLoading(true);
        try {
            await changePassword(email, password);
            notifications.show({ title: "Success", message: "Password changed successfully", color: "green", icon: <IconCheck size={16} /> });
            props.close();
        } catch (error: any) {
            const errorMessage = typeof error === 'object' ? error.errorMessage || error.message : error;
            notifications.show({ title: "Error", message: errorMessage || "Failed to change password", color: "red", icon: <IconX size={16} /> });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal opened={props.opened} onClose={props.close} title="Reset Password" centered>
            <div className="relative">
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false} size="sm">
                    <Stepper.Step label="Email" description="Verification" icon={<IconAt size={18} />}>
                        <div className="flex flex-col gap-4 pt-4">
                            <TextInput
                                withAsterisk
                                label="Email Address"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                leftSection={<IconAt size={16} />}
                            />
                            <Button fullWidth onClick={handleSendOtp}>Send OTP</Button>
                        </div>
                    </Stepper.Step>

                    <Stepper.Step label="OTP" description="Verification" icon={<IconShieldCheck size={18} />}>
                        <div className="flex flex-col gap-4 pt-4 items-center">
                            <Text size="sm">Enter the 6-digit OTP sent to <span className="text-bright-sun-400 font-semibold">{email}</span></Text>
                            <PinInput length={6} value={otp} onChange={setOtp} type="number" size="md" gap="xs" />
                            <Button fullWidth onClick={handleVerifyOtp}>Verify OTP</Button>
                            <Group justify="center">
                                <Text size="xs" color="dimmed">Didn't receive OTP?</Text>
                                <Button variant="transparent" size="xs" onClick={handleSendOtp} p={0}>Resend</Button>
                            </Group>
                        </div>
                    </Stepper.Step>

                    <Stepper.Step label="Password" description="Change" icon={<IconLock size={18} />}>
                        <div className="flex flex-col gap-4 pt-4">
                            <PasswordInput
                                withAsterisk
                                label="New Password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                leftSection={<IconLock size={16} />}
                            />
                            <Button fullWidth onClick={handleChangePassword}>Change Password</Button>
                        </div>
                    </Stepper.Step>
                </Stepper>
            </div>
        </Modal>
    );
};

export default ResetPassword;
