import { Link } from 'react-router-dom';
import { Code, Users, Briefcase, ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8">
            <div className="flex flex-col justify-center">
              <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Open Source Freelancing Platform
              </h1>
              <p className="mb-8 text-lg text-primary-100 md:text-xl">
                Connect freelancers, recruiters, and project providers through
                open-source contributions. Build your portfolio, find talent,
                and collaborate on exciting projects.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link
                  to="/register"
                  className="btn rounded-md bg-success-600 px-6 py-3 text-center font-semibold text-white shadow-lg hover:bg-success-700 focus:outline-none focus:ring-2 focus:ring-success-500 focus:ring-offset-2 focus:ring-offset-primary-900"
                >
                  Get Started
                </Link>
                <Link
                  to="/projects"
                  className="btn rounded-md border border-white bg-transparent px-6 py-3 text-center font-semibold text-white hover:bg-white hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-900"
                >
                  Browse Projects
                </Link>
              </div>
            </div>
            <div className="hidden md:flex md:items-center md:justify-center">
              <div className="relative h-80 w-80">
                <div className="absolute left-0 top-0 h-64 w-64 animate-bounce-subtle rounded-full bg-white bg-opacity-10"></div>
                <div className="absolute bottom-0 right-0 h-64 w-64 animate-bounce-subtle rounded-full bg-white bg-opacity-10 animation-delay-200"></div>
                <div className="absolute left-1/4 top-1/4 h-48 w-48 animate-bounce-subtle rounded-full bg-white bg-opacity-10 animation-delay-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            How OpenHire Works
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg p-6 text-center transition-transform hover:transform hover:scale-105">
              <div className="mb-4 rounded-full bg-primary-100 p-4">
                <Code size={32} className="text-primary-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold">For Freelancers</h3>
              <p className="mb-4 text-gray-600">
                Build your portfolio by contributing to open-source projects.
                Showcase your skills and get discovered by recruiters.
              </p>
              <Link
                to="/register"
                className="mt-auto inline-flex items-center text-primary-600 hover:text-primary-800"
              >
                Join as Freelancer <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="flex flex-col items-center rounded-lg p-6 text-center transition-transform hover:transform hover:scale-105">
              <div className="mb-4 rounded-full bg-secondary-100 p-4">
                <Users size={32} className="text-secondary-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold">For Recruiters</h3>
              <p className="mb-4 text-gray-600">
                Find talented developers based on their actual contributions.
                Evaluate skills through real projects instead of just resumes.
              </p>
              <Link
                to="/register"
                className="mt-auto inline-flex items-center text-secondary-600 hover:text-secondary-800"
              >
                Join as Recruiter <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="flex flex-col items-center rounded-lg p-6 text-center transition-transform hover:transform hover:scale-105">
              <div className="mb-4 rounded-full bg-accent-100 p-4">
                <Briefcase size={32} className="text-accent-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold">For Project Providers</h3>
              <p className="mb-4 text-gray-600">
                Post open-source projects and find skilled developers.
                Select candidates based on their contributions to your project.
              </p>
              <Link
                to="/register"
                className="mt-auto inline-flex items-center text-accent-600 hover:text-accent-800"
              >
                Join as Provider <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
            Ready to Join Our Community?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600">
            Whether you're a developer looking to build your portfolio, a
            recruiter seeking talent, or a project provider looking for
            contributors, OpenHire has something for you.
          </p>
          <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              to="/register"
              className="btn rounded-md bg-primary-600 px-6 py-3 text-white hover:bg-primary-700"
            >
              Sign Up Now
            </Link>
            <Link
              to="/projects"
              className="btn rounded-md border border-gray-300 bg-white px-6 py-3 text-gray-800 hover:bg-gray-50"
            >
              Browse Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;