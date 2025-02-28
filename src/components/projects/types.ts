
export interface Project {
  id: string;
  name: string;
  description: string;
  type: "software" | "agent" | "game";
  status: "ready" | "in-progress" | "completed";
  progress?: number;
  eta?: Date;
  completedAt?: Date;
  outcome?: "success" | "failure" | "partial";
}

export const demoProjects: Project[] = [
  {
    id: "1",
    name: "Email Assistant",
    description: "An AI-powered email assistant that helps manage and respond to your emails efficiently",
    type: "agent",
    status: "in-progress",
    progress: 65,
    eta: new Date(Date.now() + 7 * 60 * 1000)
  },
  {
    id: "2",
    name: "Adventure Quest",
    description: "A classic RPG with immersive storytelling and strategic combat",
    type: "game",
    status: "ready"
  },
  {
    id: "3",
    name: "Data Analytics Tool for Excel",
    description: "Advanced data analysis and visualization tools integrated with Microsoft Excel",
    type: "software",
    status: "completed",
    completedAt: new Date(2025, 1, 15),
    outcome: "success"
  },
  {
    id: "4",
    name: "Smart Calendar",
    description: "AI-powered calendar that optimizes your schedule and suggests meeting times",
    type: "agent",
    status: "in-progress",
    progress: 30,
    eta: new Date(Date.now() + 14 * 60 * 1000)
  },
  {
    id: "5",
    name: "Virtual Reality Game",
    description: "Immersive VR experience with stunning graphics and innovative gameplay",
    type: "game",
    status: "in-progress",
    progress: 85,
    eta: new Date(Date.now() + 3 * 60 * 1000)
  },
  {
    id: "6",
    name: "Code Generator",
    description: "Advanced code generation tool powered by machine learning",
    type: "software",
    status: "completed",
    completedAt: new Date(2025, 2, 1),
    outcome: "success"
  },
  {
    id: "7",
    name: "Document Parser",
    description: "Intelligent document parsing and analysis system",
    type: "agent",
    status: "ready"
  },
  {
    id: "8",
    name: "Mobile Strategy Game",
    description: "Turn-based strategy game optimized for mobile devices",
    type: "game",
    status: "in-progress",
    progress: 45,
    eta: new Date(Date.now() + 10 * 60 * 1000)
  }
];
