import { cn } from "@/lib/utils"
import Image from "next/image"
import Mobavenue_Logo from '@/public/Mobavenue_Logo.svg'
import NavMenu from "./NavMenu"
import NavUser from "./NavUser"
import { cookies } from "next/headers"

export const Navbar = async ({ className }: { className: string }) => {

    const EMAIL_ID = cookies().get('emailId')?.value || ''
    const ROLE_ID = cookies().get('roleId')?.value || ''
    const ACCOUNT_BALANCE = cookies().get('accountBalance')?.value || ''
    const customFeatures = cookies().get("customFeatures")?.value || ''

    return (
        <div className={cn("z-50 shadow-md dark:shadow-slate-600 dark:shadow-sm", className)}>
            <nav className="dark:bg-slate-950 dark:border-white flex items-center bg-white">
                <Image
                    src={Mobavenue_Logo}
                    width="0"
                    height="0"
                    alt="Mobavenue_logo"
                    priority
                    style={{ width: '10%', height: 'auto', marginLeft: '20px' }}
                />
                <NavMenu roleId={ROLE_ID} emailId={EMAIL_ID} customFeatures={customFeatures} />
                <NavUser emailId={EMAIL_ID} accountBalance={ACCOUNT_BALANCE} />
            </nav>
        </div>
    )
}