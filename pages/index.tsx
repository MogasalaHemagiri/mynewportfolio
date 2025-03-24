import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Hero from "../components/Hero";
import styles from "../styles/Home.module.css";
import { Experience, PageInfo, Skill, Project, Social } from "../typings";
import { client } from "../sanity"; // Import Sanity client
import About from "../components/About";
import WorkExperience from "../components/WorkExperience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import ContactMe from "../components/ContactMe";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";
import Script from "next/script";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
};

const Home = ({ pageInfo, experiences, projects, skills, socials }: Props) => {
  return (
    <div
      className="bg-lightBackground text-darkBlack h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-darkGreen/80"
    >
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>{"Mitch's Portfolio"}</title>
      </Head>

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-LV1LN9VBT0" strategy="afterInteractive"></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LV1LN9VBT0');`}
      </Script>

      <Header socials={socials} />
      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} />
      </section>
      <section id="about" className="snap-center">
        <About pageInfo={pageInfo} />
      </section>
      <section id="experience" className="snap-center">
        <WorkExperience experiences={experiences} />
      </section>
      <section id="skills" className="snap-start">
        <Skills skills={skills} />
      </section>
      <section id="projects" className="snap-start">
        <Projects projects={projects} />
      </section>
      <section id="contact" className="snap-start">
        <ContactMe />
      </section>
      <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <div className="h-10 w-10 bg-darkGreen/80 rounded-full flex items-center justify-center">
              <HomeIcon className="h-7 w-17 pb-0.5 hover:grayscale-100 text-white animate-pulse" />
            </div>
          </div>
        </footer>
      </Link>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const pageInfoQuery = `*[_type == "pageInfo"][0]`;
    const experiencesQuery = `*[_type == "experience"] | order(dateStarted desc)`;
    const skillsQuery = `*[_type == "skill"]`;
    const projectsQuery = `*[_type == "project"]`;
    const socialsQuery = `*[_type == "social"]`;

    const pageInfo: PageInfo = await client.fetch(pageInfoQuery);
    const experiences: Experience[] = await client.fetch(experiencesQuery);
    const skills: Skill[] = await client.fetch(skillsQuery);
    const projects: Project[] = await client.fetch(projectsQuery);
    const socials: Social[] = await client.fetch(socialsQuery);

    return {
      props: {
        pageInfo: pageInfo || ({} as PageInfo),
        experiences: experiences || [],
        skills: skills || [],
        projects: projects || [],
        socials: socials || [],
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return {
      props: {
        pageInfo: {} as PageInfo,
        experiences: [],
        skills: [],
        projects: [],
        socials: [],
      },
      revalidate: 10,
    };
  }
};
