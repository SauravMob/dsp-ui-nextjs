import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Code, Headphones } from 'lucide-react'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Mobavenue | Support",
    description: "Mobavenue DSP support"
}

export default function page() {
    return (
        <>
            <CustomBreadCrumb secondItem='Support' secondLink='/support' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Headphones size={26} className='mr-1' /> Support
                </div>

            </div>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='p-4'>
                                <div className='text-lg font-bold'>
                                    Help & Support
                                </div>
                                <div className='text-md'>
                                    You can reach out to the appropriate team for questions specific to your account:
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className='p-6'>
                                <div className='text-lg font-bold'>General Support</div>
                                support@mobavenue.com
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className='p-6'>
                                <div className='text-lg font-bold'>Publisher Platform Billing & Payment</div>
                                finance@mobavenue.com
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className='p-6'>
                                <div className='text-lg font-bold'>Policy Inquiries for Account Approval</div>
                                privacy@mobavenue.com
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </>
    )
}
