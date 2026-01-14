"use client"
import {SpotlightNew} from "@/components/ui/spotlight-new";
import TypingText from "@/components/ui/typing-text";

const Hero = () => {
    return (
        // padding bottom 20, padding top 36
        <div className="pb-20 pt-36">
            {/* div for the spotlight fx*/}
            <div>
                <SpotlightNew/>
            </div>

            {/* div for hero section text */}
            <div className="flex justify-center">
                <div className="">
                    {/*
                    <TextGenerateEffect
                        className="text-center text-[40px] text-white md:text-5xl lg:text-6xl"
                        words="Hello, world!"
                        //duration={2} --> in seconds
                    />
                    <TypewriterEffect
                        words={[{text: "Hello,"}, {text: "world"}]}
                    />
                    */}
                    <TypingText
                        className="text-white"
                        text={["Hello, world", "Otoke"]}
                        typingSpeed={100} // Override typing and deleting speed
                    />
                </div>
            </div>
        </div>
    )
}
export default Hero
