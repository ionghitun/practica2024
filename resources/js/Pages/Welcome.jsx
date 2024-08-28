import {Head, Link, router} from '@inertiajs/react';
import Footer from '../Layouts/Footer.jsx';
import Navbar from '../Layouts/Navbar.jsx';
import {Fragment, useEffect, useState} from "react";
import SelectInput from "@/Components/SelectInput.jsx";
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Welcome({auth, products, categories, category: c, search: s}) {
    const [productsFetched, setProductsFetched] = useState(true);
    const [category, setCategory] = useState(c);
    const [search, setSearch] = useState(s);

    const filterCategory = (value) => {
        setCategory(value);
        setProductsFetched(false);
    }

    useEffect(() => {
        if (search !== s) {
            const timeout = setTimeout(() => {
                setProductsFetched(false);
            }, 500);

            return () => {
                clearTimeout(timeout);
            }
        }
    }, [search, s]);

    const searchProduct = (value) => {
        setSearch(value);
    }

    useEffect(() => {
        if (!productsFetched) {
            filterProducts();
        }
    }, [productsFetched]);

    const resetFilters = () => {
        setCategory('');
        setSearch('');
        setProductsFetched(false);
    }

    const filterProducts = () => {
        let url = '/';

        if (search !== '') {
            url += `?search=${encodeURIComponent(search)}`;
        }

        if (category !== '') {
            const sign = search ? '&' : '?'
            url += `${sign}category=${encodeURIComponent(category)}`;
        }

        router.visit(url, {
            onFinish: () => {
                setProductsFetched(true);
            }
        });
    }

    return (<>
        <Head title="Welcome"/>
        <div className="flex flex-col min-h-screen">
            <Navbar auth={auth}/>
            <main className="container flex-1 mx-auto">
                <h1 className={'text-3xl mt-6 mb-4'}>Products</h1>
                <div className={'flex justify-between items-center'}>
                    <div>
                        <SelectInput value={category} options={categories} onChange={(e) => filterCategory(e.target.value)}/>
                    </div>
                    <div>
                        <TextInput
                            type="text"
                            name="search"
                            value={search}
                            onChange={(e) => searchProduct(e.target.value)}
                            placeholder={'Type to search...'}
                        />
                    </div>
                    <div>
                        <PrimaryButton onClick={resetFilters}>Reset</PrimaryButton>
                    </div>
                </div>
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
                <div className={'flex justify-center mt-4 mb-10'}>
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

