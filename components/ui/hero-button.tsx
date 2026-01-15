import React from 'react'

const HeroButton = ({
    title, color
} : {
    title: string;
    color?: string;
}) => {
    return (
        // modify shadow inset for the outline
        <button className={`shadow-[inset_0_0_0_2px_#616467] text-black px-10 py-2 rounded-full
        tracking-widest uppercase font-bold bg-${color} hover:bg-[#616467] hover:text-white
        dark:text-neutral-200 transition duration-200`}>
            {title}
        </button>
    )
}
export default HeroButton
