import { create } from "zustand";

import { JobTypes } from "../post-job/page";

interface allData {
  fetchedAllJobs: boolean;
  setFetchedAllJobs: (v: boolean) => void;
  fetchedMyJobs: boolean;
  setFetchedMyJobs: (v: boolean) => void;
  allJobs: JobTypes[] | [];
  setAllJobs: (value: JobTypes[]) => void;
  myJobs: JobTypes[] | [];
  setMyJobs: (value: JobTypes[]) => void;
}

const useAllData = create<allData>((set) => ({
  fetchedAllJobs: false,
  setFetchedAllJobs: (v) => set({ fetchedAllJobs: v }),
  fetchedMyJobs: false,
  setFetchedMyJobs: (v) => set({ fetchedMyJobs: v }),
  allJobs: [],
  setAllJobs: (value) => set({ allJobs: value }),
  myJobs: [],
  setMyJobs: (value) => set({ myJobs: value }),
}));
export default useAllData;
