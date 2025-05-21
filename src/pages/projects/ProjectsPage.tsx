import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';
import { fetchProjects } from '../../lib/mockData';
import { Project } from '../../types';
import SkillBadge from '../../components/ui/SkillBadge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [allSkills, setAllSkills] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
        setFilteredProjects(data);
        
        // Extract all unique skills from projects
        const skills = data.flatMap(project => project.requiredSkills);
        const uniqueSkills = Array.from(new Set(skills));
        setAllSkills(uniqueSkills);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    // Filter projects based on search term and selected skills
    const filtered = projects.filter(project => {
      const matchesSearch = 
        searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSkills = 
        selectedSkills.length === 0 || 
        selectedSkills.some(skill => project.requiredSkills.includes(skill));
      
      return matchesSearch && matchesSkills;
    });
    
    setFilteredProjects(filtered);
  }, [searchTerm, selectedSkills, projects]);

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSkills([]);
  };

  const canCreateProject = user?.role === 'provider';

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="mt-1 text-gray-600">
            Browse open-source projects and start contributing
          </p>
        </div>
        {canCreateProject && (
          <Link
            to="/dashboard"
            className="btn-primary btn flex items-center self-start"
          >
            <Plus size={18} className="mr-2" />
            Create Project
          </Link>
        )}
      </div>

      {/* Search and Filter */}
      <div className="mb-8 rounded-lg bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-grow md:max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center text-sm text-gray-600">
              <Filter size={16} className="mr-1" /> Filter by:
            </span>
            <div className="flex flex-wrap gap-2">
              {allSkills.slice(0, 5).map((skill) => (
                <SkillBadge
                  key={skill}
                  skill={skill}
                  variant={selectedSkills.includes(skill) ? 'primary' : 'secondary'}
                  onClick={() => toggleSkillFilter(skill)}
                />
              ))}
              {selectedSkills.length > 0 && (
                <button
                  className="text-sm text-primary-600 hover:text-primary-800"
                  onClick={clearFilters}
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="mt-8 rounded-lg bg-gray-50 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
          <p className="mt-2 text-gray-600">
            Try adjusting your search or filter criteria
          </p>
          {selectedSkills.length > 0 && (
            <button
              className="mt-4 text-primary-600 hover:text-primary-800"
              onClick={clearFilters}
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div key={project.id} className="card group">
              <h3 className="text-xl font-semibold text-gray-900">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Posted by {project.providerName}
              </p>
              <p className="mt-3 line-clamp-3 text-gray-600">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.requiredSkills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
                <Link
                  to={`/projects/${project.id}`}
                  className="text-sm font-medium text-primary-600 hover:text-primary-800"
                >
                  View Project →
                </Link>
                <span className="text-xs text-gray-500">
                  {project.contributions.length} contributions
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;