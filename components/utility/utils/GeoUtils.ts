import regionsData from '@/components/constants/json/country-regions.json'
import citiesData from '@/components/constants/json/country-cities.json'
import carriersData from '@/components/constants/json/country-carriers.json'
import deviceData from '@/components/constants/json/device-models.json'

interface Regions {
    [countryCode: string]: string
}

interface Cities {
    [regionCode: string]: string
}

interface Carriers {
    [carrierCode: string]: string
}

interface Devices {
    [deviceCode: string]: string
}

const regions: Regions = regionsData
const cities: Cities = citiesData
const carriers: Carriers = carriersData
const devices: Devices = deviceData

export const countryOption = [
    { label: 'Afghanistan', value: 'AFG' },
    { label: 'Albania', value: 'ALB' },
    { label: 'Algeria', value: 'DZA' },
    { label: 'Argentina', value: 'ARG' },
    { label: 'Armenia', value: 'ARM' },
    { label: 'Australia', value: 'AUS' },
    { label: 'Austria', value: 'AUT' },
    { label: 'Azerbaijan', value: 'AZE' },
    { label: 'Bahamas', value: 'BHS' },
    { label: 'Bahrain', value: 'BHR' },
    { label: 'Bangladesh', value: 'BGD' },
    { label: 'Belarus', value: 'BLR' },
    { label: 'Belgium', value: 'BEL' },
    { label: 'Bolivia', value: 'BOL' },
    { label: 'Bosnia and Herzegovina', value: 'BIH' },
    { label: 'Botswana', value: 'BWA' },
    { label: 'Brazil', value: 'BRA' },
    { label: 'Brunei Darussalam', value: 'BRN' },
    { label: 'Bulgaria', value: 'BGR' },
    { label: 'Cambodia', value: 'KHM' },
    { label: 'Cameroon', value: 'CMR' },
    { label: 'Canada', value: 'CAN' },
    { label: 'Chad', value: 'TCD' },
    { label: 'Chile', value: 'CHL' },
    { label: 'China', value: 'CHN' },
    { label: 'Colombia', value: 'COL' },
    { label: 'Congo', value: 'COG' },
    { label: 'Costa Rica', value: 'CRI' },
    { label: 'Cote dIvoire', value: 'CIV' },
    { label: 'Croatia', value: 'HRV' },
    { label: 'Cyprus', value: 'CYP' },
    { label: 'Czech Republic', value: 'CZE' },
    { label: 'Denmark', value: 'DNK' },
    { label: 'Dominica', value: 'DMA' },
    { label: 'Dominican Republic', value: 'DOM' },
    { label: 'Ecuador', value: 'ECU' },
    { label: 'Egypt', value: 'EGY' },
    { label: 'El Salvador', value: 'SLV' },
    { label: 'Estonia', value: 'EST' },
    { label: 'Ethiopia', value: 'ETH' },
    { label: 'Fiji', value: 'FJI' },
    { label: 'Finland', value: 'FIN' },
    { label: 'France', value: 'FRA' },
    { label: 'Gambia', value: 'GMB' },
    { label: 'Georgia', value: 'GEO' },
    { label: 'Germany', value: 'DEU' },
    { label: 'Ghana', value: 'GHA' },
    { label: 'Gibraltar', value: 'GIB' },
    { label: 'Greece', value: 'GRC' },
    { label: 'Greenland', value: 'GRL' },
    { label: 'Hong Kong', value: 'HKG' },
    { label: 'Hungary', value: 'HUN' },
    { label: 'Iceland', value: 'ISL' },
    { label: 'India', value: 'IND' },
    { label: 'Indonesia', value: 'IDN' },
    { label: 'Iran', value: 'IRN' },
    { label: 'Iraq', value: 'IRQ' },
    { label: 'Ireland', value: 'IRL' },
    { label: 'Israel', value: 'ISR' },
    { label: 'Italy', value: 'ITA' },
    { label: 'Japan', value: 'JPN' },
    { label: 'Jordan', value: 'JOR' },
    { label: 'Kazakhstan', value: 'KAZ' },
    { label: 'Kenya', value: 'KEN' },
    { label: 'North Korea', value: 'PRK' },
    { label: 'South Korea', value: 'KOR' },
    { label: 'Kuwait', value: 'KWT' },
    { label: 'Kyrgyzstan', value: 'KGZ' },
    { label: 'Lao', value: 'LAO' },
    { label: 'Latvia', value: 'LVA' },
    { label: 'Lebanon', value: 'LBN' },
    { label: 'Lesotho', value: 'LSO' },
    { label: 'Liberia', value: 'LBR' },
    { label: 'Libya', value: 'LBY' },
    { label: 'Lithuania', value: 'LTU' },
    { label: 'Luxembourg', value: 'LUX' },
    { label: 'Macao', value: 'MAC' },
    { label: 'Macedonia', value: 'MKD' },
    { label: 'Madagascar', value: 'MDG' },
    { label: 'Malawi', value: 'MWI' },
    { label: 'Malaysia', value: 'MYS' },
    { label: 'Maldives', value: 'MDV' },
    { label: 'Mali', value: 'MLI' },
    { label: 'Malta', value: 'MLT' },
    { label: 'Mauritius', value: 'MUS' },
    { label: 'Mexico', value: 'MEX' },
    { label: 'Moldova (Republic of)', value: 'MDA' },
    { label: 'Monaco', value: 'MCO' },
    { label: 'Mongolia', value: 'MNG' },
    { label: 'Montenegro', value: 'MNE' },
    { label: 'Morocco', value: 'MAR' },
    { label: 'Myanmar', value: 'MMR' },
    { label: 'Namibia', value: 'NAM' },
    { label: 'Nepal', value: 'NPL' },
    { label: 'Netherlands', value: 'NLD' },
    { label: 'New Zealand', value: 'NZL' },
    { label: 'Niger', value: 'NER' },
    { label: 'Nigeria', value: 'NGA' },
    { label: 'Norway', value: 'NOR' },
    { label: 'Oman', value: 'OMN' },
    { label: 'Pakistan', value: 'PAK' },
    { label: 'Palau', value: 'PLW' },
    { label: 'Palestine, State of', value: 'PSE' },
    { label: 'Panama', value: 'PAN' },
    { label: 'Papua New Guinea', value: 'PNG' },
    { label: 'Paraguay', value: 'PRY' },
    { label: 'Peru', value: 'PER' },
    { label: 'Philippines', value: 'PHL' },
    { label: 'Poland', value: 'POL' },
    { label: 'Portugal', value: 'PRT' },
    { label: 'Qatar', value: 'QAT' },
    { label: 'Romania', value: 'ROU' },
    { label: 'Russian Federation', value: 'RUS' },
    { label: 'Rwanda', value: 'RWA' },
    { label: 'Saudi Arabia', value: 'SAU' },
    { label: 'Senegal', value: 'SEN' },
    { label: 'Serbia', value: 'SRB' },
    { label: 'Seychelles', value: 'SYC' },
    { label: 'Singapore', value: 'SGP' },
    { label: 'Slovakia', value: 'SVK' },
    { label: 'Slovenia', value: 'SVN' },
    { label: 'Solomon Islands', value: 'SLB' },
    { label: 'Somalia', value: 'SOM' },
    { label: 'South Africa', value: 'ZAF' },
    { label: 'South Sudan', value: 'SSD' },
    { label: 'Spain', value: 'ESP' },
    { label: 'Sri Lanka', value: 'LKA' },
    { label: 'Sudan', value: 'SDN' },
    { label: 'Suriname', value: 'SUR' },
    { label: 'Swaziland', value: 'SWZ' },
    { label: 'Sweden', value: 'SWE' },
    { label: 'Switzerland', value: 'CHE' },
    { label: 'Syrian Arab Republic', value: 'SYR' },
    { label: 'Taiwan', value: 'TWN' },
    { label: 'Tajikistan', value: 'TJK' },
    { label: 'Tanzania', value: 'TZA' },
    { label: 'Thailand', value: 'THA' },
    { label: 'Tunisia', value: 'TUN' },
    { label: 'Turkey', value: 'TUR' },
    { label: 'Turkmenistan', value: 'TKM' },
    { label: 'Uganda', value: 'UGA' },
    { label: 'Ukraine', value: 'UKR' },
    { label: 'United Arab Emirates', value: 'ARE' },
    { label: 'Great Britain', value: 'GBR' },
    { label: 'United States of America', value: 'USA' },
    { label: 'Uruguay', value: 'URY' },
    { label: 'Uzbekistan', value: 'UZB' },
    { label: 'Venezuela', value: 'VEN' },
    { label: 'Vietnam', value: 'VNM' },
    { label: 'Yemen', value: 'YEM' },
    { label: 'Zambia', value: 'ZMB' },
    { label: 'Zimbabwe', value: 'ZWE' }
]

export const includeExcludeOptions = [
    { value: 'INCLUDE', label: 'INCLUDE' },
    { value: 'EXCLUDE', label: 'EXCLUDE' }
]

export const getRegionOptions = (country: string) => {
    const regionsMap: { value: string, label: string }[] = []
    if (country !== undefined && regions[country] !== undefined) {
        regions[country].split(',').map((r) => regionsMap.push({
            label: r,
            value: r
        }))
    }
    return regionsMap
}

export const getCitiesOptions = (country: string, selRegions: string[], geoMenu: string) => {
    const citiesMap: { value: string, label: string, region: string }[] = []
    let temp: string[] = []
    if (geoMenu === 'EXCLUDE') {
        temp = regions[country]?.split(',').filter(reg => !selRegions.includes(reg))
    } else temp = selRegions

    temp?.map((r) => {
        const data = cities[`${country}.${r.replace(/\s+/g, '')}`]
        if (data !== undefined) {
            data.split(',').map((c) => citiesMap.push({
                label: `${c}, ${r}`,
                value: c,
                region: r
            }))
        }
    })
    return citiesMap
}

export const getCarrierOptions = (country: string) => {
    const carriersMap: { value: string, label: string }[] = []
    carriers[country]?.split(',').map((r) => carriersMap.push({
        label: r,
        value: r
    }))
    return carriersMap
}

export const getDeviceModelOptions = (dmf: string[]) => {
    const deviceModelMap = dmf.length > 0 ? [{ label: 'ALL', value: 'ALL' }] : []
    dmf.map((dm) => {
        if (dmf !== undefined && devices[dm] !== undefined) {
            devices[dm].split(',').map((r) => {
                if (r !== 'ALL') {
                    deviceModelMap.push({
                        label: r,
                        value: r
                    })
                }
            })
        }
    })
    return deviceModelMap
}