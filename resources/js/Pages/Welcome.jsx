import {Head} from '@inertiajs/react';
import Footer from '../Layouts/Footer.jsx';
import Navbar from '../Layouts/Navbar.jsx';

export default function Welcome({auth}) {
    return (<>
        <Head title="Welcome"/>
        <div className="flex flex-col min-h-screen">
            <Navbar auth={auth}/>
            <main className="flex justify-center items-center text-black flex-1">
                Home
            </main>
            <Footer/>
        </div>
    </>);
};

