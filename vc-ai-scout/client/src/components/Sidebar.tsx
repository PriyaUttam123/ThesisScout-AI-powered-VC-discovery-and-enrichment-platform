import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const navigation = [
        { name: 'Companies', href: '/companies' },
        { name: 'Lists', href: '/lists' },
        { name: 'Saved Searches', href: '/saved' },
    ];

    return (
        <div className="fixed inset-y-0 left-0 w-60 bg-white border-r border-gray-200 flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <h1 className="text-xl font-bold text-indigo-600">VC AI Scout</h1>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-1">
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-xs font-semibold text-indigo-700">PU</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">Priya Uttam</p>
                        <p className="text-xs text-gray-500 truncate">Settings</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
