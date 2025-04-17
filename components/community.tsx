"use client"

import { useState } from "react"
import { MessageSquare, Users, Search, Plus, Heart, MessagesSquare, Bot, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DashboardShell } from "@/components/dashboard-shell"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample data for community groups
const groups = [
  {
    id: 1,
    name: "Heart Health Support",
    description: "A community for people managing heart conditions and cardiovascular health.",
    members: 1243,
    category: "Cardiovascular",
    posts: 87,
    isJoined: true,
  },
  {
    id: 2,
    name: "Diabetes Management",
    description: "Share tips and support for managing diabetes and blood sugar levels.",
    members: 2567,
    category: "Endocrine",
    posts: 156,
    isJoined: false,
  },
  {
    id: 3,
    name: "Mental Wellness",
    description: "A safe space to discuss mental health, stress management, and wellness strategies.",
    members: 3421,
    category: "Mental Health",
    posts: 213,
    isJoined: true,
  },
  {
    id: 4,
    name: "Chronic Pain Support",
    description: "Connect with others managing chronic pain conditions and share coping strategies.",
    members: 1876,
    category: "Pain Management",
    posts: 124,
    isJoined: false,
  },
  {
    id: 5,
    name: "Nutrition & Healthy Eating",
    description: "Discuss healthy eating habits, recipes, and nutritional strategies.",
    members: 4532,
    category: "Nutrition",
    posts: 267,
    isJoined: true,
  },
  {
    id: 6,
    name: "Sleep Disorders",
    description: "Support for those dealing with insomnia, sleep apnea, and other sleep issues.",
    members: 1654,
    category: "Sleep",
    posts: 98,
    isJoined: false,
  },
]

// Sample data for discussion posts
const posts = [
  {
    id: 1,
    author: "AnonymousUser123",
    authorInitials: "AU",
    title: "Managing medication side effects",
    content:
      "I've recently started a new blood pressure medication and I'm experiencing some dizziness. Has anyone else dealt with this? Any tips for managing it?",
    group: "Heart Health Support",
    likes: 24,
    replies: 12,
    timeAgo: "2 hours ago",
  },
  {
    id: 2,
    author: "HealthSeeker22",
    authorInitials: "HS",
    title: "New research on heart-healthy diets",
    content:
      "I came across an interesting study about the Mediterranean diet and its benefits for heart health. The research suggests that incorporating more olive oil, nuts, and fish can significantly reduce cardiovascular risks. Has anyone tried this diet approach?",
    group: "Heart Health Support",
    likes: 56,
    replies: 18,
    timeAgo: "1 day ago",
  },
  {
    id: 3,
    author: "WellnessJourney",
    authorInitials: "WJ",
    title: "Meditation techniques for anxiety",
    content:
      "I've been practicing mindfulness meditation for my anxiety, and it's been really helpful. I start with 5 minutes each morning and focus on my breathing. Has anyone else tried meditation for mental health?",
    group: "Mental Wellness",
    likes: 87,
    replies: 32,
    timeAgo: "3 days ago",
  },
]

export function Community() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")
  const [activeGroup, setActiveGroup] = useState<number | null>(null)
  const [newPostContent, setNewPostContent] = useState("")
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState("")

  // Filter groups based on search term and category
  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = category === "all" || group.category.toLowerCase() === category.toLowerCase()

    return matchesSearch && matchesCategory
  })

  // Filter posts based on active group
  const filteredPosts = activeGroup
    ? posts.filter((post) => post.group === groups.find((g) => g.id === activeGroup)?.name)
    : posts

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Community</h1>
        <Button onClick={() => setChatbotOpen(true)}>
          <Bot className="mr-2 h-4 w-4" />
          Ask Health Assistant
        </Button>
      </div>

      <Tabs defaultValue="groups" className="w-full">
        <TabsList>
          <TabsTrigger value="groups">
            <Users className="mr-2 h-4 w-4" />
            Groups
          </TabsTrigger>
          <TabsTrigger value="discussions">
            <MessageSquare className="mr-2 h-4 w-4" />
            Discussions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="groups">
          <div className="flex flex-col gap-4 md:flex-row mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
                  <SelectItem value="endocrine">Endocrine</SelectItem>
                  <SelectItem value="mental health">Mental Health</SelectItem>
                  <SelectItem value="pain management">Pain Management</SelectItem>
                  <SelectItem value="nutrition">Nutrition</SelectItem>
                  <SelectItem value="sleep">Sleep</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredGroups.length > 0 ? (
              filteredGroups.map((group) => (
                <Card key={group.id} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge variant="outline">{group.category}</Badge>
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{group.members.toLocaleString()} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{group.posts} posts</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    {group.isJoined ? (
                      <Button variant="outline" className="w-full" onClick={() => setActiveGroup(group.id)}>
                        View Discussions
                      </Button>
                    ) : (
                      <Button className="w-full">Join Group</Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No groups found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search or filters to find relevant groups.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="discussions">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {activeGroup
                  ? `Discussions in ${groups.find((g) => g.id === activeGroup)?.name}`
                  : "Recent Discussions"}
              </h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Post
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                    <DialogDescription>
                      Share your thoughts, questions, or experiences with the community.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Input placeholder="Post title" />
                    </div>
                    <div className="grid gap-2">
                      <Textarea
                        placeholder="Write your post here..."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="min-h-[150px]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Select defaultValue={activeGroup?.toString() || ""}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a group" />
                        </SelectTrigger>
                        <SelectContent>
                          {groups
                            .filter((group) => group.isJoined)
                            .map((group) => (
                              <SelectItem key={group.id} value={group.id.toString()}>
                                {group.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Post</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{post.authorInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{post.title}</CardTitle>
                          <CardDescription className="text-xs">
                            Posted by {post.author} in {post.group} • {post.timeAgo}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{post.group}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">{post.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 h-8 px-2">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 h-8 px-2">
                        <MessagesSquare className="h-4 w-4" />
                        <span>{post.replies}</span>
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      Reply
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No discussions found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeGroup
                    ? "Be the first to start a discussion in this group!"
                    : "Join a group to view and participate in discussions."}
                </p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Post
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={chatbotOpen} onOpenChange={setChatbotOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Health Assistant
            </DialogTitle>
            <DialogDescription>
              Ask questions about health topics or get help navigating the community.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="bg-muted p-4 rounded-lg max-h-[300px] overflow-y-auto">
              <div className="flex gap-2 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="bg-background p-3 rounded-lg">
                  <p className="text-sm">
                    Hello! I'm your Health Assistant. I can help answer health-related questions or help you find
                    relevant community groups. What can I help you with today?
                  </p>
                </div>
              </div>
              {chatMessage && (
                <>
                  <div className="flex gap-2 justify-end mb-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                      <p className="text-sm">{chatMessage}</p>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-background p-3 rounded-lg">
                      <p className="text-sm">
                        I'd be happy to help with that. Based on your question, I recommend checking out the Heart
                        Health Support group where members often discuss similar topics. Would you like me to provide
                        more specific information about managing blood pressure?
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type your question..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <Button type="submit" size="icon">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
