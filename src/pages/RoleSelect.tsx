import { Link, useNavigate } from 'react-router-dom';
import { Shield, GraduationCap, Users, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import emmaLogo from '@/assets/emma.png';

const roles = [
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Manage the entire mentorship program, assign mentors, and view analytics.',
    icon: Shield,
    path: '/admin',
    color: 'destructive',
  },
  {
    id: 'mentor',
    title: 'Mentor',
    description: 'Guide assigned students, schedule meetings, and track their progress.',
    icon: GraduationCap,
    path: '/mentor',
    color: 'primary',
  },
  {
    id: 'student',
    title: 'Student',
    description: 'Connect with your mentor, attend sessions, and monitor your performance.',
    icon: Users,
    path: '/student',
    color: 'info',
  },
];

const colorStyles = {
  destructive: {
    bg: 'bg-destructive/10',
    text: 'text-destructive',
    hover: 'hover:border-destructive/50 hover:bg-destructive/5',
  },
  primary: {
    bg: 'bg-primary/10',
    text: 'text-primary',
    hover: 'hover:border-primary/50 hover:bg-primary/5',
  },
  info: {
    bg: 'bg-info/10',
    text: 'text-info',
    hover: 'hover:border-info/50 hover:bg-info/5',
  },
};

const RoleSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-custom flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <img src={emmaLogo} alt="Mentor Connect Logo" className="w-16 h-16 mx-auto mb-4 rounded-2xl object-cover" />
          <h1 className="text-3xl font-bold text-foreground">Choose Your Role</h1>
          <p className="text-muted-foreground mt-2">Select how you'll be using Mentor Connect</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const styles = colorStyles[role.color as keyof typeof colorStyles];
            return (
              <button
                key={role.id}
                onClick={() => navigate(role.path)}
                className={`card-elevated p-8 text-left transition-all duration-300 border-2 border-transparent ${styles.hover} group`}
              >
                <div className={`w-14 h-14 rounded-xl ${styles.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <role.icon className={`h-7 w-7 ${styles.text}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{role.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{role.description}</p>
                <div className={`flex items-center gap-2 text-sm font-medium ${styles.text}`}>
                  Continue
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
