"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { searchCreative, uploadFiles } from '../../../actions'
import { ArrowRight, CheckCircle, Upload, X, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FilterDialog } from '../modals/FilterModal'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { getImgDimension } from '@/components/utility/utils/Utils'
import { UseFormReturn } from 'react-hook-form'
import { CreativeFormType } from '../CreativeForm'
import { v4 as uuid } from 'uuid'
import { Card, CardFooter } from '@/components/ui/card'
import ThumbnailGenerator from '../creativeUtils/ThumbnailGenerator'
import RichmediaUploadModal from '../modals/RichmediaUploadModal'
import { HtmlSanitized } from '@/components/utility/utils/JSXUtils'
import { useRouter } from 'next/navigation'

export default function FileSelector({
    creativeType,
    form,
    userId,
    setTab,
    isAdmin,
    setOpen
}: {
    creativeType: string
    form: UseFormReturn<CreativeFormType, any, undefined>
    userId: number
    setTab: (tab: string) => void
    isAdmin: boolean
    setOpen?: (input: boolean) => void
}) {

    const { setValue, getValues } = form
    const router = useRouter()

    const [error, setError] = useState<string[]>([])

    const [prevUploadedCreatives, setPrevUploadedCreatives] = useState<CreativeType[]>([])

    const creativeList = getValues().selectedCrList
    const creativeIdList = Object.keys(creativeList)

    const fetchPrevUploadedCreatives = async (filter: { creativeType?: string, creativeId?: string, creativeSize?: string }) => {
        const response = await searchCreative({ pageNo: "0", pageSize: "100", filter })
        setPrevUploadedCreatives(response.content)
    }

    useEffect(() => {
        if (creativeType === "BANNER") fetchPrevUploadedCreatives({ creativeType })
    }, [])

    const onDrop = useCallback(async (files: File[], rejected: { file: File, errors: { message: string }[] }[]) => {
        if (rejected.length > 0) {
            setError(rejected.map(v => v.errors.map(e => e.message)).flat())
        } else {
            const formData = new FormData()
            formData.append('file', files[0])
            formData.append('name', files[0].name)
            formData.append('type', files[0].type)
            const result = await uploadFiles(formData)
            if (result.hasOwnProperty("url")) {
                if (creativeType === "BANNER") {
                    const sizes: { width: number, height: number } = await getImgDimension(files[0])
                    const creativeSize = `${sizes.width}x${sizes.height}`
                    const uniqueId = uuid()
                    setValue("selectedCrList", {
                        ...creativeList,
                        [uniqueId]: {
                            id: uniqueId,
                            skip: 0,
                            userId,
                            adName: files[0].name,
                            adFormat: 0,
                            advDomain: "",
                            secureTag: 0,
                            protocols: null,
                            isEndCard: null,
                            eridToken: null,
                            createdOn: "",
                            campaignId: "",
                            rmaContent: null,
                            maxDuration: null,
                            redirectUrl: null,
                            fidelityType: 0,
                            itunesAppId: null,
                            creativeType,
                            creativeSize,
                            creativePath: result.url[0],
                            apiFramework: null,
                            iabCategoryId: "",
                            videoMimeType: null,
                            iabAdAttribute: null,
                            playbackMethod: null,
                            thirdPartyPixel: null,
                            videoThumbnail: "",
                            videoImpTracking: null,
                            videoEndcardPath: null,
                            videoEndcardSize: null,
                            videoClkTracking: null,
                            videoCreativeSize: "",
                            sizes: null
                        }
                    })
                    setPrevUploadedCreatives(prev => ([
                        {
                            id: uniqueId,
                            creativeSize,
                            creativePath: result.url[0],
                            creativeType,
                            adName: files[0].name,
                            userId
                        }, ...prev
                    ]))
                } else if (creativeType === "VIDEO") {
                    const url = URL.createObjectURL(files[0])
                    const $video = document.createElement("video")
                    $video.src = url
                    let wh = '0x0'
                    const uid = uuid()
                    $video.addEventListener("loadedmetadata", function () {
                        wh = `${$video.videoWidth}x${$video.videoHeight}`
                        setValue("selectedCrList", {
                            ...creativeList,
                            [uid]: {
                                id: uid,
                                skip: 0,
                                userId,
                                adName: files[0].name,
                                adFormat: 0,
                                advDomain: "",
                                secureTag: 0,
                                protocols: null,
                                isEndCard: null,
                                eridToken: null,
                                createdOn: "",
                                campaignId: "",
                                rmaContent: null,
                                maxDuration: null,
                                redirectUrl: null,
                                fidelityType: 0,
                                itunesAppId: null,
                                creativeType,
                                creativeSize: wh,
                                creativePath: result.url[0],
                                apiFramework: null,
                                iabCategoryId: "",
                                videoMimeType: null,
                                iabAdAttribute: null,
                                playbackMethod: null,
                                thirdPartyPixel: null,
                                videoThumbnail: url,
                                videoImpTracking: null,
                                videoEndcardPath: null,
                                videoEndcardSize: null,
                                videoClkTracking: null,
                                videoCreativeSize: "",
                                sizes: null
                            }
                        })
                        setPrevUploadedCreatives(prev => ([
                            {
                                id: uid,
                                creativeSize: wh,
                                creativePath: url,
                                creativeType,
                                adName: files[0].name,
                                userId
                            }, ...prev
                        ]))
                    })
                } else if (creativeType === "RICHMEDIA") {
                    const creativeUrl = process.env.NODE_ENV === "development" ? result.url[0] : result.url[0].replace("assets", "ui-backendapi")
                    const cr = await fetch(creativeUrl)
                    const uid = uuid()
                    const html = <HtmlSanitized html={await cr.text()} />
                    setValue("selectedCrList", {
                        ...creativeList,
                        [uid]: {
                            id: uid,
                            skip: 0,
                            userId,
                            adName: files[0].name,
                            adFormat: 0,
                            advDomain: "",
                            secureTag: 0,
                            protocols: null,
                            isEndCard: null,
                            eridToken: null,
                            createdOn: "",
                            campaignId: "",
                            rmaContent: html.props.html,
                            maxDuration: null,
                            redirectUrl: null,
                            fidelityType: 0,
                            itunesAppId: null,
                            creativeType,
                            creativeSize: "",
                            creativePath: result.url[0],
                            apiFramework: null,
                            iabCategoryId: "",
                            videoMimeType: null,
                            iabAdAttribute: null,
                            playbackMethod: null,
                            thirdPartyPixel: null,
                            videoThumbnail: "",
                            videoImpTracking: null,
                            videoEndcardPath: null,
                            videoEndcardSize: null,
                            videoClkTracking: null,
                            videoCreativeSize: "",
                            sizes: null
                        }
                    })
                    setPrevUploadedCreatives(prev => ([
                        {
                            id: uid,
                            creativePath: result.url[0],
                            rmaContent: html.props.html,
                            creativeType,
                            adName: files[0].name,
                            userId
                        }, ...prev
                    ]))
                }
            }
            setError([])
        }
    }, [])

    const onRichmediaCodeDrop = ({ name, code }: { name: string, code: string }) => {
        const uid = uuid()
        const html = <HtmlSanitized html={code} />
        setValue("selectedCrList", {
            ...creativeList,
            [uid]: {
                id: uid,
                skip: 0,
                userId,
                adName: name,
                adFormat: 0,
                advDomain: "",
                secureTag: 0,
                protocols: null,
                isEndCard: null,
                eridToken: null,
                createdOn: "",
                campaignId: "",
                rmaContent: html.props.html,
                maxDuration: null,
                redirectUrl: null,
                fidelityType: 0,
                itunesAppId: null,
                creativeType,
                creativeSize: "",
                creativePath: "",
                apiFramework: null,
                iabCategoryId: "",
                videoMimeType: null,
                iabAdAttribute: null,
                playbackMethod: null,
                thirdPartyPixel: null,
                videoThumbnail: "",
                videoImpTracking: null,
                videoEndcardPath: null,
                videoEndcardSize: null,
                videoClkTracking: null,
                videoCreativeSize: "",
                sizes: null
            }
        })
        setPrevUploadedCreatives(prev => ([
            {
                id: uid,
                rmaContent: html.props.html,
                creativeType,
                adName: name,
                userId
            }, ...prev
        ]))
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: creativeType === "BANNER" ? { 'image/*': ['.jpg', '.png', '.gif', '.jpeg'] } : creativeType === "VIDEO" ? { 'video/*': ['.mkv', '.mp4'] } : { 'text/html': ['.htm', '.html', '.js'] },
        maxSize: 52428800,
        maxFiles: 1
    })

    const checkValidation = () => {
        let flag = true
        if (creativeIdList.length === 0) {
            setError(["Please select at least one file"])
            flag = false
        }
        if (creativeType === "VIDEO" && creativeIdList.length > 1) {
            setError(["Only one video file is allowed"])
            flag = false
        }
        return flag
    }

    const onSubmit = () => {
        if (checkValidation()) setTab(creativeType === "VIDEO" ? "endCard" : "editDetails")
    }

    return (
        <Card>
            <div className='mt-2'>
                <div className='flex justify-between'>
                    <div className='p-3 text-md font-semibold'>Selected Files</div>
                    <div className='p-3 flex'>
                        <FilterDialog fetchPrevUploadedCreatives={fetchPrevUploadedCreatives} creativeType={creativeType} />
                        {creativeType === "RICHMEDIA" ? <RichmediaUploadModal
                            triggerComponent={<Button size="sm" className='mr-2'>
                                <Upload className='opacity-70 mr-2' size={22} />Upload Files
                            </Button>}
                            getRootProps={getRootProps}
                            getInputProps={getInputProps}
                            onRichmediaCodeDrop={onRichmediaCodeDrop}
                        /> : <Button size="sm" type='button' {...getRootProps()} className='border p-2 rounded-md cursor-pointer'>
                            <input {...getInputProps()} />
                            <Upload className='opacity-70 mr-2' size={22} />Upload Files
                        </Button>}
                    </div>
                </div>
                <div className='flex flex-row'>
                    {creativeIdList.map(key => (
                        <span key={key} className='m-3 w-16 h-16 flex items-center justify-center bg-slate-200 dark:bg-slate-800 relative cursor-pointer' onClick={() => {
                            const updatedCrlist = { ...creativeList }
                            delete updatedCrlist[key]
                            setValue("selectedCrList", updatedCrlist)
                            setError([])
                        }}>
                            {creativeType === "BANNER" ? <>
                                <img src={creativeList[key].creativePath as string} alt={creativeList[key].adName} className='object-contain max-h-full max-w-full opacity-50' />
                            </> : creativeType === "VIDEO" ? <>
                                <ThumbnailGenerator videoFile={creativeList[key].videoThumbnail} className='object-contain max-h-full max-w-full opacity-50' />
                            </> : <div className="object-contain max-h-full w-full">
                                <HtmlSanitized html={creativeList[key].rmaContent as string} />
                            </div>}
                            <div className="absolute inset-0 flex justify-center items-center">
                                <XCircle size={34} />
                            </div>
                        </span>
                    ))}
                </div>
            </div>
            {error.length > 0 && <div className='text-red-500 px-5'>{error.map(v => v)}</div>}
            <ScrollArea className="h-[500px] mb-4">
                <div className='grid grid-cols-5 space-x-2'>
                    {prevUploadedCreatives.map((creative) => (
                        <Tooltip key={creative.id}>
                            <TooltipTrigger asChild>
                                <div className='w-56 h-56 p-1 bg-slate-300 dark:bg-slate-700 m-4 flex justify-center items-center rounded-lg relative cursor-pointer' onClick={() => {
                                    const updatedCrlist = { ...creativeList }
                                    updatedCrlist[creative.id] = {
                                        id: creative.id,
                                        skip: 0,
                                        userId,
                                        adName: creative.adName,
                                        adFormat: 0,
                                        advDomain: "",
                                        secureTag: 0,
                                        protocols: null,
                                        isEndCard: null,
                                        eridToken: null,
                                        createdOn: "",
                                        campaignId: "",
                                        rmaContent: creative.rmaContent || "",
                                        maxDuration: null,
                                        redirectUrl: null,
                                        fidelityType: 0,
                                        itunesAppId: null,
                                        creativeType: creative.creativeType || "",
                                        creativeSize: creative.creativeSize || "",
                                        creativePath: creative.creativePath || "",
                                        apiFramework: null,
                                        iabCategoryId: "",
                                        videoMimeType: null,
                                        iabAdAttribute: null,
                                        playbackMethod: null,
                                        thirdPartyPixel: null,
                                        videoThumbnail: "",
                                        videoImpTracking: null,
                                        videoEndcardPath: null,
                                        videoEndcardSize: null,
                                        videoClkTracking: null,
                                        videoCreativeSize: "",
                                        sizes: null
                                    }
                                    setValue("selectedCrList", updatedCrlist)
                                    setError([])
                                }}>
                                    {creativeType === "BANNER" ? <>
                                        <img src={creative.creativePath as string} alt={creative.adName} className={cn(creativeIdList.includes(creative.id) ? "opacity-50" : "", "object-contain max-h-full max-w-full")} />
                                        {creativeIdList.includes(creative.id) && <div className="absolute inset-0 flex justify-center items-center"><CheckCircle size={48} /></div>}
                                    </> : creativeType === "VIDEO" ? <>
                                        <video controls src={creative.creativePath as string} className={cn(creativeIdList.includes(creative.id) ? "opacity-50" : "", "object-contain max-h-full w-full ")} />
                                        {creativeIdList.includes(creative.id) && <div className="absolute inset-0 flex justify-center items-center"><CheckCircle size={48} /></div>}
                                    </> : <div className={cn(creativeIdList.includes(creative.id) ? "opacity-50" : "", "object-contain max-h-full w-full ")}>
                                        <HtmlSanitized html={creative.rmaContent as string} />
                                        {creativeIdList.includes(creative.id) && <div className="absolute inset-0 flex justify-center items-center"><CheckCircle size={48} /></div>}
                                    </div>}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                {creative.creativeSize}
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </ScrollArea>
            <CardFooter className='flex items-center justify-between mt-5'>
                <Button type='button' onClick={() => (setOpen ? setOpen(false) : router.push(isAdmin ? '/creative-manager' : '/creatives'))}><X size={14} className='mr-2' /> CANCEL</Button>
                <Button type='button' onClick={() => onSubmit()}>NEXT<ArrowRight size={14} className='ml-1' /></Button>
            </CardFooter>
        </Card>
    )
}
