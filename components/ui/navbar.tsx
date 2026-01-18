import React from 'react'
import Image from 'next/image'

const Navbar = () => {
    return (
        <nav className="flex w-full items-center justify-between py-4">
            <div className="flex items-center gap-2">
                <Image
                    src="/favicon.png"
                    width={50}
                    height={50}
                    alt="favicon"
                />
            </div>
            {/* Buttons here */}
            <div>
                {/*
                <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                    Home
                </button>
                <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                    About
                </button>
                <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                    Projects
                </button>
                */}

            </div>
        </nav>
    )
}
export default Navbar
