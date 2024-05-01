import prisma from '../DB/db.config.js';


export const fetchJobs=async(req,res)=>{
    const jobs=await prisma.job.findMany({})
    return res.json({success:true, data:jobs,message:"Jobs fetched Successfully"})
    res.json({success:true})

}
export const getJob=async(req,res)=>{
    const jobId=req.params.id

    const job=await prisma.job.findFirst({
        where:{
            id:Number(jobId)
        }
    })
    return res.json({success:true, data:job,message:"Jobs fetched Successfully"})

}
export const deleteJob=async(req,res)=>{
    res.json({success:true})
    const jobId=req.params.id

    await prisma.job.delete({
        where: {
            id:Number(jobId)
        }
    })
    return res.json({success:true,message:"Jobs Deleted Successfully"})

}

export const createJob = async (req, res) => {
    const { ...rest } = req.body;
    console.log(req.body)

    // Create the Job
    try {
        await prisma.job.createMany({
            data: {
               ...rest
            },
        });
        return res.status(200).json({ message: 'Job created successfully' });
    } catch (error) {
        console.log('Error creating Job:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const updateJob=async(req,res)=>{

const jobId= req.params.id
const {email,...rest}=req.body
// console.log(...rest)

// await prisma.job.update({
//     where:{
//         id:Number(jobId)
//     },
//     data:{
//         ...rest
//     }
// })

return res.json({status:200, message:"Job updated successfully"})
}