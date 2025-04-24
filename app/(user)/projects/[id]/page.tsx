"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductView = () => {
  return (
    <div className="px-6 md:px-[3vw] pb-[4vw] pt-[8vw] bg-white text-gray-800">
      {/* Top Section */}
      <div className="bg-newBlue text-white rounded-xl p-6 md:p-10 flex flex-col md:flex-row gap-6 items-center relative">
        <Link
          href="/projects"
          className="inline-block absolute top-6 left-6 text-lg font-medium text-blue-600 bg-white px-6 py-2.5 rounded-md transition"
        >
          Back to projects
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl md:text-5xl font-bold mb-2">
            Relevant Projects on Web
          </h1>
          <p className="text-sm md:text-xl w-9/12 mt-2.5">
            Offers a variety of courses to upskill learners in trending
            technologies. Provides recognized certificates to boost resumes.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src="/assets/home/blog.png"
            alt="Project banner"
            width={1000}
            height={1000}
            className="rounded-md h-[45vh] object-cover"
          />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl md:text-4xl font-semibold mt-10 text-newBlue">
        MASS Mailer
      </h2>

      {/* Description */}
      <div className="mt-4 text-gray-700 leading-relaxed text-sm md:text-xl space-y-4">
        <p>
          This is a very simple bulk email sender (client), implemented in
          Python and Eel. It sends an email message (by given HTML template) to
          a list of recipients given in the form separated by new line, with
          simple mail-merge functionality which you have to specify with{" "}
          <code>{`{MAIL}`}</code> in the HTML.
          <br /> This software is for general use. It is intended for end-users,
          and features a beautiful GUI.
        </p>

        <h3 className="font-semibold text-2xl text-newBlue">Goals</h3>
        <p>
          The goal of this software is to send reliably bulk emails (e.g. 10,000
          emails) without using MailChimp or similar email marketing software.
          Sending thousands of emails will not work for most email providers
          (like Office 365 and GMail).
          <br />
          It will say &quot;stop, are you a spammer?&quot;. Registering your own
          SMTP server or using an SMTP from sites like MailJet + mail client
          like Outlook / Thunderbird / Evolution + mail merge will do the job,
          but most emails will be marked as spam. This is because you send too
          aggressively, e.g. 10,000 emails in 5 minutes. Best results come when
          you send emails one by one with 5–30 seconds delay after each mail
          sends. This is what this software does.
        </p>

        <h3 className="font-semibold text-2xl text-newBlue">How to Use It?</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Setup an SMTP server (be sure to configure correctly the SPF records
            for your domain + reverse DNS + others).
          </li>
          <li>
            Or purchase SMTP from MailGun / MailJet / other. Setup your email
            template HTML file.
          </li>
          <li>Prepare your target emails.</li>
          <li>Fill the mail form with all your details.</li>
          <li>
            Run the app and wait. It takes time (intentionally). I run this in
            the night.
          </li>
        </ol>
      </div>

      {/* GitHub Button */}
      <div className="mt-8">
        <Link
          href="https://github.com"
          target="_blank"
          className="inline-flex items-center gap-4 text-lg bg-newBlue text-white px-7 py-2.5 rounded-md font-medium transition"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0.297C5.37 0.297 0 5.667 0 12.297c0 5.289 3.438 9.773 8.207 11.387.599.111.793-.26.793-.577 0-.285-.01-1.04-.015-2.042-3.338.724-4.042-1.611-4.042-1.611-.546-1.386-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.304-5.466-1.332-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 0 1 3.003-.404c1.018.005 2.043.138 3.003.404 2.289-1.552 3.295-1.23 3.295-1.23.655 1.653.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.192.694.801.576C20.565 22.065 24 17.583 24 12.297 24 5.667 18.627 0.297 12 0.297z" />
          </svg>
          GitHub
        </Link>
      </div>
    </div>
  );
};

export default ProductView;
