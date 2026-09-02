import type { Project, ProjectLink } from "../../../types";

function ProjectLinkButton({ link }: { link: ProjectLink }) {
  return (
    <a
      className="certificate-view-btn"
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener" : undefined}
    >
      {link.label} {link.external && "↗"}
    </a>
  );
}

/** One project card in the `projects` section. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-terminal-card">
      <h3>
        {project.id} :: {project.name}
      </h3>

      <p>{project.description}</p>

      {project.screenshot && (
        <img
          src={`/${project.screenshot}`}
          alt={`${project.name} preview`}
          style={{
            width: "100%",
            maxWidth: 420,
            height: "auto",
            marginTop: 10,
            border: "1px solid var(--border)",
          }}
        />
      )}

      <div className="tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      {project.privateNote && (
        <div className="dim" style={{ marginTop: 10, fontSize: 9 }}>
          {project.privateNote}
        </div>
      )}

      {project.links && project.links.filter(link => link.href !== "#").length > 0 && (
        <div className="certificate-actions" style={{ marginTop: 10 }}>
          {project.links
            .filter((link) => link.href !== "#")
            .map((link) => (
              <ProjectLinkButton key={link.href} link={link} />
            ))}
        </div>
      )}
    </div>
  );
}