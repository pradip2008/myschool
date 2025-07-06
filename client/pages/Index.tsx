import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  Shield,
  Download,
  Clock,
  BarChart3,
  GraduationCap,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">EduPortal</h1>
                <p className="text-xs text-muted-foreground">
                  Smart Learning Hub
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                About
              </Button>
              <Button variant="ghost" size="sm">
                Contact
              </Button>
              <Button asChild size="sm">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              🚀 Advanced School Management System
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Transform Your School into a
              <span className="text-primary block">Digital Learning Hub</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Complete portal for students, teachers, and administrators. Access
              study materials, track progress, and manage educational resources
              with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/login">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Globe className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Everything You Need</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive solution for modern education management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Study Materials</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Class-wise organized study materials for grades 1-12. Easy
                  upload, download, and management system.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success-500/10 rounded-lg">
                    <Users className="h-6 w-6 text-success-600" />
                  </div>
                  <CardTitle>Multi-User Access</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Separate dashboards for students, teachers, and administrators
                  with role-based permissions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-school-500/10 rounded-lg">
                    <Shield className="h-6 w-6 text-school-600" />
                  </div>
                  <CardTitle>Secure & Private</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced security features with SSL encryption and controlled
                  access to protect student data.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Download className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Download Tracking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete visibility into who accessed what content, with
                  detailed download logs and analytics.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success-500/10 rounded-lg">
                    <Clock className="h-6 w-6 text-success-600" />
                  </div>
                  <CardTitle>Real-time Updates</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Instant notifications for new materials, announcements, and
                  important school updates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-school-500/10 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-school-600" />
                  </div>
                  <CardTitle>Analytics Dashboard</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive reports on student engagement, material usage,
                  and learning progress.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Built for Everyone</h3>
            <p className="text-lg text-muted-foreground">
              Tailored experiences for different user roles
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-4">Students</h4>
              <ul className="text-muted-foreground space-y-2 text-left">
                <li>• Access class-wise study materials</li>
                <li>• Download PDFs, documents, and resources</li>
                <li>• View timetables and announcements</li>
                <li>• Track academic progress</li>
              </ul>
              <Button className="mt-6 w-full" variant="outline" asChild>
                <Link to="/login?role=student">Student Login</Link>
              </Button>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow border-primary/20">
              <div className="w-16 h-16 bg-success-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-8 w-8 text-success-600" />
              </div>
              <h4 className="text-xl font-semibold mb-4">Teachers</h4>
              <ul className="text-muted-foreground space-y-2 text-left">
                <li>• Upload and organize study materials</li>
                <li>• Manage class assignments</li>
                <li>• Track student engagement</li>
                <li>• Share announcements</li>
              </ul>
              <Button className="mt-6 w-full" variant="outline" asChild>
                <Link to="/login?role=teacher">Teacher Login</Link>
              </Button>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-school-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-school-600" />
              </div>
              <h4 className="text-xl font-semibold mb-4">Administrators</h4>
              <ul className="text-muted-foreground space-y-2 text-left">
                <li>• Complete system oversight</li>
                <li>• User management and permissions</li>
                <li>• Detailed analytics and reports</li>
                <li>• School-wide announcements</li>
              </ul>
              <Button className="mt-6 w-full" variant="outline" asChild>
                <Link to="/login?role=admin">Admin Login</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of schools already using EduPortal to enhance their
            digital learning experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8"
              asChild
            >
              <Link to="/login">Access Portal</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold">EduPortal</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Empowering education through technology.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Features</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Study Materials</li>
                <li>User Management</li>
                <li>Analytics</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Support</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>System Status</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Legal</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 EduPortal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
