"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { SelectInput } from '@/components/utility/customComponents/SelectInput'
import { dmpPartnerOptions } from '@/components/utility/utils/Utils'
import React, { useCallback } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { AudienceFormData } from './AudienceForm'
import { uploadFiles } from '../../actions'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import DayPart from './DayPart'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'

export default function ManualForm({
  isAdmin,
  form
}: {
  isAdmin: boolean
  form: UseFormReturn<AudienceFormData, any, undefined>
}) {

  const { setValue, getValues, setError, clearErrors, watch } = form

  const onDrop = useCallback(async (files: File[], rejected: { file: File, errors: { message: string }[] }[]) => {
    if (rejected.length > 0) {
      setError("filename", { message: rejected[0].errors[0].message })
    } else {
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('name', files[0].name)
      formData.append('type', files[0].type)
      const result = await uploadFiles(formData)
      if (result.hasOwnProperty("url")) {
        setValue('filename', files[0].name)
        clearErrors("filename")
      }
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/gz': ['.gz'],
      'application/txt': ['.txt']
    },
    maxSize: 512000000,
    maxFiles: 1
  })

  return (
    <div>
      <FormField
        control={form.control}
        name="dmpPartner"
        render={({ field }) => (
          <FormItem>
            <FormLabel>DMP Partner</FormLabel>
            <FormControl>
              <SelectInput
                placeholder='DMP Partner'
                id="dmpPartner"
                name="dmpPartner"
                value={dmpPartnerOptions.filter(v => v.value === field.value)[0]}
                options={dmpPartnerOptions}
                onChange={(value) => setValue('dmpPartner', value ? value.value : '')}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="filename"
        render={({ field }) => (
          <FormItem className='mt-2'>
            <FormLabel>Audience Data</FormLabel>
            <FormControl>
              <div {...getRootProps()} className='border p-2 rounded-md cursor-pointer'>
                <input {...getInputProps()} />
                {isDragActive ? <p>Drop the files here ...</p> : <p className='opacity-80 flex'>{getValues("filename") ? getValues("filename") : <><Upload className='opacity-70 mr-2' size={22} />Choose Files...</>}</p>}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {isAdmin && getValues("uploadType") === 'manual' && <>
        <FormField
          control={form.control}
          name="clkInterval"
          render={({ field }) => (
            <FormItem className='mt-2'>
              <FormLabel>Click Interval</FormLabel>
              <FormControl>
                <DayPart form={form} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isClkProcessing"
          render={({ field }) => (
            <FormItem className='mt-2 flex items-center'>
              <FormLabel className='mr-2'>Click Processing</FormLabel>
              <FormControl>
                <Switch
                  checked={watch("isClkProcessing") === "1"}
                  onCheckedChange={(e) => {
                    setValue("isClkProcessing", e ? "1" : "0")
                  }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {watch("isClkProcessing") === "1" && <FormField
          control={form.control}
          name="clickUrl"
          render={({ field }) => (
            <FormItem className='mt-2'>
              <FormLabel className='mr-4'>Click URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />}
      </>}
    </div>
  )
}