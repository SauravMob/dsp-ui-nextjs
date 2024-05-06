import { Metadata } from 'next'
import React from 'react'
import { getAllAppsFlyerAud } from './actions'
import AppsflyerAudHeader from './helpers/AppsflyerAudHeader'
import AppsflyerAudDatatable from './helpers/AppsflyerAudDatatable'

export const metadata: Metadata = {
    title: "Mobavenue | Appsflyer Audience List",
    description: "Mobavenue DSP appsflyer audience list"
}

export default async function page() {

    const tabularData = await getAllAppsFlyerAud()

    return (
        <div>
            <AppsflyerAudHeader />
            <div className='mt-5'>
                <AppsflyerAudDatatable data={tabularData} />
            </div>
        </div>
    )
}
