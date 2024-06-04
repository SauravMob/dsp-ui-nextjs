import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CampaignFormType } from '../CampaignForm'
import { Card, CardFooter } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SelectInput } from '@/components/utility/customComponents/SelectInput'
import { costMetricsOptions } from '@/components/utility/utils/Utils'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, FileQuestionIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export default function Budget({
  form,
  isAdmin,
  isEdit,
  next,
  prev
}: {
  form: UseFormReturn<CampaignFormType, any, undefined>
  isAdmin: boolean
  isEdit: boolean
  next: () => Promise<void>
  prev: () => void
}) {

  const router = useRouter()
  const { setValue } = form

  return (
    <Card className='p-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='border-r pr-4'>
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name="costMetrics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Optimisation Type<span className='text-red-900'>*</span></FormLabel>
                  <FormControl>
                    <SelectInput
                      placeholder="Optimisation Type..."
                      isClearable={true}
                      isSearchable={true}
                      name="costMetrics"
                      isDisabled={isEdit}
                      value={costMetricsOptions.filter(v => v.value === field.value)[0]}
                      options={costMetricsOptions}
                      onChange={(e) => setValue("costMetrics", e ? e.value : "")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bidPrice"
              render={({ field }) => (
                <FormItem className='mb-4'>
                  <FormLabel>
                    Target {form.getValues("costMetrics")}<span className='text-red-900'>*</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <FileQuestionIcon size={14} className='ml-0.5' />
                      </TooltipTrigger>
                      <TooltipContent className='w-60'>
                        Minimum bid price for {form.getValues("costMetrics")}: $0.10
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input
                      step={0.1}
                      type='number'
                      placeholder='Bid Price: $0.10'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex items-center'>
            <FormLabel className='mr-12 font-bold'>Pacing</FormLabel>
            <FormField
              control={form.control}
              name="pacingType"
              render={({ field }) => (
                <FormItem className='space-x-2 my-2'>
                  <FormControl>
                    <Switch
                      id="pacingType"
                      checked={field.value === 1}
                      onCheckedChange={(value) => setValue("pacingType", value ? 1 : 0)}
                    />
                  </FormControl>
                  <FormLabel>Aggressive pacing</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="auctionType"
            render={({ field }) => (
              <FormItem className='space-x-7 flex items-center my-4 space-y-0'>
                <FormLabel className='font-bold'>Optimization</FormLabel>
                <FormControl>
                  <div className='grid grid-cols-2 gap-4 mt-0 w-full'>
                    <div className='flex items-center justify-center'>
                      <Checkbox
                        id="firstPriceAuction"
                        className='mr-2'
                        checked={form.watch("auctionType")?.split(",").includes('1')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            const newValue = form.watch("auctionType") ? (form.watch("auctionType") as string).split(",") : []
                            if (!newValue.includes('1')) newValue.push('1')
                            setValue("auctionType", newValue.join(","))
                          } else {
                            const newValue = form.watch("auctionType") ? (form.watch("auctionType") as string).split(",").filter(v => v !== '1') : []
                            setValue("auctionType", newValue.length > 0 ? newValue.join(",") : null)
                          }
                        }}
                      />
                      <FormLabel>First Price Auction</FormLabel>
                    </div>
                    <div className='flex items-center justify-center'>
                      <Checkbox
                        id="secondPriceAuction"
                        className='mr-2'
                        checked={form.watch("auctionType")?.split(",").includes('2')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            const newValue = form.watch("auctionType") ? (form.watch("auctionType") as string).split(",") : []
                            if (!newValue.includes('2')) newValue.push('2')
                            setValue("auctionType", newValue.join(","))
                          } else {
                            const newValue = form.watch("auctionType") ? (form.watch("auctionType") as string).split(",").filter(v => v !== '2') : []
                            setValue("auctionType", newValue.length > 0 ? newValue.join(",") : null)
                          }
                        }}
                      />
                      <FormLabel>Second Price Auction</FormLabel>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormLabel className='font-bold'>Budget Capping</FormLabel>
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name="budgetPerDay"
              render={({ field }) => (
                <FormItem className='mb-3 mt-1'>
                  <FormLabel>Daily<span className='text-red-900'>*</span></FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Amount...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxBudget"
              render={({ field }) => (
                <FormItem className='mt-1'>
                  <FormLabel>Total<span className='text-red-900'>*</span></FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Amount...'
                      value={field.value}
                      onChange={(e) => {
                        const value = e.target.valueAsNumber
                        setValue("maxBudget", value ? value : 0)
                        if (value && value < form.getValues("budgetPerDay")) form.setError("maxBudget", { message: "Total budget should be higher than daily budget" })
                        else form.clearErrors("maxBudget")
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <FormLabel className='font-bold'>Impression/Click Capping</FormLabel>
          <div className='grid grid-cols-2 gap-4 mt-1'>
            <FormField
              control={form.control}
              name="impressionCap"
              render={({ field }) => (
                <FormItem className='mb-3'>
                  <FormLabel>Impression</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Count...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clickCap"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Click</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Count...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="cappingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='mr-8 font-bold'>Frequency Capping</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      setValue("cappingType", parseInt(value))
                      form.clearErrors("fcap")
                      form.clearErrors("clickFcap")
                    }}
                    defaultValue={field.value.toString()}
                    className="grid grid-cols-2 gap-6"
                  >
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Impression
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="0" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Click
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 gap-4 mt-2'>
            {form.watch("cappingType") === 1 ? <FormField
              control={form.control}
              name="fcap"
              render={({ field }) => (
                <FormItem className='mb-3'>
                  <FormLabel>Impression<span className='text-red-900'>*</span></FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Count...'
                      value={form.watch("fcap")}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> : <FormField
              control={form.control}
              name="clickFcap"
              render={({ field }) => (
                <FormItem className='mb-3'>
                  <FormLabel>Click<span className='text-red-900'>*</span></FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Count...'
                      value={form.watch("clickFcap")}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />}
            <FormField
              control={form.control}
              name="fcapHour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Expiry Hours<span className='text-red-900'>*</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <FileQuestionIcon size={14} className='ml-0.5' />
                      </TooltipTrigger>
                      <TooltipContent className='w-60'>
                        Limit the number of times a user can be served ads within a time period.
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Hours...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="fcapKeyFlag"
            render={({ field }) => (
              <FormItem className='flex items-center'>
                <FormLabel className='mt-2 mr-5'>IP based capping</FormLabel>
                <FormControl>
                  <Switch
                    id='fcapKeyFlag'
                    checked={form.watch("fcapKeyFlag")}
                    onCheckedChange={(value) => setValue("fcapKeyFlag", value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <CardFooter className='flex items-center justify-between mt-5 p-0'>
        <Button type='button' onClick={() => router.push(isAdmin ? '/campaign-manager' : '/campaigns')}><X size={14} className='mr-2' /> CANCEL</Button>
        <div className='flex gap-2'>
          <Button type='button' onClick={() => prev()}><ArrowLeft size={14} className='mr-1' /> PREVIOUS</Button>
          <Button type='button' onClick={() => next()}>NEXT<ArrowRight size={14} className='ml-1' /></Button>
        </div>
      </CardFooter>
    </Card>
  )
}
