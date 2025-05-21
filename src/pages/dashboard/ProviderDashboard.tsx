import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { format } from 'date-fns';
import { ArrowUpRight, Users, Code } from 'lucide-react';

interface ProviderDashboardProps {
  projects: Project[];
}

const ProviderDashboard = ({ projects }: ProviderDashboardProps) => {
  return (
    <div>
      {projects.length === 0 ? (
        <div className="rounded-lg bg-white p-8 text-center shadow-md">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">
            No Projects Yet
          </h3>
          <p className="mb-6 text-gray-600">
            You haven't created any projects yet. Start by creating your first
            project.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-primary btn"
          >
            Create Your First Project
          </button>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-medium text-gray-500">
                Total Projects
              </h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {projects.length}
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-medium text-gray-500">
                Active Projects
              </h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {projects.filter((p) => p.status === 'active').length}
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-medium text-gray-500">
                Total Contributions
              </h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {projects.reduce(
                  (sum, project) => sum + project.contributions.length,
                  0
                )}
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-medium text-gray-500">
                Completed Projects
              </h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {projects.filter((p) => p.status === 'completed').length}
              </p>
            </div>
          </div>

          {/* Project List */}
          <h2 className="mb-4 text-xl font-semibold">Your Projects</h2>
          <div className="rounded-lg bg-white shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b bg-gray-50 text-sm uppercase text-gray-700">
                  <tr>
                    <th className="px-6 py-3">Project</th>
                    <th className="px-6 py-3">Created</th>
                    <th className="px-6 py-3">Contributions</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {project.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {project.requiredSkills.slice(0, 2).join(', ')}
                          {project.requiredSkills.length > 2 && '...'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {format(new Date(project.createdAt), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Code size={16} className="mr-2 text-gray-400" />
                          <span>{project.contributions.length}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            project.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {project.status.charAt(0).toUpperCase() +
                            project.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/projects/${project.id}`}
                          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800"
                        >
                          View <ArrowUpRight size={14} className="ml-1" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Contributions */}
          <h2 className="mb-4 mt-8 text-xl font-semibold">
            Recent Contributions
          </h2>
          {projects.some((p) => p.contributions.length > 0) ? (
            <div className="space-y-4">
              {projects
                .flatMap((project) =>
                  project.contributions.map((contribution) => ({
                    ...contribution,
                    projectTitle: project.title,
                  }))
                )
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .slice(0, 5)
                .map((contribution) => (
                  <div
                    key={contribution.id}
                    className="rounded-lg bg-white p-4 shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">
                          {contribution.userName}
                        </span>{' '}
                        contributed to{' '}
                        <span className="font-medium">
                          {contribution.projectTitle}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {format(new Date(contribution.createdAt), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">
                      {contribution.description}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <div className="rounded-lg bg-white p-6 text-center shadow">
              <div className="mb-4 flex justify-center">
                <Users size={48} className="text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                No contributions yet
              </h3>
              <p className="text-gray-600">
                Your projects haven't received any contributions yet.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProviderDashboard;