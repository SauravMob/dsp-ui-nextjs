"use client"

import { regexName } from '@/components/constants/regexConstants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { v4 as uuid } from 'uuid'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FileSelector from './steps/FileSelector'
import EditFiles from './steps/EditFiles'
import EditDetails from './steps/EditDetails'
import EndCard from './steps/EndCard'
import TrackersSchedulers from './steps/TrackersSchedulers'
import ReviewSave from './steps/ReviewSave'
import { getAdType } from '@/components/utility/utils/Utils'
import { createCreative, updateCreative } from '../../actions'
import { toast } from '@/components/ui/use-toast'

export type CreativeFormType = {
    selectedCrList: {
        [key: string]: {
            id: string
            skip: number
            userId: number
            adName: string
            adFormat: number
            secureTag: number
            advDomain: string
            protocols: string
            isEndCard: number
            eridToken: string
            createdOn: string
            campaignId: string
            rmaContent: string
            maxDuration: number
            redirectUrl: string
            fidelityType: number
            itunesAppId: string
            creativeType: string
            creativeSize: string
            creativePath: string
            apiFramework: number
            iabCategoryId: string
            videoMimeType: string
            iabAdAttribute: string
            playbackmethod: string
            thirdPartyPixel: string
            videoThumbnail: string
            videoImpTracking: string
            videoEndcardPath: string
            videoEndcardSize: string
            videoClkTracking: string
            videoCreativeSize: string
            sizes: {
                [key: string]: {
                    advDomain: string
                    secureTag: number
                    iabCategoryId: string
                    iabAdAttribute: string
                    thirdPartyPixel: string
                }
            } | null
        }
    }
}

export default function CreativeForm({
    isEdit,
    editData,
    userId,
    isAdmin,
    creativeType
}: {
    isEdit: boolean,
    editData: CreativeType,
    userId: number,
    isAdmin: boolean,
    creativeType: string
}) {

    const router = useRouter()
    const uniqueId = uuid()

    const [tab, setTab] = useState<string>("selectFiles")

    const formSchema = z.object({
        selectedCrList: z.object({
            [isEdit ? editData.id : uniqueId]: z.object({
                id: z.number(),
                skip: z.number(),
                userId: z.number(),
                adName: z.string(),
                adFormat: z.number(),
                advDomain: z.string(),
                secureTag: z.number(),
                protocols: z.string(),
                isEndCard: z.number(),
                eridToken: z.string(),
                createdOn: z.string(),
                campaignId: z.string(),
                rmaContent: z.string(),
                maxDuration: z.number(),
                redirectUrl: z.string(),
                fidelityType: z.number(),
                itunesAppId: z.string(),
                creativeType: z.string(),
                creativeSize: z.string(),
                creativePath: z.string(),
                apiFramework: z.number(),
                iabCategoryId: z.string(),
                videoMimeType: z.string(),
                iabAdAttribute: z.string(),
                playbackMethod: z.string(),
                thirdPartyPixel: z.string(),
                videoThumbnail: z.string(),
                videoImpTracking: z.string(),
                videoEndcardPath: z.string(),
                videoEndcardSize: z.string(),
                videoClkTracking: z.string(),
                videoCreativeSize: z.string(),
                sizes: z.record(z.string(), z.object({
                    advDomain: z.string(),
                    secureTag: z.number(),
                    iabCategoryId: z.string(),
                    iabAdAttribute: z.string(),
                    thirdPartyPixel: z.string()
                }))
            })
        })
    })

    const form = useForm<CreativeFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit ? {
            selectedCrList: {
                [editData.id]: {
                    id: editData.id,
                    skip: editData.skip,
                    userId: editData.userId,
                    adName: editData.adName,
                    adFormat: editData.adFormat,
                    advDomain: editData.advDomain,
                    secureTag: editData.secureTag,
                    protocols: editData.protocols,
                    isEndCard: editData.isEndcard,
                    eridToken: editData.eridToken,
                    createdOn: editData.createdOn,
                    campaignId: editData.campaigns ? editData.campaigns.map(v => v.id).join(",") : "",
                    rmaContent: editData.rmaContent,
                    maxDuration: editData.maxDuration,
                    redirectUrl: editData.redirectUrl,
                    fidelityType: editData.fidelityType,
                    itunesAppId: editData.itunesAppId,
                    creativeType: editData.creativeType,
                    creativeSize: editData.creativeSize,
                    creativePath: editData.creativePath,
                    apiFramework: editData.apiFramework,
                    iabCategoryId: editData.iabCategoryId,
                    videoMimeType: editData.videoMimeType,
                    iabAdAttribute: editData.iabAdAttribute,
                    playbackmethod: editData.playbackmethod,
                    thirdPartyPixel: editData.thirdPartyPixel,
                    videoThumbnail: "",
                    videoImpTracking: editData.videoImpTracking,
                    videoEndcardPath: editData.videoEndcardPath,
                    videoEndcardSize: editData.videoEndcardSize,
                    videoClkTracking: editData.videoClkTracking,
                    videoCreativeSize: editData.videoCreativeSize,
                    sizes: creativeType === "RICHMEDIA" ? {
                        [`${editData.creativeSize}`]: {
                            advDomain: editData.advDomain,
                            secureTag: editData.secureTag,
                            iabCategoryId: editData.iabCategoryId,
                            iabAdAttribute: editData.iabAdAttribute ? editData.iabAdAttribute : "0",
                            thirdPartyPixel: editData.thirdPartyPixel ? editData.thirdPartyPixel : ""
                        }
                    } : null
                }
            }
        } : { selectedCrList: {} }
    })

    const onSubmit: SubmitHandler<CreativeFormType> = async (values: CreativeFormType) => {
        const selectedCreatives = values.selectedCrList
        let crArr: CreativeType[] = []
        if (isEdit) {
            Object.keys(selectedCreatives).map(cr => {
                if (creativeType === "VIDEO") {
                    const obj: CreativeType = {
                        id: selectedCreatives[cr].id,
                        adName: selectedCreatives[cr].adName,
                        advDomain: selectedCreatives[cr].advDomain,
                        secureTag: 1,
                        userId: selectedCreatives[cr].userId,
                        advertiserId: selectedCreatives[cr].userId,
                        approvedOn: new Date().toISOString(),
                        bannerAdtype: getAdType(creativeType),
                        creativeType,
                        creativeSize: selectedCreatives[cr].creativeSize,
                        videoCreativeSize: selectedCreatives[cr].creativeSize,
                        creativePath: selectedCreatives[cr].creativePath,
                        iabAdAttribute: selectedCreatives[cr].iabAdAttribute,
                        iabCategoryId: selectedCreatives[cr].iabCategoryId,
                        videoMimeType: selectedCreatives[cr].videoMimeType,
                        apiFramework: selectedCreatives[cr].apiFramework,
                        protocols: selectedCreatives[cr].protocols,
                        playbackmethod: "1,2,3",
                        maxDuration: selectedCreatives[cr].maxDuration,
                        adPosition: "0,1,3,4,5,6,7",
                        skip: 1,
                        status: "INACTIVE",
                        createdOn: selectedCreatives[cr].createdOn,
                        campaignId: selectedCreatives[cr].campaignId,
                        videoImpTracking: selectedCreatives[cr].videoImpTracking,
                        videoClkTracking: selectedCreatives[cr].videoClkTracking,
                        thirdPartyPixel: selectedCreatives[cr].thirdPartyPixel,
                        adFormat: selectedCreatives[cr].adFormat,
                        videoEndcardPath: selectedCreatives[cr].videoEndcardPath,
                        videoEndcardSize: selectedCreatives[cr].videoEndcardSize,
                        isEndcard: selectedCreatives[cr].isEndCard
                    }
                    crArr = [obj]
                } else if (creativeType === "BANNER") {
                    const obj: CreativeType = {
                        id: selectedCreatives[cr].id,
                        adName: selectedCreatives[cr].adName,
                        advDomain: selectedCreatives[cr].advDomain,
                        redirectUrl: selectedCreatives[cr].redirectUrl,
                        thirdPartyPixel: selectedCreatives[cr].thirdPartyPixel,
                        secureTag: selectedCreatives[cr].secureTag,
                        userId: selectedCreatives[cr].userId,
                        advertiserId: selectedCreatives[cr].userId,
                        approvedOn: new Date().toISOString(),
                        status: "INACTIVE",
                        bannerAdtype: getAdType(creativeType),
                        creativeType,
                        creativeSize: selectedCreatives[cr].creativeSize,
                        creativePath: selectedCreatives[cr].creativePath,
                        campaignId: selectedCreatives[cr].campaignId,
                        createdOn: selectedCreatives[cr].createdOn,
                        iabAdAttribute: selectedCreatives[cr].iabAdAttribute,
                        iabCategoryId: selectedCreatives[cr].iabCategoryId,
                        videoCreativeSize: "NA",
                        adFormat: selectedCreatives[cr].adFormat,
                        videoImpTracking: selectedCreatives[cr].videoImpTracking
                    }
                    crArr = [obj]
                } else if (creativeType === "RICHMEDIA") {
                    Object.keys(selectedCreatives[cr].sizes ?? {}).map(size => {
                        const obj: CreativeType = {
                            id: selectedCreatives[cr].id,
                            adName: selectedCreatives[cr].adName,
                            advDomain: selectedCreatives[cr].sizes?.[size].advDomain,
                            rmaContent: selectedCreatives[cr].rmaContent,
                            secureTag: selectedCreatives[cr].sizes?.[size].secureTag,
                            userId: selectedCreatives[cr].userId,
                            advertiserId: selectedCreatives[cr].userId,
                            approvedOn: new Date().toISOString(),
                            status: "INACTIVE",
                            bannerAdtype: getAdType(creativeType),
                            creativeType: "JS",
                            creativeSize: size,
                            creativePath: selectedCreatives[cr].creativePath,
                            campaignId: selectedCreatives[cr].campaignId,
                            createdOn: selectedCreatives[cr].createdOn,
                            iabAdAttribute: selectedCreatives[cr].sizes?.[size].iabAdAttribute,
                            iabCategoryId: selectedCreatives[cr].sizes?.[size].iabCategoryId,
                            videoCreativeSize: "NA",
                            thirdPartyPixel: selectedCreatives[cr].sizes?.[size].thirdPartyPixel,
                            apiFramework: selectedCreatives[cr].adFormat,
                            adFormat: 0
                        }
                        crArr = [obj]
                    })
                }
            })
            const result = await updateCreative(crArr[0].id, crArr[0])
            if (result?.status === 200) {
                router.push("/creatives")
                toast({ title: `Updated creative`, description: `Creative updated successfully` })
            } else toast({ title: `Error while updating creative`, description: `Couldn't update creative` })
            router.refresh()
        } else {
            Object.keys(selectedCreatives).map(cr => {
                if (creativeType === "VIDEO") {
                    const obj: CreativeType = {
                        id: "0",
                        adName: selectedCreatives[cr].adName,
                        advDomain: selectedCreatives[cr].advDomain,
                        secureTag: 1,
                        userId: selectedCreatives[cr].userId,
                        advertiserId: selectedCreatives[cr].userId,
                        approvedOn: new Date().toISOString(),
                        status: "INACTIVE",
                        bannerAdtype: getAdType(creativeType),
                        creativeType,
                        creativeSize: selectedCreatives[cr].creativeSize,
                        videoCreativeSize: selectedCreatives[cr].creativeSize,
                        creativePath: selectedCreatives[cr].creativePath,
                        iabAdAttribute: selectedCreatives[cr].iabAdAttribute,
                        iabCategoryId: selectedCreatives[cr].iabCategoryId,
                        videoMimeType: selectedCreatives[cr].videoMimeType,
                        adPosition: "0,1,3,4,5,6,7",
                        skip: 1,
                        protocols: selectedCreatives[cr].protocols,
                        playbackmethod: "1,2,3",
                        maxDuration: selectedCreatives[cr].maxDuration,
                        videoImpTracking: selectedCreatives[cr].videoImpTracking,
                        videoClkTracking: selectedCreatives[cr].videoClkTracking,
                        thirdPartyPixel: selectedCreatives[cr].thirdPartyPixel,
                        apiFramework: selectedCreatives[cr].apiFramework,
                        adFormat: selectedCreatives[cr].adFormat,
                        videoEndcardPath: selectedCreatives[cr].videoEndcardPath,
                        videoEndcardSize: selectedCreatives[cr].videoEndcardSize,
                        isEndcard: selectedCreatives[cr].isEndCard
                    }
                    crArr = [...crArr, obj]
                } else if (creativeType === "BANNER") {
                    const obj: CreativeType = {
                        id: "0",
                        adName: selectedCreatives[cr].adName,
                        advDomain: selectedCreatives[cr].advDomain,
                        redirectUrl: selectedCreatives[cr].redirectUrl,
                        thirdPartyPixel: selectedCreatives[cr].thirdPartyPixel,
                        secureTag: selectedCreatives[cr].secureTag,
                        userId: selectedCreatives[cr].userId,
                        advertiserId: selectedCreatives[cr].userId,
                        approvedOn: new Date().toISOString(),
                        status: "INACTIVE",
                        bannerAdtype: getAdType(creativeType),
                        creativeType,
                        creativeSize: selectedCreatives[cr].creativeSize,
                        creativePath: selectedCreatives[cr].creativePath,
                        iabAdAttribute: selectedCreatives[cr].iabAdAttribute,
                        iabCategoryId: selectedCreatives[cr].iabCategoryId,
                        videoCreativeSize: "NA",
                        adFormat: selectedCreatives[cr].adFormat,
                        videoImpTracking: selectedCreatives[cr].videoImpTracking
                    }
                    crArr = [...crArr, obj]
                } else if (creativeType === "RICHMEDIA") {
                    Object.keys(selectedCreatives[cr].sizes ?? {}).map(size => {
                        const obj: CreativeType = {
                            id: "0",
                            adName: selectedCreatives[cr].adName,
                            advDomain: selectedCreatives[cr].sizes?.[size].advDomain,
                            rmaContent: selectedCreatives[cr].rmaContent,
                            secureTag: selectedCreatives[cr].sizes?.[size].secureTag,
                            userId: selectedCreatives[cr].userId,
                            advertiserId: selectedCreatives[cr].userId,
                            approvedOn: new Date().toISOString(),
                            status: "INACTIVE",
                            bannerAdtype: getAdType(creativeType),
                            creativeType: "JS",
                            creativeSize: size,
                            creativePath: selectedCreatives[cr].creativePath,
                            iabAdAttribute: selectedCreatives[cr].sizes?.[size].iabAdAttribute,
                            iabCategoryId: selectedCreatives[cr].sizes?.[size].iabCategoryId,
                            videoCreativeSize: "NA",
                            thirdPartyPixel: selectedCreatives[cr].sizes?.[size].thirdPartyPixel,
                            apiFramework: selectedCreatives[cr].adFormat,
                            adFormat: 0
                        }
                        crArr = [...crArr, obj]
                    })
                }
            })
            const result = await createCreative(crArr)
            if (result?.status === 200) {
                router.push("/creatives")
                toast({ title: `Created creative`, description: `Creative created successfully` })
            } else toast({ title: `Error while creating creative`, description: `Couldn't create creative` })
            router.refresh()
        }
    }

    return (
        <Tabs value={tab} onValueChange={setTab}>
            <TabsList className='w-full justify-between'>
                <TabsTrigger value="selectFiles" className='w-full' disabled={!isEdit}> {isEdit ? "Edit Files" : "Select Files"} </TabsTrigger>
                {creativeType === "VIDEO" && <TabsTrigger value="endCard" className='w-full' disabled={!isEdit}>Add and End Card</TabsTrigger>}
                <TabsTrigger value="editDetails" className='w-full' disabled={!isEdit}>Edit Details</TabsTrigger>
                <TabsTrigger value="trackersSchedulers" className='w-full' disabled={!isEdit}>Trackers And Schedule</TabsTrigger>
                <TabsTrigger value="reviewSave" className='w-full' disabled={!isEdit}>Review and Save</TabsTrigger>
            </TabsList>

            <TabsContent value="selectFiles">
                {isEdit ? <EditFiles form={form} creativeType={creativeType} setTab={setTab} /> : <FileSelector creativeType={creativeType} form={form} userId={userId} setTab={setTab} />}
            </TabsContent>
            <TabsContent value="endCard">
                <EndCard form={form} userId={userId} creativeType={creativeType} setTab={setTab} isEdit={isEdit} />
            </TabsContent>
            <TabsContent value="editDetails">
                <EditDetails isEdit={isEdit} parentForm={form} creativeType={creativeType} setTab={setTab} />
            </TabsContent>
            <TabsContent value="trackersSchedulers">
                <TrackersSchedulers parentForm={form} creativeType={creativeType} setTab={setTab} isEdit={isEdit} />
            </TabsContent>
            <TabsContent value="reviewSave">
                <ReviewSave parentForm={form} creativeType={creativeType} setTab={setTab} isEdit={isEdit} onSubmit={onSubmit} />
            </TabsContent>
        </Tabs>
    )
}
