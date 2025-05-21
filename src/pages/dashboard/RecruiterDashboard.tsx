import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { fetchUsers } from '../../lib/mockData';
import { Search, Filter } from 'lucide-react';
import SkillBadge from '../../components/ui/SkillBadge';

interface RecruiterDashboardProps {
  projects: Project[];
}

interface FreelancerData {
  id: string;
  name: string;
  skills: string[];
  contributions: any[];
}

const RecruiterDashboard = ({ projects }: RecruiterDashboardProps) => {
  const [freelancers, setFreelancers] = useState<FreelancerData[]>([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState<FreelancerData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [allSkills, setAllSkills] = useState<string[]>([]);

  useEffect(() => {
    const loadFreelancers = async () => {
      try {
        const allUsers = await fetchUsers();
        const freelancerUsers = allUsers.filter(
          (user: any) => user.role === 'freelancer'
        );
        
        // Transform into the format we need
        const transformedFreelancers = freelancerUsers.map((user: any) => ({
          id: user.id,
          name: user.name,
          skills: user.skills || [],
          contributions: user.contributions || []
        }));
        
        setFreelancers(transformedFreelancers);
        setFilteredFreelancers(transformedFreelancers);
        
        // Extract all unique skills
        const skills = transformedFreelancers.flatMap(f => f.skills);
        const uniqueSkills = Array.from(new Set(skills));
        setAllSkills(uniqueSkills);
      } catch (error) {
        console.error('Failed to load freelancers:', error);
      }
    };

    loadFreelancers();
  }, []);

  useEffect(() => {
    // Filter freelancers based on search term and selected skills
    const filtered = freelancers.filter(freelancer => {
      const matchesSearch = 
        searchTerm === '' || 
        freelancer.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSkills = 
        selectedSkills.length === 0 || 
        selectedSkills.some(skill => freelancer.skills.includes(skill));
      
      return matchesSearch && matchesSkills;
    });
    
    setFilteredFreelancers(filtered);
  }, [searchTerm, selectedSkills, freelancers]);

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

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Find Talented Developers</h2>
        <p className="text-gray-600">
          Discover developers based on their skills and contributions
        </p>
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
              placeholder="Search freelancers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center text-sm text-gray-600">
              <Filter size={16} className="mr-1" /> Filter by skill:
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

      {/* Freelancers Grid */}
      {filteredFreelancers.length === 0 ? (
        <div className="rounded-lg bg-white p-6 text-center shadow">
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            No freelancers found
          </h3>
          <p className="text-gray-600">
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
          {filteredFreelancers.map((freelancer) => (
            <div key={freelancer.id} className="card">
              <h3 className="text-lg font-semibold text-gray-900">
                {freelancer.name}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {freelancer.skills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">
                  Contributions: {freelancer.contributions.length}
                </p>
                {freelancer.contributions.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      Latest:{' '}
                      {freelancer.contributions[0].description.substring(0, 60)}
                      {freelancer.contributions[0].description.length > 60 && '...'}
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <button className="btn-primary btn">Contact</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Suggestions */}
      <div className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">
          Latest Open-Source Projects
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="card">
              <h3 className="text-lg font-semibold text-gray-900">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                by {project.providerName}
              </p>
              <p className="mt-2 line-clamp-2 text-gray-600">
                {project.description}
              </p>
              <Link
                to={`/projects/${project.id}`}
                className="mt-4 text-sm font-medium text-primary-600 hover:text-primary-800"
              >
                View Project →
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link
            to="/projects"
            className="btn-secondary btn inline-block"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;