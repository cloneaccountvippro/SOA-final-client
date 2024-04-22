import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { SIGN_IN } from '../signin/asset/string';
import './styles/styles.css'

const formShcema = z.object({
    email: z.string({ required_error: SIGN_IN.EMAIL_REQUIRED })
        .regex(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/, { message: SIGN_IN.EMAIL_FORMAT_INCORRECT })
        .email(),
    password: z.string({ required_error: SIGN_IN.PASSWORD_REQUIRED })
        .min(8, { message: SIGN_IN.PASSWORD_LENGTH_SHORT })
        .max(50, { message: SIGN_IN.PASSWORD_LENGTH_LONG }),
});


function SignIn() {
    const [account, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const form = useForm({
        resolver: zodResolver(formShcema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data) => {
        if (data.email.message === null && data.password.message === null) {
            console.log("error");
        }
        console.log("error")
    };

    const onError = (error) => {
        console.log("Kien ngu")
        console.log(error);
    };

    return (
        <div className="h-dvh">
            <div className="flex flex-col h-full w-full justify-center area bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate">
                <div className="flex justify-center item-center align-middle">
                    <div className="w-1/3 flex flex-col justify-center items-center gap-5 place-content-center px-5 py-5 bg-white rounded-md">
                        <h1 className="text-3xl font-semibold">Login</h1>
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
                                                    value={account}
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
                                <Button
                                    type="submit"
                                    className="h-10 w-full"
                                >
                                    {'Sign in'}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
