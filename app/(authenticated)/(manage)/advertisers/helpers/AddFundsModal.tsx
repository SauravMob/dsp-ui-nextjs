"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { PopoverClose } from '@radix-ui/react-popover'
import { DollarSign } from 'lucide-react'
import React, { useState } from 'react'
import { addFund } from '../actions'

export default function AddFundsModal({ row }: { row: AdvertiserType }) {

    const [amount, setAmount] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onSubmit = async () => {
        if (amount) await addFund({ amount, userId: row.userId })
        else setError("Please enter amount")
    }

    return (
        <Dialog>
            <DialogTrigger className='flex justify-start' asChild>
                <Button variant="ghost" size="sm" className='justify-start w-full'><DollarSign size={18} className='mr-2' />Add Funds</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{row.email} ({row.id})</DialogTitle>
                    <DialogDescription>Update funds</DialogDescription>
                </DialogHeader>
                <div>Amount</div>
                <div>
                    <Input
                        placeholder="Amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value)
                            setError(null)
                        }}
                    />
                    {error && <p className='text-red-800'>{error}</p>}
                </div>
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button>Cancel</Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                        <PopoverClose asChild>
                            <Button type="submit" onClick={onSubmit}>Update</Button>
                        </PopoverClose>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
