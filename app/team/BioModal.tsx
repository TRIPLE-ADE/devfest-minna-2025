import { useEffect, useRef } from "react";
import { X, Twitter, Linkedin, Github } from "lucide-react";
import { TeamMember } from "./teamData";
import { Button } from "./button";

interface BioModalProps {
  member: TeamMember;
  isOpen: boolean;
  onClose: () => void;
}

const BioModal = ({ member, isOpen, onClose }: BioModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Trap focus in modal
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";

      // Handle ESC key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-card rounded-lg shadow-xl max-w-lg w-full animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <img
                src={member.imgUrl}
                alt=""
                className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/10"
                loading="lazy"
              />
              <div>
                <h2
                  id="modal-title"
                  className="text-2xl font-bold text-foreground"
                >
                  {member.name}
                </h2>
                <p className="text-primary font-medium">{member.role}</p>
                <p className="text-sm text-muted-foreground">
                  {member.organization}
                </p>
              </div>
            </div>
            <Button
              ref={closeButtonRef}
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close bio"
              className="shrink-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              About
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {member.bio}
            </p>
          </div>

          {member.socials && Object.keys(member.socials).length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Connect
              </h3>
              <div className="flex gap-3">
                {member.socials.twitter && (
                  <a
                    href={member.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                    aria-label={`${member.name} on Twitter`}
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.socials.github && (
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                    aria-label={`${member.name} on GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BioModal;
