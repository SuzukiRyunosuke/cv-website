/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/page.tsx

"use client";

import cvData from '../data/cv.json';
import React from "react"; 
import { Link, Element } from 'react-scroll';

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
  grants_and_fellowships: { title: string; from?: string; to?: string; at?: string }[];
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
     <div>
       {/** ──────────────── ① ナビゲーション部分 ──────────────── **/}
       <nav
         className="
           fixed top-0 left-0 w-full bg-white shadow 
           z-20
         "
       >
         <ol className="flex space-x-4 px-6 py-3">
           <li>
             <Link
               to="sectionProfile"
               spy={true}
               smooth={true}
               offset={-64}
               duration={400}
               activeClass="active"
               className="cursor-pointer hover:underline"
             >
               Profile
             </Link>
           </li>
           <li>
             <Link
               to="sectionEducation"
               spy={true}
               smooth={true}
               offset={-64}
               duration={400}
               activeClass="active"
               className="cursor-pointer hover:underline"
             >
               経歴
             </Link>
           </li>
           <li>
             <Link
               to="sectionGrants"
               spy={true}
               smooth={true}
               offset={-64}
               duration={400}
               activeClass="active"
               className="cursor-pointer hover:underline"
             >
               Grants & Fellowships
             </Link>
           </li>
           <li>
             <Link
               to="sectionPublications"
               spy={true}
               smooth={true}
               offset={-64}
               duration={400}
               activeClass="active"
               className="cursor-pointer hover:underline"
             >
               論文
             </Link>
           </li>
           <li>
             <Link
               to="sectionIntlConfs"
               spy={true}
               smooth={true}
               offset={-64}
               duration={400}
               activeClass="active"
               className="cursor-pointer hover:underline"
             >
               国際学会
             </Link>
           </li>
           <li>
             <Link
               to="sectionInvited"
               spy={true}
               smooth={true}
               offset={-64}
               duration={400}
               activeClass="active"
               className="cursor-pointer hover:underline"
             >
               招待講演（国内）
             </Link>
           </li>
           <li>
             <Link
               to="sectionDomPres"
               spy={true}
               smooth={true}
               offset={-64}
               duration={400}
               activeClass="active"
               className="cursor-pointer hover:underline"
             >
               国内発表
             </Link>
           </li>
           <li>
             <Link
               to="sectionOther"
               spy={true}
               smooth={true}
               offset={-64}
               duration={400}
               activeClass="active"
               className="cursor-pointer hover:underline"
             >
               Other Activities
             </Link>
           </li>
         </ol>
       </nav>

       {/** ─── 固定ヘッダーの高さぶんだけ余白を確保 ─── **/}
       <div style={{ height: "64px" }} />

       {/** ──────────────── メインコンテンツ ──────────────── **/}
      <main className="container mx-auto p-6">
        {/** 各セクションを <Element name="xxx"> でラップする **/}
        {/** === Profile セクション === **/}
        <Element name="sectionProfile">
        <section>
          <h1 className="text-4xl font-bold">{profile.name}</h1>
          <p>{profile.affiliation}</p>
          <ol>
            {profile.positions.map((pos, i) => (
              <li key={i}>
                {pos.from} - {pos.to ?? '現在'}: {pos.title}, {pos.institution}
              </li>
            ))}
          </ol>
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
        </Element>
         {/** === Education セクション === **/}
         <Element name="sectionEducation">
        <section>
          <h2>経歴</h2>
          <ol>
            {education.map((edu, i) => (
              <li key={i}>
                {edu.at}: {edu.institution} ({edu.degree})
              </li>
            ))}
          </ol>
        </section>
        </Element>
        {/** === Grants & Fellowships セクション === **/}
         <Element name="sectionGrants">
        <section>
          <h2>Grants & Fellowships</h2>
          <ol>
            {grants_and_fellowships.map((g, i) => (
              <li key={i}>
                {g.at ?? `${g.from} - ${g.to}`}: {g.title}
              </li>
            ))}
          </ol>
        </section>
        </Element>

        {/** === Publications セクション === **/}
         <Element name="sectionPublications">
          <section>
          <h2>論文</h2>
          <ol>
            {publications.map((pub, i) => (
              <li key={i}>
                {pub.authors.join(', ')}, &quot;<em>{pub.title}</em>,&quot; <em>{pub.venue}</em>
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
        </Element>

        {/** === International Conference Presentations セクション === **/}
         <Element name="sectionIntlConfs">
         <section>
          <h2>国際学会</h2>
          <ol>
            {international_conference_presentations.map((conf, i) => (
              <li key={i}>
                {conf.at}: {conf.authors.join(', ')}, {conf.title}, <em>{conf.conference}</em> ({conf.location})
                {conf.status ? ` - ${conf.status}` : ''}
              </li>
            ))}
          </ol>
        </section>
        </Element>

        {/** === Domestic Invited Lectures セクション === **/}
         <Element name="sectionInvited">
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
                ，{lec.title}， {lec.event} ({lec.location})
              </li>
            ))}
          </ol>
        </section>
        </Element>

        {/** === Domestic Presentations セクション === **/}
         <Element name="sectionDomPres">
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
                ，{pres.title}，{pres.event} ({pres.location})
              </li>
            ))}
          </ol>
        </section>
        </Element>

        {/** === Other Activities セクション === **/}
        <Element name="sectionOther">
        <section>
          <h2>Other Activities</h2>
          {other_activities.map((act, i) => (
            <div key={i} className="mb-4">
              <h3>{act.category}</h3>
              {'details' in act ? (
                <ol>
                  {act.details.map((d: any, j: number) => (
                    <li key={j}>
                      {d.from} - {d.to ?? '現在'}：{d.partner} ({d.country})
                    </li>
                  ))}
                </ol>
              ) : (
                <p>
                  {act.at}：{act.event ?? act.conference}
                </p>
              )}
            </div>
          ))}
        </section>
        </Element>
      </main>
    </div>
  );
}
