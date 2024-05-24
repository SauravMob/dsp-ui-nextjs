import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subDays, subMonths } from 'date-fns'

export const kFormatter = (num: number) => (num > 10 ? `${(num / 1000).toFixed(1)}k` : num)
export const numFormatter = (num: number) => (new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(num))
export const todayDate = new Date()
export const yesterdayDate = subDays(new Date(), 1)
export const todayMinus2Date = subDays(new Date(), 2)
export const todayMinus7Date = subDays(new Date(), 7)
export const startOfLastWeekDate = startOfWeek(subDays(new Date(), 7))
export const endOfLastWeekDate = endOfWeek(subDays(new Date(), 7))
export const startOfThisMonth = startOfMonth(new Date())
export const endOfThisMonth = endOfMonth(new Date())
export const startOfLastMonth = startOfMonth(subMonths(new Date(), 1))
export const endOfLastMonth = endOfMonth(subMonths(new Date(), 1))
export const todayMinus3MonthsDate = subMonths(new Date(), 3)
export const formatQryDate = (value: Date | undefined) => {
    if (value) return format(value, 'yyyy-MM-dd')
    else return value
}

export const portraitSizes = '300x50, 320x50, 320x100, 300x1050, 320x480, 160x600, 300x600'
export const landscapeSizes = '468x60, 728x90, 480x320, 1080x1080, 1024x768, 640x360, 1200x627, 336x280, 768x1024'
export const interstitialSizes = ['480x320', '1024x768', '320x480', '768x1024', '1080x1920', '1920x1080']

export const getDateForPosix = (d: number, unit: string) => {
    const u = unit === 'SECONDS' ? 1000 : 1
    try {
        const date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(d * u)
        return date
    } catch (e) {
        return d
    }
}

export function formatNumbers(number: number) {
    const formatter = Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 3
    })
    return formatter.format(number)
}

export function getUpdateStatus(status: string) {
    switch (status) {
        case 'ACTIVE':
            return 'PAUSE'
        case 'PAUSE':
            return 'ACTIVE'
        case 'INACTIVE':
            return 'ACTIVE'
        default:
            return 'DELETED'
    }
}

export const getRole = (role: string) => {
    switch (role) {
        case '1':
            return 'ADVERTISER'
        case '2':
            return 'ADMIN'
        case '3':
            return 'ACCOUNT MANAGER'
        case '4':
            return 'SSP'
        default:
            return 'DELETED'
    }
}

export const getAdType = (type: string) => {
    switch (type) {
        case 'BANNER':
            return 2
        case 'JS':
            return 3
        case 'RICHMEDIA':
            return 3
        case 'VIDEO':
            return 5
        default:
            return 0
    }
}

export function getContentWithLimit(str: string, limit: number) {
    if (str !== undefined && str !== null) return str.length > limit ? `${str.substring(0, limit)}...` : str
    else return str
}

export async function getImgDimension(imgFile: File): Promise<{ width: number, height: number }> {
    return new Promise(resolve => {
        const url = URL.createObjectURL(imgFile)
        const img = new Image
        img.onload = function () {
            URL.revokeObjectURL(img.src)
            resolve({
                width: img.width,
                height: img.height
            })
        }
        img.src = url
    })
}

export async function getImageSizeOfUrl(imageUrl: string) {
    return await fetch(imageUrl).then(resp => {
        return resp.headers.get("content-length")
    }).catch((err) => {
        return 0
    })
}

export const getCreativeType = (size: string) => {
    if (portraitSizes.includes(size)) return 'PORTRAIT'
    else if (landscapeSizes.includes(size)) return 'LANDSCAPE'
    else return 'PORTRAIT'
}

export const getCreativeDetails = (path: string | undefined, type: string) => {
    if (path === null || path === undefined || path === '') return ''
    else {
        if (type === 'EXTENSION') {
            const ex = path.match(/\.([^./]+)$/)?.[1] || ""
            return ex === 'jpg' ? 'jpeg' : ex
        } else if (type === 'FILENAME') {
            const match = path.match(/\/([^\/]+\.[^\/]+)$/)
            return match ? match[1] : ''
        }
    }
}

export const statusOptions = [
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'INACTIVE', value: 'INACTIVE' },
    { label: 'DELETED', value: 'DELETE' },
    { label: 'PAUSED', value: 'PAUSE' }
]

export const statusWithoutInactiveOptions = [
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'PAUSE', value: 'PAUSE' },
    { label: 'DELETE', value: 'DELETE' }
]

export const statusWithoutPauseOptions = [
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'INACTIVE', value: 'INACTIVE' },
    { label: 'DELETED', value: 'DELETE' }
]

export const osOptions = [
    { label: 'Android', value: 'ANDROID' },
    { label: 'iOS', value: 'IOS' },
    { label: 'Unknown', value: 'UNKNOWN' }
]

export const uploadTypeOptions = [
    { value: "manual", label: "MANUAL" },
    { value: "mmp", label: "MMP" },
    { label: 'INTEGRATED', value: 'integrated_audience' },
    { label: 'INTERNAL', value: 'internal' }
]

export const creativeSizeOptions = [
    { value: '320x480', label: '320x480' },
    { value: '320x50', label: '320x50' },
    { value: '160x600', label: '160x600' },
    { value: '600x600', label: '600x600' },
    { value: '300x600', label: '300x600' },
    { value: '768x1024', label: '768x1024' },
    { value: '300x250', label: '300x250' },
    { value: '300x50', label: '300x50' },
    { value: '320x100', label: '320x100' },
    { value: '468x60', label: '468x60' },
    { value: '728x90', label: '728x90' },
    { value: '300x1050', label: '300x1050' },
    { value: '1080x1080', label: '1080x1080' },
    { value: '480x320', label: '480x320' },
    { value: '1024x768', label: '1024x768' },
    { value: '640x360', label: '640x360' },
    { value: '1200x627', label: '1200x627' },
    { value: '336x280', label: '336x280' }
]

export const richMediaCreativeSizeOption = [
    { label: '320x50', value: '320x50' },
    { label: '300x250', value: '300x250' },
    { label: '320x480', value: '320x480' },
    { label: '300x50', value: '300x50' },
    { label: '480x320', value: '480x320' },
    { label: '120x20', value: '120x20' },
    { label: '168x28', value: '168x28' },
    { label: '728x90', value: '728x90' },
    { label: '468x60', value: '468x60' },
    { label: '1024x768', value: '1024x768' },
    { label: '768x1024', value: '768x1024' },
    { label: '120x600', value: '120x600' },
    { label: '160x600', value: '160x600' },
    { label: '300x600', value: '300x600' },
    { label: '800x480', value: '800x480' }
]

export const creativeTypeOptions = [
    { value: 'BANNER', label: 'BANNER' },
    { value: 'JS', label: 'RICHMEDIA' },
    { value: 'VIDEO', label: 'VIDEO' }
]

export const roleOptions = [
    { value: '1', label: 'Advertiser' },
    { value: '2', label: 'Admin' },
    { value: '4', label: 'SSP' },
    { value: '3', label: 'Account Manager' }
]

export const customFeatureOptions = [
    { value: 'DEAL', label: 'DEAL' },
    { value: 'AUDIENCE', label: 'AUDIENCE' },
    { value: 'BID MULTIPLIER', label: 'BID MULTIPLIER' },
    { value: 'INTERNAL', label: 'NEW AUDIENCE' },
    { value: 'VIDEO TRACKING', label: 'VIDEO TRACKING' }
]

export const dmpPartnerOptions = [
    { value: 'BOBBLE', label: 'BOBBLE' },
    { value: 'NIELSON', label: 'NIELSON' },
    { value: 'LOTAME', label: 'LOTAME' },
    { value: 'MOBAVENUE', label: 'MOBAVENUE' }
]

export const dataWindowOptions = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '5', label: '5' },
    { value: '7', label: '7' },
    { value: '15', label: '15' },
    { value: '30', label: '30' },
    { value: '60', label: '60' },
    { value: '90', label: '90' }
]

export const reengageIntervalOptions = [
    { value: '0', label: '0' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '7', label: '7' },
    { value: '15', label: '15' },
    { value: '30', label: '30' },
    { value: '60', label: '60' }
]

export const constainsOptions = [
    { value: "contains", label: "Contains" },
    { value: "notcontains", label: "Not Contains" }
]

export const orientationOptions = [
    { label: 'Landscape', value: 'landscape' },
    { label: 'Portrait', value: 'portrait' },
    { label: 'Unknown', value: 'unknown' }
]

export const adSizeOptions = [
    { label: '300x250', value: '300x250' },
    { label: '300x50', value: '300x50' },
    { label: '320x50', value: '320x50' },
    { label: '320x100', value: '320x100' },
    { label: '468x60', value: '468x60' },
    { label: '728x90', value: '728x90' },
    { label: '480x320', value: '480x320' },
    { label: '640x360', value: '640x360' },
    { label: '1200x627', value: '1200x627' },
    { label: '336x280', value: '336x280' },
    { label: '1024x768', value: '1024x768' },
    { label: '1080x1080', value: '1080x1080' },
    { label: '300x1050', value: '300x1050' },
    { label: '320x480', value: '320x480' },
    { label: '160x600', value: '160x600' },
    { label: '600x600', value: '600x600' },
    { label: '300x600', value: '300x600' },
    { label: '768x1024', value: '768x1024' },
    { label: 'Unknown', value: 'unknown' }
]

export const groupedCategoryOptions = [
    {
        label: 'IAB1 - Arts & Entertainment',
        options: [
            { value: '1', label: 'Books & Literature [IAB1-1]' },
            { value: '2', label: 'Celebrity Fan/Gossip [IAB1-2]' },
            { value: '3', label: 'Fine Art [IAB1-3]' },
            { value: '4', label: 'Humor [IAB1-4]' },
            { value: '5', label: 'Movies [IAB1-5]' },
            { value: '6', label: 'Music [IAB1-6]' },
            { value: '7', label: 'Television [IAB1-7]' }
        ]
    },
    {
        label: 'IAB2 - Automotive',
        options: [
            { value: '8', category_value: 'IAB2', label: 'Auto Parts [IAB2-1]' },
            { value: '9', category_value: 'IAB2', label: 'Auto Repair [IAB2-2]' },
            { value: '10', category_value: 'IAB2', label: 'Buying/Selling Cars [IAB2-3]' },
            { value: '11', category_value: 'IAB2', label: 'Car Culture [IAB2-4]' },
            { value: '12', category_value: 'IAB2', label: 'Certified Pre-Owned [IAB2-5]' },
            { value: '13', category_value: 'IAB2', label: 'Convertible [IAB2-6]' },
            { value: '14', category_value: 'IAB2', label: 'Coupe [IAB2-7]' },
            { value: '15', category_value: 'IAB2', label: 'Crossover [IAB2-8]' },
            { value: '16', category_value: 'IAB2', label: 'Diesel [IAB2-9]' },
            { value: '17', category_value: 'IAB2', label: 'Electric Vehicle [IAB2-10]' },
            { value: '18', category_value: 'IAB2', label: 'Hatchback [IAB2-11]' },
            { value: '19', category_value: 'IAB2', label: 'Hybrid [IAB2-12]' },
            { value: '20', category_value: 'IAB2', label: 'Luxury [IAB2-13]' },
            { value: '21', category_value: 'IAB2', label: 'MiniVan [IAB2-14]' },
            { value: '22', category_value: 'IAB2', label: 'Mororcycles [IAB2-15]' },
            { value: '23', category_value: 'IAB2', label: 'Off-Road Vehicles [IAB2-16]' },
            { value: '24', category_value: 'IAB2', label: 'Performance Vehicles [IAB2-17]' },
            { value: '25', category_value: 'IAB2', label: 'Pickup [IAB2-18]' },
            { value: '26', category_value: 'IAB2', label: 'Road-Side Assistance [IAB2-19]' },
            { value: '27', category_value: 'IAB2', label: 'Sedan [IAB2-20]' },
            { value: '28', category_value: 'IAB2', label: 'Trucks & Accessories [IAB2-21]' },
            { value: '29', category_value: 'IAB2', label: 'Vintage Cars [IAB2-22]' },
            { value: '30', category_value: 'IAB2', label: 'Wagon [IAB2-23]' }
        ]
    },
    {
        label: 'IAB3 - Business',
        options: [
            { value: '31', category_value: 'IAB3', label: 'Advertising [IAB3-1]' },
            { value: '32', category_value: 'IAB3', label: 'Agriculture [IAB3-2]' },
            { value: '33', category_value: 'IAB3', label: 'Biotech/Biomedical [IAB3-3]' },
            { value: '34', category_value: 'IAB3', label: 'Business Software [IAB3-4]' },
            { value: '35', category_value: 'IAB3', label: 'Construction [IAB3-5]' },
            { value: '36', category_value: 'IAB3', label: 'Forestry [IAB3-6]' },
            { value: '37', category_value: 'IAB3', label: 'Government [IAB3-7]' },
            { value: '38', category_value: 'IAB3', label: 'Green Solutions [IAB3-8]' },
            { value: '39', category_value: 'IAB3', label: 'Human Resources [IAB3-9]' },
            { value: '40', category_value: 'IAB3', label: 'Logistics [IAB3-10]' },
            { value: '41', category_value: 'IAB3', label: 'Marketing [IAB3-11]' },
            { value: '42', category_value: 'IAB3', label: 'Metals [IAB3-12]' }
        ]
    },
    {
        label: 'IAB4 - Careers',
        options: [
            { value: '43', category_value: 'IAB4', label: 'Career Planning [IAB4-1]' },
            { value: '44', category_value: 'IAB4', label: 'College [IAB4-2]' },
            { value: '45', category_value: 'IAB4', label: 'Financial Aid [IAB4-3]' },
            { value: '46', category_value: 'IAB4', label: 'Job Fairs [IAB4-4]' },
            { value: '47', category_value: 'IAB4', label: 'Job Search [IAB4-5]' },
            { value: '48', category_value: 'IAB4', label: 'Resume Writing/Advice [IAB4-6]' },
            { value: '49', category_value: 'IAB4', label: 'Nursing [IAB4-7]' },
            { value: '50', category_value: 'IAB4', label: 'Scholarships [IAB4-8]' },
            { value: '51', category_value: 'IAB4', label: 'Telecommuting [IAB4-9]' },
            { value: '52', category_value: 'IAB4', label: 'U.S. Military [IAB4-10]' },
            { value: '53', category_value: 'IAB4', label: 'Career Advice [IAB4-11]' }

        ]
    },
    {
        label: 'IAB5 - Education',
        options: [
            { value: '54', category_value: 'IAB5', label: '7-12 Education [IAB5-1]' },
            { value: '55', category_value: 'IAB5', label: 'Adult Education [IAB5-2]' },
            { value: '56', category_value: 'IAB5', label: 'Art History [IAB5-3]' },
            { value: '57', category_value: 'IAB5', label: 'College Administration [IAB5-4]' },
            { value: '58', category_value: 'IAB5', label: 'College Life [IAB5-5]' },
            { value: '59', category_value: 'IAB5', label: 'Distance Learning [IAB5-6]' },
            { value: '60', category_value: 'IAB5', label: 'English as a 2nd Language [IAB5-7]' },
            { value: '61', category_value: 'IAB5', label: 'Language Learning [IAB5-8]' },
            { value: '62', category_value: 'IAB5', label: 'Graduate School [IAB5-9]' },
            { value: '63', category_value: 'IAB5', label: 'Homeschooling [IAB5-10]' },
            { value: '64', category_value: 'IAB5', label: 'Homework/Study Tips [IAB5-11]' },
            { value: '65', category_value: 'IAB5', label: 'K-6 Educators [IAB5-12]' },
            { value: '66', category_value: 'IAB5', label: 'Private School [IAB5-13]' },
            { value: '67', category_value: 'IAB5', label: 'Special Education [IAB5-14]' },
            { value: '68', category_value: 'IAB5', label: 'Studying Business [IAB5-15]' }
        ]
    },
    {
        label: 'IAB6 - Family & Parenting',
        options: [
            { value: '69', category_value: 'IAB6', label: 'Adoption [IAB6-1]' },
            { value: '70', category_value: 'IAB6', label: 'Babies & Toddlers [IAB6-2]' },
            { value: '71', category_value: 'IAB6', label: 'Daycare/Pre School [IAB6-3]' },
            { value: '72', category_value: 'IAB6', label: 'Family Internet [IAB6-4]' },
            { value: '73', category_value: 'IAB6', label: 'Parenting – K-6 Kids [IAB6-5]' },
            { value: '74', category_value: 'IAB6', label: 'Parenting teens [IAB6-6]' },
            { value: '75', category_value: 'IAB6', label: 'Pregnancy [IAB6-7]' },
            { value: '76', category_value: 'IAB6', label: 'Special Needs Kids [IAB6-8]' },
            { value: '77', category_value: 'IAB6', label: 'Eldercare [IAB6-9]' }
        ]
    },
    {
        label: 'IAB7 - Health & Fitness',
        options: [
            { value: '78', category_value: 'IAB7', label: 'Exercise [IAB7-1]' },
            { value: '79', category_value: 'IAB7', label: 'A.D.D. [IAB7-2]' },
            { value: '80', category_value: 'IAB7', label: 'AIDS/HIV [IAB7-3]' },
            { value: '81', category_value: 'IAB7', label: 'Allergies [IAB7-4]' },
            { value: '82', category_value: 'IAB7', label: 'Alternative Medicine [IAB7-5]' },
            { value: '83', category_value: 'IAB7', label: 'Arthritis [IAB7-6]' },
            { value: '84', category_value: 'IAB7', label: 'Asthma [IAB7-7]' },
            { value: '85', category_value: 'IAB7', label: 'Autism/PDD [IAB7-8]' },
            { value: '86', category_value: 'IAB7', label: 'Bipolar Disorder [IAB7-9]' },
            { value: '87', category_value: 'IAB7', label: 'Brain Tumor [IAB7-10]' },
            { value: '88', category_value: 'IAB7', label: 'Cancer [IAB7-11]' },
            { value: '89', category_value: 'IAB7', label: 'Cholesterol [IAB7-12]' },
            { value: '90', category_value: 'IAB7', label: 'Chronic Fatigue Syndrome [IAB7-13]' },
            { value: '91', category_value: 'IAB7', label: 'Chronic Pain [IAB7-14]' },
            { value: '92', category_value: 'IAB7', label: 'Cold & Flu [IAB7-15]' },
            { value: '93', category_value: 'IAB7', label: 'Deafness [IAB7-16]' },
            { value: '94', category_value: 'IAB7', label: 'Dental Care [IAB7-17]' },
            { value: '95', category_value: 'IAB7', label: 'Depression [IAB7-18]' },
            { value: '96', category_value: 'IAB7', label: 'Dermatology [IAB7-19]' },
            { value: '97', category_value: 'IAB7', label: 'Diabetes [IAB7-20]' },
            { value: '98', category_value: 'IAB7', label: 'Epilepsy [IAB7-21]' },
            { value: '99', category_value: 'IAB7', label: 'GERD/Acid Reflux [IAB7-22]' },
            { value: '100', category_value: 'IAB7', label: 'Headaches/Migraines [IAB7-23]' },
            { value: '101', category_value: 'IAB7', label: 'Heart Disease [IAB7-24]' },
            { value: '102', category_value: 'IAB7', label: 'Herbs for Health [IAB7-25]' },
            { value: '103', category_value: 'IAB7', label: 'Holistic Healing [IAB7-26]' },
            { value: '104', category_value: 'IAB7', label: 'IBS/Crohn’s Disease [IAB7-27]' },
            { value: '105', category_value: 'IAB7', label: 'Incest/Abuse Support [IAB7-28]' },
            { value: '106', category_value: 'IAB7', label: 'Incontinence [IAB7-29]' },
            { value: '107', category_value: 'IAB7', label: 'Infertility [IAB7-30]' },
            { value: '108', category_value: 'IAB7', label: 'Men’s Health [IAB7-31]' },
            { value: '109', category_value: 'IAB7', label: 'Nutrition [IAB7-32]' },
            { value: '110', category_value: 'IAB7', label: 'Orthopedics [IAB7-33]' },
            { value: '111', category_value: 'IAB7', label: 'Panic/Anxiety Disorders [IAB7-34]' },
            { value: '112', category_value: 'IAB7', label: 'Pediatrics [IAB7-35]' },
            { value: '113', category_value: 'IAB7', label: 'Physical Therapy [IAB7-36]' },
            { value: '114', category_value: 'IAB7', label: 'Psychology/Psychiatry [IAB7-37]' },
            { value: '115', category_value: 'IAB7', label: 'Senior Health [IAB7-38]' },
            { value: '116', category_value: 'IAB7', label: 'Sexuality [IAB7-39]' },
            { value: '117', category_value: 'IAB7', label: 'Sleep Disorders [IAB7-40]' },
            { value: '118', category_value: 'IAB7', label: 'Smoking Cessation [IAB7-41]' },
            { value: '119', category_value: 'IAB7', label: 'Substance Abuse [IAB7-42]' },
            { value: '120', category_value: 'IAB7', label: 'Thyroid Disease [IAB7-43]' },
            { value: '121', category_value: 'IAB7', label: 'Weight Loss [IAB7-44]' },
            { value: '122', category_value: 'IAB7', label: 'Women’s Health [IAB7-45]' }
        ]
    },
    {
        label: 'IAB8 - Food & Drink',
        options: [
            { value: '123', category_value: 'IAB8', label: 'American Cuisine [IAB8-1]' },
            { value: '124', category_value: 'IAB8', label: 'Barbecues & Grilling [IAB8-2]' },
            { value: '125', category_value: 'IAB8', label: 'Cajun/Creole [IAB8-3]' },
            { value: '126', category_value: 'IAB8', label: 'Chinese Cuisine [IAB8-4]' },
            { value: '127', category_value: 'IAB8', label: 'Cocktails/Beer [IAB8-5]' },
            { value: '128', category_value: 'IAB8', label: 'Coffee/Tea [IAB8-6]' },
            { value: '129', category_value: 'IAB8', label: 'Cuisine-Specific [IAB8-7]' },
            { value: '130', category_value: 'IAB8', label: 'Desserts & Baking [IAB8-8]' },
            { value: '131', category_value: 'IAB8', label: 'Dining Out [IAB8-9]' },
            { value: '132', category_value: 'IAB8', label: 'Food Allergies [IAB8-10]' },
            { value: '133', category_value: 'IAB8', label: 'French Cuisine [IAB8-11]' },
            { value: '134', category_value: 'IAB8', label: 'Health/Lowfat Cooking [IAB8-12]' },
            { value: '135', category_value: 'IAB8', label: 'Italian Cuisine [IAB8-13]' },
            { value: '136', category_value: 'IAB8', label: 'Japanese Cuisine [IAB8-14]' },
            { value: '137', category_value: 'IAB8', label: 'Mexican Cuisine [IAB8-15]' },
            { value: '138', category_value: 'IAB8', label: 'Vegan [IAB8-16]' },
            { value: '139', category_value: 'IAB8', label: 'Vegetarian [IAB8-17]' },
            { value: '140', category_value: 'IAB8', label: 'Wine [IAB8-18]' }
        ]
    },
    {
        label: 'IAB9 - Hobbies & Interests',
        options: [
            { value: '141', category_value: 'IAB9', label: 'Art/Technology [IAB9-1]' },
            { value: '142', category_value: 'IAB9', label: 'Arts & Crafts [IAB9-2]' },
            { value: '143', category_value: 'IAB9', label: 'Beadwork [IAB9-3]' },
            { value: '144', category_value: 'IAB9', label: 'Birdwatching [IAB9-4]' },
            { value: '145', category_value: 'IAB9', label: 'Board Games/Puzzles [IAB9-5]' },
            { value: '146', category_value: 'IAB9', label: 'Candle & Soap Making [IAB9-6]' },
            { value: '147', category_value: 'IAB9', label: 'Card Games [IAB9-7]' },
            { value: '148', category_value: 'IAB9', label: 'Chess [IAB9-8]' },
            { value: '149', category_value: 'IAB9', label: 'Cigars [IAB9-9]' },
            { value: '150', category_value: 'IAB9', label: 'Collecting [IAB9-10]' },
            { value: '151', category_value: 'IAB9', label: 'Comic Books [IAB9-11]' },
            { value: '152', category_value: 'IAB9', label: 'Drawing/Sketching [IAB9-12]' },
            { value: '153', category_value: 'IAB9', label: 'Freelance Writing [IAB9-13]' },
            { value: '154', category_value: 'IAB9', label: 'Genealogy [IAB9-14]' },
            { value: '155', category_value: 'IAB9', label: 'Getting Published [IAB9-15]' },
            { value: '156', category_value: 'IAB9', label: 'Guitar [IAB9-16]' },
            { value: '157', category_value: 'IAB9', label: 'Home Recording [IAB9-17]' },
            { value: '158', category_value: 'IAB9', label: 'Investors & Patents [IAB9-18]' },
            { value: '159', category_value: 'IAB9', label: 'Jewelry Making [IAB9-19]' },
            { value: '160', category_value: 'IAB9', label: 'Magic & Illusion [IAB9-20]' },
            { value: '161', category_value: 'IAB9', label: 'Needlework [IAB9-21]' },
            { value: '162', category_value: 'IAB9', label: 'Painting [IAB9-22]' },
            { value: '163', category_value: 'IAB9', label: 'Photography [IAB9-23]' },
            { value: '164', category_value: 'IAB9', label: 'Radio [IAB9-24]' },
            { value: '165', category_value: 'IAB9', label: 'Roleplaying Games [IAB9-25]' },
            { value: '166', category_value: 'IAB9', label: 'Sci-Fi & Fantasy [IAB9-26]' },
            { value: '167', category_value: 'IAB9', label: 'Scrapbooking [IAB9-27]' },
            { value: '168', category_value: 'IAB9', label: 'Screenwriting [IAB9-28]' },
            { value: '169', category_value: 'IAB9', label: 'Stamps & Coins [IAB9-29]' },
            { value: '170', category_value: 'IAB9', label: 'Video & Computer Games [IAB9-30]' },
            { value: '171', category_value: 'IAB9', label: 'Woodworking [IAB9-31]' }

        ]
    },
    {
        label: 'IAB10 - Home & Garden',
        options: [
            { value: '172', category_value: 'IAB10', label: 'Appliances [IAB10-1]' },
            { value: '173', category_value: 'IAB10', label: 'Entertaining [IAB10-2]' },
            { value: '174', category_value: 'IAB10', label: 'Environmental Safety [IAB10-3]' },
            { value: '175', category_value: 'IAB10', label: 'Gardening [IAB10-4]' },
            { value: '176', category_value: 'IAB10', label: 'Home Repair [IAB10-5]' },
            { value: '177', category_value: 'IAB10', label: 'Home Theater [IAB10-6]' },
            { value: '178', category_value: 'IAB10', label: 'Interior Decorating [IAB10-7]' },
            { value: '179', category_value: 'IAB10', label: 'Landscaping [IAB10-8]' },
            { value: '180', category_value: 'IAB10', label: 'Remodeling & Construction [IAB10-9]' }
        ]
    },
    {
        label: 'IAB11 - Law, Govt & Politics',
        options: [
            { value: '181', category_value: 'IAB11', label: 'Immigration [IAB11-1]' },
            { value: '182', category_value: 'IAB11', label: 'Legal Issues [IAB11-2]' },
            { value: '183', category_value: 'IAB11', label: 'U.S. Government Resources [IAB11-3]' },
            { value: '184', category_value: 'IAB11', label: 'Politics [IAB11-4]' },
            { value: '185', category_value: 'IAB11', label: 'Commentary [IAB11-5]' }

        ]
    },
    {
        label: 'IAB12 - News',
        options: [
            { value: '186', category_value: 'IAB12', label: 'International News [IAB12-1]' },
            { value: '187', category_value: 'IAB12', label: 'National News [IAB12-2]' },
            { value: '188', category_value: 'IAB12', label: 'Local News [IAB12-3]' }

        ]
    },
    {
        label: 'IAB13 - Personal Finance',
        options: [
            { value: '189', category_value: 'IAB13', label: 'Beginning Investing [IAB13-1]' },
            { value: '190', category_value: 'IAB13', label: 'Credit/Debt & Loans [IAB13-2]' },
            { value: '191', category_value: 'IAB13', label: 'Financial News [IAB13-3]' },
            { value: '192', category_value: 'IAB13', label: 'Financial Planning [IAB13-4]' },
            { value: '193', category_value: 'IAB13', label: 'Hedge Fund [IAB13-5]' },
            { value: '194', category_value: 'IAB13', label: 'Insurance [IAB13-6]' },
            { value: '195', category_value: 'IAB13', label: 'Investing [IAB13-7]' },
            { value: '196', category_value: 'IAB13', label: 'Mutual Funds [IAB13-8]' },
            { value: '197', category_value: 'IAB13', label: 'Options [IAB13-9]' },
            { value: '198', category_value: 'IAB13', label: 'Retirement Planning [IAB13-10]' },
            { value: '199', category_value: 'IAB13', label: 'Stocks [IAB13-11]' },
            { value: '200', category_value: 'IAB13', label: 'Tax Planning [IAB13-12]' }
        ]
    },
    {
        label: 'IAB14 - Society',
        options: [
            { value: '201', category_value: 'IAB14', label: 'Dating [IAB14-1]' },
            { value: '202', category_value: 'IAB14', label: 'Divorce Support [IAB14-2]' },
            { value: '203', category_value: 'IAB14', label: 'Gay Life [IAB14-3]' },
            { value: '204', category_value: 'IAB14', label: 'Marriage [IAB14-4]' },
            { value: '205', category_value: 'IAB14', label: 'Senior Living [IAB14-5]' },
            { value: '206', category_value: 'IAB14', label: 'Teens [IAB14-6]' },
            { value: '207', category_value: 'IAB14', label: 'Weddings [IAB14-7]' },
            { value: '208', category_value: 'IAB14', label: 'Ethnic Specific [IAB14-8]' }

        ]
    },
    {
        label: 'IAB15 - Science',
        options: [
            { value: '209', category_value: 'IAB15', label: 'Astrology [IAB15-1]' },
            { value: '210', category_value: 'IAB15', label: 'Biology [IAB15-2]' },
            { value: '211', category_value: 'IAB15', label: 'Chemistry [IAB15-3]' },
            { value: '212', category_value: 'IAB15', label: 'Geology [IAB15-4]' },
            { value: '213', category_value: 'IAB15', label: 'Paranormal Phenomena [IAB15-5]' },
            { value: '214', category_value: 'IAB15', label: 'Physics [IAB15-6]' },
            { value: '215', category_value: 'IAB15', label: 'Space/Astronomy [IAB15-7]' },
            { value: '216', category_value: 'IAB15', label: 'Geography [IAB15-8]' },
            { value: '217', category_value: 'IAB15', label: 'Botany [IAB15-9]' },
            { value: '218', category_value: 'IAB15', label: 'Weather [IAB15-10]' }

        ]
    },
    {
        label: 'IAB16 - Pets',
        options: [
            { value: '219', category_value: 'IAB16', label: 'Aquariums [IAB16-1]' },
            { value: '220', category_value: 'IAB16', label: 'Birds [IAB16-2]' },
            { value: '221', category_value: 'IAB16', label: 'Cats [IAB16-3]' },
            { value: '222', category_value: 'IAB16', label: 'Dogs [IAB16-4]' },
            { value: '223', category_value: 'IAB16', label: 'Large Animals [IAB16-5]' },
            { value: '224', category_value: 'IAB16', label: 'Reptiles [IAB16-6]' },
            { value: '225', category_value: 'IAB16', label: 'Veterinary Medicine [IAB16-7]' }
        ]
    },
    {
        label: 'IAB17 - Sports',
        options: [
            { value: '226', category_value: 'IAB17', label: 'Auto Racing [IAB17-1]' },
            { value: '227', category_value: 'IAB17', label: 'Baseball [IAB17-2]' },
            { value: '228', category_value: 'IAB17', label: 'Bicycling [IAB17-3]' },
            { value: '229', category_value: 'IAB17', label: 'Bodybuilding [IAB17-4]' },
            { value: '230', category_value: 'IAB17', label: 'Boxing [IAB17-5]' },
            { value: '231', category_value: 'IAB17', label: 'Canoeing/Kayaking [IAB17-6]' },
            { value: '232', category_value: 'IAB17', label: 'Cheerleading [IAB17-7]' },
            { value: '233', category_value: 'IAB17', label: 'Climbing [IAB17-8]' },
            { value: '234', category_value: 'IAB17', label: 'Cricket [IAB17-9]' },
            { value: '235', category_value: 'IAB17', label: 'Figure Skating [IAB17-10]' },
            { value: '236', category_value: 'IAB17', label: 'Fly Fishing [IAB17-11]' },
            { value: '237', category_value: 'IAB17', label: 'Football [IAB17-12]' },
            { value: '238', category_value: 'IAB17', label: 'Freshwater Fishing [IAB17-13]' },
            { value: '239', category_value: 'IAB17', label: 'Game & Fish [IAB17-14]' },
            { value: '240', category_value: 'IAB17', label: 'Golf [IAB17-15]' },
            { value: '241', category_value: 'IAB17', label: 'Horse Racing [IAB17-16]' },
            { value: '242', category_value: 'IAB17', label: 'Horses [IAB17-17]' },
            { value: '243', category_value: 'IAB17', label: 'Hunting/Shooting [IAB17-18]' },
            { value: '244', category_value: 'IAB17', label: 'Inline Skating [IAB17-19]' },
            { value: '245', category_value: 'IAB17', label: 'Martial Arts [IAB17-20]' },
            { value: '246', category_value: 'IAB17', label: 'Mountain Biking [IAB17-21]' },
            { value: '247', category_value: 'IAB17', label: 'NASCAR Racing [IAB17-22]' },
            { value: '248', category_value: 'IAB17', label: 'Olympics [IAB17-23]' },
            { value: '249', category_value: 'IAB17', label: 'Paintball [IAB17-24]' },
            { value: '250', category_value: 'IAB17', label: 'Power & Motorcycles [IAB17-25]' },
            { value: '251', category_value: 'IAB17', label: 'Pro Basketball [IAB17-26]' },
            { value: '252', category_value: 'IAB17', label: 'Pro Ice Hockey [IAB17-27]' },
            { value: '253', category_value: 'IAB17', label: 'Rodeo [IAB17-28]' },
            { value: '254', category_value: 'IAB17', label: 'Rugby [IAB17-29]' },
            { value: '255', category_value: 'IAB17', label: 'Running/Jogging [IAB17-30]' },
            { value: '256', category_value: 'IAB17', label: 'Sailing [IAB17-31]' },
            { value: '257', category_value: 'IAB17', label: 'Saltwater Fishing [IAB17-32]' },
            { value: '258', category_value: 'IAB17', label: 'Scuba Diving [IAB17-33]' },
            { value: '259', category_value: 'IAB17', label: 'Skateboarding [IAB17-34]' },
            { value: '260', category_value: 'IAB17', label: 'Skiing [IAB17-35]' },
            { value: '261', category_value: 'IAB17', label: 'Snowboarding [IAB17-36]' },
            { value: '262', category_value: 'IAB17', label: 'Surfing/Bodyboarding [IAB17-37]' },
            { value: '263', category_value: 'IAB17', label: 'Swimming [IAB17-38]' },
            { value: '264', category_value: 'IAB17', label: 'Table Tennis/Ping-Pong [IAB17-39]' },
            { value: '265', category_value: 'IAB17', label: 'Tennis [IAB17-40]' },
            { value: '266', category_value: 'IAB17', label: 'Volleyball [IAB17-41]' },
            { value: '267', category_value: 'IAB17', label: 'Walking [IAB17-42]' },
            { value: '268', category_value: 'IAB17', label: 'Waterski/Wakeboard [IAB17-43]' },
            { value: '269', category_value: 'IAB17', label: 'World Soccer [IAB17-44]' }

        ]
    },
    {
        label: 'IAB18 - Style & Fashion',
        options: [
            { value: '270', category_value: 'IAB18', label: 'Beauty [IAB18-1]' },
            { value: '271', category_value: 'IAB18', label: 'Body Art [IAB18-2]' },
            { value: '272', category_value: 'IAB18', label: 'Fashion [IAB18-3]' },
            { value: '273', category_value: 'IAB18', label: 'Jewelry [IAB18-4]' },
            { value: '274', category_value: 'IAB18', label: 'Clothing [IAB18-5]' },
            { value: '275', category_value: 'IAB18', label: 'Accessories [IAB18-6]' }

        ]
    },
    {
        label: 'IAB19 - Technology & Computing',
        options: [
            { value: '276', category_value: 'IAB19', label: '3-D Graphics [IAB19-1]' },
            { value: '277', category_value: 'IAB19', label: 'Animation [IAB19-2]' },
            { value: '278', category_value: 'IAB19', label: 'Antivirus Software [IAB19-3]' },
            { value: '279', category_value: 'IAB19', label: 'C/C++ [IAB19-4]' },
            { value: '280', category_value: 'IAB19', label: 'Cameras & Camcorders [IAB19-5]' },
            { value: '281', category_value: 'IAB19', label: 'Cell Phones [IAB19-6]' },
            { value: '282', category_value: 'IAB19', label: 'Computer Certification [IAB19-7]' },
            { value: '283', category_value: 'IAB19', label: 'Computer Networking [IAB19-8]' },
            { value: '284', category_value: 'IAB19', label: 'Computer Peripherals [IAB19-9]' },
            { value: '285', category_value: 'IAB19', label: 'Computer Reviews [IAB19-10]' },
            { value: '286', category_value: 'IAB19', label: 'Data Centers [IAB19-11]' },
            { value: '287', category_value: 'IAB19', label: 'Databases [IAB19-12]' },
            { value: '288', category_value: 'IAB19', label: 'Desktop Publishing [IAB19-13]' },
            { value: '289', category_value: 'IAB19', label: 'Desktop Video [IAB19-14]' },
            { value: '290', category_value: 'IAB19', label: 'Email [IAB19-15]' },
            { value: '291', category_value: 'IAB19', label: 'Graphics Software [IAB19-16]' },
            { value: '292', category_value: 'IAB19', label: 'Home Video/DVD [IAB19-17]' },
            { value: '293', category_value: 'IAB19', label: 'Internet Technology [IAB19-18]' },
            { value: '294', category_value: 'IAB19', label: 'Java [IAB19-19]' },
            { value: '295', category_value: 'IAB19', label: 'JavaScript [IAB19-20]' },
            { value: '296', category_value: 'IAB19', label: 'Mac Support [IAB19-21]' },
            { value: '297', category_value: 'IAB19', label: 'MP3/MIDI [IAB19-22]' },
            { value: '298', category_value: 'IAB19', label: 'Net Conferencing [IAB19-23]' },
            { value: '299', category_value: 'IAB19', label: 'Net for Beginners [IAB19-24]' },
            { value: '300', category_value: 'IAB19', label: 'Network Security [IAB19-25]' },
            { value: '301', category_value: 'IAB19', label: 'Palmtops/PDAs [IAB19-26]' },
            { value: '302', category_value: 'IAB19', label: 'PC Support [IAB19-27]' },
            { value: '303', category_value: 'IAB19', label: 'Portable [IAB19-28]' },
            { value: '304', category_value: 'IAB19', label: 'Entertainment [IAB19-29]' },
            { value: '305', category_value: 'IAB19', label: 'Shareware/Freeware [IAB19-30]' },
            { value: '306', category_value: 'IAB19', label: 'Unix [IAB19-31]' },
            { value: '307', category_value: 'IAB19', label: 'Visual Basic [IAB19-32]' },
            { value: '308', category_value: 'IAB19', label: 'Web Clip Art [IAB19-33]' },
            { value: '309', category_value: 'IAB19', label: 'Web Design/HTML [IAB19-34]' },
            { value: '310', category_value: 'IAB19', label: 'Web Search [IAB19-35]' },
            { value: '311', category_value: 'IAB19', label: 'Windows [IAB19-36]' }

        ]
    },
    {
        label: 'IAB20 - Travel',
        options: [
            { value: '312', category_value: 'IAB20', label: 'Adventure Travel [IAB20-1]' },
            { value: '313', category_value: 'IAB20', label: 'Africa [IAB20-2]' },
            { value: '314', category_value: 'IAB20', label: 'Air Travel [IAB20-3]' },
            { value: '315', category_value: 'IAB20', label: 'Australia & New Zealand [IAB20-4]' },
            { value: '316', category_value: 'IAB20', label: 'Bed & Breakfasts [IAB20-5]' },
            { value: '317', category_value: 'IAB20', label: 'Budget Travel [IAB20-6]' },
            { value: '318', category_value: 'IAB20', label: 'Business Travel [IAB20-7]' },
            { value: '319', category_value: 'IAB20', label: 'By US Locale [IAB20-8]' },
            { value: '320', category_value: 'IAB20', label: 'Camping [IAB20-9]' },
            { value: '321', category_value: 'IAB20', label: 'Canada [IAB20-10]' },
            { value: '322', category_value: 'IAB20', label: 'Caribbean [IAB20-11]' },
            { value: '323', category_value: 'IAB20', label: 'Cruises [IAB20-12]' },
            { value: '324', category_value: 'IAB20', label: 'Eastern Europe [IAB20-13]' },
            { value: '325', category_value: 'IAB20', label: 'Europe [IAB20-14]' },
            { value: '326', category_value: 'IAB20', label: 'France [IAB20-15]' },
            { value: '327', category_value: 'IAB20', label: 'Greece [IAB20-16]' },
            { value: '328', category_value: 'IAB20', label: 'Honeymoons/Getaways [IAB20-17]' },
            { value: '329', category_value: 'IAB20', label: 'Hotels [IAB20-18]' },
            { value: '330', category_value: 'IAB20', label: 'Italy [IAB20-19]' },
            { value: '331', category_value: 'IAB20', label: 'Japan [IAB20-20]' },
            { value: '332', category_value: 'IAB20', label: 'Mexico & Central America [IAB20-21]' },
            { value: '333', category_value: 'IAB20', label: 'National Parks [IAB20-22]' },
            { value: '334', category_value: 'IAB20', label: 'South America [IAB20-23]' },
            { value: '335', category_value: 'IAB20', label: 'Spas [IAB20-24]' },
            { value: '336', category_value: 'IAB20', label: 'Theme Parks [IAB20-25]' },
            { value: '337', category_value: 'IAB20', label: 'Traveling with Kids [IAB20-26]' },
            { value: '338', category_value: 'IAB20', label: 'United Kingdom [IAB20-27]' }

        ]
    },
    {
        label: 'IAB21 - Travel',
        options: [
            { value: '339', category_value: 'IAB21', label: 'Apartments [IAB21-1]' },
            { value: '340', category_value: 'IAB21', label: 'Architects [IAB21-2]' },
            { value: '341', category_value: 'IAB21', label: 'Buying/Selling Homes [IAB21-3]' }
        ]
    },
    {
        label: 'IAB22 - Shopping',
        options: [
            { value: '342', category_value: 'IAB22', label: 'Contests & Freebies [IAB22-1]' },
            { value: '343', category_value: 'IAB22', label: 'Couponing [IAB22-2]' },
            { value: '344', category_value: 'IAB22', label: 'Comparison [IAB22-3]' },
            { value: '345', category_value: 'IAB22', label: 'Engines [IAB22-4]' }

        ]
    },
    {
        label: 'IAB23 - Religion & Spirituality',
        options: [
            { value: '346', category_value: 'IAB23', label: 'Alternative Religions [IAB23-1]' },
            { value: '347', category_value: 'IAB23', label: 'Atheism/Agnosticism [IAB23-2]' },
            { value: '348', category_value: 'IAB23', label: 'Buddhism [IAB23-3]' },
            { value: '349', category_value: 'IAB23', label: 'Catholicism [IAB23-4]' },
            { value: '350', category_value: 'IAB23', label: 'Christianity [IAB23-5]' },
            { value: '351', category_value: 'IAB23', label: 'Hinduism [IAB23-6]' },
            { value: '352', category_value: 'IAB23', label: 'Islam [IAB23-7]' },
            { value: '353', category_value: 'IAB23', label: 'Judaism [IAB23-8]' },
            { value: '354', category_value: 'IAB23', label: 'Latter-Day Saints [IAB23-9]' },
            { value: '355', category_value: 'IAB23', label: 'Pagan/Wiccan [IAB23-10]' }
        ]
    },
    {
        label: 'IAB24 - Uncategorized',
        options: [{ value: '356', category_value: 'IAB24', label: 'Uncategorized [IAB24]' }]
    },
    {
        label: 'IAB25 - Non-Standard Content',
        options: [
            { value: '357', category_value: 'IAB25', label: 'Unmoderated UGC [IAB25-1]' },
            { value: '358', category_value: 'IAB25', label: 'Extreme Graphic/Explicit Violence [IAB25-2]' },
            { value: '359', category_value: 'IAB25', label: 'Pornography [IAB25-3]' },
            { value: '360', category_value: 'IAB25', label: 'Profane Content [IAB25-4]' },
            { value: '361', category_value: 'IAB25', label: 'Hate Content [IAB25-5]' },
            { value: '362', category_value: 'IAB25', label: 'Under Construction [IAB25-6]' },
            { value: '363', category_value: 'IAB25', label: 'Incentivized [IAB25-7]' }
        ]
    },
    {
        label: 'IAB26 - Illegal Content',
        options: [
            { value: '364', category_value: 'IAB26', label: 'Illegal Content [IAB26-1]' },
            { value: '365', category_value: 'IAB26', label: 'Warez [IAB26-2]' },
            { value: '366', category_value: 'IAB26', label: 'Spyware/Malware [IAB26-3]' },
            { value: '367', category_value: 'IAB26', label: 'Copyright Infringement [IAB26-4]' }

        ]
    }
]

export const apiFrameworkOptions = [
    { label: 'NONE', value: '0' },
    { label: 'VPAID 1.0', value: '1' },
    { label: 'VPAID 2.0', value: '2' }
]

export const protocolOptions = [
    { label: 'VAST 1.0', value: '1' },
    { label: 'VAST 2.0', value: '2' },
    { label: 'VAST 1.0 Wrapper', value: '4' },
    { label: 'VAST 2.0 Wrapper', value: '5' }
]

export const mimeTypeOptions = [
    { label: 'video/mp4', value: 'video/mp4' },
    { label: 'video/x-flv', value: 'video/x-flv' },
    { label: 'video/x-ms-wmv', value: 'video/x-ms-wmv' },
    { label: 'video/webm', value: 'video/webm' },
    { label: 'application/javascript', value: 'application/javascript' },
    { label: 'application/x-shockwave-flash', value: 'application/x-shockwave-flash' }
]

export const playbackMethodOptions = [
    { label: 'Auto-Play Sound On', value: '1' },
    { label: 'Auto-Play Sound Off', value: '2' },
    { label: 'Click-to-Play', value: '3' },
    { label: 'Mouse-Over', value: '4' },
    { label: 'Entering Viewport with Sound On', value: '5' },
    { label: 'Entering Viewport with Sound Off', value: '6' }
]

export const iabAdAttributeOptions = [
    { value: '1', label: 'Audio Ad (Auto-Play)' },
    { value: '2', label: 'Audio Ad (User Initiated)' },
    { value: '3', label: 'Expandable (Automatic)' },
    { value: '4', label: 'Expandable (User Initiated - Click)' },
    { value: '5', label: 'Expandable (User Initiated - Rollover)' },
    { value: '6', label: 'In-Banner Video Ad (Auto-Play)' },
    { value: '7', label: 'In-Banner Video Ad (User Initiated)' },
    { value: '8', label: 'Pop' },
    { value: '9', label: 'Provocative' },
    { value: '10', label: 'Flashing, Flickering, Extreme Animation' },
    { value: '11', label: 'Surveys' },
    { value: '12', label: 'Text Only' },
    { value: '13', label: 'User Interactive' },
    { value: '14', label: 'Windows Dialog or Alert' },
    { value: '15', label: 'Has Audio On/Off Button' },
    { value: '16', label: 'Ad Provides Skip Button' },
    { value: '17', label: 'Adobe Flash' }
]