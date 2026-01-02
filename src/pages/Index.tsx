import { Link } from 'react-router-dom';
import { Users, GraduationCap, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Shield,
    title: 'Admin Dashboard',
    description: 'Complete oversight of the mentorship program with analytics and management tools.',
  },
  {
    icon: GraduationCap,
    title: 'Mentor Portal',
    description: 'Manage assigned students, schedule meetings, and track progress effectively.',
  },
  {
    icon: Users,
    title: 'Student Access',
    description: 'Connect with mentors, view schedules, and monitor your academic journey.',
  },
];

const benefits = [
  'Streamlined mentor-student matching',
  'Real-time communication tools',
  'Performance tracking & analytics',
  'Meeting scheduler with reminders',
  'Centralized announcements',
  'Progress reports & insights',
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-sidebar to-sidebar/90 text-sidebar-foreground">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">MC</span>
            </div>
            <span className="font-bold text-xl">Mentor Connect</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-sidebar-foreground hover:bg-sidebar-accent">
                Login
              </Button>
            </Link>
            <Link to="/role-select">
              <Button className="btn-primary">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 bg-sidebar-accent px-4 py-2 rounded-full text-sm">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Empowering academic success through mentorship
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Connect, Learn, and{' '}
              <span className="text-gradient">Grow Together</span>
            </h1>
            <p className="text-lg text-sidebar-foreground/80 max-w-2xl mx-auto">
              A comprehensive mentorship management platform that bridges the gap between students and mentors, fostering meaningful academic relationships.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link to="/role-select">
                <Button size="lg" className="btn-primary gap-2">
                  Select Your Role
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Three Portals, One Platform
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Role-based access ensures everyone gets the tools they need to succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="card-elevated p-8 text-center group hover:-translate-y-1 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Everything You Need for Successful Mentorship
              </h2>
              <p className="text-muted-foreground mb-8">
                Our platform provides all the essential tools to make mentorship programs efficient, transparent, and impactful.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-elevated p-8 bg-gradient-to-br from-accent to-background">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-card rounded-lg">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-success">8</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Active Students</p>
                    <p className="text-sm text-muted-foreground">Currently enrolled</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-card rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">4</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Expert Mentors</p>
                    <p className="text-sm text-muted-foreground">Ready to guide</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-card rounded-lg">
                  <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-info">92%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Satisfaction Rate</p>
                    <p className="text-sm text-muted-foreground">From participants</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <div className="card-elevated max-w-3xl mx-auto p-12 bg-gradient-to-br from-primary/5 to-accent">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Choose your role and begin your journey with Mentor Connect today.
            </p>
            <Link to="/role-select">
              <Button size="lg" className="btn-primary gap-2">
                Select Your Role
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar text-sidebar-foreground py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">MC</span>
            </div>
            <span className="font-semibold">Mentor Connect</span>
          </div>
          <p className="text-sidebar-muted text-sm">
            © 2024 Mentor Connect. Empowering academic success through mentorship.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
