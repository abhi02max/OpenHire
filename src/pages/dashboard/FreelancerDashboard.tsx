import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Contribution } from '../../types';
import { Calendar, CheckSquare } from 'lucide-react';
import { format } from 'date-fns';

interface ContributedProject {
  contributionId: string;
  contributionDesc: string;
  contributionDate: Date;
  project: any; // Using any here since it's a mix of project fields
}

interface FreelancerDashboardProps {
  contributions: Contribution[];
  contributedProjects: ContributedProject[];
}

const FreelancerDashboard = ({ contributions, contributedProjects }: FreelancerDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'contributions'>('projects');

  return (
    <div>
      <div className="mb-6 flex border-b border-gray-200">
        <button
          className={`mr-4 border-b-2 px-4 py-2 font-medium ${
            activeTab === 'projects'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`mr-4 border-b-2 px-4 py-2 font-medium ${
            activeTab === 'contributions'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('contributions')}
        >
          Contributions
        </button>
      </div>

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="animate-slide-down">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Projects You've Contributed To
            </h2>
          </div>

          {contributedProjects.length === 0 ? (
            <div className="rounded-lg bg-white p-6 text-center shadow">
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                No projects yet
              </h3>
              <p className="text-gray-600">
                You haven't contributed to any projects yet.
              </p>
              <Link to="/projects" className="btn-primary btn mt-4">
                Find Projects
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {contributedProjects.map((item) => (
                <div key={item.contributionId} className="card">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.project?.title || 'Untitled Project'}
                  </h3>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>
                      Contributed on{' '}
                      {format(new Date(item.contributionDate), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    <strong>Your contribution:</strong> {item.contributionDesc}
                  </p>
                  <div className="mt-4">
                    {item.project && (
                      <Link
                        to={`/projects/${item.project.id}`}
                        className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800"
                      >
                        View Project →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Contributions Tab */}
      {activeTab === 'contributions' && (
        <div className="animate-slide-down">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Contributions</h2>
          </div>

          {contributions.length === 0 ? (
            <div className="rounded-lg bg-white p-6 text-center shadow">
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                No contributions yet
              </h3>
              <p className="text-gray-600">
                You haven't made any contributions yet.
              </p>
              <Link to="/projects" className="btn-primary btn mt-4">
                Find Projects
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {contributions.map((contribution) => (
                <div
                  key={contribution.id}
                  className="rounded-lg bg-white p-4 shadow transition-all hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <CheckSquare
                      size={20}
                      className="flex-shrink-0 text-success-500"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {contribution.projectTitle}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {format(new Date(contribution.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 pl-8 text-gray-700">
                    {contribution.description}
                  </p>
                  <div className="mt-2 pl-8">
                    <Link
                      to={`/projects/${contribution.projectId}`}
                      className="text-sm font-medium text-primary-600 hover:text-primary-800"
                    >
                      View Project →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FreelancerDashboard;