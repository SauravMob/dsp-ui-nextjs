import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Mobavenue_Logo from '@/public/Mobavenue_Logo.svg'
import Image from 'next/image'
import SignUpForm from "./helpers/SignUpForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Mobavenue - Sign Up",
    description: "Mobavenue DSP signup page"
}

export default async function page() {
    return (
        <div className="min-h-screen flex justify-center items-center dark:bg-slate-950">
            <Card className="w-[500px]">
                <CardHeader>
                    <CardTitle className='flex justify-center'>
                        <Image
                            src={Mobavenue_Logo}
                            alt="Mobavenue_logo"
                            priority
                            style={{ width: '40%', height: 'auto' }}
                        />
                    </CardTitle>
                    <CardDescription className='flex justify-center'>Please sign-in to your account and start advertising!</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignUpForm />
                </CardContent>
            </Card>
        </div>
    )
}
