"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { ReactNode, useState } from 'react'
import Creative_Image from '@/public/creative_image.svg'
import Creative_Html from '@/public/creative_html.svg'
import Creative_Video from '@/public/creative_video.svg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CreateCreativeSheet from '@/app/(authenticated)/(manage)/campaigns/[...slug]/helpers/modals/CreateCreativeSheet'

export default function CreativeOptionsDialog({
    triggerComponent,
    bannerLink,
    richmediaLink,
    videoLink,
    userId,
    creativeCampaign
}: {
    triggerComponent: ReactNode
    bannerLink: string
    richmediaLink: string
    videoLink: string
    userId?: number
    creativeCampaign: (cr: CreativeType[]) => void
}) {

    const path = usePathname()
    const [open, setOpen] = useState(false)
    const [creativeType, setCreativeType] = useState("")

    return (
        <Dialog>
            <DialogTrigger className='flex justify-start' asChild>
                {triggerComponent}
            </DialogTrigger>
            <DialogContent className='min-w-[600px] min-h-[400px]'>
                <DialogHeader>
                    <DialogTitle>Select Creative Type</DialogTitle>
                    <DialogDescription>Create Creatives And Reuse Them In Your Campaigns</DialogDescription>
                </DialogHeader>
                <div className='grid grid-cols-3 space-x-4'>
                    <div className='bg-slate-200 dark:bg-slate-800 rounded-md'>
                        <Image
                            src={Creative_Image}
                            width="0"
                            height="0"
                            alt="Banner Creative Type"
                            priority
                            className='m-auto my-3'
                        />
                    </div>
                    <div className='bg-slate-200 dark:bg-slate-800 rounded-md'>
                        <Image
                            src={Creative_Html}
                            width="0"
                            height="0"
                            alt="HTML Creative Type"
                            priority
                            className='m-auto my-3'
                        />
                    </div>
                    <div className='bg-slate-200 dark:bg-slate-800 rounded-md'>
                        <Image
                            src={Creative_Video}
                            width="0"
                            height="0"
                            alt="Video Creative Type"
                            priority
                            className='m-auto my-3'
                        />
                    </div>
                </div>
                <div className='grid grid-cols-3 space-x-4'>
                    <div className='text-sm text-center'>
                        <Link href={bannerLink} onClick={() => {
                            if (path.includes("campaigns")) {
                                setOpen(true)
                                setCreativeType("BANNER")
                            }
                        }}>
                            <Button size="lg" className='w-full mb-2'>
                                IMAGE
                            </Button>
                        </Link>
                        Interstitial & Rewarded
                    </div>
                    <div className='text-sm text-center'>
                        <Link href={richmediaLink} onClick={() => {
                            if (path.includes("campaigns")) {
                                setOpen(true)
                                setCreativeType("RICHMEDIA")
                            }
                        }}>
                            <Button size="lg" className='w-full mb-2'>
                                HTML
                            </Button>
                        </Link>
                        Interstitial, Rewarded & Banner
                    </div>
                    <div className='text-sm text-center'>
                        <Link href={videoLink} onClick={() => {
                            if (path.includes("campaigns")) {
                                setOpen(true)
                                setCreativeType("VIDEO")
                            }
                        }}>
                            <Button size="lg" className='w-full mb-2'>
                                VIDEO
                            </Button>
                        </Link>
                        Interstitial & Banner
                    </div>
                </div>
                <CreateCreativeSheet open={open} setOpen={setOpen} creativeType={creativeType} userId={userId as number} creativeCampaign={creativeCampaign} />
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button>Cancel</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
