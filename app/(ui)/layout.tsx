import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const emailId: string | undefined = cookies().get('emailId')?.value;
    return (
        <div>
            <Navbar className="top-0" emailId={emailId} />
            {children}
        </div>
    );
}
