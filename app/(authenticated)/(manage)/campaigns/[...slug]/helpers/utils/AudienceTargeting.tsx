import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CampaignFormType } from '../CampaignForm'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import union from '@/public/union.svg'
import intersection from '@/public/intersection.svg'
import combined from '@/public/combined.svg'
import Image from 'next/image'
import { fetchAllAudience, getAudienceEventCount } from '@/app/(authenticated)/(assets)/audiences/actions'
import { Input } from '@/components/ui/input'
import { PlusCircle, XCircle } from 'lucide-react'
import { SelectInput } from '@/components/utility/customComponents/SelectInput'
import { cn } from '@/lib/utils'

export default function AudienceTargeting({
    form
}: {
    form: UseFormReturn<CampaignFormType, any, undefined>
}) {

    const { setValue, clearErrors, watch } = form

    const audienceId = watch("audienceId")
    const audienceFlag = watch("audienceFlag")
    const audienceDiffId = watch("audienceDiffId")
    const audienceTypeFlag = watch("audienceTypeFlag")

    const [audiences, setAudiences] = useState<AudienceType[]>([])
    const [audienceOptions, setAudienceOptions] = useState<{ value: string, label: string }[]>([])
    const [selectOptions, setSelectOptions] = useState<{ value: string, label: string }[]>([])
    const [audienceCount, setAudienceCount] = useState<{ [key: number]: number }>({ 0: 0 })

    const selectAudience = async () => {
        const result = await fetchAllAudience({ pageNo: '0', pageSize: '512', userid: form.getValues("userId").toString() })
        const iniAud: { value: string, label: string }[] = result.content.map((v: { id: number, name: string }) => ({ value: v.id.toString(), label: v.name }))
        const existingAudienceId = [...audienceId, ...audienceDiffId]
        setSelectOptions(iniAud.filter(v => !existingAudienceId.includes(parseInt(v.value))))
    }

    const fetchCount = async (audience: AudienceType | undefined) => {
        const modifiedRules = audience?.rules.replace(/notcontains-/g, '').replace(/contains-/g, '')
        const result = await getAudienceEventCount(audience?.id.toString() as string, audience?.bundle as string, audience?.days.toString() as string, audience?.mmp as string, modifiedRules as string)
        setAudienceCount(prevState => ({ ...prevState, [result.id]: result.eventCount }))
    }

    useEffect(() => {
        const fetchAudience = async () => {
            const result = await fetchAllAudience({ pageNo: '0', pageSize: '512', userid: form.getValues("userId").toString() })
            setAudienceOptions(result.content.map((v: { id: number, name: string }) => ({ value: v.id.toString(), label: v.name })))
            setAudiences(result.content)
        }
        fetchAudience()
        selectAudience()
    }, [])

    useEffect(() => {
        const combinedAudienceIds = Array.from(new Set([...audienceId, ...audienceDiffId]))
        combinedAudienceIds.forEach(aud => {
            const audience = audiences.find(v => v.id === aud)
            if (audience) fetchCount(audience)
        })
        selectAudience()
    }, [audienceId, audienceDiffId, audiences])

    return (
        <div className={cn(form.watch("strictIfaTargeting") === 0 && "cursor-not-allowed bg-slate-100 dark:bg-slate-700 rounded-xl px-4 pb-5 pt-1 m-3")}>
            <FormField
                control={form.control}
                name="audienceTypeFlag"
                render={({ field }) => (
                    <FormItem className='space-x-7 flex items-center mt-6 mb-3 space-y-0'>
                        <FormLabel className='font-bold text-nowrap'>Audience Targeting</FormLabel>
                        <FormControl>
                            <RadioGroup
                                disabled={form.watch("strictIfaTargeting") === 0}
                                onValueChange={(value) => {
                                    setValue("audienceTypeFlag", value)
                                    if (value === "1") setValue("audienceFlag", "2")
                                    else setValue("audienceFlag", "1")
                                }}
                                value={field.value.toString()}
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
            {audienceTypeFlag === '1' && <FormField
                control={form.control}
                name="audienceFlag"
                render={({ field }) => (
                    <FormItem className='space-x-7 flex items-center mt-4 mb-3 space-y-0'>
                        <FormControl>
                            <RadioGroup
                                disabled={form.watch("strictIfaTargeting") === 0}
                                onValueChange={field.onChange}
                                value={field.value.toString()}
                                className='grid grid-cols-3 gap-4 w-full'
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
                                <FormItem className="flex bg-slate-200 dark:bg-slate-800 p-4 rounded-2xl items-center space-x-1 space-y-0 justify-center">
                                    <FormControl>
                                        <RadioGroupItem value="4" />
                                    </FormControl>
                                    <Image
                                        src={combined}
                                        alt={"combinedImg"}
                                        width="0"
                                        height="0"
                                        style={{ width: '20%', height: 'auto' }}
                                    />
                                    <FormLabel className="font-bold">
                                        DIFF
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
                name="audienceId"
                render={({ field }) => (
                    <FormItem className='mt-6'>
                        <FormControl>
                            <div className='border p-3 relative rounded-md'>
                                <span className='absolute top-[-10px] left-5 text-[12px] bg-white dark:bg-slate-950'>{audienceTypeFlag === "1" ? "WhiteList" : "BlackList"} Audiences</span>
                                {audienceId.map((aud, index) => {
                                    return <div key={index} className='grid grid-cols-12 gap-2 mt-2'>
                                        <div className='border-r col-span-1 flex items-center justify-center'>{
                                            audienceTypeFlag == '1' && audienceId.length - 1 === index ? <>
                                                <PlusCircle
                                                    size={20}
                                                    onClick={() => { if ((audienceFlag === '4' && audienceId.length < 3 && aud && form.watch("strictIfaTargeting") !== 0) || (audienceFlag !== '4' && aud && form.watch("strictIfaTargeting") !== 0)) setValue("audienceId", [...audienceId, 0]) }}
                                                />
                                            </> : audienceTypeFlag == '0' && audienceId.length - 1 === index ? <>
                                                <PlusCircle
                                                    size={20}
                                                    onClick={() => { if (aud) setValue("audienceId", [...audienceId, 0]) }}
                                                />
                                            </> : (audienceTypeFlag === '0' || !index) ? null : audienceFlag === '2' ? <>
                                                <Image
                                                    src={union}
                                                    alt={"unionImg"}
                                                    width="0"
                                                    height="0"
                                                    style={{ width: '70%', height: 'auto' }}
                                                />
                                            </> : audienceFlag === '3' ? <>
                                                <Image
                                                    src={intersection}
                                                    alt={"intersectionImg"}
                                                    width="0"
                                                    height="0"
                                                    style={{ width: '70%', height: 'auto' }}
                                                />
                                            </> : null
                                        }</div>
                                        <div className='col-span-8'>
                                            <SelectInput
                                                placeholder="Audience Name..."
                                                isClearable={false}
                                                isSearchable={true}
                                                isDisabled={!!aud || form.watch("strictIfaTargeting") === 0}
                                                name={`audienceId.${index}`}
                                                value={audienceOptions.find(v => v.value === aud.toString())}
                                                options={selectOptions}
                                                onChange={(e) => {
                                                    if (e) {
                                                        const newAudienceId = [...audienceId]
                                                        newAudienceId[index] = parseInt(e.value)
                                                        setValue('audienceId', newAudienceId)
                                                        clearErrors("audienceId")
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className='col-span-2'>
                                            <Input
                                                value={audienceCount[aud] || 0}
                                                onChange={(e) => e.preventDefault()}
                                                disabled
                                            />
                                        </div>
                                        <div className='col-span-1 flex items-center justify-center'>
                                            <XCircle
                                                size={20}
                                                onClick={() => {
                                                    if (form.watch("strictIfaTargeting") !== 0) setValue('audienceId', audienceId.length > 1 ? audienceId.filter(v => v !== aud) : [0])
                                                }}
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
            {audienceFlag === '4' && audienceTypeFlag === "1" && <div className='flex items-center justify-center'>
                <Image
                    src={combined}
                    alt={"combinedImg"}
                    width="0"
                    height="0"
                    style={{ width: '12%', height: 'auto' }}
                />
            </div>}
            {audienceFlag === "4" && audienceTypeFlag === "1" && <>
                <FormField
                    control={form.control}
                    name="audienceDiffId"
                    render={({ field }) => (
                        <FormItem className='mt-2'>
                            <FormControl>
                                <div className='border p-3 relative rounded-md'>
                                    <span className='absolute top-[-10px] left-5 text-[12px] bg-white dark:bg-slate-950'>BlackList Audiences</span>
                                    {audienceDiffId.map((aud, index) => {
                                        return <div key={index} className='grid grid-cols-12 gap-2 mt-2'>
                                            <div className='border-r col-span-1 flex items-center justify-center'>{
                                                audienceTypeFlag == '1' && audienceDiffId.length - 1 === index ? <>
                                                    <PlusCircle
                                                        size={20}
                                                        onClick={() => { if (aud && audienceDiffId.length < 3 && form.watch("strictIfaTargeting") !== 0) setValue("audienceDiffId", [...audienceDiffId, 0]) }}
                                                    />
                                                </> : null
                                            }</div>
                                            <div className='col-span-8'>
                                                <SelectInput
                                                    placeholder="Audience Name..."
                                                    isClearable={false}
                                                    isSearchable={true}
                                                    isDisabled={!!aud || form.watch("strictIfaTargeting") === 0}
                                                    name={`audienceDiffId.${index}`}
                                                    value={audienceOptions.find(v => v.value === aud.toString())}
                                                    options={selectOptions}
                                                    onChange={(e) => {
                                                        const newAudienceId = [...audienceDiffId]
                                                        newAudienceId[index] = e ? parseInt(e.value) : 0
                                                        setValue('audienceDiffId', newAudienceId)
                                                        clearErrors("audienceDiffId")
                                                    }}
                                                />
                                            </div>
                                            <div className='col-span-2'>
                                                <Input
                                                    value={audienceCount[aud] || 0}
                                                    onChange={(e) => e.preventDefault()}
                                                    disabled
                                                />
                                            </div>
                                            <div className='col-span-1 flex items-center justify-center'>
                                                <XCircle
                                                    size={20}
                                                    onClick={() => {
                                                        if (form.watch("strictIfaTargeting") !== 0) setValue('audienceDiffId', audienceDiffId.length > 1 ? audienceDiffId.filter(v => v !== aud) : [0])
                                                    }}
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
            </>}
        </div>
    )
}
