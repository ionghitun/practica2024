import {Link, useForm} from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Authenticated({children}) {
    const {post} = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('logout'));
    };

    return (<div className="flex flex-row">
        <aside className={`min-h-screen w-1/6 bg-blue-500 text-white flex flex-col`}>
            <Link className="flex justify-center py-2 mb-4" href="/">
                <ApplicationLogo className="w-10 h-10 fill-current text-white"/>
            </Link>
            <Link
                href={route('dashboard')}
                className="w-56 py-2 px-3 mx-auto text-white rounded hover:bg-blue-400 mb-2">
                Dashboard
            </Link>
            <Link
                href={route('categories.list')}
                className="w-56 py-2 px-3 mx-auto text-white rounded hover:bg-blue-400 mb-2">
                Categories
            </Link>
            <div className={'flex-1'}></div>
            <Link
                href={route('profile.edit')}
                className="w-56 py-2 px-3 mx-auto text-white rounded hover:bg-blue-400 mb-2">
                Profile
            </Link>
            <form onSubmit={submit}>
                <button
                    className="block w-56 py-2 px-3 mx-auto text-white rounded hover:bg-blue-400 mb-6">
                    Logout
                </button>
            </form>
        </aside>

        <main className="flex w-5/6">
            {children}
        </main>
    </div>);
}

