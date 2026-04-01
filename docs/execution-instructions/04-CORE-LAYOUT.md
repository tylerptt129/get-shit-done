# 04 - CORE LAYOUT: App Shell, Navigation & Dashboard
**Medical Device QMS SaaS Platform**

## Overview
This document provides exact code instructions for building the app shell, sidebar navigation, dashboard home page, and header components. Uses Next.js 14+ App Router, Tailwind CSS, shadcn/ui, and Lucide React icons.

---

## 1. Dashboard Layout Component
**File:** `src/app/(dashboard)/layout.tsx`

```typescript
import React from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

export const metadata = {
  title: 'Dashboard - MedDev QMS',
  description: 'Quality Management System Dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
```

---

## 2. Sidebar Component
**File:** `src/components/layout/sidebar.tsx`

```typescript
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  ClipboardCheck,
  GraduationCap,
  Cpu,
  Tag,
  Send,
  Truck,
  Wrench,
  MessageSquareWarning,
  PenTool,
  Shield,
  BarChart3,
  Settings,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavGroup {
  label: string;
  items: {
    name: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

const navGroups: NavGroup[] = [
  {
    label: 'OVERVIEW',
    items: [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
    ],
  },
  {
    label: 'QUALITY',
    items: [
      {
        name: 'Documents',
        href: '/dashboard/documents',
        icon: <FileText className="w-5 h-5" />,
      },
      {
        name: 'CAPAs',
        href: '/dashboard/capas',
        icon: <AlertTriangle className="w-5 h-5" />,
      },
      {
        name: 'Audits',
        href: '/dashboard/audits',
        icon: <ClipboardCheck className="w-5 h-5" />,
      },
      {
        name: 'Training',
        href: '/dashboard/training',
        icon: <GraduationCap className="w-5 h-5" />,
      },
    ],
  },
  {
    label: 'REGULATORY',
    items: [
      {
        name: 'Devices',
        href: '/dashboard/devices',
        icon: <Cpu className="w-5 h-5" />,
      },
      {
        name: 'Labels',
        href: '/dashboard/labels',
        icon: <Tag className="w-5 h-5" />,
      },
      {
        name: 'Submissions',
        href: '/dashboard/submissions',
        icon: <Send className="w-5 h-5" />,
      },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      {
        name: 'Suppliers',
        href: '/dashboard/suppliers',
        icon: <Truck className="w-5 h-5" />,
      },
      {
        name: 'Equipment',
        href: '/dashboard/equipment',
        icon: <Wrench className="w-5 h-5" />,
      },
      {
        name: 'Complaints',
        href: '/dashboard/complaints',
        icon: <MessageSquareWarning className="w-5 h-5" />,
      },
    ],
  },
  {
    label: 'DESIGN & RISK',
    items: [
      {
        name: 'Design Controls',
        href: '/dashboard/design-controls',
        icon: <PenTool className="w-5 h-5" />,
      },
      {
        name: 'Risk Management',
        href: '/dashboard/risk-management',
        icon: <Shield className="w-5 h-5" />,
      },
    ],
  },
  {
    label: 'MANAGEMENT',
    items: [
      {
        name: 'Management Review',
        href: '/dashboard/management-review',
        icon: <BarChart3 className="w-5 h-5" />,
      },
      {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: <Settings className="w-5 h-5" />,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(['OVERVIEW', 'QUALITY'])
  );

  const toggleGroup = (label: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(label)) {
      newExpanded.delete(label);
    } else {
      newExpanded.add(label);
    }
    setExpandedGroups(newExpanded);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg border border-slate-200 shadow-sm"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-slate-600" />
        ) : (
          <Menu className="w-5 h-5 text-slate-600" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'bg-white border-r border-slate-200 flex flex-col transition-all duration-300',
          isOpen ? 'w-64' : 'w-0 lg:w-64',
          'overflow-hidden lg:overflow-visible'
        )}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900">MedDev</h1>
              <p className="text-xs text-slate-500">QMS</p>
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {navGroups.map((group) => (
            <div key={group.label}>
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group.label)}
                className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider hover:text-slate-700 transition-colors"
              >
                <span>{group.label}</span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform',
                    expandedGroups.has(group.label) ? 'rotate-0' : '-rotate-90'
                  )}
                />
              </button>

              {/* Group Items */}
              {expandedGroups.has(group.label) && (
                <div className="space-y-1 mt-2">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm font-medium',
                        isActive(item.href)
                          ? 'bg-indigo-50 text-indigo-600 border-l-2 border-indigo-600'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      )}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer Info */}
        <div className="border-t border-slate-200 p-4 text-xs text-slate-500">
          <p>MedDev QMS v1.0</p>
          <p className="mt-1">AI-Native Quality Management</p>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
```

---

## 3. Header Component
**File:** `src/components/layout/header.tsx`

```typescript
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Search, Bell } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const pathname = usePathname();
  const [notificationCount] = React.useState(3);

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    segments.forEach((segment, index) => {
      const label = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        active: index === segments.length - 1,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-600">
          {breadcrumbs.length > 0 ? (
            <>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className="mx-2 text-slate-300">/</span>}
                  <span
                    className={
                      crumb.active
                        ? 'font-semibold text-slate-900'
                        : 'text-slate-600'
                    }
                  >
                    {crumb.label}
                  </span>
                </React.Fragment>
              ))}
            </>
          ) : (
            <span className="font-semibold text-slate-900">Dashboard</span>
          )}
        </span>
      </div>

      {/* Right: Search, Notifications, User */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="hidden md:block relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search documents, CAPAs..."
            className="pl-10 pr-4 py-2 bg-slate-50 border-slate-200 text-sm"
          />
        </div>

        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-slate-100"
        >
          <Bell className="w-5 h-5 text-slate-600" />
          {notificationCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white rounded-full">
              {notificationCount}
            </Badge>
          )}
        </Button>

        {/* User Button (Clerk) */}
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'w-9 h-9',
            },
          }}
        />
      </div>
    </header>
  );
}
```

---

## 4. Dashboard Home Page
**File:** `src/app/(dashboard)/dashboard/page.tsx`

```typescript
'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import {
  AlertTriangle,
  ClipboardList,
  GraduationCap,
  MessageSquareWarning,
  TrendingUp,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// KPI Card Component
function KPICard({
  title,
  value,
  icon: Icon,
  color,
  trend,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'indigo' | 'amber' | 'blue' | 'red' | 'green';
  trend?: { value: number; direction: 'up' | 'down' };
}) {
  const colorClasses = {
    indigo: 'bg-indigo-50 text-indigo-600',
    amber: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-green-50 text-green-600',
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-600 font-medium">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
            {trend && (
              <p className="text-xs text-slate-500 mt-2">
                {trend.direction === 'up' ? '↑' : '↓'} {trend.value}% from last month
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            {Icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Activity Item Component
function ActivityItem({
  title,
  description,
  timestamp,
  type,
}: {
  title: string;
  description: string;
  timestamp: string;
  type: 'capa' | 'document' | 'audit' | 'training';
}) {
  const badges = {
    capa: <Badge variant="destructive">CAPA</Badge>,
    document: <Badge variant="secondary">Document</Badge>,
    audit: <Badge>Audit</Badge>,
    training: <Badge variant="outline">Training</Badge>,
  };

  return (
    <div className="py-3 border-b border-slate-200 last:border-0 flex items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-medium text-slate-900 truncate">{title}</h4>
          {badges[type]}
        </div>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <p className="text-xs text-slate-400 whitespace-nowrap">{timestamp}</p>
    </div>
  );
}

// Quick Action Button Component
function QuickActionButton({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Button
      variant="outline"
      className="w-full justify-start gap-3 h-auto py-3 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600"
      asChild
    >
      <a href={href}>
        {Icon}
        <span>{label}</span>
      </a>
    </Button>
  );
}

export default function DashboardPage() {
  const { user } = useUser();

  const firstName = user?.firstName || 'User';

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {firstName}!
        </h1>
        <p className="text-slate-600 mt-2">
          Here's what's happening in your QMS today.
        </p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Open CAPAs"
          value="12"
          icon={<AlertTriangle className="w-6 h-6" />}
          color="red"
          trend={{ value: 8, direction: 'down' }}
        />
        <KPICard
          title="Documents Due"
          value="8"
          icon={<ClipboardList className="w-6 h-6" />}
          color="amber"
          trend={{ value: 3, direction: 'up' }}
        />
        <KPICard
          title="Overdue Training"
          value="5"
          icon={<GraduationCap className="w-6 h-6" />}
          color="blue"
          trend={{ value: 12, direction: 'down' }}
        />
        <KPICard
          title="Open Complaints"
          value="3"
          icon={<MessageSquareWarning className="w-6 h-6" />}
          color="indigo"
          trend={{ value: 0, direction: 'up' }}
        />
        <KPICard
          title="Audit Readiness"
          value="87%"
          icon={<TrendingUp className="w-6 h-6" />}
          color="green"
          trend={{ value: 5, direction: 'up' }}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Feed */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Recent Activity
              <Badge variant="secondary" className="ml-auto">12 total</Badge>
            </CardTitle>
            <CardDescription>Latest updates in your QMS</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ActivityItem
              title="CAPA-2026-042 Closed"
              description="Root cause analysis approved by QA Director"
              timestamp="2 hours ago"
              type="capa"
            />
            <ActivityItem
              title="SOP-2024-15 Ready for Review"
              description="Updated document submitted for regulatory review"
              timestamp="5 hours ago"
              type="document"
            />
            <ActivityItem
              title="Internal Audit Scheduled"
              description="Q2 2026 Manufacturing Process Audit"
              timestamp="1 day ago"
              type="audit"
            />
            <ActivityItem
              title="Training Reminder"
              description="5 employees overdue for ISO 13485 refresh"
              timestamp="2 days ago"
              type="training"
            />
            <ActivityItem
              title="Device Label Update"
              description="FDA submission for Model XR-500 label revision"
              timestamp="3 days ago"
              type="document"
            />
            <ActivityItem
              title="Supplier Audit Completed"
              description="Annual audit of Contract Manufacturer A passed"
              timestamp="4 days ago"
              type="audit"
            />
          </CardContent>
          <div className="px-6 py-4 border-t border-slate-200">
            <Button variant="ghost" className="w-full justify-center text-indigo-600 hover:bg-indigo-50">
              View All Activity
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Start something new</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <QuickActionButton
              icon={<ClipboardList className="w-4 h-4" />}
              label="New Document"
              href="/dashboard/documents/create"
            />
            <QuickActionButton
              icon={<AlertTriangle className="w-4 h-4" />}
              label="New CAPA"
              href="/dashboard/capas/create"
            />
            <QuickActionButton
              icon={<MessageSquareWarning className="w-4 h-4" />}
              label="New Complaint"
              href="/dashboard/complaints/create"
            />
            <QuickActionButton
              icon={<TrendingUp className="w-4 h-4" />}
              label="Run Audit"
              href="/dashboard/audits/create"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

---

## 5. Landing Page (Root)
**File:** `src/app/page.tsx`

```typescript
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, SignInButton, SignUpButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      {/* Content */}
      <div className="max-w-2xl text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          MedDev QMS
        </h1>
        <p className="text-2xl md:text-3xl text-indigo-200 mb-8 font-light">
          AI-Native Quality Management
        </p>

        {/* Subheading */}
        <p className="text-lg text-slate-300 mb-12 max-w-xl mx-auto">
          Enterprise-grade Quality Management System built with AI at its core.
          Streamline your QMS processes, stay compliant, and scale with confidence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SignInButton mode="modal">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8"
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button
              size="lg"
              variant="outline"
              className="border-slate-400 text-white hover:bg-slate-700 font-semibold px-8"
            >
              Get Started
            </Button>
          </SignUpButton>
        </div>

        {/* Features List */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'AI-Powered',
              description: 'Intelligent document analysis and compliance checks',
            },
            {
              title: 'Secure & Compliant',
              description: '21 CFR Part 11, ISO 13485, HIPAA ready',
            },
            {
              title: 'Enterprise Scale',
              description: 'Built for medical device companies worldwide',
            },
          ].map((feature, index) => (
            <div key={index} className="text-slate-300">
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## 6. Required Dependencies & Utilities

### Update `src/lib/utils.ts`:
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### shadcn/ui Components Required:
Make sure these components are installed in `src/components/ui/`:
- `button.tsx` — Button component
- `input.tsx` — Input field
- `card.tsx` — Card container (CardHeader, CardTitle, CardDescription, CardContent)
- `badge.tsx` — Badge component

**Install with:**
```bash
npx shadcn-ui@latest add button input card badge
```

---

## 7. Tailwind CSS Configuration
**File:** `tailwind.config.ts` (example)

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          600: '#4f46e5',
        },
        slate: {
          50: '#f8fafc',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          900: '#0f172a',
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 8. Clerk Configuration
**File:** `.env.local` (example — use your Clerk keys)

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

**File:** `src/app/layout.tsx` (wrap with ClerkProvider)

```typescript
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MedDev QMS',
  description: 'AI-Native Quality Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

---

## 9. Build & Verification

### Run Development Server:
```bash
npm run dev
```

Expected: Dev server runs on `http://localhost:3000`

### Test Landing Page:
- Navigate to `http://localhost:3000`
- Should show MedDev QMS landing page with Sign In / Get Started buttons
- Sign in redirects to `/dashboard`

### Test Dashboard:
- After sign-in, navigate to `http://localhost:3000/dashboard`
- Sidebar displays with 6 navigation groups (OVERVIEW, QUALITY, REGULATORY, OPERATIONS, DESIGN & RISK, MANAGEMENT)
- Header shows breadcrumbs, search bar, notifications bell, user button
- Dashboard home shows KPI cards, recent activity feed, and quick actions
- Sidebar items highlight active routes
- Groups collapse/expand on click

### Production Build:
```bash
npm run build
npm start
```

Expected: Build completes without errors, start command runs the production server.

---

## 10. Styling Notes

**Theme Colors:**
- Primary: `indigo-600` (#4f46e5)
- Background: `slate-50` (#f8fafc)
- Text: `slate-900` (#0f172a)
- Borders: `slate-200` (#e2e8f0)
- Muted: `slate-500` (#64748b)

**Design Principles:**
- Professional medical/enterprise aesthetic
- Clean, modern (not legacy clunky)
- Consistent 4px/8px/16px spacing scale
- Rounded corners: `rounded-lg` (8px default)
- Shadows: Subtle (not excessive)
- Icons: Lucide React, 5x5 or 4x4 sized

**Responsive:**
- Mobile-first: `md:` for tablets (768px+), `lg:` for desktop (1024px+)
- Sidebar hides on mobile, toggled with menu button
- Grid cards stack on mobile, 2-col on tablet, 5-col on desktop

---

## 11. Success Checklist

- [ ] `npm run build` completes without errors
- [ ] `npm run dev` starts dev server on port 3000
- [ ] Landing page (`/`) loads with sign-in buttons
- [ ] After sign-in, redirects to `/dashboard`
- [ ] Sidebar displays all 6 navigation groups with icons
- [ ] Active navigation item highlights in indigo with left border
- [ ] Header shows breadcrumbs and user button
- [ ] Dashboard home page shows 5 KPI cards, activity feed, quick actions
- [ ] Sidebar groups collapse/expand on click
- [ ] All Lucide icons render correctly
- [ ] Responsive: sidebar hides on mobile, toggle button works
- [ ] shadcn/ui components render with Tailwind styling
- [ ] Clerk authentication works (sign in, sign out, user button)

---

**End of 04-CORE-LAYOUT.md**
