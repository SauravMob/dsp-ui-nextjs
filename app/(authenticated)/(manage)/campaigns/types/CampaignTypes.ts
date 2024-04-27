type CampaignType = {
    adMedium?: string,
    adSlotFilePath?: string,
    adSlotId?: number,
    adminBlockedAdclient?: string,
    adminSupplyType?: string,
    advertiserId?: number
    age?: string,
    amountSpent?: number
    appOpFlag?: number
    approvedOn?: string,
    auctionType?: string,
    audienceFlag?: string,
    audienceId?: string,
    audienceTypeFlag?: string,
    bidPrice?: number
    blBundle?: string,
    blDomain?: string,
    blTagid?: string,
    blockedAdclient?: string,
    boostFactor?: number
    brandId?: number
    brandName?: string,
    browserTarget?: string,
    budgetPerDay?: number
    campaignName?: string,
    carriers?: string,
    carriersExclude?: string,
    cities?: string,
    citiesExclude?: string,
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
    dailyAmountSpent?: number
    dailyRunStatus?: number
    dailySspCost?: number
    dcFlag?: string,
    dealId?: string,
    deliveryDay?: string,
    deliveryHour?: string,
    deviceManufacturer?: string,
    deviceManufacturerModel?: string,
    deviceOsVersion?: string,
    deviceOsVersionType?: string,
    endDate?: string,
    fcap?: number
    fcapHour?: number
    fcapHourlyFlag?: number
    fcapKeyFlag?: true,
    fcapType?: string,
    flag?: true,
    gamblingFlag?: true,
    gender?: string,
    geoLatLon?: string,
    geoLatlonFilename?: string,
    geoPostalCodeFilePath?: string,
    iabCategoryId?: string,
    id?: number
    impTrackUrl?: string,
    impressionCap?: number
    impressionCapTotal?: number
    impressionDelivered?: number
    inventoryType?: string,
    ipTargetRanges?: string,
    iptargetFilepath?: string,
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
    pixelFlag?: true,
    platformVerAndroid?: string,
    platformVerOsx?: string,
    platforms?: string,
    postalCode?: string,
    postalCodeExclude?: string,
    postbackUrl?: string,
    regions?: string,
    regionsExclude?: string,
    rtaCampaignId?: string,
    rtbBudgetSplit?: number
    sourceType?: string,
    sspCost?: number
    startDate?: string,
    status?: string,
    statusReason?: string,
    stopLoss?: number
    strictIfaTargeting?: number
    subSupplyType?: string,
    supplyType?: string,
    tpFlag?: true,
    userId?: number
    wlAdclient?: string,
    wlBundle?: string,
    wlDomain?: string,
    wlTagid?: string
}

type CampaignFilterTypes = {
    pageNo: string
    pageSize: string
    campaignId: string
    status: string
    country: string
    os: string
}

type TabularData = {
    content: CampaignType[],
    totalElements: number,
    totalPages: number,
    last: boolean,
    pageNo: number,
    pageSize: number
}