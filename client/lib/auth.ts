// Student accounts managed by admin
// In a real app, this would be stored in a database
export interface StudentAccount {
  id: number;
  name: string;
  email: string;
  class: string;
  rollNo: string;
  status: "active" | "inactive";
  password: string; // In real app, this would be hashed
  lastLogin?: string;
  createdDate: string;
  passwordChanged?: boolean;
}

// Mock database of admin-created student accounts
const studentAccounts: StudentAccount[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@student.school.com",
    class: "10-A",
    rollNo: "15",
    status: "active",
    password: "rahul.sharma123", // Email prefix + 123
    lastLogin: "2024-01-15",
    createdDate: "2024-01-01",
    passwordChanged: false,
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@student.school.com",
    class: "10-A",
    rollNo: "23",
    status: "active",
    password: "priya.patel123",
    createdDate: "2024-01-01",
    passwordChanged: false,
  },
  {
    id: 3,
    name: "Arjun Kumar",
    email: "arjun.kumar@student.school.com",
    class: "10-B",
    rollNo: "08",
    status: "inactive",
    password: "arjun.kumar123",
    createdDate: "2024-01-10",
    passwordChanged: false,
  },
];

// Admin credentials
const adminCredentials = {
  email: "admin@school.com",
  password: "admin123",
};

// Teacher credentials (mock)
const teacherCredentials = [
  { email: "teacher@school.com", password: "teacher123" },
];

export interface AuthResult {
  success: boolean;
  user?: {
    id: number;
    name: string;
    email: string;
    role: "student" | "teacher" | "admin";
    class?: string;
    rollNo?: string;
    mustChangePassword?: boolean;
  };
  error?: string;
}

export const authenticateUser = async (
  userType: string,
  identifier: string,
  password: string,
): Promise<AuthResult> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  switch (userType) {
    case "admin":
      if (
        identifier === adminCredentials.email &&
        password === adminCredentials.password
      ) {
        return {
          success: true,
          user: {
            id: 0,
            name: "Admin User",
            email: adminCredentials.email,
            role: "admin",
          },
        };
      }
      return { success: false, error: "Invalid admin credentials" };

    case "teacher":
      const teacher = teacherCredentials.find(
        (t) => t.email === identifier && t.password === password,
      );
      if (teacher) {
        return {
          success: true,
          user: {
            id: 1,
            name: "Teacher User",
            email: teacher.email,
            role: "teacher",
          },
        };
      }
      return { success: false, error: "Invalid teacher credentials" };

    case "student":
      // For students, identifier should be email (username)
      const student = studentAccounts.find((s) => s.email === identifier);

      if (!student) {
        return {
          success: false,
          error: "Account not found. Please contact your school administrator.",
        };
      }

      if (student.status === "inactive") {
        return {
          success: false,
          error:
            "Your account has been deactivated. Please contact your school administrator.",
        };
      }

      if (student.password !== password) {
        return {
          success: false,
          error:
            "Incorrect password. Please try again or contact your administrator.",
        };
      }

      // Update last login
      student.lastLogin = new Date().toISOString().split("T")[0];

      return {
        success: true,
        user: {
          id: student.id,
          name: student.name,
          email: student.email,
          role: "student",
          class: student.class,
          rollNo: student.rollNo,
          mustChangePassword: !student.passwordChanged,
        },
      };

    default:
      return { success: false, error: "Invalid user type" };
  }
};

export const changePassword = async (
  userId: number,
  currentPassword: string,
  newPassword: string,
): Promise<{ success: boolean; error?: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const student = studentAccounts.find((s) => s.id === userId);

  if (!student) {
    return { success: false, error: "Student not found" };
  }

  if (student.password !== currentPassword) {
    return { success: false, error: "Current password is incorrect" };
  }

  if (newPassword.length < 6) {
    return {
      success: false,
      error: "New password must be at least 6 characters",
    };
  }

  // Update password
  student.password = newPassword;
  student.passwordChanged = true;

  return { success: true };
};

// Function to get student account for admin panel
export const getStudentAccounts = (): StudentAccount[] => {
  return studentAccounts;
};

// Function to add new student account (admin only)
export const addStudentAccount = (
  studentData: Omit<
    StudentAccount,
    "id" | "password" | "status" | "createdDate"
  >,
): StudentAccount => {
  const newStudent: StudentAccount = {
    ...studentData,
    id: Math.max(...studentAccounts.map((s) => s.id)) + 1,
    password: studentData.email.split("@")[0] + "123", // Email prefix + 123
    status: "active",
    createdDate: new Date().toISOString().split("T")[0],
    passwordChanged: false,
  };

  studentAccounts.push(newStudent);
  return newStudent;
};

// Function to update student account status
export const updateStudentStatus = (
  id: number,
  status: "active" | "inactive",
): boolean => {
  const student = studentAccounts.find((s) => s.id === id);
  if (student) {
    student.status = status;
    return true;
  }
  return false;
};

// Function to reset student password
export const resetStudentPassword = (id: number): string => {
  const student = studentAccounts.find((s) => s.id === id);
  if (student) {
    const newPassword = student.email.split("@")[0] + "123";
    student.password = newPassword;
    student.passwordChanged = false;
    return newPassword;
  }
  throw new Error("Student not found");
};

// Function to delete student account
export const deleteStudentAccount = (id: number): boolean => {
  const index = studentAccounts.findIndex((s) => s.id === id);
  if (index !== -1) {
    studentAccounts.splice(index, 1);
    return true;
  }
  return false;
};
