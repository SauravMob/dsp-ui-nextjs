"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { interstitialSizes } from '@/components/utility/utils/Utils'
import { cn } from '@/lib/utils'
import { CheckCircle } from 'lucide-react'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { BsWindowStack } from "react-icons/bs"
import { RiWindow2Fill } from "react-icons/ri"
import { CreativeFormType } from '../CreativeForm'
import { MdOutlineSelectAll } from "react-icons/md"

export default function AdTypeFormat({
  creativeType,
  parentForm,
  form,
  cr
}: {
  creativeType: string
  parentForm: UseFormReturn<CreativeFormType, any, undefined>
  form: UseFormReturn<{
    selectedCrList: {
      [x: string]: {
        adName: string
        creativeSize: string[]
        adFormat: number
      }
    }
  }, any, undefined>
  cr: string
}) {

  const { watch, setValue } = form
  const creativeList = watch("selectedCrList")

  return (
    <div>
      {creativeType === "BANNER" && interstitialSizes.includes(creativeList[cr].creativeSize[0]) ? <>
        <FormField
          control={form.control}
          name={`selectedCrList.${cr}.adFormat`}
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Ad Format</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setValue(`selectedCrList.${cr}.adFormat`, parseInt(value))
                    parentForm.setValue(`selectedCrList.${cr}.adFormat`, parseInt(value))
                  }}
                  defaultValue={field.value.toString()}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="0" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      All
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Interstitial
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </> : creativeType === "RICHMEDIA" ? <>
        <FormField
          control={form.control}
          name={`selectedCrList.${cr}.adFormat`}
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>AdTag Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setValue(`selectedCrList.${cr}.adFormat`, parseInt(value))
                    parentForm.setValue(`selectedCrList.${cr}.adFormat`, parseInt(value))
                  }}
                  defaultValue={field.value.toString()}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="0" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Plain HTML-JS
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="3" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      MRAID 1.0
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="5" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      MRAID 2.0
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </> : creativeType === "VIDEO" && <>
        <FormField
          control={form.control}
          name={`selectedCrList.${cr}.adFormat`}
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Ad Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setValue(`selectedCrList.${cr}.adFormat`, parseInt(value))
                    parentForm.setValue(`selectedCrList.${cr}.adFormat`, parseInt(value))
                  }}
                  value={field.value.toString()}
                  className="flex flex-col space-y-1"
                >
                  <div className='grid grid-cols-3 gap-5 mb-3'>
                    <div
                      className={cn('border dark:border-slate-800 p-5 flex items-center rounded-3xl relative cursor-pointer', (watch(`selectedCrList.${cr}.adFormat`) === 0) && "border-black dark:border-white")}
                      onClick={() => {
                        field.onChange(0)
                        parentForm.setValue(`selectedCrList.${cr}.adFormat`, 0)
                      }}
                    >
                      <MdOutlineSelectAll size={42} className='mr-2' />
                      <div className='text-center'>
                        All
                      </div>
                      {(watch(`selectedCrList.${cr}.adFormat`) === 0) && <div className='absolute top-[-5px] left-[-5px] z-10 bg-white dark:bg-slate-950'>
                        <CheckCircle />
                      </div>}
                    </div>
                    <div
                      className={cn('border dark:border-slate-800 p-5 flex items-center rounded-3xl relative cursor-pointer', (watch(`selectedCrList.${cr}.adFormat`) === 3 || watch(`selectedCrList.${cr}.adFormat`) === 1 || watch(`selectedCrList.${cr}.adFormat`) === 2) && "border-black dark:border-white")}
                      onClick={() => {
                        field.onChange(3)
                        parentForm.setValue(`selectedCrList.${cr}.adFormat`, 3)
                      }}
                    >
                      <BsWindowStack size={42} className='mr-2' />
                      <div className='text-center'>
                        Interstitial
                      </div>
                      {(watch(`selectedCrList.${cr}.adFormat`) === 3 || watch(`selectedCrList.${cr}.adFormat`) === 1 || watch(`selectedCrList.${cr}.adFormat`) === 2) && <div className='absolute top-[-5px] left-[-5px] z-10 bg-white dark:bg-slate-950'>
                        <CheckCircle />
                      </div>}
                    </div>
                    <div
                      className={cn('border dark:border-slate-800 p-5 flex items-center rounded-3xl relative cursor-pointer', (watch(`selectedCrList.${cr}.adFormat`) === 5 || watch(`selectedCrList.${cr}.adFormat`) === 4 || watch(`selectedCrList.${cr}.adFormat`) === 6) && "border-black dark:border-white")}
                      onClick={() => {
                        field.onChange(5)
                        parentForm.setValue(`selectedCrList.${cr}.adFormat`, 5)
                      }}
                    >
                      <RiWindow2Fill size={42} className='mr-2' />
                      <div className='text-center'>
                        Non - Interstitial
                      </div>
                      {(watch(`selectedCrList.${cr}.adFormat`) === 5 || watch(`selectedCrList.${cr}.adFormat`) === 4 || watch(`selectedCrList.${cr}.adFormat`) === 6) && <div className='absolute top-[-5px] left-[-5px] z-10 bg-white dark:bg-slate-950'>
                        <CheckCircle />
                      </div>}
                    </div>
                  </div>
                  {(watch(`selectedCrList.${cr}.adFormat`) === 5 || watch(`selectedCrList.${cr}.adFormat`) === 4 || watch(`selectedCrList.${cr}.adFormat`) === 6) ? <div className='flex justify-around'>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="5" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        All
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="4" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Rewarded
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="6" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Non-Rewarded
                      </FormLabel>
                    </FormItem>
                  </div> : <div className='flex justify-around'>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="3" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        All
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Rewarded
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="2" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Non-Rewarded
                      </FormLabel>
                    </FormItem>
                  </div>}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>}
    </div>
  )
}
