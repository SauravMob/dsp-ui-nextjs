import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Eye } from 'lucide-react'
import React from 'react'

export default function DataModal({ row }: { row: EventLogsType }) {
    const dataJson = row.modifiedFieldsJson ? JSON.parse(row.modifiedFieldsJson) : []
    return (
        <Dialog>
            <DialogTrigger className='flex justify-start' asChild>
                <Button variant="ghost" size="sm" className='justify-start w-full bg-green-200 dark:text-black'><Eye size={18} className='mr-2' />Expand</Button>
            </DialogTrigger>
            <DialogContent className='w-[1200px] max-w-[1200px]'>
                <DialogHeader>
                    <DialogTitle>{row.entityType} ({row.entityId})</DialogTitle>
                    <DialogDescription>Event type: {row.eventType}</DialogDescription>
                </DialogHeader>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-md font-medium p-3'>
                                Changed Field
                            </TableHead>
                            <TableHead className='text-md font-medium p-3'>
                                Old Value
                            </TableHead>
                            <TableHead className='text-md font-medium p-3'>
                                New Value
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataJson.map((v: { fn: string, ov: string, nv: string }, k: number) => {
                            return <TableRow key={k}>
                                <TableCell className='px-6'>{v.fn}</TableCell>
                                <TableCell>{v.ov}</TableCell>
                                <TableCell>{v.nv}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button>Close</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
