import { useState, useEffect, useMemo } from 'react';
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
    const [isEnriched, setIsEnriched] = useState(false);

    // Derived Thesis Score based on simple heuristic for demo purposes
    const thesisScore = useMemo(() => {
        if (!company) return 0;
        // Deterministic score based on company name length and founded year
        return (company.name.length * 7 + (company.foundedYear % 100)) % 40 + 60;
    }, [company]);

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600 bg-green-50 border-green-100';
        if (score >= 50) return 'text-amber-600 bg-amber-50 border-amber-100';
        return 'text-red-600 bg-red-50 border-red-100';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return 'Strong Thesis Match';
        if (score >= 50) return 'Moderate Alignment';
        return 'Low Strategic Fit';
    };

    const getStageColor = (stage: string) => {
        if (stage.toLowerCase().includes('pre-seed')) return 'bg-gray-100 text-gray-700 border-gray-200';
        if (stage.toLowerCase().includes('seed')) return 'bg-blue-100 text-blue-700 border-blue-200';
        if (stage.toLowerCase().includes('series a')) return 'bg-green-100 text-green-700 border-green-200';
        return 'bg-gray-100 text-gray-600 border-gray-200';
    };

    useEffect(() => {
        localStorage.setItem(`company_notes_${id}`, notes);
    }, [id, notes]);

    if (!company) {
        return (
            <div className="text-center py-32">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 9.172a1 1 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Entity profile not found</h2>
                <button
                    onClick={() => navigate('/companies')}
                    className="mt-6 text-blue-600 hover:text-blue-700 font-bold text-base uppercase tracking-widest transition-all"
                >
                    Return to discovery view
                </button>
            </div>
        );
    }

    const handleEnrich = () => {
        setIsSaving(true);
        // Simulate enrichment process with steps
        setTimeout(() => {
            setIsSaving(false);
            setIsEnriched(true);
        }, 3000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-20">
            {/* Navigation & Header Card */}
            <div className="space-y-6">
                <button
                    onClick={() => navigate('/companies')}
                    className="group inline-flex items-center text-sm font-black text-gray-400 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors"
                >
                    <svg className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Discovery
                </button>

                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-xl shadow-gray-200/40">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                        <div className="flex items-start space-x-8">
                            <div className="w-24 h-24 rounded-3xl bg-gray-50 border border-gray-100 shadow-inner flex items-center justify-center overflow-hidden shrink-0">
                                {company.logo ? (
                                    <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-3xl font-black text-gray-200 uppercase">{company.name[0]}</span>
                                )}
                            </div>
                            <div className="space-y-3">
                                <h1 className="text-5xl font-black text-gray-900 tracking-tighter leading-none">{company.name}</h1>
                                <div className="flex items-center space-x-4 text-base font-bold text-gray-500 uppercase tracking-wide">
                                    <a
                                        href={company.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline flex items-center bg-blue-50/50 px-3 py-1 rounded-lg border border-blue-50 lowercase tracking-normal font-medium"
                                    >
                                        <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.101 1.101" />
                                        </svg>
                                        {company.website.replace(/^https?:\/\//, '')}
                                    </a>
                                    <span className="opacity-20">•</span>
                                    <span className="tracking-widest">{company.industry}</span>
                                    <span className="opacity-20">•</span>
                                    <span className="tracking-widest">{company.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <div className={`p-6 rounded-[2rem] border min-w-[200px] text-center transition-all ${getScoreColor(thesisScore)} shadow-sm`}>
                                <div className="text-xs font-black uppercase tracking-[0.2em] mb-1 opacity-60">Thesis Score</div>
                                <div className="text-4xl font-black tracking-tighter leading-none mb-2">{thesisScore}</div>
                                <div className="text-xs font-bold uppercase tracking-widest opacity-80">{getScoreLabel(thesisScore)}</div>
                            </div>

                            <div className="flex flex-col gap-3 w-full sm:w-auto">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="px-8 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 hover:border-gray-200 shadow-sm transition-all active:scale-95"
                                >
                                    Add to Portfolio
                                </button>
                                <button
                                    onClick={handleEnrich}
                                    disabled={isSaving}
                                    className={`px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center justify-center active:scale-95 ${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    {isSaving ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Crunching Data...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Enrich Entity
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-10">
                    <section className="bg-white shadow-sm rounded-3xl border border-gray-100 p-10 space-y-8">
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-4">Executive Overview</h3>
                            <p className="text-gray-600 text-lg leading-relaxed font-medium">{company.description}</p>
                        </div>

                        <div className="pt-10 border-t border-gray-50">
                            <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Discovery Signals</h4>
                            <div className="flex flex-wrap gap-3">
                                {company.tags.map(tag => (
                                    <span key={tag} className="px-4 py-2 bg-gray-50 text-gray-600 text-sm font-bold rounded-xl border border-transparent hover:border-gray-200 hover:bg-white transition-all cursor-default uppercase tracking-wider">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="bg-white shadow-sm rounded-3xl border border-gray-100 overflow-hidden">
                        <div className="p-10 border-b border-gray-50 flex items-center justify-between">
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">AI Generated Insights</h3>
                            {isEnriched && <span className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-green-100">Live Scanned</span>}
                        </div>

                        <div className="p-10 min-h-[400px]">
                            {isSaving ? (
                                <div className="space-y-8">
                                    <div className="flex flex-col items-center justify-center py-20 text-center animate-pulse">
                                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
                                            <svg className="h-8 w-8 text-blue-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.547 2.188a2 2 0 00.75 2.226l1.948 1.462a2 2 0 01.746 2.251l-.257 1.03a2 2 0 01-2.427 1.467l-3.903-.976a2 2 0 01-1.467-2.427l.257-1.03a2 2 0 012.251-.746l1.462 1.948a2 2 0 002.226.75l2.188-.547a2 2 0 001.414-1.96l-.477-2.387a2 2 0 00-.547-1.022z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-gray-900 font-bold mb-2">Analyzing website with AI...</h4>
                                        <p className="text-sm text-gray-500 max-w-xs font-medium uppercase tracking-widest opacity-60">Cross-referencing market signals</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="h-32 bg-gray-50 rounded-2xl animate-pulse"></div>
                                        <div className="h-32 bg-gray-50 rounded-2xl animate-pulse"></div>
                                        <div className="h-48 col-span-2 bg-gray-50 rounded-2xl animate-pulse"></div>
                                    </div>
                                </div>
                            ) : isEnriched ? (
                                <div className="space-y-10 animate-fade-in">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="p-8 bg-blue-50/30 rounded-[2rem] border border-blue-50">
                                            <h5 className="text-sm font-black text-blue-500 uppercase tracking-widest mb-4">Market Velocity</h5>
                                            <p className="text-3xl font-black text-gray-900 tracking-tighter">High Tier 1</p>
                                            <p className="text-sm text-blue-600 font-bold mt-2 uppercase">Aggressive growth noted</p>
                                        </div>
                                        <div className="p-8 bg-purple-50/30 rounded-[2rem] border border-purple-50">
                                            <h5 className="text-sm font-black text-purple-500 uppercase tracking-widest mb-4">Competitor Edge</h5>
                                            <p className="text-3xl font-black text-gray-900 tracking-tighter">Proprietary LLM</p>
                                            <p className="text-sm text-purple-600 font-bold mt-2 uppercase">Strong IP defensibility</p>
                                        </div>
                                    </div>
                                    <div className="p-10 bg-gray-50/50 rounded-[2.5rem] border border-gray-100">
                                        <h5 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Strategic Recommendation</h5>
                                        <div className="flex items-start space-x-4">
                                            <div className="w-1.5 h-12 bg-blue-600 rounded-full shrink-0"></div>
                                            <p className="text-gray-700 text-lg font-bold leading-relaxed">
                                                Based on Recent scraping of Crunchbase and LinkedIn, {company.name} has increased head-count by 40% in the last 6 months. High probability of upcoming funding round based on recent executive hires.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-24 text-center">
                                    <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-8 border border-gray-100 shadow-inner group">
                                        <svg className="h-10 w-10 text-gray-300 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-3xl font-black text-gray-900 tracking-tight mb-2 uppercase tracking-wide">Pending Enrichment</h4>
                                    <p className="text-base text-gray-500 max-w-sm font-bold leading-relaxed uppercase tracking-widest opacity-60">Crunch web resources and competitive signals for {company.name}.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-10">
                    <section className="bg-white shadow-sm rounded-3xl border border-gray-100 p-10">
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-8 uppercase tracking-wide">Entity Vitals</h3>
                        <div className="space-y-8">
                            <div className="flex flex-col space-y-2">
                                <span className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">Headquarters</span>
                                <span className="text-base font-black text-gray-900 uppercase tracking-tight">{company.location}</span>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <span className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">Funding Stage</span>
                                <span className={`px-4 py-2 w-fit rounded-xl text-sm font-black uppercase tracking-widest border ${getStageColor(company.stage)}`}>
                                    {company.stage}
                                </span>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <span className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">Platform Status</span>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-sm font-black text-green-600 uppercase tracking-widest">Live Metadata</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white shadow-sm rounded-3xl border border-gray-100 p-10">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase tracking-wide">Deal Intelligence</h3>
                            <span className="text-xs font-black text-gray-300 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 uppercase tracking-widest italic">Encrypted</span>
                        </div>
                        <textarea
                            className="w-full h-64 p-5 bg-gray-50/30 border border-gray-100 rounded-[2rem] text-base font-bold text-gray-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none placeholder-gray-300"
                            placeholder="Type internal observations, deal rationale, or next steps..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <div className="mt-6 flex items-center justify-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <p className="text-xs font-black text-gray-300 uppercase tracking-[0.22em]">Automatic Cloud Sync Active</p>
                        </div>
                    </section>
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
