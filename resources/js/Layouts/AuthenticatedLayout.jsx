import {Link} from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Authenticated({children}) {
    return (<div className="flex flex-row">
        <aside className={`min-h-screen w-64 bg-blue-500 text-white flex flex-col`}>
            <Link className="flex justify-center py-2 mb-4" href="/">
                <ApplicationLogo className="w-10 h-10 fill-current text-white"/>
            </Link>
            <Link
                href={route('dashboard')}
                className="w-56 py-2 px-3 mx-auto text-white rounded hover:bg-blue-400 mb-2">
                Dashboard
            </Link>
            <div className={'flex-1'}></div>
            <Link
                href={route('profile.edit')}
                className="w-56 py-2 px-3 mx-auto text-white rounded hover:bg-blue-400 mb-2">
                Profile
            </Link>
            <Link
                href={route('logout')}
                method="POST"
                className="w-56 py-2 px-3 mx-auto text-white rounded hover:bg-blue-400 mb-6">
                Logout
            </Link>
        </aside>

        <main className="flex">
            {children}
        </main>
    </div>);
}

