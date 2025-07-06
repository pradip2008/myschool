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
import {
  GraduationCap,
  Users,
  Shield,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { authenticateUser } from "@/lib/auth";

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: searchParams.get("role") || "student",
    identifier: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await authenticateUser(
        formData.userType,
        formData.identifier,
        formData.password,
      );

      if (result.success && result.user) {
        // Store user info in localStorage (in real app, use secure session)
        localStorage.setItem("user", JSON.stringify(result.user));

        // Redirect based on user type
        switch (result.user.role) {
          case "student":
            if (result.user.mustChangePassword) {
              navigate("/student/change-password");
            } else {
              navigate("/student/dashboard");
            }
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
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="userType">User Type</Label>
                <Select
                  value={formData.userType}
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      userType: value,
                      identifier: "",
                      password: "",
                    });
                    setError("");
                  }}
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
                    ? "Email (Username)"
                    : "Email / Employee ID"}
                </Label>
                <Input
                  id="identifier"
                  type="email"
                  placeholder={
                    formData.userType === "student"
                      ? "Enter your school email address"
                      : "Enter your email or employee ID"
                  }
                  value={formData.identifier}
                  onChange={(e) =>
                    setFormData({ ...formData, identifier: e.target.value })
                  }
                  required
                />
                {formData.userType === "student" && (
                  <p className="text-xs text-muted-foreground">
                    Use the email address provided by your school administrator
                  </p>
                )}
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
                    <strong>Demo Student:</strong> Email:
                    "rahul.sharma@student.school.com" Password:
                    "rahul.sharma123" (Note: Admin must create your account
                    first)
                  </AlertDescription>
                </Alert>
              )}

              {formData.userType === "teacher" && (
                <Alert>
                  <AlertDescription>
                    <strong>Demo Teacher:</strong> Email: "teacher@school.com"
                    Password: "teacher123"
                  </AlertDescription>
                </Alert>
              )}

              {formData.userType === "admin" && (
                <Alert>
                  <AlertDescription>
                    <strong>Demo Admin:</strong> Email: "admin@school.com"
                    Password: "admin123" (Create student accounts from admin
                    panel)
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
