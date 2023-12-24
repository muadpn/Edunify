"use client";
import {
  SchoolFormValidator,
  TSchoolFormValidator,
} from "@/lib/validation/school-form-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, School } from "lucide-react";

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const AddSchool = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSchoolFormValidator>({
    resolver: zodResolver(SchoolFormValidator),
  });

  const onSubmit = async ({ image, ...datas }: TSchoolFormValidator) => {
    const data = new FormData();
    data.set("file", image[0]);
    data.set("address", datas.address);
    data.set("city", datas.city);
    data.set("contact", datas.contact);
    data.set("email_id", datas.email_id);
    data.set("name", datas.name);
    data.set("state", datas.state);

    await fetch("/api/school/add", {
      method: "POST",
      body: data,
    })
      .then(async (res: Response) => {
        const response = await res.json();
        if (!res.ok) {
          toast.error(response.message);
          return;
        }
        if (res.ok) {
          toast.success("Sucessfully Registered");
          setTimeout(() => {
            toast.success("Thank You for Registering.");
          }, 1500);
          return;
        }
      })
      .catch((err) => {
        toast.error("Oops! Something went wrong, Please try again later.");
        return;
      })
      .finally(() => {
        reset();
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center flex-col  my-8    ">
        <h3 className="text-2xl font-medium tracking-tight pb-3">
          School Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-5  ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">School Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="eg: National Public School"
              className={cn({
                "border-destructive focus-visible:ring-destructive":
                  errors.name?.message,
              })}
            />
            <p
              className={cn("text-muted-foreground font-medium  text-xs h-1", {
                "text-destructive": errors.name?.message,
              })}
            >
              {errors.name && errors?.name.message}
            </p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email_id">Email</Label>
            <Input
              id="email_id"
              {...register("email_id")}
              placeholder="school@example.com"
              className={cn({
                "border-destructive focus-visible:ring-destructive":
                  errors.email_id?.message,
              })}
            />

            <p
              className={cn("text-muted-foreground font-medium text-xs h-1", {
                "text-destructive": errors.email_id?.message,
              })}
            >
              {errors.email_id && errors?.email_id.message}
            </p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="contact">Contact </Label>
            <Input
              id="contact"
              {...register("contact")}
              placeholder="7580880808"
              className={cn({
                "border-destructive focus-visible:ring-destructive":
                  errors.contact?.message,
              })}
            />
            <p
              className={cn("text-muted-foreground font-medium text-xs h-1", {
                "text-destructive": errors.contact?.message,
              })}
            >
              {errors.contact ? errors?.contact.message : ""}
            </p>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              {...register("address")}
              placeholder="12st, Jaya Prakash Nagar, Belikahalli"
              className={cn({
                "border-destructive focus-visible:ring-destructive":
                  errors.address?.message,
              })}
            />
            <p
              className={cn("text-muted-foreground font-medium text-xs h-1", {
                "text-destructive": errors.address?.message,
              })}
            >
              {errors.address && errors?.address.message}
            </p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="city">City</Label>
            <Input
              id="name"
              {...register("city")}
              placeholder="Bangalore"
              className={cn({
                "border-destructive focus-visible:ring-destructive":
                  errors.city?.message,
              })}
            />
            <p
              className={cn("text-muted-foreground font-medium text-xs h-1", {
                "text-destructive": errors.city?.message,
              })}
            >
              {errors.city && errors?.city.message}
            </p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">State</Label>
            <Input
              id="state"
              {...register("state")}
              placeholder="Karnataka"
              className={cn({
                "border-destructive focus-visible:ring-destructive":
                  errors.state?.message,
              })}
            />

            <p
              className={cn("text-muted-foreground font-medium text-xs h-1", {
                "text-destructive": errors.state?.message,
              })}
            >
              {errors.state && errors?.state.message}
            </p>
          </div>
          <div className="grid w-full max-w-sm  items-center gap-1.5">
            <Label htmlFor="image">Add Image</Label>
            <Input
              id="image"
              type="file"
              {...register("image")}
              placeholder="Image"
              className={cn(
                {
                  "border-destructive focus-visible:ring-destructive":
                    errors.image?.message,
                },
                ""
              )}
            />
            <p
              className={cn("text-muted-foreground text-xs", {
                "text-destructive": errors.image?.message,
              })}
            >
              Note: Only .jpg, .jpeg, .png and .webp formats are supported.{" "}
            </p>
          </div>
        </div>
        <div className="grid w-full self-center mt-2  max-w-sm">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <div className="flex gap-2 items-center">
                Submitting
                <Loader2 className="h-1 w-4 animate-spin " />
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddSchool;
