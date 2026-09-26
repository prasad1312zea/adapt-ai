import { motion } from "framer-motion";
import {
  Code2,
  BrainCircuit,
  Database,
  Cpu,
  Zap,
  Radio,
  Cog,
  Building2,
  FlaskConical,
  HeartPulse,
  Bot,
  Car,
  Factory,
  Leaf,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const branches = [
  {
    id: "computer",
    name: "Computer Engineering",
    short: "CE",
    icon: Code2,
    description: "Software, systems & computing",
  },
  {
    id: "aiml",
    name: "AI & Machine Learning",
    short: "AI/ML",
    icon: BrainCircuit,
    description: "Intelligence, models & automation",
  },
  {
    id: "aids",
    name: "AI & Data Science",
    short: "AI&DS",
    icon: Database,
    description: "Data, analytics & intelligence",
  },
  {
    id: "it",
    name: "Information Technology",
    short: "IT",
    icon: Cpu,
    description: "Technology & information systems",
  },
  {
    id: "electrical",
    name: "Electrical Engineering",
    short: "EE",
    icon: Zap,
    description: "Power, circuits & control",
  },
  {
    id: "entc",
    name: "E&TC Engineering",
    short: "E&TC",
    icon: Radio,
    description: "Electronics & communication",
  },
  {
    id: "mechanical",
    name: "Mechanical Engineering",
    short: "ME",
    icon: Cog,
    description: "Machines, design & manufacturing",
  },
  {
    id: "civil",
    name: "Civil Engineering",
    short: "CE",
    icon: Building2,
    description: "Structures, construction & infrastructure",
  },
  {
    id: "chemical",
    name: "Chemical Engineering",
    short: "CHE",
    icon: FlaskConical,
    description: "Processes, materials & chemistry",
  },
  {
    id: "biomedical",
    name: "Biomedical Engineering",
    short: "BME",
    icon: HeartPulse,
    description: "Engineering meets healthcare",
  },
  {
    id: "robotics",
    name: "Robotics & Automation",
    short: "RA",
    icon: Bot,
    description: "Robots, control & automation",
  },
  {
    id: "automobile",
    name: "Automobile Engineering",
    short: "AUTO",
    icon: Car,
    description: "Vehicles, mobility & systems",
  },
  {
    id: "production",
    name: "Production Engineering",
    short: "PE",
    icon: Factory,
    description: "Manufacturing & production systems",
  },
  {
    id: "environmental",
    name: "Environmental Engineering",
    short: "ENV",
    icon: Leaf,
    description: "Environment, sustainability & resources",
  },
];

function ProfileSetup({ onContinue }) {
  return (
    <div className="profile-page">
      <div className="profile-glow glow-one" />
      <div className="profile-glow glow-two" />

      <motion.div
        className="profile-container"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="profile-header">
          <div className="profile-brand">
            <div className="profile-brand-icon">
              <Sparkles size={18} />
            </div>
            <span>
              ADAPT<span>.AI</span>
            </span>
          </div>

          <div className="profile-progress">
            <span className="active">01</span>
            <div className="progress-line" />
            <span>02</span>
            <div className="progress-line" />
            <span>03</span>
          </div>
        </div>

        {/* Heading */}
        <div className="profile-heading">
          <p className="profile-eyebrow">
            <Sparkles size={14} />
            BUILD YOUR LEARNING PROFILE
          </p>

          <h1>
            First, tell us
            <br />
            <span>where you learn.</span>
          </h1>

          <p>
            Your branch determines your subjects, concepts and the knowledge
            graph we'll build around you.
          </p>
        </div>

        {/* Branches */}
        <div className="branch-section">
          <div className="section-label">
            <span>SELECT YOUR ENGINEERING BRANCH</span>
            <span className="branch-count">{branches.length} branches</span>
          </div>

          <div className="branch-grid">
            {branches.map((branch, index) => {
              const Icon = branch.icon;

              return (
                <motion.button
                  key={branch.id}
                  className="branch-card"
                  onClick={() => onContinue(branch)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.035,
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.015,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="branch-icon">
                    <Icon size={22} />
                  </div>

                  <div className="branch-info">
                    <h3>{branch.name}</h3>
                    <p>{branch.description}</p>
                  </div>

                  <ArrowRight
                    className="branch-arrow"
                    size={18}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>

        <p className="profile-footer">
          You can change your learning profile later.
        </p>
      </motion.div>
    </div>
  );
}

export default ProfileSetup;