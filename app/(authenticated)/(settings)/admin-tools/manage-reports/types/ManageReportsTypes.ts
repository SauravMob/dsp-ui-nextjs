type ManageReportType = {
    bidsCalc: number | string,
    clksCalc: number | string,
    impsCalc: number | string,
    spendsCalc: number | string,
    clickMaskFlag: boolean,
    date: string,
    email: string,
    id: number,
    status: string,
    userId: number | string
}

type ManageReportFormType = {
    bidsCalc: number | string,
    clksCalc: number | string,
    impsCalc: number | string,
    spendsCalc: number | string,
    clickMaskFlag: boolean,
    date: {
        from: Date | undefined,
        to: Date | undefined
    },
    email: string,
    id: number,
    status: string,
    userId: number | string
}