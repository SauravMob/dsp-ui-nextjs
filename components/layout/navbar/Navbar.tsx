import { cn } from "@/lib/utils";
import Image from "next/image";
import Mobavenue_Logo from '@/public/Mobavenue_Logo.svg';
import NavMenu from "./NavMenu";
import NavUser from "./NavUser";
import { cookies } from "next/headers";

export const Navbar = ({ className }: { className: string }) => {

    const emailId: string | undefined = cookies().get('emailId')?.value || ''
    const roleId: string | undefined = cookies().get('roleId')?.value || ''

    return (
        <div className={cn("fixed top-10 inset-x-0 w-full mx-auto z-50", className)}>
            <nav className="relative boder border-transparent dark:bg-black dark:border-white/[0.2] flex items-center bg-white shadow-input">
                <Image
                    className="ml-8"
                    src={Mobavenue_Logo}
                    width={120}
                    height={120}
                    alt="Mobavenue_logo"
                />
                <NavMenu roleId={roleId} />
                <NavUser emailId={emailId} />
            </nav>
        </div>
    );
}