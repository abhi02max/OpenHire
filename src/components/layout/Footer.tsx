import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Globe size={24} className="text-primary-400" />
              <span className="text-xl font-bold text-white">OpenHire</span>
            </Link>
            <p className="mt-4 text-sm">
              Connecting freelancers, recruiters, and project providers through
              open-source contributions.
            </p>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Contribution Guidelines
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Subscribe to Our Newsletter
            </h3>
            <p className="mb-4 text-sm">
              Stay updated with the latest projects and community news.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-md border-gray-700 bg-gray-800 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="rounded-r-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} OpenHire. All rights reserved.
            Licensed under the{' '}
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              MIT License
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;