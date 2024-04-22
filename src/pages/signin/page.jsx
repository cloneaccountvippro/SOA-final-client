import { useForm } from "react-hook-form";

function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="h-[500px]">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    {...register("email", {
                        required: "Email is required",
                        validate: (value) => {
                            if(!value.includes("@")){
                                return "Email must include @"
                            }
                            return true
                        }
                    })} 
                    type="text" 
                    placeholder="Email"
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                <input 
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters",
                        }
                    })} 
                    type="password" 
                    placeholder="Password" 
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                <button type="submit">Sign in</button>
            </form>
        </div>
    )
}

export default SignIn;
