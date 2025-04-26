
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileIcon, FolderIcon } from "lucide-react";

const projectFiles = [
  { name: "Project Blueprint", type: "folder", itemCount: 12, updatedAt: "2023-10-15" },
  { name: "3D Renderings", type: "folder", itemCount: 8, updatedAt: "2023-10-12" },
  { name: "Client Requirements.pdf", type: "file", size: "2.4 MB", updatedAt: "2023-10-10" },
  { name: "Construction Timeline.xlsx", type: "file", size: "1.8 MB", updatedAt: "2023-10-08" },
  { name: "Budget Estimates.xlsx", type: "file", size: "3.2 MB", updatedAt: "2023-10-05" },
  { name: "Material Specifications.pdf", type: "file", size: "4.5 MB", updatedAt: "2023-10-02" },
];

const FilesPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Files & Documents</h1>
          <p className="text-muted-foreground">
            Access and manage project files and documentation
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Project Files</CardTitle>
            <CardDescription>Access and manage your project files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {projectFiles.map((file, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-md hover:bg-accent cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {file.type === 'folder' ? (
                      <FolderIcon className="h-5 w-5 text-amber-500" />
                    ) : (
                      <FileIcon className="h-5 w-5 text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {file.type === 'folder' 
                          ? `${file.itemCount} items` 
                          : `${file.size}`
                        }
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {file.updatedAt}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FilesPage;
