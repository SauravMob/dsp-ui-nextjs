import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CampaignFormType } from '../CampaignForm'
import { getAllApplists } from '@/app/(authenticated)/(assets)/applists/actions'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Image from 'next/image'
import union from '@/public/union.svg'
import intersection from '@/public/intersection.svg'
import { PlusCircle, XCircle } from 'lucide-react'
import { SelectInput } from '@/components/utility/customComponents/SelectInput'

export default function AppListTargeting({
    form
}: {
    form: UseFormReturn<CampaignFormType, any, undefined>
}) {

    const { setValue, clearErrors, watch } = form

    const appBundle = watch("appBundle")
    const appOpFlag = watch("appOpFlag")
    const appTargeting = watch("appTargeting")

    const [appsOptions, setAppOptions] = useState<{ value: string, label: string }[]>([])
    const [selectOptions, setSelectOptions] = useState<{ value: string, label: string }[]>([])

    const selectApps = async () => {
        const result = await getAllApplists({ pageNo: '0', pageSize: '512', status: "ACTIVE" })
        const iniApp: { value: string, label: string }[] = result.content.map((v: { id: number, name: string }) => ({ value: v.id.toString(), label: v.name }))
        setSelectOptions(iniApp.filter(v => !appBundle.includes(parseInt(v.value))))
    }

    useEffect(() => {
        const fetchApps = async () => {
            const result = await getAllApplists({ pageNo: '0', pageSize: '512', status: "ACTIVE" })
            setAppOptions(result.content.map((v: { id: number, name: string }) => ({ value: v.id.toString(), label: v.name })))
        }
        fetchApps()
        selectApps()
    }, [])

    useEffect(() => {
        selectApps()
    }, [appBundle])

    return (
        <div>
            <FormField
                control={form.control}
                name="appTargeting"
                render={({ field }) => (
                    <FormItem className='space-x-7 flex items-center mt-6 mb-3 space-y-0'>
                        <FormLabel className='font-bold text-nowrap'>App Targeting</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={(value) => {
                                    field.onChange(value)
                                    if (value === "1") setValue("appOpFlag", 2)
                                    else {
                                        setValue("appBundle", [0])
                                        setValue("appOpFlag", 0)
                                    }
                                }}
                                value={field.value}
                                className='grid grid-cols-2 gap-4 w-full'
                            >
                                <FormItem className="flex items-center space-x-1 space-y-0 justify-center">
                                    <FormControl>
                                        <RadioGroupItem value="1" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        WhiteList
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-1 space-y-0 justify-center">
                                    <FormControl>
                                        <RadioGroupItem value="0" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        BlackList
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {appTargeting === '1' && <FormField
                control={form.control}
                name="appOpFlag"
                render={({ field }) => (
                    <FormItem className='space-x-7 flex items-center mt-4 mb-3 space-y-0'>
                        <FormControl>
                            <RadioGroup
                                onValueChange={(value) => field.onChange(parseInt(value))}
                                value={field.value.toString()}
                                className='grid grid-cols-2 gap-4 w-full'
                            >
                                <FormItem className="flex bg-slate-200 dark:bg-slate-800 p-4 rounded-2xl items-center space-x-1 space-y-0 justify-center">
                                    <FormControl>
                                        <RadioGroupItem value="2" />
                                    </FormControl>
                                    <Image
                                        src={union}
                                        alt={"unionImg"}
                                        width="0"
                                        height="0"
                                        style={{ width: '20%', height: 'auto' }}
                                    />
                                    <FormLabel className="font-bold">
                                        OR
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex bg-slate-200 dark:bg-slate-800 p-4 rounded-2xl items-center space-x-1 space-y-0 justify-center">
                                    <FormControl>
                                        <RadioGroupItem value="3" />
                                    </FormControl>
                                    <Image
                                        src={intersection}
                                        alt={"intersectionImg"}
                                        width="0"
                                        height="0"
                                        style={{ width: '20%', height: 'auto' }}
                                    />
                                    <FormLabel className="font-bold">
                                        AND
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />}
            <FormField
                control={form.control}
                name="appBundle"
                render={({ field }) => (
                    <FormItem className='mt-6'>
                        <FormControl>
                            <div className='border p-3 relative rounded-md'>
                                <span className='absolute top-[-10px] left-5 text-[12px] bg-white dark:bg-slate-950'>{appTargeting === '1' ? "WhiteList" : "BlackList"} Audiences</span>
                                {appBundle.map((app, index) => {
                                    return <div key={index} className='grid grid-cols-12 gap-2 mt-2'>
                                        <div className='border-r col-span-1 flex items-center justify-center'>{
                                            appTargeting === '0' ? null : (app && appBundle.length - 1 === index) ? <>
                                                <PlusCircle
                                                    size={20}
                                                    onClick={() => { if (app) setValue("appBundle", [...appBundle, 0]) }}
                                                />
                                            </> : !index ? null : appOpFlag === 2 ? <>
                                                <Image
                                                    src={union}
                                                    alt={"unionImg"}
                                                    width="0"
                                                    height="0"
                                                    style={{ width: '70%', height: 'auto' }}
                                                />
                                            </> : appOpFlag === 3 ? <>
                                                <Image
                                                    src={intersection}
                                                    alt={"intersectionImg"}
                                                    width="0"
                                                    height="0"
                                                    style={{ width: '70%', height: 'auto' }}
                                                />
                                            </> : null
                                        }</div>
                                        <div className='col-span-10'>
                                            <SelectInput
                                                placeholder="App Name..."
                                                isClearable={false}
                                                isSearchable={true}
                                                name={`appId.${index}`}
                                                value={appsOptions.find(v => v.value === app.toString())}
                                                options={selectOptions}
                                                onChange={(e) => {
                                                    if (e) {
                                                        const newAppId = [...appBundle]
                                                        newAppId[index] = parseInt(e.value)
                                                        setValue('appBundle', newAppId)
                                                        clearErrors("appBundle")
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className='col-span-1 flex items-center justify-center'>
                                            <XCircle
                                                size={20}
                                                onClick={() => setValue("appBundle", appBundle.length > 1 ? appBundle.filter(v => v !== app) : [0])}
                                            />
                                        </div>
                                    </div>
                                })}
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}
