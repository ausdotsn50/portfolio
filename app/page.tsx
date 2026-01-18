import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
      // mx-auto for some space in the middle part of the screen
      // px-10 on sm breakpoints, extra px-5 on all other sizes
      <main className="relative bg-black-100 flex flex-col justify-center items-center
      overflow-hidden mx-auto sm:px-10 px-5">
          {/* max-w-7xl = div not wider than 1280px */}
        <div className="max-w-7xl w-full">
            {/* Passing an array of obj*/}
            {/* Implement a scroll down instead of a #reference */}
            <Navbar/>
            <Hero/>
            <Grid/>
        </div>
      </main>
  );
}
