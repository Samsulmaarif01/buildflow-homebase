
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2, UserPlus } from "lucide-react";
import { Division, Role, TeamMember, generateUUID } from "@/types";
import { Label } from "@/components/ui/label";

interface TeamManagementProps {
  initialMembers?: TeamMember[];
  roles: Role[];
  divisions: Division[];
  onMemberAdded?: (member: TeamMember) => void;
  onMemberRemoved?: (memberId: string) => void;
}

const TeamManagement: React.FC<TeamManagementProps> = ({
  initialMembers = [],
  roles,
  divisions,
  onMemberAdded,
  onMemberRemoved,
}) => {
  const { toast } = useToast();
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: "",
    role: "",
    division: "",
    email: "",
    phone: "",
  });

  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setMembers(initialMembers);
  }, [initialMembers]);

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role) {
      toast({
        title: "Error",
        description: "Name and role are required",
        variant: "destructive",
      });
      return;
    }

    const member: TeamMember = {
      id: generateUUID(),
      name: newMember.name,
      role: newMember.role,
      division: newMember.division,
      email: newMember.email,
      phone: newMember.phone,
    };

    const updatedMembers = [...members, member];
    setMembers(updatedMembers);
    
    if (onMemberAdded) {
      onMemberAdded(member);
    }

    setNewMember({
      name: "",
      role: "",
      division: "",
      email: "",
      phone: "",
    });

    setSheetOpen(false);

    toast({
      title: "Team Member Added",
      description: `${member.name} has been added to the team`,
    });
  };

  const handleDeleteMember = (id: string) => {
    const updatedMembers = members.filter((member) => member.id !== id);
    setMembers(updatedMembers);
    
    if (onMemberRemoved) {
      onMemberRemoved(id);
    }

    toast({
      title: "Team Member Removed",
      description: "The member has been removed from the team",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const getRoleName = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.name : roleId;
  };

  const getDivisionName = (divisionId?: string) => {
    if (!divisionId) return "";
    const division = divisions.find((d) => d.id === divisionId);
    return division ? division.name : "";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">
            Add, edit or remove team members
          </p>
        </div>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" /> Add Member
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Team Member</SheetTitle>
              <SheetDescription>
                Fill in the details to add a new team member
              </SheetDescription>
            </SheetHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Full name"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="Phone number"
                  value={newMember.phone}
                  onChange={(e) =>
                    setNewMember({ ...newMember, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newMember.role}
                  onValueChange={(value) =>
                    setNewMember({ ...newMember, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="division">Division</Label>
                <Select
                  value={newMember.division}
                  onValueChange={(value) =>
                    setNewMember({ ...newMember, division: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions.map((division) => (
                      <SelectItem key={division.id} value={division.id}>
                        {division.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <SheetFooter>
              <Button onClick={handleAddMember}>
                <PlusCircle className="h-4 w-4 mr-2" /> Add Member
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <Card key={member.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>
                      {getRoleName(member.role)}
                      {member.division && ` • ${getDivisionName(member.division)}`}
                    </CardDescription>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove team member</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to remove {member.name} from the team? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteMember(member.id)}>
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
            <CardContent className="text-sm">
              {member.email && <p className="text-muted-foreground">{member.email}</p>}
              {member.phone && <p className="text-muted-foreground">{member.phone}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamManagement;
