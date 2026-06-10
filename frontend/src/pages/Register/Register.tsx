import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../service/authApi";
import axios from "axios";
import { User, Mail, Lock, UserPlus, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    })

    const [apiError, setApiError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    
    const onSubmit = async (data: RegisterFormData) => {
        try {
            setApiError("");
            setIsLoading(true);
            await registerUser(data.name, data.email, data.password);
            toast.success("Account created successfully.");
            navigate("/login",{replace:true})
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setApiError(
                    error.response?.data?.message ?? "Something went wrong"
                );
            } else {
                setApiError("Something went wrong");
            }
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <AuthLayout title="Register">
            <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                        Full Name
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className={`w-full rounded-xl border px-4 py-3 pl-10 outline-none transition-all duration-200
                                ${errors.name 
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                } focus:ring-2 focus:ring-opacity-50 bg-gray-50 hover:bg-white`}
                            {...register("name")}
                        />
                    </div>
                    {errors.name && (
                        <div className="flex items-center gap-1 mt-1">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <p className="text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        </div>
                    )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className={`w-full rounded-xl border px-4 py-3 pl-10 outline-none transition-all duration-200
                                ${errors.email 
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                } focus:ring-2 focus:ring-opacity-50 bg-gray-50 hover:bg-white`}
                            {...register("email")}
                        />
                    </div>
                    {errors.email && (
                        <div className="flex items-center gap-1 mt-1">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <p className="text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        </div>
                    )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            placeholder="Create a strong password"
                            className={`w-full rounded-xl border px-4 py-3 pl-10 outline-none transition-all duration-200
                                ${errors.password 
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                } focus:ring-2 focus:ring-opacity-50 bg-gray-50 hover:bg-white`}
                            {...register("password")}
                        />
                    </div>
                    {errors.password && (
                        <div className="flex items-center gap-1 mt-1">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <p className="text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        </div>
                    )}
                </div>

                {/* API Error */}
                {apiError && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                        <div className="flex items-center gap-3">
                            <div className="shrink-0">
                                <AlertCircle className="h-5 w-5 text-red-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-red-800 font-medium">
                                    {apiError}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-linear-to-r from-blue-600 to-blue-700 px-4 py-3 text-white font-semibold transition-all duration-200 hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Creating account...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <UserPlus className="h-5 w-5" />
                            <span>Create Account</span>
                        </div>
                    )}
                </button>

                {/* Login Link */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">
                            Already have an account?
                        </span>
                    </div>
                </div>
                
                <p className="text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors hover:underline"
                    >
                        Sign in to your account
                        <span aria-hidden="true">→</span>
                    </Link>
                </p>
            </form>
        </AuthLayout>
    )
};

export default Register;