import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; 
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, Clock, Briefcase, NotebookTabs, UserRound, Mail, BriefcaseBusiness, CalendarIcon, Trash, RefreshCcw, Send, Plus } from "lucide-react"; 
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns"; 
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectAppSchema } from "../../validation/projectAppSchema";

export const ProjectAppForm = () => {
  const { handleSubmit, control, reset, watch, formState: { errors } } = useForm({
    resolver: zodResolver(projectAppSchema), 
    defaultValues: {
      FullName: "",
      Email: "",
      Role: "",
      Year: "",
      employmentType: "",
      rate: "",
      skills: [],
      Availability: "available",
      notice: "",
      info: "",
      projects: [
        { Project: "", tech: "", url: "", startDate: null, endDate: null, currentProject: false, Desc: "" }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects"
  });

 
  const watchAvailability = watch("Availability");

  const onSubmit = (data) => console.log("Form Data:", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto shadow-2xl rounded-xl p-6 md:p-8 bg-primary text-sidebar"
>
      
      {/* Header */}
      <div className="headerSec flex items-center gap-3">
        <BriefcaseBusiness size={50} className="text-destructive"/>
        <h1 className="text-4xl font-bold">Project Application Form</h1>
      </div>
      <p className="text-gray-400 mb-4">Please fill in these details below to apply for the project</p>
      <hr />

      <fieldset>
        <FieldGroup>
          
          {/* Section 1: Applicant Information */}
          <h2 className="font-bold mt-4"> <span className="text-destructive">1.</span> Applicant Information</h2>
          <div className="flex items-start gap-4 justify-center w-full">
            <Controller
              name="FullName"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="name">
                    <UserRound className="text-destructive"/>
                    <span>Full Name</span>
                  </FieldLabel>
                  <Input id="name" autoComplete="off" placeholder="Enter your full name" {...field} />
                  <FieldError>{errors.FullName?.message}</FieldError>
                </Field>
              )}
            />

            <Controller
              name="Email"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="email">
                    <Mail className="text-destructive"/>
                    <span>Email Address</span>
                  </FieldLabel>
                  <Input id="email" autoComplete="off" placeholder="Enter your email" {...field} />
                  <FieldError>{errors.Email?.message}</FieldError>
                </Field>
              )}
            />

            <Controller
              name="Role"
              control={control}
              render={({ field }) => (
                <Field>

                  <FieldLabel>Role Applied For</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full max-w-48 bg-primary text-sidebar">
                      <SelectValue placeholder="Select role"/>
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                      <SelectGroup>
                        <SelectLabel className="text-gray-400">Roles</SelectLabel>
                        <SelectItem value="Fullstack Developer">Fullstack Developer</SelectItem>
                        <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                        <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                        <SelectItem value="Ai/Ml">AI/ML</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="It">IT</SelectItem>
                        <SelectItem value="Mobile Developer">Mobile Developer</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FieldError>{errors.Role?.message}</FieldError>
                </Field>
              )}
            />
          </div>

          <Controller
  name="Year"
  control={control}
  render={({ field }) => (
    <Field className="w-fit flex flex-col items-start">
      <FieldLabel className="flex items-center gap-1">
        <span>Years Of Experience</span>
        <NotebookTabs className="text-destructive" size={18}/>
      </FieldLabel>
      <Select onValueChange={field.onChange} value={field.value}>
        <SelectTrigger id="Year" className="w-fit gap-4 bg-primary text-sidebar border-zinc-700">
          <SelectValue placeholder="ex: 3-5"/>
        </SelectTrigger>
        
       
        <SelectContent className="bg-zinc-900 text-white border-zinc-800">
          <SelectGroup>
            <SelectLabel className="text-gray-400">Years</SelectLabel>
            <SelectItem value="Fresh grad">Fresh grad (0-1)</SelectItem>
            <SelectItem value="Junior Level">Junior Level</SelectItem>
            <SelectItem value="Mid-Level">Mid-Level</SelectItem>
            <SelectItem value="Senior Level">Senior Level</SelectItem>
          </SelectGroup>
        </SelectContent>
        
      </Select>
      <FieldError>{errors.Year?.message}</FieldError>
    </Field>
  )}
/>

          {/* Section 2: Employment Type */}
          <h2 className="font-bold mt-1"> <span className="text-destructive">2.</span> Employment Type</h2>
          <Controller
            name="employmentType"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-3 w-full">
                <RadioGroup value={field.value} onValueChange={field.onChange} className="flex items-center gap-4 justify-center w-full">
                  <label className={cn("flex-1 flex items-center gap-3 px-4 py-3 border border-red-600 rounded-lg cursor-pointer transition-all duration-200", field.value === "full-time" ? "bg-black/40 text-sidebar" : "bg-primary text-sidebar hover:bg-black/20")}>
                    <RadioGroupItem value="full-time" className="sr-only" />
                    <Briefcase size={20} className="text-destructive" />
                    <span className="text-sm font-medium">Full Time</span>
                  </label>

                  <label className={cn("flex-1 flex items-center gap-3 px-4 py-3 border border-red-600 rounded-lg cursor-pointer transition-all duration-200", field.value === "part-time" ? "bg-black/40 text-sidebar" : "bg-primary text-sidebar hover:bg-black/20")}>
                    <RadioGroupItem value="part-time" className="sr-only" />
                    <Clock size={20} className="text-destructive" />
                    <span className="text-sm font-medium">Part Time</span>
                  </label>

                  <label className={cn("flex-1 flex items-center gap-3 px-4 py-3 border border-red-600 rounded-lg cursor-pointer transition-all duration-200", field.value === "freelancer" ? "bg-black/40 text-sidebar" : "bg-primary text-sidebar hover:bg-black/20")}>
                    <RadioGroupItem value="freelancer" className="sr-only" />
                    <UserRound size={20} className="text-destructive" />
                    <span className="text-sm font-medium">Freelancer</span>
                  </label>
                </RadioGroup>
                <FieldError>{errors.employmentType?.message}</FieldError>
              </div>
            )}
          />

          <Controller
            name="rate"
            control={control}
            render={({ field }) => (
              <Field className="rounded-xl bg-black/45 p-6 flex flex-col items-start gap-2 mt-4">
                <h3 className="text-sidebar font-medium">Hourly Rate (USD)</h3>
                <div className="w-full">
                  <Input placeholder="e.g 25" className="p-4 w-fit mb-1 text-white" {...field} />
                  <p className="text-xs text-gray-400">Enter your expected hourly rate</p>
                </div>
                <FieldError>{errors.rate?.message}</FieldError>
              </Field>
            )}
          />
          <hr />

          {/* Section 3: Projects */}
          <div className="flex justify-between items-center my-4">
  <h2 className="font-bold"> <span className="text-destructive">3.</span> Projects</h2>
  <Button 
    type="button"
    onClick={() => append({ Project: "", tech: "", url: "", startDate: null, endDate: null, currentProject: false, Desc: "" })}
    className="bg-accent-foreground p-3 cursor-pointer flex items-center gap-1"
  > 
    <Plus size={16}/> Add Project
  </Button>
</div>

<div className="space-y-6">
  {fields.map((item, index) => (
    <div key={item.id} className="border border-destructive rounded-lg p-5 space-y-4 relative bg-black/10">
      <div className="flex justify-between items-center">
        <Label className="bg-black/30 text-white rounded-3xl w-fit p-2 px-4 block text-sm">
          Project {index + 1}
        </Label>
        {fields.length > 1 && (
          <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
            <Trash size={14} className="mr-1"/> Remove
          </Button>
        )}
      </div>

      <div className="flex items-start gap-4 justify-center">
        <Controller
          name={`projects.${index}.Project`}
          control={control}
          render={({ field }) => (
            <div className="w-full">
              <Label>Project Name</Label>
              <Input className="w-full mt-2" autoComplete="off" placeholder="Enter Project Name" {...field} />
              <p className="text-sm text-destructive mt-1">{errors.projects?.[index]?.Project?.message}</p>
            </div>
          )}
        />
        <Controller
          name={`projects.${index}.tech`}
          control={control}
          render={({ field }) => (
            <div className="w-full">
              <Label>Tech Stack</Label>
              <Input className="w-full mt-2" autoComplete="off" placeholder="</> e.g React, Node.js" {...field} />
              <p className="text-sm text-destructive mt-1">{errors.projects?.[index]?.tech?.message}</p>
            </div>
          )}
        />
        <Controller
          name={`projects.${index}.url`}
          control={control}
          render={({ field }) => (
            <div className="w-full">
              <Label className="flex items-center gap-1"><span>Project URL</span> <Link size={14} className="text-gray-500" /></Label>
              <Input className="w-full mt-2" autoComplete="off" placeholder="https://example.com" {...field} />
              <p className="text-sm text-destructive mt-1">{errors.projects?.[index]?.url?.message}</p>
            </div>
          )}
        />
      </div>

      <div className="flex items-start gap-4 justify-center mt-3">
        <Controller
          name={`projects.${index}.startDate`}
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 w-full">
              <Label>Start Date <span className="text-destructive">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal pl-3 h-10 bg-primary border-sidebar text-sidebar hover:bg-black/20", !field.value && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                    {field.value ? format(field.value, "PPP") : <span>Select start date</span>}
                  </Button>
                </PopoverTrigger>
                
               
                <PopoverContent className="w-auto p-0 text-white bg-zinc-900 border-zinc-800 [&_select]:bg-zinc-800 [&_select]:text-white [&_select]:border-zinc-700 [&_option]:bg-zinc-900 [&_option]:text-white" align="start">
                  <Calendar  mode="single" captionLayout="dropdown" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date("1900-01-01")} initialFocus  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-destructive">{errors.projects?.[index]?.startDate?.message}</p>
            </div>
          )}
        />

        <Controller
          name={`projects.${index}.endDate`}
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 w-full">
              <Label>End Date <span className="text-destructive">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal pl-3 h-10 bg-primary border-sidebar text-sidebar hover:bg-black/20", !field.value && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                    {field.value ? format(field.value, "PPP") : <span>Select end date</span>}
                  </Button>
                </PopoverTrigger>
                
                {/* تم تعديل الكلاسات هنا لتغميق القوائم المنسدلة والخيارات */}
                <PopoverContent className="w-auto p-0 text-white bg-zinc-900 border-zinc-800 [&_select]:bg-zinc-800 [&_select]:text-white [&_select]:border-zinc-700 [&_option]:bg-zinc-900 [&_option]:text-white" align="end">
                  <Calendar mode="single" captionLayout="dropdown" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date("1900-01-01")} initialFocus />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-destructive">{errors.projects?.[index]?.endDate?.message}</p>
            </div>
          )}
        />

        <Controller
          name={`projects.${index}.currentProject`}
          control={control}
          render={({ field }) => (
            <div className="mt-8 flex items-center gap-2 w-full h-10 pb-2">
              <Checkbox id={`current-${index}`} checked={field.value} onCheckedChange={field.onChange} />
              <label htmlFor={`current-${index}`} className="text-sidebar text-sm font-medium cursor-pointer">Yes This Is My Current Project</label>
            </div>
          )}
        />
      </div>

      <Controller
        name={`projects.${index}.Desc`}
        control={control}
        render={({ field }) => (
          <div className="mt-4">
            <Label className="mb-2 block">Description</Label>
            <Textarea placeholder="Brief description of the project 0/250" {...field}></Textarea>
            <p className="text-sm text-destructive">{errors.projects?.[index]?.Desc?.message}</p>
          </div>
        )}
      />
    </div>
  ))}
</div>
<hr />

          {/* Section 4 & 5: Skills and Availability */}
          <div className="flex w-full items-start gap-8 my-4">
            
            {/* Skills */}
            <div className="flex flex-col w-1/2 pr-8 border-r border-gray-200 dark:border-zinc-800">
              <h2 className="font-bold mb-4"> <span className="text-destructive">4.</span> Skills</h2>
              <Controller
                name="skills"
                control={control}
                render={({ field: { value, onChange, onBlur, ref } }) => {
                  const handleCheck = (skillName, isChecked) => {
                    const currentValues = value || [];
                    if (isChecked) {
                      onChange([...currentValues, skillName]);
                    } else {
                      onChange(currentValues.filter((v) => v !== skillName)); 
                    }
                  };

                  return (
                    <div className="flex flex-col gap-4 w-full" ref={ref} onBlur={onBlur}>
                      <div className="flex items-center justify-start gap-6 w-full">
                        <Field orientation="horizontal" className="flex items-center !justify-start gap-2 !w-fit">
                          <Checkbox id="react-checkbox" checked={value?.includes("React")} onCheckedChange={(checked) => handleCheck("React", checked)} />
                          <FieldLabel htmlFor="react-checkbox" className="font-normal cursor-pointer whitespace-nowrap text-sidebar !m-0">React</FieldLabel>
                        </Field>
                        <Field orientation="horizontal" className="flex items-center !justify-start gap-2 !w-fit">
                          <Checkbox id="typescript-checkbox" checked={value?.includes("TypeScript")} onCheckedChange={(checked) => handleCheck("TypeScript", checked)} />
                          <FieldLabel htmlFor="typescript-checkbox" className="font-normal cursor-pointer whitespace-nowrap text-sidebar !m-0">TypeScript</FieldLabel>
                        </Field>
                        <Field orientation="horizontal" className="flex items-center !justify-start gap-2 !w-fit">
                          <Checkbox id="next-checkbox" checked={value?.includes("Next.js")} onCheckedChange={(checked) => handleCheck("Next.js", checked)} />
                          <FieldLabel htmlFor="next-checkbox" className="font-normal cursor-pointer whitespace-nowrap text-sidebar !m-0">Next.js</FieldLabel>
                        </Field>
                      </div>

                      <div className="flex items-center justify-start gap-6 w-full">
                        <Field orientation="horizontal" className="flex items-center !justify-start gap-2 !w-fit">
                          <Checkbox id="node-checkbox" checked={value?.includes("Node.js")} onCheckedChange={(checked) => handleCheck("Node.js", checked)} />
                          <FieldLabel htmlFor="node-checkbox" className="font-normal cursor-pointer whitespace-nowrap text-sidebar !m-0">Node.js</FieldLabel>
                        </Field>
                        <Field orientation="horizontal" className="flex items-center !justify-start gap-2 !w-fit">
                          <Checkbox id="python-checkbox" checked={value?.includes("Python")} onCheckedChange={(checked) => handleCheck("Python", checked)} />
                          <FieldLabel htmlFor="python-checkbox" className="font-normal cursor-pointer whitespace-nowrap text-sidebar !m-0">Python</FieldLabel>
                        </Field>
                        <Field orientation="horizontal" className="flex items-center !justify-start gap-2 !w-fit">
                          <Checkbox id="java-checkbox" checked={value?.includes("Java")} onCheckedChange={(checked) => handleCheck("Java", checked)} />
                          <FieldLabel htmlFor="java-checkbox" className="font-normal cursor-pointer whitespace-nowrap text-sidebar !m-0">Java</FieldLabel>
                        </Field>
                      </div>

                      <div className="flex items-center justify-start gap-6 w-full">
                        <Field orientation="horizontal" className="flex items-center !justify-start gap-2 !w-fit">
                          <Checkbox id="mongodb-checkbox" checked={value?.includes("MongoDB")} onCheckedChange={(checked) => handleCheck("MongoDB", checked)} />
                          <FieldLabel htmlFor="mongodb-checkbox" className="font-normal cursor-pointer whitespace-nowrap text-sidebar !m-0">MongoDB</FieldLabel>
                        </Field>
                        <Field orientation="horizontal" className="flex items-center !justify-start gap-2 !w-fit">
                          <Checkbox id="postgresql-checkbox" checked={value?.includes("PostgreSQL")} onCheckedChange={(checked) => handleCheck("PostgreSQL", checked)} />
                          <FieldLabel htmlFor="postgresql-checkbox" className="font-normal cursor-pointer whitespace-nowrap text-sidebar !m-0">PostgreSQL</FieldLabel>
                        </Field>
                        <Field orientation="horizontal" className="flex items-center !justify-start gap-2 !w-fit">
                          <Checkbox id="aws-checkbox" checked={value?.includes("AWS")} onCheckedChange={(checked) => handleCheck("AWS", checked)} />
                          <FieldLabel htmlFor="aws-checkbox" className="font-normal cursor-pointer whitespace-nowrap text-sidebar !m-0">AWS</FieldLabel>
                        </Field>
                      </div>
                      <FieldError>{errors.skills?.message}</FieldError>
                    </div>
                  );
                }}
              />
            </div>

            {/* Availability */}
            <div className="flex flex-col w-1/2 pl-4">
              <Controller
                name="Availability"
                control={control}
                render={({ field }) => (
                  <Field className="w-full flex flex-col gap-2">
                    <h2 className="font-bold"> <span className="text-destructive">5.</span> Availability</h2>
                    <FieldLabel>Available Now</FieldLabel>
                    
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="w-fit flex gap-6">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="available" id="r2" />
                        <Label htmlFor="r2" className="cursor-pointer">Yes, I am available now</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="notavailable" id="r3" />
                        <Label htmlFor="r3" className="cursor-pointer">No, I have notice period</Label>
                      </div>
                    </RadioGroup>

                    {/* 🔥 لا يظهر الـ select الخاص بالـ notice إلا إذا كانت قيمة الـ Availability هي notavailable */}
                    {watchAvailability === "notavailable" && (
                      <Controller
                        name="notice"
                        control={control}
                        render={({ field: noticeField }) => (
                          <Field className="w-full mt-3 flex flex-col gap-2 animate-in fade-in duration-200">
                            <FieldLabel>Please Select Your Notice Period</FieldLabel>
                            <Select onValueChange={noticeField.onChange} value={noticeField.value}>
                              <SelectTrigger className="w-full max-w-48 bg-primary text-sidebar border-zinc-700">
                                <SelectValue placeholder="select notice"/>
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                                <SelectGroup>
                                  <SelectLabel className="text-gray-400">Periods</SelectLabel>
                                  <SelectItem value="1 month">1 month</SelectItem>
                                  <SelectItem value="2-3 month">2-3 month</SelectItem>
                                  <SelectItem value="4-5 months">4-5 months</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FieldError>{errors.notice?.message}</FieldError>
                          </Field>
                        )}
                      />
                    )}
                    <FieldError>{errors.Availability?.message}</FieldError>
                  </Field>
                )}
              />
            </div>

          </div>
          <hr />

          {/* Section 6: Additional Information */}
          <h2 className="font-bold mt-2 mb-4"> <span className="text-destructive">6.</span> Additional information</h2>
          <Controller
            name="info"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Cover Letter / Additional Notes</FieldLabel>
                <Textarea {...field} className="border border-zinc-700 p-4 rounded-xl text-white bg-transparent" placeholder="Tell us about yourself, your motivation, or anything else you would like to share..." />
                <FieldError>{errors.info?.message}</FieldError>
              </Field>
            )}
          />
          <hr />
        </FieldGroup>
      </fieldset>

      {/* Buttons */}
      <div className="ButtonsCont flex gap-2 justify-end mt-4">
        <Button type="button" onClick={() => reset()} className="bg-accent-foreground text-sidebar p-5 rounded-lg text-md hover:bg-gray-300 hover:text-gray-500">
          <RefreshCcw size={22}/> Reset
        </Button>
        <Button type="submit" className="bg-accent-foreground text-sidebar p-5 rounded-lg text-md hover:bg-black/20">
          <Send size={22}/> Submit Application
        </Button>
      </div>
      
    </form>
  );
};