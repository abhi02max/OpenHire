import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Clock, User, ArrowRight } from 'lucide-react';
import { fetchProjectById, fetchContributionsByProjectId, createContribution } from '../../lib/mockData';
import { Project, Contribution } from '../../types';
import SkillBadge from '../../components/ui/SkillBadge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contributionText, setContributionText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;
      
      try {
        const projectData = await fetchProjectById(id);
        if (projectData) {
          setProject(projectData);
          const contributionsData = await fetchContributionsByProjectId(id);
          setContributions(contributionsData);
        }
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [id]);

  const handleContribution = async () => {
    if (!user || !project) return;
    
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    
    try {
      if (!contributionText.trim()) {
        throw new Error('Please describe your contribution');
      }
      
      const newContribution = await createContribution({
        userId: user.id,
        userName: user.name,
        projectId: project.id,
        projectTitle: project.title,
        description: contributionText
      });
      
      setContributions(prev => [newContribution, ...prev]);
      setContributionText('');
      setSuccessMessage('Contribution added successfully!');
      
      // Update project in state with new contribution
      setProject(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          contributions: [...prev.contributions, newContribution]
        };
      });
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to add contribution');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApply = () => {
    alert('Application submitted successfully!');
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow-md">
        <h2 className="text-xl font-semibold text-gray-900">Project Not Found</h2>
        <p className="mt-2 text-gray-600">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/projects"
          className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-800"
        >
          <ChevronLeft size={16} className="mr-1" /> Back to Projects
        </Link>
      </div>
    );
  }

  const isFreelancer = user?.role === 'freelancer';
  const canApply = isAuthenticated && isFreelancer;
  const canContribute = isAuthenticated && isFreelancer;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <Link
          to="/projects"
          className="inline-flex items-center text-primary-600 hover:text-primary-800"
        >
          <ChevronLeft size={16} className="mr-1" /> Back to Projects
        </Link>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {project.title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
            <span className="flex items-center">
              <User size={16} className="mr-1" /> {project.providerName}
            </span>
            <span className="flex items-center">
              <Clock size={16} className="mr-1" /> Posted {format(new Date(project.createdAt), 'MMM d, yyyy')}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">Description</h2>
          <p className="whitespace-pre-line text-gray-700">{project.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {project.requiredSkills.map((skill) => (
              <SkillBadge key={skill} skill={skill} />
            ))}
          </div>
        </div>

        {canApply && (
          <div className="mb-8 rounded-md bg-primary-50 p-4">
            <h2 className="mb-2 text-lg font-semibold text-primary-900">
              Interested in this project?
            </h2>
            <p className="mb-4 text-primary-700">
              Apply now to express your interest in contributing to this project.
            </p>
            <button
              onClick={handleApply}
              className="btn-primary btn flex items-center"
            >
              Apply Now <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        )}

        {canContribute && (
          <div className="mb-8 rounded-md border border-gray-200 p-4">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Add Your Contribution
            </h2>
            
            {errorMessage && (
              <div className="mb-4 rounded-md bg-error-50 p-3 text-error-800">
                {errorMessage}
              </div>
            )}
            
            {successMessage && (
              <div className="mb-4 rounded-md bg-success-50 p-3 text-success-800">
                {successMessage}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="contribution" className="label">
                Describe your contribution
              </label>
              <textarea
                id="contribution"
                className="input min-h-[100px]"
                placeholder="E.g., Fixed login bug, Added responsive design for mobile..."
                value={contributionText}
                onChange={(e) => setContributionText(e.target.value)}
                disabled={isSubmitting}
              ></textarea>
            </div>
            <button
              onClick={handleContribution}
              className="btn-success btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Contribution'}
            </button>
          </div>
        )}

        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Contributions ({contributions.length})
          </h2>
          
          {contributions.length === 0 ? (
            <div className="rounded-md bg-gray-50 p-6 text-center">
              <p className="text-gray-600">No contributions yet.</p>
              {canContribute && (
                <p className="mt-2 text-gray-600">
                  Be the first to contribute to this project!
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {contributions.map((contribution) => (
                <div
                  key={contribution.id}
                  className="rounded-md border border-gray-200 p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      {contribution.userName}
                    </span>
                    <span className="text-sm text-gray-500">
                      {format(new Date(contribution.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p className="text-gray-700">{contribution.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;