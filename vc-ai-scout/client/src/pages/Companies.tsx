import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { companies, Company } from '../data/companies';
import SaveToListModal from '../components/SaveToListModal';

const ITEMS_PER_PAGE = 5;

const Companies = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
    const [industryFilter, setIndustryFilter] = useState(searchParams.get('industry') || '');
    const [stageFilter, setStageFilter] = useState(searchParams.get('stage') || '');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Company; direction: 'asc' | 'desc' } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

    const [isSaveSearchModalOpen, setIsSaveSearchModalOpen] = useState(false);
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        const params: any = {};
        if (searchTerm) params.q = searchTerm;
        if (industryFilter) params.industry = industryFilter;
        if (stageFilter) params.stage = stageFilter;
        setSearchParams(params, { replace: true });
    }, [searchTerm, industryFilter, stageFilter]);

    const handleSaveSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchName.trim()) return;

        const savedSearches = JSON.parse(localStorage.getItem('vc_scout_saved_searches') || '[]');
        const newSearch = {
            id: Date.now().toString(),
            name: searchName.trim(),
            filters: {
                searchTerm,
                industryFilter,
                stageFilter
            },
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('vc_scout_saved_searches', JSON.stringify([...savedSearches, newSearch]));
        setSearchName('');
        setIsSaveSearchModalOpen(false);
        alert('Search saved successfully!');
    };

    const industries = useMemo(() => Array.from(new Set(companies.map(c => c.industry))).sort(), []);
    const stages = useMemo(() => Array.from(new Set(companies.map(c => c.stage))).sort(), []);

    const filteredCompanies = useMemo(() => {
        return companies
            .filter((company) => {
                const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesIndustry = industryFilter === '' || company.industry === industryFilter;
                const matchesStage = stageFilter === '' || company.stage === stageFilter;
                return matchesSearch && matchesIndustry && matchesStage;
            })
            .sort((a, b) => {
                if (!sortConfig) return 0;
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
    }, [searchTerm, industryFilter, stageFilter, sortConfig]);

    const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
    const paginatedCompanies = filteredCompanies.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const requestSort = (key: keyof Company) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleRowClick = (id: string) => {
        navigate(`/companies/${id}`);
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Discovery</h2>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Find and filter the next generation of industry leaders.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setIsSaveSearchModalOpen(true)}
                        className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50/50 rounded-xl hover:bg-blue-100 transition-all active:scale-95"
                    >
                        Save View
                    </button>
                    <div className="h-4 w-px bg-gray-200"></div>
                    <span className="text-sm font-bold text-gray-400 tabular-nums">{filteredCompanies.length} startups</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Search Startups</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Type to search..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        />
                        <svg className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Industry</label>
                    <select
                        className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none appearance-none"
                        value={industryFilter}
                        onChange={(e) => { setIndustryFilter(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">All Categories</option>
                        {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Funding Stage</label>
                    <select
                        className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none appearance-none"
                        value={stageFilter}
                        onChange={(e) => { setStageFilter(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">Any Stage</option>
                        {stages.map(stg => <option key={stg} value={stg}>{stg}</option>)}
                    </select>
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-50">
                        <thead className="bg-gray-50/50">
                            <tr>
                                {['name', 'industry', 'stage', 'location', 'foundedYear'].map((key) => (
                                    <th
                                        key={key}
                                        className="px-6 py-4 text-left cursor-pointer hover:bg-gray-100/50 transition-colors"
                                        onClick={() => requestSort(key as keyof Company)}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                {key === 'foundedYear' ? 'FOUNDED' : key.toUpperCase()}
                                            </span>
                                            {sortConfig?.key === key && (
                                                <span className="text-blue-500 text-xs">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                                <th className="px-6 py-4 text-right">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {paginatedCompanies.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center text-gray-400 italic">No startups match your criteria.</td>
                                </tr>
                            ) : (
                                paginatedCompanies.map((company) => (
                                    <tr
                                        key={company.id}
                                        onClick={() => handleRowClick(company.id)}
                                        className="hover:bg-blue-50/30 cursor-pointer transition-all duration-150 group"
                                    >
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-white border border-transparent group-hover:border-gray-100 transition-colors">
                                                    <span className="text-xs font-bold text-gray-400 group-hover:text-blue-600">{company.name[0]}</span>
                                                </div>
                                                <span className="text-sm font-semibold text-gray-900">{company.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">{company.industry}</td>
                                        <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">
                                            <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${company.stage.startsWith('Series') ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'
                                                }`}>
                                                {company.stage}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600 font-medium">{company.location}</td>
                                        <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-400 tabular-nums">{company.foundedYear}</td>
                                        <td className="px-6 py-5 whitespace-nowrap text-right">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedCompanyId(company.id);
                                                }}
                                                className="text-xs font-bold text-gray-400 hover:text-blue-600 bg-gray-50 group-hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all active:scale-95"
                                            >
                                                Add to List
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {filteredCompanies.length > 0 && (
                    <div className="bg-gray-50/30 px-6 py-4 flex items-center justify-between border-t border-gray-50">
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs text-gray-500 font-medium">
                                    Displaying <span className="text-gray-900 font-bold tabular-nums">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredCompanies.length)}</span> of <span className="text-gray-900 font-bold tabular-nums">{filteredCompanies.length}</span> results
                                </p>
                            </div>
                            <nav className="flex items-center space-x-1" aria-label="Pagination">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-all active:scale-95"
                                >
                                    ←
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-9 h-9 rounded-lg text-xs font-bold transition-all active:scale-95 ${currentPage === i + 1
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                            : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-all active:scale-95"
                                >
                                    →
                                </button>
                            </nav>
                        </div>
                    </div>
                )}
            </div>

            <SaveToListModal
                isOpen={!!selectedCompanyId}
                onClose={() => setSelectedCompanyId(null)}
                companyId={selectedCompanyId || ''}
            />

            {/* Save Search Modal */}
            {isSaveSearchModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsSaveSearchModalOpen(false)}></div>
                        <div className="bg-white rounded-2xl p-8 shadow-2xl transform transition-all max-w-md w-full z-10 border border-gray-100">
                            <form onSubmit={handleSaveSearch}>
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">Save View</h3>
                                    <p className="text-sm text-gray-500 mt-1 font-medium">Keep these filters for quick access later.</p>
                                </div>
                                <div className="bg-blue-50/50 p-4 rounded-xl mb-6 border border-blue-50">
                                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Active Filters</p>
                                    <div className="flex flex-wrap gap-2 text-xs font-semibold text-blue-700">
                                        {searchTerm && <span className="bg-white px-2 py-0.5 rounded border border-blue-100">"{searchTerm}"</span>}
                                        {industryFilter && <span className="bg-white px-2 py-0.5 rounded border border-blue-100">{industryFilter}</span>}
                                        {stageFilter && <span className="bg-white px-2 py-0.5 rounded border border-blue-100">{stageFilter}</span>}
                                        {!searchTerm && !industryFilter && !stageFilter && <span className="text-blue-400 italic font-normal">No active filters</span>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="search-name" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">View Name</label>
                                    <input
                                        type="text"
                                        id="search-name"
                                        autoFocus
                                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                        placeholder="e.g. AI Startups Q1"
                                        value={searchName}
                                        onChange={(e) => setSearchName(e.target.value)}
                                    />
                                </div>
                                <div className="mt-8 flex items-center justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsSaveSearchModalOpen(false)}
                                        className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                                    >
                                        Save Current View
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

export default Companies;
