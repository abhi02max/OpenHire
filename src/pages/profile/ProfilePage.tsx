import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';
import { Save, User, CheckCircle, AlertTriangle } from 'lucide-react';
import SkillBadge from '../../components/ui/SkillBadge';

interface ProfileFormData {
  name: string;
  skills: string;
  company: string;
  bio: string;
}

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      skills: user?.skills?.join(', ') || '',
      company: user?.company || '',
      bio: user?.bio || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedData: any = {
        name: data.name,
        bio: data.bio,
      };

      if (user.role === 'freelancer') {
        updatedData.skills = data.skills
          .split(',')
          .map((skill) => skill.trim())
          .filter((skill) => skill !== '');
      } else if (user.role === 'recruiter' || user.role === 'provider') {
        updatedData.company = data.company;
      }

      await updateUser(updatedData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow-md">
        <h2 className="text-xl font-semibold text-gray-900">
          Authentication Required
        </h2>
        <p className="mt-2 text-gray-600">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Your Profile</h1>

      {error && (
        <div className="mb-6 flex items-center rounded-md bg-error-50 p-4 text-error-800">
          <AlertTriangle size={20} className="mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 flex items-center rounded-md bg-success-50 p-4 text-success-800">
          <CheckCircle size={20} className="mr-2 flex-shrink-0" />
          <p>{success}</p>
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-3">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-6 flex justify-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-full bg-primary-100 text-primary-600">
                <User className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform" />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.role}</p>
              {user.company && (
                <p className="mt-1 text-gray-600">{user.company}</p>
              )}
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Member since{' '}
                {format(new Date(user.createdAt), 'MMMM d, yyyy')}
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-primary btn w-full"
              >
                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="md:col-span-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="mb-6 text-xl font-semibold text-gray-900">
                  Edit Profile
                </h2>

                <div className="mb-4">
                  <label htmlFor="name" className="label">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`input ${errors.name ? 'border-error-500' : ''}`}
                    {...register('name', { required: 'Name is required' })}
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <p className="error-message">{errors.name.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="bio" className="label">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    className={`input min-h-[100px] ${
                      errors.bio ? 'border-error-500' : ''
                    }`}
                    placeholder="Tell us about yourself"
                    {...register('bio')}
                    disabled={isLoading}
                  ></textarea>
                </div>

                {user.role === 'freelancer' && (
                  <div className="mb-4">
                    <label htmlFor="skills" className="label">
                      Skills (comma separated)
                    </label>
                    <input
                      id="skills"
                      type="text"
                      className={`input ${
                        errors.skills ? 'border-error-500' : ''
                      }`}
                      placeholder="JavaScript, React, Node.js"
                      {...register('skills', {
                        required: 'Skills are required for freelancers',
                      })}
                      disabled={isLoading}
                    />
                    {errors.skills && (
                      <p className="error-message">{errors.skills.message}</p>
                    )}
                  </div>
                )}

                {(user.role === 'recruiter' || user.role === 'provider') && (
                  <div className="mb-4">
                    <label htmlFor="company" className="label">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      className={`input ${
                        errors.company ? 'border-error-500' : ''
                      }`}
                      {...register('company', {
                        required:
                          'Company is required for recruiters and providers',
                      })}
                      disabled={isLoading}
                    />
                    {errors.company && (
                      <p className="error-message">{errors.company.message}</p>
                    )}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn-success btn flex items-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </span>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="mb-6 text-xl font-semibold text-gray-900">
                  Profile Information
                </h2>

                <div className="mb-6">
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    About
                  </h3>
                  <p className="text-gray-700">
                    {user.bio || 'No bio provided yet.'}
                  </p>
                </div>

                {user.role === 'freelancer' && user.skills && (
                  <div className="mb-6">
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill) => (
                        <SkillBadge key={skill} skill={skill} />
                      ))}
                    </div>
                  </div>
                )}

                {user.contributions && user.contributions.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                      Contributions
                    </h3>
                    <div className="space-y-4">
                      {user.contributions.map((contribution) => (
                        <div
                          key={contribution.id}
                          className="rounded-md border border-gray-200 p-4"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-medium text-gray-900">
                              {contribution.projectTitle}
                            </span>
                            <span className="text-sm text-gray-500">
                              {format(
                                new Date(contribution.createdAt),
                                'MMM d, yyyy'
                              )}
                            </span>
                          </div>
                          <p className="text-gray-700">
                            {contribution.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;