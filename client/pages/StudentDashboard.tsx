import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  Download,
  Search,
  FileText,
  Video,
  Image,
  File,
  Clock,
  GraduationCap,
  Bell,
  Settings,
  LogOut,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for demonstration
const mockMaterials = [
  {
    id: 1,
    title: "Mathematics Chapter 5 - Quadratic Equations",
    subject: "Mathematics",
    type: "pdf",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    teacher: "Ms. Sharma",
    downloads: 45,
  },
  {
    id: 2,
    title: "Science Lab Manual - Chemistry Experiments",
    subject: "Science",
    type: "pdf",
    size: "5.8 MB",
    uploadDate: "2024-01-14",
    teacher: "Mr. Gupta",
    downloads: 32,
  },
  {
    id: 3,
    title: "English Literature - Romeo and Juliet Analysis",
    subject: "English",
    type: "docx",
    size: "1.2 MB",
    uploadDate: "2024-01-13",
    teacher: "Mrs. Patel",
    downloads: 28,
  },
  {
    id: 4,
    title: "History Video Lecture - Mughal Empire",
    subject: "History",
    type: "video",
    size: "45.2 MB",
    uploadDate: "2024-01-12",
    teacher: "Mr. Singh",
    downloads: 67,
  },
  {
    id: 5,
    title: "Geography Maps Collection",
    subject: "Geography",
    type: "image",
    size: "8.9 MB",
    uploadDate: "2024-01-11",
    teacher: "Ms. Kumar",
    downloads: 23,
  },
];

const mockAnnouncements = [
  {
    id: 1,
    title: "Mid-term Examinations Schedule",
    date: "2024-01-15",
    type: "important",
  },
  {
    id: 2,
    title: "Science Fair Registration Open",
    date: "2024-01-14",
    type: "event",
  },
  {
    id: 3,
    title: "Library Hours Extended",
    date: "2024-01-13",
    type: "info",
  },
];

const subjects = [
  "All Subjects",
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Hindi",
  "Physics",
  "Chemistry",
  "Biology",
];

export default function StudentDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedType, setSelectedType] = useState("All Types");

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "docx":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "video":
        return <Video className="h-5 w-5 text-blue-500" />;
      case "image":
        return <Image className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "important":
        return "destructive";
      case "event":
        return "default";
      case "info":
        return "secondary";
      default:
        return "outline";
    }
  };

  const filteredMaterials = mockMaterials.filter((material) => {
    const matchesSearch = material.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSubject =
      selectedSubject === "All Subjects" ||
      material.subject === selectedSubject;
    const matchesType =
      selectedType === "All Types" || material.type === selectedType;
    return matchesSearch && matchesSubject && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold">EduPortal</span>
              </Link>
              <Badge variant="secondary">Student Portal</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="Student" />
                      <AvatarFallback>ST</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Rahul Sharma
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Class 10-A • Roll No: 15
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, Rahul! 👋
              </h1>
              <p className="text-muted-foreground">
                Ready to continue your learning journey? You have access to all
                Class 10-A materials.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-sm text-muted-foreground">
                        Study Materials
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-success-500/10 rounded-lg">
                      <Download className="h-6 w-6 text-success-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-sm text-muted-foreground">Downloads</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-school-500/10 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-school-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">89%</p>
                      <p className="text-sm text-muted-foreground">Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Study Materials</CardTitle>
                <CardDescription>
                  Access and download your class materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search materials..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select
                    value={selectedSubject}
                    onValueChange={setSelectedSubject}
                  >
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full md:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Types">All Types</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="docx">Document</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Materials List */}
                <div className="space-y-4">
                  {filteredMaterials.map((material) => (
                    <div
                      key={material.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        {getFileIcon(material.type)}
                        <div className="flex-1">
                          <h3 className="font-medium">{material.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span>{material.subject}</span>
                            <span>•</span>
                            <span>{material.teacher}</span>
                            <span>•</span>
                            <span>{material.size}</span>
                            <span>•</span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {material.uploadDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {material.downloads} downloads
                        </Badge>
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Announcements */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Recent Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnnouncements.map((announcement) => (
                    <div key={announcement.id} className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">
                          {announcement.title}
                        </h4>
                        <Badge
                          variant={getTypeColor(announcement.type) as any}
                          className="text-xs"
                        >
                          {announcement.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {announcement.date}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Access */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Access</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Class Timetable
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Academic Progress
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Assignment Portal
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    All Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
