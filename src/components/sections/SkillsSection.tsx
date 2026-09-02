import { skillGroups } from "../../data/skills";
import { SkillTree } from "./shared/SkillTree";

export default function SkillsSection() {
  return <SkillTree groups={skillGroups} />;
}