import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Newspaper } from 'lucide-react'
import { Metadata } from 'next'
import React from 'react'
import { fetchPaymentHistory, fetchTxnSummary } from '../actions'
import PaymentHistoryTable from './helpers/PaymentHistoryTable'

export const metadata: Metadata = {
  title: "Mobavenue | Account Transaction",
  description: "Mobavenue DSP transaction"
}

export default async function page() {

  const txnData = await fetchTxnSummary()
  const paymentHistory = await fetchPaymentHistory()

  return (
    <>
      <Card className='mt-4'>
        <CardHeader>
          <div className='flex text-lg font-bold'>
            <Newspaper size={24} className='mr-2' />Billing
          </div>
        </CardHeader>
        <CardContent className='min-h-[500px]'>
          <div className='border-b text-2xl'>Transaction Summary</div>
          <div className='p-5'>
            <div className='grid grid-cols-2'>
              <div>Total Payment</div>
              <div>$ {txnData.totalPayment}</div>
            </div>
            <div className='grid grid-cols-2'>
              <div>Total ad spent</div>
              <div>$ {txnData.totalAdSpent}</div>
            </div>
            <div className='grid grid-cols-2'>
              <div>Credit Available</div>
              <div>$ {txnData.creditAvailable}</div>
            </div>
          </div>

          <div className='border-b text-2xl mt-8 mb-4'>Payment History</div>
          <PaymentHistoryTable data={paymentHistory} />
        </CardContent>
      </Card>
    </>
  )
}
