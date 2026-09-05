import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";

const cards = [
  {
    title: "BCA, 2024",
    body: "Bachelor of Computer Applications from Acharya Institute of Graduate Studies, Bangalore University.",
  },
  {
    title: "Full-stack work",
    body: "React.js on the frontend, Node.js and Express.js on the backend, MongoDB with Mongoose for data.",
  },
  {
    title: "APIs and access control",
    body: "REST APIs, JWT authentication, role-based access control, and deployment to Vercel, Netlify and Render.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="border-t border-border py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="page-wrap">
        <SectionHeading
          index="01"
          label="About"
          title="Building things that solve real problems."
          id="about-heading"
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <Reveal className="max-w-2xl space-y-5 text-base leading-relaxed text-fg-muted md:text-lg">
            <p>
              I'm a Software Developer and BCA graduate with hands-on
              experience building and deploying full-stack web applications.
            </p>
            <p>
              I work primarily with React.js, Node.js, Express.js and MongoDB,
              with experience building REST APIs, authentication systems,
              role-based access control and responsive web interfaces.
            </p>
            <p>
              I enjoy learning through practical projects and continuously
              improving my software engineering skills.
            </p>
          </Reveal>

          <div className="space-y-3">
            {cards.map((card, index) => (
              <Reveal
                key={card.title}
                delay={index * 0.06}
                className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]"
              >
                <h3 className="text-sm font-medium text-fg">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {card.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
