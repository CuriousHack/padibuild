import { Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Image, Users, CircleUserRound, LogOut } from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('padiUser') || '{}');
    const backendUrl = import.meta.env.VITE_API_URL || '';

    // Helper to resolve the image path
    const getProfilePic = () => {
        if (!user.profilePicture) return `https://ui-avatars.com/api/?name=${user.username}`;
        
        // If it's already a full URL (like an external link), return it
        if (user.profilePicture.startsWith('http')) return user.profilePicture;

        // Otherwise, append the dynamic backend URL
        return `${backendUrl}/${user.profilePicture}`;
    };

    const handleLogout = () => {
        localStorage.removeItem('padiToken');
        localStorage.removeItem('padiUser');
        navigate('/admin/login');
    };

    const MenuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/admin/dashboard', roles: ['admin', 'editor'] },
        { icon: <Users size={20} />, label: 'Editors', path: '/admin/editors', roles: ['admin'] }, // Admin only
        { icon: <FileText size={20} />, label: 'Blog Posts', path: '/admin/blog', roles: ['admin', 'editor'] },
        { icon: <Image size={20} />, label: 'Gallery', path: '/admin/gallery', roles: ['admin', 'editor'] },
        { icon: <CircleUserRound size={20} />, label: 'My Profile', path: '/admin/profile', roles: ['admin', 'editor'] },
    ];

    const filteredMenuItems = MenuItems.filter(item => item.roles.includes(user.role));

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-gray-800">
                    PADI<span className="text-padi-red">BUILD</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {filteredMenuItems.map((item) => (
                        <button 
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition text-gray-400 hover:text-white"
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 hover:text-red-300 px-4 py-2 w-full">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white shadow-sm p-4 flex justify-end items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">{user.username}</span>
                        <div className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
                            <img 
                                src={getProfilePic()} 
                                alt="profile" 
                                className="w-full h-full object-cover" 
                                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${user.username}`; }}
                            />
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    <Outlet /> {/* This renders the Dashboard or other admin pages */}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;