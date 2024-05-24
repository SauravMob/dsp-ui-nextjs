"use client"

import React from 'react'
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import { CreativeFormType } from '../CreativeForm'
import { useRouter } from 'next/navigation'
import { Card, CardFooter } from '@/components/ui/card'
import Portrait_Image from '@/public/portrait.svg'
import Landscape_Image from '@/public/landscape.svg'
import { getCreativeType, richMediaCreativeSizeOption } from '@/components/utility/utils/Utils'
import { HtmlSanitized } from '@/components/utility/utils/JSXUtils'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { regexName } from '@/components/constants/regexConstants'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MultiSelectInput } from '@/components/utility/customComponents/SelectInput'
import AdTypeFormat from '../creativeUtils/AdTypeFormat'

export default function EditDetails({
    creativeType,
    parentForm,
    setTab,
    isEdit
}: {
    creativeType: string,
    parentForm: UseFormReturn<CreativeFormType, any, undefined>
    setTab: (tab: string) => void
    isEdit: boolean
}) {

    const router = useRouter()

    const { watch } = parentForm
    const creativeList = watch("selectedCrList")
    const creativeIdList = Object.keys(creativeList)

    const formSchema = z.object({
        selectedCrList: z.object(
            Object.fromEntries(
                creativeIdList.map(k => [
                    k,
                    z.object({
                        adName: z.string()
                            .min(1, { message: "Creative Name is required" })
                            .max(64, { message: "Creative Name must be less than 64 characters" })
                            .regex(regexName, { message: "Name is invalid, Only alphanumeric characters, hyphens(-), underscores(_) are allowed" }),
                        creativeSize: z.array(z.string()).refine(v => v.length > 0, { message: "At least one size must be selected" }),
                        adFormat: z.number()
                    })
                ])
            )
        ),
    })

    type EditDetailsType = z.infer<typeof formSchema>

    const form = useForm<EditDetailsType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            selectedCrList: Object.fromEntries(
                creativeIdList.map(k => [
                    k,
                    {
                        adName: creativeList[k].adName,
                        creativeSize: [creativeList[k].creativeSize],
                        adFormat: creativeList[k].adFormat
                    }
                ])
            ),
        }
    })

    const { setValue } = form

    const onSubmit: SubmitHandler<EditDetailsType> = async (values: EditDetailsType) => {
        const selectedParentList = { ...creativeList }
        Object.keys(values.selectedCrList).forEach(k => {
            selectedParentList[k].adName = values.selectedCrList[k].adName
            selectedParentList[k].creativeSize = values.selectedCrList[k].creativeSize.join(",")
            selectedParentList[k].adFormat = values.selectedCrList[k].adFormat
            selectedParentList[k].sizes = creativeType === "RICHMEDIA" ? Object.fromEntries(values.selectedCrList[k].creativeSize.map(v => [
                v,
                {
                    advDomain: "",
                    secureTag: 0,
                    iabCategoryId: "",
                    iabAdAttribute: "0",
                    thirdPartyPixel: ""
                }
            ])) : null
        })
        parentForm.setValue("selectedCrList", selectedParentList)
        setTab("trackersSchedulers")
    }

    return (
        <Card className='p-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    {creativeIdList.map(cr => (
                        <div key={cr} className='grid grid-cols-2 gap-4'>
                            <div className='col-span-1'>
                                <div className='w-72 h-72 p-1 flex justify-center items-center rounded-lg cursor-pointer h-42 w-42 bg-slate-100 dark:bg-slate-700 relative'>
                                    {creativeType === "BANNER" ? <>
                                        <img src={creativeList[cr].creativePath} alt={creativeList[cr].adName} className='object-contain max-h-full w-full' />
                                    </> : creativeType === "VIDEO" ? <>
                                        <video controls src={creativeList[cr].creativePath} className='object-contain max-h-full max-w-full' />
                                    </> : creativeType === "RICHMEDIA" ? <div className='object-contain max-h-full w-full'>
                                        <HtmlSanitized html={creativeList[cr].rmaContent} />
                                    </div> : null}
                                </div>
                                <div className='font-bold p-2'>File Details</div>
                                <div className='px-2'>{creativeList[cr].adName}</div>
                                <div className='flex items-center text-sm'>
                                    <Image
                                        src={getCreativeType(creativeList[cr].creativePath || '') === "PORTRAIT" ? Portrait_Image : Landscape_Image}
                                        alt={creativeList[cr].adName}
                                        width="0"
                                        height="0"
                                        style={{ width: '3%', height: 'auto' }}
                                    />
                                    {creativeList[cr].creativeSize}
                                </div>
                                {creativeList[cr].videoEndcardPath && <div className='mt-5'>
                                    <div className='w-72 h-72 p-1 flex justify-center items-center rounded-lg cursor-pointer h-42 w-42 bg-slate-100 dark:bg-slate-700 relative'>
                                        <img src={creativeList[cr].videoEndcardPath} alt={creativeList[cr].adName} className='object-contain max-h-full w-full' />
                                    </div>
                                    <div className='font-bold my-2'>Endcard File Details</div>
                                    <div className=''>{creativeList[cr].adName}</div>
                                    <div className='flex items-center text-sm'>
                                        <Image
                                            src={getCreativeType(creativeList[cr].videoEndcardSize || '') === "PORTRAIT" ? Portrait_Image : Landscape_Image}
                                            alt={creativeList[cr].adName}
                                            width="0"
                                            height="0"
                                            style={{ width: '3%', height: 'auto' }}
                                        />
                                        {creativeList[cr].videoEndcardSize}
                                    </div>
                                </div>}
                            </div>
                            <div className='col-span-1 space-y-3'>
                                <FormField
                                    control={form.control}
                                    name={`selectedCrList.${cr}.adName`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Creative Name<span className='text-red-900'>*</span></FormLabel>
                                            <FormControl>
                                                <Input disabled={creativeType === "RICHMEDIA" && isEdit} placeholder='Creative Name' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {creativeType === "RICHMEDIA" && <>
                                    <FormField
                                        control={form.control}
                                        name={`selectedCrList.${cr}.creativeSize`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Creative Sizes<span className='text-red-900'>*</span></FormLabel>
                                                <FormControl>
                                                    <MultiSelectInput
                                                        placeholder='Ad Sizes'
                                                        id={`selectedCrList.${cr}.creativeSize`}
                                                        name={`selectedCrList.${cr}.creativeSize`}
                                                        isDisabled={isEdit}
                                                        value={richMediaCreativeSizeOption.filter(v => field.value.includes(v.value))}
                                                        options={richMediaCreativeSizeOption}
                                                        onChange={(selectedOptions) => setValue(`selectedCrList.${cr}.creativeSize`, selectedOptions ? selectedOptions.map(v => v.value) : [])}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>}
                                <AdTypeFormat
                                    creativeType={creativeType}
                                    form={form}
                                    cr={cr}
                                />
                            </div>
                        </div>
                    ))}
                    <CardFooter className='flex items-center justify-between mt-5'>
                        <Button type='button' onClick={() => router.push('/creatives')}><X size={14} className='mr-2' /> CANCEL</Button>
                        <div className='flex gap-2'>
                            <Button type='button' onClick={() => setTab("selectFiles")}><ArrowLeft size={14} className='mr-1' /> PREVIOUS</Button>
                            <Button type='submit'>NEXT<ArrowRight size={14} className='ml-1' /></Button>
                        </div>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}