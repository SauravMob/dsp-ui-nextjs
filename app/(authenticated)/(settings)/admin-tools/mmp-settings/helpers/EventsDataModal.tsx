import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Eye } from 'lucide-react'
import React from 'react'

export default function EventsDataModal({ row, type }: { row: MmpSettingType, type: "EVENTS" | "BUNDLE" }) {

    const dataJson = type === "EVENTS" && row.mmpEvents ? JSON.parse(row.mmpEvents) : type === "BUNDLE" && row.suppressedData ? JSON.parse(row.suppressedData) : {}
    const dataArray = Object.keys(dataJson)

    return (
        <Dialog>
            <DialogTrigger className='flex justify-start' asChild>
                <Button variant="ghost" disabled={(type === "EVENTS" && !row.mmpEvents) || (type === "BUNDLE" && !row.suppressedData)} size="sm" className={cn('justify-start w-full', type === "EVENTS" && row.mmpEvents && 'bg-green-200 dark:text-black', type === "BUNDLE" && row.suppressedData && 'bg-green-200 dark:text-black')}><Eye size={18} className='mr-2' />Expand</Button>
            </DialogTrigger>
            <DialogContent className='max-w-[1200px] max-h-full overflow-auto'>
                <DialogHeader>
                    <DialogTitle>{row.bundle} ({row.id})</DialogTitle>
                    <DialogDescription>{type === "EVENTS" ? "MMP Events" : "MMP Bundle"}</DialogDescription>
                </DialogHeader>

                {type === "EVENTS" && dataArray.map((v, k) => {
                    return <div key={k}>
                        <div className='grid grid-cols-3'>
                            <div className='col-span-1'>Event</div>
                            <div className='col-span-2'>{v}</div>
                        </div>
                        {dataJson[v].url && <div className='grid grid-cols-3'>
                            <div className='col-span-1'>URL (Primary)</div>
                            <div className='col-span-2 break-words'>{dataJson[v].url}</div>
                        </div>}
                        {dataJson[v].secondaryUrl && <div className='grid grid-cols-3'>
                            <div className='col-span-1'>URL (Secondary)</div>
                            <div className='col-span-2 break-words'>{dataJson[v].secondaryUrl}</div>
                        </div>}
                        {dataJson[v].isDay && <div className='grid grid-cols-3'>
                            <div className='col-span-1'>isDay</div>
                            <div className='col-span-2'>{dataJson[v].isDay}</div>
                        </div>}
                        {dataJson[v].isMin && <div className='grid grid-cols-3'>
                            <div className='col-span-1'>isDay</div>
                            <div className='col-span-2'>{dataJson[v].isMin}</div>
                        </div>}
                    </div>
                })}

                {type === "BUNDLE" && dataArray.map((v, k) => {
                    return <div key={k}>
                        <div className='grid grid-cols-3'>
                            <div className='col-span-1'>Bundle</div>
                            <div className='col-span-2'>{v}</div>
                        </div>
                        <div className='grid grid-cols-3'>
                            <div className='col-span-1'>Event</div>
                            <div className='col-span-2'>{dataJson[v].map((eve: string, k: number) => {
                                return k === dataJson[v].length - 1 ? eve : `${eve}, `
                            })}</div>
                        </div>
                    </div>
                })}

                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button>Close</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
