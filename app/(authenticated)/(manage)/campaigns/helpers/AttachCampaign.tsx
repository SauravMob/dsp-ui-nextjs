import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { fetchCreativeTargetedCampaigns, updateCreative } from '@/app/(authenticated)/(assets)/creatives/actions'
import { PopoverClose } from '@radix-ui/react-popover'
import { MultiSelectInput } from '@/components/utility/customComponents/SelectInput'
import { toast } from '@/components/ui/use-toast'

export default function AttachCampaign({
    creative
}: {
    creative: CreativeType
}) {

    const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])
    const [campaignOptions, setCampaignOptions] = useState<{ value: string, label: string }[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchCreativeTargetedCampaigns(creative)
            setCampaignOptions(res.map((v: { id: string, name: string }) => ({ value: v.id, label: v.name })))
        }
        fetchData()
    }, [])

    const onSubmit = async () => {
        const cr = { ...creative }
        cr["campaignId"] = selectedCampaigns.join(",")
        const result = await updateCreative(cr.id, cr)
        if (result.status === 200) toast({ title: `Updated Successfully`, description: `Sucessfully attached campaign to ${cr.adName} creative` })
        else toast({ title: `Error occured`, description: result.message })
    }

    return (
        <Dialog>
            <DialogTrigger className='flex justify-start' asChild>
                <Button variant="ghost" size="sm" className='justify-start w-full'>
                    <PlusCircle size={18} className='mr-2' />Attach Campaign
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Attach to additional Campaigns</DialogTitle>
                    <DialogDescription>Displaying campaigns for the creative "{creative.adName}"</DialogDescription>
                </DialogHeader>
                <MultiSelectInput
                    placeholder="Select campaigns to attach"
                    isClearable={true}
                    isSearchable={true}
                    name="campaign"
                    value={campaignOptions.filter(v => selectedCampaigns.includes(v.value))}
                    options={campaignOptions}
                    onChange={(e) => setSelectedCampaigns(e?.length ? e.map(v => v.value) : [])}
                />
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button>Back</Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                        <PopoverClose asChild>
                            <Button type="submit" onClick={onSubmit}>Continue</Button>
                        </PopoverClose>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
