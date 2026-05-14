import { useState } from 'react';
import API from '../../api/axios';
import { Camera, Save, Loader2 } from 'lucide-react';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('padiUser') || '{}');
    const [formData, setFormData] = useState({ ...user, password: '' });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('profilePicture', image);

        try {
            const res = await API.put('/users/profile', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            localStorage.setItem('padiUser', JSON.stringify({ ...user, ...res.data.user }));
            alert("Profile updated successfully!");
        } catch (err) {
            alert("Update failed");
            console.error(err);
        } finally { setLoading(false); }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <form onSubmit={handleUpdate} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                        <img 
                            src={image ? URL.createObjectURL(image) : `http://localhost:3000/${user.profilePicture}`} 
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
                        />
                        <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer">
                            <Camera className="text-white" />
                            <input type="file" hidden onChange={e => setImage(e.target.files[0])} />
                        </label>
                    </div>
                    <p className="text-sm text-gray-400">Click image to change profile photo</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input type="text" className="p-4 bg-gray-50 border rounded-xl" placeholder="First Name" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                    <input type="text" className="p-4 bg-gray-50 border rounded-xl" placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                </div>
                <input type="text" className="w-full p-4 bg-gray-50 border rounded-xl" placeholder="Username" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
                <input type="password" className="w-full p-4 bg-gray-50 border rounded-xl font-mono" placeholder="New Password (leave blank to keep current)" onChange={e => setFormData({...formData, password: e.target.value})} />

                <button className="w-full bg-padi-red text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="animate-spin" /> : <><Save size={18}/> Update Profile</>}
                </button>
            </form>
        </div>
    );
};

export default Profile;