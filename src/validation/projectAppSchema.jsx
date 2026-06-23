import * as z from "zod";

export const projectAppSchema = z.object({
  FullName: z.string().min(8, "Full name must be at least 8 characters"),
  Email: z.string().email("Invalid email address"),
  Role: z.string().min(1, "Please select a role"),
  Year: z.string().min(1, "Please select your experience level"),
  employmentType: z.string().min(1, "Please select an employment type"),
  rate: z.string()
    .min(1, "Hourly rate is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Rate must be a positive number"),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  Availability: z.string().min(1, "Please select your availability"),
  notice: z.string().optional(),
  info: z.string().max(300, "Additional info cannot exceed 300 characters").optional(),
  
  projects: z.array(
    z.object({
      Project: z.string().min(4, "Project name must be at least 4 characters"),
      tech: z.string().min(3, "Tech stack is required"),
      url: z.string().url("Please enter a valid URL").or(z.literal("")),
      startDate: z.date({ required_error: "Start date is required" }).nullable(),
      endDate: z.date({ required_error: "End date is required" }).nullable(),
      currentProject: z.boolean().default(false),
      Desc: z.string().min(10, "Description must be at least 10 characters").max(250, "Max 250 characters"),
    })
  ).min(1, "You must add at least one project")
}).refine((data) => {
  if (data.Availability === "notavailable" && !data.notice) {
    return false;
  }
  return true;
}, {
  message: "Please select your notice period",
  path: ["notice"],
});