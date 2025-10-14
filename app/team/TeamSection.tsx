"use client";
import { useState } from "react";
import styles from "./team.module.css";
import { TeamMember } from "./teamData";
import TeamCard from "./TeamCard";
import SearchBar from "./SearchBar";
import "./team.module.css";

interface TeamSectionProps {
  title: string;
  members: TeamMember[];
  showSearch?: boolean;
  cardSize?: "large" | "small";
}

const TeamSection = ({
  title,
  members,
  showSearch = false,
  cardSize = "large",
}: TeamSectionProps) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter((member) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      member.organization.toLowerCase().includes(query)
    );
  });

  const gridCols =
    cardSize === "large"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

  return (
    <section
      className={`py-16 px-4 ${styles.section}`}
      aria-labelledby={`${title.toLowerCase()}-heading`}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2
            id={`${title.toLowerCase()}-heading`}
            className="text-3xl md:text-4xl font-bold text-foreground mb-3 bungee-shade-regular"
          >
            {title}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {showSearch && (
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, role, or organization..."
          />
        )}

        {filteredMembers.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No team members found matching your search.
          </p>
        ) : (
          <div className={`grid ${gridCols} gap-6 justify-items-center`}>
            {filteredMembers.map((member) => (
              <TeamCard
                key={member.id}
                member={member}
                onOpenBio={setSelectedMember}
                size={cardSize}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
