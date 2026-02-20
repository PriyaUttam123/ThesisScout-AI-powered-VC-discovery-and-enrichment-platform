import React, { useState, useEffect } from 'react';
import { companies } from '../data/companies';

interface List {
    id: string;
    name: string;
    companyIds: string[];
}

interface SaveToListModalProps {
    isOpen: boolean;
    onClose: () => void;
    companyId: string;
}

const SaveToListModal: React.FC<SaveToListModalProps> = ({ isOpen, onClose, companyId }) => {
    const [lists, setLists] = useState<List[]>([]);
    const [newListName, setNewListName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        const savedLists = localStorage.getItem('vc_scout_lists');
        if (savedLists) {
            setLists(JSON.parse(savedLists));
        }
    }, [isOpen]);

    const saveLists = (updatedLists: List[]) => {
        setLists(updatedLists);
        localStorage.setItem('vc_scout_lists', JSON.stringify(updatedLists));
    };

    const createList = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newListName.trim()) return;

        const newList: List = {
            id: Date.now().toString(),
            name: newListName.trim(),
            companyIds: [],
        };

        saveLists([...lists, newList]);
        setNewListName('');
        setIsCreating(false);
    };

    const toggleCompanyInList = (listId: string) => {
        const updatedLists = lists.map((list) => {
            if (list.id === listId) {
                const isIncluded = list.companyIds.includes(companyId);
                return {
                    ...list,
                    companyIds: isIncluded
                        ? list.companyIds.filter((id) => id !== companyId)
                        : [...list.companyIds, companyId],
                };
            }
            return list;
        });
        saveLists(updatedLists);
    };

    const company = companies.find(c => c.id === companyId);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                                    Save {company?.name} to List
                                </h3>

                                <div className="mt-4 space-y-2 max-h-60 overflow-y-auto pr-2">
                                    {lists.length === 0 && !isCreating && (
                                        <p className="text-sm text-gray-500 italic">No lists created yet.</p>
                                    )}
                                    {lists.map((list) => (
                                        <div
                                            key={list.id}
                                            className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="text-sm font-medium text-gray-700">{list.name}</span>
                                            <button
                                                onClick={() => toggleCompanyInList(list.id)}
                                                className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${list.companyIds.includes(companyId)
                                                        ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {list.companyIds.includes(companyId) ? 'Remove' : 'Add'}
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    {!isCreating ? (
                                        <button
                                            onClick={() => setIsCreating(true)}
                                            className="text-sm text-indigo-600 font-medium hover:text-indigo-500 flex items-center"
                                        >
                                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Create new list
                                        </button>
                                    ) : (
                                        <form onSubmit={createList} className="flex space-x-2">
                                            <input
                                                type="text"
                                                autoFocus
                                                placeholder="List name..."
                                                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                value={newListName}
                                                onChange={(e) => setNewListName(e.target.value)}
                                            />
                                            <button
                                                type="submit"
                                                className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                                            >
                                                Create
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsCreating(false)}
                                                className="px-3 py-1.5 text-gray-600 hover:text-gray-900 text-sm font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaveToListModal;
