"use client";
import React from "react";

const AboutWTYD = () => {
  return (
    <div className="bg-white min-h-screen pt-[18vw] md:pt-[8vw] px-[5vw] md:px-[3vw]">
      <div className="space-y-12">
        {/* Header */}
        <header className="">
          <h1 className="text-4xl md:text-6xl text-newBlue font-bold mb-2">
            WTYD (What The Youth Deserves)
          </h1>
          <p className="text-xl md:text-2xl font-light italic">
            Empowering Innovation, Educating the Future
          </p>
        </header>

        {/* Intro Paragraph */}
        <section className="text-lg md:text-xl leading-relaxed  mx-auto">
          <p>
            At WTYD, we are more than just a tech company—we are a movement
            dedicated to bridging the gap between innovation and opportunity.
            Founded with a passion for empowering youth, startups, and
            enterprises, we specialize in delivering cutting-edge web, mobile,
            and software development solutions.
          </p>
          <p className="mt-4">
            Our mission is to provide dynamic, scalable, and reliable digital
            products that not only meet business needs but also unlock future
            growth. Whether you’re a student looking to upskill or a company
            seeking custom development, WTYD is your strategic tech partner.
          </p>
        </section>

        {/* Vision & Mission */}
        <section className=" mx-auto space-y-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-newBlue">Our Vision</h2>
            <p className="text-lg leading-relaxed">
              To become a global hub where innovation meets opportunity—helping
              individuals and businesses transform ideas into impact
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-newBlue">Our Mission</h2>
            <ul className="list-disc list-inside space-y-2 text-lg leading-relaxed">
              <li>
                To build reliable, scalable, and future-ready tech solutions
              </li>
              <li>
                To train the next generation of developers through practical and
                industry-relevant courses
              </li>
              <li>To offer affordable and accessible IT services globally</li>
              <li>
                To foster a culture of growth, learning, and collaboration
              </li>
            </ul>
          </div>
        </section>

        {/* Who We Serve */}
        <section className=" mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-newBlue">Who We Serve</h2>
          <p className="text-lg mb-4">We collaborate with:</p>
          <ul className="list-disc list-inside space-y-2 text-lg leading-relaxed">
            <li>Startups looking to build MVPs or scale fast</li>
            <li>Enterprises seeking enterprise-grade digital transformation</li>
            <li>
              Students & Professionals looking to upgrade their skills with
              real-time project experience
            </li>
            <li>Agencies needing white-label development support</li>
          </ul>
        </section>

        {/* What Sets Us Apart */}
        <section className=" mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-newBlue">What Sets Us Apart</h2>
          <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed">
            <li>
              <strong>End-to-End Services:</strong> From ideation to deployment
              and beyond
            </li>
            <li>
              <strong>Future-Focused Learning:</strong> Our curated courses
              blend theory with hands-on projects
            </li>
            <li>
              <strong>Global Reach:</strong> Clients across Canada, Germany,
              UAE, and more
            </li>
            <li>
              <strong>Client-Centric Approach:</strong> We listen, adapt, and
              deliver value-driven solutions
            </li>
            <li>
              <strong>Agile Development:</strong> We work in sprints, ensuring
              transparency and faster time-to-market
            </li>
          </ul>
        </section>

        {/* Expertise */}
        <section className=" mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-newBlue">Our Expertise</h2>
          <ul className="list-disc list-inside space-y-2 text-lg leading-relaxed">
            <li>Mobile App Development (Android / Flutter / iOS)</li>
            <li>Full-Stack Web Development (MERN)</li>
            <li>UI/UX Design & Prototyping</li>
            <li>Product Consulting & MVP Building</li>
            <li>Corporate Training Programs</li>
            <li>Software Maintenance & Upgrades</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutWTYD;
