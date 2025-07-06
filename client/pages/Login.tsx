import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, Users, Shield, BookOpen } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: searchParams.get("role") || "student",
    identifier: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock authentication - redirect based on user type
      switch (formData.userType) {
        case "student":
          navigate("/student/dashboard");
          break;
        case "teacher":
          navigate("/teacher/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        default:
          navigate("/student/dashboard");
      }
    }, 1000);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "student":
        return <BookOpen className="h-5 w-5" />;
      case "teacher":
        return <GraduationCap className="h-5 w-5" />;
      case "admin":
        return <Shield className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case "student":
        return "Access your study materials and academic resources";
      case "teacher":
        return "Manage classes and upload educational content";
      case "admin":
        return "Full system administration and analytics";
      default:
        return "Select your role to continue";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">EduPortal</span>
        </Link>
      </div>

      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-1">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
              {getRoleIcon(formData.userType)}
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              {getRoleDescription(formData.userType)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userType">User Type</Label>
                <Select
                  value={formData.userType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, userType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Student</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="teacher">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>Teacher</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>Administrator</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="identifier">
                  {formData.userType === "student"
                    ? "Student ID / Aadhaar"
                    : "Email / Employee ID"}
                </Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder={
                    formData.userType === "student"
                      ? "Enter your Student ID or Aadhaar number"
                      : "Enter your email or employee ID"
                  }
                  value={formData.identifier}
                  onChange={(e) =>
                    setFormData({ ...formData, identifier: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="text-center">
                <Button variant="link" className="text-sm">
                  Forgot your password?
                </Button>
              </div>

              {formData.userType === "student" && (
                <Alert>
                  <AlertDescription>
                    <strong>Demo credentials:</strong> Use any Student ID and
                    password "student123" to explore the student dashboard.
                  </AlertDescription>
                </Alert>
              )}

              {formData.userType === "teacher" && (
                <Alert>
                  <AlertDescription>
                    <strong>Demo credentials:</strong> Use any email and
                    password "teacher123" to explore the teacher dashboard.
                  </AlertDescription>
                </Alert>
              )}

              {formData.userType === "admin" && (
                <Alert>
                  <AlertDescription>
                    <strong>Demo credentials:</strong> Use any email and
                    password "admin123" to explore the admin dashboard.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              New to EduPortal?{" "}
              <Button variant="link" className="p-0 h-auto text-sm">
                Contact your school administrator
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Secure • Private • Reliable</p>
        </div>
      </div>
    </div>
  );
}
