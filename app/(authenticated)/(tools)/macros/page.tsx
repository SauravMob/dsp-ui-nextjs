import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Code } from 'lucide-react'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Mobavenue | Ad Macros",
    description: "Mobavenue DSP ad macros"
}

const data = [
    { id: '${CLIENT_ID}', desc: 'Mobavenue specific Publisher Id/impression Id/Client Id/Site Id/App Id' },
    { id: '${IFA}', desc: 'Value of device identifier, may be SHA1-hashed or RAW, depending on device type.' },
    { id: '${IP}', desc: "IP address of the ad viewer" },
    { id: '${UA}', desc: "Device User-Agent" },
    { id: '${BUNDLE_ID}', desc: 'Application bundle or package name' },
    { id: '${APP_NAME}', desc: "Name of the App" },
    { id: '${CAMPAIGN_ID}', desc: 'Mobavenue specific Campaign Id' },
    { id: '${CREATIVE_ID}', desc: 'Mobavenue specific Creative Id' },
    { id: '${AUCTION_ID}', desc: 'Unique ID of the Bid request.' },
    { id: '${OS}', desc: 'Device operating system (i.e. "iOS" ,"Android")' },
    { id: '${OS_VERSION}', desc: 'Device operating system version number (e.g., “4.3.5”).' },
    { id: '${EXCHANGE_ID}', desc: 'ID of RTB exchange where impression is won' },
    { id: '${EXCHANGE_NAME}', desc: 'NAME of RTB exchange where impression is won' },
    { id: '${DOMAIN}', desc: 'Hostname or Site Domain of the Page URL (e.g., mobavenue.com)' },
    { id: '${DEVICE_TYPE}', desc: "Ad viewer's device category - 'smartphone' or 'tablet'" },
    { id: '${APP_OR_SITE}', desc: "Impression type - 'app' for in-app impressions and 'site' for mobile web placements." },
    { id: '${CARRIER}', desc: "Network Carrier of the ad viewer" },
    { id: '${CACHE_BUSTER}', desc: "Cache buster value (i.e., unique of code that prevents a browser from caching)" },
    { id: '${TAG_ID}', desc: "Identifier for specific ad placement or ad tag that was used to initiate the auction." }
]

export default function page() {
    return (
        <>
            <CustomBreadCrumb
                secondItem='Tools'
                secondLink='#'
                thirdItem='Macros'
                thirdLink='/macros'
            />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Code size={26} className='mr-1' /> Ad Macros
                </div>

            </div>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-lg font-bold p-4'>
                                Supported Macro Variables
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((v, k) => {
                            return <TableRow key={k}>
                                <TableCell className='px-6'>{v.id}</TableCell>
                                <TableCell>{v.desc}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </Card>
        </>
    )
}
