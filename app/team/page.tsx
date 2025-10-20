import TeamHero from "./TeamHero";
import TeamSection from "./TeamSection";
import { organizers, volunteers } from "./teamData";
import "./team.module.css";

const Index = () => {
  return (
    <div className="min-h-screen">
      <TeamHero />
      <main>
        <TeamSection title="Organizers" subtitle="Meet the core team behind DevFest Minna 2025." members={organizers} cardSize="large" />
        <TeamSection
          title="Volunteers"
          subtitle="These amazing volunteers help make DevFest possible."
          members={volunteers}
          showSearch
          cardSize="small"
        />
      </main>
    </div>
  );
};

export default Index;
