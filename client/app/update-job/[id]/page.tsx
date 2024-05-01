"use client"
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/Button";
import { JobTypes } from "../../post-job/page";
import { useRouter } from "next/navigation";
import useAllData from "@/app/hooks/useAllData";

export default function UpdateJob({params}:{params:{id:string}}) {
  const {setFetchedAllJobs,setFetchedMyJobs}=useAllData()
  //@ts-ignore
  const [job, setJob] = useState<JobTypes>({});
  const router=useRouter()

  const id=params.id
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobTypes>();

  useEffect(() => {
    fetch(`http://localhost:5000/api/job/getJob/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data.data)
      });
  }, [id]);
  const {
    logo,
    companyName,
    location,
    salary,
    title,
    email,
  } = job;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const onSubmit: SubmitHandler<Inputs> = (formData: JobTypes) => {
    const data = {
      title: formData.title || job.title,
      companyName: formData.companyName || job.companyName,
      location: formData.location || job.location,
      logo: formData.logo || job.logo,
      email: formData.email || job.email,
      salary:formData.salary || job.salary
    };

    fetch(`http://localhost:5000/api/job/update/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      alert("Job updated successfully");
      reset();
      setFetchedAllJobs(false)
      setFetchedMyJobs(false)
      router.push("/my-jobs")
    });
  };
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <p className="py-4 text-xl">Update Job</p>
      <div className="bg-slate-100">
        <form className="py-8 px-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 mb-4 text-sm gap-4 w-full items-center justify-center">
       
            <div className=" w-full flex flex-col gap-2">
              <label className="font-bold">Job Title</label>
              <input
                defaultValue={title}
                {...register("title")}
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
                defaultValue={companyName}
                {...register("companyName")}
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
                defaultValue={location}
                {...register("location")}
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
                defaultValue={logo}
                {...register("logo")}
                className="border bg-white p-2"
                placeholder="Enter company logo URL"
              />
              {errors.logo && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-bold">Salary in $/yearly</label>
              <input
                defaultValue={salary}
                {...register("salary")}
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
                defaultValue={email}
                type="email"
                {...register("email")}
                className="p-2"
                placeholder="Enter your email address"
              />
              {errors.email && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
          </div>
          <Button title="Update" />
        </form>
      </div>
    </div>
  );
}
