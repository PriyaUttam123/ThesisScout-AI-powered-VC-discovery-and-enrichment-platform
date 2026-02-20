const Header = () => {
    return (
        <header className="fixed top-0 right-0 left-60 h-16 bg-white border-b border-gray-200 z-10">
            <div className="h-full px-8 flex items-center justify-between">
                <div className="flex-1 max-w-lg">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search companies, lists, or searches..."
                            className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-1 px-3 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                        Help
                    </button>
                    <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                        New Listing
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
