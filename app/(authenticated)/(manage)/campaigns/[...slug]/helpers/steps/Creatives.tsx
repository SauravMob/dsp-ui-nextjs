import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CampaignFormType } from '../CampaignForm'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Camera, X, XCircle } from 'lucide-react'
import ExistingCreativesModal from '../utils/ExistingCreativesModal'
import ThumbnailGenerator from '@/app/(authenticated)/(assets)/creatives/[...slug]/helpers/creativeUtils/ThumbnailGenerator'
import { HtmlSanitized } from '@/components/utility/utils/JSXUtils'
import { deleteAttachedCampaigns } from '../../../actions'
import { toast } from '@/components/ui/use-toast'
import CreativeOptionsDialog from '@/app/(authenticated)/(assets)/creatives/[...slug]/helpers/modals/CreativeOptionsDialog'

export default function Creatives({
  form,
  isAdmin,
  next,
  prev
}: {
  form: UseFormReturn<CampaignFormType, any, undefined>
  isAdmin: boolean
  next: () => Promise<void>
  prev: () => void
}) {

  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)

  const { setValue, getValues, clearErrors, formState: { errors } } = form

  const removeCreative = async (cr: CreativeType) => {
    const result = await deleteAttachedCampaigns(getValues("id"), cr.id)
    if (result?.status === 200) {
      setValue("creativeId", form.watch("creativeId").filter(v => v.id !== cr.id))
      toast({ title: `Created detached`, description: `Creative removed successfully` })
    } else toast({ title: `Error while detaching creative`, description: `Couldn't remove creative` })
  }

  const creativeCampaign = async (cr: CreativeType[]) => {
    setValue("creativeId", [...form.watch("creativeId"), ...cr])
    clearErrors("creativeId")
  }

  return (
    <Card className='p-10'>
      {errors.creativeId && <div className='text-red-500'>{errors?.creativeId.message}</div>}
      <div className='flex gap-5 justify-center mb-10'>
        <ExistingCreativesModal open={open} setOpen={setOpen} form={form} />
        <CreativeOptionsDialog
          triggerComponent={<Button type='button'>
            <Camera size={17} className='mr-2' /> Create A New Creative
          </Button>}
          bannerLink="#"
          richmediaLink="#"
          videoLink="#"
          userId={form.getValues("userId")}
          creativeCampaign={creativeCampaign}
        />
      </div>
      {form.watch("creativeId").length === 0 ? <div className='m-5 justify-center items-center'>
        <div className='text-lg text-center'>It’s time to get creative!</div>
        <div className='text-lg text-center'>Create a new creative or select creatives from the library to get the campaign going</div>
      </div> : <div className='flex flex-row'>
        {getValues("creativeId").map(cr => (
          <div key={cr.id}>
            <span className='m-3 w-44 h-44 p-1 flex items-center justify-center bg-slate-200 dark:bg-slate-800 relative cursor-pointer' onClick={() => removeCreative(cr)}>
              {cr.creativeType === "BANNER" ? <>
                <img src={cr.creativePath as string} alt={cr.adName} className='object-contain max-h-full max-w-full opacity-50' />
              </> : cr.creativeType === "VIDEO" ? <>
                <ThumbnailGenerator videoFile={""} className='object-contain max-h-full max-w-full opacity-50' />
              </> : <div className="object-contain max-h-full w-full">
                <HtmlSanitized html={cr.rmaContent as string} />
              </div>}
              <div className="absolute inset-0 flex justify-center items-center">
                <XCircle size={34} />
              </div>
            </span>
            <div>{cr.adName}</div>
            <div>{cr.creativeSize}</div>
          </div>
        ))}
      </div>}
      <CardFooter className='flex items-center justify-between mt-5 p-0'>
        <Button type='button' onClick={() => router.push(isAdmin ? '/campaign-manager' : '/campaigns')}><X size={14} className='mr-2' /> CANCEL</Button>
        <div className='flex gap-2'>
          <Button type='button' onClick={() => prev()}><ArrowLeft size={14} className='mr-1' /> PREVIOUS</Button>
          <Button type='button' onClick={() => next()}>NEXT<ArrowRight size={14} className='ml-1' /></Button>
        </div>
      </CardFooter>
    </Card>
  )
}
