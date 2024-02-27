

export const logo = "/img/logo.png"
const dev = process.env.NODE_ENV !== 'production';

export const SERVER_BASE_URL = dev ? 'http://localhost:3000' : 'https://dashboard.esicapps.org'
export const LOGIN_URL = dev ? "/auth/login" : "https://dashboard.esicapps.org/auth/login"

export const jobsNavLinks: { title: string; href: string; description: string }[] = [
    {
      title: "Recruitment",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Selection Criteria",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Job List",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Job Advert",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
   
  ]


  export const shortlistingNavLinks: { title: string; href: string; description: string }[] = [
    {
      title: "Shortlist",
      href: "/docs/primitives/alert-dialog",
      description:
        "Do shortlisting here",
    },
    {
      title: "Accepted List",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Rejected List",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
   
  ]
  export const settingsNavLinks: { title: string; href: string; description: string }[] = [
    {
      title: "Exam type",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Education Level",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Grade",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Subject",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Degree Prefix",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Division",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
    {
        title: "Department",
        href: "/docs/primitives/tooltip",
        description:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      },
      {
        title: "User type",
        href: "/docs/primitives/tooltip",
        description:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      },
  ]