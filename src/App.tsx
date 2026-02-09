import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Common Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import RoleSelect from "./pages/RoleSelect";
import AccessDenied from "./pages/AccessDenied";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageMentors from "./pages/admin/ManageMentors";
import AssignMentor from "./pages/admin/AssignMentor";
import Announcements from "./pages/admin/Announcements";
import Reports from "./pages/admin/Reports";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import MentorDetails from "./pages/student/MentorDetails";
import StudentChat from "./pages/student/StudentChat";
import StudentMeetings from "./pages/student/StudentMeetings";
import StudentPerformance from "./pages/student/StudentPerformance";
import StudentAnnouncements from "./pages/student/StudentAnnouncements";

// Mentor Pages
import MentorDashboard from "./pages/mentor/MentorDashboard";
import AssignedStudents from "./pages/mentor/AssignedStudents";
import MentorChat from "./pages/mentor/MentorChat";
import MentorMeetings from "./pages/mentor/MentorMeetings";
import UpdatePerformance from "./pages/mentor/UpdatePerformance";
import MentorAnnouncements from "./pages/mentor/MentorAnnouncements";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Common Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role-select" element={<RoleSelect />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<ManageStudents />} />
          <Route path="/admin/mentors" element={<ManageMentors />} />
          <Route path="/admin/assign" element={<AssignMentor />} />
          <Route path="/admin/announcements" element={<Announcements />} />
          <Route path="/admin/reports" element={<Reports />} />

          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/mentor" element={<MentorDetails />} />
          <Route path="/student/chat" element={<StudentChat />} />
          <Route path="/student/meetings" element={<StudentMeetings />} />
          <Route path="/student/performance" element={<StudentPerformance />} />
          <Route path="/student/announcements" element={<StudentAnnouncements />} />

          {/* Mentor Routes */}
          <Route path="/mentor" element={<MentorDashboard />} />
          <Route path="/mentor/students" element={<AssignedStudents />} />
          <Route path="/mentor/chat" element={<MentorChat />} />
          <Route path="/mentor/meetings" element={<MentorMeetings />} />
          <Route path="/mentor/performance" element={<UpdatePerformance />} />
          <Route path="/mentor/announcements" element={<MentorAnnouncements />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
