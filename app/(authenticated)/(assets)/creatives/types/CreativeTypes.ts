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
  adFormat?: number
  adName: string
  adPosition?: string
  advDomain?: string
  advertiserId?: number
  apiFramework?: number | null
  approvedOn?: string | number
  assetsPath?: string
  bannerAdtype?: number
  campaignId?: string
  campaigns?: [
    {
      id: number
      name: string
    }
  ]
  createdOn?: string | number
  creativePath?: string | null
  creativeSize?: string
  creativeType?: string
  deactiveFlag?: number
  eridToken?: string | null
  fidelityType?: number
  iabAdAttribute?: string | null
  iabCategoryId?: string
  id: string
  isEndcard?: number | null
  itunesAppId?: string | null
  maxDuration?: number | null
  pausedCamapigns?: number
  playbackmethod?: string | null
  protocols?: string | null
  redirectUrl?: string | null
  rmaContent?: string | null
  rmaType?: string
  runningCampaigns?: number
  secureTag?: number
  skip?: number
  status?: string
  statusReason?: string
  thirdPartyPixel?: string | null
  userId: number
  videoClkThroughUrl?: string
  videoClkTracking?: string | null
  videoContent?: string
  videoCreativeSize?: string
  videoEndcardPath?: string | null
  videoEndcardSize?: string | null
  videoImpTracking?: string | null
  videoMimeType?: string | null
}

type CreativeTabularData = {
  content: CreativeType[]
  totalElements: number
  totalPages: number
  last: boolean
  pageNo: number
  pageSize: number
}