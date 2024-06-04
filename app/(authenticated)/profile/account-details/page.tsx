import React, { useEffect, useState } from 'react'
import { fetchUserAccDetail } from '../actions'
import AccDetailsForm from './helpers/AccDetailsForm'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { User2 } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Mobavenue | Account Details",
  description: "Mobavenue DSP account details"
}

export default async function page() {
  const user = await fetchUserAccDetail()

  return (
    <>
      <Card className='mt-4'>
        <CardHeader>
          <div className='flex text-lg font-bold'>
            <User2 size={24} className='mr-2' />Account Details
          </div>
        </CardHeader>
        <CardContent>
          <AccDetailsForm user={user} />
        </CardContent>
      </Card>
    </>
  )
}
