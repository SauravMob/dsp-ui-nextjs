import ThumbnailGenerator from '@/app/(authenticated)/(assets)/creatives/[...slug]/helpers/creativeUtils/ThumbnailGenerator'
import { fetchAllCreatives, searchCreative } from '@/app/(authenticated)/(assets)/creatives/actions'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { HtmlSanitized } from '@/components/utility/utils/JSXUtils'
import { CheckCircle, PlusCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CreativeFilterModal from '../modals/CreativeFilterModal'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CampaignFormType } from '../CampaignForm'
import { UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'

export default function ExistingCreativesModal({
    open,
    setOpen,
    form
}: {
    open: boolean
    setOpen: (input: boolean) => void
    form: UseFormReturn<CampaignFormType, any, undefined>
}) {

    const { setValue, watch, getValues } = form
    const selectedCreatives = watch("creativeId").map(v => v.id)

    const [crList, setCrList] = useState<CreativeType[]>([])

    const fetchCreativesList = async () => {
        const result = await fetchAllCreatives({ pageNo: '0', pageSize: "50", userid: getValues("userId").toString() })
        setCrList(result.content)
    }

    const fetchPrevUploadedCreatives = async (filter: { creativeId?: string, creativeSize?: string }) => {
        const response = await searchCreative({ pageNo: "0", pageSize: "100", filter })
        setCrList(response.content)
    }

    useEffect(() => {
        fetchCreativesList()
    }, [])

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger className='flex justify-start' asChild onClick={() => setOpen(!open)}>
                <Button type='button'>
                    <PlusCircle size={17} className='mr-2' />Attach Existing Creatives
                </Button>
            </DialogTrigger>
            <DialogContent className='min-w-[1200px] h-[600px]'>
                <DialogHeader>
                    <DialogTitle>Select Creatives</DialogTitle>
                    <DialogDescription className='flex justify-between'>
                        Search or select from below list.
                        <CreativeFilterModal fetchPrevUploadedCreatives={fetchPrevUploadedCreatives} />
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[400px] mb-4 pb-4">
                    <div className='grid grid-cols-5 gap-4'>
                        {crList.map(cr => (
                            <Tooltip key={cr.id}>
                                <div>
                                    <TooltipTrigger asChild>
                                        <div key={cr.id} className='w-44 h-44 p-1 bg-slate-300 dark:bg-slate-700 m-4 flex justify-center items-center rounded-lg relative cursor-pointer' onClick={() => {
                                            setValue("creativeId", [...watch("creativeId"), cr])
                                            form.clearErrors("creativeId")
                                        }}>
                                            {cr.creativeType === "BANNER" ? <>
                                                <img src={cr.creativePath as string} alt={cr.adName} className={cn(selectedCreatives.includes(cr.id) ? "opacity-50" : "", "object-contain max-h-full max-w-full")} />
                                            </> : cr.creativeType === "VIDEO" ? <>
                                                <ThumbnailGenerator videoFile={""} className={cn(selectedCreatives.includes(cr.id) ? "opacity-50" : "", "object-contain max-h-full w-full ")} />
                                            </> : <div className={cn(selectedCreatives.includes(cr.id) ? "opacity-50" : "", "object-contain max-h-full w-full ")}>
                                                <HtmlSanitized html={cr.rmaContent as string} />
                                            </div>}
                                            {selectedCreatives.includes(cr.id) && <div className="absolute inset-0 flex cursor-not-allowed justify-center items-center"><CheckCircle size={48} /></div>}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {cr.creativeSize}
                                    </TooltipContent>
                                    <div className='px-5 text-[12px]'>{cr.adName}</div>
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                </ScrollArea>
                <DialogFooter>
                    <DialogTrigger asChild onClick={() => setOpen(!open)}>
                        <Button>Done</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
