import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'
import React, { useCallback, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CampaignFormType } from '../CampaignForm'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Download, X } from 'lucide-react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormatMultiSelectInput, MultiSelectInput, SelectInput } from '@/components/utility/customComponents/SelectInput'
import { fetchUserByRole } from '@/app/(authenticated)/(analyze)/actions'
import { groupedCategoryOptions } from '@/components/utility/utils/Utils'
import { getAllDeals } from '@/app/(authenticated)/(settings)/admin-tools/deals/actions'
import AppListTargeting from '../utils/AppListTargeting'
import { uploadFiles } from '../../../actions'
import { useDropzone } from 'react-dropzone'

export default function Inventory({
  form,
  isAdmin,
  next,
  prev,
  userCustomFeatures
}: {
  form: UseFormReturn<CampaignFormType, any, undefined>
  isAdmin: boolean
  next: () => Promise<void>
  prev: () => void,
  userCustomFeatures: string
}) {

  const router = useRouter()
  const { setValue, clearErrors } = form

  const [exchangeOptions, setExchangeOptions] = useState<{ value: string, label: string }[]>([])
  const [dealOptions, setDealOptions] = useState<{ value: string, label: string }[]>([])

  useEffect(() => {
    const fetchExchanges = async () => {
      const result = await fetchUserByRole("SSP")
      setExchangeOptions(result.map((v: { id: number, name: string }) => ({ value: v.name, label: v.name })))
    }
    fetchExchanges()
    const fetchDeals = async () => {
      const result = await getAllDeals({ pageNo: '0', pageSize: '512' })
      setDealOptions(result.content.map((v: PmpDealsType) => ({ value: v.name, label: v.name })))
    }
    if (userCustomFeatures.split(",").includes("DEAL")) fetchDeals()
  }, [])

  const adSlotDrop = useCallback(async (files: File[], rejected: { file: File, errors: { message: string }[] }[]) => {
    if (rejected.length > 0) {
      form.setError("adSlotFilePath", { message: rejected[0].errors[0].message })
    } else {
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('name', files[0].name)
      formData.append('type', files[0].type)
      formData.append('fileName', 'adslot')
      const result = await uploadFiles(formData)
      if (result.hasOwnProperty("url")) {
        setValue('adSlotFilePath', files[0].name)
        clearErrors("adSlotFilePath")
      }
    }
  }, [])

  const adSlotDropZone = useDropzone({
    onDrop: adSlotDrop,
    accept: { 'text/csv': ['.csv'] },
    maxSize: 10485760,
    maxFiles: 1
  })

  return (
    <Card className='p-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='border-r pr-4'>
          <FormField
            control={form.control}
            name="supplyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>Exchanges<span className='text-red-900'>*</span></FormLabel>
                <FormControl>
                  <MultiSelectInput
                    placeholder="Exchanges..."
                    isClearable={true}
                    isSearchable={true}
                    name="supplyType"
                    value={exchangeOptions.filter(v => field.value.includes(v.value))}
                    options={exchangeOptions}
                    onChange={(e) => {
                      setValue("supplyType", e ? e.map(v => v.value) : [])
                      clearErrors("supplyType")
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="iabCategoryId"
            render={({ field }) => (
              <FormItem className='mt-3'>
                <FormLabel className='font-bold'>Categories Targeting</FormLabel>
                <FormControl>
                  <FormatMultiSelectInput
                    placeholder="IAB Content Categories"
                    isClearable={true}
                    isSearchable={true}
                    name="iabCategoryId"
                    value={groupedCategoryOptions.flatMap(v => v.options).filter(v => form.watch("iabCategoryId").includes(v.value))}
                    options={groupedCategoryOptions}
                    onChange={(e) => {
                      setValue("iabCategoryId", e ? e.map(v => v.value) : [])
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dealId"
            render={({ field }) => (
              <FormItem className='mt-3'>
                <FormLabel className='font-bold'>Deal Id</FormLabel>
                <FormControl>
                  <SelectInput
                    placeholder="Deals..."
                    isClearable={true}
                    isSearchable={true}
                    name="dealId"
                    value={dealOptions.filter(v => v.value === field.value)[0]}
                    options={dealOptions}
                    onChange={(e) => setValue("dealId", e ? e.value : "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <AppListTargeting form={form} />
          <FormField
            control={form.control}
            name="adSlotFilePath"
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel className='flex justify-between'>
                  <div className='font-bold'>Ad Slot</div>
                  <div>
                    <a href='/adslot_targeting_sample.csv' download className='text-[14px] flex justify-end'><Download className='opacity-70 mr-2' size={18} />Download Sample File</a>
                  </div>
                </FormLabel>
                <FormControl>
                  <>
                    <Card {...adSlotDropZone.getRootProps()} className='p-4'>
                      <input {...adSlotDropZone.getInputProps()} />
                      {<div className='opacity-80 text-sm cursor-pointer'>{form.getValues("adSlotFilePath") ? form.getValues("adSlotFilePath") : <>
                        <p>Default radius distance covered for these coordinates is 2 km.</p>
                        <div className='border p-5 mt-3 rounded-lg min-h-10 flex flex-col justify-center items-center'>
                          <div>
                            Drop .CSV file or <Button type="button">Browse</Button>
                          </div>
                          <div className='mt-1'>
                            Max file size 10 MB
                          </div>
                        </div>
                      </>}
                      </div>}
                    </Card>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
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
