import { fetchCreativeIdNameList } from '@/app/(authenticated)/(assets)/creatives/actions'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AutoComplete, MultiSelectInput } from '@/components/utility/customComponents/SelectInput'
import { adSizeOptions } from '@/components/utility/utils/Utils'
import { Filter } from 'lucide-react'
import React, { useState } from 'react'

export default function CreativeFilterModal({
    fetchPrevUploadedCreatives
}: {
    fetchPrevUploadedCreatives: (filter: { creativeId?: string, creativeSize?: string }) => Promise<any>
}) {

    const [customAdSize, setCustomAdSize] = useState<string[]>([])
    const [customCreative, setCustomCreative] = useState<string>('')
    const [creativeOptions, setCreativeOptions] = useState<{ value: string, label: string }[]>([])

    const creativeFilter = async (inputValue: string) => {
        const fetch = await fetchCreativeIdNameList(inputValue)
        const options = !parseInt(inputValue) ? fetch.map((v: { id: string, name: string }) => ({ value: v.id, label: v.name })) : fetch.content.map((v: { id: number, creativeName: string }) => ({ value: v.id.toString(), label: v.creativeName }))
        setCreativeOptions(options)
        return options
    }

    return (
        <Dialog>
            <DialogTrigger className='flex justify-start' asChild>
                <Button size="sm" className='mr-2'>
                    <Filter size={17} className='mr-2' />Filters
                </Button>
            </DialogTrigger>
            <DialogContent className='min-w-[600px]'>
                <DialogHeader>
                    <DialogTitle>Select filters for creative</DialogTitle>
                </DialogHeader>
                <MultiSelectInput
                    placeholder="Ad Size"
                    isClearable={true}
                    isSearchable={true}
                    name="adSize"
                    value={adSizeOptions.filter(v => customAdSize.includes(v.value))}
                    options={adSizeOptions}
                    onChange={(e) => setCustomAdSize(e?.length ? e.map(v => v.value) : [])}
                />
                <AutoComplete
                    placeholder="Creatives..."
                    isClearable={true}
                    isSearchable={true}
                    name="creative"
                    value={creativeOptions.filter(v => v.value === customCreative)[0]}
                    loadOptions={creativeFilter}
                    onChange={(e) => setCustomCreative(e ? e.value : '')}
                />
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button>Cancel</Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                        <Button type='button' onClick={() => fetchPrevUploadedCreatives({ creativeId: customCreative, creativeSize: customAdSize.join(",") })}>Submit</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
