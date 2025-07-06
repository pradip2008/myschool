import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Shield,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  UserCheck,
  UserX,
  GraduationCap,
  Settings,
  LogOut,
  BookOpen,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock student accounts data
const mockStudentAccounts = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@student.school.com",
    class: "10-A",
    rollNo: "15",
    status: "active",
    lastLogin: "2024-01-15",
    createdDate: "2024-01-01",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@student.school.com",
    class: "10-A",
    rollNo: "23",
    status: "active",
    lastLogin: "2024-01-14",
    createdDate: "2024-01-01",
  },
  {
    id: 3,
    name: "Arjun Kumar",
    email: "arjun.kumar@student.school.com",
    class: "10-B",
    rollNo: "08",
    status: "inactive",
    lastLogin: "Never",
    createdDate: "2024-01-10",
  },
];

const classes = ["10-A", "10-B", "11-A", "11-B", "12-A", "12-B"];

export default function AdminDashboard() {
  const [students, setStudents] = useState(mockStudentAccounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    class: "",
    rollNo: "",
  });

  // Generate username and password from email
  const generateCredentials = (email: string) => {
    const username = email; // Email as username
    const password = email.split("@")[0] + "123"; // Email prefix + 123 as initial password
    return { username, password };
  };

  const handleAddStudent = () => {
    if (
      !newStudent.name ||
      !newStudent.email ||
      !newStudent.class ||
      !newStudent.rollNo
    ) {
      alert("Please fill all fields");
      return;
    }

    const credentials = generateCredentials(newStudent.email);
    const student = {
      id: students.length + 1,
      ...newStudent,
      status: "active",
      lastLogin: "Never",
      createdDate: new Date().toISOString().split("T")[0],
    };

    setStudents([...students, student]);
    setNewStudent({ name: "", email: "", class: "", rollNo: "" });
    setIsAddDialogOpen(false);

    // Show generated credentials
    alert(
      `Student account created successfully!\n\nLogin Credentials:\nUsername: ${credentials.username}\nPassword: ${credentials.password}\n\nPlease share these credentials with the student.`,
    );
  };

  const handleDeleteStudent = (id: number) => {
    if (confirm("Are you sure you want to delete this student account?")) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  const handleStatusToggle = (id: number) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? {
              ...student,
              status: student.status === "active" ? "inactive" : "active",
            }
          : student,
      ),
    );
  };

  const resetPassword = (student: any) => {
    const credentials = generateCredentials(student.email);
    alert(
      `Password has been reset for ${student.name}\n\nNew Credentials:\nUsername: ${credentials.username}\nPassword: ${credentials.password}\n\nPlease share these with the student.`,
    );
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm);
    const matchesClass =
      selectedClass === "All Classes" || student.class === selectedClass;
    const matchesStatus =
      selectedStatus === "All Status" || student.status === selectedStatus;
    return matchesSearch && matchesClass && matchesStatus;
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
              <Badge variant="destructive">Admin Panel</Badge>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Admin User
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@school.com
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
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* School Overview Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary to-school-600 rounded-xl p-6 text-primary-foreground mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard 🛡️</h1>
                <p className="text-primary-foreground/90 text-lg">
                  EduPortal Management System
                </p>
                <p className="text-primary-foreground/70 text-sm mt-1">
                  Complete control over student accounts and system access
                </p>
              </div>
              <div className="text-right">
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="text-2xl font-bold">
                    {new Date().toLocaleDateString("en-IN")}
                  </p>
                  <p className="text-sm text-primary-foreground/80">
                    Today's Date
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* School Basic Information */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">School Name</h3>
                    <p className="text-2xl font-bold text-primary">
                      ABC High School
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Established 1995
                    </p>
                  </div>
                  <GraduationCap className="h-12 w-12 text-primary/20" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-success-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Classes Available</h3>
                    <p className="text-2xl font-bold text-success-600">
                      10th - 12th
                    </p>
                    <p className="text-sm text-muted-foreground">
                      6 Sections Total
                    </p>
                  </div>
                  <BookOpen className="h-12 w-12 text-success-500/20" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-school-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Academic Year</h3>
                    <p className="text-2xl font-bold text-school-600">
                      2024-25
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Current Session
                    </p>
                  </div>
                  <Calendar className="h-12 w-12 text-school-500/20" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Account Statistics</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Users className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-primary">
                        {students.length}
                      </p>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Students
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      All Time
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-success-500/10 rounded-xl">
                      <UserCheck className="h-7 w-7 text-success-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-success-600">
                        {students.filter((s) => s.status === "active").length}
                      </p>
                      <p className="text-sm font-medium text-muted-foreground">
                        Active Accounts
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="default" className="text-xs bg-success-500">
                      {Math.round(
                        (students.filter((s) => s.status === "active").length /
                          students.length) *
                          100,
                      )}
                      %
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-destructive/10 rounded-xl">
                      <UserX className="h-7 w-7 text-destructive" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-destructive">
                        {students.filter((s) => s.status === "inactive").length}
                      </p>
                      <p className="text-sm font-medium text-muted-foreground">
                        Inactive Accounts
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive" className="text-xs">
                      Disabled
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-school-500/10 rounded-xl">
                      <Shield className="h-7 w-7 text-school-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-school-600">
                        {students.filter((s) => s.lastLogin !== "Never").length}
                      </p>
                      <p className="text-sm font-medium text-muted-foreground">
                        Ever Logged In
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      Usage
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg border-l-4 border-l-success-500">
                  <UserCheck className="h-5 w-5 text-success-600" />
                  <div className="flex-1">
                    <p className="font-medium">New student account created</p>
                    <p className="text-sm text-muted-foreground">
                      Rahul Sharma added to Class 10-A
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    2 hours ago
                  </span>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium">Password reset requested</p>
                    <p className="text-sm text-muted-foreground">
                      Priya Patel - Class 10-A
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    4 hours ago
                  </span>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg border-l-4 border-l-primary">
                  <Users className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">Bulk login activity detected</p>
                    <p className="text-sm text-muted-foreground">
                      15 students logged in during class hours
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    6 hours ago
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Student Accounts Management</CardTitle>
                <CardDescription>
                  Create, manage, and monitor student access accounts
                </CardDescription>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Student Account</DialogTitle>
                    <DialogDescription>
                      Create a new student account. Username and password will
                      be auto-generated from email.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newStudent.name}
                        onChange={(e) =>
                          setNewStudent({ ...newStudent, name: e.target.value })
                        }
                        placeholder="Enter student's full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newStudent.email}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            email: e.target.value,
                          })
                        }
                        placeholder="student@school.com"
                      />
                      <p className="text-xs text-muted-foreground">
                        This email will be used as username for login
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="class">Class</Label>
                      <Select
                        value={newStudent.class}
                        onValueChange={(value) =>
                          setNewStudent({ ...newStudent, class: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem key={cls} value={cls}>
                              {cls}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rollNo">Roll Number</Label>
                      <Input
                        id="rollNo"
                        value={newStudent.rollNo}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            rollNo: e.target.value,
                          })
                        }
                        placeholder="Enter roll number"
                      />
                    </div>
                    <Button onClick={handleAddStudent} className="w-full">
                      Create Account
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Classes">All Classes</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Status">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Students Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class & Roll</TableHead>
                    <TableHead>Username (Email)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Added {student.createdDate}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{student.class}</p>
                          <p className="text-sm text-muted-foreground">
                            Roll #{student.rollNo}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-mono text-sm">{student.email}</p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{student.lastLogin}</p>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => resetPassword(student)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusToggle(student.id)}
                            >
                              {student.status === "active" ? (
                                <>
                                  <UserX className="mr-2 h-4 w-4" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteStudent(student.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
