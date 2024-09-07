import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a job title."],
        minLength: [3, "Job title must be at least 3 characters"],
        maxLength: [50, "Job title cannot exceed 50 characters"],
    },
    description: {
        type: String,
        required: [true, "Please provide a job description."],
        minLength: [10, "Job description must be at least 50 characters"],
        maxLength: [2000, "Job description cannot exceed 2000 characters"],
    },
    category: {
        type: String,
        required: [true, "Please provide a job category."],
    },
    country: {
        type: String,
        required: [true, "Please provide the country."],
    },
    city: {
        type: String,
        required: [true, "Please provide the city."],
    },
    location: {
        type: String,
        required: [true, "Please provide the location."],
    },
    fixedSalary: {
        type: Number,
        min: [1000, "Fixed salary must be at least 1000."],  
        max: [999999999, "Fixed salary cannot exceed 999,999,999."],  
    },
    salaryFrom: {
        type: Number,
        min: [1000, "Minimum salary must be at least 1000."],
        max: [999999999, "Minimum salary cannot exceed 999,999,999."],  
    },
    salaryTo: {
        type: Number,
        min: [1000, "Maximum salary must be at least 1000."], 
        max: [999999999, "Maximum salary cannot exceed 999,999,999."],  
    },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Please provide the user who posted the job."]
    },
});

export const Job = mongoose.model("Job", jobSchema);
