"use client"

import React from 'react'
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import { CreativeFormType } from '../CreativeForm'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { HtmlSanitized } from '@/components/utility/utils/JSXUtils'
import { apiFrameworkOptions, getCreativeType, groupedCategoryOptions, iabAdAttributeOptions, mimeTypeOptions, protocolOptions } from '@/components/utility/utils/Utils'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, FileQuestionIcon, X } from 'lucide-react'
import Portrait_Image from '@/public/portrait.svg'
import Landscape_Image from '@/public/landscape.svg'
import { clickUrlPattern, domainPattern } from '@/components/constants/regexConstants'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { FormatMultiSelectInput, SelectInput } from '@/components/utility/customComponents/SelectInput'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export default function TrackersSchedulers({
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
                        advDomain: creativeType !== "RICHMEDIA" ? z.string()
                            .min(1, { message: "Creative Name is required" })
                            .max(64, { message: "Creative Name must be less than 64 characters" })
                            .regex(domainPattern, { message: "Domain is Invalid" }) : z.string(),
                        redirectUrl: z.string()
                            .refine(v => {
                                if (creativeType === "BANNER" && !v) return false
                                else return true
                            }, { message: "Click Url is Required" })
                            .refine(v => {
                                if (creativeType === "BANNER" && !clickUrlPattern.test(v)) return false
                                else return true
                            }, { message: "Click Url is Invalid" }),
                        videoImpTracking: z.string(),
                        thirdPartyPixel: z.string(),
                        videoClkTracking: z.string(),
                        videoMimeType: creativeType === "VIDEO" ? z.string().min(1, { message: "MIME Type is required" }) : z.string(),
                        apiFramework: z.number(),
                        protocols: creativeType === "VIDEO" ? z.string().min(1, { message: "Protocols is required" }) : z.string(),
                        maxDuration: creativeType === "VIDEO" ? z.number().min(1, { message: "Video Duration should be min 1" }).max(180, { message: "Max video duration can be 180" }) : z.number(),
                        secureTag: z.number(),
                        iabCategoryId: creativeType !== "RICHMEDIA" ? z.string().min(1, { message: "Category is required!" }) : z.string(),
                        iabAdAttribute: z.string().refine(data => {
                            if (data.length === 0) return false
                            else return true
                        }, { message: "Select attributes from list!" }),
                        sizes: z.record(z.string(), z.object({
                            advDomain: z.string()
                                .min(1, { message: "Creative Name is required" })
                                .max(64, { message: "Creative Name must be less than 64 characters" })
                                .regex(domainPattern, { message: "Domain is Invalid" }),
                            secureTag: z.number(),
                            iabCategoryId: z.string().min(1, { message: "Category is required!" }),
                            iabAdAttribute: z.string().refine(data => {
                                if (data.length === 0) return false
                                else return true
                            }, { message: "Select attributes from list!" }),
                            thirdPartyPixel: z.string()
                        })).nullable()
                    })
                ])
            )
        )
    })

    type TrackersSchedulersType = z.infer<typeof formSchema>

    const form = useForm<TrackersSchedulersType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            selectedCrList: Object.fromEntries(
                creativeIdList.map(k => [
                    k,
                    {
                        advDomain: creativeList[k].advDomain || "",
                        redirectUrl: creativeList[k].redirectUrl || "",
                        videoImpTracking: creativeList[k].videoImpTracking || "",
                        thirdPartyPixel: creativeList[k].thirdPartyPixel || "",
                        videoClkTracking: creativeList[k].videoClkTracking || "",
                        videoMimeType: creativeList[k].videoMimeType || "",
                        apiFramework: creativeList[k].apiFramework || 0,
                        protocols: creativeList[k].protocols || "",
                        maxDuration: creativeList[k].maxDuration || 0,
                        secureTag: creativeList[k].secureTag || 0,
                        iabCategoryId: creativeList[k].iabCategoryId || "",
                        iabAdAttribute: creativeList[k].iabAdAttribute || "0",
                        sizes: creativeList[k].sizes ? creativeList[k].sizes : null
                    }
                ])
            ),
        }
    })


    const { setValue, getValues, clearErrors } = form

    const onSubmit: SubmitHandler<TrackersSchedulersType> = async (values: TrackersSchedulersType) => {
        const selectedParentList = { ...creativeList }
        Object.keys(values.selectedCrList).forEach(k => {
            selectedParentList[k].sizes = values.selectedCrList[k].sizes
            selectedParentList[k].advDomain = values.selectedCrList[k].advDomain
            selectedParentList[k].redirectUrl = values.selectedCrList[k].redirectUrl
            selectedParentList[k].videoImpTracking = values.selectedCrList[k].videoImpTracking
            selectedParentList[k].thirdPartyPixel = values.selectedCrList[k].thirdPartyPixel
            selectedParentList[k].videoClkTracking = values.selectedCrList[k].videoClkTracking
            selectedParentList[k].videoMimeType = values.selectedCrList[k].videoMimeType
            selectedParentList[k].apiFramework = values.selectedCrList[k].apiFramework
            selectedParentList[k].protocols = values.selectedCrList[k].protocols
            selectedParentList[k].maxDuration = values.selectedCrList[k].maxDuration
            selectedParentList[k].secureTag = values.selectedCrList[k].secureTag
            selectedParentList[k].iabCategoryId = values.selectedCrList[k].iabCategoryId
            selectedParentList[k].iabAdAttribute = values.selectedCrList[k].iabAdAttribute
        })
        parentForm.setValue("selectedCrList", selectedParentList)
        setTab("reviewSave")
    }

    return (
        <Card className='p-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    {creativeIdList.map(cr => {
                        return creativeType === "RICHMEDIA" ? <div key={cr}>
                            {Object.keys(creativeList[cr].sizes ?? {}).map(size => (
                                <div key={size} className='grid grid-cols-3 gap-4 mt-5 border-b pb-5'>
                                    <div className='col-span-1'>
                                        <div className='w-72 h-72 p-1 flex justify-center items-center rounded-lg cursor-pointer h-42 w-42 bg-slate-100 dark:bg-slate-700 relative'>
                                            <div className='object-contain max-h-full w-full'>
                                                <HtmlSanitized html={creativeList[cr].rmaContent} />
                                            </div>
                                        </div>
                                        <div className='font-bold p-0.5 mt-1'>File Details</div>
                                        <div className='px-1'>{creativeList[cr].adName}</div>
                                        <div className='flex items-center text-sm'>
                                            <Image
                                                src={getCreativeType(creativeList[cr].creativePath || '') === "PORTRAIT" ? Portrait_Image : Landscape_Image}
                                                alt={creativeList[cr].adName}
                                                width="0"
                                                height="0"
                                                style={{ width: '5%', height: 'auto' }}
                                            /> {size}
                                        </div>
                                    </div>
                                    <div className='col-span-2 space-y-5'>
                                        <FormField
                                            control={form.control}
                                            name={`selectedCrList.${cr}.sizes.${size}.advDomain`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Advertiser Domain<span className='text-red-900'>*</span></FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='eg. mobavenue.com, google.com' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className='border p-3 relative rounded-md'>
                                            <span className='absolute top-[-10px] left-5 text-[12px] bg-white dark:bg-slate-950'>Tracking Attributes</span>
                                            <FormField
                                                control={form.control}
                                                name={`selectedCrList.${cr}.sizes.${size}.thirdPartyPixel`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Third Party Click Tracking
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <FileQuestionIcon size={14} className='ml-0.5' />
                                                                </TooltipTrigger>
                                                                <TooltipContent className='w-60'>
                                                                    Supported macros: CLIENT_ID, UA, IFA, BUNDLE_ID, DOMAIN, CAMPAIGN_ID, CREATIVE_ID, APP_NAME, IP, EXCHANGE_ID, OS
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder='https://tracking.mobavenue.com' {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className='grid grid-cols-3 gap-4'>
                                            <FormField
                                                control={form.control}
                                                name={`selectedCrList.${cr}.sizes.${size}.iabCategoryId`}
                                                render={({ field }) => (
                                                    <FormItem className='col-span-2'>
                                                        <FormLabel>
                                                            Content Category<span className='text-red-900'>*</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <FormatMultiSelectInput
                                                                placeholder="IAB Content Categories"
                                                                isClearable={true}
                                                                isSearchable={true}
                                                                name="iabCategoryId"
                                                                value={groupedCategoryOptions.flatMap(v => v.options).filter(v => form.watch(`selectedCrList.${cr}.sizes.${size}.iabCategoryId`).split(",").includes(v.value))}
                                                                options={groupedCategoryOptions}
                                                                onChange={(e) => {
                                                                    setValue(`selectedCrList.${cr}.sizes.${size}.iabCategoryId`, e ? e.map(v => v.value).join(",") : "")
                                                                    clearErrors(`selectedCrList.${cr}.sizes.${size}.iabCategoryId`)
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`selectedCrList.${cr}.sizes.${size}.secureTag`}
                                                render={({ field }) => (
                                                    <FormItem className='flex items-center justify-center mt-5 col-span-1'>
                                                        <FormLabel className='mr-2 mt-2'>
                                                            Secure
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Switch
                                                                name={`selectedCrList.${cr}.sizes.${size}.secureTag`}
                                                                checked={getValues(`selectedCrList.${cr}.sizes.${size}.secureTag`) === 1}
                                                                onCheckedChange={(value) => setValue(`selectedCrList.${cr}.sizes.${size}.secureTag`, value ? 1 : 0)}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className='grid grid-cols-3 gap-4'>
                                            <FormField
                                                control={form.control}
                                                name={`selectedCrList.${cr}.sizes.${size}.iabAdAttribute`}
                                                render={({ field }) => (
                                                    <FormItem className='col-span-1'>
                                                        <FormLabel className='mr-2 mt-2'>
                                                            Creative Attribute
                                                        </FormLabel>
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={field.onChange}
                                                                value={field.value}
                                                                className="flex flex-col space-y-1"
                                                            >
                                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                                    <FormControl>
                                                                        <RadioGroupItem value="0" />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        None
                                                                    </FormLabel>
                                                                </FormItem>
                                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                                    <FormControl>
                                                                        <RadioGroupItem value='' checked={getValues(`selectedCrList.${cr}.sizes.${size}.iabAdAttribute`) !== "0"} />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        Choose from list
                                                                    </FormLabel>
                                                                </FormItem>
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            {form.watch(`selectedCrList.${cr}.sizes.${size}.iabAdAttribute`) !== "0" && <div className="col-span-2">
                                                <div className='grid grid-cols-2 text-sm'>
                                                    {iabAdAttributeOptions.map(option => (
                                                        <div className='flex items-center mt-2 ml-2' key={option.value}>
                                                            <Checkbox
                                                                className='mr-2'
                                                                checked={getValues(`selectedCrList.${cr}.sizes.${size}.iabAdAttribute`).split(",").includes(option.value)}
                                                                onCheckedChange={(value) => {
                                                                    setValue(`selectedCrList.${cr}.sizes.${size}.iabAdAttribute`, value ? getValues(`selectedCrList.${cr}.sizes.${size}.iabAdAttribute`).length ? [...getValues(`selectedCrList.${cr}.sizes.${size}.iabAdAttribute`).split(","), option.value].join(",") : option.value : getValues(`selectedCrList.${cr}.sizes.${size}.iabAdAttribute`).split(",").filter(v => v !== option.value).join(","))
                                                                    clearErrors(`selectedCrList.${cr}.sizes.${size}.iabAdAttribute`)
                                                                }}
                                                            /> {option.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div> : <div key={cr} className='grid grid-cols-3 gap-4 border-b pb-5'>
                            <div className='col-span-1'>
                                <div className='w-72 h-72 p-1 flex justify-center items-center rounded-lg cursor-pointer h-42 w-42 bg-slate-100 dark:bg-slate-700 relative'>
                                    {creativeType === "BANNER" ? <>
                                        <img src={creativeList[cr].creativePath} alt={creativeList[cr].adName} className='object-contain max-h-full w-full' />
                                    </> : creativeType === "VIDEO" ? <>
                                        <video controls src={creativeList[cr].creativePath} className='object-contain max-h-full max-w-full' />
                                    </> : null}
                                </div>
                                <div className='font-bold p-0.5 mt-1'>File Details</div>
                                <div className='px-1'>{creativeList[cr].adName}</div>
                                <div className='flex items-center text-sm'>
                                    <Image
                                        src={getCreativeType(creativeList[cr].creativePath || '') === "PORTRAIT" ? Portrait_Image : Landscape_Image}
                                        alt={creativeList[cr].adName}
                                        width="0"
                                        height="0"
                                        style={{ width: '5%', height: 'auto' }}
                                    /> {creativeList[cr].creativeSize}
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
                                            style={{ width: '5%', height: 'auto' }}
                                        />
                                        {creativeList[cr].videoEndcardSize}
                                    </div>
                                </div>}
                            </div>
                            <div className='col-span-2 space-y-5'>
                                <FormField
                                    control={form.control}
                                    name={`selectedCrList.${cr}.advDomain`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Advertiser Domain<span className='text-red-900'>*</span></FormLabel>
                                            <FormControl>
                                                <Input placeholder='eg. mobavenue.com, google.com' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {creativeType === "VIDEO" && <>
                                    <div className='border p-3 relative rounded-md'>
                                        <span className='absolute top-[-10px] left-5 text-[12px] bg-white dark:bg-slate-950'>Video Attributes</span>
                                        <FormField
                                            control={form.control}
                                            name={`selectedCrList.${cr}.videoMimeType`}
                                            render={({ field }) => (
                                                <FormItem className='mt-1'>
                                                    <FormLabel>Mimes<span className='text-red-900'>*</span></FormLabel>
                                                    <FormControl>
                                                        <SelectInput
                                                            placeholder='Mimes'
                                                            id="mimes"
                                                            name="mimes"
                                                            value={mimeTypeOptions.filter(v => v.value === field.value)[0]}
                                                            options={mimeTypeOptions}
                                                            onChange={(value) => {
                                                                setValue(`selectedCrList.${cr}.videoMimeType`, value ? value.value : "")
                                                                clearErrors(`selectedCrList.${cr}.videoMimeType`)
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className='grid grid-cols-2 gap-4'>
                                            <FormField
                                                control={form.control}
                                                name={`selectedCrList.${cr}.apiFramework`}
                                                render={({ field }) => (
                                                    <FormItem className='mt-1'>
                                                        <FormLabel>API Framework<span className='text-red-900'>*</span></FormLabel>
                                                        <FormControl>
                                                            <SelectInput
                                                                placeholder='API Framework'
                                                                id="apiFramework"
                                                                name="apiFramework"
                                                                value={apiFrameworkOptions.filter(v => v.value === field.value.toString())[0]}
                                                                options={apiFrameworkOptions}
                                                                onChange={(value) => {
                                                                    setValue(`selectedCrList.${cr}.apiFramework`, value ? parseInt(value.value) : 0)
                                                                    clearErrors(`selectedCrList.${cr}.apiFramework`)
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`selectedCrList.${cr}.protocols`}
                                                render={({ field }) => (
                                                    <FormItem className='mt-1'>
                                                        <FormLabel>Protocols<span className='text-red-900'>*</span></FormLabel>
                                                        <FormControl>
                                                            <SelectInput
                                                                placeholder='Protocols'
                                                                id="protocols"
                                                                name="protocols"
                                                                value={protocolOptions.filter(v => v.value === field.value)[0]}
                                                                options={protocolOptions}
                                                                onChange={(value) => {
                                                                    setValue(`selectedCrList.${cr}.protocols`, value ? value.value : "")
                                                                    clearErrors(`selectedCrList.${cr}.protocols`)
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name={`selectedCrList.${cr}.maxDuration`}
                                            render={({ field }) => (
                                                <FormItem className='mt-1'>
                                                    <FormLabel>Video Duration<span className='text-red-900'>*</span></FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='number'
                                                            placeholder='0'
                                                            value={field.value}
                                                            onChange={(e) => {
                                                                setValue(`selectedCrList.${cr}.maxDuration`, e.target.value ? parseInt(e.target.value) : 0)
                                                                clearErrors(`selectedCrList.${cr}.maxDuration`)
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </>}
                                <div className='border p-3 relative rounded-md'>
                                    <span className='absolute top-[-10px] left-5 text-[12px] bg-white dark:bg-slate-950'>Tracking Attributes</span>
                                    {creativeType === "BANNER" ? <>
                                        <FormField
                                            control={form.control}
                                            name={`selectedCrList.${cr}.redirectUrl`}
                                            render={({ field }) => (
                                                <FormItem className='mt-1'>
                                                    <FormLabel>Click Url<span className='text-red-900'>*</span>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <FileQuestionIcon size={14} className='ml-0.5' />
                                                            </TooltipTrigger>
                                                            <TooltipContent className='w-60'>
                                                                Supported macros: CLIENT_ID, UA, IFA, BUNDLE_ID, DOMAIN, CAMPAIGN_ID, CREATIVE_ID, APP_NAME, IP, EXCHANGE_ID, OS
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='https://www.mobavenue.com' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`selectedCrList.${cr}.videoImpTracking`}
                                            render={({ field }) => (
                                                <FormItem className='mt-2'>
                                                    <FormLabel>Third Party Impression Tracking
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <FileQuestionIcon size={14} className='ml-0.5' />
                                                            </TooltipTrigger>
                                                            <TooltipContent className='w-60'>
                                                                Supported macros: CLIENT_ID, UA, IFA, BUNDLE_ID, DOMAIN, CAMPAIGN_ID, CREATIVE_ID, APP_NAME, IP, EXCHANGE_ID, OS
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='https://imptracking.mobavenue.com' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`selectedCrList.${cr}.thirdPartyPixel`}
                                            render={({ field }) => (
                                                <FormItem className='mt-2'>
                                                    <FormLabel>Third Party Click Tracking
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <FileQuestionIcon size={14} className='ml-0.5' />
                                                            </TooltipTrigger>
                                                            <TooltipContent className='w-60'>
                                                                Supported macros: CLIENT_ID, UA, IFA, BUNDLE_ID, DOMAIN, CAMPAIGN_ID, CREATIVE_ID, APP_NAME, IP, EXCHANGE_ID, EXCHANGE_NAME, OS
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='https://clktracking.mobavenue.com' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </> : creativeType === "VIDEO" && <>
                                        <FormField
                                            control={form.control}
                                            name={`selectedCrList.${cr}.videoImpTracking`}
                                            render={({ field }) => (
                                                <FormItem className='mt-2'>
                                                    <FormLabel className='flex'>Impression Tracking
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <FileQuestionIcon size={14} className='ml-0.5' />
                                                            </TooltipTrigger>
                                                            <TooltipContent className='w-60'>
                                                                Supported macros: CLIENT_ID, UA, IFA, BUNDLE_ID, DOMAIN, CAMPAIGN_ID, CREATIVE_ID, APP_NAME, IP, EXCHANGE_ID, OS
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='https://imptracking.mobavenue.com' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`selectedCrList.${cr}.videoClkTracking`}
                                            render={({ field }) => (
                                                <FormItem className='mt-2'>
                                                    <FormLabel>Click Tracking
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <FileQuestionIcon size={14} className='ml-0.5' />
                                                            </TooltipTrigger>
                                                            <TooltipContent className='w-60'>
                                                                Supported macros: CLIENT_ID, UA, IFA, BUNDLE_ID, DOMAIN, CAMPAIGN_ID, CREATIVE_ID, APP_NAME, IP, EXCHANGE_ID, OS
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='https://clktracking.mobavenue.com' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`selectedCrList.${cr}.thirdPartyPixel`}
                                            render={({ field }) => (
                                                <FormItem className='mt-2'>
                                                    <FormLabel>Third Party Click Tracking
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <FileQuestionIcon size={14} className='ml-0.5' />
                                                            </TooltipTrigger>
                                                            <TooltipContent className='w-60'>
                                                                Supported macros: CLIENT_ID, UA, IFA, BUNDLE_ID, DOMAIN, CAMPAIGN_ID, CREATIVE_ID, APP_NAME, IP, EXCHANGE_ID, EXCHANGE_NAME, OS
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='https://landing.mobavenue.com' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>}
                                </div>
                                <div className='grid grid-cols-3 gap-4'>
                                    <FormField
                                        control={form.control}
                                        name={`selectedCrList.${cr}.iabCategoryId`}
                                        render={({ field }) => (
                                            <FormItem className='col-span-2'>
                                                <FormLabel>
                                                    Content Category<span className='text-red-900'>*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <FormatMultiSelectInput
                                                        placeholder="IAB Content Categories"
                                                        isClearable={true}
                                                        isSearchable={true}
                                                        name="iabCategoryId"
                                                        value={groupedCategoryOptions.flatMap(v => v.options).filter(v => form.watch(`selectedCrList.${cr}.iabCategoryId`).split(",").includes(v.value))}
                                                        options={groupedCategoryOptions}
                                                        onChange={(e) => {
                                                            setValue(`selectedCrList.${cr}.iabCategoryId`, e ? e.map(v => v.value).join(",") : "")
                                                            clearErrors(`selectedCrList.${cr}.iabCategoryId`)
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {creativeType === "BANNER" && <FormField
                                        control={form.control}
                                        name={`selectedCrList.${cr}.secureTag`}
                                        render={({ field }) => (
                                            <FormItem className='flex items-center justify-center mt-5 col-span-1'>
                                                <FormLabel className='mr-2 mt-2'>
                                                    Secure
                                                </FormLabel>
                                                <FormControl>
                                                    <Switch
                                                        name={`selectedCrList.${cr}.secureTag`}
                                                        checked={getValues(`selectedCrList.${cr}.secureTag`) === 1}
                                                        onCheckedChange={(value) => setValue(`selectedCrList.${cr}.secureTag`, value ? 1 : 0)}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />}
                                </div>
                                <div className='grid grid-cols-3 gap-4'>
                                    <FormField
                                        control={form.control}
                                        name={`selectedCrList.${cr}.iabAdAttribute`}
                                        render={({ field }) => (
                                            <FormItem className='col-span-1'>
                                                <FormLabel className='mr-2 mt-2'>
                                                    Creative Attribute
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                        className="flex flex-col space-y-1"
                                                    >
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="0" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                None
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value='' checked={getValues(`selectedCrList.${cr}.iabAdAttribute`) !== "0"} />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                Choose from list
                                                            </FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {form.watch(`selectedCrList.${cr}.iabAdAttribute`) !== "0" && <div className="col-span-2">
                                        <div className='grid grid-cols-2 text-sm'>
                                            {iabAdAttributeOptions.map(option => (
                                                <div className='flex items-center mt-2 ml-2' key={option.value}>
                                                    <Checkbox
                                                        className='mr-2'
                                                        checked={getValues(`selectedCrList.${cr}.iabAdAttribute`).split(",").includes(option.value)}
                                                        onCheckedChange={(value) => {
                                                            setValue(`selectedCrList.${cr}.iabAdAttribute`, value ? getValues(`selectedCrList.${cr}.iabAdAttribute`).length ? [...getValues(`selectedCrList.${cr}.iabAdAttribute`).split(","), option.value].join(",") : option.value : getValues(`selectedCrList.${cr}.iabAdAttribute`).split(",").filter(v => v !== option.value).join(","))
                                                            clearErrors(`selectedCrList.${cr}.iabAdAttribute`)
                                                        }}
                                                    /> {option.label}
                                                </div>
                                            ))}
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    })}
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