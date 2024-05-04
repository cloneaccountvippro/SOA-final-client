import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { RESET_PASSWORD } from '../asset/string';
import '../styles/styles.css'

const formShcema = z.object({
    email: z.string({ required_error: RESET_PASSWORD.EMAIL_REQUIRED })
        .regex(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/, { message: RESET_PASSWORD.EMAIL_FORMAT_INCORRECT })
        .email(),
    password: z.string({ required_error: RESET_PASSWORD.PASSWORD_REQUIRED })
        .min(6, { message: RESET_PASSWORD.PASSWORD_LENGTH_SHORT })
        .max(50, { message: RESET_PASSWORD.PASSWORD_LENGTH_LONG }),
    confirm_password: z.string({ required_error: RESET_PASSWORD.PASSWORD_REQUIRED })
        .min(6, { message: RESET_PASSWORD.PASSWORD_LENGTH_SHORT })
        .max(50, { message: RESET_PASSWORD.PASSWORD_LENGTH_LONG }),
}).refine((data) => data.password === data.confirm_password, {
    message: 'New password and confirm password must be match',
    path: ['confirm password']
});


function ChangePassword(){
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    const form = useForm({
        resolver: zodResolver(formShcema),
        defaultValues: {
          email: '',
          password: '',
          confirm_password: '',
        },
    });

    const onSubmit = async (data) => { 
        const { email, password, confirm_password} = data;
        console.log(data)
        try {
            // Call your API using Axios
            const response = await axios.post('http://localhost:3000/api/Accounts/change-password', {
                Email: email,
                NewPassword: password,
                ConfirmPassword: confirm_password,
            });
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    const onError = (error) => {
        console.log(error);
    };

    return (
        <div className="h-dvh">
            <div className="flex flex-col h-full w-full justify-center area bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate">
                <div className="flex justify-center item-center align-middle">
                    <div className="w-1/3 flex flex-col justify-center items-center gap-5 place-content-center px-5 py-5 bg-white rounded-md">
                        <h1 className="text-3xl font-semibold">Change Password</h1>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="gap-10 w-full space-y-6" >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    value={email}
                                                    placeholder={'Account Email'}
                                                    autoComplete='email'
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="flex justify-start pl-2" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    value={password}
                                                    placeholder={'Password'}
                                                    autoComplete='password'
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="flex justify-start pl-2" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    value={cpassword}
                                                    placeholder={'Reconfirm Password'}
                                                    autoComplete='confirm_password'
                                                    onChange={(e) => setCPassword(e.target.value)}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="flex justify-start pl-2" />
                                        </FormItem>
                                    )}
                                />
                                {error && <div className="text-red-500">{error}</div>}
                                <Button
                                    type="submit"
                                    className="h-10 w-full"
                                >
                                    {'Change password'}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
