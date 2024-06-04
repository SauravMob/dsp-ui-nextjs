import { Card, CardFooter } from '@/components/ui/card'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CampaignFormType } from '../CampaignForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Edit2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Review({
  form,
  next,
  prev,
  isAdmin,
  isEdit
}: {
  form: UseFormReturn<CampaignFormType, any, undefined>
  next: () => Promise<void>
  isAdmin: boolean
  prev: () => void
  isEdit: boolean
}) {

  const { getValues } = form
  const router = useRouter()
  const errorList = Object.keys(form.formState.errors).map((key) => {
    const error = form.formState.errors[key as keyof typeof form.formState.errors]
    return error ? error.message : null
  })

  return (
    <Card className='p-4'>
      {errorList.map((v, k) => <div key={k} className='text-red-500'>{v}</div>)}
      <div className='p-6 bg-slate-100 dark:bg-slate-800 grid grid-cols-2 gap-4 mt-2'>
        <div>
          <div className='grid grid-cols-2 gap-4 my-2'>
            <div>Campaign Name:</div>
            <div>{getValues("campaignName")}</div>
          </div>
          <div className='grid grid-cols-2 gap-4 my-2'>
            <div>Channel Type:</div>
            <div>{getValues("sourceType")}</div>
          </div>
          <div className='grid grid-cols-2 gap-4 my-2'>
            <div>Exchanges:</div>
            <div>{getValues("supplyType")}</div>
          </div>
          <div className='grid grid-cols-2 gap-4 my-2'>
            <div>Optimization Type:</div>
            <div>{getValues("costMetrics")}</div>
          </div>
          <div className='grid grid-cols-2 gap-4 my-2'>
            <div>Bid Price:</div>
            <div>{getValues("bidPrice")}</div>
          </div>
          <div className='grid grid-cols-2 gap-4 my-2'>
            <div>Deal:</div>
            <div>-</div>
          </div>
          <div className='grid grid-cols-2 gap-4 my-2'>
            <div>DMP Partner:</div>
            <div>{'-'}</div>
          </div>
        </div>
        <div>
          <div className='grid grid-cols-2 gap-4 my-2'>
            <div>Ad Medium:</div>
            <div>{getValues("adMedium")}</div>
          </div>
          <div className='grid grid-cols-2 gap-4 my-2'>
            <div>Daily Budget:</div>
            <div>{getValues("budgetPerDay")}</div>
          </div>
          <div className='grid grid-cols-2 gap-4 my-2'>
            <div>Countries:</div>
            <div>{getValues("countries")}</div>
          </div>
          <div className='grid grid-cols-2 gap-4 my-2'>
            <div>Total Budget:</div>
            <div>{getValues("maxBudget")}</div>
          </div>
          <div className='grid grid-cols-2 gap-4 my-2'>
            <div>Connection Type:</div>
            <div>{getValues("connectionType")}</div>
          </div>
          <div className='grid grid-cols-2 gap-4 my-2'>
            <div>Platforms:</div>
            <div>{getValues("platforms")}</div>
          </div>
          <div className='grid grid-cols-2 gap-4 my-2'>
            <div>Device Manufacturers:</div>
            <div>{getValues("deviceManufacturer") || '-'}</div>
          </div>
        </div>
      </div>
      <CardFooter className='flex items-center justify-between mt-5 p-0'>
        <Button type='button' onClick={() => router.push(isAdmin ? '/campaign-manager' : '/campaigns')}><X size={14} className='mr-2' /> CANCEL</Button>
        <div className='flex gap-2'>
          <Button type='button' onClick={() => prev()}><ArrowLeft size={14} className='mr-1' /> PREVIOUS</Button>
          <Button type='button' onClick={() => next()}>{isEdit ? "UPDATE" : "CREATE"}<Edit2 size={14} className='ml-1' /></Button>
        </div>
      </CardFooter>
    </Card>
  )
}
