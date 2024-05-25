"use client"

import React from 'react'
import { FieldErrors, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { CreativeFormType } from '../CreativeForm'
import { Card, CardFooter } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Portrait_Image from '@/public/portrait.svg'
import Landscape_Image from '@/public/landscape.svg'
import { getCreativeType } from '@/components/utility/utils/Utils'
import { AlertCircle, ArrowLeft, Edit, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import IphoneLandscapeImage from '@/public/iphone-landscape.png'
import IphonePortraitImage from '@/public/iphone-portrait.png'
import { cn } from '@/lib/utils'
import { HtmlSanitized } from '@/components/utility/utils/JSXUtils'
import { Form } from '@/components/ui/form'

export default function ReviewSave({
    creativeType,
    parentForm,
    setTab,
    isEdit,
    onSubmit
}: {
    creativeType: string,
    setTab: (tab: string) => void
    parentForm: UseFormReturn<CreativeFormType, any, undefined>
    isEdit: boolean
    onSubmit: SubmitHandler<CreativeFormType>
}) {

    const router = useRouter()

    const { watch } = parentForm
    const creativeList = watch("selectedCrList")
    const creativeIdList = Object.keys(creativeList)

    return (
        <Form {...parentForm}>
            <form onSubmit={parentForm.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <Card>
                    {creativeType === "VIDEO" ? <div className='flex justify-center items-center p-10'>
                        {creativeIdList.map(v => (
                            <Card key={v} className='w-[500px] bg-slate-100 dark:bg-slate-700'>
                                {parentForm.formState.errors && Object.keys(parentForm.formState.errors.selectedCrList?.[v] ?? {}).map(err => (
                                    <div key={err} className='flex justify-center text-sm font-medium text-red-400 m-2'>
                                        <AlertCircle size={18} className='mr-2' />{(parentForm.formState.errors.selectedCrList?.[v] as FieldErrors<CreativeFormType['selectedCrList']>)?.[err]?.message}
                                    </div>
                                ))}
                                <div className='h-96 p-10 flex justify-center items-center rounded-lg cursor-pointer  relative'>
                                    <video controls src={creativeList[v].creativePath as string} className='object-contain max-h-full max-w-full' />
                                </div>
                                <div className='p-5 flex justify-between items-center text-sm'>
                                    {creativeList[v].creativeType} - {creativeList[v].adName}
                                    <div className='flex justify-end items-center'>
                                        <Image
                                            src={getCreativeType(creativeList[v].creativeSize || '') === "PORTRAIT" ? Portrait_Image : Landscape_Image}
                                            alt={creativeList[v].adName}
                                            width="0"
                                            height="0"
                                            style={{ width: '25px', height: 'auto' }}
                                        />{creativeList[v].creativeSize}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div> : creativeType === "BANNER" ? <div className='p-10'>
                        {creativeIdList.map(v => (
                            <Card key={v} className='m-2 bg-slate-100 dark:bg-slate-700'>
                                {parentForm.formState.errors && Object.keys(parentForm.formState.errors.selectedCrList?.[v] ?? {}).map(err => (
                                    <div key={err} className='flex justify-center text-sm font-medium text-red-400 m-2'>
                                        <AlertCircle size={18} className='mr-2' />{(parentForm.formState.errors.selectedCrList?.[v] as FieldErrors<CreativeFormType['selectedCrList']>)?.[err]?.message}
                                    </div>
                                ))}
                                <div className='h-96 p-10 flex justify-center items-center rounded-lg cursor-pointer relative'>
                                    <Image
                                        src={getCreativeType(creativeList[v].creativeSize) === "PORTRAIT" ? IphonePortraitImage : IphoneLandscapeImage}
                                        alt={creativeList[v].adName}
                                        width="0"
                                        height="0"
                                        style={getCreativeType(creativeList[v].creativeSize) === "PORTRAIT" ? { height: '270px', width: '140px' } : { width: "350px", height: "160px" }}
                                    />
                                    <div className={cn('flex justify-center items-center absolute', getCreativeType(creativeList[v].creativeSize) === "PORTRAIT" ? "h-[158px] w-[126px]" : "h-[115px] w-[336px]")}>
                                        <img src={creativeList[v].creativePath as string} alt={creativeList[v].adName} className='object-contain max-h-full max-w-full' />
                                    </div>
                                </div>
                                <div className='p-5 flex justify-between items-center text-sm'>
                                    {creativeList[v].creativeType} - {creativeList[v].adName}
                                    <div className='flex justify-end items-center'>
                                        <Image
                                            src={getCreativeType(creativeList[v].creativeSize || '') === "PORTRAIT" ? Portrait_Image : Landscape_Image}
                                            alt={creativeList[v].adName}
                                            width="0"
                                            height="0"
                                            style={{ width: '25px', height: 'auto' }}
                                        />{creativeList[v].creativeSize}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div> : creativeType === "RICHMEDIA" ? <div className='p-10'>
                        {creativeIdList.map(v => (
                            Object.keys(creativeList[v].sizes ?? {}).map(size => (
                                <Card key={size} className='m-2 bg-slate-100 dark:bg-slate-700'>
                                    {parentForm.formState.errors && Object.keys(parentForm.formState.errors.selectedCrList?.[v]?.sizes?.[size] ?? {}).map(err => (
                                        <div key={err} className='flex justify-center text-sm font-medium text-red-400 m-2'>
                                            <AlertCircle size={18} className='mr-2' />
                                            {(parentForm.formState.errors.selectedCrList?.[v]?.sizes?.[size] as any)?.[err]?.message}
                                        </div>
                                    ))}
                                    <div className='h-96 p-10 flex justify-center items-center rounded-lg cursor-pointer relative'>
                                        <Image
                                            src={getCreativeType(size) === "PORTRAIT" ? IphonePortraitImage : IphoneLandscapeImage}
                                            alt={creativeList[v].adName}
                                            width="0"
                                            height="0"
                                            style={getCreativeType(size) === "PORTRAIT" ? { height: '270px', width: '140px' } : { width: "350px", height: "160px" }}
                                        />
                                        <div className={cn('flex justify-center items-center absolute object-contain', getCreativeType(size) === "PORTRAIT" ? "h-[158px] w-[126px]" : "w-[145px]")}>
                                            <HtmlSanitized html={creativeList[v].rmaContent as string} />
                                        </div>
                                    </div>
                                    <div className='p-5 flex justify-between items-center text-sm'>
                                        {creativeList[v].creativeType} - {creativeList[v].adName}
                                        <div className='flex justify-end items-center'>
                                            <Image
                                                src={getCreativeType(size || '') === "PORTRAIT" ? Portrait_Image : Landscape_Image}
                                                alt={creativeList[v].adName}
                                                width="0"
                                                height="0"
                                                style={{ width: '25px', height: 'auto' }}
                                            />{size}
                                        </div>
                                    </div>
                                </Card>
                            ))
                        ))}
                    </div> : null}
                    <CardFooter className='flex items-center justify-between mt-5'>
                        <Button type='button' onClick={() => router.push('/creatives')}><X size={14} className='mr-2' /> CANCEL</Button>
                        <div className='flex gap-2'>
                            <Button type='button' onClick={() => setTab("trackersSchedulers")}><ArrowLeft size={14} className='mr-1' /> PREVIOUS</Button>
                            <Button type='submit' onClick={() => onSubmit(parentForm.getValues())}>{isEdit ? "UPDATE" : "CREATE"}<Edit size={14} className='ml-1' /></Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}
