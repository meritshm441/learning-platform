import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 p-4">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          About <span className="text-blue-700">CClient</span>
        </h1>
        <p className="text-gray-600">
          Empowering businesses with intuitive dashboard solutions that turn data into insights.
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          <span className="bg-gray-100 px-3 py-1 rounded-full">Founded in 2020</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">10,000+ Users</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">50+ Countries</span>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="grid md:grid-cols-2 gap-4">
        {[
          {
            title: "Our Mission",
            text: "To make data visualization simple and accessible for all businesses.",
          },
          {
            title: "Our Vision",
            text: "To be the leading platform for dashboard management worldwide.",
          },
        ].map(({ title, text }) => (
          <div key={title} className="border p-4 rounded-lg bg-white">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{title}</h2>
            <p className="text-gray-600">{text}</p>
          </div>
        ))}
      </section>

      {/* Company Story */}
      <section className="space-y-6 text-center">
        <h2 className="text-2xl font-bold">Our Story</h2>
        <p className="text-gray-600">From a startup to a global platform trusted by thousands</p>
        {[
          ["The Beginning", "Born from a need for affordable, user-friendly dashboard tools."],
          ["Growth & Innovation", "Evolved with AI features, collaboration tools, and integrations."],
          ["Today & Beyond", "Serving users globally with a commitment to innovation."],
        ].map(([title, desc]) => (
          <div key={title}>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        ))}
      </section>

      {/* Values */}
      <section className="text-center space-y-6">
        <h2 className="text-2xl font-bold">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["🎯", "Simplicity", "Powerful tools made easy to use."],
            ["👥", "Customer-Centric", "User success is our priority."],
            ["💡", "Innovation", "Always improving and evolving."],
            ["🔒", "Reliability", "Secure and stable platform."],
            ["🌟", "Transparency", "Open, honest, and clear."],
            ["🏆", "Excellence", "High standards in everything we do."],
          ].map(([icon, title, desc]) => (
            <div key={title} className="p-4">
              <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xl">
                {icon}
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="text-center space-y-6">
        <h2 className="text-2xl font-bold">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["SJ", "Sarah Johnson", "CEO & Co-Founder", "Ex-Google data scientist."],
            ["MC", "Michael Chen", "CTO & Co-Founder", "Led engineering at Microsoft and Uber."],
            ["ER", "Emily Rodriguez", "Head of Product", "Expert in UX and product strategy."],
          ].map(([initials, name, role, desc]) => (
            <div key={name}>
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center text-blue-700 font-bold text-lg mb-2">
                {initials}
              </div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-blue-700 text-sm">{role}</p>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-gray-50 p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">CClient by the Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ["10,000+", "Active Users"],
            ["50+", "Countries"],
            ["99.9%", "Uptime"],
            ["24/7", "Support"],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="text-blue-700 text-2xl font-bold">{value}</div>
              <div className="text-gray-600">{label}</div>
            </div>
          ))}
        </div>
      </section>


      {/* Contact Info */}
      <section className="text-center pt-8 border-t text-gray-600">
        <h3 className="font-semibold text-lg mb-2">Get in Touch</h3>
        <p>Email: hello@cclient.com</p>
        <p>Phone: (555) 123-4567</p>
        <p>Address: 123 Business Ave, San Francisco, CA 94105</p>
      </section>
    </div>
  );
}
