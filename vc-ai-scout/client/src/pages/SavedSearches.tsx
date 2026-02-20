import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SavedSearch {
    id: string;
    name: string;
    filters: {
        searchTerm: string;
        industryFilter: string;
        stageFilter: string;
    };
    timestamp: string;
}

const SavedSearches = () => {
    const navigate = useNavigate();
    const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('vc_scout_saved_searches');
        if (saved) {
            setSavedSearches(JSON.parse(saved));
        }
    }, []);

    const handleDelete = (id: string) => {
        if (window.confirm('Delete this saved search?')) {
            const updated = savedSearches.filter(s => s.id !== id);
            setSavedSearches(updated);
            localStorage.setItem('vc_scout_saved_searches', JSON.stringify(updated));
        }
    };

    const handleRun = (search: SavedSearch) => {
        const params = new URLSearchParams();
        if (search.filters.searchTerm) params.set('q', search.filters.searchTerm);
        if (search.filters.industryFilter) params.set('industry', search.filters.industryFilter);
        if (search.filters.stageFilter) params.set('stage', search.filters.stageFilter);

        navigate(`/companies?${params.toString()}`);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Saved Searches</h1>
                <p className="text-sm text-gray-500 mt-1">Re-run your favorite discovery filters with one click.</p>
            </div>

            {savedSearches.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-lg py-12 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No saved searches</h3>
                    <p className="mt-1 text-sm text-gray-500">Go to the Companies page and click "Save Current View" to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedSearches.map(search => (
                        <div key={search.id} className="bg-white shadow rounded-lg p-6 border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-bold text-gray-900">{search.name}</h3>
                                <button
                                    onClick={() => handleDelete(search.id)}
                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Search:</span>
                                    <span className="text-gray-700 font-medium">{search.filters.searchTerm || 'None'}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Industry:</span>
                                    <span className="text-gray-700 font-medium">{search.filters.industryFilter || 'All'}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Stage:</span>
                                    <span className="text-gray-700 font-medium">{search.filters.stageFilter || 'All'}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleRun(search)}
                                className="w-full text-sm font-semibold py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center"
                            >
                                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Run Search
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedSearches;
