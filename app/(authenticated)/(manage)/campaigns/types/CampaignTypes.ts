type CampaignType = {
    adMedium: string,
    adSlotFilePath?: string | null,
    adSlotId?: number,
    adminBlockedAdclient?: string,
    adminSupplyType?: string | null,
    advertiserId?: number
    age?: string,
    amountSpent: number
    appOpFlag?: number
    approvedOn?: string,
    auctionType?: string | null,
    audienceFlag?: string,
    audienceId: string,
    audienceTypeFlag?: string,
    bidPrice?: number
    blBundle?: string | null,
    blDomain?: string,
    blTagid?: string,
    blockedAdclient?: string,
    boostFactor?: number
    brandId?: number
    brandName?: string,
    browserTarget?: string,
    budgetPerDay?: number
    campaignName?: string,
    carriers?: string | null,
    carriersExclude?: string | null,
    cities?: string | null,
    citiesExclude?: string | null,
    clickCap?: number
    clickCapTotal?: number
    clickDelivered?: number
    clickFcap?: number
    clickValidation?: number
    connectionType?: string,
    costMetrics?: string,
    countries?: string,
    cpaGoal?: number
    createdOn?: string,
    creativeId?: string,
    creativeType?: string,
    custImpPacing?: number
    dailyAmountSpent: number
    dailyRunStatus?: number
    dailySspCost?: number
    dcFlag?: string,
    dealId?: string,
    deliveryDay?: string,
    deliveryHour?: string | null,
    deviceManufacturer?: string | null,
    deviceManufacturerModel?: string | null,
    deviceOsVersion?: string | null,
    deviceOsVersionType?: string,
    endDate?: number | string,
    fcap?: number
    fcapHour?: number
    fcapHourlyFlag?: number
    fcapKeyFlag?: boolean | number,
    fcapType?: string,
    flag?: number,
    gamblingFlag?: number,
    gender?: string,
    geoLatLon?: string,
    geoLatlonFilename?: string | null,
    geoPostalCodeFilePath?: string,
    iabCategoryId?: string | null,
    id: number
    impTrackUrl?: string,
    impressionCap?: number
    impressionCapTotal?: number
    impressionDelivered?: number
    inventoryType?: string,
    ipTargetRanges?: string,
    iptargetFilepath?: string | null,
    isEndDateEnabled?: number
    isIpTargetingCampaign?: number
    isPredictEnabled?: true,
    lastModifiedOn?: string,
    latlonRadiusDistance?: number
    maxBudget?: number
    maxMargin?: number
    mode?: string,
    opentrafficPercentage?: number
    pacingType?: number
    pixelFlag?: number,
    platformVerAndroid?: string,
    platformVerOsx?: string,
    platforms?: string | null,
    postalCode?: string,
    postalCodeExclude?: string,
    postbackUrl?: string,
    regions?: string | null,
    regionsExclude?: string | null,
    rtaCampaignId?: string,
    rtbBudgetSplit?: number
    sourceType?: string,
    sspCost?: number
    startDate?: number | string,
    status?: string,
    statusReason?: string,
    stopLoss?: number
    strictIfaTargeting?: number
    subSupplyType?: string,
    supplyType: string,
    tpFlag?: number,
    userId?: number
    wlAdclient?: string,
    wlBundle?: string | null,
    wlDomain?: string,
    wlTagid?: string,
    dmpPartner?: null
}

type CampaignFilterTypes = {
    pageNo?: string
    pageSize?: string
    campaignId?: string
    status?: string
    country?: string
    os?: string
    accountManagerId?: string
    advertiserId?: string
}

type CampaignTabularData = {
    content: CampaignType[],
    totalElements: number,
    totalPages: number,
    last: boolean,
    pageNo: number,
    pageSize: number
}