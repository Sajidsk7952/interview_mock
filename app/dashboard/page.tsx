// import React from 'react'

import { UserButton } from "@clerk/nextjs"
import AddInterview from "./_components/AddInterview"

function page() {
  return (
    <div>
      <h1 className="font-bold text-2xl capitalize">Welcome back!!</h1>
      <p>create and start your interview now</p>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
      <AddInterview />
      </div>
    </div>
  )
}

export default page
