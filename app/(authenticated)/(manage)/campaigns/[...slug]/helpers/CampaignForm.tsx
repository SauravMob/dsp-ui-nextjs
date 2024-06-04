"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import General from './steps/General'
import Budget from './steps/Budget'
import Targeting from './steps/Targeting'
import Inventory from './steps/Inventory'
import Creatives from './steps/Creatives'
import Review from './steps/Review'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Form } from '@/components/ui/form'
import { regexName } from '@/components/constants/regexConstants'
import { fetchCreativesByCampaign } from '@/app/(authenticated)/(assets)/creatives/actions'
import { createCampaign, updateCampaign } from '../../actions'
import { toast } from '@/components/ui/use-toast'

export type CampaignFormType = {
    id: number
    userId: number
    campaignName: string
    brandId: number
    sourceType: string
    schedule: string
    startDate: Date
    startTime: Date
    endDate: Date
    isEndDateEnabled: number
    deliveryHour: string | null
    costMetrics: string
    bidPrice: number
    pacingType: number
    auctionType: string | null
    budgetPerDay: number
    maxBudget: number
    impressionCap: number
    clickCap: number
    cappingType: number
    fcap: number
    clickFcap: number
    fcapHour: number
    fcapKeyFlag: boolean
    countries: string
    regions: string[]
    regionsExclude: string
    cities: string[]
    citiesExclude: string
    geoLatlonFilename: string | null
    connectionType: string[]
    carriers: string[]
    carriersExclude: string
    iptargetFilepath: string | null
    adMedium: string[]
    platforms: string[]
    deviceOsVersionType: string
    deviceOsVersion: string[]
    deviceManufacturer: string[]
    deviceManufacturerModel: string[]
    strictIfaTargeting: number
    gender: string
    age: string
    audienceTypeFlag: string
    audienceFlag: string
    audienceId: number[]
    audienceDiffId: number[]
    supplyType: string[]
    iabCategoryId: string[]
    dealId: string
    appTargeting: string
    appBundle: number[]
    appOpFlag: number
    adSlotFilePath: string | null
    creativeId: CreativeType[]
}

export default function CampaignForm({
    isEdit,
    editData,
    userId,
    isAdmin,
    userCustomFeatures
}: {
    isEdit: boolean,
    editData: CampaignType,
    userId: number,
    isAdmin: boolean,
    userCustomFeatures: string
}) {

    const router = useRouter()
    const [tab, setTab] = useState<string>("general")

    const formSchema = z.object({
        id: z.number(),
        userId: z.number(),
        campaignName: z.string()
            .min(1, { message: "Campaign Name is required" })
            .max(64, { message: "Campaign Name must be less than 64 characters" })
            .regex(regexName, { message: "Name is invalid, Only alphanumeric characters, hyphens(-), underscores(_) are allowed" }),
        brandId: z.number().min(1, { message: "Please select brand from list!" }),
        sourceType: z.string(),
        schedule: z.string(),
        startDate: z.date(),
        startTime: z.date(),
        endDate: z.date(),
        isEndDateEnabled: z.number(),
        deliveryHour: z.string().nullable().refine(data => {
            if (data) return Object.values(JSON.parse(data)).some(value => value !== "")
            else return true
        }, {
            message: "Select the day and time for schedule"
        }),
        costMetrics: z.string().default("CPM"),
        bidPrice: z.coerce.number().min(0.10, { message: "Minimum allowed bid price is $0.1" }).max(50.0, { message: "Maximum allowed bid price is $50.0" }),
        pacingType: z.number(),
        auctionType: z.string().nullable(),
        budgetPerDay: z.coerce.number().min(1, { message: "Required Field" }),
        maxBudget: z.coerce.number().min(1, { message: "Required Field" }),
        impressionCap: z.coerce.number(),
        clickCap: z.coerce.number(),
        cappingType: z.number(),
        fcap: z.coerce.number().min(0, { message: "Required Field" }),
        clickFcap: z.coerce.number().min(0, { message: "Required Field" }),
        fcapHour: z.coerce.number().min(1, { message: "Expiry hours cannot be less than 0" }).max(168, { message: "Expiry hours should not be greater than 7 days" }),
        fcapKeyFlag: z.boolean(),
        countries: z.string().min(1, { message: "Please select a country!" }),
        regions: z.array(z.string()),
        regionsExclude: z.string(),
        cities: z.array(z.string()),
        citiesExclude: z.string(),
        geoLatlonFilename: z.string().nullable(),
        connectionType: z.array(z.string()).min(1, { message: "Select a network type" }),
        carriers: z.array(z.string()),
        carriersExclude: z.string(),
        iptargetFilepath: z.string().nullable(),
        adMedium: z.array(z.string()).min(1, { message: "Select a device type" }),
        platforms: z.array(z.string()),
        deviceOsVersionType: z.string(),
        deviceOsVersion: z.array(z.string()),
        deviceManufacturer: z.array(z.string()),
        deviceManufacturerModel: z.array(z.string()),
        strictIfaTargeting: z.coerce.number(),
        gender: z.string(),
        age: z.string(),
        audienceTypeFlag: z.string(),
        audienceFlag: z.string(),
        audienceId: z.array(z.coerce.number()).transform(data => data.filter(v => v !== 0)),
        audienceDiffId: z.array(z.coerce.number()).transform(data => data.filter(v => v !== 0)),
        supplyType: z.array(z.string()).min(1, { message: "Select atleast 1 exchange" }),
        iabCategoryId: z.array(z.string()),
        dealId: z.string(),
        appTargeting: z.string(),
        appBundle: z.array(z.number()).transform(data => data.filter(v => v !== 0)),
        appOpFlag: z.number(),
        adSlotFilePath: z.string().nullable(),
        creativeId: z.array(z.object({ id: z.number() })).min(1, { message: "Need to attach atleast 1 creative!" }).transform(data => data.map(v => v.id))
    }).refine((data) => {
        if (data.isEndDateEnabled === 1 && data.startDate > data.endDate) return false
        else return true
    }, {
        message: "End date cannot be greater than start date",
        path: ["endDate"]
    }).refine((data) => {
        if (data.budgetPerDay > data.maxBudget) return false
        else return true
    }, {
        message: "Daily cap cannot be greater than total cap",
        path: ["maxBudget"]
    }).refine(data => {
        if (!data.adMedium.includes("DESKTOP") && data.platforms.length === 0) return false
        else return true
    }, {
        message: "Select atleast 1 platform",
        path: ["platforms"]
    }).refine((data) => {
        if (data.audienceFlag === '4' && data.audienceId.length === 0) return false
        else return true
    }, {
        message: "Minimum 1 audience is needed for whitelist",
        path: ["audienceId"]
    }).refine((data) => {
        if (data.audienceFlag === '4' && data.audienceDiffId.length === 0) return false
        else return true
    }, {
        message: "Minimum 1 audience is needed for blacklist",
        path: ["audienceDiffId"]
    }).refine((data) => {
        if (data.audienceFlag === '4' && data.audienceId.length >= 4) return false
        else return true
    }, {
        message: "Maximum 3 audience can be added for whitelist",
        path: ["audienceId"]
    }).refine((data) => {
        if (data.deviceOsVersionType === "SPECIFIC" && data.deviceOsVersion.length === 0) return false
        else return true
    }, {
        message: "Specific OS version needed!",
        path: ["deviceOsVersion"]
    })

    const form = useForm<CampaignFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: isEdit ? editData.id : 0,
            userId: isEdit ? editData.userId : userId,
            campaignName: isEdit ? editData.campaignName : "",
            brandId: isEdit ? editData.brandId : 0,
            sourceType: isEdit ? editData.sourceType : "APP",
            schedule: "UTC",
            startDate: isEdit ? editData.startDate ? new Date((editData.startDate as number) * 1000) : new Date() : new Date(),
            startTime: new Date(),
            endDate: isEdit ? editData.endDate ? new Date((editData.endDate as number) * 1000) : new Date() : new Date(),
            isEndDateEnabled: isEdit ? editData.isEndDateEnabled ? editData.isEndDateEnabled : 0 : 0,
            deliveryHour: isEdit ? editData.deliveryHour : null,
            costMetrics: isEdit ? editData.costMetrics : "CPM",
            bidPrice: isEdit ? editData.bidPrice : 0,
            pacingType: isEdit ? editData.pacingType : 0,
            auctionType: isEdit ? editData.auctionType : null,
            budgetPerDay: isEdit ? editData.budgetPerDay : 0,
            maxBudget: isEdit ? editData.maxBudget : 0,
            impressionCap: isEdit ? editData.impressionCap : 0,
            clickCap: isEdit ? editData.clickCap : 0,
            cappingType: isEdit ? editData.fcap ? 1 : 0 : 1,
            fcap: isEdit ? editData.fcap : 0,
            clickFcap: isEdit ? editData.clickFcap : 0,
            fcapHour: isEdit ? editData.fcapHour : 0,
            fcapKeyFlag: isEdit ? editData.fcapKeyFlag as boolean : false,
            countries: isEdit ? editData.countries : "",
            regions: isEdit ? editData.regionsExclude ? editData.regionsExclude.split(",") : editData.regions ? editData.regions.split(',') : [] : [],
            regionsExclude: isEdit ? editData.regionsExclude ? 'EXCLUDE' : "INCLUDE" : "INCLUDE",
            cities: isEdit ? editData.citiesExclude ? editData.citiesExclude.split(",") : editData.cities ? editData.cities.split(",") : [] : [],
            citiesExclude: isEdit ? editData.citiesExclude ? 'EXCLUDE' : "INCLUDE" : "INCLUDE",
            geoLatlonFilename: isEdit ? editData.geoLatlonFilename : null,
            connectionType: isEdit ? editData.connectionType ? editData.connectionType.split(',') : ['WIFI', 'CELLULAR_UNKNOWN'] : ['WIFI', 'CELLULAR_UNKNOWN'],
            carriers: isEdit ? editData.carriersExclude ? editData.carriersExclude.split(",") : editData.carriers ? editData.carriers.split(',') : [] : [],
            carriersExclude: isEdit ? editData.carriersExclude ? 'EXCLUDE' : "INCLUDE" : "INCLUDE",
            iptargetFilepath: isEdit ? editData.iptargetFilepath : null,
            adMedium: isEdit ? editData.adMedium.split(',') : ['MOBILE', 'TABLET'],
            platforms: isEdit ? editData.platforms ? editData.platforms.split(",") : [] : [],
            deviceOsVersionType: isEdit ? editData.deviceOsVersionType : 'ALL',
            deviceOsVersion: isEdit ? editData.deviceOsVersion ? editData.deviceOsVersion.split(",") : [] : [],
            deviceManufacturer: isEdit ? editData.deviceManufacturer ? editData.deviceManufacturer.split(",") : [] : [],
            deviceManufacturerModel: isEdit ? editData.deviceManufacturerModel ? editData.deviceManufacturerModel.split(",") : [] : [],
            strictIfaTargeting: isEdit ? editData.strictIfaTargeting : 2,
            gender: isEdit ? editData.gender : 'A',
            age: isEdit ? editData.age : '0',
            audienceTypeFlag: isEdit ? editData.audienceTypeFlag : '1',
            audienceFlag: isEdit ? editData.audienceFlag : '2',
            audienceId: isEdit ? editData.audienceId !== '0' ? editData.audienceFlag === '4' ? editData.audienceId.split("|")[0].split(",").map(x => parseInt(x)) : editData.audienceId.split(",").map(x => parseInt(x)) : [0] : [0],
            audienceDiffId: isEdit ? editData.audienceFlag === '4' ? editData.audienceId.split("|")[1].split(",").map(x => parseInt(x)) : [0] : [0],
            supplyType: isEdit ? editData.supplyType.split(",") : [],
            iabCategoryId: isEdit ? editData.iabCategoryId ? editData.iabCategoryId.split(",") : [] : [],
            dealId: isEdit ? editData.dealId : "",
            appTargeting: isEdit ? editData.blBundle ? "0" : "1" : "1",
            appBundle: isEdit ? editData.wlBundle ? editData.wlBundle.split(",").map(x => parseInt(x)) : editData.blBundle ? editData.blBundle.split(",").map(x => parseInt(x)) : [0] : [0],
            appOpFlag: isEdit ? editData.appOpFlag : 0,
            adSlotFilePath: isEdit ? editData.adSlotFilePath : null,
            creativeId: []
        }
    })

    const { trigger, handleSubmit } = form

    const steps: { [key: string]: { name: string, fields: string[] } } = {
        general: {
            name: 'General',
            fields: ['campaignName', 'brandId', 'deliveryHour', 'endDate']
        },
        budget: {
            name: 'Budget',
            fields: ['bidPrice', 'budgetPerDay', 'maxBudget', 'fcap', 'clickFcap', 'fcapHour']
        },
        targeting: {
            name: 'Targeting',
            fields: ['countries', 'connectionType', 'adMedium', 'platforms', 'deviceOsVersion', 'audienceId', 'audienceDiffId']
        },
        inventory: {
            name: 'Inventory',
            fields: ['supplyType']
        },
        creatives: {
            name: 'Creatives',
            fields: ['creativeId']
        },
        review: {
            name: 'Review',
            fields: []
        }
    }

    useEffect(() => {
        const fetchCampaignCr = async () => {
            const result = await fetchCreativesByCampaign(form.getValues("id").toString(), form.getValues("userId").toString())
            form.setValue("creativeId", result)
        }
        if (isEdit) fetchCampaignCr()
    }, [])

    const addCampaign = async (values: CampaignFormType) => {
        const obj: CampaignType = {
            id: values.id,
            campaignName: values.campaignName,
            brandId: values.brandId,
            sourceType: values.sourceType,
            startDate: values.startDate.toISOString(),
            endDate: values.endDate.toISOString(),
            isEndDateEnabled: values.isEndDateEnabled,
            deliveryHour: values.deliveryHour ? values.deliveryHour : null,
            costMetrics: values.costMetrics,
            bidPrice: values.bidPrice,
            budgetPerDay: values.budgetPerDay,
            maxBudget: values.maxBudget,
            impressionCap: values.impressionCap,
            clickCap: values.clickCap,
            fcap: values.cappingType === 1 ? values.fcap : 0,
            clickFcap: values.cappingType === 0 ? values.clickFcap : 0,
            fcapHour: values.fcapHour,
            fcapHourlyFlag: values.fcapHour ? 1 : 0,
            advertiserId: values.userId,
            userId: values.userId,
            adMedium: values.adMedium.join(","),
            connectionType: values.connectionType.join(","),
            auctionType: values.auctionType ? values.auctionType : null,
            deviceManufacturer: values.deviceManufacturer.length !== 0 ? values.deviceManufacturer.join(",") : null,
            deviceManufacturerModel: values.deviceManufacturerModel.length !== 0 ? values.deviceManufacturerModel.join(",") : null,
            platforms: values.platforms.length !== 0 ? values.platforms.join(",") : null,
            gender: values.gender,
            age: values.age,
            deviceOsVersionType: values.deviceOsVersionType,
            deviceOsVersion: values.deviceOsVersion.length !== 0 ? values.deviceOsVersion.join(",") : null,
            countries: values.countries,
            regions: values.regions.length !== 0 && values.regionsExclude !== "EXCLUDE" ? values.regions.join(",") : null,
            regionsExclude: values.regions.length !== 0 && values.regionsExclude === "EXCLUDE" ? values.regions.join(",") : null,
            cities: values.cities.length !== 0 && values.citiesExclude !== "EXCLUDE" ? values.cities.join(",") : null,
            citiesExclude: values.cities.length !== 0 && values.citiesExclude === "EXCLUDE" ? values.cities.join(",") : null,
            carriers: values.carriers.length !== 0 && values.carriersExclude !== "EXCLUDE" ? values.carriers.join(",") : null,
            carriersExclude: values.carriers.length !== 0 && values.carriersExclude === "EXCLUDE" ? values.carriers.join(",") : null,
            approvedOn: new Date().toISOString(),
            impTrackUrl: "",
            iabCategoryId: values.iabCategoryId.length !== 0 ? values.iabCategoryId.join(",") : null,
            status: "INACTIVE",
            audienceId: values.audienceId.length !== 0 ? values.audienceFlag !== "4" ? values.audienceId.join(",") : `${values.audienceId.join(",")}|${values.audienceDiffId.join(",")}` : "0",
            audienceFlag: values.audienceTypeFlag === '1' ? values.audienceFlag : '1',
            audienceTypeFlag: values.audienceTypeFlag,
            wlBundle: values.appTargeting === "1" && values.appBundle.length !== 0 ? values.appBundle.join(",") : null,
            blBundle: values.appTargeting === "0" && values.appBundle.length !== 0 ? values.appBundle.join(",") : null,
            appOpFlag: values.appTargeting === "1" ? values.appOpFlag : 0,
            strictIfaTargeting: values.strictIfaTargeting,
            pacingType: values.pacingType ? 1 : 0,
            isIpTargetingCampaign: values.iptargetFilepath ? 1 : 0,
            iptargetFilepath: values.iptargetFilepath,
            supplyType: values.supplyType.join(","),
            creativeId: values.creativeId.join(","),
            geoLatlonFilename: values.geoLatlonFilename,
            fcapKeyFlag: values.fcapKeyFlag ? 1 : 0,
            amountSpent: 0,
            dmpPartner: null,
            dailyAmountSpent: 0,
            adminSupplyType: null,
            clickDelivered: 0,
            impressionDelivered: 0,
            rtbBudgetSplit: 0,
            sspCost: 0,
            dailySspCost: 0,
            dailyRunStatus: 0,
            cpaGoal: 0,
            pixelFlag: 0,
            dcFlag: "1",
            tpFlag: 1,
            gamblingFlag: 0,
            flag: 1,
            maxMargin: 40,
            adSlotFilePath: values.adSlotFilePath,
            dealId: values.dealId
        }
        const result = await createCampaign(obj)
        if (result?.status === 200) {
            router.push(isAdmin ? '/campaign-manager' : '/campaigns')
            toast({ title: `Created campaign`, description: `Campaign created successfully` })
        } else toast({ title: `Error while creating campaign`, description: `Couldn't create campaign` })
        router.refresh()
    }

    const editCampaign = async (values: CampaignFormType) => {
        const obj: CampaignType = {
            id: values.id,
            campaignName: values.campaignName,
            brandId: values.brandId,
            sourceType: values.sourceType,
            startDate: values.startDate.toISOString(),
            endDate: values.endDate.toISOString(),
            isEndDateEnabled: values.isEndDateEnabled,
            deliveryHour: values.deliveryHour ? values.deliveryHour : null,
            costMetrics: values.costMetrics,
            bidPrice: values.bidPrice,
            budgetPerDay: values.budgetPerDay,
            maxBudget: values.maxBudget,
            impressionCap: values.impressionCap,
            clickCap: values.clickCap,
            fcap: values.cappingType === 1 ? values.fcap : 0,
            clickFcap: values.cappingType === 0 ? values.clickFcap : 0,
            fcapHour: values.fcapHour,
            fcapHourlyFlag: values.fcapHour ? 1 : 0,
            advertiserId: values.userId,
            userId: values.userId,
            adMedium: values.adMedium.join(","),
            connectionType: values.connectionType.join(","),
            auctionType: values.auctionType ? values.auctionType : null,
            deviceManufacturer: values.deviceManufacturer.length !== 0 ? values.deviceManufacturer.join(",") : null,
            deviceManufacturerModel: values.deviceManufacturerModel.length !== 0 ? values.deviceManufacturerModel.join(",") : null,
            platforms: values.platforms.length !== 0 ? values.platforms.join(",") : null,
            gender: values.gender,
            age: values.age,
            deviceOsVersionType: values.deviceOsVersionType,
            deviceOsVersion: values.deviceOsVersion.length !== 0 ? values.deviceOsVersion.join(",") : null,
            countries: values.countries,
            regions: values.regions.length !== 0 && values.regionsExclude !== "EXCLUDE" ? values.regions.join(",") : null,
            regionsExclude: values.regions.length !== 0 && values.regionsExclude === "EXCLUDE" ? values.regions.join(",") : null,
            cities: values.cities.length !== 0 && values.citiesExclude !== "EXCLUDE" ? values.cities.join(",") : null,
            citiesExclude: values.cities.length !== 0 && values.citiesExclude === "EXCLUDE" ? values.cities.join(",") : null,
            carriers: values.carriers.length !== 0 && values.carriersExclude !== "EXCLUDE" ? values.carriers.join(",") : null,
            carriersExclude: values.carriers.length !== 0 && values.carriersExclude === "EXCLUDE" ? values.carriers.join(",") : null,
            approvedOn: new Date().toISOString(),
            createdOn: editData.createdOn,
            impTrackUrl: "",
            iabCategoryId: values.iabCategoryId.length !== 0 ? values.iabCategoryId.join(",") : null,
            status: editData.status,
            audienceId: values.audienceId.length !== 0 ? values.audienceFlag !== "4" ? values.audienceId.join(",") : `${values.audienceId.join(",")}|${values.audienceDiffId.join(",")}` : "0",
            audienceFlag: values.audienceTypeFlag === '1' ? values.audienceFlag : '1',
            audienceTypeFlag: values.audienceTypeFlag,
            wlBundle: values.appTargeting === "1" && values.appBundle.length !== 0 ? values.appBundle.join(",") : null,
            blBundle: values.appTargeting === "0" && values.appBundle.length !== 0 ? values.appBundle.join(",") : null,
            appOpFlag: values.appTargeting === "1" ? values.appOpFlag : 0,
            strictIfaTargeting: values.strictIfaTargeting,
            pacingType: values.pacingType ? 1 : 0,
            isIpTargetingCampaign: values.iptargetFilepath ? 1 : 0,
            iptargetFilepath: values.iptargetFilepath,
            supplyType: values.supplyType.join(","),
            creativeId: values.creativeId.join(","),
            geoLatlonFilename: values.geoLatlonFilename,
            fcapKeyFlag: values.fcapKeyFlag ? 1 : 0,
            amountSpent: editData.amountSpent,
            dmpPartner: null,
            dailyAmountSpent: editData.dailyAmountSpent,
            adminSupplyType: editData.adminSupplyType,
            clickDelivered: editData.clickDelivered,
            impressionDelivered: editData.impressionDelivered,
            rtbBudgetSplit: editData.rtbBudgetSplit,
            sspCost: editData.sspCost,
            dailySspCost: editData.dailySspCost,
            dailyRunStatus: 1,
            cpaGoal: 0,
            pixelFlag: editData.pixelFlag,
            dcFlag: "1",
            tpFlag: 1,
            gamblingFlag: 0,
            flag: 1,
            maxMargin: editData.maxMargin,
            adSlotFilePath: values.adSlotFilePath,
            dealId: values.dealId
        }
        const result = await updateCampaign(obj.id, obj)
        if (result?.status === 200) {
            router.push(isAdmin ? '/campaign-manager' : '/campaigns')
            toast({ title: `Updated campaign`, description: `Campaign updated successfully` })
        } else toast({ title: `Error while updating campaign`, description: `Couldn't update campaign` })
        router.refresh()
    }

    const onSubmit: SubmitHandler<CampaignFormType> = async (values: CampaignFormType) => {
        if (isEdit) editCampaign(values)
        else addCampaign(values)
    }

    type FieldName = keyof CampaignFormType

    const next = async () => {
        const fields = steps[tab].fields
        const output = await trigger(fields as FieldName[], { shouldFocus: true })
        if (output) {
            if (tab === "review") await handleSubmit(onSubmit)()
            else {
                if (tab === "general") setTab("budget")
                if (tab === "budget") setTab("targeting")
                if (tab === "targeting") setTab("inventory")
                if (tab === "inventory") setTab("creatives")
                if (tab === "creatives") setTab("review")
            }
        }
    }

    const prev = () => {
        if (tab === "budget") setTab("general")
        if (tab === "targeting") setTab("budget")
        if (tab === "inventory") setTab("targeting")
        if (tab === "creatives") setTab("inventory")
        if (tab === "review") setTab("creatives")
    }

    return (
        <Tabs value={tab} onValueChange={setTab}>
            <TabsList className='w-full justify-between'>
                {Object.keys(steps).map((step: string) => <TabsTrigger key={step} value={step} className='w-full' disabled={!isEdit}>{steps[step].name}</TabsTrigger>)}
            </TabsList>
            <Form {...form}>
                <form onSubmit={(e) => form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    {Object.keys(steps).map((step: string) => (
                        <TabsContent key={step} value={step}>
                            {steps[step].name === "General" && <General form={form} isAdmin={isAdmin} next={next} isEdit={isEdit} />}
                            {steps[step].name === "Budget" && <Budget form={form} isAdmin={isAdmin} prev={prev} next={next} isEdit={isEdit} />}
                            {steps[step].name === "Targeting" && <Targeting form={form} isAdmin={isAdmin} prev={prev} next={next} isEdit={isEdit} />}
                            {steps[step].name === "Inventory" && <Inventory form={form} isAdmin={isAdmin} prev={prev} next={next} userCustomFeatures={userCustomFeatures} />}
                            {steps[step].name === "Creatives" && <Creatives form={form} isAdmin={isAdmin} prev={prev} next={next} />}
                            {steps[step].name === "Review" && <Review form={form} isAdmin={isAdmin} isEdit={isEdit} prev={prev} next={next} />}
                        </TabsContent>
                    ))}
                </form>
            </Form>
        </Tabs >
    )
}
