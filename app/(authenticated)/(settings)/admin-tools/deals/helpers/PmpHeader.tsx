import { Button } from '@/components/ui/button'
import { Plus, Pocket } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function PmpHeader() {
    return (
        <>
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Pocket size={26} className='mr-1' /> PMP Deals
                </div>

                <div>
                    <Link href="/admin-tools/deals/create">
                        <Button size="sm" className='mr-2'>
                            <Plus size={20} className='mr-1' />Create
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}
