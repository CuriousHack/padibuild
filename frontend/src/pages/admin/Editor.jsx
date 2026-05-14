import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { UserPlus, Trash2, Edit, ShieldCheck, UserX, X, Loader2 } from 'lucide-react';

const Editors = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Modal States
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', username: '', email: '', password: '', role: 'editor' });

    const fetchUsers = async () => {
        try {
            const { data } = await API.get('/users');
            setUsers(data.users);
        } catch (err) { console.error("Fetch failed"); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleOpenForm = (user = null) => {
        if (user) {
            setSelectedUser(user);
            setFormData({ ...user, password: '' }); // Don't populate password on edit
        } else {
            setSelectedUser(null);
            setFormData({ firstName: '', lastName: '', username: '', email: '', password: '', role: 'editor' });
        }
        setIsFormOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (selectedUser) {
                await API.put(`/users/${selectedUser.id}`, formData);
            } else {
                await API.post('/auth/register', formData);
            }
            setIsFormOpen(false);
            fetchUsers();
        } catch (err) { alert(err.response?.data?.message || "Operation failed"); }
    };

    const confirmDelete = (user) => {
        setSelectedUser(user);
        setIsConfirmOpen(true);
    };

    const handleDelete = async () => {
        try {
            await API.delete(`/users/${selectedUser.id}`);
            setIsConfirmOpen(false);
            fetchUsers();
        } catch (err) { alert(err.response?.data?.message || "Delete failed"); }
    };

    const toggleUserStatus = async (id) => {
        try {
            await API.patch(`/users/${id}/status`);
            fetchUsers(); // Refresh the list
        } catch (err) {
            console.error("Status toggle failed", err);
            alert(err.response?.data?.message || "Failed to change status");
        }
    };

    return (
        <div className="space-y-6 relative">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
                <button 
                    onClick={() => handleOpenForm()}
                    className="bg-padi-red text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 font-bold"
                >
                    <UserPlus size={18} /> Add Editor
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Name</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Username</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Role</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Status</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {user.firstName} {user.lastName}
                                </td>
                                <td className="px-6 py-4 text-gray-500">@{user.username}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 cursor-pointer" onClick={() => toggleUserStatus(user.id)}>
                                    {user.isActive ? (
                                        <span className="text-green-600 flex items-center gap-1 font-medium">
                                            <ShieldCheck size={14}/> Active
                                        </span>
                                    ) : (
                                        <span className="text-red-400 flex items-center gap-1 font-medium">
                                            <UserX size={14}/> Suspended
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right space-x-3">
                                    <button onClick={() => handleOpenForm(user)} className="text-gray-400 hover:text-blue-600 transition"><Edit size={18}/></button>
                                    <button onClick={() => confirmDelete(user)} className="text-gray-400 hover:text-red-600 transition"><Trash2 size={18}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- MODAL: Add/Edit Form --- */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsFormOpen(false)}></div>
                    <div className="bg-white rounded-3xl p-8 w-full max-w-md relative z-10 shadow-2xl border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">{selectedUser ? 'Edit Editor' : 'Register New Editor'}</h2>
                            <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="First Name" className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-padi-red" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} required />
                                <input type="text" placeholder="Last Name" className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-padi-red" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} required />
                            </div>
                            <input type="text" placeholder="Username" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-padi-red" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required />
                            {!selectedUser && (
                                <>
                                    <input type="email" placeholder="Email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-padi-red" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                                    <input type="password" placeholder="Password" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-padi-red" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
                                </>
                            )}
                            <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-padi-red appearance-none" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                                <option value="editor">Editor</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button type="submit" className="w-full bg-padi-red text-white py-4 rounded-xl font-bold shadow-lg hover:bg-red-700 transition-all">
                                {selectedUser ? 'Update Details' : 'Create Account'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- MODAL: Custom Delete Confirmation --- */}
            {isConfirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsConfirmOpen(false)}></div>
                    <div className="bg-white rounded-2xl p-8 w-full max-w-sm relative z-10 text-center shadow-2xl">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Are you sure?</h2>
                        <p className="text-gray-500 mb-6">This will permanently remove <span className="font-bold text-gray-900">{selectedUser?.username}</span> from the team.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setIsConfirmOpen(false)} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-red-500/20">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Editors;