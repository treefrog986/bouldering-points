"use client"

import { useState } from "react"

export default function useBool(){
    const [bool, setBool] = useState(false)
    const toggle = ()=>setBool(x=>!x)
    return [bool, toggle]
}