import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRound, UserPlus } from 'lucide-react';
import { UserRole } from '../../types';

interface RegisterFormData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  skills: string;
  company: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      role: 'freelancer',
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const userData = {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
        skills: data.role === 'freelancer' ? data.skills.split(',').map(s => s.trim()) : undefined,
        company: data.role === 'recruiter' || data.role === 'provider' ? data.company : undefined,
      };

      await registerUser(userData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md animate-fade-in">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Create Your OpenHire Account
          </h1>
          <p className="mt-2 text-gray-600">
            Join our community of freelancers, recruiters, and project providers
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-error-50 p-4 text-error-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`input ${errors.email ? 'border-error-500' : ''}`}
              placeholder="your@email.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`input ${errors.password ? 'border-error-500' : ''}`}
              placeholder="••••••••"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="label">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className={`input ${errors.name ? 'border-error-500' : ''}`}
              placeholder="John Doe"
              {...register('name', {
                required: 'Name is required',
              })}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="label">
              I am a
            </label>
            <select
              id="role"
              className={`input ${errors.role ? 'border-error-500' : ''}`}
              {...register('role', {
                required: 'Role is required',
              })}
              disabled={isLoading}
            >
              <option value="freelancer">Freelancer (Developer)</option>
              <option value="recruiter">Recruiter</option>
              <option value="provider">Project Provider</option>
            </select>
            {errors.role && (
              <p className="error-message">{errors.role.message}</p>
            )}
          </div>

          {selectedRole === 'freelancer' && (
            <div className="mb-4">
              <label htmlFor="skills" className="label">
                Skills (comma separated)
              </label>
              <input
                id="skills"
                type="text"
                className={`input ${errors.skills ? 'border-error-500' : ''}`}
                placeholder="JavaScript, React, Node.js"
                {...register('skills', {
                  required: 'Skills are required for freelancers',
                })}
                disabled={isLoading}
              />
              {errors.skills && (
                <p className="error-message">{errors.skills.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                List technologies and frameworks you're skilled in
              </p>
            </div>
          )}

          {(selectedRole === 'recruiter' || selectedRole === 'provider') && (
            <div className="mb-4">
              <label htmlFor="company" className="label">
                Company Name
              </label>
              <input
                id="company"
                type="text"
                className={`input ${errors.company ? 'border-error-500' : ''}`}
                placeholder="Acme Inc."
                {...register('company', {
                  required:
                    'Company name is required for recruiters and providers',
                })}
                disabled={isLoading}
              />
              {errors.company && (
                <p className="error-message">{errors.company.message}</p>
              )}
            </div>
          )}

          <div className="mb-4">
            <button
              type="submit"
              className="btn-primary btn w-full py-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
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
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <UserPlus className="mr-2 h-4 w-4" /> Create Account
                </span>
              )}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;