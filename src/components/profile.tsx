import type { ReactNode } from "react";
import Link from "next/link";
import { getCV, type Language } from "../data/localize";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}
function ExternalLink({ href, children, className = "text-link" }: { href: string; children: ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<Arrow diagonal /></a>;
}
function Authors({ names }: { names: string[] }) {
  if (!names.length) return null;
  return <p className="authors">{names.map((name, i) => <span key={`${name}-${i}`}>
    {i > 0 && ", "}{name === "Ryunosuke Suzuki" || name === "鈴木龍之介" ? <strong>{name}</strong> : name}
  </span>)}</p>;
}
function DateLabel({ value }: { value: string }) {
  return <time dateTime={value}>{value.replaceAll("-", ".")}</time>;
}
function SectionHeading({ number, title, subtitle, id }: { number: string; title: string; subtitle: string; id: string }) {
  return <div className="section-heading"><span className="section-number">{number}</span><div><h2 id={id}>{title}</h2><p>{subtitle}</p></div></div>;
}

// A decorative, deterministic lattice inspired by the research topics.
function Terrain({ miniature = false }: { miniature?: boolean }) {
  function point(u: number, v: number) {
    const z = 42 * Math.sin(u * 0.85) * Math.cos(v * 0.7) + 10 * u;
    return `${(210 + 38 * u + 21 * v).toFixed(2)},${(190 + 16 * v - 12 * u - z).toFixed(2)}`;
  }
  const count = miniature ? 9 : 19;
  const lines = Array.from({ length: count }, (_, i) => -3 + 6 * i / (count - 1));
  return <svg viewBox="0 0 420 340" fill="none" aria-hidden="true" className={miniature ? "terrain-mark" : undefined}>
      <g stroke="currentColor" strokeWidth={miniature ? 3 : 0.8}>
        {lines.map((n, i) => <polyline key={`u-${i}`} opacity={0.35 + i / 50} points={Array.from({ length: 61 }, (_, j) => point(n, -3 + j / 10)).join(" ")} />)}
        {lines.map((n, i) => <polyline key={`v-${i}`} opacity={0.35 + i / 50} points={Array.from({ length: 61 }, (_, j) => point(-3 + j / 10, n)).join(" ")} />)}
      </g>
    </svg>;
}
function ResearchFigure({ label }: { label: string }) {
  return <figure className="research-figure" aria-label={label}>
    <div className="figure-label"><span>FORM / FORCE / ADAPTATION</span><span>01 — 02</span></div>
    <Terrain />
    <figcaption><span>Biomechanics</span><span className="figure-cross">×</span><span>Biophysics</span></figcaption>
  </figure>;
}

type Presentation = {
  at: string; authors: string[]; title: string; location: string;
  conference?: string; event?: string; presentation_type?: string;
  paper_number?: string; session?: string; status?: string;
};
function PresentationList({ items }: { items: Presentation[] }) {
  return <ol className="record-list presentation-list">{items.map((item) => <li key={`${item.at}-${item.title}`}>
    <div className="record-date"><DateLabel value={item.at} />{item.presentation_type && <span className="record-type">{item.presentation_type}</span>}</div>
    <div className="record-body"><h4>{item.title}</h4><Authors names={item.authors} />
      <p className="venue">{item.conference ?? item.event}</p>
      <p className="record-note">{[item.location, item.session, item.paper_number && `No. ${item.paper_number}`, item.status].filter(Boolean).join(" · ")}</p>
    </div>
  </li>)}</ol>;
}

export default function Profile({ language }: { language: Language }) {
  const cv = getCV(language);
  const { profile } = cv;
  const en = language === "en";
  const t = (ja: string, english: string) => en ? english : ja;
  return <>
    <a className="skip-link" href="#main">{t("本文へスキップ", "Skip to content")}</a>
    <header className="site-header"><div className="header-inner">
      <a className="wordmark" href="#sectionProfile" aria-label={t("Ryunosuke Suzuki — ページの先頭へ", "Ryunosuke Suzuki — Back to top")}><Terrain miniature /><span>RYUNOSUKE SUZUKI</span></a>
      <nav aria-label={t("メインナビゲーション", "Main navigation")}><a href="#sectionResearch">{t("研究", "Research")}</a><a href="#sectionPublications">{t("論文", "Publications")}</a><a href="#sectionEducation">{t("経歴", "Background")}</a><a href="#sectionPresentations">{t("発表", "Talks")}</a><a className="nav-contact" href="#sectionContact">Contact <Arrow diagonal /></a></nav>
      <div className="language-switch" role="group" aria-label={t("表示言語", "Language")}>
        {en ? <Link href="/" hrefLang="ja" lang="ja" aria-label="日本語版">JA</Link> : <span aria-current="true" lang="ja">JA</span>}
        <span className="language-divider" aria-hidden="true">/</span>
        {en ? <span aria-current="true" lang="en">EN</span> : <Link href="/en/" hrefLang="en" lang="en" aria-label="English version">EN</Link>}
      </div>
    </div></header>
    <main id="main" className="page-shell">
      <section id="sectionProfile" className="hero" aria-labelledby="profile-name">
        <div className="hero-copy"><p className="eyebrow"><span className="small-rule" /> KANAZAWA UNIVERSITY · RESEARCH PROFILE</p>
          <h1 id="profile-name" lang="en">Ryunosuke<br /><span>Suzuki</span></h1><p className="name-japanese" lang="ja">鈴木 龍之介</p>
          <p className="hero-affiliation"><span>{profile.affiliation}</span><span>{profile.role}</span></p>
          <div className="hero-links"><a className="primary-link" href="#sectionPublications">{t("論文を見る", "View publications")} <Arrow /></a><a className="text-link" href={`mailto:${profile.contact.email}`}>{t("お問い合わせ", "Get in touch")} <Arrow diagonal /></a></div>
        </div><ResearchFigure label={t("エネルギー地形をイメージしたイラスト", "Illustration inspired by an energy landscape")} />
      </section>
      <section id="sectionResearch" className="research-intro section-layout" aria-labelledby="research-heading">
        <SectionHeading number="01" title="Research" subtitle={t("研究について", "Focus & approach")} id="research-heading" />
        <div className="section-content"><h3 className="research-statement">{en ? <>Understanding life<br />through form and force.</> : <>形と力から、<br className="mobile-break" />生命を考える。</>}</h3>
          <p className="research-description">{t("生体の形態変化と力学的な適応、その背後にある相互作用を数理モデルから探究しています。バイオメカニクスと生物物理学を軸に、生命システムの理解に取り組んでいます。", "I use mathematical models to explore how biological form evolves, how living systems adapt mechanically, and how interactions between their components shape these processes. My work connects biomechanics, biophysics, and continuum mechanics.")}</p>
          <ul className="research-fields" aria-label={t("研究分野", "Research fields")}>{profile.research_fields.map((field) => <li key={field}>{field}</li>)}</ul>
          <div className="profile-links"><ExternalLink href={profile.links.researchmap}>researchmap</ExternalLink><ExternalLink href={profile.links.tayo}>Tayo</ExternalLink><ExternalLink href={profile.links.orcid}>ORCID</ExternalLink><ExternalLink href={profile.links.researchgate}>ResearchGate</ExternalLink><ExternalLink href={profile.links.lab_introduction}>{t("研究室", "Laboratory")}</ExternalLink></div>
        </div>
      </section>
      <section id="sectionPublications" className="section-layout" aria-labelledby="publications-heading">
        <SectionHeading number="02" title="Publications" subtitle={t("論文", "Journal articles")} id="publications-heading" />
        <div className="section-content"><ol className="publication-list">{cv.publications.map((pub, i) => <li key={pub.title}>
          <div className="publication-meta"><span>{String(i + 1).padStart(2, "0")} / {pub.year}</span><span>{pub.venue === "arXiv preprint" ? "PREPRINT" : "JOURNAL ARTICLE"}</span></div>
          <h3><ExternalLink href={`https://doi.org/${pub.doi}`} className="publication-title">{pub.title}</ExternalLink></h3>
          <Authors names={pub.authors} /><p className="publication-venue"><em>{pub.venue}</em>{pub.volume && `, ${pub.volume}`}{pub.page && `, ${pub.page}`} ({pub.year})</p>
          <ExternalLink href={`https://doi.org/${pub.doi}`} className="doi-link">DOI: {pub.doi}</ExternalLink>
        </li>)}</ol></div>
      </section>
      <section id="sectionEducation" className="section-layout" aria-labelledby="education-heading">
        <SectionHeading number="03" title="Background" subtitle={t("経歴・学歴", "Appointments & education")} id="education-heading" />
        <div className="section-content"><h3 className="subsection-title">{t("所属・職歴", "Appointments")}{!en && <span>Appointments</span>}</h3>
          <ol className="record-list">{profile.positions.map((position) => <li key={position.title}>
            <div className="record-date"><DateLabel value={position.from} /><span>— {position.to ? <DateLabel value={position.to} /> : t("現在", "Present")}</span></div>
            <div className="record-body"><h4>{position.title}</h4><p>{position.institution}</p></div>
          </li>)}</ol>
          <h3 className="subsection-title spaced">{t("学歴", "Education")}{!en && <span>Education</span>}</h3>
          <ol className="record-list">{[...cv.education].reverse().map((education) => <li key={education.at}>
            <div className="record-date"><DateLabel value={education.at} /></div><div className="record-body"><h4>{education.institution}</h4><p>{education.degree}</p></div>
          </li>)}</ol>
        </div>
      </section>
      <section id="sectionGrants" className="section-layout" aria-labelledby="grants-heading">
        <SectionHeading number="04" title="Grants" subtitle={t("研究助成・フェローシップ", "Funding & fellowships")} id="grants-heading" />
        <div className="section-content"><ol className="record-list">{cv.grants_and_fellowships.map((grant) => <li key={grant.title}>
          <div className="record-date">{grant.at ? <DateLabel value={grant.at} /> : <><DateLabel value={grant.from!} /><span>— <DateLabel value={grant.to!} /></span></>}</div>
          <div className="record-body"><h3>{grant.title}</h3>{grant.project && <p>{grant.project}</p>}<p className="grant-amount">{grant.amount}</p></div>
        </li>)}</ol></div>
      </section>
      <section id="sectionPresentations" className="section-layout" aria-labelledby="presentations-heading">
        <SectionHeading number="05" title="Presentations" subtitle={t("学会発表・招待講演", "Conferences & seminars")} id="presentations-heading" />
        <div className="section-content">
          {en && <p className="translation-note">Japanese presentation titles are translated into English for reference.</p>}
          <section id="sectionIntlConfs" aria-labelledby="international-heading"><h3 className="subsection-title" id="international-heading">{t("国際学会", "International")}{!en && <span>International</span>}</h3><PresentationList items={cv.international_conference_presentations} /></section>
          <section id="sectionInvited" className="spaced" aria-labelledby="invited-heading"><h3 className="subsection-title" id="invited-heading">{t("招待講演", "Invited talks")}{!en && <span>Invited talks</span>}</h3><PresentationList items={cv.domestic_invited_lectures} /></section>
          <section id="sectionDomPres" className="spaced" aria-labelledby="domestic-heading"><h3 className="subsection-title" id="domestic-heading">{t("国内発表", "Domestic")}{!en && <span>Domestic</span>}</h3><PresentationList items={cv.domestic_presentations.slice(0, 3)} />
            <details className="archive"><summary>{t("これまでの発表を見る", "View earlier presentations")} <span>{cv.domestic_presentations.length - 3}{t("件", " talks")} <span className="disclosure-icon" aria-hidden="true">＋</span></span></summary><PresentationList items={cv.domestic_presentations.slice(3)} /></details>
          </section>
        </div>
      </section>
      <section id="sectionOther" className="section-layout" aria-labelledby="activities-heading">
        <SectionHeading number="06" title="Activities" subtitle={t("共同研究・その他の活動", "Collaboration & service")} id="activities-heading" />
        <div className="section-content"><ul className="activity-list">{cv.other_activities.map((activity) => <li key={activity.category}><h3>{activity.category}</h3>
          <p>{activity.description}</p>{activity.date && <p className="record-note">{activity.date}</p>}
        </li>)}</ul></div>
      </section>
      <section id="sectionContact" className="contact-section" aria-labelledby="contact-heading"><div><p className="eyebrow">GET IN TOUCH</p><h2 id="contact-heading">Contact<span>.</span></h2><p>{t("研究に関するご連絡はこちらへ。", "For research inquiries and collaboration.")}</p></div><a className="contact-email" href={`mailto:${profile.contact.email}`}>{profile.contact.email}<Arrow diagonal /></a></section>
    </main>
    <footer className="site-footer page-shell"><span>© {profile.name_roman}</span><span>Biomechanics &amp; Biophysics</span><a href="#sectionProfile">{t("ページの先頭へ", "Back to top")} <span aria-hidden="true">↑</span></a></footer>
  </>;
}
