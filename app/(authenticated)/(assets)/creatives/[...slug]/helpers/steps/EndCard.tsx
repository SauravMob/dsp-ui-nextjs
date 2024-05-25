"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CreativeFormType } from '../CreativeForm'
import { useRouter } from 'next/navigation'
import { getCreativeDetails, getCreativeType, getImgDimension } from '@/components/utility/utils/Utils'
import { Card, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowLeft, ArrowRight, Copy, Upload, X } from 'lucide-react'
import { searchCreative, uploadFiles } from '../../../actions'
import { useDropzone } from 'react-dropzone'
import { FilterDialog } from '../modals/FilterModal'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import Draggable from '../creativeUtils/Draggable'
import ThumbnailGenerator from '../creativeUtils/ThumbnailGenerator'
import Droppable from '../creativeUtils/Droppable'
import { v4 as uuid } from 'uuid'
import EndCardModal from '../modals/EndCardModal'
import Image from 'next/image'
import Portrait_Image from '@/public/portrait.svg'
import Landscape_Image from '@/public/landscape.svg'

export default function EndCard({
    form,
    creativeType,
    setTab,
    userId,
    isEdit
}: {
    form: UseFormReturn<CreativeFormType, any, undefined>
    creativeType: string
    setTab: (tab: string) => void
    userId: number
    isEdit: boolean
}) {

    const router = useRouter()
    const { setValue, watch } = form
    const creativeList = watch("selectedCrList")
    const creativeIdList = Object.keys(creativeList)

    const [error, setError] = useState<string[]>([])
    const [prevUploadedCreatives, setPrevUploadedCreatives] = useState<CreativeType[]>([])

    const fetchPrevUploadedCreatives = async (filter: { creativeType?: string, creativeId?: string, creativeSize?: string }) => {
        const response = await searchCreative({ pageNo: "0", pageSize: "100", filter })
        setPrevUploadedCreatives(response.content)
    }

    useEffect(() => {
        fetchPrevUploadedCreatives({ creativeType: "BANNER" })
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
                const sizes: { width: number, height: number } = await getImgDimension(files[0])
                const creativeSize = `${sizes.width}x${sizes.height}`
                if (!isEdit) {
                    const uniqueId = uuid()
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
                } else {
                    const selectedId = creativeIdList[0]
                    const updatedCr = creativeList[selectedId]
                    updatedCr.videoEndcardPath = result.url[0]
                    updatedCr.videoEndcardSize = creativeSize
                    setValue("selectedCrList", {
                        ...creativeList,
                        [selectedId]: updatedCr
                    })
                }
            }
            setError([])
        }
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpg', '.png', '.gif', '.jpeg']
        },
        maxSize: 52428800,
        maxFiles: 1
    })

    const handleDragEnd = (event: DragEndEvent) => {
        if (event.active.id && event.over?.id && event.active.data.current && event.over.data.current) {
            const updatedCr = event.over.data.current
            updatedCr.videoEndcardPath = event.active.data.current.creativePath
            updatedCr.videoEndcardSize = event.active.data.current.creativeSize
            setValue("selectedCrList", {
                ...creativeList,
                [event.over.id]: {
                    ...creativeList[event.over.id],
                    isEndCard: 1,
                    videoEndcardPath: event.active.data.current.creativePath,
                    videoEndcardSize: event.active.data.current.creativeSize
                }
            })
        }
    }

    return (
        <Card className='p-4'>
            {isEdit ? <>
                {creativeIdList.map(key => {
                    return creativeList[key].videoEndcardPath ? <div key={key}>
                        <div className='w-72 h-72 p-1 flex justify-center items-center rounded-lg cursor-pointer h-42 w-42 bg-slate-100 dark:bg-slate-700 relative'>
                            <img src={creativeList[key].videoEndcardPath as string} alt={creativeList[key].adName} className='object-contain max-h-full w-full' />
                        </div>
                        <div className='font-bold p-2'>EndCard File Details</div>
                        <div className='px-2'>{getCreativeDetails(creativeList[key].videoEndcardPath as string, 'FILENAME')}</div>
                        <div className='flex items-center text-sm'>
                            <Image
                                src={getCreativeType(creativeList[key].creativeSize || '') === "PORTRAIT" ? Portrait_Image : Landscape_Image}
                                alt={getCreativeDetails(creativeList[key].videoEndcardPath as string, 'FILENAME') || ''}
                                width="0"
                                height="0"
                                style={{ width: '3%', height: 'auto' }}
                            />
                            {creativeList[key].videoEndcardSize}
                        </div>
                    </div> : <div key={key} className='border-2 text-center h-72 content-center'>
                        <AlertCircle size={52} className='mx-auto my-2' />
                        <div className='my-2'>This video does not have an end card attached.</div>
                        <div className='my-2'>Although it is not mandatory to attach an End Card, it is highly recommended for most of the campaigns.</div>
                        <div className='my-2'>
                            <Button size="sm" type='button' {...getRootProps()} className='border p-2 rounded-md cursor-pointer'>
                                <input {...getInputProps()} />
                                <Upload className='opacity-70 mr-2' size={22} />Upload EndCard
                            </Button>
                        </div>
                    </div>
                })}
            </> : <DndContext onDragEnd={handleDragEnd}>
                {error.length > 0 && <div className='text-red-500 py-1'>{error.map(v => v)}</div>}
                <div className='my-2'>
                    <div className='flex justify-between'>
                        <div className='p-3 text-md font-semibold'>Selected Files</div>
                        <div className='p-3 flex'>
                            <FilterDialog fetchPrevUploadedCreatives={fetchPrevUploadedCreatives} creativeType={creativeType} />
                            <Button size="sm" type='button' {...getRootProps()} className='border p-2 rounded-md cursor-pointer'>
                                <input {...getInputProps()} />
                                <Upload className='opacity-70 mr-2' size={22} />Upload Files
                            </Button>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        {creativeIdList.map(key => {
                            return (
                                <Droppable key={key} id={key} data={creativeList[key]}>
                                    <span className='m-3 w-24 h-24 bg-slate-200 dark:bg-slate-800 flex items-center justify-center cursor-pointer relative'>
                                        <ThumbnailGenerator videoFile={creativeList[key].videoThumbnail} className='object-contain max-h-full max-w-full opacity-50' />
                                        <div className='absolute h-20 w-20 bg-white dark:bg-slate-800 text-xs top-10 border-2 left-10 text-center content-center opacity-80'>
                                            {creativeList[key].videoEndcardPath ? <>
                                                <img src={creativeList[key].videoEndcardPath as string} alt={creativeList[key].adName} className="object-contain max-h-full max-w-full mx-auto" />
                                            </> : <>
                                                Drag to Attach
                                                <Copy size={12} className='mx-auto my-2' />
                                            </>}
                                        </div>
                                    </span>
                                </Droppable>
                            )
                        })}
                    </div>
                </div>
                <ScrollArea className="h-[500px] my-4">
                    <div className='grid grid-cols-5 space-x-2'>
                        {prevUploadedCreatives.map((creative) => (
                            <Tooltip key={creative.id}>
                                <TooltipTrigger asChild>
                                    <Draggable id={creative.id} data={creative}>
                                        <div className='w-56 h-56 p-1 bg-slate-300 dark:bg-slate-700 m-4 flex justify-center items-center rounded-lg relative cursor-pointer'>
                                            <img src={creative.creativePath as string} alt={creative.adName} className="object-contain max-h-full max-w-full" />
                                        </div>
                                    </Draggable>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {creative.creativeSize}
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                </ScrollArea>
            </DndContext>}
            <CardFooter className='flex items-center justify-between mt-5'>
                <Button type='button' onClick={() => router.push('/creatives')}><X size={14} className='mr-2' /> CANCEL</Button>
                <div className='flex gap-2'>
                    <Button type='button' onClick={() => setTab("selectFiles")}><ArrowLeft size={14} className='mr-1' /> PREVIOUS</Button>
                    {creativeList[creativeIdList[0]].videoEndcardPath ? <Button type='button' onClick={() => setTab("editDetails")}>NEXT<ArrowRight size={14} className='ml-1' /></Button> : <EndCardModal onConfirm={() => setTab("editDetails")} />}
                </div>
            </CardFooter>
        </Card>
    )
}
