"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CreativeFormType } from '../CreativeForm'
import { Card, CardFooter } from '@/components/ui/card'
import { getCreativeType, getImgDimension } from '@/components/utility/utils/Utils'
import Portrait_Image from '@/public/portrait.svg'
import Landscape_Image from '@/public/landscape.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Edit, X } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { uploadFiles } from '../../../actions'
import { HtmlSanitized } from '@/components/utility/utils/JSXUtils'
import RichmediaUploadModal from '../modals/RichmediaUploadModal'
import { useRouter } from 'next/navigation'

export default function EditFiles({
    form,
    creativeType,
    setTab
}: {
    form: UseFormReturn<CreativeFormType, any, undefined>
    creativeType: string
    setTab: (tab: string) => void
}) {

    const router = useRouter()

    const { setValue, watch } = form
    const creativeList = watch("selectedCrList")
    const creativeIdList = Object.keys(creativeList)

    const [error, setError] = useState<string[]>([])

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
                    setValue("selectedCrList", {
                        ...creativeList,
                        [creativeIdList[0]]: {
                            id: creativeIdList[0],
                            skip: creativeList[creativeIdList[0]].skip,
                            userId: creativeList[creativeIdList[0]].userId,
                            adName: files[0].name,
                            adFormat: creativeList[creativeIdList[0]].adFormat,
                            advDomain: creativeList[creativeIdList[0]].advDomain,
                            secureTag: creativeList[creativeIdList[0]].secureTag,
                            protocols: creativeList[creativeIdList[0]].protocols,
                            isEndCard: creativeList[creativeIdList[0]].isEndCard,
                            eridToken: creativeList[creativeIdList[0]].eridToken,
                            createdOn: new Date().toISOString(),
                            campaignId: creativeList[creativeIdList[0]].campaignId,
                            rmaContent: creativeList[creativeIdList[0]].rmaContent,
                            maxDuration: creativeList[creativeIdList[0]].maxDuration,
                            redirectUrl: creativeList[creativeIdList[0]].redirectUrl,
                            fidelityType: creativeList[creativeIdList[0]].fidelityType,
                            itunesAppId: creativeList[creativeIdList[0]].itunesAppId,
                            creativeType,
                            creativeSize,
                            creativePath: result.url[0],
                            apiFramework: creativeList[creativeIdList[0]].apiFramework,
                            iabCategoryId: creativeList[creativeIdList[0]].iabCategoryId,
                            videoMimeType: creativeList[creativeIdList[0]].videoMimeType,
                            iabAdAttribute: creativeList[creativeIdList[0]].iabAdAttribute,
                            playbackMethod: creativeList[creativeIdList[0]].playbackMethod,
                            thirdPartyPixel: creativeList[creativeIdList[0]].thirdPartyPixel,
                            videoThumbnail: "",
                            videoImpTracking: creativeList[creativeIdList[0]].videoImpTracking,
                            videoEndcardPath: creativeList[creativeIdList[0]].videoEndcardPath,
                            videoEndcardSize: creativeList[creativeIdList[0]].videoEndcardSize,
                            videoClkTracking: creativeList[creativeIdList[0]].videoClkTracking,
                            videoCreativeSize: creativeList[creativeIdList[0]].videoCreativeSize,
                            sizes: null
                        }
                    })
                } else if (creativeType === "VIDEO") {
                    const url = URL.createObjectURL(files[0])
                    const $video = document.createElement("video")
                    $video.src = url
                    let wh = '0x0'
                    $video.addEventListener("loadedmetadata", function () {
                        wh = `${$video.videoWidth}x${$video.videoHeight}`
                        setValue("selectedCrList", {
                            ...creativeList,
                            [creativeIdList[0]]: {
                                id: creativeIdList[0],
                                skip: creativeList[creativeIdList[0]].skip,
                                userId: creativeList[creativeIdList[0]].userId,
                                adName: files[0].name,
                                adFormat: creativeList[creativeIdList[0]].adFormat,
                                advDomain: creativeList[creativeIdList[0]].advDomain,
                                secureTag: creativeList[creativeIdList[0]].secureTag,
                                protocols: creativeList[creativeIdList[0]].protocols,
                                isEndCard: creativeList[creativeIdList[0]].isEndCard,
                                eridToken: creativeList[creativeIdList[0]].eridToken,
                                createdOn: new Date().toISOString(),
                                campaignId: creativeList[creativeIdList[0]].campaignId,
                                rmaContent: creativeList[creativeIdList[0]].rmaContent,
                                maxDuration: creativeList[creativeIdList[0]].maxDuration,
                                redirectUrl: creativeList[creativeIdList[0]].redirectUrl,
                                fidelityType: creativeList[creativeIdList[0]].fidelityType,
                                itunesAppId: creativeList[creativeIdList[0]].itunesAppId,
                                creativeType,
                                creativeSize: wh,
                                creativePath: result.url[0],
                                apiFramework: creativeList[creativeIdList[0]].apiFramework,
                                iabCategoryId: creativeList[creativeIdList[0]].iabCategoryId,
                                videoMimeType: creativeList[creativeIdList[0]].videoMimeType,
                                iabAdAttribute: creativeList[creativeIdList[0]].iabAdAttribute,
                                playbackMethod: creativeList[creativeIdList[0]].playbackMethod,
                                thirdPartyPixel: creativeList[creativeIdList[0]].thirdPartyPixel,
                                videoThumbnail: url,
                                videoImpTracking: creativeList[creativeIdList[0]].videoImpTracking,
                                videoEndcardPath: creativeList[creativeIdList[0]].videoEndcardPath,
                                videoEndcardSize: creativeList[creativeIdList[0]].videoEndcardSize,
                                videoClkTracking: creativeList[creativeIdList[0]].videoClkTracking,
                                videoCreativeSize: creativeList[creativeIdList[0]].videoCreativeSize,
                                sizes: null
                            }
                        })
                    })
                } else if (creativeType === "RICHMEDIA") {
                    const creativeUrl = process.env.NODE_ENV === "development" ? result.url[0] : result.url[0].replace("assets", "ui-backendapi")
                    const cr = await fetch(creativeUrl)
                    const html = <HtmlSanitized html={await cr.text()} />
                    setValue("selectedCrList", {
                        ...creativeList,
                        [creativeIdList[0]]: {
                            id: creativeIdList[0],
                            skip: creativeList[creativeIdList[0]].skip,
                            userId: creativeList[creativeIdList[0]].userId,
                            adName: files[0].name,
                            adFormat: creativeList[creativeIdList[0]].adFormat,
                            advDomain: creativeList[creativeIdList[0]].advDomain,
                            secureTag: creativeList[creativeIdList[0]].secureTag,
                            protocols: creativeList[creativeIdList[0]].protocols,
                            isEndCard: creativeList[creativeIdList[0]].isEndCard,
                            eridToken: creativeList[creativeIdList[0]].eridToken,
                            createdOn: new Date().toISOString(),
                            campaignId: creativeList[creativeIdList[0]].campaignId,
                            rmaContent: html.props.html,
                            maxDuration: creativeList[creativeIdList[0]].maxDuration,
                            redirectUrl: creativeList[creativeIdList[0]].redirectUrl,
                            fidelityType: creativeList[creativeIdList[0]].fidelityType,
                            itunesAppId: creativeList[creativeIdList[0]].itunesAppId,
                            creativeType,
                            creativeSize: creativeList[creativeIdList[0]].creativeSize,
                            creativePath: result.url[0],
                            apiFramework: creativeList[creativeIdList[0]].apiFramework,
                            iabCategoryId: creativeList[creativeIdList[0]].iabCategoryId,
                            videoMimeType: creativeList[creativeIdList[0]].videoMimeType,
                            iabAdAttribute: creativeList[creativeIdList[0]].iabAdAttribute,
                            playbackMethod: creativeList[creativeIdList[0]].playbackMethod,
                            thirdPartyPixel: creativeList[creativeIdList[0]].thirdPartyPixel,
                            videoThumbnail: "",
                            videoImpTracking: creativeList[creativeIdList[0]].videoImpTracking,
                            videoEndcardPath: creativeList[creativeIdList[0]].videoEndcardPath,
                            videoEndcardSize: creativeList[creativeIdList[0]].videoEndcardSize,
                            videoClkTracking: creativeList[creativeIdList[0]].videoClkTracking,
                            videoCreativeSize: creativeList[creativeIdList[0]].videoCreativeSize,
                            sizes: {
                                [creativeList[creativeIdList[0]].creativeSize]: {
                                    advDomain: creativeList[creativeIdList[0]].advDomain,
                                    secureTag: creativeList[creativeIdList[0]].secureTag,
                                    iabCategoryId: creativeList[creativeIdList[0]].iabCategoryId,
                                    iabAdAttribute: creativeList[creativeIdList[0]].iabAdAttribute,
                                    thirdPartyPixel: creativeList[creativeIdList[0]].thirdPartyPixel
                                }
                            }
                        }
                    })
                }
            }
            setError([])
        }
    }, [])

    useEffect(() => {
    }, [watch("selectedCrList")])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: creativeType === "BANNER" ? { 'image/*': ['.jpg', '.png', '.gif', '.jpeg'] } : creativeType === "VIDEO" ? { 'video/*': ['.mkv', '.mp4'] } : { 'text/html': ['.htm', '.html', '.js'] },
        maxSize: 52428800,
        maxFiles: 1
    })

    const onRichmediaCodeDrop = ({ name, code }: { name: string, code: string }) => {
        const html = <HtmlSanitized html={code} />
        setValue("selectedCrList", {
            ...creativeList,
            [creativeIdList[0]]: {
                id: creativeIdList[0],
                skip: creativeList[creativeIdList[0]].skip,
                userId: creativeList[creativeIdList[0]].userId,
                adName: name,
                adFormat: creativeList[creativeIdList[0]].adFormat,
                advDomain: creativeList[creativeIdList[0]].advDomain,
                secureTag: creativeList[creativeIdList[0]].secureTag,
                protocols: creativeList[creativeIdList[0]].protocols,
                isEndCard: creativeList[creativeIdList[0]].isEndCard,
                eridToken: creativeList[creativeIdList[0]].eridToken,
                createdOn: new Date().toISOString(),
                campaignId: creativeList[creativeIdList[0]].campaignId,
                rmaContent: html.props.html,
                maxDuration: creativeList[creativeIdList[0]].maxDuration,
                redirectUrl: creativeList[creativeIdList[0]].redirectUrl,
                fidelityType: creativeList[creativeIdList[0]].fidelityType,
                itunesAppId: creativeList[creativeIdList[0]].itunesAppId,
                creativeType,
                creativeSize: "",
                creativePath: "",
                apiFramework: creativeList[creativeIdList[0]].apiFramework,
                iabCategoryId: creativeList[creativeIdList[0]].iabCategoryId,
                videoMimeType: creativeList[creativeIdList[0]].videoMimeType,
                iabAdAttribute: creativeList[creativeIdList[0]].iabAdAttribute,
                playbackMethod: creativeList[creativeIdList[0]].playbackMethod,
                thirdPartyPixel: creativeList[creativeIdList[0]].thirdPartyPixel,
                videoThumbnail: "",
                videoImpTracking: creativeList[creativeIdList[0]].videoImpTracking,
                videoEndcardPath: creativeList[creativeIdList[0]].videoEndcardPath,
                videoEndcardSize: creativeList[creativeIdList[0]].videoEndcardSize,
                videoClkTracking: creativeList[creativeIdList[0]].videoClkTracking,
                videoCreativeSize: creativeList[creativeIdList[0]].videoCreativeSize,
                sizes: {
                    [creativeList[creativeIdList[0]].creativeSize]: {
                        advDomain: creativeList[creativeIdList[0]].advDomain,
                        secureTag: creativeList[creativeIdList[0]].secureTag,
                        iabCategoryId: creativeList[creativeIdList[0]].iabCategoryId,
                        iabAdAttribute: creativeList[creativeIdList[0]].iabAdAttribute,
                        thirdPartyPixel: creativeList[creativeIdList[0]].thirdPartyPixel
                    }
                }
            }
        })
    }

    return (
        <Card className='p-4'>
            {error.length > 0 && <div className='text-red-500 py-1'>{error.map(v => v)}</div>}
            <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2'>
                    <div className='w-72 h-72 p-1 flex justify-center items-center rounded-lg cursor-pointer bg-slate-100 dark:bg-slate-700 relative'>
                        {creativeType === "BANNER" ? <>
                            <img src={creativeList[creativeIdList[0]].creativePath as string} alt={creativeList[creativeIdList[0]].adName} className='object-contain max-h-full w-full' />
                        </> : creativeType === "VIDEO" ? <>
                            <video controls src={creativeList[creativeIdList[0]].creativePath as string} className='object-contain max-h-full max-w-full' />
                        </> : creativeType === "RICHMEDIA" ? <div className='object-contain max-h-full w-full'>
                            <HtmlSanitized html={creativeList[creativeIdList[0]].rmaContent as string} />
                        </div> : null}
                    </div>
                    <div className='font-bold p-2'>File Details</div>
                    <div className='px-2'>{creativeList[creativeIdList[0]].adName}</div>
                    <div className='flex items-center text-sm'>
                        <Image
                            src={getCreativeType(creativeList[creativeIdList[0]].creativeSize || '') === "PORTRAIT" ? Portrait_Image : Landscape_Image}
                            alt={creativeList[creativeIdList[0]].adName}
                            width="0"
                            height="0"
                            style={{ width: '3%', height: 'auto' }}
                        />
                        {creativeList[creativeIdList[0]].creativeSize}
                    </div>
                </div>
                <div className='col-span-1'>
                    <div className='flex flex-col gap-4 justify-center items-center h-full'>
                        {creativeType === "RICHMEDIA" ? <RichmediaUploadModal
                            triggerComponent={<Button className='w-full' size="lg">
                                <Edit size={18} className='mr-2' /> Edit File
                            </Button>}
                            getRootProps={getRootProps}
                            getInputProps={getInputProps}
                            onRichmediaCodeDrop={onRichmediaCodeDrop}
                        /> : <Button size="lg" type='button' {...getRootProps()} className='w-full'>
                            <input {...getInputProps()} />
                            <Edit className='mr-2' size={22} /> Edit File
                        </Button>}
                        <Button className='w-full' size="lg">
                            <Edit size={18} className='mr-2' /> Edit Ad Type
                        </Button>
                    </div>
                </div>
            </div>
            <CardFooter className='flex items-center justify-between mt-5'>
                <Button type='button' onClick={() => router.push('/creatives')}><X size={14} className='mr-2' /> CANCEL</Button>
                <Button type='button' onClick={() => setTab(creativeType === "VIDEO" ? "endCard" : "editDetails")}>NEXT<ArrowRight size={14} className='ml-1' /></Button>
            </CardFooter>
        </Card>
    )
}

