"use client"

import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { AudienceFormData } from './AudienceForm'
import { Checkbox } from '@/components/ui/checkbox'

export default function DayPart({
    form
}: {
    form: UseFormReturn<AudienceFormData, any, undefined>
}) {
    const { setValue, getValues } = form

    const dateArray = new Array(24).fill(0).map((_, i) => i)
    const selectedData = getValues("clkInterval") ? getValues("clkInterval").split(",").map(v => parseInt(v)) : []

    return (
        <div className="flex justify-around">{dateArray.map(v => (
            <div key={v.toString()}>
                <div className='text-sm flex justify-center'>{v}</div>
                <div>
                    <Checkbox
                        id={v.toString()}
                        checked={selectedData.includes(v)}
                        onCheckedChange={() => setValue("clkInterval", selectedData.includes(v) ? selectedData.filter(vv => vv !== v).join(",") : [...selectedData, v].join(","))}
                    />
                </div>
            </div>
        ))}</div>
    )
}
