import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Mobavenue_Logo from '@/public/Mobavenue_Logo.svg'
import Image from 'next/image'
import SignUpForm from "./helpers/SignUpForm"

export default async function page() {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <Card className="w-[500px]">
                <CardHeader>
                    <CardTitle className='flex justify-center'>
                        <Image
                            src={Mobavenue_Logo}
                            width={150}
                            height={150}
                            alt="Mobavenue_logo"
                            priority
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
