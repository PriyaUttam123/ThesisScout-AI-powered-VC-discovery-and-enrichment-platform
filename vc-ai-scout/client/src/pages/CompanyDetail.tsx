import { useParams, useNavigate } from 'react-router-dom';
import { companies } from '../data/companies';

const CompanyDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const company = companies.find((c) => c.id === id);

    if (!company) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900">Company not found</h2>
                <button
                    onClick={() => navigate('/companies')}
                    className="mt-4 text-indigo-600 hover:text-indigo-500 font-medium"
                >
                    Back to list
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => navigate('/companies')}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Description</h3>
                                <p className="mt-1 text-gray-900">{company.description}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Website</h3>
                                <a href={company.website} target="_blank" rel="noopener noreferrer" className="mt-1 text-indigo-600 hover:underline inline-block">
                                    {company.website}
                                </a>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Tags</h3>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {company.tags.map((tag) => (
                                        <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase">Industry</h4>
                                    <p className="text-gray-900 font-medium">{company.industry}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase">Stage</h4>
                                    <p className="text-gray-900 font-medium">{company.stage}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase">Location</h4>
                                    <p className="text-gray-900 font-medium">{company.location}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase">Founded</h4>
                                    <p className="text-gray-900 font-medium">{company.foundedYear}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetail;
