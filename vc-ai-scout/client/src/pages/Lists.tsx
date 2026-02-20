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
        if (window.confirm('Are you sure you want to delete this list?')) {
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Your Lists</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and export your curated company collections.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    Create New List
                </button>
            </div>

            {lists.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-lg py-12 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No lists</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new list for your startups.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lists.map(list => (
                        <div
                            key={list.id}
                            onClick={() => setSelectedListId(list.id === selectedListId ? null : list.id)}
                            className={`bg-white shadow rounded-lg p-6 cursor-pointer border-2 transition-all ${selectedListId === list.id ? 'border-indigo-500 ring-4 ring-indigo-50 shadow-md' : 'border-transparent hover:border-gray-200 shadow-sm'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{list.name}</h3>
                                    <p className="text-sm text-gray-400">{list.companyIds.length} companies</p>
                                </div>
                                <button
                                    onClick={(e) => handleDeleteList(list.id, e)}
                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex space-x-2 pt-4 border-t border-gray-50 mt-4">
                                <button
                                    onClick={(e) => { e.stopPropagation(); exportAsCSV(list); }}
                                    className="flex-1 text-xs font-semibold py-2 px-3 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 flex items-center justify-center"
                                >
                                    <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    CSV
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); exportAsJSON(list); }}
                                    className="flex-1 text-xs font-semibold py-2 px-3 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 flex items-center justify-center"
                                >
                                    <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    JSON
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Selected List Companies */}
            {selectedList && (
                <div className="mt-8 bg-white shadow rounded-lg overflow-hidden border-t-4 border-indigo-500 animate-fade-in">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-indigo-50/30">
                        <h3 className="text-lg font-bold text-gray-900">Companies in "{selectedList.name}"</h3>
                        <button
                            onClick={() => setSelectedListId(null)}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Close
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Industry</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {selectedList.companyIds.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
                                            No companies added to this list yet.
                                        </td>
                                    </tr>
                                ) : (
                                    selectedList.companyIds.map(id => {
                                        const company = companies.find(c => c.id === id);
                                        if (!company) return null;
                                        return (
                                            <tr key={id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{company.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.industry}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.location}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => removeCompanyFromList(selectedList.id, id)}
                                                        className="text-red-400 hover:text-red-600 transition-colors"
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
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" onClick={() => setIsCreateModalOpen(false)}>
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <form onSubmit={handleCreateList}>
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Create New List</h3>
                                <div>
                                    <label htmlFor="list-name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        id="list-name"
                                        autoFocus
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="e.g. AI Startups 2025"
                                        value={newListName}
                                        onChange={(e) => setNewListName(e.target.value)}
                                    />
                                </div>
                                <div className="mt-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Create
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
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
