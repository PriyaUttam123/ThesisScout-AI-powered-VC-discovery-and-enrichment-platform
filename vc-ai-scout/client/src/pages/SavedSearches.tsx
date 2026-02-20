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

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Delete this saved view?')) {
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
        <div className="space-y-10 pb-20">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Saved Views</h2>
                <p className="text-base text-gray-500 mt-1 font-medium">Instantly return to your most effective discovery filter combinations.</p>
            </div>

            {savedSearches.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-2xl py-24 text-center shadow-sm">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl mx-auto flex items-center justify-center mb-6">
                        <svg className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No saved views yet</h3>
                    <p className="mt-2 text-base text-gray-500 max-w-xs mx-auto font-medium leading-relaxed">Filter startups on the Discovery page and click "Save View" to populate this gallery.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {savedSearches.map(search => (
                        <div
                            key={search.id}
                            onClick={() => handleRun(search)}
                            className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300 cursor-pointer flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{search.name}</h3>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
                                        Created {new Date(search.timestamp).toLocaleDateString()}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => handleDelete(search.id, e)}
                                    className="p-2 text-gray-200 hover:text-red-500 transition-colors hover:bg-red-50 rounded-lg"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-3 mb-8 flex-1">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 opacity-60">Visual Parameters</p>
                                <div className="flex flex-wrap gap-2 text-sm font-bold">
                                    {search.filters.searchTerm ? (
                                        <span className="bg-gray-50 text-gray-600 px-2.5 py-1 rounded-lg border border-gray-100">"{search.filters.searchTerm}"</span>
                                    ) : (
                                        <span className="bg-gray-50 text-gray-300 px-2.5 py-1 rounded-lg border border-gray-100 italic">No Keyword</span>
                                    )}
                                    {search.filters.industryFilter && (
                                        <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg border border-blue-100">{search.filters.industryFilter}</span>
                                    )}
                                    {search.filters.stageFilter && (
                                        <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg border border-indigo-100">{search.filters.stageFilter}</span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-auto group-hover:translate-x-1 transition-transform inline-flex items-center text-blue-600 text-base font-bold tracking-tight">
                                Launch Discovery View
                                <svg className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedSearches;
