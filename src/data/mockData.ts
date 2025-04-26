
import { ProjectStatus } from "../types";

export const projects = [
  {
    id: "1",
    title: "Modern Villa Residence",
    client: "John & Sarah Doe",
    location: { lat: -6.175, lng: 106.827, address: "Jakarta, Indonesia" },
    status: "IN_PROGRESS" as ProjectStatus,
    progress: 65,
    description:
      "A luxury 4-bedroom villa featuring open concept design with high ceilings and large windows for natural lighting.",
    startDate: "2024-03-15",
    endDate: "2025-01-20",
    team: [
      { id: "101", name: "Ahmad Hasan", role: "Lead Architect" },
      { id: "102", name: "Dewi Susanto", role: "Interior Designer" },
      { id: "103", name: "Budi Pratama", role: "Structural Engineer" },
      { id: "104", name: "Anita Wijaya", role: "Site Supervisor" },
    ],
  },
  {
    id: "2",
    title: "Apartment Renovation",
    client: "Michael Chen",
    location: { lat: -6.190, lng: 106.800, address: "Jakarta, Indonesia" },
    status: "PLANNING" as ProjectStatus,
    progress: 25,
    description:
      "Complete interior renovation of a 120m² apartment to maximize space efficiency and modernize all fixtures.",
    startDate: "2024-04-05",
    endDate: "2024-08-15",
    team: [
      { id: "105", name: "Ratna Sari", role: "Interior Designer" },
      { id: "106", name: "Joko Santoso", role: "Project Manager" },
    ],
  },
  {
    id: "3",
    title: "Traditional Java House",
    client: "Bambang & Rina Wijaya",
    location: { lat: -7.797, lng: 110.370, address: "Yogyakarta, Indonesia" },
    status: "COMPLETED" as ProjectStatus,
    progress: 100,
    description:
      "Modern interpretation of a traditional Javanese home with authentic architectural elements and modern amenities.",
    startDate: "2023-09-10",
    endDate: "2024-03-22",
    team: [
      { id: "107", name: "Hendra Gunawan", role: "Cultural Consultant" },
      { id: "108", name: "Siti Nurul", role: "Lead Architect" },
      { id: "109", name: "Raden Putra", role: "Craftsman" },
    ],
  },
  {
    id: "4",
    title: "Beachfront Bali Villa",
    client: "William & Emma Johnson",
    location: { lat: -8.409, lng: 115.189, address: "Bali, Indonesia" },
    status: "IN_PROGRESS" as ProjectStatus,
    progress: 40,
    description:
      "Luxury beachfront villa with 5 bedrooms, infinity pool, and traditional Balinese design elements.",
    startDate: "2024-02-20",
    endDate: "2024-12-10",
    team: [
      { id: "110", name: "Made Sudarsana", role: "Local Architect" },
      { id: "111", name: "Nyoman Adnyana", role: "Landscape Designer" },
      { id: "112", name: "Putu Wirawan", role: "Site Manager" },
    ],
  },
  {
    id: "5",
    title: "Green Office Building",
    client: "EcoTech Solutions",
    location: { lat: -6.225, lng: 106.830, address: "Jakarta, Indonesia" },
    status: "PLANNING" as ProjectStatus,
    progress: 15,
    description:
      "Sustainable 6-story office building with solar panels, rainwater harvesting, and energy-efficient design.",
    startDate: "2024-05-15",
    endDate: "2025-08-30",
    team: [
      { id: "113", name: "Dr. Eko Prasetyo", role: "Sustainability Expert" },
      { id: "114", name: "Lina Gunawan", role: "Lead Architect" },
      { id: "115", name: "Irfan Hidayat", role: "Structural Engineer" },
    ],
  },
  {
    id: "6",
    title: "Urban Micro Apartments",
    client: "Jakarta Living Co.",
    location: { lat: -6.195, lng: 106.820, address: "Jakarta, Indonesia" },
    status: "IN_PROGRESS" as ProjectStatus,
    progress: 55,
    description:
      "Development of 50 modern micro-apartments designed for young professionals in the heart of Jakarta.",
    startDate: "2024-01-10",
    endDate: "2024-11-15",
    team: [
      { id: "116", name: "Agus Santoso", role: "Project Director" },
      { id: "117", name: "Maria Hapsari", role: "Interior Designer" },
      { id: "118", name: "Dimas Surya", role: "Urban Planner" },
    ],
  },
];

export const tasks = [
  {
    id: "t1",
    projectId: "1",
    title: "Foundation planning",
    description: "Complete the foundation design and get approvals",
    assignee: { id: "103", name: "Budi Pratama", role: "Structural Engineer" },
    status: "DONE",
    dueDate: "2024-04-10",
  },
  {
    id: "t2",
    projectId: "1",
    title: "Interior design concept",
    description: "Create mood boards and initial concept designs",
    assignee: { id: "102", name: "Dewi Susanto", role: "Interior Designer" },
    status: "IN_PROGRESS",
    dueDate: "2024-05-15",
  },
  {
    id: "t3",
    projectId: "1",
    title: "Electrical planning",
    description: "Design electrical layout and requirements",
    assignee: { id: "103", name: "Budi Pratama", role: "Structural Engineer" },
    status: "TO_DO",
    dueDate: "2024-05-30",
  },
  {
    id: "t4",
    projectId: "1",
    title: "Weekly site inspection",
    description: "Conduct weekly progress check and documentation",
    assignee: { id: "104", name: "Anita Wijaya", role: "Site Supervisor" },
    status: "IN_PROGRESS",
    dueDate: "2024-04-30",
  },
  {
    id: "t5",
    projectId: "2",
    title: "Demolition planning",
    description: "Plan the demolition phase and safety procedures",
    assignee: { id: "106", name: "Joko Santoso", role: "Project Manager" },
    status: "IN_PROGRESS",
    dueDate: "2024-04-25",
  },
  {
    id: "t6",
    projectId: "2",
    title: "Material selection",
    description: "Select and order materials for bathroom renovation",
    assignee: { id: "105", name: "Ratna Sari", role: "Interior Designer" },
    status: "TO_DO",
    dueDate: "2024-05-10",
  },
];

export const discussions = [
  {
    id: "d1",
    projectId: "1",
    author: { id: "101", name: "Ahmad Hasan", role: "Lead Architect" },
    content:
      "I've uploaded the revised floor plans. Please check the updated ceiling heights in the living room area.",
    timestamp: "2024-04-15T09:30:00",
    replies: [
      {
        id: "r1",
        author: { id: "103", name: "Budi Pratama", role: "Structural Engineer" },
        content:
          "The new ceiling height looks good. We need to adjust the beam placement slightly.",
        timestamp: "2024-04-15T10:45:00",
      },
      {
        id: "r2",
        author: { id: "102", name: "Dewi Susanto", role: "Interior Designer" },
        content:
          "This works well with the lighting plan I'm developing. Will share by tomorrow.",
        timestamp: "2024-04-15T14:20:00",
      },
    ],
  },
  {
    id: "d2",
    projectId: "1",
    author: { id: "104", name: "Anita Wijaya", role: "Site Supervisor" },
    content:
      "We're experiencing some delays with the concrete delivery. Might push our schedule by 2-3 days. Will keep everyone updated.",
    timestamp: "2024-04-18T11:15:00",
    replies: [
      {
        id: "r3",
        author: { id: "101", name: "Ahmad Hasan", role: "Lead Architect" },
        content:
          "Thanks for the heads up. Let's discuss contingency plans in our meeting tomorrow.",
        timestamp: "2024-04-18T11:30:00",
      },
    ],
  },
];
