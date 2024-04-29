import { deleteAttachedCampaigns } from '@/app/(authenticated)/(assets)/creatives/actions'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { MultiSelectInput } from '@/components/utility/customComponents/SelectInput'
import { PopoverClose } from '@radix-ui/react-popover'
import { MinusCircle } from 'lucide-react'
import React, { useMemo, useState } from 'react'

export default function DetachCampaign({
    creative
}: {
    creative: CreativeType
}) {

    const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])
    const campaignOptions = useMemo<{ value: string, label: string }[]>(() => creative.campaigns?.length ? creative.campaigns.map((v: { id: number, name: string }) => ({ value: v.id.toString(), label: v.name })) : [], [creative])

    const onSubmit = async () => {
        const result = await deleteAttachedCampaigns(creative.id, creative.userId, selectedCampaigns.join(","))
        if (result.status === 200) toast({ title: `Updated Successfully`, description: `Sucessfully attached campaign to ${creative.adName} creative` })
        else toast({ title: `Error occured`, description: result.message })
    }

    return (
        <Dialog>
            <DialogTrigger className='flex justify-start' asChild>
                <Button variant="ghost" size="sm" className='justify-start w-full'>
                    <MinusCircle size={18} className='mr-2' />Detach Campaign
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detach from Campaigns</DialogTitle>
                    <DialogDescription>Displaying campaigns for the creative "{creative.adName}"</DialogDescription>
                </DialogHeader>
                <MultiSelectInput
                    placeholder="Select campaigns to detach"
                    isClearable={true}
                    isSearchable={true}
                    name="campaign"
                    value={campaignOptions.filter(v => selectedCampaigns.includes(`${v.value}`))}
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
