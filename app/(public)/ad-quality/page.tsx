import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Metadata } from 'next'
import React from 'react'
import Mobavenue_Logo from '@/public/Mobavenue_Logo.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: "Mobavenue - Ad Quality",
    description: "Mobavenue DSP ad quality page"
}

export default function page() {
    return (
        <Card className='m-5 px-4'>
            <CardHeader className='flex flex-row justify-between items-center border-b'>
                <CardTitle>
                    <Image
                        src={Mobavenue_Logo}
                        width="0"
                        height="0"
                        alt="Mobavenue_logo"
                        priority
                        style={{ width: '100%', height: 'auto' }}
                    />
                </CardTitle>
                <CardDescription className=' flex gap-4'>
                    <Button type='button'>
                        About Us
                    </Button>
                    <Button type='button'>
                        Contact Us
                    </Button>
                </CardDescription>
            </CardHeader>
            <CardContent className='mt-4 text-sm text-slate-600'>
                <div className='text-3xl font-bold'>Ad Policy</div>
                <div className='text-sm font-semibold italic mt-2'>Last updated: January 06, 2023.</div>

                <div className='mt-5'>
                    In order to use the Mobavenue Services, Advertisers agrees to abide by the Ad Quality Guidelines and Policies. Advertisers also agrees to abide by Mobavenue’s Privacy Policy and any other applicable agreements entered into with Mobavenue. Any violation of the Ad Quality Guidelines and Policies is subject to enforcement as provided in section below, in Mobavenue's sole discretion. Quality creatives make up for a good advertising community and Mobavenue actively assess, vets its all the ad creatives to make sure we adhere to the guidelines and policies across networks and geographies. Any ad violation or repeated uploads of bad Ad creative will result in accounts being revoked or termination.
                </div>

                <div className='mt-3'>
                    <span className='text-2xl font-semibold'>General Guidelines:</span>
                    <div className='px-10'>
                        <ul className='list-disc'>
                            <li>Only family-friendly creatives are allowed.</li>
                            <li>Only click-tracking Javascript creatives are allowed.</li>
                            <li>User prompts should not be observed with creatives or landing pages.</li>
                            <li>Auto downloading of files should not be observed with creatives or landing pages.</li>
                        </ul>
                    </div>
                </div>

                <div className='mt-3'>
                    <span className='text-2xl font-semibold'>Ad Quality Guidelines:</span>
                    <div className='px-10'>
                        <ul className='list-disc'>
                            <li>Ad creative must be related to content of connected landing page.</li>
                            <li>Ad creatives are not allowed to auto-redirect to any web page or app stores without prior user's interaction.</li>
                            <li>Ad Creatives are not allowed to auto-load any video content without prior user's interaction.</li>
                        </ul>
                    </div>
                </div>

                <div className='mt-3'>
                    <span className='text-2xl font-semibold'>Prohibited Ads and Content:</span>
                    <div className='px-10'>
                        <ul className='list-disc'>
                            <li>No misleading or deceptive ads, services or products.</li>
                            <li>No adult sexual contents.</li>
                            <li>No alcohol, tobacco, drugs contents.</li>
                            <li>No false representation of brands, trademarks.</li>
                            <li>No user prompts should be observed with Ad creative or landing pages.</li>
                            <li>No auto downloading of files should be observed with Ad creative or landing pages.</li>
                            <li>No gambling ads allowed.</li>
                            <li>No anti-virus ads allowed.</li>
                            <li>No spyware, malware, viruses, illegal hacking, or other materials that are intended to damage or render inoperable software or hardware.</li>
                            <li>No political campaigning content.</li>
                        </ul>
                    </div>
                </div>

                <div className='mt-3'>
                    <span className='text-2xl font-semibold'>Enforcement policy:</span>
                    <div className='px-5'>
                        Any violation of the Ad quality Guidelines and Policies may result in the suspension or blocking of account on the Mobavenue Services, in Mobavenue's sole discretion. Additionally, Mobavenue reserves the right to block account on the Mobavenue Services or terminate the account.
                    </div>
                </div>

                <div className='mt-3'>
                    <span className='text-2xl font-semibold'>Contacting us:</span>
                    <div className='px-5'>
                        Please contact
                        <a className="text-blue-800" href="mailto:adquality@mobavenue.com">adquality@mobavenue.com</a>.
                        with any questions regarding the Ad Quality Guidelines and Policies.
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
