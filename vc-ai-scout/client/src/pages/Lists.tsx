import { useState, useEffect } from 'react';
import { companies } from '../data/companies';

interface List {
    id: string;
    name: string;
    companyIds: string[];
}

const Lists = () => {
    const [lists, setLists] = useState<List[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [selectedListId, setSelectedListId] = useState<string | null>(null);

    useEffect(() => {
        const savedLists = localStorage.getItem('vc_scout_lists');
        if (savedLists) {
            setLists(JSON.parse(savedLists));
        }
    }, []);

    const saveLists = (updatedLists: List[]) => {
        setLists(updatedLists);
        localStorage.setItem('vc_scout_lists', JSON.stringify(updatedLists));
    };

    const handleCreateList = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newListName.trim()) return;

        const newList: List = {
            id: Date.now().toString(),
            name: newListName.trim(),
            companyIds: [],
        };

        saveLists([...lists, newList]);
        setNewListName('');
        setIsCreateModalOpen(false);
    };

    const handleDeleteList = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Delete this collection? This action cannot be undone.')) {
            const updatedLists = lists.filter(l => l.id !== id);
            saveLists(updatedLists);
            if (selectedListId === id) setSelectedListId(null);
        }
    };

    const removeCompanyFromList = (listId: string, companyId: string) => {
        const updatedLists = lists.map(l => {
            if (l.id === listId) {
                return { ...l, companyIds: l.companyIds.filter(id => id !== companyId) };
            }
            return l;
        });
        saveLists(updatedLists);
    };

    const exportAsJSON = (list: List) => {
        const listCompanies = companies.filter(c => list.companyIds.includes(c.id));
        const dataStr = JSON.stringify({ ...list, companies: listCompanies }, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', `${list.name.toLowerCase().replace(/\s+/g, '_')}.json`);
        linkElement.click();
    };

    const exportAsCSV = (list: List) => {
        const listCompanies = companies.filter(c => list.companyIds.includes(c.id));
        const headers = ['Name', 'Website', 'Industry', 'Stage', 'Location', 'Founded Year'];
        const rows = listCompanies.map(c => [
            c.name,
            c.website,
            c.industry,
            c.stage,
            c.location,
            c.foundedYear
        ].map(val => `"${val}"`).join(','));

        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', url);
        linkElement.setAttribute('download', `${list.name.toLowerCase().replace(/\s+/g, '_')}.csv`);
        linkElement.click();
        URL.revokeObjectURL(url);
    };

    const selectedList = lists.find(l => l.id === selectedListId);

    return (
        <div className="space-y-10 pb-20">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Portfolios</h2>
                    <p className="text-base text-gray-500 mt-1 font-medium">Organize and manage your targets into thematic collections.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-base font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                    New Collection
                </button>
            </div>

            {lists.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-2xl py-24 text-center shadow-sm">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl mx-auto flex items-center justify-center mb-6">
                        <svg className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Start your first portfolio</h3>
                    <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto font-medium leading-relaxed">Create a custom list to begin tracking and organizing your discovery targets.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {lists.map(list => (
                        <div
                            key={list.id}
                            onClick={() => setSelectedListId(list.id === selectedListId ? null : list.id)}
                            className={`group bg-white rounded-2xl p-8 cursor-pointer border transition-all duration-300 ${selectedListId === list.id
                                ? 'border-blue-200 ring-4 ring-blue-50/50 shadow-xl'
                                : 'border-gray-100 hover:border-gray-200 shadow-sm'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">{list.name}</h3>
                                    <div className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">
                                        <span className="tabular-nums">{list.companyIds.length}</span>
                                        <span className="ml-1.5 opacity-60">TARGETS</span>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => handleDeleteList(list.id, e)}
                                    className="p-2 text-gray-200 hover:text-red-500 transition-colors hover:bg-red-50 rounded-lg"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex gap-3 pt-6 border-t border-gray-50">
                                <button
                                    onClick={(e) => { e.stopPropagation(); exportAsCSV(list); }}
                                    className="flex-1 text-xs font-bold py-2 bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-100 rounded-lg flex items-center justify-center transition-all uppercase tracking-widest"
                                >
                                    CSV
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); exportAsJSON(list); }}
                                    className="flex-1 text-xs font-bold py-2 bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-100 rounded-lg flex items-center justify-center transition-all uppercase tracking-widest"
                                >
                                    JSON
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Selected List Companies */}
            {selectedList && (
                <div className="mt-12 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50 animate-fade-in translate-y-0 opacity-100 transition-all">
                    <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                        <div className="flex items-center space-x-3">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                            <h3 className="text-lg font-bold text-gray-900 tracking-tight">{selectedList.name} Contents</h3>
                        </div>
                        <button
                            onClick={() => setSelectedListId(null)}
                            className="text-xs font-bold text-gray-400 hover:text-gray-900 uppercase tracking-widest"
                        >
                            Collapse
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-50">
                            <thead className="bg-white">
                                <tr>
                                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Name</th>
                                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Industry</th>
                                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Location</th>
                                    <th className="px-8 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {selectedList.companyIds.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-16 text-center text-sm text-gray-400 italic">
                                            Portfolio is currently empty.
                                        </td>
                                    </tr>
                                ) : (
                                    selectedList.companyIds.map(id => {
                                        const company = companies.find(c => c.id === id);
                                        if (!company) return null;
                                        return (
                                            <tr key={id} className="hover:bg-blue-50/20 transition-colors group">
                                                <td className="px-8 py-5 whitespace-nowrap">
                                                    <span className="text-base font-semibold text-gray-900">{company.name}</span>
                                                </td>
                                                <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">{company.industry}</td>
                                                <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-500">{company.location}</td>
                                                <td className="px-8 py-5 whitespace-nowrap text-right">
                                                    <button
                                                        onClick={() => removeCompanyFromList(selectedList.id, id)}
                                                        className="text-xs font-bold text-gray-300 hover:text-red-500 uppercase tracking-widest transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCreateModalOpen(false)}></div>
                        <div className="bg-white rounded-2xl p-8 shadow-2xl transform transition-all max-w-md w-full z-10 border border-gray-100">
                            <form onSubmit={handleCreateList}>
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">New Collection</h3>
                                    <p className="text-sm text-gray-500 mt-1 font-medium">Group startups by industry, stage, or priority.</p>
                                </div>
                                <div>
                                    <label htmlFor="list-name" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Collection Name</label>
                                    <input
                                        type="text"
                                        id="list-name"
                                        autoFocus
                                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-base focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                        placeholder="e.g. Fintech Series A targets"
                                        value={newListName}
                                        onChange={(e) => setNewListName(e.target.value)}
                                    />
                                </div>
                                <div className="mt-8 flex items-center justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                                    >
                                        Create Collection
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Lists;
