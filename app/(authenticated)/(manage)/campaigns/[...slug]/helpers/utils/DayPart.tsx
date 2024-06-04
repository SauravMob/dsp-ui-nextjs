import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CampaignFormType } from '../CampaignForm'
import { Checkbox } from '@/components/ui/checkbox'

export default function DayPart({
    form
}: {
    form: UseFormReturn<CampaignFormType, any, undefined>
}) {
    const { setValue, getValues, clearErrors } = form

    const daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const hoursArray = new Array(24).fill(0).map((_, i) => i)
    const selectedData = getValues("deliveryHour") ? JSON.parse(getValues("deliveryHour") as string) : {}
    const selectedArray = Object.keys(selectedData).map(v => selectedData[v].split(","))

    const isChecked = (day: number, hour: string) => selectedArray[day].includes(hour)

    const handleCheckboxChange = (day: number, hour: string) => {
        const updatedData = { ...selectedData }
        updatedData[day] = isChecked(day, hour) ? selectedArray[day].filter((v: string) => v !== hour).join(",") : selectedArray[day][0] === '' ? `${hour}` : [...selectedArray[day], hour].join(",")
        setValue("deliveryHour", JSON.stringify(updatedData))
    }

    return (
        <div className="grid grid-cols-25 gap-2 mt-4">
            {daysArray.map((day, dayIndex) => (
                <div key={day} className='flex'>
                    <div className='w-12 mt-auto'>{day}</div>
                    {hoursArray.map(hour => (
                        <div key={hour} className='text-center'>
                            {day === "Sun" && <div className='text-[15px] ml-2 mb-2'>{hour}</div>}
                            <Checkbox
                                className='ml-3'
                                id={`${dayIndex}-${hour}`}
                                checked={isChecked(dayIndex, hour.toString())}
                                onCheckedChange={() => {
                                    handleCheckboxChange(dayIndex, hour.toString())
                                    clearErrors("deliveryHour")
                                }}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
