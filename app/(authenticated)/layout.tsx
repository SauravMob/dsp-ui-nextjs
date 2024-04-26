import { Navbar } from "@/components/layout/navbar/Navbar"
import { Button } from "@/components/ui/button"
// import PrivacyPolicy from '@/app/(authenticated)/helpers/PrivacyPolicy'

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <div className="min-h-screen">
            <Navbar className="top-0" />
            <div className="pb-5 pt-24 px-4">
                {children}
            </div>
            {/* <div className="flex items-center   ">
                <PrivacyPolicy />
                |
                <Button className='bg-transparent font-medium mx-3 px-1' variant={"link"} size="sm">Ad Policy</Button>
            </div> */}
        </div>
    )
}
