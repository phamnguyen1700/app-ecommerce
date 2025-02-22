"use client";
import { SearchInput } from "../common/searchInput";
import Icons from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import GoogleButton from "../common/googleButton";
import {
  Drawer as SideDrawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/common/sideDrawer";
export default function Header() {
  const [openUser, setOpenUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <header className="w-full">
      <div className="w-full h-7 py-1 font-semibold bg-black text-white text-center text-xs">
        KHUYẾN MÃI THÊM Ở ĐÂY
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
        <div className="flex justify-center">
          <Button className="font-bold" variant="link">
            Home
          </Button>
          <Button className="font-bold" variant="link">
            Products
          </Button>
          <Button className="font-bold" variant="link">
            Catalog
          </Button>
        </div>
        <div className="flex justify-end gap-5">
          <SearchInput />

          {loggedIn ? (
            <SideDrawer direction="right">
              <DrawerTrigger asChild>
                <Icons name="user" />
              </DrawerTrigger>
              <DrawerContent className="w-1/5 h-full rounded-none">
                <DrawerTitle className="text-center text-lg font-semibold pt-2 pb-6 bg-gray-200 border border-b-gray-300">
                  HI NGUYỄN
                  <img
                    src="https://tse1.mm.bing.net/th?id=OIP.lfFFYzOkuCbucHfsStxd4QHaJQ&pid=Api&P=0&h=220"
                    className="justify-self-center p-2 rounded-full w-40 h-40"
                  />
                </DrawerTitle>
                <div className="container flex-col gap-3 mt-4 flex-grow">
                  <Button
                    variant="link"
                    className="hover:bg-black hover:text-white"
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
                  <Button
                    variant="link"
                    className="hover:bg-black hover:text-white"
                  >
                    <b className="text-sm">TRACKING YOUR ORDER →</b>
                  </Button>
                </div>
                {/* Footer */}
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
              <DialogContent className="w-full max-w-96 max-h-[70vh] overflow-scroll p-6 rounded-none">
                <DialogTitle className="text-2xl">LOGO</DialogTitle>
                <b className="text-3xl">WELCOME TO HISAKI COSMETIC</b>
                <div className="font-thin text-gray-400 text-xs">
                  Get free shipping, discount vouchers and members only products
                  when you’re in adiClub.
                </div>
                <b className="text-xs">Log in or sign up - it&apos;s free</b>
                <div className="flex-col">
                  <GoogleButton />
                  <Input
                    type="email"
                    placeholder="EMAIL ADDRESS *"
                    className="mt-2"
                  />
                </div>

                <div className="flex items-center">
                  <Checkbox />
                  <label htmlFor="keep-logged-in" className="text-sm ml-2">
                    Keep me logged in.
                  </label>
                </div>
                <Button className="w-1/3 py-3 font-bold text-white bg-black hover:text-gray-300">
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

          <Icons name="shoppingBag"></Icons>
        </div>
      </div>
    </header>
  );
}
