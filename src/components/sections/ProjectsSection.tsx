import { projects } from "../../data/projects";
import { ProjectCard } from "./shared/ProjectCard";

export default function ProjectsSection() {
  return (
    <>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      <div className="dim">{projects.length} projects displayed.</div>
    </>
  );
}