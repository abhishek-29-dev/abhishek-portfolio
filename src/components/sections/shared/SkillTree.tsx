import type { SkillGroup } from "../../../types";

/**
 * Renders the skills directory tree from grouped data.
 * The last group and last item in each group use └── instead of ├──.
 */
export function SkillTree({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="tree">
      {groups.map((group, groupIndex) => {
        const isLastGroup = groupIndex === groups.length - 1;

        return (
          <div key={group.name}>
            <div className="line">
              {isLastGroup ? "└──" : "├──"}{" "}
              <span className="folder">{group.name}</span>
            </div>

            {group.items.map((item, itemIndex) => {
              const isLastItem = itemIndex === group.items.length - 1;

              return (
                <div className="line" key={item}>
                  &nbsp;&nbsp;{isLastItem ? "└──" : "├──"}{" "}
                  <span className="file">{item}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}