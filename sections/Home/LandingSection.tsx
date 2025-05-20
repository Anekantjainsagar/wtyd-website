import Image from "next/image";
import Link from "next/link";

const LandingSection = () => {
  return (
    <div className="h-fit md:h-[100vh] flex md:flex-row flex-col items-center justify-between bg-newBlue w-full md:pt-0 pt-[25vw] px-[5vw] md:px-[3vw]">
      <div className="text-white">
        <p className="text-lg md:text-2xl">Wtyd - We Tech Your Dreams</p>
        <h2 className="text-4xl md:text-6xl font-extrabold md:w-7/12 md:leading-snug mt-2 md:mt-10">
          Learn. Build. Succeed. - Your Tech Journey Starts Here!
        </h2>
        <p className="text-lg md:text-2xl md:w-6/12 md:mt-5 mt-2 mb-2 md:mb-10">
          Empowering aspiring developers and businesses with cutting-edge
          technology solutions and skill development programs.
        </p>
        <div className="md:mt-0 mt-5">
          <Link href="/login">
            <button className="px-6 py-1.5 md:py-2 text-newBlue border-2 border-white bg-white rounded-md text-lg md:text-xl font-medium">
              Get Started
            </button>
          </Link>
          <Link href="/about">
            <button className="ml-3.5 md:ml-5 px-6 py-1.5 md:py-2 text-white border-2 border-white rounded-md text-lg md:text-xl font-medium">
              Learn more
            </button>
          </Link>
        </div>
      </div>
      <div className="md:w-[52vw] flex flex-col items-end justify-end md:absolute right-0 bottom-0 md:mt-0 mt-16">
        <Image
          width={10000}
          height={10000}
          src="/assets/home/landing-img.png"
          alt="We Tech You Dream Landing Image"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default LandingSection;
