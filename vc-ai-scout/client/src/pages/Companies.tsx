import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { companies, Company } from '../data/companies';
import SaveToListModal from '../components/SaveToListModal';

const ITEMS_PER_PAGE = 8;

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
        const query = searchParams.get('q') || '';
        setSearchTerm(query);
    }, [searchParams]);

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
                const aValue = a[sortConfig.key] ?? '';
                const bValue = b[sortConfig.key] ?? '';
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
    }, [searchTerm, industryFilter, stageFilter, sortConfig]);

    const stats = useMemo(() => {
        const uniqueIndustries = new Set(filteredCompanies.map(c => c.industry)).size;
        return {
            count: filteredCompanies.length,
            industries: uniqueIndustries,
            stageRange: 'Seed–Series A' // Mocking range for UI aesthetics
        };
    }, [filteredCompanies]);

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

    const getStageColor = (stage: string) => {
        if (stage.toLowerCase().includes('pre-seed')) return 'bg-gray-100 text-gray-700 border-gray-200';
        if (stage.toLowerCase().includes('seed')) return 'bg-blue-100 text-blue-700 border-blue-200';
        if (stage.toLowerCase().includes('series a')) return 'bg-green-100 text-green-700 border-green-200';
        return 'bg-gray-100 text-gray-600 border-gray-200';
    };

    return (
        <div className="space-y-10 pb-10">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Discovery</h2>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Source and evaluate the next generation of industry leaders.</p>
                </div>
                <button
                    onClick={() => setIsSaveSearchModalOpen(true)}
                    className="px-6 py-2.5 text-sm font-bold text-blue-600 bg-white border border-gray-100 rounded-xl hover:bg-blue-50 hover:border-blue-100 transition-all active:scale-95 shadow-sm"
                >
                    Save Current View
                </button>
            </div>

            {/* Summary Stats Bar */}
            <div className="flex items-center space-x-6">
                <div className="bg-white border border-gray-100 px-6 py-4 rounded-2xl shadow-sm flex items-center space-x-4">
                    <span className="text-2xl font-black text-gray-900 tabular-nums">{stats.count}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-tight">Total<br />Companies</span>
                </div>
                <div className="h-10 w-px bg-gray-200"></div>
                <div className="bg-white border border-gray-100 px-6 py-4 rounded-2xl shadow-sm flex items-center space-x-4">
                    <span className="text-2xl font-black text-gray-900 tabular-nums">{stats.industries}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-tight">Unique<br />Industries</span>
                </div>
                <div className="h-10 w-px bg-gray-200"></div>
                <div className="bg-white border border-gray-100 px-6 py-4 rounded-2xl shadow-sm flex items-center space-x-4">
                    <span className="text-lg font-bold text-gray-900 tracking-tight">{stats.stageRange}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-tight">Primary<br />Stages</span>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Company Name</label>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search entities by name or keyword..."
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl text-base font-medium focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none shadow-sm"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        />
                        <svg className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Industry</label>
                    <div className="relative">
                        <select
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-base font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none"
                            value={industryFilter}
                            onChange={(e) => { setIndustryFilter(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="">All Industries</option>
                            {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                        </select>
                        <div className="absolute right-4 top-4 pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Stage</label>
                    <div className="relative">
                        <select
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-base font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none"
                            value={stageFilter}
                            onChange={(e) => { setStageFilter(e.target.value); setCurrentPage(1); }}
                        >
                            <option value="">All Stages</option>
                            {stages.map(stg => <option key={stg} value={stg}>{stg}</option>)}
                        </select>
                        <div className="absolute right-4 top-4 pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-50">
                        <thead className="bg-gray-50/50">
                            <tr>
                                {['name', 'industry', 'stage', 'location', 'foundedYear'].map((key) => (
                                    <th
                                        key={key}
                                        className="px-8 py-4 text-left cursor-pointer hover:bg-gray-100/50 transition-colors group"
                                        onClick={() => requestSort(key as keyof Company)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                                                {key === 'foundedYear' ? 'FOUNDED' : key.toUpperCase()}
                                            </span>
                                            <div className={`transition-opacity duration-200 ${sortConfig?.key === key ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                                <svg className={`h-3 w-3 text-blue-500 ${sortConfig?.key === key && sortConfig.direction === 'desc' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </th>
                                ))}
                                <th className="px-8 py-4 text-right">
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {paginatedCompanies.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-24 text-center">
                                        <div className="flex flex-col items-center">
                                            <svg className="h-10 w-10 text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No startups found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedCompanies.map((company) => (
                                    <tr
                                        key={company.id}
                                        onClick={() => navigate(`/companies/${company.id}`)}
                                        className="hover:bg-gray-50 cursor-pointer transition-all duration-150 group"
                                    >
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors border border-gray-100 shadow-sm overflow-hidden">
                                                    {company.logo ? (
                                                        <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-sm font-black text-gray-400 group-hover:text-white uppercase">{company.name[0]}</span>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-base font-extrabold text-gray-900 tracking-tight">{company.name}</span>
                                                    <span className="text-xs items-center text-blue-500 font-bold uppercase tracking-wider hidden group-hover:flex">
                                                        View Intelligence →
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <span className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-sm font-bold text-gray-600 uppercase tracking-wide">{company.industry}</span>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <span className={`px-3 py-1 border rounded-full text-xs font-black uppercase tracking-widest ${getStageColor(company.stage)}`}>
                                                {company.stage}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-base text-gray-500 font-bold tracking-tight">{company.location}</td>
                                        <td className="px-8 py-5 whitespace-nowrap text-sm font-black text-gray-300 tabular-nums uppercase">{company.foundedYear}</td>
                                        <td className="px-8 py-5 whitespace-nowrap text-right">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedCompanyId(company.id);
                                                }}
                                                className="px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-gray-400 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all"
                                            >
                                                Track
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {filteredCompanies.length > 0 && (
                    <div className="bg-gray-50/30 px-8 py-6 flex items-center justify-between border-t border-gray-50">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                            Showing <span className="text-gray-900 tabular-nums">{(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredCompanies.length)}</span> of <span className="text-gray-900 tabular-nums">{filteredCompanies.length}</span> entities
                        </p>
                        <nav className="flex items-center space-x-2" aria-label="Pagination">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="w-10 h-10 rounded-xl border border-gray-200 bg-white text-gray-400 hover:text-blue-600 hover:ring-4 hover:ring-blue-50 disabled:opacity-30 transition-all flex items-center justify-center font-bold"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div className="flex items-center px-4 h-10 bg-white border border-gray-100 rounded-xl">
                                <span className="text-xs font-black text-gray-900 uppercase">Page {currentPage} of {totalPages}</span>
                            </div>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 rounded-xl border border-gray-200 bg-white text-gray-400 hover:text-blue-600 hover:ring-4 hover:ring-blue-50 disabled:opacity-30 transition-all flex items-center justify-center font-bold"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </nav>
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
                        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity" onClick={() => setIsSaveSearchModalOpen(false)}></div>
                        <div className="bg-white rounded-[2rem] p-10 shadow-2xl transform transition-all max-w-lg w-full z-10 border border-gray-100">
                            <form onSubmit={handleSaveSearch}>
                                <div className="mb-8">
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Save Parameters</h3>
                                    <p className="text-sm text-gray-500 font-medium">Capture these filters as a permanent discovery workspace.</p>
                                </div>
                                <div className="bg-blue-50/30 p-6 rounded-2xl mb-8 border border-blue-50">
                                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-4">Workspace Filters</p>
                                    <div className="flex flex-wrap gap-2">
                                        {searchTerm && <span className="bg-white px-3 py-1.5 rounded-lg border border-blue-100 text-xs font-bold text-blue-600 shadow-sm">Keyword: "{searchTerm}"</span>}
                                        {industryFilter && <span className="bg-white px-3 py-1.5 rounded-lg border border-blue-100 text-xs font-bold text-blue-600 shadow-sm">{industryFilter}</span>}
                                        {stageFilter && <span className="bg-white px-3 py-1.5 rounded-lg border border-blue-100 text-xs font-bold text-blue-600 shadow-sm">{stageFilter}</span>}
                                        {!searchTerm && !industryFilter && !stageFilter && <span className="text-blue-300 italic font-bold text-xs">No active filters</span>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="search-name" className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">View Alias</label>
                                    <input
                                        type="text"
                                        id="search-name"
                                        autoFocus
                                        className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                        placeholder="e.g. Fintech Series A targets"
                                        value={searchName}
                                        onChange={(e) => setSearchName(e.target.value)}
                                    />
                                </div>
                                <div className="mt-10 flex items-center justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsSaveSearchModalOpen(false)}
                                        className="px-6 py-3 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors"
                                    >
                                        Dismiss
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-3.5 text-sm font-black text-white bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95"
                                    >
                                        Create View
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
