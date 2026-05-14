const Dashboard = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-500 mt-2">Welcome to the PadiBuild Admin Portal.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="text-gray-400 text-sm font-bold uppercase">Total Leads</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="text-gray-400 text-sm font-bold uppercase">Blog Posts</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="text-gray-400 text-sm font-bold uppercase">Active Editors</h3>
                    <p className="text-3xl font-bold mt-2">1</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;