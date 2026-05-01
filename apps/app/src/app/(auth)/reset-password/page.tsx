"use client";

import { useState } from "react";

import { TextField, Label, Input, FieldError, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log("Resetting to new password");
    // Mock API call
    setTimeout(() => {
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    }, 1000);
  };

  return (
    <div className="p-8 bg-white rounded-3xl shadow-sm border border-black/[0.04]">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#111811]">Create New Password</h1>
        <p className="text-default-500 mt-2">Please enter your new password below</p>
      </div>

      {isSuccess ? (
        <div className="text-center p-4 bg-success-50 text-success-600 rounded-lg">
          Password reset successful! Redirecting to login...
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField isInvalid={!!errors.password} className="space-y-1 block w-full">
            <Label className="text-sm font-medium">New Password</Label>
            <Input {...register("password")} type="password" />
            <FieldError className="text-red-500 text-xs">{errors.password?.message as string}</FieldError>
          </TextField>
          <TextField isInvalid={!!errors.confirmPassword} className="space-y-1 block w-full">
            <Label className="text-sm font-medium">Confirm Password</Label>
            <Input {...register("confirmPassword")} type="password" />
            <FieldError className="text-red-500 text-xs">{errors.confirmPassword?.message as string}</FieldError>
          </TextField>
          <Button 
            type="submit" 
            className="w-full bg-[#2D4D31] text-white font-medium mt-4"
            isDisabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      )}
    </div>
  );
}
