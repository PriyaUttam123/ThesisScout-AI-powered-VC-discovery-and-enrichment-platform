import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { companies, Company } from '../data/companies';

const Header = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Company[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        if (value.trim().length > 0) {
            const filtered = companies
                .filter(c => c.name.toLowerCase().includes(value.toLowerCase()))
                .slice(0, 5);
            setResults(filtered);
            setIsDropdownOpen(true);
        } else {
            setResults([]);
            setIsDropdownOpen(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setIsDropdownOpen(false);
            navigate(`/companies?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleSelectResult = (companyId: string) => {
        setIsDropdownOpen(false);
        setSearchTerm('');
        navigate(`/companies/${companyId}`);
    };

    return (
        <header className="fixed top-0 right-0 left-64 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 z-20">
            <div className="h-full px-10 flex items-center justify-between">
                <div className="flex-1 max-w-xl relative" ref={dropdownRef}>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search everything... (⌘ K)"
                            className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-base font-medium placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none border border-transparent shadow-sm"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => searchTerm.trim() && setIsDropdownOpen(true)}
                        />
                    </div>

                    {/* Search Results Dropdown */}
                    {isDropdownOpen && results.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="p-2">
                                <p className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Entities</p>
                                {results.map(company => (
                                    <button
                                        key={company.id}
                                        onClick={() => handleSelectResult(company.id)}
                                        className="w-full flex items-center px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors group text-left"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
                                            <span className="text-xs font-black text-gray-400 group-hover:text-white uppercase">{company.name[0]}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-bold text-gray-900">{company.name}</div>
                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{company.industry} • {company.stage}</div>
                                        </div>
                                        <svg className="h-4 w-4 text-gray-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                ))}
                                <button
                                    onClick={() => { setIsDropdownOpen(false); navigate(`/companies?q=${encodeURIComponent(searchTerm)}`); }}
                                    className="w-full mt-1 border-t border-gray-50 px-4 py-3 text-xs font-black text-blue-600 hover:bg-blue-50/50 rounded-b-xl transition-colors uppercase tracking-widest text-center"
                                >
                                    See all results for "{searchTerm}"
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Network Live</span>
                    </div>
                    <button className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-widest">
                        Support
                    </button>
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 uppercase tracking-widest">
                        New Entity
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
