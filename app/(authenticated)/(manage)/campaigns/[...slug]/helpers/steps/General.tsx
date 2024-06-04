import React, { useEffect, useState } from 'react'
import { CampaignFormType } from '../CampaignForm'
import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, CalendarIcon, CheckCircle, Trash, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { deleteBrand, getAllBrands } from '../../../actions'
import { SelectInput, SelectOption } from '@/components/utility/customComponents/SelectInput'
import BrandModal from '../modals/BrandModal'
import { toast } from '@/components/ui/use-toast'
import { RadioGroup } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { formatQryDate } from '@/components/utility/utils/Utils'
import { TimePicker } from '@/components/utility/customComponents/TimePicker'
import { Checkbox } from '@/components/ui/checkbox'
import DayPart from '../utils/DayPart'

export default function General({
  form,
  isAdmin,
  isEdit,
  next
}: {
  form: UseFormReturn<CampaignFormType, any, undefined>
  isAdmin: boolean
  isEdit: boolean
  next: () => Promise<void>
}) {

  const router = useRouter()
  const { setValue } = form
  const [brandOptions, setBrandOptions] = useState<{ value: string, label: string }[]>([])

  const fetchBrand = async () => {
    const result = await getAllBrands({ userid: form.getValues("userId") })
    setBrandOptions(result.map((v: { id: number, name: string }) => ({ value: v.id.toString(), label: v.name })))
  }

  useEffect(() => {
    fetchBrand()
  }, [])

  const removeBrand = async (id: string) => {
    const result = await deleteBrand(id, form.getValues("userId").toString())
    if (result?.status === 200) {
      setValue("brandId", 0)
      form.trigger(["brandId"])
      fetchBrand()
      toast({ title: `Removed Brand`, description: `Brand deleted successfully` })
    } else toast({ title: `Error while removing brand`, description: `Couldn't delete brand` })
  }

  const formatOptionLabel = (data: SelectOption) => {
    return !form.watch("brandId") ? <div className='flex justify-between items-center'>
      <div>{data.label}</div>
      <div className='mx-2 p-2 rounded-full dark:hover:bg-slate-800 hover:bg-slate-50' onClick={() => removeBrand(data.value)}>
        <Trash size={18} />
      </div>
    </div> : <div>{data.label}</div>
  }

  return (
    <Card className='p-4'>
      <div className='grid grid-cols-2 gap-4'>
        <FormField
          control={form.control}
          name="campaignName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Campaign Name<span className='text-red-900'>*</span></FormLabel>
              <FormControl>
                <Input placeholder='Campaign Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brandId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Brand<span className='text-red-900'>*</span></FormLabel>
              <FormControl>
                <div className='flex gap-3'>
                  <SelectInput
                    placeholder="Brand..."
                    isClearable={true}
                    isSearchable={true}
                    name="brandId"
                    value={brandOptions.filter(v => v.value === form.watch("brandId").toString())[0]}
                    formatOptionLabel={formatOptionLabel}
                    options={brandOptions}
                    onChange={(e) => {
                      setValue("brandId", e ? parseInt(e.value) : 0)
                      form.clearErrors("brandId")
                    }}
                  />
                  <BrandModal userId={form.getValues("userId")} fetchBrand={fetchBrand} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="sourceType"
        render={({ field }) => (
          <FormItem className='space-x-4 mt-4 mb-2'>
            <FormLabel className='font-bold'>Channel</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className='grid grid-cols-2 gap-5 mb-3'>
                  <div
                    className={cn('border dark:border-slate-800 p-5 flex items-center rounded-3xl relative cursor-pointer', (form.watch("sourceType") === "SITE") && "border-black dark:border-white", isEdit && "cursor-not-allowed opacity-50")}
                    onClick={() => {
                      if (!isEdit) field.onChange("SITE")
                      setValue("adMedium", [])
                    }}
                  >
                    <svg id="Group_541" data-name="Group 541" width="95" height="83.709" viewBox="0 0 95 83.709">
                      <defs>
                        <clipPath id="clip-path">
                          <rect id="Rectangle_682" data-name="Rectangle 682" width="95" height="83.709"></rect>
                        </clipPath>
                      </defs>
                      <g id="Group_540" data-name="Group 540" clipPath="url(#clip-path)">
                        <path id="Path_532" data-name="Path 532" d="M0,74.638V9.1c.046-.079.123-.155.135-.239A10.71,10.71,0,0,1,11.24,0C18.626.13,26.016.032,33.4.032q25.41,0,50.819,0A10.535,10.535,0,0,1,94.5,7.337c.191.579.337,1.172.5,1.759V74.638a3.711,3.711,0,0,0-.179.515,9.839,9.839,0,0,1-4.539,6.759,27.914,27.914,0,0,1-4.373,1.8H9.092a2.057,2.057,0,0,0-.405-.176A10.347,10.347,0,0,1,.562,76.568C.329,75.941.185,75.282,0,74.638m91.849-49.4H3.178c-.011.246-.027.427-.027.608q0,23.553.011,47.105a8,8,0,0,0,.28,2.1c.967,3.5,3.8,5.518,7.7,5.518q36.356,0,72.712-.011a9.46,9.46,0,0,0,2.469-.3c3.515-.964,5.522-3.748,5.523-7.582q.005-23.229,0-46.457ZM3.3,21.876H91.819c0-3.954.049-7.837-.035-11.717a6.9,6.9,0,0,0-.752-2.821c-1.478-2.967-4.049-4.152-7.27-4.151q-35.847,0-71.693.006a23.923,23.923,0,0,0-2.4.134c-3.275.331-6.148,2.882-6.318,6.106C3.134,13.546,3.3,17.68,3.3,21.876" transform="translate(0 0)"></path>
                        <path id="Path_533" data-name="Path 533" d="M45.289,46.223a4.994,4.994,0,0,1-4.957,4.932,4.979,4.979,0,1,1,4.957-4.932m-4.92-1.8a1.723,1.723,0,0,0-1.795,1.7,1.765,1.765,0,0,0,1.753,1.861,1.894,1.894,0,0,0,1.8-1.772,1.826,1.826,0,0,0-1.758-1.788" transform="translate(-28.778 -33.554)"></path>
                        <path id="Path_534" data-name="Path 534" d="M127.606,46.5a4.957,4.957,0,0,1-9.913.016,4.957,4.957,0,1,1,9.913-.016m-4.984-1.748a1.729,1.729,0,0,0-1.735,1.765,1.782,1.782,0,0,0,1.752,1.778,1.836,1.836,0,0,0,1.8-1.841,1.758,1.758,0,0,0-1.812-1.7" transform="translate(-95.855 -33.829)"></path>
                        <path id="Path_535" data-name="Path 535" d="M204.9,41.949a4.948,4.948,0,1,1-4.957,4.886,4.9,4.9,0,0,1,4.957-4.886m1.754,4.991a1.771,1.771,0,0,0-1.689-1.83,1.842,1.842,0,0,0-1.861,1.774,1.776,1.776,0,0,0,1.759,1.766,1.737,1.737,0,0,0,1.791-1.71" transform="translate(-162.844 -34.165)"></path>
                      </g>
                    </svg>
                    <div className='text-center mx-auto opacity-70'>
                      WEB
                      <p>Display advertisement on web / mobile browser</p>
                    </div>
                    {(form.watch("sourceType") === "SITE") && <div className='absolute top-[-5px] left-[-5px] bg-white dark:bg-slate-950'>
                      <CheckCircle />
                    </div>}
                  </div>
                  <div
                    className={cn('border dark:border-slate-800 p-5 flex items-center rounded-3xl relative cursor-pointer', (form.watch("sourceType") === "APP") && "border-black dark:border-white", isEdit && "cursor-not-allowed opacity-50")}
                    onClick={() => {
                      if (!isEdit) field.onChange("APP")
                      setValue("adMedium", ['MOBILE', 'TABLET'])
                    }}
                  >
                    <svg id="Group_543" data-name="Group 543" width="50.678" height="84.709" viewBox="0 0 50.678 84.709">
                      <defs>
                        <clipPath id="clip-path">
                          <rect id="Rectangle_683" data-name="Rectangle 683" width="50.678" height="84.709"></rect>
                        </clipPath>
                      </defs>
                      <g id="Group_542" data-name="Group 542" clipPath="url(#clip-path)">
                        <path id="Path_536" data-name="Path 536" d="M43.447,84.708H7.294a3.118,3.118,0,0,0-.495-.226A8.733,8.733,0,0,1,.057,75.838C.02,71.88.047,67.921.047,63.963.046,45.792.125,27.62,0,9.45A9.249,9.249,0,0,1,9.409,0c10.8.169,21.6.061,32.4.045a8.843,8.843,0,0,1,5.8,2.113,10.352,10.352,0,0,1,3.066,5.136v70.17A30.093,30.093,0,0,1,49.026,81a9.3,9.3,0,0,1-5.578,3.712M38.467,3.34c0,.613.006,1.211,0,1.808A4.72,4.72,0,0,1,33.618,10q-8.3.018-16.607,0a4.682,4.682,0,0,1-4.74-4.719c-.009-.665,0-1.331,0-2.064-1.044,0-1.942,0-2.84,0-3.85.012-6.2,2.357-6.205,6.19q0,32.99,0,65.98c0,3.761,2.368,6.145,6.133,6.148q15.986.012,31.971,0c3.822,0,6.184-2.38,6.185-6.225q.007-32.933,0-65.867c0-.189,0-.377,0-.566a5.515,5.515,0,0,0-4.728-5.5,28.8,28.8,0,0,0-4.315-.037M15.493,3.253c-.021.268-.044.449-.047.629,0,.414-.024.83.006,1.242a1.587,1.587,0,0,0,1.721,1.689c5.449.026,10.9.018,16.347.007a1.553,1.553,0,0,0,1.714-1.445,18.418,18.418,0,0,0,.016-2.123Z" transform="translate(0 0.001)"></path>
                        <path id="Path_537" data-name="Path 537" d="M87.13,402.589q-4.679,0-9.357,0a1.693,1.693,0,0,1-1.888-1.257,1.5,1.5,0,0,1,1.248-1.921,6.713,6.713,0,0,1,1.234-.074q8.793-.007,17.587,0c.188,0,.376,0,.564,0,1.315.057,1.972.633,1.93,1.689-.039.969-.742,1.552-1.96,1.557-3.119.013-6.238,0-9.357,0" transform="translate(-61.783 -325.375)"></path>
                      </g>
                    </svg>
                    <div className='text-center mx-auto opacity-70'>
                      APPLICATION
                      <p>Display advertisement on Android / iOS Device and Tablet</p>
                    </div>
                    {(form.watch("sourceType") === "APP") && <div className='absolute top-[-5px] left-[-5px] bg-white dark:bg-slate-950'>
                      <CheckCircle />
                    </div>}
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormLabel className='font-bold'>Time Manage</FormLabel>
      <div className='grid grid-cols-4 gap-4 mt-2'>
        <FormField
          control={form.control}
          name="schedule"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Schedule</FormLabel>
              <FormControl>
                <div className='flex gap-3'>
                  <SelectInput
                    placeholder="Schedule..."
                    name="schedule"
                    value={[{ value: "UTC", label: "UTC" }].filter(v => v.value === field.value)[0]}
                    options={[{ value: "UTC", label: "UTC" }]}
                    onChange={(e) => setValue("schedule", e ? e.value : "")}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Start Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formatQryDate(field.value)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                    <div className="rounded-md border">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(value: Date | undefined) => setValue("startDate", value ? value : new Date())}
                        className="rounded-md border"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Time</FormLabel>
              <FormControl>
                <TimePicker date={field.value} setDate={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isEndDateEnabled"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>End Date</FormLabel>
              <FormControl>
                <div className='flex items-center gap-4 min-h-10'>
                  <Checkbox
                    id="isEndDateEnabled"
                    checked={field.value === 1}
                    onCheckedChange={(value) => setValue("isEndDateEnabled", value ? 1 : 0)}
                  />
                  {field.value === 1 && <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formatQryDate(field.value)}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                              <div className="rounded-md border">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(value: Date | undefined) => {
                                    setValue("endDate", value ? value : new Date())
                                    form.clearErrors("endDate")
                                  }}
                                  className="rounded-md border"
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className='grid grid-cols-3'>
        <FormField
          control={form.control}
          name="deliveryHour"
          render={({ field }) => (
            <FormItem className='space-x-4 mt-6'>
              <FormControl>
                <Checkbox
                  id="deliveryHour"
                  checked={field.value !== null}
                  onCheckedChange={(value) => setValue("deliveryHour", value ? '{"0": "","1":"","2":"","3":"","4":"","5":"","6":""}' : null)}
                />
              </FormControl>
              <FormLabel>Run Ads On A Schedule Time</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("deliveryHour") !== null && <DayPart form={form} />}
      </div>
      <CardFooter className='flex items-center justify-between mt-5 p-0'>
        <Button type='button' onClick={() => router.push(isAdmin ? '/campaign-manager' : '/campaigns')}><X size={14} className='mr-2' /> CANCEL</Button>
        <Button type='button' onClick={next}>NEXT<ArrowRight size={14} className='ml-1' /></Button>
      </CardFooter>
    </Card>
  )
}