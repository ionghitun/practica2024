import {Head, Link} from '@inertiajs/react';
import Footer from '../Layouts/Footer.jsx';
import Navbar from '../Layouts/Navbar.jsx';
import {Fragment} from "react";

export default function Welcome({auth, products}) {
    console.log(products);

    return (<>
        <Head title="Welcome"/>
        <div className="flex flex-col min-h-screen">
            <Navbar auth={auth}/>
            <main className="container flex-1 mx-auto">
                <h1 className={'text-3xl mt-6 mb-4'}>Products</h1>
                <div className="grid grid-cols-3">
                    {products.data.map((product) => (<div className={'w-full p-4'} key={product.id}>
                            <div className={'bg-blue-300 border-4 border-blue-600 rounded-lg'}>
                                <div className="flex items-center justify-center overflow-hidden h-40">
                                    {product.images.length > 0 && <img src={product.images[0].url} alt={''} className={'w-full'} height={200}/>}
                                </div>
                                <div className='text-lg font-bold px-2 mt-2 leading-7'>{product.name}</div>
                                <div className={'px-2 mt-2 text-red-600 font-medium'}>#{product.category.name}</div>
                                <div className={'px-2 mt-2 font-medium'}>&euro;{product.price}</div>
                            </div>
                        </div>))}
                </div>
                <div className={'flex justify-center mt-4'}>
                    {products.links.map((link, key) => (<Fragment key={key}>
                            {link.url && !link.active && <Link className={'bg-blue-500 p-2 text-white mr-2'} href={link.url}>
                                <span dangerouslySetInnerHTML={{__html: link.label}}/></Link>}
                            {link.url && link.active && <span className={'bg-gray-500 p-2 text-white mr-2'}>{link.label}</span>}
                        </Fragment>))}
                </div>
            </main>
            <Footer/>
        </div>
    </>);
};

