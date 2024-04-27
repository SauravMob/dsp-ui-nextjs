import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { ReactNode } from 'react'

export default function ConfirmDialog({
    buttonContent,
    title,
    description,
    onConfirm
}: {
    buttonContent: ReactNode,
    title: string,
    description: string,
    onConfirm: () => void
}) {
    return (
        <Dialog>
            <DialogTrigger className='flex justify-start' asChild>
                <Button variant="ghost" size="sm" className='justify-start w-full'>{buttonContent}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button>Back</Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                        <Button type="submit" onClick={onConfirm}>Continue</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
