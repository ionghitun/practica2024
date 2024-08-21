import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import FileInput from "@/Components/FileInput.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function AddEdit({categories, product}) {
    const {data, setData, post, errors, processing} = useForm({
        name: product?.name || '',
        description: product?.description || '',
        category: product?.category_id || '',
        price: product?.price || '',
        images: [],
        deleted_images: []
    });

    const [currentImages, setCurrentImages] = useState(product?.images || []);

    const submit = (e) => {
        e.preventDefault();

        let productRoute = product ? route('products.store', [product.id]) : route('products.store');
        post(productRoute);
    };

    const deleteProductImage = (id) => {
        let updatedImages = currentImages.filter(function( obj ) {
            return obj.id !== id;
        });
        setCurrentImages(updatedImages);
        setData('deleted_images', [...data.deleted_images, id]);
    }

    return (<AuthenticatedLayout>
            <Head title={product ? 'Edit product' : 'Add product'}/>
            <div className={'w-full'}>
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold'}>{product ? 'Edit product' : 'Add product'}</div>

                    <div className="mt-6">
                        <form onSubmit={submit} encType='multipart/form-data' className="mt-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="Name"/>

                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    isFocused
                                />

                                <InputError className="mt-2" message={errors.name}/>
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description"/>

                                <TextInput
                                    id="description"
                                    className="mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                />

                                <InputError className="mt-2" message={errors.description}/>
                            </div>

                            <div>
                                <InputLabel htmlFor="category" value="Category"/>

                                <SelectInput
                                    id="category"
                                    className="mt-1 block w-full"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    required
                                    options={categories}
                                />

                                <InputError className="mt-2" message={errors.category}/>
                            </div>

                            <div>
                                <InputLabel htmlFor="price" value="Price"/>

                                <TextInput
                                    id="price"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    required
                                />

                                <InputError className="mt-2" message={errors.price}/>
                            </div>

                            <div>
                                <div>Existing images</div>
                                <div className={'grid grid-cols-6'}>
                                    {currentImages.map((image) => (<div className={'p-2'} key={image.id}>
                                            <img alt={''} src={image.url} width={200} height={200}/>
                                            <FontAwesomeIcon onClick={() => deleteProductImage(image.id)} icon={faTrash} className={'text-red-600 ml-2'}/>
                                        </div>))}
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="images" value="Images"/>

                                <FileInput
                                    id="images"
                                    className="mt-1 block w-full"
                                    value={data.images}
                                    multiple={true}
                                    onChange={(e) => setData('images', e.target.files)}
                                />

                                <InputError className="mt-2" message={errors.images}/>
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Save</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>);
}
