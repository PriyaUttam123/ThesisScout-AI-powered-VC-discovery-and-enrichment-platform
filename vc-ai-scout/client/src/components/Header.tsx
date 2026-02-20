const Header = () => {
    return (
        <header className="fixed top-0 right-0 left-64 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 z-20">
            <div className="h-full px-10 flex items-center justify-between">
                <div className="flex-1 max-w-xl">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search everything..."
                            className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl text-sm font-medium placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none border border-transparent"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Network Live</span>
                    </div>
                    <button className="text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-widest">
                        Support
                    </button>
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 uppercase tracking-widest">
                        New Entity
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
