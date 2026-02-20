import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { companies } from '../data/companies';
import SaveToListModal from '../components/SaveToListModal';

const CompanyDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const company = companies.find((c) => c.id === id);

    const [notes, setNotes] = useState(() => {
        return localStorage.getItem(`company_notes_${id}`) || '';
    });

    const [isSaving, setIsSaving] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem(`company_notes_${id}`, notes);
    }, [id, notes]);

    if (!company) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900">Company not found</h2>
                <button
                    onClick={() => navigate('/companies')}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-bold"
                >
                    Back to Discovery
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
        <div className="max-w-6xl mx-auto space-y-10 pb-20">
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="flex items-start space-x-5">
                    <button
                        onClick={() => navigate('/companies')}
                        className="mt-1.5 p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-100 shadow-sm transition-all active:scale-95"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <div className="flex items-center space-x-3">
                            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{company.name}</h1>
                            <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider ${company.stage.startsWith('Series') ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-500'}`}>
                                {company.stage}
                            </span>
                        </div>
                        <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-bold transition-colors group"
                        >
                            <svg className="h-4 w-4 mr-1.5 opacity-70 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            {company.website.replace(/^https?:\/\//, '')}
                        </a>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-200 shadow-sm transition-all active:scale-95"
                    >
                        Add to Portfolio
                    </button>
                    <button
                        onClick={handleEnrich}
                        disabled={isSaving}
                        className={`px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center active:scale-95 ${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {isSaving ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : 'Enrich Startup'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Executive Summary</h3>
                            <div className="flex items-center space-x-4">
                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Industry</p>
                                    <p className="text-xs font-bold text-gray-900 mt-0.5">{company.industry}</p>
                                </div>
                                <div className="h-6 w-px bg-gray-100"></div>
                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Founded</p>
                                    <p className="text-xs font-bold text-gray-900 mt-0.5 tabular-nums">{company.foundedYear}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <p className="text-gray-600 text-lg leading-relaxed font-normal">{company.description}</p>

                            <div className="mt-8 pt-8 border-t border-gray-50">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Core Competencies</p>
                                <div className="flex flex-wrap gap-2">
                                    {company.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg border border-transparent hover:border-gray-200 hover:bg-white transition-all cursor-default">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-50">
                            <h3 className="text-lg font-bold text-gray-900 tracking-tight">AI Insights & Enrichment</h3>
                        </div>
                        <div className="px-8 py-16 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 shadow-inner">
                                <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h4 className="text-gray-900 font-bold mb-2">Advanced Data Gathering Pending</h4>
                            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">Click "Enrich Startup" to scan web resources, crunch financials, and generate competitive intelligence for {company.name}.</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Vitals */}
                    <div className="bg-white shadow-sm rounded-2xl border border-gray-100 p-8">
                        <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-6">Company Vitals</h3>
                        <div className="space-y-6 text-sm">
                            <div className="flex justify-between items-center group">
                                <span className="text-gray-400 font-bold text-[11px] uppercase tracking-widest">Headquarters</span>
                                <span className="text-gray-900 font-bold">{company.location}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 font-bold text-[11px] uppercase tracking-widest">Industry</span>
                                <span className="text-gray-900 font-bold">{company.industry}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 font-bold text-[11px] uppercase tracking-widest">Status</span>
                                <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-[10px]">ACTIVE</span>
                            </div>
                        </div>
                    </div>

                    {/* Internal Notes */}
                    <div className="bg-white shadow-sm rounded-2xl border border-gray-100 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Intelligence</h3>
                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">Confidential</span>
                        </div>
                        <textarea
                            className="w-full h-48 p-4 bg-gray-50/50 border border-gray-100 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none placeholder-gray-300"
                            placeholder="Start typing private observations, deal notes, or next steps..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <p className="mt-4 text-[11px] text-gray-400 text-center font-medium">Automatic cloud-sync active</p>
                    </div>
                </div>
            </div>

            <SaveToListModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                companyId={id || ''}
            />
        </div>
    );
};

export default CompanyDetail;
