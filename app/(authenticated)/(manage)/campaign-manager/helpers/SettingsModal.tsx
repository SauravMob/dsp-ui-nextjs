import { fetchUserByRole } from '@/app/(authenticated)/(analyze)/actions'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { MultiSelectInput, SelectInput } from '@/components/utility/customComponents/SelectInput'
import { statusOptions } from '@/components/utility/utils/Utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { PopoverClose } from '@radix-ui/react-popover'
import { Settings } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { updateCampaignSetting } from '../../campaigns/actions'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

const formSchema = z.object({
    maxMargin: z.number().min(1, { message: "Gross Margin should be atleast 1%!" }),
    status: z.string().min(1, { message: "Required Field!" }),
    costMetrics: z.string().min(1, { message: "Required Field!" }),
    bidPrice: z.number().min(1, { message: "Required Field!" }),
    subSupplyType: z.string(),
    dcFlag: z.string(),
    supplyType: z.string().min(1, { message: "Required Field!" }),
    adminSupplyType: z.string(),
    strictIfaTargeting: z.number(),
    pacingType: z.number(),
    gamblingFlag: z.boolean(),
    pixelFlag: z.boolean(),
    fcapKeyFlag: z.boolean(),
    adminBlockedAdclient: z.string(),
    stopLoss: z.number(),
    boostFactor: z.number().min(1, { message: "Minimum should be 1%!" }).max(100, { message: "Maximum should be 100%!" })
})

export type SettingsFormData = z.infer<typeof formSchema>

const metricsOptions = [
    { value: "CPM", label: "CPM" },
    { value: "CPC", label: "CPC" }
]

export default function SettingsModal({ campaign }: { campaign: CampaignType }) {

    const [supplyTypeOptions, setSupplyTypeOptions] = useState<{ value: string, label: string }[]>([])

    useEffect(() => {
        const fetchUser = async () => {
            const result = await fetchUserByRole("SSP")
            setSupplyTypeOptions(result.map((v: { id: number, name: string }) => ({ value: v.name, label: v.name })))
        }
        fetchUser()
    }, [])

    const form = useForm<SettingsFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            maxMargin: campaign.maxMargin || 40,
            status: campaign.status,
            costMetrics: campaign.costMetrics,
            bidPrice: campaign.bidPrice || 1,
            subSupplyType: campaign.subSupplyType || '',
            dcFlag: campaign.dcFlag || "1",
            supplyType: campaign.supplyType,
            adminSupplyType: campaign.adminSupplyType || '',
            strictIfaTargeting: campaign.strictIfaTargeting || 0,
            pacingType: campaign.pacingType || 0,
            gamblingFlag: campaign.gamblingFlag || false,
            pixelFlag: campaign.pixelFlag || false,
            fcapKeyFlag: campaign.fcapKeyFlag || false,
            adminBlockedAdclient: campaign.adminBlockedAdclient || '',
            stopLoss: campaign.stopLoss || 0,
            boostFactor: campaign.boostFactor || 1
        }
    })

    const { clearErrors, setValue, getValues } = form

    const onSubmit: SubmitHandler<SettingsFormData> = async (values: SettingsFormData) => {
        const result = await updateCampaignSetting(campaign.id, values)
        toast({ title: `${campaign.campaignName}`, description: result.message })
    }

    return (
        <Dialog>
            <DialogTrigger className='flex justify-start' asChild>
                <Button variant="ghost" size="sm" className='justify-start w-full'>
                    <Settings size={18} className='mr-2' />Settings
                </Button>
            </DialogTrigger>
            <DialogContent className='min-w-max'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                        <div className='grid grid-cols-3 space-x-3'>
                            <div className='col-span-1'>
                                <FormField
                                    control={form.control}
                                    name="maxMargin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Gross Margin<span className='text-red-900'>*</span></FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Margin" value={getValues("maxMargin")} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='col-span-1 mt-2 pt-1'>
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='flex justify-between'>
                                                <div>Status</div>
                                            </FormLabel>
                                            <FormControl>
                                                <div className='flex justify-center items-center'>
                                                    <SelectInput
                                                        placeholder="Country"
                                                        isClearable={false}
                                                        isSearchable={true}
                                                        name="status"
                                                        value={statusOptions?.filter(v => getValues("status") === v.value)[0]}
                                                        options={statusOptions}
                                                        onChange={(value) => {
                                                            setValue('status', value ? value.value : '')
                                                            clearErrors('status')
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='col-span-1 mt-2 pt-1'>
                                <FormField
                                    control={form.control}
                                    name="costMetrics"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='flex justify-between'>
                                                <div>Metrics</div>
                                            </FormLabel>
                                            <FormControl>
                                                <div className='flex justify-center items-center'>
                                                    <SelectInput
                                                        placeholder="Metrics"
                                                        isClearable={false}
                                                        isSearchable={true}
                                                        name="costMetrics"
                                                        options={metricsOptions}
                                                        value={metricsOptions?.filter(v => getValues("costMetrics") === v.value)[0]}
                                                        onChange={(value) => {
                                                            setValue('costMetrics', value ? value.value : '')
                                                            clearErrors('costMetrics')
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-3 space-x-3'>
                            <div className='col-span-1'>
                                <FormField
                                    control={form.control}
                                    name="bidPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bid Price<span className='text-red-900'>*</span></FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Bid Price" value={getValues("bidPrice")} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='col-span-1 mt-2 pt-1'>
                                <FormField
                                    control={form.control}
                                    name="subSupplyType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='flex justify-between'>
                                                <div>Exchanges Sub SSPs</div>
                                            </FormLabel>
                                            <FormControl>
                                                <div className='flex justify-center items-center'>
                                                    <SelectInput
                                                        placeholder="Exchanges Sub SSPs"
                                                        isClearable={false}
                                                        isSearchable={true}
                                                        name="subSupplyType"
                                                        options={[]}
                                                        onChange={(value) => {
                                                            setValue('subSupplyType', value ? value.value : '')
                                                            clearErrors('subSupplyType')
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='col-span-1'>
                                <FormField
                                    control={form.control}
                                    name="dcFlag"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>DC Flag<span className='text-red-900'>*</span></FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Dc Flag" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 space-x-3'>
                            <div className='col-span-1'>
                                <FormField
                                    control={form.control}
                                    name="supplyType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='flex justify-between'>
                                                <div>Exchanges Sub SSPs</div>
                                            </FormLabel>
                                            <FormControl>
                                                <div className='flex justify-center items-center'>
                                                    <MultiSelectInput
                                                        placeholder="Exchanges Sub SSPs"
                                                        isClearable={false}
                                                        isSearchable={true}
                                                        name="supplyType"
                                                        value={supplyTypeOptions.filter(v => getValues("supplyType").split(",").includes(v.value))}
                                                        options={supplyTypeOptions}
                                                        onChange={(e) => {
                                                            setValue('supplyType', e?.length ? e.map(v => v.value).join(",") : '')
                                                            clearErrors('supplyType')
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='col-span-1'>
                                <FormField
                                    control={form.control}
                                    name="adminSupplyType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='flex justify-between'>
                                                <div>Exchanges Sub SSPs</div>
                                            </FormLabel>
                                            <FormControl>
                                                <div className='flex justify-center items-center'>
                                                    <MultiSelectInput
                                                        placeholder="Exchanges Sub SSPs"
                                                        isClearable={false}
                                                        isSearchable={true}
                                                        name="adminSupplyType"
                                                        value={supplyTypeOptions.filter(v => getValues("adminSupplyType")?.split(",").includes(v.value))}
                                                        options={supplyTypeOptions}
                                                        onChange={(e) => {
                                                            setValue('adminSupplyType', e?.length ? e.map(v => v.value).join(",") : '')
                                                            clearErrors('adminSupplyType')
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-3 space-x-3'>
                            <div className='col-span-1'>
                                <FormField
                                    control={form.control}
                                    name="strictIfaTargeting"
                                    render={({ field }) => (
                                        <FormItem className='flex items-center'>
                                            <FormLabel>Strict IFA Targeting</FormLabel>
                                            <FormControl className='ml-2'>
                                                <Switch
                                                    checked={field.value === 1}
                                                    onCheckedChange={(e) => setValue("strictIfaTargeting", e ? 1 : 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='col-span-1'>
                                <FormField
                                    control={form.control}
                                    name="pacingType"
                                    render={({ field }) => (
                                        <FormItem className='flex items-center'>
                                            <FormLabel>Aggressive Pacing</FormLabel>
                                            <FormControl className='ml-2'>
                                                <Switch
                                                    checked={field.value === 1}
                                                    onCheckedChange={(e) => setValue("pacingType", e ? 1 : 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='col-span-1'>
                                <FormField
                                    control={form.control}
                                    name="gamblingFlag"
                                    render={({ field }) => (
                                        <FormItem className='flex items-center'>
                                            <FormLabel>Gamblig Campaign</FormLabel>
                                            <FormControl className='ml-2'>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-3 space-x-3'>
                            <div className='col-span-1'>
                                <FormField
                                    control={form.control}
                                    name="pixelFlag"
                                    render={({ field }) => (
                                        <FormItem className='flex items-center'>
                                            <FormLabel>Fraud Detection</FormLabel>
                                            <FormControl className='ml-2'>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='col-span-1'>
                                <FormField
                                    control={form.control}
                                    name="fcapKeyFlag"
                                    render={({ field }) => (
                                        <FormItem className='flex items-center'>
                                            <FormLabel>FCap IP Address</FormLabel>
                                            <FormControl className='ml-2'>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="adminBlockedAdclient"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Admin BL App/Site</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Admin BL App/Site"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='grid grid-cols-2 space-x-3'>
                            <div className='col-span-1'>
                                <FormField
                                    control={form.control}
                                    name="stopLoss"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Stop Loss</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Stop Loss" value={getValues("stopLoss")} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='col-span-1'>
                                <FormField
                                    control={form.control}
                                    name="boostFactor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bid Boost (%)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="1% - 100%" value={getValues("boostFactor")} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogTrigger asChild>
                                <Button>Back</Button>
                            </DialogTrigger>
                            <DialogTrigger asChild>
                                <PopoverClose asChild>
                                    <Button type="submit">UPDATE</Button>
                                </PopoverClose>
                            </DialogTrigger>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
