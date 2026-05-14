import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LandingPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-5xl font-extrabold text-gray-900">
                    PADI<span className="text-padi-red">BUILD</span>
                </h1>
                <p className="mt-4 text-gray-500">Approved Landing Page Design Migration in Progress...</p>
                <a href="/admin/login" className="mt-6 inline-block text-padi-red font-bold hover:underline">
                    Go to Admin Portal →
                </a>
            </div>
        </div>
    );
};

export default LandingPage;