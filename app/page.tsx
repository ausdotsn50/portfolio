import Hero from "@/components/Hero";

export default function Home() {
  return (
      // mx-auto for some space in the middle part of the screen
      // px-10 on sm breakpoints, extra px-5 on all other sizes
      <main className="relative bg-black-100 flex flex-col justify-center items-center
      overflow-hidden mx-auto sm:px-10 px-5">
          {/* max-w-7xl = div not wider than 1280px */}
        <div className="max-w-7xl w-full">
          <Hero/>
        </div>
      </main>
  );
}
