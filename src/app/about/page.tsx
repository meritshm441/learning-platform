import {
  BookOpen,
  Users,
  Award,
  Globe,
  Lightbulb,
  Shield,
  Target,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  MonitorPlay,
  HeartHandshake,
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { value: "12,000+", label: "Active Learners" },
    { value: "150+", label: "Expert Courses" },
    { value: "40+", label: "Countries Reached" },
    { value: "98%", label: "Completion Rate" },
  ]

  const values = [
    {
      icon: Target,
      title: "Learner-First",
      desc: "Every feature and course is designed around what helps learners succeed most effectively.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      desc: "We constantly evolve our platform with the latest teaching methods and technology.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      desc: "Your data and learning journey are protected with enterprise-grade security.",
    },
    {
      icon: HeartHandshake,
      title: "Community",
      desc: "Learning is better together. We foster collaboration between learners and instructors.",
    },
    {
      icon: TrendingUp,
      title: "Growth Mindset",
      desc: "We believe everyone can learn. Our platform adapts to every skill level.",
    },
    {
      icon: Award,
      title: "Excellence",
      desc: "We partner with top instructors and verify every course for quality.",
    },
  ]

  const timeline = [
    {
      year: "2021",
      title: "The Beginning",
      desc: "Launched with a vision to make quality education accessible to everyone, everywhere.",
    },
    {
      year: "2022",
      title: "Platform Growth",
      desc: "Expanded to 50+ courses, introduced learning tracks, and reached our first 5,000 learners.",
    },
    {
      year: "2023",
      title: "Going Global",
      desc: "Added multi-language support, mobile learning, and partnerships with industry leaders.",
    },
    {
      year: "2024",
      title: "AI-Powered Learning",
      desc: "Introduced personalized learning paths, AI tutors, and real-time progress tracking.",
    },
  ]

  const team = [
    {
      initials: "AB",
      name: "Abebe Bekele",
      role: "Founder & CEO",
      bio: "Former educator passionate about democratizing access to quality learning.",
    },
    {
      initials: "MW",
      name: "Meron Teshome",
      role: "Head of Product",
      bio: "Product strategist focused on building intuitive, learner-centric experiences.",
    },
    {
      initials: "DK",
      name: "Dawit Kebede",
      role: "Lead Instructor",
      bio: "Industry veteran with 15+ years of experience in software and data science.",
    },
    {
      initials: "SH",
      name: "Selam Haile",
      role: "Community Lead",
      bio: "Building bridges between learners, mentors, and employers across the globe.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#01589a] px-4 py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-white/20" />
          <div className="absolute right-20 bottom-10 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
            <GraduationCap className="h-4 w-4" />
            <span>Empowering learners since 2021</span>
          </div>
          <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl">
            About <span className="text-[#77C053]">CLeint</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            We are on a mission to make world-class education accessible to every learner,
            everywhere. From foundational skills to advanced career tracks, we help people grow.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/courses"
              className="rounded-lg bg-white px-6 py-3 font-medium text-[#01589a] transition-colors hover:bg-white/90"
            >
              Explore Courses
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-[#77C053] px-6 py-3 font-medium text-white transition-colors hover:bg-[#6ab048]"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="mb-1 text-3xl font-bold text-[#01589a] md:text-4xl">{value}</div>
                <div className="text-sm text-[#666666]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#f5f5f5] px-4 py-16">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#01589a]/10">
              <BookOpen className="h-6 w-6 text-[#01589a]" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-[#404040]">Our Mission</h2>
            <p className="leading-relaxed text-[#666666]">
              To bridge the skills gap by providing affordable, high-quality education that empowers
              individuals to build meaningful careers. We believe knowledge should be a right, not a
              privilege.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#77C053]/10">
              <Globe className="h-6 w-6 text-[#77C053]" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-[#404040]">Our Vision</h2>
            <p className="leading-relaxed text-[#666666]">
              To become the leading learning platform in Africa and beyond, creating a world where
              anyone with ambition can access the tools and knowledge to succeed in the digital
              economy.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-[#404040]">What We Offer</h2>
            <p className="mx-auto max-w-xl text-[#666666]">
              A comprehensive learning ecosystem designed for real-world success.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: MonitorPlay,
                title: "Expert-Led Courses",
                desc: "Learn from industry professionals with real-world experience in their fields.",
              },
              {
                icon: Users,
                title: "Learning Tracks",
                desc: "Structured pathways that take you from beginner to job-ready in your chosen field.",
              },
              {
                icon: Award,
                title: "Verified Certificates",
                desc: "Earn recognized certificates to showcase your skills to employers worldwide.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-[#e6e6e6] p-6 transition-all hover:border-[#01589a]/20 hover:shadow-lg"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#01589a]/10">
                  <Icon className="h-5 w-5 text-[#01589a]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#404040]">{title}</h3>
                <p className="text-sm leading-relaxed text-[#666666]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#f5f5f5] px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-[#404040]">Our Journey</h2>
            <p className="text-[#666666]">From an idea to a growing community of learners.</p>
          </div>
          <div className="space-y-8">
            {timeline.map(({ year, title, desc }, i) => (
              <div key={year} className="flex items-start gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#01589a] text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  {i < timeline.length - 1 && <div className="mt-2 h-16 w-0.5 bg-[#01589a]/20" />}
                </div>
                <div className="pt-1">
                  <span className="text-sm font-medium text-[#01589a]">{year}</span>
                  <h3 className="mt-0.5 text-lg font-semibold text-[#404040]">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#666666]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-[#404040]">Our Values</h2>
            <p className="mx-auto max-w-xl text-[#666666]">
              The principles that guide everything we build and teach.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-xl bg-[#f5f5f5] p-6 transition-colors duration-300 hover:bg-[#01589a] hover:text-white"
              >
                <Icon className="mb-4 h-8 w-8 text-[#01589a] transition-colors group-hover:text-white" />
                <h3 className="mb-2 text-lg font-semibold text-[#404040] transition-colors group-hover:text-white">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[#666666] transition-colors group-hover:text-white/90">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#f5f5f5] px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-[#404040]">Meet the Team</h2>
            <p className="mx-auto max-w-xl text-[#666666]">
              Passionate individuals dedicated to transforming education.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {team.map(({ initials, name, role, bio }) => (
              <div
                key={name}
                className="rounded-xl bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#01589a] text-lg font-bold text-white">
                  {initials}
                </div>
                <h3 className="font-semibold text-[#404040]">{name}</h3>
                <p className="mt-1 text-sm font-medium text-[#01589a]">{role}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#666666]">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#01589a] px-4 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Start Learning?</h2>
          <p className="mx-auto mb-8 max-w-xl text-white/90">
            Join thousands of learners who are already building their skills and advancing their
            careers with CLeint.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-lg bg-[#77C053] px-8 py-3 font-medium text-white transition-colors hover:bg-[#6ab048]"
            >
              Create Free Account
            </Link>
            <Link
              href="/courses"
              className="rounded-lg bg-white/10 px-8 py-3 font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-[#404040]">Get in Touch</h2>
            <p className="text-[#666666]">We would love to hear from you.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Mail,
                label: "Email",
                value: "hello@cleint.com",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+251 911 234 567",
              },
              {
                icon: MapPin,
                label: "Address",
                value: "Bole, Addis Ababa, Ethiopia",
              },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-[#e6e6e6] p-6 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#01589a]/10">
                  <Icon className="h-5 w-5 text-[#01589a]" />
                </div>
                <div className="mb-1 text-sm text-[#666666]">{label}</div>
                <div className="font-medium text-[#404040]">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
