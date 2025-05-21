import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-6xl font-bold text-primary-600">404</h1>
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-md text-gray-600">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="btn-primary btn inline-flex items-center"
      >
        <Home size={18} className="mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;