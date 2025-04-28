
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Division, Permission, Role, generateUUID } from "@/types";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

const defaultPermissions: Permission[] = [
  "VIEW_PROJECTS", 
  "CREATE_PROJECTS", 
  "EDIT_PROJECTS", 
  "DELETE_PROJECTS",
  "VIEW_TASKS", 
  "CREATE_TASKS", 
  "EDIT_TASKS", 
  "DELETE_TASKS",
  "MANAGE_MEMBERS", 
  "MANAGE_ROLES",
  "MANAGE_DIVISIONS"
];

const defaultRoles: Role[] = [
  {
    id: generateUUID(),
    name: "Admin",
    permissions: [...defaultPermissions],
  },
  {
    id: generateUUID(),
    name: "Project Manager",
    permissions: [
      "VIEW_PROJECTS", 
      "CREATE_PROJECTS", 
      "EDIT_PROJECTS", 
      "VIEW_TASKS", 
      "CREATE_TASKS", 
      "EDIT_TASKS",
      "MANAGE_MEMBERS"
    ],
  },
  {
    id: generateUUID(),
    name: "Team Member",
    permissions: ["VIEW_PROJECTS", "VIEW_TASKS", "EDIT_TASKS"],
  },
];

const defaultDivisions: Division[] = [
  {
    id: generateUUID(),
    name: "Management",
    description: "Company management and executives",
  },
  {
    id: generateUUID(),
    name: "Architecture",
    description: "Architectural design team",
  },
  {
    id: generateUUID(),
    name: "Engineering",
    description: "Civil and structural engineering",
  },
  {
    id: generateUUID(),
    name: "Interior Design",
    description: "Interior design specialists",
  },
];

const RoleManagement: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("roles");
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [divisions, setDivisions] = useState<Division[]>(defaultDivisions);
  const [newRoleName, setNewRoleName] = useState("");
  const [newDivisionName, setNewDivisionName] = useState("");
  const [newDivisionDesc, setNewDivisionDesc] = useState("");
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [editingDivision, setEditingDivision] = useState<Division | null>(null);

  const form = useForm<{ permissions: Permission[] }>({
    defaultValues: {
      permissions: [],
    },
  });

  const handleAddRole = () => {
    if (!newRoleName.trim()) {
      toast({
        title: "Error",
        description: "Role name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newRole: Role = {
      id: generateUUID(),
      name: newRoleName,
      permissions: [],
    };

    setRoles([...roles, newRole]);
    setNewRoleName("");
    toast({
      title: "Role Added",
      description: `${newRoleName} role has been added`,
    });
  };

  const handleAddDivision = () => {
    if (!newDivisionName.trim()) {
      toast({
        title: "Error",
        description: "Division name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newDivision: Division = {
      id: generateUUID(),
      name: newDivisionName,
      description: newDivisionDesc || undefined,
    };

    setDivisions([...divisions, newDivision]);
    setNewDivisionName("");
    setNewDivisionDesc("");
    toast({
      title: "Division Added",
      description: `${newDivisionName} division has been added`,
    });
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id));
    toast({
      title: "Role Deleted",
      description: "The role has been deleted",
    });
  };

  const handleDeleteDivision = (id: string) => {
    setDivisions(divisions.filter((division) => division.id !== id));
    toast({
      title: "Division Deleted",
      description: "The division has been deleted",
    });
  };

  const startEditRole = (role: Role) => {
    setEditingRole(role);
    form.setValue("permissions", role.permissions);
  };

  const startEditDivision = (division: Division) => {
    setEditingDivision(division);
    setNewDivisionName(division.name);
    setNewDivisionDesc(division.description || "");
  };

  const saveRolePermissions = (values: { permissions: Permission[] }) => {
    if (!editingRole) return;

    const updatedRoles = roles.map((role) =>
      role.id === editingRole.id
        ? { ...role, permissions: values.permissions }
        : role
    );

    setRoles(updatedRoles);
    setEditingRole(null);
    toast({
      title: "Permissions Updated",
      description: `Permissions for ${editingRole.name} have been updated`,
    });
  };

  const saveDivision = () => {
    if (!editingDivision) return;
    if (!newDivisionName.trim()) {
      toast({
        title: "Error",
        description: "Division name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const updatedDivisions = divisions.map((division) =>
      division.id === editingDivision.id
        ? {
            ...division,
            name: newDivisionName,
            description: newDivisionDesc || undefined,
          }
        : division
    );

    setDivisions(updatedDivisions);
    setEditingDivision(null);
    setNewDivisionName("");
    setNewDivisionDesc("");
    toast({
      title: "Division Updated",
      description: "The division has been updated",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Role Management</h1>
        <p className="text-muted-foreground">
          Manage roles, divisions, and permissions
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="divisions">Divisions</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Role</CardTitle>
              <CardDescription>Create a new role with specific permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Role name"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                />
                <Button onClick={handleAddRole} className="shrink-0">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Role
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <Card key={role.id} className={editingRole?.id === role.id ? "border-primary" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{role.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {editingRole?.id !== role.id && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEditRole(role)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteRole(role.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <CardDescription>
                    {role.permissions.length} permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {editingRole?.id === role.id ? (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(saveRolePermissions)} className="space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                          <FormField
                            control={form.control}
                            name="permissions"
                            render={() => (
                              <FormItem>
                                <div className="mb-4">
                                  <FormLabel>Permissions</FormLabel>
                                  <FormDescription>
                                    Select the permissions for this role
                                  </FormDescription>
                                </div>
                                {defaultPermissions.map((permission) => (
                                  <FormField
                                    key={permission}
                                    control={form.control}
                                    name="permissions"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={permission}
                                          className="flex flex-row items-start space-x-3 space-y-0 mb-2"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(permission)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, permission])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== permission
                                                      )
                                                    );
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            {permission.split("_").join(" ").toLowerCase()}
                                          </FormLabel>
                                        </FormItem>
                                      );
                                    }}
                                  />
                                ))}
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          <Save className="h-4 w-4 mr-2" /> Save Permissions
                        </Button>
                      </form>
                    </Form>
                  ) : (
                    <div className="text-sm">
                      {role.permissions.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {role.permissions.slice(0, 3).map((permission) => (
                            <li key={permission}>
                              {permission.split("_").join(" ").toLowerCase()}
                            </li>
                          ))}
                          {role.permissions.length > 3 && (
                            <li>+ {role.permissions.length - 3} more</li>
                          )}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">No permissions assigned</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="divisions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Division</CardTitle>
              <CardDescription>Create a new department or division</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Division name"
                    value={newDivisionName}
                    onChange={(e) => setNewDivisionName(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Division description (optional)"
                    value={newDivisionDesc}
                    onChange={(e) => setNewDivisionDesc(e.target.value)}
                  />
                  <Button onClick={handleAddDivision} className="shrink-0">
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Division
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {divisions.map((division) => (
              <Card key={division.id} className={editingDivision?.id === division.id ? "border-primary" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{division.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {editingDivision?.id !== division.id && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEditDivision(division)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteDivision(division.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingDivision?.id === division.id ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Division Name</Label>
                        <Input
                          id="edit-name"
                          value={newDivisionName}
                          onChange={(e) => setNewDivisionName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-desc">Description</Label>
                        <Input
                          id="edit-desc"
                          value={newDivisionDesc}
                          onChange={(e) => setNewDivisionDesc(e.target.value)}
                        />
                      </div>
                      <Button onClick={saveDivision} className="w-full">
                        <Save className="h-4 w-4 mr-2" /> Save Changes
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {division.description || "No description provided"}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoleManagement;
