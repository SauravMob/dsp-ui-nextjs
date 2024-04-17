"use client"

import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Mobavenue_Logo from '@/public/Mobavenue_Logo.svg'
import Image from 'next/image'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

const formSchema = z.object({
    email: z.string().min(1, { message: "Required Field!" }).email("Email is invalid"),
    password: z.string().min(1, { message: "Required Field!" }).min(5, { message: "Password length should be atleast 5" })
})

export default function page() {

    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <Card className="">
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
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email<span className='text-red-900'>*</span></FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex justify-between'>
                                            <div>Password<span className='text-red-900'>*</span></div>
                                            <Link href={'/forgot-password'} className='text-xs'>Forgot Password?</Link>
                                        </FormLabel>
                                        <FormControl>
                                            <div className='flex justify-center items-center'>
                                                <Input type={showPassword ? "text" : "password"} placeholder="********" {...field} />
                                                {!showPassword ? <Eye className='ml-2' onClick={() => setShowPassword(true)} /> : <EyeOff className='ml-2' onClick={() => setShowPassword(false)} />}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center space-x-2">
                                <Switch id="remember-me" />
                                <Label htmlFor="remember-me">Remember Me</Label>
                            </div>
                            <Button type="submit" className='w-full'>Sign In</Button>
                            <div className='flex justify-center'>
                                New on our platform?
                                <Link href={'/signup'} className='font-bold ml-1'>Create an account</Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
