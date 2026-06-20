import { Anchor, Button, Checkbox, PasswordInput, Radio, TextInput, Group } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { registerUser } from "../Services/UserService";
import { notifications } from "@mantine/notifications";
import { useState } from "react";


const SignUp=()=>{
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            accountType: 'JOB_SEEKER',
            acceptTerms: false,
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => {
                if (value.length < 8) return 'Password must be at least 8 characters';
                if (!/[A-Z]/.test(value)) return 'Password must include at least one uppercase letter';
                if (!/[0-9]/.test(value)) return 'Password must include at least one number';
                if (!/[@$!%*?&]/.test(value)) return 'Password must include at least one special character (@, $, !, %, etc.)';
                return null;
            },
            confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords did not match' : null,
            acceptTerms: (value) => (!value ? 'You must accept terms and conditions' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        try {
            const { confirmPassword, acceptTerms, ...registerData } = values;
            const res = await registerUser(registerData);
            notifications.show({
                title: 'Success',
                message: 'Account created successfully! Please login.',
                color: 'green',
                icon: <IconCheck size={16} />,
            });
            navigate('/login');
        } catch (error: any) {
            notifications.show({
                title: 'Registration Failed',
                message: error.message || 'Something went wrong',
                color: 'red',
                icon: <IconX size={16} />,
            });
        } finally {
            setLoading(false);
        }
    };

   return (
  <div
    className="
w-full
md:w-[50vw]
flex-shrink-0
px-6
sm:px-10
md:px-20
flex
flex-col
justify-center
gap-4
"
  >
    <div
      className="
      text-2xl
      md:text-3xl
      font-semibold
      text-center
      md:text-left
      "
    >
      Create Account
    </div>

    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col gap-3"
    >
      <TextInput
        withAsterisk
        label="Full Name"
        placeholder="Your name"
        {...form.getInputProps("name")}
      />

      <TextInput
        withAsterisk
        leftSection={<IconAt size={16} />}
        label="Email"
        placeholder="Your email"
        {...form.getInputProps("email")}
      />

      <Radio.Group
        label="Account Type"
        withAsterisk
        {...form.getInputProps("accountType")}
      >
        <Group mt="xs">
          <Radio value="JOB_SEEKER" label="Job Seeker" />
          <Radio value="EMPLOYER" label="Employer" />
        </Group>
      </Radio.Group>

      <PasswordInput
        withAsterisk
        leftSection={<IconLock size={18} />}
        label="Password"
        placeholder="Enter password"
        {...form.getInputProps("password")}
      />

      <PasswordInput
        withAsterisk
        leftSection={<IconLock size={18} />}
        label="Confirm Password"
        placeholder="Confirm password"
        {...form.getInputProps("confirmPassword")}
      />

      <Checkbox
        label={
          <>
            I accept all <Anchor>terms & conditions</Anchor>
          </>
        }
        {...form.getInputProps("acceptTerms", {
          type: "checkbox",
        })}
      />

      <Button
        loading={loading}
        type="submit"
        autoContrast
        variant="filled"
        fullWidth
        size="md"
      >
        Sign Up
      </Button>
    </form>

    <div
      className="
      text-center
      text-sm
      md:text-base
      "
    >
      Have an account?{" "}
      <Link
        to="/login"
        className="text-bright-sun-400 hover:underline"
      >
        Login
      </Link>
    </div>
  </div>
);
}
export default SignUp;