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
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Drawer as SideDrawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/common/sideDrawer";
import Icon from "@/components/common/icon";
import { useDispatch } from "react-redux";
import { loginThunk, refreshTokenThunk, registerThunk } from "@/redux/thunks/Auth";
import { AppDispatch } from "@/redux/store";
import Navbar from "@/components/layout/nav/commercialNav";
import Image from "next/image";
import { useForm } from "react-hook-form";
import ViewCartButton from "../common/viewCartButton";
import Link from "next/link";
import QuizDrawer from "../common/quiz";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IReg } from "@/typings/auth";

export default function Header() {
  const router = useRouter();
  const [permission, setPermission] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [openUser, setOpenUser] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const { register, setValue, watch, reset, handleSubmit } = useForm({
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
        console.log("Permission granted");
      }
    }

    if (loggedIn === null) {
      const token = localStorage.getItem("accessToken");
      setLoggedIn(token);
    }
    if (openUser) {
      reset();
    }
  }, [loggedIn, openUser, dispatch, reset]);

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

  const handleContinue = async (data: IReg) => {
    if (signUp) {
      try {
         await dispatch(
          registerThunk({
            name: data.name,
            email: data.email,
            password: data.password,
          })
        ).unwrap();
  
        toast.success("Đăng ký thành công!");
        setSignUp(false); // Chuyển về màn hình đăng nhập
        reset();
      } catch  {
        toast.error( "Đăng ký thất bại!");
      }
    } else {
      // Xử lý đăng nhập
      if (step === "email") {
        setValue("loginEmail", watch("email"));
        setStep("password");
      } else if (step === "password") {
        try {
          await dispatch(
            loginThunk({
              email: watch("loginEmail"),
              password: watch("loginPassword"),
            })
          ).unwrap();
  
          setOpenUser(false);
          reset();
          setTimeout(() => {
            window.location.reload(); // Reload trang sau khi đăng nhập thành công
          }, 1500); // Chờ 1.5 giây để người dùng thấy thông báo trước khi reload
        } catch  {
          toast.error( "Đăng nhập thất bại!");
        }
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <header className="w-full sticky top-0 bg-white shadow-md z-[400]">
      <div className="w-full h-7 pt-1.5 font-semibold bg-black text-white text-center text-xs">
        GIẢM GIÁ ĐẾN 10% CHO KHÁCH HÀNG THÂN THIẾT
      </div>
      <div className="h-3">
        <div className="flex justify-end -space-x-0.5 ">
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
      <div className="grid grid-cols-3 items-center pt-3 px-8 border-b">
        <div className="flex justify-start">LOGO</div>
        <Navbar />
        <div className="flex justify-end gap-5">
          <SearchInput />

          {loggedIn ? (
            <SideDrawer direction="right">
              <DrawerTrigger asChild>
                <Icons name="user" className=" cursor-pointer" />
              </DrawerTrigger>
              <DrawerContent className="w-1/5 h-full rounded-none z-[500]">
                <DrawerTitle className="text-center text-lg font-semibold pt-2 pb-6 bg-gray-200 border border-b-gray-300">
                  HI NGUYỄN
                  <Image
                    src="/assets/pictures/image.png"
                    alt="User Avatar"
                    width={160}
                    height={160}
                    className="justify-self-center p-2 rounded-full"
                  />
                </DrawerTitle>
                <div className="container flex-col gap-3 mt-4 flex-grow">
                  <Button
                    variant="link"
                    className="hover:bg-black hover:text-white"
                    onClick={() => router.push("/commercial/profile")}
                  >
                    <b className="text-sm">VISIT YOUR ACCOUNT →</b>
                  </Button>
                  <Button
                    variant="link"
                    className="hover:bg-black hover:text-white"
                  >
                    <b className="text-sm">VIEW YOUR HISTORY →</b>
                  </Button>
                  <Button
                    variant="link"
                    className="hover:bg-black hover:text-white"
                  >
                    <b className="text-sm">PLACE YOUR FEEDBACK →</b>
                  </Button>
                  <Link href="/commercial/orders">
                    <Button
                      variant="link"
                      className="hover:bg-black hover:text-white"
                    >
                      <b className="text-sm">TRACKING YOUR ORDER →</b>
                    </Button>
                  </Link>
                </div>
                {permission && (
                  <Button
                    variant="link"
                    className="hover:bg-black hover:text-white"
                    onClick={() => router.push("/management/products")}
                  >
                    <b className="text-sm">MANAGE</b>
                  </Button>
                )}
                {/* Footer */}
                <Button
                  variant="link"
                  className="hover:bg-black hover:text-white"
                  onClick={handleLogout}
                >
                  <b className="text-sm">LOGOUT</b>
                </Button>
                <div className="w-full border-t py-3 text-center text-xs text-gray-500">
                  © 2024 HISAKI COSMETIC. All rights reserved.
                </div>
              </DrawerContent>
            </SideDrawer>
          ) : (
            <Dialog open={openUser} onOpenChange={setOpenUser}>
              <DialogTrigger asChild>
                <Icons name="user" onClick={() => setOpenUser(true)} />
              </DialogTrigger>
              <DialogContent className="w-full max-w-96 max-h-[70vh] overflow-scroll p-6 rounded-none z-[500]">
                <DialogHeader>
                  <DialogTitle className="text-2xl">LOGO</DialogTitle>
                </DialogHeader>
                <b className="text-3xl">WELCOME TO HISAKI COSMETIC</b>
                <div className="font-thin text-gray-400 text-xs">
                  Get free shipping, discount vouchers and members only products
                  when you’re in adiClub.
                </div>

                {watch("loginEmail") === "" ? (
                  <div>
                    <b className="text-xs">
                      Log in or{" "}
                      <span
                        onClick={handleSignUp}
                        className="hover:font-bold hover:underline cursor-pointer transition-all duration-200"
                      >
                        sign up
                      </span>{" "}
                      - it&apos;s free
                    </b>

                    {signUp === true ? (
                      <div className="flex-col">
                        <Input
                          type="text"
                          placeholder="NAME *"
                          className="mt-2"
                          {...register("name", { required: true })}
                        />
                        <Input
                          type="email"
                          placeholder="EMAIL ADDRESS *"
                          className="mt-2"
                          {...register("email", { required: true })}
                        />
                        <div className="w-full justify-items-end ">
                          {showPassword ? (
                            <div className="flex justify-end">
                              <Button
                                className="font-semibold text-gray-600 hover:text-black "
                                variant="link"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <Icon name="eye" />
                                Show
                              </Button>
                            </div>
                          ) : (
                            <div className="flex justify-end">
                              <Button
                                className="font-semibold text-gray-600 hover:text-black "
                                variant="link"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <Icon name="eye" />
                                Hide
                              </Button>
                            </div>
                          )}
                        </div>
                        <Input
                          type={showPassword ? "password" : "text"}
                          placeholder="Password *"
                          {...register("password", { required: true })}
                        />
                      </div>
                    ) : (
                      <div className="flex-col">
                        <Input
                          type="email"
                          placeholder="EMAIL ADDRESS *"
                          className="mt-2"
                          {...register("email", { required: true })}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="w-full justify-items-end ">
                      {showPassword ? (
                        <div className="flex justify-end">
                          <Button
                            className="font-semibold text-gray-600 hover:text-black "
                            variant="link"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon name="eye" />
                            Show
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-end">
                          <Button
                            className="font-semibold text-gray-600 hover:text-black "
                            variant="link"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon name="eye" />
                            Hide
                          </Button>
                        </div>
                      )}
                    </div>

                    <Input
                      type={showPassword ? "password" : "text"}
                      placeholder="Password *"
                      {...register("loginPassword", { required: true })}
                    />
                  </div>
                )}
                <Button
                  className="w-1/3 py-3 font-bold text-white bg-black hover:text-gray-300"
                  onClick={handleSubmit(handleContinue)}
                >
                  CONTINUE →
                </Button>
                <div className="font-light text-gray-400 text-xs">
                  By clicking the “Continue” button, you are joining adiClub,
                  will receive emails with the latest news and updates, and
                  agree to the TERMS OF USE and ADICLUB TERMS AND CONDITIONS and
                  acknowledge you have read the ADIDAS PRIVACY POLICY. If you
                  are a California resident, the adiClub membership may be
                  considered a financial incentive. Please see the Financial
                  Incentives section of our CALIFORNIA PRIVACY NOTICE for
                  details.
                </div>
              </DialogContent>
            </Dialog>
          )}

          <ViewCartButton />
        </div>
      </div>
      <QuizDrawer />
    </header>
  );
}
