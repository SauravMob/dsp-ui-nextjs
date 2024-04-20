import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Mobavenue_Logo from '@/public/Mobavenue_Logo.svg'
import Image from 'next/image'
import LoginForm from "./helpers/LoginForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Mobavenue - Login",
    description: "Mobavenue DSP login page"
}

export default async function page() {
    return (
        <div className="min-h-screen flex justify-center items-center dark:bg-slate-950">
            <Card>
                <CardHeader>
                    <CardTitle className='flex justify-center'>
                        <Image
                            src={Mobavenue_Logo}
                            width="0"
                            height="0"
                            alt="Mobavenue_logo"
                            priority
                            style={{ width: '50%', height: 'auto' }}
                        />
                    </CardTitle>
                    <CardDescription className='flex justify-center'>Please sign-in to your account and start advertising!</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    )
}
