/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/page.tsx

"use client";

import cvData from '../data/cv.json';
import Sidebar from './sidebar';
import React, { useRef } from "react"; 

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

  const profileRef = useRef<HTMLElement | null>(null);
  const educationRef = useRef<HTMLElement | null>(null);
  const grantsRef = useRef<HTMLElement | null>(null);
  const publicationsRef = useRef<HTMLElement | null>(null);
  const intlConfsRef = useRef<HTMLElement | null>(null);
  const invitedLecturesRef = useRef<HTMLElement | null>(null);
  const domPresentationsRef = useRef<HTMLElement | null>(null);
  const otherActivitiesRef = useRef<HTMLElement | null>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex">
      <Sidebar
        onScrollToProfile={() => scrollTo(profileRef)}
        onScrollToEducation={() => scrollTo(educationRef)}
        onScrollToGrants={() => scrollTo(grantsRef)}
        onScrollToPublications={() => scrollTo(publicationsRef)}
        onScrollToIntlConfs={() => scrollTo(intlConfsRef)}
        onScrollToInvitedLectures={() => scrollTo(invitedLecturesRef)}
        onScrollToDomPresentations={() => scrollTo(domPresentationsRef)}
        onScrollToOtherActivities={() => scrollTo(otherActivitiesRef)}
      />

    <main className="container mx-auto p-6 prose ml-48">
      {/* Profile */}
      <section ref={profileRef}>
        <h1 className="text-4xl font-bold">{profile.name}</h1>
        <p>{profile.affiliation}</p>
        <ul>
          {profile.positions.map((pos, i) => (
            <li key={i}>
              {pos.from} - {pos.to ?? '現在'}: {pos.title}, {pos.institution}
            </li>
          ))}
        </ul>
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

      {/* Education */}
      <section ref={educationRef} className="mt-12">
        <h2>経歴</h2>
        <ul>
          {education.map((edu, i) => (
            <li key={i}>
              {edu.at}: {edu.institution} ({edu.degree})
            </li>
          ))}
        </ul>
      </section>

      {/* 助成金 */}
      <section>
        <h2>Grants & Fellowships</h2>
        <ul>
          {grants_and_fellowships.map((g, i) => (
            <li key={i}>
              {g.at ?? `${g.from} - ${g.to}`}: {g.title}
            </li>
          ))}
        </ul>
      </section>

      {/* Publications */}
      <section ref={publicationsRef} className="mt-12">
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

      {/* International Conferences */}
      <section ref={intlConfsRef} className="mt-12">
        <h2>国際学会</h2>
        <ul>
          {international_conference_presentations.map((conf, i) => (
            <li key={i}>
              {conf.at}: {conf.authors.join(', ')}, {conf.title}, <em>{conf.conference}</em> ({conf.location})
              {conf.status ? ` - ${conf.status}` : ''}
            </li>
          ))}
        </ul>
      </section>

      {/* Domestic Invited Lectures */}
      <section ref={invitedLecturesRef} className="mt-12">
        <h2>招待講演（国内）</h2>
        <ul>
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
        </ul>
      </section>

      {/* Domestic Presentations */}
      <section ref={domPresentationsRef} className="mt-12">
        <h2>学会等国内での発表</h2>
        <ul>
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
        </ul>
      </section>

      {/* Other Activities */}
      <section ref={otherActivitiesRef} className="mt-12">
        <h2>Other Activities</h2>
        {other_activities.map((act, i) => (
          <div key={i} className="mb-4">
            <h3>{act.category}</h3>
            {'details' in act ? (
              <ul>
                {act.details.map((d: any, j: number) => (
                  <li key={j}>
                    {d.from} - {d.to ?? '現在'}：{d.partner} ({d.country})
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                {act.at}：{act.event ?? act.conference}
              </p>
            )}
          </div>
        ))}
      </section>
    </main>
  </div>
  );
}
