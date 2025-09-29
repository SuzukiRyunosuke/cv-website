/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/page.tsx

"use client";

import cvData from '../data/cv.json';
import React from "react"; 
//import { Link, Element } from 'react-scroll';

interface Position {
  from: string;
  to: string | null;
  title: string;
  institution: string;
}
interface LinkSet {
  orcid: string;
  researchgate: string;
  lab_introduction: string;
}
interface Profile {
  name: string;
  name_roman: string;
  affiliation: string;
  positions: Position[];
  contact: { email: string };
  research_fields: string[];
  links: LinkSet;
}

interface CVData {
  profile: Profile;
  education: { at: string; degree: string; institution: string }[];
  grants_and_fellowships: { title: string; from?: string; to?: string; at?: string; amount: string}[];
  publications: {
    authors: string[];
    title: string;
    venue: string;
    identifier?: string;
    volume?: string;
    page?: string;
    year: number;
    doi?: string;
  }[];
  international_conference_presentations: any[];
  domestic_invited_lectures: any[];
  domestic_presentations: any[];
  other_activities: any[];
}

export default function Home() {
  const {
    profile,
    education,
    grants_and_fellowships,
    publications,
    international_conference_presentations,
    domestic_invited_lectures,
    domestic_presentations,
    other_activities,
  } = cvData as CVData;

  return (
      <main className="container mx-auto p-6">
        {/** 各セクションを <section id="xxx"> でラップする **/}
        {/** === Profile セクション === **/}
        <section id="sectionProfile">
        <section>
          <h2>Ryunosuke SUZUKI/鈴木龍之介</h2>
          <p>{profile.affiliation}</p>
            {profile.positions.map((pos, i) => (
              <li key={i}>
                {pos.from} - {pos.to ?? '現在'}: {pos.title}, {pos.institution}
              </li>
            ))}
          <p>
            Email:{' '}
            <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
          </p>
          <p>Research: {profile.research_fields.join(', ')}</p>
          <p>
            Links:{' '}
            <a
              href={profile.links.orcid}
              target="_blank"
              rel="noopener noreferrer"
            >
              ORCID
            </a>
            ,{' '}
            <a
              href={profile.links.researchgate}
              target="_blank"
              rel="noopener noreferrer"
            >
              ResearchGate
            </a>
            ,{' '}
            <a
              href={profile.links.lab_introduction}
              target="_blank"
              rel="noopener noreferrer"
            >
              Lab
            </a>
          </p>
        </section>
        </section>
         {/** === Education セクション === **/}
         <section id="sectionEducation">
        <section>
          <h2>経歴</h2>
            {education.map((edu, i) => (
              <li key={i}>
                {edu.at}: {edu.institution} ({edu.degree})
              </li>
            ))}
        </section>
        </section>
        {/** === Grants & Fellowships セクション === **/}
         <section id="sectionGrants">
        <section>
          <h2>Grants & Fellowships</h2>
          <ol>
            {grants_and_fellowships.map((g, i) => (
              <li key={i}>
                {g.at ?? `${g.from} - ${g.to}`}: {g.title} ({g.amount})
              </li>
            ))}
          </ol>
        </section>
        </section>

        {/** === Publications セクション === **/}
         <section id="sectionPublications">
          <section>
          <h2>論文</h2>
          <ol>
            {publications.map((pub, i) => (
              <li key={i}>
                {pub.authors.map((name: string, idx: number) => {
                  const isSuzuki = name === "Ryunosuke Suzuki";

                  return (
                    <span key={idx}>
                      {isSuzuki ? (
                        <span style={{ textDecoration: "underline" }}>{name}</span>
                      ) : (
                        <span>{name}</span>
                      )}
                      {idx < pub.authors.length - 1 && "，"}
                    </span>
                  );
                })}
                , &quot;{pub.title},&quot; <em>{pub.venue}</em>
                {pub.identifier ? `, ${pub.identifier}` : ''}
                {pub.volume ? `, ${pub.volume}` : ''}
                {pub.page ? `, ${pub.page}` : ''} ({pub.year}).
                {pub.doi && (
                  <span>
                    {' '}
                    DOI:{' '}
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {pub.doi}
                    </a>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </section>
        </section>

        {/** === International Conference Presentations セクション === **/}
         <section id="sectionIntlConfs">
         <section>
          <h2>国際学会</h2>
          <ol>
            {international_conference_presentations.map((conf, i) => (
              <li key={i}>
                {conf.at}:{" "}
                {conf.authors.map((name: string, idx: number) => {
                  const isSuzuki = name === "Ryunosuke Suzuki";

                  return (
                    <span key={idx}>
                      {isSuzuki ? (
                        <span style={{ textDecoration: "underline" }}>{name}</span>
                      ) : (
                        <span>{name}</span>
                      )}
                      {idx < conf.authors.length - 1 && "，"}
                    </span>
                  );
                })}
                , &quot;{conf.title},&quot; <em>{conf.conference}</em> ({conf.location})
              </li>
            ))}
          </ol>
        </section>
        </section>

        {/** === Domestic Invited Lectures セクション === **/}
         <section id="sectionInvited">
        <section>
          <h2>招待講演（国内）</h2>
          <ol>
            {domestic_invited_lectures.map((lec, i) => (
              <li key={i}>
                {lec.at}：
                {lec.authors.map((name: string, idx: number) => {
                  const isSuzuki = name === "鈴木龍之介";
                  return (
                    <span key={idx}>
                      {isSuzuki ? (
                        <span style={{ textDecoration: "underline" }}>{name}</span>
                      ) : (
                        <span>{name}</span>
                      )}
                      {idx < lec.authors.length - 1 && "，"}
                    </span>
                  );
                })}
                ，&quot;{lec.title}，&quot; {lec.event} ({lec.location})
              </li>
            ))}
          </ol>
        </section>
        </section>

        {/** === Domestic Presentations セクション === **/}
         <section id="sectionDomPres">
        <section>
          <h2>学会等国内での発表</h2>
          <ol>
            {domestic_presentations.map((pres, i) => (
              <li key={i}>
                {pres.at}：
                {pres.authors.map((name: string, idx: number) => {
                  const isSuzuki = name === "鈴木龍之介";

                  return (
                    <span key={idx}>
                      {isSuzuki ? (
                        <span style={{ textDecoration: "underline" }}>{name}</span>
                      ) : (
                        <span>{name}</span>
                      )}
                      {idx < pres.authors.length - 1 && "，"}
                    </span>
                  );
                })}
                ，&quot;{pres.title}，&quot;{pres.event} ({pres.location})
              </li>
            ))}
          </ol>
        </section>
        </section>

        {/** === Other Activities セクション === **/}
        <section id="sectionOther">
        <section>
          <h2>Other Activities</h2>
          {other_activities.map((act, i) => (
            <div key={i} className="mb-4">
              <h3>{act.category}</h3>
              {'details' in act ? (
                <ol>
                  {act.details.map((d: any) => (
                    <li key={i}>
                      {d.from} - {d.to ?? '現在'}：{d.partner} ({d.country})
                    </li>
                  ))}
                </ol>
              ) : (
                <ol>
                    <li key={i}>
                      {act.at}：{act.event ?? act.conference}
                    </li>
                </ol>
              )}
            </div>
          ))}
        </section>
        </section>
      </main>
  );
}


  //      {/** ──────────────── ① ナビゲーション部分 ──────────────── **/}
  //      <nav
  //        className="
  //          fixed top-0 left-0 w-full bg-white shadow 
  //          z-20
  //        "
  //      >
  //        <ol>
  //          <li>
  //            <Link
  //              to="sectionProfile"
  //              spy={true}
  //              smooth={true}
  //              offset={-64}
  //              duration={400}
  //              activeClass="active"
  //              className="cursor-pointer hover:underline"
  //            >
  //              Profile
  //            </Link>
  //          </li>
  //          <li>
  //            <Link
  //              to="sectionEducation"
  //              spy={true}
  //              smooth={true}
  //              offset={-64}
  //              duration={400}
  //              activeClass="active"
  //              className="cursor-pointer hover:underline"
  //            >
  //              経歴
  //            </Link>
  //          </li>
  //          <li>
  //            <Link
  //              to="sectionGrants"
  //              spy={true}
  //              smooth={true}
  //              offset={-64}
  //              duration={400}
  //              activeClass="active"
  //              className="cursor-pointer hover:underline"
  //            >
  //              Grants & Fellowships
  //            </Link>
  //          </li>
  //          <li>
  //            <Link
  //              to="sectionPublications"
  //              spy={true}
  //              smooth={true}
  //              offset={-64}
  //              duration={400}
  //              activeClass="active"
  //              className="cursor-pointer hover:underline"
  //            >
  //              論文
  //            </Link>
  //          </li>
  //          <li>
  //            <Link
  //              to="sectionIntlConfs"
  //              spy={true}
  //              smooth={true}
  //              offset={-64}
  //              duration={400}
  //              activeClass="active"
  //              className="cursor-pointer hover:underline"
  //            >
  //              国際学会
  //            </Link>
  //          </li>
  //          <li>
  //            <Link
  //              to="sectionInvited"
  //              spy={true}
  //              smooth={true}
  //              offset={-64}
  //              duration={400}
  //              activeClass="active"
  //              className="cursor-pointer hover:underline"
  //            >
  //              招待講演（国内）
  //            </Link>
  //          </li>
  //          <li>
  //            <Link
  //              to="sectionDomPres"
  //              spy={true}
  //              smooth={true}
  //              offset={-64}
  //              duration={400}
  //              activeClass="active"
  //              className="cursor-pointer hover:underline"
  //            >
  //              国内発表
  //            </Link>
  //          </li>
  //          <li>
  //            <Link
  //              to="sectionOther"
  //              spy={true}
  //              smooth={true}
  //              offset={-64}
  //              duration={400}
  //              activeClass="active"
  //              className="cursor-pointer hover:underline"
  //            >
  //              Other Activities
  //            </Link>
  //          </li>
  //        </ol>
  //      </nav>

  //      {/** ─── 固定ヘッダーの高さぶんだけ余白を確保 ─── **/}
  //      <div style={{ height: "64px" }} />

       {/** ──────────────── メインコンテンツ ──────────────── **/}
