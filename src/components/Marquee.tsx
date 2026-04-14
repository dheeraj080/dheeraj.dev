export default function Marquee() {
  const skills = [
    "Systems Thinking",
    "Java",
    "Spring Boot",
    "React",
    "TypeScript",
    "Microservices",
    "Kafka",
    "PostgreSQL",
    "Redis",
    "System Architecture",
    "Tailwind CSS",
    "API Development",
    "Event-Driven Design",
    "Cloud Infrastructure"
  ];

  // Duplicate the array to ensure seamless looping
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div className="marquee-wrap border-y border-border py-3.5 overflow-hidden whitespace-nowrap" aria-hidden="true">
      <div className="marquee-track inline-flex animate-mq">
        {duplicatedSkills.map((skill, index) => (
          <span 
            key={index} 
            className="mq-item font-heading text-[11px] font-semibold tracking-[0.12em] uppercase text-muted px-7 inline-flex items-center gap-14 after:content-['✦'] after:text-[7px]"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
