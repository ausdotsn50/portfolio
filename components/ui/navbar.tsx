import React from 'react'
import Image from 'next/image'

const Navbar = () => {
    {/* Note on applying auto-margin on sides */}
    return (
        <nav className="flex mx-auto max-w-4xl items-center justify-between py-4 ">
            <div className="flex items-start justify-start">
                <Image
                    src="/favicon.png"
                    width={40}
                    height={40}
                    alt="favicon"
                />
            </div>
            {/* Buttons here */}
            <div className="flex justify-end gap-2">

                <button className="w-24 transform rounded-lg px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:hover:bg-gray-200">
                    Home
                </button>
                <button className="w-24 transform rounded-lg px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:hover:bg-gray-200">
                    About
                </button>
                <button className="w-24 transform rounded-lg px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:hover:bg-gray-200">
                    Projects
                </button>


            </div>
        </nav>
    )
}
export default Navbar
