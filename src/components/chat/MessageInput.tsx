import { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import chatSvc from "@/pages/chat/chat.svc";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputType, TextInputField } from "../form/input.field";
import { User } from "../sidebar/sidebar";

const MessageInput = ({ user }: { user: User }) => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);



    const MessageDTO = Yup.object({
        message: Yup.string().required("Text is required"),
    })
    console.log("Hello from message input ", user)

    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(MessageDTO) })

    const handleImageChange = () => {
        // const file = e.target.files[0];
        // if (!file.type.startsWith("image/")) {
        //     // toast.error("Please select an image file");
        //     return;
        // }

        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     setImagePreview(reader.result);
        // };
        // reader.readAsDataURL(file);
    };

    const removeImage = () => {
        // setImagePreview(null);
        // if (fileInputRef.current) fileInputRef.current.value = "";
    };


    const submitForm = async (data: { message: string }) => {
        // e.preventDefault();
        // if (!text.trim() && !imagePreview) return;

        // try {
        //     await sendMessage({
        //         text: text.trim(),
        //         image: imagePreview,
        //     });

        //     // Clear form
        //     setText("");
        //     setImagePreview(null);
        //     if (fileInputRef.current) fileInputRef.current.value = "";
        // } catch (error) {
        //     console.error("Failed to send message:", error);
        // }

        
        const payload = {
            message: data.message,
            receiver: user._id,
            receiverType: user?.role === 'customer' && 'admin' ? "User" : "Rider"
        }

        try {
            const response = await chatSvc.sendMessage(payload)
            console.log(response)

        } catch (exception) {
            console.log(exception)
        }
    };

    return (
        <div className="p-4 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(submitForm)} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <TextInputField
                        name='message'
                        type={InputType.TEXT}
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        control={control}
                        errMsg={errors?.message?.message as string}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                    // onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-circle"
                // disabled={!text.trim() && !imagePreview}
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
    );
};
export default MessageInput;
