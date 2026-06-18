import { Button, PasswordInput, TextInput, useMantineTheme } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { loginUser } from "../Services/UserService";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import ResetPassword from "./ResetPassword";
import { useDisclosure } from "@mantine/hooks";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);

    // Simple JWT decoder helper
    const decodeJWT = (token: string) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error("Failed to decode JWT", e);
            return null;
        }
    };

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 1 ? 'Password is required' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        try {
            const res = await loginUser(values);
            // res is { jwt: "..." }
            const decoded = decodeJWT(res.jwt);
            const userData = {
                ...decoded,
                jwt: res.jwt
            };
            
            localStorage.setItem("user", JSON.stringify(userData));
            
            notifications.show({
                title: 'Login Successful',
                message: `Welcome back, ${userData.name || 'User'}!`,
                color: 'green',
                icon: <IconCheck size={16} />,
            });
            navigate('/');
        } catch (error: any) {
            notifications.show({
                title: 'Login Failed',
                message: error.message || 'Invalid email or password',
                color: 'red',
                icon: <IconX size={16} />,
            });
        } finally {
            setLoading(false);
        }
    };

    return <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className=" text-2xl font-semibold ">Login to Account</div>
        <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-3">
            <TextInput 
                withAsterisk
                leftSection={<IconAt size={16} />}
                label="Email"
                placeholder="Your email"
                {...form.getInputProps('email')}
            />
            <PasswordInput 
                withAsterisk 
                leftSection={<IconLock size={18} stroke={1.5} />}
                label="Password" 
                placeholder="Enter password" 
                {...form.getInputProps('password')}
            />
            <Button loading={loading} type="submit" autoContrast variant="filled">Login</Button>
            <div className="text-right cursor-pointer text-bright-sun-400 hover:underline text-sm" onClick={open}>Forgot Password?</div>
        </form>
        <div className="mx-auto">Don't have an account? <Link to="/signup" className="text-bright-sun-400 hover:underline" >
            SignUp</Link></div>
        <ResetPassword opened={opened} close={close} />
    </div>
}
export default Login;