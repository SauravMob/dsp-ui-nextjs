type CreativeFilterTypes = {
    pageSize?: string
    campaignId?: string
    creativeId?: string
    status?: string
    creativeSize?: string
    creativeType?: string
    advertiserId?: string
    accountManagerId?: string
}

type CreativeType = {
    adFormat?: number,
    adName: string,
    adPosition?: string,
    advDomain?: string,
    advertiserId?: number,
    apiFramework?: number,
    approvedOn?: string,
    assetsPath?: string,
    bannerAdtype?: number,
    campaignId?: string,
    campaigns?: [
      {
        id: number,
        name: string
      }
    ],
    createdOn?: string,
    creativePath?: string,
    creativeSize?: string,
    creativeType?: string,
    deactiveFlag?: number,
    eridToken?: string,
    iabAdAttribute?: string,
    iabCategoryId?: string,
    id: number,
    isEndcard?: number,
    maxDuration?: number,
    pausedCamapigns?: number,
    playbackmethod?: string,
    protocols?: string,
    redirectUrl?: string,
    rmaContent?: string,
    rmaType?: string,
    runningCampaigns?: number,
    secureTag?: number,
    skip?: number,
    status?: string,
    statusReason?: string,
    thirdPartyPixel?: string,
    userId: number,
    videoClkThroughUrl?: string,
    videoClkTracking?: string,
    videoContent?: string,
    videoCreativeSize?: string,
    videoEndcardPath?: string,
    videoEndcardSize?: string,
    videoImpTracking?: string,
    videoMimeType?: string
}

type CreativeTabularData = {
  content: CreativeType[],
  totalElements: number,
  totalPages: number,
  last: boolean,
  pageNo: number,
  pageSize: number
}