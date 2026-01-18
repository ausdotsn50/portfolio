"use client"
import {SpotlightNew} from "@/components/ui/spotlight-new";
import TypingText from "@/components/ui/typing-text";
import HeroButton from "@/components/ui/hero-button";
import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards";
import {techStack} from "@/data";

const Hero = () => {
    const mid = Math.floor(techStack.length /2);
    return (
        // padding bottom 20, padding top 36
        <div className="pb-20 pt-20">
            {/* div for the spotlight fx*/}
            <div>
                <SpotlightNew/>
            </div>

            <div className="flex justify-center relative my-20">
                {/* div for hero section text */}
                <div className="text-center text-white max-w-[89vw] md:max-w-2xl lg:max-w-[70vw] flex flex-col
                    justify-center items-center">
                    <TypingText
                        className="text-[40px] md:text-5xl lg:text-6xl
                        font-bold mb-2"
                        text={["Hello, ", "Kumusta, "]}
                        typingSpeed={100} // Override typingSpeed
                        deletingSpeed={75} // Override deletingSPeed
                    />
                    {/* Utility classes for text-breakpoints differentiated by 1-xl*/}
                    <p className="sm:text-2xl md:text-3xl lg:text-4xl
                        font-normal mb-2"> I&#39;m Angela Denise Almazan </p>
                    <p className="sm:text md:text-2xl lg:text-3xl
                        font-extralight mb-6"> Multimedia Editor & Computer Science Student </p>

                    {/* Hero section buttons */}
                    <div className="flex gap-4 justify-evenly items-center mb-4">
                        <a href="#projects">
                            <HeroButton
                                title="Explore Projects"
                                color="transparent"
                            />
                        </a>

                        <a href="#about">
                            <HeroButton
                                title="Get in Touch"
                                color="transparent"
                            />
                        </a>
                    </div>
                    <InfiniteMovingCards
                        items={
                            techStack.slice(0, mid)
                        }
                    />
                    <InfiniteMovingCards
                        items={
                            techStack.slice(mid, techStack.length)
                        }
                    />
                </div>
            </div>
        </div>
    )
}
export default Hero
