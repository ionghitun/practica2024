import {Link, useForm} from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Authenticated({children, flash}) {
    const {post} = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('logout'));
    };

    return (<div className="flex flex-row relative">
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
            <Link
                href={route('products.list')}
                className="w-56 py-2 px-3 mx-auto text-white rounded hover:bg-blue-400 mb-2">
                Products
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

        {flash && flash.success && <div className={'absolute right-10 top-10 rounded-lg p-4 bg-green-400'}>{flash.success}</div>}
        {flash && flash.error && <div className={'absolute right-10 top-10 rounded-lg p-4 bg-red-400'}>{flash.error}</div>}

        <main className="flex w-5/6">
            {children}
        </main>
    </div>);
}

