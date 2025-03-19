"use client";
import { SearchInput } from "../common/searchInput";
import Icons from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import GoogleButton from "../common/googleButton";
import {
  Drawer as SideDrawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/common/sideDrawer";
import Icon from "@/components/common/icon";
import { useDispatch } from "react-redux";
import { loginThunk, refreshTokenThunk } from "@/redux/thunks/Auth";
import type { AppDispatch } from "@/redux/store";
import Navbar from "@/components/layout/nav/commercialNav";
import Image from "next/image";
import { useForm } from "react-hook-form";
import ViewCartButton from "../common/viewCartButton";
import Link from "next/link";
import QuizDrawer from "../common/quiz";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronRight, LogOut } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [permission, setPermission] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [openUser, setOpenUser] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const { register, setValue, watch, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      loginEmail: "",
      loginPassword: "",
    },
  });

  const [step, setStep] = useState<"email" | "password">("email");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parseUser = JSON.parse(user);
      if (parseUser.role === "admin") {
        setPermission(true);
      }
    }

    if (loggedIn === null) {
      const token = localStorage.getItem("accessToken");
      setLoggedIn(token);
    }

    if (openUser) {
      reset();
    }
  }, [loggedIn, openUser, reset]);

  useEffect(() => {
    if (loggedIn !== null) {
      const interval = setInterval(() => {
        const refreshToken = localStorage.getItem("refreshToken") ?? "";
        dispatch(refreshTokenThunk(refreshToken));
      }, 1000 * 60 * 10);

      return () => clearInterval(interval);
    }
  }, [loggedIn, dispatch]);

  const handleSignUp = () => {
    setSignUp(!signUp);
    reset();
  };

  const handleContinue = () => {
    if (step === "email") {
      setValue("loginEmail", watch("email"));
      setStep("password");
    } else if (step === "password") {
      dispatch(
        loginThunk({
          email: watch("loginEmail"),
          password: watch("loginPassword"),
        })
      );
      setOpenUser(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  return (
    <header className="w-full sticky top-0 bg-white shadow-md z-[400]">
      {/* Promo banner */}
      <div className="w-full h-7 pt-1.5 font-semibold bg-black text-white text-center text-xs">
        KHUYẾN MÃI THÊM Ở ĐÂY
      </div>

      {/* Secondary nav links - hidden on mobile */}
      <div className="h-3 hidden sm:block">
        <div className="flex justify-end -space-x-0.5 px-4 md:px-8">
          <Button className="text-xs font-thin" variant="link">
            Contact
          </Button>
          <Button className="text-xs font-thin" variant="link">
            Tel
          </Button>
          <Button className="text-xs font-thin" variant="link">
            Address
          </Button>
        </div>
      </div>

      {/* Main header section */}
      <div className="flex flex-wrap items-center justify-between pt-3 px-4 md:px-8 border-b pb-3">
        {/* Logo and mobile menu button */}
        <div className="flex items-center gap-3">
          <button
            className="p-1.5 rounded-md md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={20} className="text-gray-700" />
            ) : (
              <Menu size={20} className="text-gray-700" />
            )}
          </button>

          <div className="font-bold text-lg">LOGO</div>
        </div>

        {/* Navigation - desktop */}
        <div className="hidden md:block">
          <Navbar />
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden sm:block">
            <SearchInput />
          </div>

          {/* User account icon/button */}
          {loggedIn ? (
            <SideDrawer direction="right">
              <DrawerTrigger asChild>
                <button
                  className="p-1.5 rounded-full hover:bg-gray-100"
                  aria-label="User account"
                >
                  <Icons name="user" className="cursor-pointer" />
                </button>
              </DrawerTrigger>
              <DrawerContent className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 h-full rounded-none z-[500]">
                <div className="flex justify-between items-center p-4 bg-gray-200 border-b border-gray-300">
                  <DrawerTitle className="text-lg font-semibold">
                    HI NGUYỄN
                  </DrawerTitle>
                  <DrawerClose asChild>
                    <button
                      className="p-1.5 rounded-full hover:bg-gray-300"
                      aria-label="Close"
                    >
                      <X size={18} />
                    </button>
                  </DrawerClose>
                </div>

                <div className="flex justify-center py-4 bg-gray-100">
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className="rounded-full border-2 border-white shadow-md"
                  />
                </div>

                <div className="flex flex-col gap-1 p-4">
                  <Button
                    variant="ghost"
                    className="justify-start py-3 hover:bg-gray-100 text-left"
                  >
                    <span className="font-medium">VISIT YOUR ACCOUNT</span>
                    <ChevronRight className="ml-auto h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    className="justify-start py-3 hover:bg-gray-100 text-left"
                  >
                    <span className="font-medium">VIEW YOUR HISTORY</span>
                    <ChevronRight className="ml-auto h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    className="justify-start py-3 hover:bg-gray-100 text-left"
                  >
                    <span className="font-medium">PLACE YOUR FEEDBACK</span>
                    <ChevronRight className="ml-auto h-5 w-5" />
                  </Button>

                  <Link href="/commercial/orders" className="w-full">
                    <Button
                      variant="ghost"
                      className="justify-start py-3 hover:bg-gray-100 text-left w-full"
                    >
                      <span className="font-medium">TRACKING YOUR ORDER</span>
                      <ChevronRight className="ml-auto h-5 w-5" />
                    </Button>
                  </Link>

                  {permission && (
                    <Button
                      variant="ghost"
                      className="justify-start py-3 hover:bg-gray-100 text-left"
                      onClick={() => router.push("/management/products")}
                    >
                      <span className="font-medium">MANAGE</span>
                      <ChevronRight className="ml-auto h-5 w-5" />
                    </Button>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-auto">
                  <Button
                    variant="ghost"
                    className="justify-start py-3 hover:bg-gray-100 text-left w-full text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    <span className="font-medium">LOGOUT</span>
                  </Button>

                  <div className="w-full border-t py-3 text-center text-xs text-gray-500">
                    © 2024 HISAKI COSMETIC. All rights reserved.
                  </div>
                </div>
              </DrawerContent>
            </SideDrawer>
          ) : (
            <Dialog open={openUser} onOpenChange={setOpenUser}>
              <DialogTrigger asChild>
                <button
                  className="p-1.5 rounded-full hover:bg-gray-100"
                  aria-label="User account"
                >
                  <Icons name="user" />
                </button>
              </DialogTrigger>
              <DialogContent className="w-[95%] sm:w-[450px] max-w-md max-h-[90vh] overflow-auto p-4 sm:p-6 rounded-md z-[500]">
                <DialogHeader className="flex justify-between items-center">
                  <DialogTitle className="text-2xl">LOGO</DialogTitle>
                  <DialogClose asChild>
                    <button
                      className="p-1.5 rounded-full hover:bg-gray-100"
                      aria-label="Close"
                    >
                      <X size={18} />
                    </button>
                  </DialogClose>
                </DialogHeader>

                <div className="mt-4">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">
                    WELCOME TO HISAKI COSMETIC
                  </h2>
                  <p className="text-gray-500 text-sm mb-6">
                    Get free shipping, discount vouchers and members only
                    products when you're in adiClub.
                  </p>

                  {watch("loginEmail") === "" ? (
                    <div className="space-y-4">
                      <div className="text-sm">
                        <span className="font-medium">Log in or </span>
                        <button
                          onClick={handleSignUp}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          sign up
                        </button>
                        <span> - it's free</span>
                      </div>

                      {signUp ? (
                        <div className="space-y-3">
                          <Input
                            type="text"
                            placeholder="NAME *"
                            {...register("name", { required: true })}
                          />
                          <Input
                            type="email"
                            placeholder="EMAIL ADDRESS *"
                            {...register("email", { required: true })}
                          />
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="PASSWORD *"
                              {...register("password", { required: true })}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              <Icon name="eye" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <GoogleButton />
                          <div className="relative mt-4">
                            <Input
                              type="email"
                              placeholder="EMAIL ADDRESS *"
                              {...register("email", { required: true })}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="PASSWORD *"
                          {...register("loginPassword", { required: true })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          <Icon name="eye" />
                        </button>
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full sm:w-auto mt-6 py-2.5 px-6 font-bold text-white bg-black hover:bg-gray-800"
                    onClick={handleContinue}
                  >
                    CONTINUE →
                  </Button>

                  <p className="mt-4 text-xs text-gray-500">
                    By clicking the "Continue" button, you are joining adiClub,
                    will receive emails with the latest news and updates, and
                    agree to the TERMS OF USE and ADICLUB TERMS AND CONDITIONS
                    and acknowledge you have read the ADIDAS PRIVACY POLICY.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          )}

          <ViewCartButton />

          {/* Mobile search button */}
          <button
            className="p-1.5 rounded-full hover:bg-gray-100 sm:hidden"
            onClick={toggleMobileSearch}
            aria-label="Search"
          >
            <Icons name="search" />
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b">
          <Navbar />
        </div>
      )}

      {/* Mobile search */}
      {mobileSearchOpen && (
        <div className="sm:hidden p-3 border-b">
          <div className="flex gap-2">
            <SearchInput />
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={toggleMobileSearch}
            >
              <X size={18} />
            </Button>
          </div>
        </div>
      )}

      <QuizDrawer />
    </header>
  );
}
