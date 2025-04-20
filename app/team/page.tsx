import MemberBlock from "@/components/Teams/MemberBlock";

const teamMembers = [
  {
    name: "Noopur Makhija",
    role: "Content Head",
    image: "/assets/members/people.png",
    desc: "Creative writer having working experience of more than 12 years in content development.",
    social: {
      facebook: "/",
      linkedin: "/",
      github: "/",
    },
  },
  {
    name: "ABC Sharma",
    role: "Project Head",
    image: "/assets/members/people.png",
    desc: "A blend of creativity, code, and commitment.",
    social: {
      facebook: "/",
      linkedin: "/",
      github: "/",
    },
  },
  {
    name: "ABC Sharma",
    role: "Project Head",
    image: "/assets/members/people.png",
    desc: "A blend of creativity, code, and commitment.",
    social: {
      facebook: "/",
      linkedin: "/",
      github: "/",
    },
  },
  {
    name: "ABC Sharma",
    role: "Project Head",
    image: "/assets/members/people.png",
    desc: "A blend of creativity, code, and commitment.",
    social: {
      facebook: "/",
      linkedin: "/",
      github: "/",
    },
  },
];

const OurTeam = () => {
  return (
    <div className="pt-[9vw] px-[3vw]">
      <div className="text-center mb-[5vw]">
        <p className="text-newGrey text-xl">Our Team</p>
        <h2 className="text-6xl font-bold text-newBlue">Members</h2>
        <p className="text-newGrey text-xl w-5/12 pt-6 mx-auto">
          Meet the passionate minds turning innovation into reality. Together,
          we build tech that solves real-world problems.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-20">
        {teamMembers.map((member, index) => (
          <MemberBlock key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
