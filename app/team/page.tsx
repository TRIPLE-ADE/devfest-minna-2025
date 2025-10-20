import TeamHero from "./TeamHero";
import TeamSection from "./TeamSection";
import { organizers, volunteers } from "./teamData";
import "./team.module.css";

const Index = () => {
  return (
    <div className="min-h-screen">
      <TeamHero />
      <main>
        <TeamSection title="Organizers" members={organizers} cardSize="large" />
        <div className="border-t border-border"></div>
        <TeamSection
          title="Volunteers"
          members={volunteers}
          showSearch
          cardSize="small"
        />
      </main>
    </div>
  );
};

export default Index;
