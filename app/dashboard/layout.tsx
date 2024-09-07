import React from 'react'
import Header from './_components/Header'
export const metadata = {
  title: 'dashboard',
  description : 'allows authenticated users to take mock interviews'
}
function DashboardLayout({children} : {children: React.ReactNode}) {
  return (
    <div>
      <Header />
      <section className='p-10'>
      {children}
      </section>
    </div>
  )
}

export default DashboardLayout
