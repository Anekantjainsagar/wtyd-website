import React from "react";
import Link from "next/link";
import Image from "next/image";

type MemberType = {
  name: string;
  role: string;
  image: string;
  desc: string;
  social: {
    facebook: string;
    linkedin: string;
    github: string;
  };
};

const MemberBlock = ({ member }: { member: MemberType }) => {
  return (
    <div className="flex items-start gap-6">
      <Image
        src={member.image}
        alt={member.name}
        width={1000}
        height={1000}
        className="rounded-xl w-5/12 object-cover"
      />
      <div className="w-7/12">
        <h3 className="text-3xl font-semibold">{member.name}</h3>
        <p className="text-newBlue text-xl font-medium mt-1.5">{member.role}</p>
        <hr className="my-4 w-10/12 border-gray-300" />
        <p className="text-gray-600 text-xl w-9/12">{member.desc}</p>
        <div className="flex gap-5 mt-[1vw]">
          <Link href={member.social.facebook}>
            <Image
              width={1000}
              height={1000}
              alt="Facebook"
              className="w-[30px]"
              src="/assets/social-icons/facebook.png"
            />
          </Link>
          <Link href={member.social.linkedin}>
            <Image
              width={1000}
              height={1000}
              alt="Linkedin"
              className="w-[30px]"
              src="/assets/social-icons/linkedin.png"
            />
          </Link>
          <Link href={member.social.github}>
            <Image
              width={1000}
              height={1000}
              alt="Github"
              className="w-[30px]"
              src="/assets/social-icons/github.png"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MemberBlock;
