"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAllData from "../hooks/useAllData";

export interface JobTypes{
  id ?:number
  title: string;
  location: string;
  companyName: string;
  logo: string;
  salary: string;
  email: string;
};

export default function PostJob() {
  const { setFetchedAllJobs, setFetchedMyJobs } = useAllData();
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobTypes>();

  const router=useRouter()

  const onSubmit: SubmitHandler<JobTypes> = (data) => {


    if (!localStorage.getItem("user")) {
      alert("Login to post job");
      return;
    }
    // Assuming email is defined earlier
    data.email = email;
    console.log(data)
    fetch("http://localhost:5000/api/job/create", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      alert("Job Posted Successfully");
      setFetchedAllJobs(false);
      setFetchedMyJobs(false);
      reset();
      router.push("/my-jobs")
    });
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (!user) {
      alert("Kindly Login to Post Job");
      router.push("/")
    }
    //@ts-ignore
    user = JSON.parse(user);
    //@ts-ignore
    setEmail(user.email);
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <p className="py-4 text-xl font-bold">Post Job</p>

      <div className="bg-slate-100">
        <form onSubmit={handleSubmit(onSubmit)} className="py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 mb-4 text-sm gap-4 w-full items-center justify-center">
            {/* inputs */}
            <div className=" w-full flex flex-col gap-2">
              <label className="font-bold">Job Title</label>
              <input
                {...register("title", { required: true })}
                className="border bg-white p-2"
                placeholder="Enter job title"
              />
              {errors.title && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-bold">Company Name</label>
              <input
                {...register("companyName", { required: true })}
                className="border bg-white p-2"
                placeholder="Enter company name"
              />
              {errors.companyName && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-bold">Job Location</label>
              <input
                {...register("location", { required: true })}
                className="border bg-white p-2"
                placeholder="Enter job location"
              />
              {errors.location && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-bold">Company Logo</label>
              <input
                {...register("logo", { required: true })}
                className="border bg-white p-2"
                placeholder="Enter company logo URL"
              />
              {errors.logo && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-bold">Salary ($/yearly)</label>
              <input
                type="number"
                {...register("salary", { required: true })}
                className="border bg-white p-2"
                placeholder="Enter salary"
              />
              {errors.salary && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>

            <div className="w-full flex flex-col gap-2">
              <label className="font-bold">Your Email</label>
              <input
                disabled
                value={email}
                type="email"
                className="p-2 bg-white"
              />
            </div>
          </div>
          <Button title="Submit" />
        </form>
      </div>
    </div>
  );
}
