'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AutoComplete, MultiSelectInput } from '@/components/utility/customComponents/SelectInput'
import { adSizeOptions, landscapeSizes, orientationOptions, portraitSizes } from '@/components/utility/utils/Utils'
import { Filter } from 'lucide-react'
import { fetchCreativeIdNameList } from '../../../actions'

export const FilterDialog = ({
    fetchPrevUploadedCreatives,
    creativeType
}: {
    fetchPrevUploadedCreatives: (filter: { creativeType: string, creativeId?: string, creativeSize?: string }) => Promise<any>
    creativeType: string
}) => {

    const [customOrientation, setCustomOrientation] = useState<string[]>([])
    const [customAdSize, setCustomAdSize] = useState<string[]>([])
    const [customCreative, setCustomCreative] = useState<string>('')
    const [creativeOptions, setCreativeOptions] = useState<{ value: string, label: string }[]>([])

    const creativeFilter = async (inputValue: string) => {
        const fetch = await fetchCreativeIdNameList(inputValue)
        const options = !parseInt(inputValue) ? fetch.map((v: { id: string, name: string }) => ({ value: v.id, label: v.name })) : fetch.content.map((v: { id: number, creativeName: string }) => ({ value: v.id.toString(), label: v.creativeName }))
        setCreativeOptions(options)
        return options
    }

    return <Dialog>
        <DialogTrigger className='flex' asChild>
            <Button size="sm" className='mr-2'>
                <Filter size={20} className='mr-1' />Filters
            </Button>
        </DialogTrigger>
        <DialogContent className='min-w-[600px]'>
            <DialogHeader>
                <DialogTitle>Select filters for creative</DialogTitle>
            </DialogHeader>
            <MultiSelectInput
                placeholder="Orientation"
                isClearable={true}
                isSearchable={true}
                name="orientation"
                value={orientationOptions.filter(v => customOrientation.includes(v.value))}
                options={orientationOptions}
                onChange={(e) => {
                    setCustomOrientation(e?.length ? e.map(v => v.value) : [])
                    const updatedSizes = []
                    if (e?.map(v => v.value).includes("landscape")) updatedSizes.push(...landscapeSizes.split(","))
                    if (e?.map(v => v.value).includes("portrait")) updatedSizes.push(...portraitSizes.split(","))
                    setCustomAdSize(updatedSizes)
                }}
            />
            <MultiSelectInput
                placeholder="Ad Size"
                isClearable={true}
                isSearchable={true}
                name="adSize"
                isDisabled={customOrientation.length !== 0}
                value={customOrientation.length === 0 ? adSizeOptions.filter(v => customAdSize.includes(v.value)) : []}
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
                    <Button type='button' onClick={() => fetchPrevUploadedCreatives({ creativeType, creativeId: customCreative, creativeSize: customAdSize.join(",") })}>SUBMIT</Button>
                </DialogTrigger>
            </DialogFooter>
        </DialogContent>
    </Dialog >
}