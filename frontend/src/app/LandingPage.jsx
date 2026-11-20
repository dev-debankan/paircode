import { useEffect } from "react"
import { Link } from "react-router-dom"
import "./LandingPage.css"

export const APP_NAME = "Paircode"
export const GITHUB_URL = "https://github.com/dev-debankan/paircode"
export const LIVE_DEMO_URL = "https://your-live-demo.example"
export const AUTHOR_NAME = "Your Name"

const features = [
  {
    icon: "edit",
    title: "Edit together",
    description:
      "Work in one shared Monaco editor and see changes arrive as collaborators type.",
  },
  {
    icon: "users",
    title: "See who's here",
    description:
      "A live presence list shows the names of people currently connected to the editor.",
  },
  {
    icon: "merge",
    title: "Changes stay in sync",
    description:
      "Yjs keeps concurrent edits coordinated with a conflict-free shared document.",
  },
  {
    icon: "code",
    title: "A familiar code editor",
    description:
      "Start in a browser-based Monaco editor, configured with JavaScript as its default language.",
  },
]

const steps = [
  {
    title: "Pick a name",
    description: "Choose the name others will see in the editor's presence list.",
  },
  {
    title: "Open the editor",
    description: "Join the app's shared editor from your browser. No account flow.",
  },
  {
    title: "Code together",
    description: "Edit in real time while the shared document keeps everyone in sync.",
  },
]

const faqs = [
  {
    question: "Do I need an account?",
    answer:
      "No account sign-up is implemented. Enter a display name to join; it is stored in this browser tab's session storage.",
  },
  {
    question: "How many people can join?",
    answer:
      "The app does not set a participant limit, and the project does not define or test a maximum. Actual capacity depends on the server and network.",
  },
  {
    question: "Is my code saved?",
    answer:
      "There is no database or save-to-project feature configured in this app. Treat the shared editor as temporary rather than saved work.",
  },
  {
    question: "Which languages are supported?",
    answer:
      "The editor is initialized with JavaScript. There is no language selector or code execution feature in the current app.",
  },
  {
    question: "Can I create a private room?",
    answer:
      "Not currently. Everyone connects to the same shared Yjs room; room creation or room-specific links are not implemented.",
  },
]

function Icon({ name }) {
  const paths = {
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    merge: (
      <>
        <path d="M6 3v12a6 6 0 0 0 6 6h6" />
        <path d="m14 17 4 4-4 4" />
        <path d="M18 3v4a6 6 0 0 1-6 6H6" />
        <circle cx="6" cy="3" r="2" />
        <circle cx="18" cy="3" r="2" />
      </>
    ),
    code: (
      <>
        <path d="m8 17-5-5 5-5M16 7l5 5-5 5M14 4l-4 16" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className="feature-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function ProductPreview() {
  return (
    <div className="preview-window" role="img" aria-label="Illustration of the shared code editor with two collaborators">
      <div className="preview-titlebar">
        <div className="window-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="preview-title">paircode / playground</span>
        <span className="preview-live"><i /> Live</span>
      </div>
      <div className="preview-tab">
        <span className="javascript-mark">JS</span>
        <span>index.js</span>
        <span className="tab-unsaved" aria-label="Unsaved changes">●</span>
      </div>
      <div className="preview-editor">
        <div className="code-line"><span className="line-number">1</span><span><b className="code-purple">const</b> <b className="code-blue">room</b> = <b className="code-green">"shared-session"</b></span></div>
        <div className="code-line"><span className="line-number">2</span><span /></div>
        <div className="code-line"><span className="line-number">3</span><span><b className="code-purple">function</b> <b className="code-yellow">sayHello</b>(<b className="code-orange">name</b>) {"{"}</span></div>
        <div className="code-line"><span className="line-number">4</span><span>&nbsp;&nbsp;<b className="code-purple">return</b> <b className="code-green">{"`Welcome, ${name}!`"}</b></span></div>
        <div className="code-line"><span className="line-number">5</span><span>{"}"}</span></div>
        <div className="code-line"><span className="line-number">6</span><span /></div>
        <div className="code-line"><span className="line-number">7</span><span><b className="code-blue">console</b>.<b className="code-yellow">log</b>(<b className="code-yellow">sayHello</b>(<b className="code-green">"world"</b>))<span className="mock-cursor" aria-hidden="true" /></span></div>
        <div className="collaborator-cursor cursor-a" aria-hidden="true"><span>Aisha</span></div>
        <div className="collaborator-cursor cursor-b" aria-hidden="true"><span>Rohan</span></div>
      </div>
      <div className="preview-statusbar">
        <span><i /> 2 collaborators</span>
        <span>JavaScript</span>
      </div>
    </div>
  )
}

function ArchitectureDiagram() {
  return (
    <svg
      className="architecture-diagram"
      viewBox="0 0 800 142"
      role="img"
      aria-labelledby="architecture-title architecture-description"
    >
      <title id="architecture-title">Paircode architecture</title>
      <desc id="architecture-description">
        React and Monaco connect through a Yjs shared document and Socket.io to a Node and Express server.
      </desc>
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto-start-reverse">
          <path d="M1 1 6 4 1 7" fill="none" stroke="#a8b3c5" strokeWidth="1.4" />
        </marker>
      </defs>
      <g className="diagram-box">
        <rect x="4" y="34" width="162" height="72" rx="12" />
        <text x="85" y="65" textAnchor="middle">React + Monaco</text>
        <text className="diagram-subtext" x="85" y="86" textAnchor="middle">Browser editor</text>
      </g>
      <path className="diagram-arrow" d="M170 70h56" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
      <g className="diagram-box">
        <rect x="234" y="34" width="162" height="72" rx="12" />
        <text x="315" y="65" textAnchor="middle">Yjs</text>
        <text className="diagram-subtext" x="315" y="86" textAnchor="middle">Shared document</text>
      </g>
      <path className="diagram-arrow" d="M400 70h56" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
      <g className="diagram-box">
        <rect x="464" y="34" width="162" height="72" rx="12" />
        <text x="545" y="65" textAnchor="middle">Socket.io</text>
        <text className="diagram-subtext" x="545" y="86" textAnchor="middle">Realtime transport</text>
      </g>
      <path className="diagram-arrow" d="M630 70h56" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
      <g className="diagram-box">
        <rect x="694" y="34" width="102" height="72" rx="12" />
        <text x="745" y="65" textAnchor="middle">Node</text>
        <text className="diagram-subtext" x="745" y="86" textAnchor="middle">Express</text>
      </g>
    </svg>
  )
}

function LandingPage() {
  useEffect(() => {
    const items = document.querySelectorAll(".landing-page .reveal")
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"))
      return
    }

    document.documentElement.classList.add("reveal-enabled")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    items.forEach((item) => observer.observe(item))

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove("reveal-enabled")
    }
  }, [])

  return (
    <div className="landing-page">
      <header className="site-header">
        <div className="nav-shell">
          <Link className="brand" to="/" aria-label={`${APP_NAME} home`}>
            <span className="brand-mark" aria-hidden="true"><span>&lt;/&gt;</span></span>
            <span>{APP_NAME}</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          </nav>
          <Link className="button button-small nav-cta" to="/join">Start coding <span aria-hidden="true">→</span></Link>
          <details className="mobile-nav">
            <summary aria-label="Open navigation menu"><span>Menu</span><span className="menu-icon" aria-hidden="true">☰</span></summary>
            <nav aria-label="Mobile navigation">
              <a href="#features">Features</a>
              <a href="#how-it-works">How it works</a>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub ↗</a>
            </nav>
          </details>
        </div>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-copy reveal">
              <p className="eyebrow"><span className="eyebrow-dot" /> A shared space to build</p>
              <h1 id="hero-title">A better place to <span>code together.</span></h1>
              <p className="hero-description">
                Open a shared editor, bring your team, and see every change take shape in real time.
              </p>
              <div className="hero-actions">
                <Link className="button" to="/join">Start coding <span aria-hidden="true">→</span></Link>
                <a className="button button-secondary" href={GITHUB_URL} target="_blank" rel="noreferrer">
                  View on GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
              <p className="hero-note"><span aria-hidden="true">✦</span> No account flow. Just choose a name and join.</p>
            </div>
            <div className="hero-preview reveal">
              <ProductPreview />
              <p className="preview-caption"><span className="caption-pulse" /> A shared workspace, right in your browser</p>
            </div>
          </div>
          <a className="scroll-cue" href="#features"><span aria-hidden="true">↓</span> Explore</a>
        </section>

        <section className="section features-section" id="features" aria-labelledby="features-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Built for shared focus</p>
            <h2 id="features-title">Everything you need to <span>pair up.</span></h2>
            <p>A small, focused toolkit for writing code side by side.</p>
          </div>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <article className="feature-card reveal" key={feature.title} style={{ "--reveal-delay": `${index * 70}ms` }}>
                <div className="feature-icon-wrap"><Icon name={feature.icon} /></div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="feature-card-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section steps-section" id="how-it-works" aria-labelledby="steps-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Simple by design</p>
            <h2 id="steps-title">From hello to <span>in sync.</span></h2>
            <p>Get into the shared editor in three quick steps.</p>
          </div>
          <ol className="steps-grid">
            {steps.map((step, index) => (
              <li className="step-card reveal" key={step.title} style={{ "--reveal-delay": `${index * 90}ms` }}>
                <span className="step-number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section architecture-section" aria-labelledby="architecture-heading">
          <div className="architecture-copy reveal">
            <p className="eyebrow">Under the hood</p>
            <h2 id="architecture-heading">Small stack.<br /><span>Shared state.</span></h2>
            <p>
              React and Monaco power the editor UI. Yjs models shared edits, while Socket.io carries updates to the Node and Express server.
            </p>
            <p className="architecture-note">No database or code execution service is configured in this project.</p>
          </div>
          <div className="architecture-card reveal">
            <ArchitectureDiagram />
            <div className="architecture-legend" aria-hidden="true">
              <span><i className="legend-dot legend-ui" /> Editor</span>
              <span><i className="legend-dot legend-sync" /> Sync layer</span>
              <span><i className="legend-dot legend-server" /> Server</span>
            </div>
          </div>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Good to know</p>
            <h2 id="faq-title">A few quick <span>answers.</span></h2>
          </div>
          <div className="faq-list reveal">
            {faqs.map((faq) => (
              <details className="faq-item" key={faq.question}>
                <summary>{faq.question}<span aria-hidden="true" /></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final-cta-section" aria-labelledby="final-cta-title">
          <div className="final-cta-card reveal">
            <div>
              <p className="eyebrow">Your next idea starts here</p>
              <h2 id="final-cta-title">Ready to code together?</h2>
              <p>Choose a name, open the editor, and start building side by side.</p>
            </div>
            <Link className="button" to="/join">Start coding <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark" aria-hidden="true"><span>&lt;/&gt;</span></span>
            <span>{APP_NAME}</span>
          </Link>
          <p>Made for ideas best built together.</p>
          <div className="footer-meta">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <span>Built by {AUTHOR_NAME}</span>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {APP_NAME}</span><span>Build together, one line at a time.</span></div>
      </footer>
    </div>
  )
}

export default LandingPage
