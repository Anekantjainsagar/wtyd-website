"use client";
import MemberBlock, { MemberType } from "@/components/Teams/MemberBlock";
import UserContext from "@/context/UserContext";
import { useContext } from "react";

const OurTeam = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("OurTeam must be used within a UserProvider");
  }

  const { team } = context;

  return (
    <div className="pt-[24vw] md:pt-[9vw] px-[5vw] md:px-[3vw] md:pb-0 pb-[5vw]">
      <div className="text-center mb-[5vw]">
        <p className="text-newGrey text-lg md:text-xl">Our Team</p>
        <h2 className="text-4xl md:text-6xl font-bold text-newBlue">Members</h2>
        <p className="text-newGrey text-lg md:text-xl md:w-5/12 pt-1.5 md:pt-6 mx-auto">
          Meet the passionate minds turning innovation into reality. Together,
          we build tech that solves real-world problems.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-20">
        {team.map((member: MemberType, index: number) => (
          <MemberBlock key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
