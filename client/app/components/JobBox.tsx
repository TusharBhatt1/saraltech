import { CiLocationOn } from "react-icons/ci";
import { toast } from "react-toastify";
import { useState } from "react";
import { JobTypes } from "../post-job/page";

export default function JobBox({ job }: { job: JobTypes }) {
  const {
    id,
    title,
    logo,
    location,
    companyName,
    salary,
  } = job;
  const handleOnApply = (job: JobTypes) => {
    const user = localStorage.getItem("user");
    if (user) {
      if (!isApplied) {
        let appliedJobs = localStorage.getItem("appliedJobs");
        if (appliedJobs) {
          appliedJobs = JSON.parse(appliedJobs);
          localStorage.setItem(
            "appliedJobs",
            //@ts-ignore
            JSON.stringify([job, ...appliedJobs])
          );
          setIsApplied(true);
        } else {
          localStorage.setItem("appliedJobs", JSON.stringify([job]));
        }
      }

      // setApplied(true)
    } else toast.error("Login to apply");
  };

  const [isApplied, setIsApplied] = useState(false);

  return (
    <div className="border border-slate-200 flex flex-col gap-3 bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <img
            className="h-10 w-10"
            src={logo}
            alt="Company Logo"
            onError={(e) => {
              //@ts-ignore
              e.target.style.display = "none"; // Hide the image if it fails to load
            }}
          />
          <span className="font-bold text-xs">{companyName}</span>
        </div>
        <div>
          <button
            className={`border bg-black text-white hover:bg-slate-500 p-2 ${
              isApplied && "bg-green-400 text-white hover:bg-green-400"
            }`}
            onClick={() => handleOnApply(job)}
          >
            {isApplied ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-lg">{title}</span>
        <div className="flex flex-wrap gap-4 items-center justify-between text-slate-500">
          <span>$ {salary} / year</span>
        </div>
      </div>
      <div></div>

      <div className="flex items-center gap-1">
        <CiLocationOn />

        <span className="text-sm">{location}</span>
      </div>
    </div>
  );
}
