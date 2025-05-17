/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/page.tsx
import cvData from '../data/cv.json';

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
  contact: { email: string; phone: string };
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
    <main className="container mx-auto p-6 prose">
      {/* Profile */}
      <section>
        <h1 className="text-4xl font-bold">{profile.name}</h1>
        <p>{profile.affiliation}</p>
        <ul>
          {profile.positions.map((pos, i) => (
            <li key={i}>
              {pos.from} – {pos.to ?? '現在'}: {pos.title}, {pos.institution}
            </li>
          ))}
        </ul>
        <p>
          Email:{' '}
          <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
        </p>
        <p>Phone: {profile.contact.phone}</p>
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
            Lab Intro
          </a>
        </p>
      </section>

      {/* Education */}
      <section>
        <h2>Education</h2>
        <ul>
          {education.map((edu, i) => (
            <li key={i}>
              {edu.at}: {edu.institution} ({edu.degree})
            </li>
          ))}
        </ul>
      </section>

      {/* Grants & Fellowships */}
      <section>
        <h2>Grants & Fellowships</h2>
        <ul>
          {grants_and_fellowships.map((g, i) => (
            <li key={i}>
              {g.at ?? `${g.from} – ${g.to}`}: {g.title}
            </li>
          ))}
        </ul>
      </section>

      {/* Publications */}
      <section>
        <h2>Publications</h2>
        <ol>
          {publications.map((pub, i) => (
            <li key={i}>
              {pub.authors.join(', ')}. <em>{pub.title}</em>. {pub.venue}
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
      <section>
        <h2>International Conferences</h2>
        <ul>
          {international_conference_presentations.map((conf, i) => (
            <li key={i}>
              {conf.at}: {conf.title}, {conf.conference} ({conf.location})
              {conf.status ? ` – ${conf.status}` : ''}
            </li>
          ))}
        </ul>
      </section>

      {/* Domestic Invited Lectures */}
      <section>
        <h2>Domestic Invited Lectures</h2>
        <ul>
          {domestic_invited_lectures.map((lec, i) => (
            <li key={i}>
              {lec.at}: {lec.title}, {lec.event} ({lec.location})
            </li>
          ))}
        </ul>
      </section>

      {/* Domestic Presentations */}
      <section>
        <h2>Domestic Presentations</h2>
        <ul>
          {domestic_presentations.map((pres, i) => (
            <li key={i}>
              {pres.at}: {pres.title}, {pres.event} ({pres.location})
            </li>
          ))}
        </ul>
      </section>

      {/* Other Activities */}
      <section>
        <h2>Other Activities</h2>
        {other_activities.map((act, i) => (
          <div key={i} className="mb-4">
            <h3>{act.category}</h3>
            {'details' in act ? (
              <ul>
                {act.details.map((d: any, j: number) => (
                  <li key={j}>
                    {d.from} – {d.to ?? '現在'}: {d.partner} ({d.country})
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                {act.at}: {act.event ?? act.conference}
              </p>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
