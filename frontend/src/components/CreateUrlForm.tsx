import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUrlSchema, type CreateUrlFormData } from "../schema/url.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUrl } from "../service/urlApi";
import toast from "react-hot-toast";

type CreateUrlFormProps = {
  onUrlCreated: () => void;
};
const CreateUrlForm = ({onUrlCreated}:CreateUrlFormProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateUrlFormData>({
        resolver: zodResolver(createUrlSchema)
    })

    
    const onSubmit = async (data: CreateUrlFormData) => {
        try {
            setIsLoading(true);
            await createUrl(data.originalUrl);
            toast.success("short Url created successfully");
            onUrlCreated()
            reset();
        } catch {
            toast.error("Failed to create URL");
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Enter URL"
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        {...register("originalUrl")}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {isLoading ? "Creating..." : "Shorten URL"}
                    </button>
                </div>

                {errors.originalUrl && (
                    <p className="text-sm text-red-500">
                        {errors.originalUrl.message}
                    </p>
                )}
            </form>
        </>
    );
};

export default CreateUrlForm;