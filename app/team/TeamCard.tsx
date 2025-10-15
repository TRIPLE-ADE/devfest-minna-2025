"use client";
import React from "react";
import { TeamMember } from "./teamData";
import styles from "./team.module.css";

interface TeamCardProps {
  member: TeamMember;
  onOpenBio: (member: TeamMember) => void;
  size?: "large" | "small";
}

const TeamCard = ({ member, onOpenBio, size = "large" }: TeamCardProps) => {
  const cardSize = size === "large" ? "w-64" : "w-56";
  const imgSize = size === "large" ? "w-32 h-32" : "w-24 h-24";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenBio(member);
    }
  };

  return (
    <div
      className={`${cardSize} bg-card rounded-lg p-6 shadow-card transition-all duration-300 cursor-pointer ${styles.card} ${styles.cardHover}`}
      onClick={() => onOpenBio(member)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View ${member.name}'s bio`}
    >
      <div className="flex flex-col items-center text-center">
        <img
          src={member.imgUrl}
          alt=""
          className={`${imgSize} rounded-full object-cover mb-4 ring-4 ring-black`}
          loading="lazy"
        />
        <h3 className="text-lg font-bold text-foreground mb-1">
          {member.name}
        </h3>
        <p className="text-sm font-medium text-primary mb-1">{member.role}</p>
        <p className="text-xs text-muted-foreground mb-4">
          {member.organization}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
