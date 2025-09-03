"use client"
import React, { useActionState } from 'react'
import { BillingAddressInput, BillingAddressInputState } from '../lib/schema'
import { billingAddressInput } from '../lib/action'



const AddressForm = ({initial}: {initial: Partial<BillingAddressInputState>}) => {
  const [state, formAction, isPending] = useActionState<BillingAddressInputState | undefined>(billingAddressInput, undefined)

   const data = state?.data ?? initial;
  return (
      <form action={formAction} className="space-y-5" noValidate>



    </form>
  )
}

export default AddressForm