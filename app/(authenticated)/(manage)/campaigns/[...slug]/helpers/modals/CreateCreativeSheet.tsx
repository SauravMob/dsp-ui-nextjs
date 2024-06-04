import CreativeForm from '@/app/(authenticated)/(assets)/creatives/[...slug]/helpers/CreativeForm'
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet'
import Link from 'next/link'
import React from 'react'

export default function CreateCreativeSheet({
    open,
    creativeType,
    setOpen,
    userId,
    creativeCampaign
}: {
    open: boolean
    creativeType: string
    setOpen: (input: boolean) => void
    userId: number
    creativeCampaign: (cr: CreativeType[]) => void
}) {
    return (
        <Sheet open={open} onOpenChange={() => setOpen(!open)}>
            <SheetContent className="w-[1200px] sm:max-w-full overflow-y-auto">
                <CreativeForm
                    isEdit={false}
                    isAdmin={false}
                    userId={userId}
                    editData={null}
                    creativeType={creativeType}
                    setOpen={setOpen}
                    creativeCampaign={creativeCampaign}
                />
            </SheetContent>
        </Sheet>
    )
}
