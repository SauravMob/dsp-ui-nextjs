import React from 'react'

import { LayoutDashboard } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function pages() {
    return (
        <div>
            <div className='font-bold mb-4 text-2xl flex items-center'>
                <LayoutDashboard size={20} className='mr-1' /> Dashboard
            </div>

            <Card className='min-h-96 p-4'>
                <div className='grid grid-cols-4 gap-2'>
                    <div className='col-span-1 flex justify-center'>
                        Card1
                    </div>
                    <div className='col-span-1 flex justify-center'>
                        Card2
                    </div>
                    <div className='col-span-1 flex justify-center'>
                        Card3
                    </div>
                    <div className='col-span-1 flex justify-center'>
                        Card4
                    </div>
                </div>
            </Card>
        </div>
    )
}
