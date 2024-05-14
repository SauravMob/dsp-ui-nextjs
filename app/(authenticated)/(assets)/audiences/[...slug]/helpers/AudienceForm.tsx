"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SelectInput } from '@/components/utility/customComponents/SelectInput'
import { dataWindowOptions, statusWithoutInactiveOptions, uploadTypeOptions } from '@/components/utility/utils/Utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import ManualForm from './ManualForm'
import MMPForm from './MMPForm'
import { createAudience, getAudienceEventCount, updateAudience } from '../../actions'
import { toast } from '@/components/ui/use-toast'

export type AudienceFormData = AudienceType & {
  event: string
  contain: string
}

export default function AudienceForm({
  isEdit,
  editData,
  userId,
  isAdmin
}: {
  isEdit: boolean
  editData: AudienceType
  userId: number
  isAdmin: boolean
}) {

  const router = useRouter()

  const customUploadTypeOptions = isAdmin ? isEdit && editData.uploadType !== "internal" ? uploadTypeOptions.filter(v => v.value !== 'internal') : uploadTypeOptions.filter(v => v.value === 'internal') : uploadTypeOptions.filter(v => v.value !== 'internal' && v.value !== 'integrated_audience')
  const customDaysOptions = isAdmin ? dataWindowOptions.filter(v => v.value === '1' || v.value === '3' || v.value === '7') : []

  const formSchema = z.object({
    id: z.coerce.number(),
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    uploadType: z.string(),
    dmpPartner: z.string(),
    filename: z.string(),
    mmp: z.string(),
    bundle: z.string(),
    days: z.coerce.number(),
    rules: z.string(),
    reengageInterval: z.coerce.number(),
    status: z.string(),
    audienceCount: z.coerce.number(),
    clkInterval: z.string(),
    isClkProcessing: z.string(),
    clickUrl: z.string(),
    userId: z.number()
  }).refine((data) => {
    if (data.uploadType === "mmp" && !data.rules) return false
    return true
  }, {
    message: "Rules are required for MMP",
    path: ["mmp"]
  }).refine((data) => {
    if (data.uploadType === "manual" && !data.filename) return false
    return true
  }, {
    message: "File is required for Manual Upload",
    path: ["filename"]
  }).refine((data) => {
    if (data.isClkProcessing === "1" && !data.clickUrl) return false
    return true
  }, {
    message: "Click URL is required",
    path: ["clickUrl"]
  })

  const form = useForm<AudienceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: isEdit ? editData.id : 0,
      name: isEdit ? editData.name : "",
      description: isEdit ? editData.description : "",
      uploadType: isEdit ? editData.uploadType : !isAdmin ? "manual" : "internal",
      status: isEdit ? editData.status : "ACTIVE",
      dmpPartner: isEdit ? editData.dmpPartner : "MOBAVENUE",
      mmp: isEdit ? editData.mmp : "",
      bundle: isEdit ? editData.bundle : "",
      event: "",
      days: isEdit ? editData.days : 3,
      reengageInterval: isEdit ? editData.reengageInterval : 0,
      rules: isEdit ? editData.rules : '',
      filename: isEdit ? editData.filename : "",
      audienceCount: 0,
      clkInterval: isEdit ? editData.clkInterval ? editData.clkInterval : "" : "",
      isClkProcessing: isEdit ? editData.isClkProcessing : "0",
      clickUrl: isEdit ? editData.clickUrl : "",
      userId: isEdit ? editData.userId : userId
    }
  })

  const { setValue, watch } = form
  const { isSubmitting } = form.formState

  useEffect(() => {
    const fechCount = async () => {
      const result = await getAudienceEventCount(watch("id").toString(), watch("bundle"), watch("days").toString(), watch("mmp"), watch("rules"))
      setValue("audienceCount", result.eventCount)
    }
    if (watch("rules") && watch("bundle") && watch("mmp") && watch("days")) fechCount()
  }, [watch("rules"), watch("bundle"), watch("mmp"), watch("days")])

  const onSubmit: SubmitHandler<AudienceFormData> = async (values: AudienceFormData) => {
    const submitValues: AudienceType = { ...values }
    const result = isEdit ? await updateAudience(editData.id, submitValues) : await createAudience(submitValues)
    if (result?.status === 200) {
      router.push("/audiences")
      toast({ title: `${isEdit ? "Updated" : "Created"} audience`, description: `Audience ${isEdit ? "updated" : "created"} ${values.name} successfully` })
    } else toast({ title: `Error while ${isEdit ? "updating" : "creating"} audience`, description: `Couldn't ${isEdit ? "update" : "create"} ${values.name} audience` })
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className='grid grid-cols-4 gap-4'>
          <div className='col-span-3 space-y-2'>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name<span className='text-red-900'>*</span></FormLabel>
                  <FormControl>
                    <Input placeholder='Audience Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description<span className='text-red-900'>*</span></FormLabel>
                  <FormControl>
                    <Input placeholder='Audience Description' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="uploadType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Type</FormLabel>
                  <FormControl>
                    <SelectInput
                      placeholder='Upload Type'
                      id="uploadType"
                      name="uploadType"
                      value={customUploadTypeOptions.filter(v => v.value === field.value)[0]}
                      options={customUploadTypeOptions}
                      onChange={(value) => setValue('uploadType', value ? value.value : '')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {watch('uploadType') === 'manual' ? <ManualForm isAdmin={isAdmin} form={form} /> : watch("uploadType") === "mmp" ? <MMPForm editData={editData} isEdit={isEdit} form={form} /> : <></>}
            {watch("uploadType") === "internal" && (
              <FormField
                control={form.control}
                name="days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Window</FormLabel>
                    <FormControl>
                      <SelectInput
                        placeholder='Data Window'
                        id="days"
                        name="days"
                        value={customDaysOptions.filter(v => v.value === field.value.toString())[0]}
                        options={customDaysOptions}
                        onChange={(value) => setValue('days', value ? parseInt(value.value) : 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <SelectInput
                      placeholder='Status'
                      id="status"
                      name="status"
                      value={statusWithoutInactiveOptions.filter(v => v.value === field.value)[0]}
                      options={statusWithoutInactiveOptions}
                      onChange={(value) => setValue('status', value ? value.value : '')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='col-span-1 bg-slate-100 dark:bg-slate-800 dark:text-slate-100 flex justify-center items-center flex-col'>
            <div className='text-lg font-bold'>Estimated Segment Size</div>
            <div className='mt-1'><Input type='text' value={watch("audienceCount")} disabled /></div>
          </div>
        </div>
        <div className='flex justify-end pt-4'>
          <Button className='mr-2' variant="outline" onClick={(e) => {
            e.preventDefault()
            router.push("/audiences")
          }}>CANCEL</Button>
          <Button type="submit" loading={isSubmitting}>{isEdit ? "UPDATE" : "CREATE"}</Button>
        </div>
      </form>
    </Form>
  )
}
