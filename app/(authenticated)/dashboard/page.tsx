import React from 'react'

import { LayoutDashboard } from 'lucide-react'
import { Card } from '@/components/ui/card'
import AreaChart from '@/components/utility/customComponents/AreaChart'

const data = {
    "2024-04-15": 10.0,
    "2024-04-16": 20.0,
    "2024-04-17": 5.0,
    "2024-04-18": 50.0,
    "2024-04-19": 40.0,
    "2024-04-20": 80.0,
    "2024-04-21": 90.0
}

export default function pages() {
    return (
        <div>
            <div className='font-bold mb-4 text-2xl flex items-center'>
                <LayoutDashboard size={20} className='mr-1' /> Dashboard
            </div>

            <Card className='min-h-96 p-4'>
                <div className='grid grid-cols-4 gap-2'>
                    <div className='col-span-1 flex justify-center'>
                        <AreaChart data={data} />
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
