"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { z } from "zod"
import { loginUser } from '../_actions'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  username: z.string().min(1, { message: "Required Field!" }).email("Email is invalid"),
  password: z.string().min(1, { message: "Required Field!" }).min(5, { message: "Password length should be atleast 5" })
})

type Inputs = z.infer<typeof formSchema>

const LoginForm = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  const { setError } = form
  const { isSubmitting } = form.formState

  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    const result = await loginUser(values)
    if (result.status === 401) setError('password', { message: result.message })
    else router.push('/')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          control={form.control}
          name="username"
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
        <Button type="submit" className='w-full' loading={isSubmitting}>Sign In</Button>
        <div className='flex justify-center'>
          New on our platform?
          <Link href={'/signup'} className='font-bold ml-1'>Create an account</Link>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm