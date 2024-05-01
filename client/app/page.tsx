"use client"
import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Jobs from "./components/Jobs";
import Sidebar from "./components/sidebar/Sidebar";
import NewsLetter from "./components/NewsLetter";
import { toast } from "react-toastify";
import useAllData from "./hooks/useAllData";
import { JobTypes } from "./post-job/page";



export default function Home() {
  const { allJobs, setAllJobs, fetchedAllJobs, setFetchedAllJobs } =
    useAllData();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const onNextPage = () => {
    if (currentPage < Math.ceil(filteredItems?.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const onPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const getAllJobs = async () => {
    setLoading(true);
    try {
      const pr1 = fetch("https://saraltech-be.onrender.com/api/job/getAll");
      const pr2 = fetch("jobs.json");
      const [jobs1, jobs2] = await Promise.allSettled([pr1, pr2]);
      let data1:JobTypes[]  = [];
      await new Promise((res) => setTimeout(res, 2000));
     
      if (jobs1.status === "fulfilled") {
        data1 = await jobs1.value.json();
      }
      let data2 :JobTypes[]  = [];
      if (jobs2.status === "fulfilled") data2 = await jobs2.value.json();

      if (data1.length > 0 || data2.length > 0) {
        //@ts-ignore
        setAllJobs([...data1.data, ...data2]);
      }
      setFetchedAllJobs(true);
    } catch (err) {
      console.log(err);
      setAllJobs([]);
      toast.error("Failed to fetch all jobs");
      // alert("Failed to fetch all jobs");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (fetchedAllJobs) return;
    getAllJobs();
  }, []);

  const filteredItems = allJobs?.filter((job) =>
    job?.title?.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleRadioFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const filterData = (
    jobs: JobTypes[],
    selectedCategory: string,
    query: string
  ) => {
    let filteredJobs = allJobs;

    if (query) {
      filteredJobs = filteredJobs?.filter(
        (job) =>
          job?.title.toLowerCase().replace(" ","").includes(query.toLowerCase()) ||
          job.companyName?.toLowerCase().replace(" ","").includes(query.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredJobs = filteredJobs?.filter(
        ({ location, salary}) =>
          location.toLowerCase() === selectedCategory.toLowerCase() ||
        parseInt(salary) <= parseInt(selectedCategory) 
      )
    }
    //slice the data based on current page

    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs;
  };

  const result = filterData(allJobs || [], selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleChange={handleChange} />
      <div className="flex flex-col md:grid grid-cols-4 py-7 bg-slate-100 md:px-7 gap-4">
        <Sidebar handleRadioFilter={handleRadioFilter} />

        <div className="col-span-2 flex flex-col">
          <Jobs loading={loading} jobs={result} />

          {/* pagination */}
          {result.length > 0 && (
            <div className="flex justify-center items-center gap-4 py-4">
              <button
                disabled={currentPage === 1}
                className="disabled:text-slate-400 disabled:decoration-none"
                onClick={onPrevPage}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems?.length / itemsPerPage)}
              </span>
              <button
                disabled={
                  currentPage ===
                  Math.ceil(filteredItems?.length / itemsPerPage)
                }
                className="disabled:text-slate-400 disabled:decoration-none"
                onClick={onNextPage}
              >
                Next
              </button>
            </div>
          )}
        </div>
        <NewsLetter />
      </div>
    </div>
  );
}
