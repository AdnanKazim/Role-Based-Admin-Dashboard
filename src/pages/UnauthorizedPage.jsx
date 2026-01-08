import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
            <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Unauthorized Access</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                You do not have permission to view this page.
            </p>
            <Link
                to="/dashboard"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
                Go Back Home
            </Link>
        </div>
    );
}
