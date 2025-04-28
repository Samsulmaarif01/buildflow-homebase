
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RoleManagement from "@/components/team/RoleManagement";
import TeamManagement from "@/components/team/TeamManagement";
import { TeamMember, Role, Division } from "@/types";

const initialTeamMembers = [
  { id: "1", name: "Alex Johnson", role: "1", division: "1", email: "alex@example.com", phone: "123-456-7890" },
  { id: "2", name: "Maria Rodriguez", role: "2", division: "2", email: "maria@example.com", phone: "098-765-4321" },
  { id: "3", name: "David Chen", role: "3", division: "3", email: "david@example.com", phone: "555-123-4567" },
  { id: "4", name: "Sarah Kim", role: "2", division: "4", email: "sarah@example.com", phone: "777-888-9999" },
  { id: "5", name: "James Wilson", role: "3", division: "3", email: "james@example.com", phone: "111-222-3333" },
  { id: "6", name: "Fatima Hassan", role: "3", division: "3", email: "fatima@example.com", phone: "444-555-6666" },
];

// These will be replaced by the state from RoleManagement component in a real app
// This is just for demo purposes since we can't directly share state between siblings
const defaultRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    permissions: ["VIEW_PROJECTS", "CREATE_PROJECTS", "EDIT_PROJECTS", "DELETE_PROJECTS", "MANAGE_MEMBERS", "MANAGE_ROLES"],
  },
  {
    id: "2",
    name: "Project Manager",
    permissions: ["VIEW_PROJECTS", "CREATE_PROJECTS", "EDIT_PROJECTS", "VIEW_TASKS", "CREATE_TASKS", "EDIT_TASKS"],
  },
  {
    id: "3",
    name: "Team Member",
    permissions: ["VIEW_PROJECTS", "VIEW_TASKS", "EDIT_TASKS"],
  },
];

const defaultDivisions: Division[] = [
  { id: "1", name: "Management", description: "Company management and executives" },
  { id: "2", name: "Architecture", description: "Architectural design team" },
  { id: "3", name: "Engineering", description: "Civil and structural engineering" },
  { id: "4", name: "Interior Design", description: "Interior design specialists" },
];

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState("members");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [roles] = useState<Role[]>(defaultRoles);
  const [divisions] = useState<Division[]>(defaultDivisions);

  const handleMemberAdded = (member: TeamMember) => {
    setTeamMembers([...teamMembers, member]);
  };

  const handleMemberRemoved = (memberId: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== memberId));
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="roles">Roles & Divisions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="members">
            <TeamManagement 
              initialMembers={teamMembers}
              roles={roles}
              divisions={divisions}
              onMemberAdded={handleMemberAdded}
              onMemberRemoved={handleMemberRemoved}
            />
          </TabsContent>
          
          <TabsContent value="roles">
            <RoleManagement />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TeamPage;
