// import React from 'react'
"use client"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const navLinks = [
    {name : 'dashboard', href : '/dashboard'},
    {name: 'dummy1',href: '/dashboard/dummy1'},
    {name: 'dummy2',href: '/dashboard/dummy2'},
    {name: 'dummy3',href: '/dashboard/dummy3'},
]
function Header() {
    const path = usePathname();
    useEffect(()=>{
        console.log(path);
    },[])
  return (
    <div className="flex items-center justify-between p-4 shadow-md bg-secondary">
      <Image src={'/logo.svg'} alt="logo" width={140} height={80}/>
      <ul className="hidden md:flex gap-6">
        {navLinks.map((link, index) => (
            <li key={index} className={`hover:text-primary hover:font-semibold cursor-pointer transition-all ${path===link.href ? 'font-bold underline text-primary' : ''}`}>
                <Link href={link.href}>{link.name}</Link>
            </li>
        ))}
      </ul>
      <UserButton />
    </div>
  )
}

export default Header
