import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertCircle, ArrowRight } from 'lucide-react'
import React from 'react'

export default function EndCardModal({ onConfirm }: { onConfirm: () => void }) {
    return <Dialog>
        <DialogTrigger className='flex' asChild>
            <Button type='button'>NEXT<ArrowRight size={14} className='ml-1' /></Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className='flex items-center'>
                    <AlertCircle size={56} className='mr-4'/>
                    Video does not have an end card
                </DialogTitle>
            </DialogHeader>
            <DialogDescription>
                Although it is not mandatory to attach an End Card, it is highly recommended for better campaign performance.
            </DialogDescription>
            <DialogFooter>
                <DialogTrigger asChild>
                    <Button variant='outline' size="sm">GO BACK</Button>
                </DialogTrigger>
                <DialogTrigger asChild>
                    <Button type='button' size="sm" onClick={() => onConfirm()}>CONFIRM</Button>
                </DialogTrigger>
            </DialogFooter>
        </DialogContent>
    </Dialog >
}
