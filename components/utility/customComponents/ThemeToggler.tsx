"use client"

import { Moon, Sun } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function ThemeToggler() {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        if (theme === "dark") setDarkMode(true)
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }, [darkMode])

    return (
        <div
            className='relative w-12 h-6 flex items-center dark:bg-gray-700 bg-teal-500 cursor-pointer rounded-full p-1'
            onClick={() => setDarkMode(!darkMode)}
        >
            <Moon className='text-white' size={14} />
            <div
                className='absolute bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300'
                style={darkMode ? { left: "2px" } : { right: "2px" }}
            ></div>
            <Sun className='ml-auto text-yellow-400' size={14} />
        </div>
    )
}
