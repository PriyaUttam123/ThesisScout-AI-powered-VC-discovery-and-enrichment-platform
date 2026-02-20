import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const navigation = [
        {
            name: 'Companies',
            href: '/companies',
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4a1 1 0 011-1h2a1 1 0 011 1v3M6 7h1m-1 4h1m3 0h1m-1 4h1m-1 4h1m0-16h2a1 1 0 011 1v16a1 1 0 01-1 1h-2a1 1 0 01-1-1V5a1 1 0 011-1z" />
                </svg>
            )
        },
        {
            name: 'Lists',
            href: '/lists',
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
            )
        },
        {
            name: 'Saved Searches',
            href: '/saved',
            icon: (
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
            )
        },
    ];

    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm z-30">
            <div className="p-6">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold tracking-tight text-gray-900">ThesisScout</h1>
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mt-1">AI VC Intelligence</span>
                </div>
            </div>

            <nav className="flex-1 px-4 py-2 space-y-2">
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center px-4 py-2.5 text-base font-medium rounded-xl transition-all duration-200 ${isActive
                                ? 'bg-blue-50 text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-50 bg-gray-50/30">
                <div className="flex items-center space-x-3 px-2 py-1">
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
                        <span className="text-xs font-bold text-white">PU</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">Priya Uttam</p>
                        <p className="text-xs text-gray-500 font-medium">Pro Account</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
