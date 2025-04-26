
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Send } from "lucide-react";
import { Discussion } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

type DiscussionForumProps = {
  discussions: Discussion[];
  projectId: string;
};

const DiscussionForum: React.FC<DiscussionForumProps> = ({
  discussions,
  projectId,
}) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // In a real app, this would call an API to post the message
    console.log("Posting message:", newMessage, "to project:", projectId);
    setNewMessage("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Discussion</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {discussions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No discussions yet. Start the conversation!
            </p>
          </div>
        ) : (
          discussions.map((discussion) => (
            <div key={discussion.id} className="border-b border-border pb-6 last:border-0">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {discussion.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-medium">{discussion.author.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {discussion.author.role}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(discussion.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{discussion.content}</p>

                  {/* Replies */}
                  {discussion.replies.length > 0 && (
                    <div className="mt-4 space-y-4 pl-4 border-l-2 border-muted">
                      {discussion.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {reply.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                              <span className="font-medium">{reply.author.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {reply.author.role}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(reply.timestamp), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="mt-1 text-sm">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* New message form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={!newMessage.trim()}>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DiscussionForum;
