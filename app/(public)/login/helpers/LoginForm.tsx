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
import { loginUser } from '../../actions'
import { LoginFormData, formSchema } from '../types/LoginTypes'
import { toast } from '@/components/ui/use-toast'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  const { isSubmitting } = form.formState

  const onSubmit: SubmitHandler<LoginFormData> = async (values: LoginFormData) => {
    const result = await loginUser(values)
    if (result?.status === 401) {
      toast({
        title: "Error while logging in",
        description: result.message
      })
    } else {
      toast({
        title: `Welcome back ${values.username}`,
        description: "Successfully logged in"
      })
    }
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
                  <Input type={showPassword ? "text" : "password"} placeholder="********" autoComplete="off" {...field} />
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
        <Button type="submit" className='w-full' loading={isSubmitting}>SIGN IN</Button>
        <div className='flex justify-center text-xs'>
          New on our platform?
          <Link href={'/signup'} className='font-bold ml-1'>Create an account</Link>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm