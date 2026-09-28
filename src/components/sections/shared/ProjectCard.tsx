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
  // "#" is a placeholder for a link that isn't public, so hide those buttons.
  const links = project.links?.filter((link) => link.href !== "#") ?? [];

  return (
    <div className="project-terminal-card">
      <h3>
        {project.id} :: {project.name}
      </h3>

      <p>{project.description}</p>

      <div className="tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      {project.privateNote && (
        <div className="dim project-note">{project.privateNote}</div>
      )}

      {links.length > 0 && (
        <div className="certificate-actions project-links">
          {links.map((link) => (
            <ProjectLinkButton key={link.href} link={link} />
          ))}
        </div>
      )}
    </div>
  );
}
