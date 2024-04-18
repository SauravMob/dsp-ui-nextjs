"use client"

import React, { useEffect } from 'react'
import { SignupFormData, formSchema } from '../types/SignupTypes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ReCAPTCHA from "react-google-recaptcha";
import { countryOption } from '@/components/utility/GeoUtils'
import { SelectInput } from '@/components/utility/SelectInput'
import { registerUser } from '../../_actions'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const SignUpForm = () => {

  const router = useRouter()
  const form = useForm<SignupFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      company: "",
      phone: "",
      country: "",
      captchaToken: "",
      organizationId: 1
    },
  })

  useEffect(() => {
    setValue('organizationId', window.location.hostname === 'lyxelflamingo.mobavenue.com' ? 2 : 1)
  }, [])

  const { clearErrors, setValue } = form
  const { isSubmitting } = form.formState

  const onSubmit: SubmitHandler<SignupFormData> = async (values: SignupFormData) => {
    const result = await registerUser(values)
    if (result.status === 400) {
      toast({
        title: "Error while creating account",
        description: result.message
      })
    } else if (result.status === 201) router.push('/')
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
              </FormLabel>
              <FormControl>
                <div className='flex justify-center items-center'>
                  <Input placeholder="********" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex justify-between'>
                <div>Company<span className='text-red-900'>*</span></div>
              </FormLabel>
              <FormControl>
                <div className='flex justify-center items-center'>
                  <Input placeholder="Company" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex justify-between'>
                <div>Phone number<span className='text-red-900'>*</span></div>
              </FormLabel>
              <FormControl>
                <div className='flex justify-center items-center'>
                  <Input placeholder="Phone No." {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex justify-between'>
                <div>Country<span className='text-red-900'>*</span></div>
              </FormLabel>
              <FormControl>
                <div className='flex justify-center items-center'>
                  <SelectInput
                    placeholder="Country"
                    isClearable={true}
                    isSearchable={true}
                    name="country"
                    options={countryOption}
                    onChange={(value) => {
                      setValue('country', value ? value.value : '')
                      clearErrors('country')
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="captchaToken"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex justify-center items-center'>
                  <ReCAPTCHA
                    sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
                    onChange={(value) => {
                      if (value) setValue('captchaToken', value)
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full' loading={isSubmitting}>SIGN UP</Button>
        <div className='text-xs text-wrap text-center'>
          By clicking Sign Up, I hereby indicate that I have read, understood, and agree to the
          <Button className='bg-transparent text-black-900 font-medium mx-0 px-1' variant={"link"} size="sm">Terms and conditions</Button>
          of Mobavenue Advertiser Agreement.
          <br />
          Already have an account? <Link href={'/login'} className='font-bold ml-1'>Sign in</Link>
        </div>
      </form>
    </Form>
  )
}

export default SignUpForm