"use client"
import { useEffect, useState } from "react";
import useAllData from "../hooks/useAllData";
import { redirect } from 'next/navigation'
import { toast } from "react-toastify";
import Link from "next/link";
import { JobTypes } from "../post-job/page";

export default function MyJobs() {


  const { myJobs, setMyJobs, fetchedMyJobs, setFetchedMyJobs,setFetchedAllJobs } = useAllData();
  const [filteredJobs, setFilteredJobs] = useState<JobTypes[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (!user) {
      toast.error("Kindly login first");

     redirect("/");
    }
    user = JSON.parse(user);
    if (fetchedMyJobs) {
      setFilteredJobs(myJobs)
      return;
    }

    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    fetch(`http://localhost:5000/api/job/getAll`,{method:"GET"})
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setMyJobs([...data.data]);
        setFilteredJobs(data.data); // Initialize filteredJobs with all jobs
        setFetchedMyJobs(true);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const filtered = myJobs.filter((j) =>
      j.title.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredJobs(filtered); // Update filteredJobs state
  };

  const handleDeletePost = (id: number) => {
    fetch(`http://localhost:5000/api/job/delete/${id}`,{method:"DELETE"});
    setFilteredJobs(filteredJobs.filter((job) => job.id !== id));
    setFetchedMyJobs(false)
    setFetchedAllJobs(false)
  };
  
  
   
  // if(filteredJobs.length==0) return <p className="text-center mt-7">No Job posted!</p>
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <span>All Jobs: {filteredJobs.length}</span>
          <input
            onChange={handleSearch}
            className="border p-2 px-7 focus:outline-none"
            placeholder="Search your posting"
          />
        </div>
        {/* table */}
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-xs text-center  text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-3 hidden sm:inline-block">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 hidden sm:inline-block">
                    Salary
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Loading/>
                ) : filteredJobs.length === 0 ? (
                  <tr>
                    <td className="text-center py-4">No job posted.</td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={job.id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 text-center font-medium  text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {job.title}
                      </th>
                      <th 
                      className="px-6 py-4 hidden sm:inline text-center">{job.location}
                      </th>
                      <td className="px-6 py-4 text-left hidden sm:inline-block">
                        {job.salary}$
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/update-job/${job.id}`}
                          className="text-blue-500"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                       
                       
                        <button
                          className="text-red-500"
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          //@ts-expect-error
                          onClick={() => handleDeletePost(job.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

}
function Loading()
  {
    return (
  
      <div>
        <div role="status" className="max-w-full p-4 animate-pulse bg-white">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        </div>
      </div>
  
)
  }
