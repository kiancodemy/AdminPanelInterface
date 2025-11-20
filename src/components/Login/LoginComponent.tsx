import {FcApproval} from "react-icons/fc";
import {useForm} from "react-hook-form";
import type {SubmitHandler} from "react-hook-form";
import type {LoginRequest} from "@/types/Authnetication.ts";

export default function LoginComponent() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginRequest>();

    const onSubmit: SubmitHandler<LoginRequest> = (data) => console.log(data);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"flex justify-center items-center w-full h-screen "}>
            <div
                className={"flex  flex-col px-5 md:px-10 py-8 bg-white shadow-lg max-w-9/10 md:max-w-[450px] rounded-md  container mx-auto"}>
                <div>
                    <h1 className={"font-yekanBold text-[var(--darkBlue)] py-2 md:text-2xl"}>
                        ورود/ثبت نام
                    </h1>
                </div>
                <h1 className={"h-[2px] my-2 bg-gray-200 w-4/5 self-center"}></h1>
                <div className={"flex flex-col text-gray-500 gap-y-2 py-2"}>
                    <label className={" text-[14px]"}>
                        ایمیل
                    </label>
                    <input {...register("email", {
                        required: {value: true, message: "وارد کردن ایمیل الزامی است"}, pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "فرمت ایمیل صحیح نیست",
                        },
                    })} className={"bg-gray-100 outline-1  focus:outline-blue-500 rounded-md p-2 text-left "}
                           type="text"/>
                    <p className={"text-red-500 text-[13px] font-yekan min-h-[1rem]"}>{errors?.email?.message || ""}</p>

                </div>
                <div className={"flex flex-col text-gray-500 gap-y-2 py-2"}>
                    <label className={" text-[14px] "}>
                        رمز عبور
                    </label>
                    <input {...register("password", {
                        required: {
                            value: true,
                            message: "وارد کردن رمز عبور الزامی است"
                        }
                    })} className={"bg-gray-100 outline-1  focus:outline-blue-500 rounded-md p-2 text-left "}
                           type="text"/>
                    <p className={"text-red-500 text-[13px] min-h-[1rem] font-yekan"}>{errors?.password?.message || ""}</p>
                </div>
                <div className={"flex flex-row-reverse gap-x-1 my-2  justify-end items-center"}>
                    <p className="md:text-sm text-[12px]">
                        ورود/ ثبت‌نام شما به معنای پذیرش
                        <span className="text-blue-500 font-yekanBold"> قوانین </span>
                        میباشد.
                    </p>
                    <p><FcApproval></FcApproval></p>
                </div>
                <button
                    type={"submit"}
                    className={`rounded-md hover:bg-blue-700 cursor-pointer duration-600 bg-blue-500   disabled:bg-gray-300 text-white py-2 px-6 my-3`}>ورود
                </button>

            </div>
        </form>

    );

}