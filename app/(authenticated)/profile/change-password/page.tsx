import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Metadata } from 'next'
import React from 'react'
import { MdPassword } from 'react-icons/md'
import ChangePasswordForm from './helpers/ChangePasswordForm'

export const metadata: Metadata = {
  title: "Mobavenue | Change Password",
  description: "Mobavenue DSP change password"
}

export default function page() {

  return (
    <>
      <Card className='mt-4'>
        <CardHeader>
          <div className='flex text-lg font-bold'>
            <MdPassword size={24} className='mr-2' />Change Password
          </div>
        </CardHeader>
        <CardContent className='min-h-[500px]'>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </>
  )
}
