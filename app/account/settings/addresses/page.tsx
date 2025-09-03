import React from 'react'

import type { Breadcrumb } from "@/app/lib/definitions";
import Breadcrumbs from "@/app/ui/global/Breadcrumbs";
import { Header } from '@/app/ui/global/Header';
import { BillingAddressInput } from './lib/schema';
import AddressForm from './ui/AddressForm';

const breadcrumbs: Breadcrumb[] = [
  {
    label: "Dashboard",
    href: "/account",
  },
  {
    label: "Settings",
    href: "/account/settings",
  },
  {
    label: "Addresses",
    href: "/account/settings/addresses",
    active: true,
  },
];

const page = () => {
  const initial:Partial<BillingAddressInput> = {
    address: '',
    address2: '',
    suburb: '',
    postcode: '',
    stateCode: '',
    country: '',
  }
  return (
    <>
    <Breadcrumbs breadcrumbs={breadcrumbs} />
          <div className="mx-auto max-w-3xl p-6 md:p-8 space-y-6">
            <Header as="h1">Set Up Profile</Header>
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <AddressForm initial={initial} />
            </div>
          </div>

    </>
  )
}

export default page