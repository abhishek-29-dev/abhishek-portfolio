const app = document.getElementById("app");
const bootScreen = document.getElementById("bootScreen");
const terminalOutput = document.getElementById("terminalOutput");
const terminalForm = document.getElementById("terminalForm");
const commandInput = document.getElementById("commandInput");
const commandButtons = document.querySelectorAll(".command-btn");

const email = "aj29abhishek@gmail.com";
const linkedin = "https://www.linkedin.com/in/abhishek-j-dev";
const github = "https://github.com/abhishek-29-dev";
const phone = "+91 95137 87521";

const commands = {
  help: showHelp,
  home: showHome,
  about: showAbout,
  skills: showSkills,
  projects: showProjects,
  experience: showExperience,
  certificate: showCertificate,
  "cat certificate.pdf": showCertificate,
  resume: showResume,
  "./download_resume": showResume,
  contact: showContact,
  clear: clearTerminal,
  whoami: showAbout,
  ls: showProjects,
  "cat about.txt": showAbout,
  "cat experience.log": showExperience,
  "ls skills/": showSkills,
  "ls projects/": showProjects,
  "./contact": showContact,
  "./home": showHome
};

let commandHistory = [];
let historyIndex = -1;

let bootFinished = false;

function finishBoot() {
  if (bootFinished) {
    return;
  }

  bootFinished = true;

  bootScreen.classList.add("hidden");

  console.log("[SYSTEM] Boot screen completed");
  console.log("[SYSTEM] Portfolio ready");

  commandInput.focus();
  showHome();
}

function skipBoot() {
  if (bootFinished) {
    return;
  }

  console.log("[SYSTEM] Boot skipped by user");
  finishBoot();
}

window.addEventListener("load", () => {
  app.classList.add("ready");

  console.log("[SYSTEM] Portfolio loading...");

  setTimeout(finishBoot, 3000);
});

window.addEventListener("keydown", skipBoot, { once: true });
bootScreen.addEventListener("click", skipBoot, { once: true });

function addOutput(command, content) {
  const block = document.createElement("div");

  block.className = "output-block";

  block.innerHTML = `
    <div class="output-command">
      <span class="user">
        abhishek@dev
      </span>

      <span class="path">
        :~$
      </span>

      ${escapeHTML(command)}
    </div>

    <div class="output-content">
      ${content}
    </div>
  `;

  terminalOutput.appendChild(block);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function clearTerminal() {
  console.log("[COMMAND] clear");
  terminalOutput.innerHTML = "";
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function runCommand(command) {
  const cleanCommand = command.trim().toLowerCase();

  if (!cleanCommand) {
    return;
  }

  console.log(`[COMMAND] ${cleanCommand}`);

  commandHistory.push(command.trim());
  historyIndex = commandHistory.length;

  if (commands[cleanCommand]) {
    commands[cleanCommand]();
  } else {
    console.log(`[ERROR] Command not found: ${cleanCommand}`);

    addOutput(
      command,
      `
        <span class="yellow">
          command not found:
        </span>

        ${escapeHTML(cleanCommand)}

        <br>

        <span class="dim">
          Type
          <span class="cyan">
            help
          </span>
          to see available commands.
        </span>
      `
    );
  }
}

function setActiveButton(name) {
  commandButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.command === name
    );
  });
}

function showHome() {
  console.log("[NAV] Opening Home");

  setActiveButton("home");

  addOutput(
    "./home",
    `
      <div class="big">
        Hello, I'm Abhishek.
      </div>

      <div style="margin-top:16px">
        <span class="green">
          BCA Graduate
        </span>

        ·

        <span class="cyan">
          Frontend Developer
        </span>

        ·

        <span class="yellow">
          WordPress Developer
        </span>
      </div>

      <div style="margin-top:18px" class="dim">
        I build responsive websites,
        e-commerce experiences and
        React-based user interfaces.
      </div>

      <div style="margin-top:24px" class="ascii">
 █████╗ ██████╗ ██╗  ██╗██╗███████╗██╗  ██╗███████╗██╗  ██╗
██╔══██╗██╔══██╗██║  ██║██║██╔════╝██║  ██║██╔════╝██║ ██╔╝
███████║██████╔╝███████║██║███████╗███████║█████╗  █████╔╝
██╔══██║██╔══██╗██╔══██║██║╚════██║██╔══██║██╔══╝  ██╔═██╗
██║  ██║██████╔╝██║  ██║██║███████║██║  ██║███████╗██║  ██╗
╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
      </div>

      <div style="margin-top:22px">
        <span class="dim">
          Try:
        </span>

        <span class="cyan">
          about
        </span>,

        <span class="cyan">
          skills
        </span>,

        <span class="cyan">
          projects
        </span>,

        <span class="cyan">
          experience
        </span>,

        <span class="cyan">
          certificate
        </span>,

        <span class="cyan">
          resume
        </span>,

        <span class="cyan">
          contact
        </span>
      </div>
    `
  );
}

function showAbout() {
  console.log("[NAV] Opening About");

  setActiveButton("about");

  addOutput(
    "cat about.txt",
    `
      <div class="heading">
        ABOUT.TXT
      </div>

      <div style="margin-top:15px">
        <span class="green">
          name
        </span>
        = "Abhishek J"
      </div>

      <div>
        <span class="green">
          role
        </span>
        = "Frontend Developer"
      </div>

      <div>
        <span class="green">
          education
        </span>
        = "Bachelor of Computer Applications"
      </div>

      <div>
        <span class="green">
          university
        </span>
        = "PES University"
      </div>

      <div>
        <span class="green">
          focus
        </span>
        = "Web Development / UI / WordPress"
      </div>

      <br>

      <div class="dim">
        I'm a BCA graduate interested in
        building practical, responsive and
        user-friendly web experiences.

        <br><br>

        During my internship at Ratxen Solutions,
        I worked on Nexa Styles and production
        WordPress websites.

        <br><br>

        I've also been building out a set of
        React projects — a recipe search app,
        an expense tracker — to go deeper on
        component architecture, state, and
        TypeScript. See
        <span class="cyan">projects</span>
        for links.
      </div>

      <br>

      <div>
        <span class="cyan">
          currently
        </span>
        = "open to full-time frontend opportunities"
      </div>
    `
  );
}

function showSkills() {
  console.log("[NAV] Opening Skills");

  setActiveButton("skills");

  addOutput(
    "ls skills/",
    `
      <div class="tree">

        <div class="line">
          ├──
          <span class="folder">
            frontend/
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;├──
          <span class="file">
            HTML5
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;├──
          <span class="file">
            CSS3
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;├──
          <span class="file">
            JavaScript
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;├──
          <span class="file">
            TypeScript
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;├──
          <span class="file">
            React
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;├──
          <span class="file">
            React Router
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;└──
          <span class="file">
            Tailwind CSS
          </span>
        </div>

        <div class="line">
          ├──
          <span class="folder">
            cms/
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;├──
          <span class="file">
            WordPress
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;├──
          <span class="file">
            Custom CSS
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;└──
          <span class="file">
            Plugin Development
          </span>
        </div>

        <div class="line">
          ├──
          <span class="folder">
            tools/
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;├──
          <span class="file">
            Git
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;├──
          <span class="file">
            GitHub
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;├──
          <span class="file">
            VS Code
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;├──
          <span class="file">
            Vite
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;└──
          <span class="file">
            Vercel
          </span>
        </div>

        <div class="line">
          └──
          <span class="folder">
            other/
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;├──
          <span class="file">
            REST API Integration
          </span>
        </div>

        <div class="line">
          &nbsp;&nbsp;└──
          <span class="file">
            Recharts
          </span>
        </div>

      </div>
    `
  );
}

function showProjects() {
  console.log("[NAV] Opening Projects");

  setActiveButton("projects");

  addOutput(
    "ls projects/",
    `
      <div class="project-terminal-card">
        <h3>
          01 :: nexa-styles/
        </h3>

        <p>
          E-commerce platform developed
          during my internship at Ratxen Solutions.

          Built a single checkout flow integrating
          payment gateway, subscription billing and
          shipping API modules.
        </p>

        <div class="tags">
          <span>WordPress</span>
          <span>Payment API</span>
          <span>Subscription</span>
          <span>Shipping API</span>
        </div>

        <div class="dim" style="margin-top:10px;font-size:9px">
          client project — private repo, no public link
        </div>
      </div>

      <div class="project-terminal-card">
        <h3>
          02 :: recipe-finder/
        </h3>

        <p>
          Recipe search app built with React,
          hitting a live public API. Debounced
          search, a responsive card grid, a
          detail modal with full ingredients and
          instructions, and a favorites system
          using React state.
        </p>

        <div class="tags">
          <span>React</span>
          <span>JavaScript</span>
          <span>Tailwind CSS</span>
          <span>REST API</span>
        </div>

        <div class="certificate-actions" style="margin-top:10px">
          <a
            class="certificate-view-btn"
            href="https://recipe-finder-abhi-64da.vercel.app"
            target="_blank"
            rel="noopener"
          >
            live demo ↗
          </a>

          <a
            class="certificate-view-btn"
            href="https://github.com/abhishek-29-dev/recipe-finder"
            target="_blank"
            rel="noopener"
          >
            view code ↗
          </a>
        </div>
      </div>

      <div class="project-terminal-card">
        <h3>
          03 :: expense-tracker/
        </h3>

        <p>
          Expense tracker built with React and
          TypeScript — typed Expense and Category
          interfaces throughout, no "any". Category
          spending chart with Recharts, plus
          date-range and category filtering with a
          live-updating total.
        </p>

        <div class="tags">
          <span>React</span>
          <span>TypeScript</span>
          <span>Recharts</span>
          <span>Tailwind CSS</span>
        </div>

        <div class="certificate-actions" style="margin-top:10px">
          <a
            class="certificate-view-btn"
            href="https://expense-tracker-eta-two-93.vercel.app"
            target="_blank"
            rel="noopener"
          >
            live demo ↗
          </a>

          <a
            class="certificate-view-btn"
            href="https://github.com/abhishek-29-dev/expense-tracker"
            target="_blank"
            rel="noopener"
          >
            view code ↗
          </a>
        </div>
      </div>

      <div class="project-terminal-card">
        <h3>
          04 :: mva-trust &amp; ncpl/
        </h3>

        <p>
          Two live production WordPress sites
          maintained end to end during the
          internship — theme customization, plugin
          work and load-time optimization, with
          100% uptime across the engagement.
        </p>

        <div class="tags">
          <span>WordPress</span>
          <span>Theme Dev</span>
          <span>Performance</span>
        </div>

        <div class="certificate-actions" style="margin-top:10px">
          <a
            class="certificate-view-btn"
            href="https://mvatrust.com"
            target="_blank"
            rel="noopener"
          >
            mvatrust.com ↗
          </a>

          <a
            class="certificate-view-btn"
            href="https://ncpl.net.in"
            target="_blank"
            rel="noopener"
          >
            ncpl.net.in ↗
          </a>
        </div>
      </div>

      <div class="project-terminal-card">
        <h3>
          05 :: portfolio/
        </h3>

        <p>
          Personal developer portfolio built
          from scratch with semantic HTML,
          CSS and JavaScript.

          Designed as an interactive
          terminal interface with command
          history, autocomplete and keyboard
          navigation.
        </p>

        <div class="tags">
          <span>HTML</span>
          <span>CSS</span>
          <span>JavaScript</span>
          <span>Responsive UI</span>
        </div>

        <div class="certificate-actions" style="margin-top:10px">
          <a
            class="certificate-view-btn"
            href="https://github.com/abhishek-29-dev"
            target="_blank"
            rel="noopener"
          >
            view on github ↗
          </a>
        </div>
      </div>

      <div class="dim">
        5 projects displayed.
      </div>
    `
  );
}

function showExperience() {
  console.log("[NAV] Opening Experience");

  setActiveButton("experience");

  addOutput(
    "cat experience.log",
    `
      <div class="heading">
        EXPERIENCE.LOG
      </div>

      <div style="margin-top:18px">
        <span class="green">
          [2026.02 — 2026.05]
        </span>

        <span class="cyan">
          Ratxen Solutions
        </span>
      </div>

      <div style="margin-top:7px">
        Full Stack & WordPress
        Development Intern
      </div>

      <div class="dim" style="margin-top:8px">
        Built Nexa Styles, contributed
        to production WordPress websites
        and worked with payment,
        subscription and shipping
        integrations.
      </div>

      <br>

      <div>
        <span class="green">
          [2023 — 2026]
        </span>

        <span class="cyan">
          PES University
        </span>
      </div>

      <div style="margin-top:7px">
        Bachelor of Computer Applications
      </div>

      <div class="dim" style="margin-top:8px">
        Focused on computer applications,
        web development and practical
        software projects.
      </div>
    `
  );
}

function showCertificate() {
  console.log("[NAV] Opening Internship Certificate");

  setActiveButton("certificate");

  addOutput(
    "cat certificate.pdf",
    `
      <div class="heading">
        INTERNSHIP_CERTIFICATE.PDF
      </div>

      <div class="certificate-terminal-card">

        <div class="certificate-status">
          <span class="green">●</span>
          <span>FILE FOUND</span>
          <span class="dim">
            /certificates/internship-certificate.pdf
          </span>
        </div>

        <h3>
          Ratxen Solutions Private Limited
        </h3>

        <div class="certificate-meta">

          <div>
            <span class="green">type</span>
            = "Internship Completion Certificate"
          </div>

          <div>
            <span class="green">intern</span>
            = "Abhishek J"
          </div>

          <div>
            <span class="green">duration</span>
            = "19 Feb 2026 → 20 May 2026 (90 Days)"
          </div>

          <div>
            <span class="green">role</span>
            = "Full Stack Development & Digital Marketing"
          </div>

          <div>
            <span class="green">rating</span>
            = "Excellent · 6.0 / 6.0"
          </div>

        </div>

        <div class="certificate-actions">

          <a
            class="certificate-view-btn"
            href="Abhishek_J_Internship_Certificate.pdf"
            target="_blank"
            rel="noopener"
          >
            ./view_certificate
          </a>

          <a
            class="certificate-download-btn"
            href="Abhishek_J_Internship_Certificate.pdf"
            download
          >
            ./download_certificate
          </a>

        </div>

      </div>

      <div class="dim">
        PDF viewer will open in a new tab.
      </div>
    `
  );
}

function showResume() {
  console.log("[NAV] Opening Resume");

  setActiveButton("resume");

  addOutput(
    "./download_resume",
    `
      <div class="heading">
        RESUME.PDF
      </div>

      <div class="certificate-terminal-card">

        <div class="certificate-status">
          <span class="green">●</span>
          <span>FILE FOUND</span>
          <span class="dim">
            /resume/Abhishek_J_Resume.pdf
          </span>
        </div>

        <h3>
          Abhishek J — Frontend Developer
        </h3>

        <div class="certificate-meta">

          <div>
            <span class="green">type</span>
            = "Resume / CV"
          </div>

          <div>
            <span class="green">updated</span>
            = "2026"
          </div>

        </div>

        <div class="certificate-actions">

          <a
            class="certificate-view-btn"
            href="Abhishek_J_Resume.pdf"
            target="_blank"
            rel="noopener"
          >
            ./view_resume
          </a>

          <a
            class="certificate-download-btn"
            href="Abhishek_J_Resume.pdf"
            download
          >
            ./download_resume
          </a>

        </div>

      </div>

      <div class="dim">
        PDF viewer will open in a new tab.
      </div>
    `
  );
}

function showContact() {
  console.log("[NAV] Opening Contact");

  setActiveButton("contact");

  addOutput(
    "./contact",
    `
      <div class="heading">
        CONTACT
      </div>

      <div style="margin-top:18px">

        <span class="green">
          email
        </span>

        →

        <a
          class="cyan"
          href="mailto:${email}"
        >
          ${email}
        </a>

      </div>

      <div>

        <span class="green">
          linkedin
        </span>

        →

        <a
          class="cyan"
          href="${linkedin}"
          target="_blank"
          rel="noopener"
        >
          linkedin.com/in/abhishek-j-dev
        </a>

      </div>

      <div>

        <span class="green">
          github
        </span>

        →

        <a
          class="cyan"
          href="${github}"
          target="_blank"
          rel="noopener"
        >
          github.com/abhishek-29-dev
        </a>

      </div>

      <div>

        <span class="green">
          phone
        </span>

        →

        <a
          class="cyan"
          href="tel:${phone.replaceAll(" ", "")}"
        >
          ${phone}
        </a>

      </div>

      <div>

        <span class="green">
          resume
        </span>

        →

        <a
          class="cyan"
          href="Abhishek_J_Resume.pdf"
          download
        >
          download PDF
        </a>

      </div>

      <br>

      <div class="dim">
        ./send_message
        <br>

        Status:
        <span class="green">
          READY
        </span>
      </div>
    `
  );
}

function showHelp() {
  console.log("[COMMAND] help");

  addOutput(
    "help",
    `
      <div class="heading">
        AVAILABLE COMMANDS
      </div>

      <div style="margin-top:15px">

        <div>
          <span class="cyan">
            help
          </span>
          — show this list
        </div>

        <div>
          <span class="cyan">
            home
          </span>
          — return to homepage
        </div>

        <div>
          <span class="cyan">
            about
          </span>
          — about me
        </div>

        <div>
          <span class="cyan">
            skills
          </span>
          — list technical skills
        </div>

        <div>
          <span class="cyan">
            projects
          </span>
          — view projects
        </div>

        <div>
          <span class="cyan">
            experience
          </span>
          — view experience
        </div>

        <div>
          <span class="cyan">
            certificate
          </span>
          — view internship certificate
        </div>

        <div>
          <span class="cyan">
            resume
          </span>
          — view / download resume
        </div>

        <div>
          <span class="cyan">
            contact
          </span>
          — contact information
        </div>

        <div>
          <span class="cyan">
            clear
          </span>
          — clear terminal
        </div>

      </div>

      <br>

      <div class="dim">
        aliases:
        whoami · ls · cat about.txt ·
        ls skills/ · ls projects/ ·
        cat experience.log · cat certificate.pdf ·
        ./download_resume · ./contact
      </div>
    `
  );
}

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = commandInput.value;

  if (!value.trim()) {
    commandInput.focus();
    return;
  }

  console.log("[INPUT] User entered:", value);

  runCommand(value);

  commandInput.value = "";
  commandInput.focus();
});

commandInput.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    event.preventDefault();

    if (historyIndex > 0) {
      historyIndex--;

      commandInput.value =
        commandHistory[historyIndex];

      console.log(
        "[HISTORY] Previous command:",
        commandHistory[historyIndex]
      );
    }
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();

    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;

      commandInput.value =
        commandHistory[historyIndex];

      console.log(
        "[HISTORY] Next command:",
        commandHistory[historyIndex]
      );
    } else {
      historyIndex = commandHistory.length;
      commandInput.value = "";

      console.log("[HISTORY] End of command history");
    }
  }

  if (event.key === "Tab") {
    event.preventDefault();

    const value = commandInput.value.toLowerCase();

    const matches = Object.keys(commands).filter(
      (command) => command.startsWith(value)
    );

    if (matches.length === 1) {
      commandInput.value = matches[0];

      console.log(
        "[AUTOCOMPLETE] Completed:",
        matches[0]
      );
    }
  }
});

commandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const command = button.dataset.command;

    console.log("[BUTTON CLICKED]", command);

    if (commands[command]) {
      commands[command]();
    } else {
      console.log(
        "[ERROR] No command found for button:",
        command
      );
    }

    commandInput.focus();
  });
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "/" &&
    document.activeElement !== commandInput
  ) {
    event.preventDefault();

    console.log(
      "[KEYBOARD] / pressed - focusing terminal"
    );

    commandInput.focus();
  }
});

setTimeout(() => {
  if (!app.classList.contains("ready")) {
    console.log("[SYSTEM] Fallback boot triggered");

    app.classList.add("ready");
    finishBoot();
  }
}, 4000);
