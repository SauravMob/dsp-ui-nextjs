"use client"

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AutoComplete, MultiSelectInput } from '@/components/utility/customComponents/SelectInput'
import { Filter } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { fetchCampaignIdNameList, searchCampaign } from '../actions'
import { countryOption } from '@/components/utility/utils/GeoUtils'
import { usePathname } from 'next/navigation'
import { osOptions, statusOptions } from '@/components/utility/utils/Utils'

export default function CampaignSheet({ pageNo, pageSize, campaignId, status, country, os }: CampaignFilterTypes) {

  const path = usePathname()

  const [campaign, setCampaign] = useState<string | undefined>(campaignId)
  const [customCountry, setCustomCountry] = useState<string[]>(country.split(','))
  const [customOs, setCustomOs] = useState<string[]>(os.split(','))
  const [customStatus, setCustomStatus] = useState<string[]>(status.split(','))
  const [campaignOptions, setCampaignOptions] = useState<{ value: string, label: string }[]>([])

  const campaignFilter = async (inputValue: string) => {
    const fetch = !parseInt(inputValue) ? await fetchCampaignIdNameList(inputValue) : await searchCampaign({ pageNo: "0", pageSize: "50", filter: { campaignId: parseInt(inputValue) } })
    const options = !parseInt(inputValue) ? fetch.map((v: { id: string, name: string }) => ({ value: v.id, label: v.name })) : fetch.content.map((v: { id: string, campaignName: string }) => ({ value: v.id, label: v.campaignName }))
    setCampaignOptions(options)
    return options
  }

  const uri = useMemo(() => `${path}?${campaign ? `&campaign=${campaign}` : ''}${customCountry ? `&country=${customCountry.join(',')}` : ''}${customOs ? `&os=${customOs.join(',')}` : ''}${customStatus ? `&status=${customStatus.join(',')}` : ''}&pageNo=0&pageSize=${pageSize}`, [campaign, customCountry, customOs, customStatus, pageNo, pageSize])

  return (
    <Sheet>
      <SheetTrigger>
        <div className='px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-900 hover:font-medium flex items-center'>
          <Filter size={19} className='mr-2' />
          Filters
        </div>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <div className='mt-10'>
          <div className='grid grid-cols-3'>
            <div className='col-span-1 text-md flex items-center'>Campaigns</div>
            <div className='col-span-2 flex items-center'>
              <AutoComplete
                placeholder="Campaign..."
                isClearable={true}
                isSearchable={true}
                name="campaign"
                value={campaignOptions.filter(v => v.value === campaign)[0]}
                loadOptions={campaignFilter}
                onChange={(e) => setCampaign(e ? e.value : '')}
              />
            </div>
          </div>
          <div className='grid grid-cols-3 mt-4'>
            <div className='col-span-1 text-md flex items-center'>Country</div>
            <div className='col-span-2 flex items-center'>
              <MultiSelectInput
                placeholder="Country"
                isClearable={true}
                isSearchable={true}
                name="country"
                value={countryOption.filter(v => customCountry.includes(v.value))}
                options={countryOption}
                onChange={(e) => setCustomCountry(e ? e.map(v => v.value) : [])}
              />
            </div>
          </div>
          <div className='grid grid-cols-3 mt-4'>
            <div className='col-span-1 text-md flex items-center'>OS</div>
            <div className='col-span-2 flex items-center'>
              <MultiSelectInput
                placeholder="OS"
                isClearable={true}
                isSearchable={true}
                name="os"
                value={osOptions.filter(v => customOs.includes(v.value))}
                options={osOptions}
                onChange={(e) => setCustomOs(e ? e.map(v => v.value) : [])}
              />
            </div>
          </div>
          <div className='grid grid-cols-3 mt-4'>
            <div className='col-span-1 text-md flex items-center'>Status</div>
            <div className='col-span-2 flex items-center'>
              <MultiSelectInput
                placeholder="Staus"
                isClearable={true}
                isSearchable={true}
                name="status"
                value={statusOptions.filter(v => customStatus.includes(v.value))}
                options={statusOptions}
                onChange={(e) => setCustomStatus(e ? e.map(v => v.value) : [])}
              />
            </div>
          </div>
          <div className='flex justify-center my-5'>
            <SheetClose asChild>
              <Link href={uri}>
                <div className='bg-slate-800 text-slate-200 hover:bg-slate-950 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-slate-400 font-semibold py-3 px-4 rounded-xl'>Submit</div>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
