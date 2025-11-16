import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import LightModeButton from "../components/LightModeButton";
import Logo from "../components/Logo";
import { CheckSquare, MessageSquare, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function LandingPage() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleGetStartedButton = () => {
    navigate("/check-mail");
  }

  return (
    <div className="min-h-screen bg-wih-900 text-wih-50 flex flex-col">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-wih-900/90 backdrop-blur border-b border-wih-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Logo />
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-wih-50/70">
              Features
            </a>
            <a href="#team" className="hover:text-wih-50/70">
              Collaboration
            </a>
            <a href="#pricing" className="hover:text-wih-50/70">
              Pricing
            </a>
            <a href="#contact" className="hover:text-wih-50/70">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <LightModeButton toggleTheme={toggleTheme} theme={theme} />
            <button onClick={handleGetStartedButton} className="bg-wih-50 text-wih-900 font-medium px-4 py-2 rounded-xl hover:bg-wih-700 hover:text-wih-50 transition">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 py-20 gap-12">
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Work Smarter,{" "}
            <span className="text-wih-50/70">Collaborate Better</span>
          </h1>
          <p className="mt-6 text-wih-50/80 text-lg">
            Plan projects, track progress, chat in real-time, and boost your
            team's productivity—all in one place.
          </p>
          <div className="mt-8 flex justify-center lg:justify-start gap-4">
            <button className="bg-wih-50 text-wih-900 px-6 py-3 rounded-xl font-semibold hover:bg-wih-700 hover:text-wih-50 transition">
              Start Free Trial
            </button>
            <button className="border border-wih-600 px-6 py-3 rounded-xl font-semibold hover:bg-wih-700 transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="/illustrations/team-work.svg"
            alt="Team collaboration illustration"
            className="w-full max-w-md"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="bg-wih-800 py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Powerful Features</h2>
        <p className="mt-4 text-wih-50/80 max-w-2xl mx-auto">
          Everything you need to plan, collaborate, and deliver high-quality projects efficiently.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="p-6 bg-wih-900 rounded-2xl border border-wih-700 hover:border-wih-600 transition">
            <div className="flex justify-center mb-4">
              <CheckSquare className="text-wih-50 w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Task Management</h3>
            <p className="text-wih-50/70">
              Create, assign, and track tasks with ease using an intuitive Kanban-style interface.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-wih-900 rounded-2xl border border-wih-700 hover:border-wih-600 transition">
            <div className="flex justify-center mb-4">
              <MessageSquare className="text-wih-50 w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-Time Chat</h3>
            <p className="text-wih-50/70">
              Collaborate instantly with teammates using built-in chat and message threads.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-wih-900 rounded-2xl border border-wih-700 hover:border-wih-600 transition">
            <div className="flex justify-center mb-4">
              <BarChart3 className="text-wih-50 w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
            <p className="text-wih-50/70">
              Track performance, progress, and deadlines with insightful visual dashboards.
            </p>
          </div>
        </div>
      </div>
    </section>

      {/* TEAM COLLABORATION */}
      <section id="team" className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <img
            src="/illustrations/collab.svg"
            alt="Collaboration"
            className="w-full max-w-md mx-auto"
          />
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Designed for Teamwork
            </h2>
            <p className="mt-4 text-wih-50/80 leading-relaxed">
              WorkInHarmony brings your team together. Assign roles, manage
              permissions, and keep everyone aligned with real-time project
              updates.
            </p>
            <button className="mt-8 bg-wih-50 text-wih-900 font-semibold px-6 py-3 rounded-xl hover:bg-wih-700 hover:text-wih-50 transition">
              Try It Now
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto bg-wih-800 border-t border-wih-700 py-8 text-center text-wih-50/70">
        <p>© {new Date().getFullYear()} WorkInHarmony. All rights reserved.</p>
      </footer>
    </div>
  );
}
