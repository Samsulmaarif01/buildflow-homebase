
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
  { name: "Alex Johnson", role: "Project Manager", avatar: "AJ", taskCount: 12, taskCompleted: 5 },
  { name: "Maria Rodriguez", role: "Lead Architect", avatar: "MR", taskCount: 8, taskCompleted: 6 },
  { name: "David Chen", role: "Construction Supervisor", avatar: "DC", taskCount: 15, taskCompleted: 9 },
  { name: "Sarah Kim", role: "Interior Designer", avatar: "SK", taskCount: 10, taskCompleted: 7 },
  { name: "James Wilson", role: "Civil Engineer", avatar: "JW", taskCount: 9, taskCompleted: 4 },
  { name: "Fatima Hassan", role: "Electrical Engineer", avatar: "FH", taskCount: 7, taskCompleted: 5 },
];

const TeamPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Team Members</h1>
          <p className="text-muted-foreground">
            View and manage your team across all projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt={member.name} />
                    <AvatarFallback>{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm text-muted-foreground">
                    {member.taskCompleted} / {member.taskCount} tasks
                  </div>
                </div>
                <CardTitle className="text-lg mt-2">{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${(member.taskCompleted / member.taskCount) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TeamPage;
