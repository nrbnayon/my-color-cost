"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/authSlice";
import { toast } from "sonner";
import { loginValidationSchema } from "@/lib/formDataValidation";

type FormValues = z.infer<typeof loginValidationSchema>;

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Mock login request - Replace with actual API call
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { ... });
      
      // Simulating network delay for now
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock response data
      const mockUser = {
        name: "Admin User",
        email: data.email,
        role: "admin", // Default mock role
      };
      const mockToken = "mock_access_token_" + Date.now();

      // Dispatch to Redux
      dispatch(
        setCredentials({
          user: mockUser,
          token: mockToken,
        })
      );

      // Set cookies for persistence
      if (data.rememberMe) {
        document.cookie = `accessToken=${mockToken}; path=/; max-age=86400;`; // 1 day
        document.cookie = `userRole=${mockUser.role}; path=/; max-age=86400;`;
        document.cookie = `userEmail=${encodeURIComponent(mockUser.email)}; path=/; max-age=86400;`;
      } else {
        document.cookie = `accessToken=${mockToken}; path=/;`; // Session cookie
        document.cookie = `userRole=${mockUser.role}; path=/;`;
        document.cookie = `userEmail=${encodeURIComponent(mockUser.email)}; path=/;`;
      }

      toast.success("Logged in successfully!");
      router.push("/"); // Redirect to dashboard/home
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-pink-50">
      {/* Background Shape */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/icons/shape.png"
          alt="Background Shape"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full px-4 md:px-0 flex items-center justify-center"
      >
        <Card
          className="w-full max-w-[550px] bg-white border border-[#DDDDDD] rounded-[24px] p-0"
          style={{
            boxShadow:
              "0px 5px 11px 0px #0000000D, 0px 19px 19px 0px #0000000D, 0px 43px 26px 0px #0000000D, 0px 77px 31px 0px #00000003, 0px 120px 34px 0px #00000000",
          }}
        >
          <CardContent className="p-8 md:p-[40px]">
            <div className="flex flex-col items-center gap-6">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center">
                Login
              </h1>

              <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                {/* Email Field */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-xl font-normal text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email..."
                    className={`h-14 rounded-xl text-base ${
                      errors.email ? "border-red-500 focus-visible:ring-red-500" : "text-foreground border-[#3B3B3B]"
                    }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-xl font-normal text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password.."
                      className={`h-14 rounded-xl text-base pr-12 ${
                        errors.password ? "border-red-500 focus-visible:ring-red-500" : "text-foreground border-[#3B3B3B]"
                      }`}
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <Eye className="w-6 h-6" />
                      ) : (
                        <EyeOff className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                {/* Remember & Forgot Password */}
                <div className="flex items-center justify-between">
                    <Controller
                      name="rememberMe"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="rememberMe"
                            className="w-5 h-5 md:w-6 md:h-6 border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label
                            htmlFor="rememberMe"
                            className="text-base font-normal text-foreground cursor-pointer select-none"
                          >
                            Remember
                          </Label>
                        </div>
                      )}
                    />

                  <Link
                    href="/forgot-password"
                    className="text-base font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
                  >
                    Forget Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-13 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-xl shadow-none mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                {/* Sign Up Link */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-base font-normal text-foreground">
                    Don&apos;t have account?
                  </span>
                  <Link
                    href="/signup"
                    className="text-base font-semibold text-[#fb4f79] hover:text-[#fb4f79]/80 hover:underline transition-colors"
                  >
                    Sign Up Now
                  </Link>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
