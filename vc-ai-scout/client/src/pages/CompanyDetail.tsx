```
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { companies } from '../data/companies';
import SaveToListModal from '../components/SaveToListModal';

const CompanyDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const company = companies.find((c) => c.id === id);

    const [notes, setNotes] = useState(() => {
        return localStorage.getItem(`company_notes_${ id } `) || '';
    });

    const [isSaving, setIsSaving] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem(`company_notes_${ id } `, notes);
    }, [id, notes]);

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

    const handleEnrich = () => {
        setIsSaving(true);
        // Simulate enrichment process
        setTimeout(() => {
            setIsSaving(false);
            alert('Enrichment process started! Check back soon for results.');
        }, 1500);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/companies')}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                        <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:underline text-sm font-medium"
                        >
                            {company.website.replace(/^https?:\/\//, '')}
                        </a>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                        Save to List
                    </button>
                    <button
                        onClick={handleEnrich}
                        disabled={isSaving}
                        className={`px - 4 py - 2 bg - indigo - 600 text - white rounded - md text - sm font - medium hover: bg - indigo - 700 transition - colors flex items - center ${ isSaving ? 'opacity-75 cursor-not-allowed' : '' } `}
                    >
                        {isSaving ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Enriching...
                            </>
                        ) : 'Enrich'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info Card */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                        <p className="text-gray-700 leading-relaxed mb-6">{company.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Industry</p>
                                <p className="text-sm font-medium text-gray-900 mt-1">{company.industry}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Stage</p>
                                <p className="text-sm font-medium text-gray-900 mt-1">{company.stage}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Location</p>
                                <p className="text-sm font-medium text-gray-900 mt-1">{company.location}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Founded</p>
                                <p className="text-sm font-medium text-gray-900 mt-1">{company.foundedYear}</p>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-3">Tags</p>
                            <div className="flex flex-wrap gap-2">
                                {company.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrichment Results</h3>
                        <div className="border-2 border-dashed border-gray-100 rounded-lg py-12 flex flex-col items-center justify-center text-gray-400">
                            <svg className="h-10 w-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <p className="text-sm">Click "Enrich" to gather more data on {company.name}</p>
                        </div>
                    </div>
                </div>

                {/* Notes Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Internal Notes</h3>
                        <textarea
                            className="w-full h-48 p-3 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Add your notes about this company..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <p className="mt-2 text-xs text-gray-400">Changes are automatically saved to your browser.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetail;
