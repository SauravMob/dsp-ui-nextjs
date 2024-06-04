import { Navbar } from "@/components/layout/navbar/Navbar"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <div className="min-h-screen">
            <TooltipProvider>
                <Navbar className="top-0" />
                <div className="pb-5 pt-20 px-4">
                    {children}
                </div>
            </TooltipProvider>
            <div className="px-5 pb-5 gap-4 flex items-center text-sm">
                <a target="_blank" href="http://localhost:3000/privacy-policy" className="hover:font-bold">Privacy Policy</a>
                <a target="_blank" href="http://localhost:3000/ad-quality" className="hover:font-bold">Ad Quality</a>
            </div>
        </div>
    )
}
