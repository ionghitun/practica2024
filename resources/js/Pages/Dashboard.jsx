import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';

export default function Dashboard({auth}) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard"/>
            <div>
                Dashboard
            </div>
        </AuthenticatedLayout>
    );
}
