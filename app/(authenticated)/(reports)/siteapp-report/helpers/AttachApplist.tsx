"use client"

import { getAllApplists, updateApp } from '@/app/(authenticated)/(assets)/applists/actions'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from '@/components/ui/use-toast'
import { Separator } from '@radix-ui/react-select'
import { Paperclip } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function AttachApplist({
    siteApp
}: {
    siteApp: SiteAppReportType
}) {

    const [applist, setApplist] = useState<ApplistType[]>([])

    useEffect(() => {
        const fetchApp = async () => {
            const result = await getAllApplists({ pageNo: '0', pageSize: '512', status: "ACTIVE" })
            setApplist(result.content)
        }
        fetchApp()
    }, [])

    const attachApplist = async (appId: number) => {
        const selectedApp = applist.filter(v => v.id === appId)[0]
        selectedApp.bundles = selectedApp.bundles.concat(`, ${siteApp.bundleId}`)
        const result = await updateApp(appId, selectedApp)
        if (result.status === 200) toast({ title: `Updated Successfully`, description: `Sucessfully updated ${selectedApp.name} app` })
        else toast({ title: `Error occured`, description: result.message })
    }

    return (
        <Dialog>
            <DialogTrigger className='flex justify-start' asChild>
                <Button variant="ghost" size="sm" className='justify-start w-full'>
                    <Paperclip size={18} className='mr-2' />White/Black List Bundles
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>WhiteList / BlackList Bundles</DialogTitle>
                    <DialogDescription>Select an app to attach to the siteapp</DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-72 rounded-md border">
                    <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">Select Applist</h4>
                        {applist.map((app) => (
                            <div key={app.id}>
                                <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" key={app.id} className='w-full' onClick={() => attachApplist(app.id)}>
                                        {app.name}
                                    </Button>
                                </DialogTrigger>
                                <Separator className="my-2" />
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button>Cancel</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
