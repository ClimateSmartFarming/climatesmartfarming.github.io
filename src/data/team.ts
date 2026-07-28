export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  photo?: string;
  email?: string;
  phone?: string;
  bio?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'allison-chatrchyan',
    name: 'Dr. Allison Chatrchyan',
    role: 'Climate Adaptation & Mitigation',
    specialty: 'Climate Adaptation & Mitigation',
    email: 'placeholder@cornell.edu'
  },
  {
    id: 'candace-hulbert',
    name: 'Candace Hulbert',
    role: 'Climate Adaptation & Mitigation',
    specialty: 'Climate Adaptation & Mitigation',
    email: 'placeholder@cornell.edu'
  },
  {
    id: 'kitty-oneil',
    name: "Dr. Kitty O'Neil",
    role: 'Ag Climate Resiliency Specialist',
    specialty: 'Ag Climate Resiliency Specialist',
    email: 'placeholder@cornell.edu'
  },
  {
    id: 'elizabeth-buck',
    name: 'Elizabeth Buck',
    role: 'Vegetable Specialist',
    specialty: 'Vegetable Specialist',
    email: 'placeholder@cornell.edu'
  },
  {
    id: 'lindsay-ferlito',
    name: 'Lindsay Ferlito',
    role: 'Dairy Management',
    specialty: 'Dairy Management',
    email: 'placeholder@cornell.edu'
  },
  {
    id: 'janice-degni',
    name: 'Janice Degni',
    role: 'Dairy & Field Crops',
    specialty: 'Dairy & Field Crops',
    email: 'placeholder@cornell.edu'
  },

];

export const getTeamMemberById = (id: string): TeamMember | undefined => {
  return teamMembers.find(member => member.id === id);
};

export const getTeamMembersByRole = (role: string): TeamMember[] => {
  return teamMembers.filter(member => member.role.toLowerCase().includes(role.toLowerCase()));
};