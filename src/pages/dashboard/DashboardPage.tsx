import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  fetchProjects, 
  fetchContributionsByUserId, 
  createProject 
} from '../../lib/mockData';
import { Project, Contribution } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import FreelancerDashboard from './FreelancerDashboard';
import RecruiterDashboard from './RecruiterDashboard';
import ProviderDashboard from './ProviderDashboard';
import { AlertTriangle } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface NewProjectData {
  title: string;
  description: string;
  requiredSkills: string;
}

const DashboardPage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [userContributions, setUserContributions] = useState<Contribution[]>([]);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewProjectData>();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const projectsData = await fetchProjects();
        setProjects(projectsData);

        if (user?.role === 'freelancer' && user.id) {
          const contributionsData = await fetchContributionsByUserId(user.id);
          setUserContributions(contributionsData);
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadData();
    }
  }, [user]);

  const onSubmitProject = async (data: NewProjectData) => {
    if (!user) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const skillsArray = data.requiredSkills
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill !== '');

      const newProject = await createProject({
        title: data.title,
        description: data.description,
        requiredSkills: skillsArray,
        providerId: user.id,
        providerName: user.name,
        status: 'active',
      });

      setProjects((prev) => [newProject, ...prev]);
      setSuccess('Project created successfully!');
      reset();
      setShowNewProjectForm(false);
    } catch (err: any) {
      setError(err.message || 'Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow-md">
        <h2 className="text-xl font-semibold text-gray-900">
          Authentication Required
        </h2>
        <p className="mt-2 text-gray-600">
          Please log in to access your dashboard.
        </p>
        <Link
          to="/login"
          className="btn-primary btn mt-4"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // Filter projects based on user role
  const userProjects = user.role === 'provider' 
    ? projects.filter(project => project.providerId === user.id)
    : [];

  // For freelancers: get projects they've contributed to
  const contributedProjects = user.role === 'freelancer'
    ? userContributions.map(contribution => {
        const project = projects.find(p => p.id === contribution.projectId);
        return {
          contributionId: contribution.id,
          contributionDesc: contribution.description,
          contributionDate: contribution.createdAt,
          project: project
        };
      })
    : [];

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Welcome back, {user.name}!
          </p>
        </div>
        
        {user.role === 'provider' && (
          <button
            onClick={() => setShowNewProjectForm(!showNewProjectForm)}
            className="btn-primary btn self-start"
          >
            {showNewProjectForm ? 'Cancel' : 'Create New Project'}
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 flex items-center rounded-md bg-error-50 p-4 text-error-800">
          <AlertTriangle size={20} className="mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-md bg-success-50 p-4 text-success-800">
          {success}
        </div>
      )}

      {user.role === 'provider' && showNewProjectForm && (
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Create New Project
          </h2>
          <form onSubmit={handleSubmit(onSubmitProject)}>
            <div className="mb-4">
              <label htmlFor="title" className="label">
                Project Title
              </label>
              <input
                id="title"
                type="text"
                className={`input ${errors.title ? 'border-error-500' : ''}`}
                placeholder="E.g., E-commerce Website"
                {...register('title', { required: 'Title is required' })}
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="error-message">{errors.title.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="label">
                Project Description
              </label>
              <textarea
                id="description"
                className={`input min-h-[120px] ${
                  errors.description ? 'border-error-500' : ''
                }`}
                placeholder="Describe the project goals, features, and what you're looking for..."
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 50,
                    message: 'Description should be at least 50 characters',
                  },
                })}
                disabled={isSubmitting}
              ></textarea>
              {errors.description && (
                <p className="error-message">{errors.description.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="requiredSkills" className="label">
                Required Skills (comma separated)
              </label>
              <input
                id="requiredSkills"
                type="text"
                className={`input ${
                  errors.requiredSkills ? 'border-error-500' : ''
                }`}
                placeholder="E.g., React, Node.js, MongoDB"
                {...register('requiredSkills', {
                  required: 'Required skills are needed',
                })}
                disabled={isSubmitting}
              />
              {errors.requiredSkills && (
                <p className="error-message">
                  {errors.requiredSkills.message}
                </p>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="btn-success btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </button>
              <button
                type="button"
                className="btn-secondary btn"
                onClick={() => {
                  reset();
                  setShowNewProjectForm(false);
                }}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Role-specific dashboards */}
      {user.role === 'freelancer' && (
        <FreelancerDashboard 
          contributions={userContributions} 
          contributedProjects={contributedProjects} 
        />
      )}

      {user.role === 'recruiter' && (
        <RecruiterDashboard projects={projects} />
      )}

      {user.role === 'provider' && (
        <ProviderDashboard projects={userProjects} />
      )}
    </div>
  );
};

export default DashboardPage;