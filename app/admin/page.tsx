import React from 'react'
import { Button } from '../ui/global/components'
import { destroySession } from '../lib/session'

const page = () => {
  return (
    <div><form action={destroySession}><Button>Logout</Button></form></div>
  )
}

export default page