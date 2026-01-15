import React from 'react'
import {BentoGrid, BentoGridItem} from "@/components/ui/bento-grid";
import {gridItems} from "@/data";

const Grid = () => {
    return (
        <section id="about">
            <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
                {gridItems.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        className={item.className}
                    />
                ))}
            </BentoGrid>
        </section>
    )
}

export default Grid
