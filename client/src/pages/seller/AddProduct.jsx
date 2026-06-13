import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProductById, updateProduct } from '../../services/product.service';
import Toast from '../../components/ui/Toast';
import { uploadImage } from '../../services/upload.service'

export default function AddProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditMode);
    const [error, setError] = useState(null);
    const [toastMessage, setToastMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        subcategory: '',
        partNumber: '',
        partType: '',
        price: '',
        mrp: '',
        stock: '',
        oemPartNumber: '',
        brand: '',
        description: '',
        warrantyMonths: '',
        images: []
    });
    const [uploadingImage, setUploadingImage] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    //upload function
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setPreviewImage(
            URL.createObjectURL(file)
        );
        try {
            setUploadingImage(true);
            const url = await uploadImage(file);
            setFormData(prev => ({
                ...prev,
                images: [url]
            }));

        } catch (err) {
            console.error(err);
            alert("Image Upload Failed");
        } finally {
            setUploadingImage(false);
        }
    };

    const [fitments, setFitments] = useState([
        { vehicleType: 'car', brand: '', model: '', variant: '', yearFrom: '', yearTo: '' }
    ]);

    useEffect(() => {
        if (isEditMode) {
            fetchProductDetails();
        }
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            setFetching(true);
            const data = await getProductById(id);
            const p = data.product;

            setFormData({
                name: p.name || '',
                category: p.category || '',
                subcategory: p.subcategory || '',
                partNumber: p.partNumber || '',
                partType: p.partType || 'OEM',
                price: p.price || '',
                mrp: p.mrp || '',
                stock: p.stock || '',
                oemPartNumber: p.oemPartNumber || '',
                brand: p.brand || '',
                description: p.description || '',
                warrantyMonths: p.warrantyMonths || '',
                images: p.images?.length ? p.images : [''],
            });

            if (p.fitments && p.fitments.length > 0) {
                setFitments(p.fitments.map(f => ({
                    vehicleType: f.vehicleType || 'car',
                    brand: f.brand || '',
                    model: f.model || '',
                    variant: f.variant || '',
                    yearFrom: f.yearFrom || '',
                    yearTo: f.yearTo || ''
                })));
            }
        } catch (err) {
            console.error(err);
            setError('Failed to load product details.');
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFitmentChange = (index, field, value) => {
        const updated = [...fitments];
        updated[index][field] = value;
        setFitments(updated);
    };

    const addFitment = () => {
        setFitments([...fitments, { vehicleType: 'car', brand: '', model: '', variant: '', yearFrom: '', yearTo: '' }]);
    };

    const removeFitment = (index) => {
        if (fitments.length > 1) {
            const updated = [...fitments];
            updated.splice(index, 1);
            setFitments(updated);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Prepare payload matching backend model
            const payload = {
                ...formData,
                price: Number(formData.price),
                mrp: Number(formData.mrp),
                stock: Number(formData.stock),
                images: formData.images.filter(img => img.trim() !== ''),
                description: formData.description,
                warrantyMonths: Number(formData.warrantyMonths || 0),
                fitments: fitments.map(f => ({
                    ...f,
                    yearFrom: f.yearFrom ? Number(f.yearFrom) : undefined,
                    yearTo: f.yearTo ? Number(f.yearTo) : undefined
                }))
            };

            if (isEditMode) {
                await updateProduct(id, payload);
                setToastMessage('Product updated successfully and is pending approval.');
            } else {
                await createProduct(payload);
                setToastMessage('Product created successfully and is pending approval.');
            }

            // Navigate back after a short delay to allow toast to be seen,
            // or just navigate and let the next page handle its own toast.
            // But since Toast is rendered here, we can delay navigation slightly.
            setTimeout(() => {
                navigate('/seller/products', { state: { refresh: true, message: isEditMode ? 'Product updated.' : 'Product created.' } });
            }, 1000);

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} product. Please check your inputs.`);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <div className="p-12 text-center text-slate-500">Loading product details...</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Toast message={toastMessage} onClose={() => setToastMessage('')} />
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="text-slate-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1 mb-4"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Products
                </button>
                <h1 className="text-2xl font-bold text-slate-900">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
                <p className="text-sm text-slate-500 mt-1">
                    {isEditMode ? 'Update your product details. Changes will require admin approval.' : 'List a new auto part in your catalog. It will require admin approval.'}
                </p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-sm mb-6 border border-red-100 font-medium text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-sm shadow-sm p-6 md:p-8">

                {/* Basic Info Section */}
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Product Name *</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:bg-white" placeholder="e.g. Bosch Front Brake Pads" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category *</label>
                        <input required type="text" name="category" value={formData.category} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:bg-white" placeholder="e.g. Brakes" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subcategory *</label>
                        <input required type="text" name="subcategory" value={formData.subcategory} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:bg-white" placeholder="e.g. Brake Pads" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Part Number *</label>
                        <input required type="text" name="partNumber" value={formData.partNumber} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:bg-white" placeholder="Manufacturer PN" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Part Type *</label>
                        <select name="partType" value={formData.partType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:bg-white">
                            <option value="" disabled>Select Part Type</option>
                            <option value="OEM">OEM (Original Equipment)</option>
                            <option value="AFTERMARKET">Aftermarket</option>
                            <option value="GENERIC">Generic</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Brand *</label>
                        <input required type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:bg-white" placeholder="e.g. Bosch, Maruti Suzuki" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">OEM Part Number (Optional)</label>
                        <input type="text" name="oemPartNumber" value={formData.oemPartNumber} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:bg-white" placeholder="Cross-reference PN" />
                    </div>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Product Description *
                    </label>

                    <textarea
                        required
                        rows="5"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-3 text-sm focus:outline-none focus:border-orange-500 focus:bg-white resize-none"
                        placeholder="Describe the product, condition, compatibility, specifications, warranty details and important notes..."
                    />

                    <p className="text-xs text-slate-500 mt-1">
                        Detailed descriptions improve buyer trust and approval chances.
                    </p>
                </div>

                {/* Pricing & Inventory */}
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Pricing & Inventory</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Price (₹) *</label>
                        <input required type="number" min="1" name="price" value={formData.price || ""} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:bg-white" placeholder="0.00" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            MRP (₹) *
                        </label>
                        <input
                            required
                            type="number"
                            min="1"
                            name="mrp"
                            value={formData.mrp || ""}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:bg-white"
                            placeholder="0.00"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Stock Quantity *</label>
                        <input required type="number" min="0" name="stock" value={formData.stock || ""} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:bg-white" placeholder="0" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Warranty (Months)
                    </label>

                    <input
                        type="number"
                        min="0"
                        name="warrantyMonths"
                        value={formData.warrantyMonths}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:bg-white"
                        placeholder="0"
                    />

                    <p className="text-[11px] text-slate-500 mt-1">
                        Enter 0 if no warranty is offered.
                    </p>
                </div>


                {/* Media*/}

                <div className="space-y-4">

                    <label className="block text-xs font-bold text-slate-700 uppercase">
                        Product Image
                    </label>

                    <label
                        htmlFor="product-image"
                        className=" flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-slate-300 rounded-sm cursor-pointer hover:border-orange-500 hover:bg-orange-50/40 transition-all"
                    >
                        {!formData.images[0] ? (

                            <>
                                <svg
                                    className="w-10 h-10 text-slate-400 mb-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.8}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>

                                <p className="text-sm font-semibold text-slate-700">
                                    Click to Upload
                                </p>

                                <p className="text-xs text-slate-500 mt-1">
                                    PNG, JPG, WEBP (Max 5MB)
                                </p>

                            </>

                        ) : (

                            <img
                                src={previewImage || formData.images[0]}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-sm"
                            />

                        )}

                    </label>

                    <input
                        id="product-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />

                    {uploadingImage && (

                        <div className="flex items-center gap-2 text-orange-600">
                            <svg
                                className="animate-spin h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>

                            <span className="text-sm font-medium">
                                Uploading image...
                            </span>
                        </div>
                    )}
                    {formData.images[0] && !uploadingImage && (

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-green-600 font-medium">

                                ✓ Image Uploaded Successfully
                            </p>
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        images: []
                                    }))
                                }
                                className="text-sm text-red-500 hover:text-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>

                {/* Fitments */}
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4 flex items-center justify-between">
                    <span>Vehicle Fitments *</span>
                    <button type="button" onClick={addFitment} className="text-xs font-bold text-orange-600 hover:text-orange-700 uppercase flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Add Fitment
                    </button>
                </h3>

                <div className="space-y-4 mb-8">
                    {fitments.map((fitment, index) => (
                        <div key={index} className="bg-slate-50 border border-slate-200 p-4 rounded-sm relative">
                            {fitments.length > 1 && (
                                <button type="button" onClick={() => removeFitment(index)} className="absolute top-2 right-2 text-slate-400 hover:text-red-600">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            )}

                            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Type *</label>
                                    <select required value={fitment.vehicleType} onChange={(e) => handleFitmentChange(index, 'vehicleType', e.target.value)} className="w-full bg-white border border-slate-200 rounded-sm px-2 py-1.5 text-xs focus:outline-none focus:border-orange-500">
                                        <option value="car">Car</option>
                                        <option value="bike">Bike</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Vehicle Brand *</label>
                                    <input required type="text" value={fitment.brand} onChange={(e) => handleFitmentChange(index, 'brand', e.target.value)} className="w-full bg-white border border-slate-200 rounded-sm px-2 py-1.5 text-xs focus:outline-none focus:border-orange-500" placeholder="e.g. Honda" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Model *</label>
                                    <input required type="text" value={fitment.model} onChange={(e) => handleFitmentChange(index, 'model', e.target.value)} className="w-full bg-white border border-slate-200 rounded-sm px-2 py-1.5 text-xs focus:outline-none focus:border-orange-500" placeholder="e.g. Civic" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Variant</label>
                                    <input type="text" value={fitment.variant} onChange={(e) => handleFitmentChange(index, 'variant', e.target.value)} className="w-full bg-white border border-slate-200 rounded-sm px-2 py-1.5 text-xs focus:outline-none focus:border-orange-500" placeholder="e.g. VXI" />
                                </div>
                                <div className="col-span-2 md:col-span-3">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Year From</label>
                                    <input type="number" min="1950" max="2050" value={fitment.yearFrom} onChange={(e) => handleFitmentChange(index, 'yearFrom', e.target.value)} className="w-full bg-white border border-slate-200 rounded-sm px-2 py-1.5 text-xs focus:outline-none focus:border-orange-500" placeholder="YYYY" />
                                </div>
                                <div className="col-span-2 md:col-span-3">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Year To</label>
                                    <input type="number" min="1950" max="2050" value={fitment.yearTo} onChange={(e) => handleFitmentChange(index, 'yearTo', e.target.value)} className="w-full bg-white border border-slate-200 rounded-sm px-2 py-1.5 text-xs focus:outline-none focus:border-orange-500" placeholder="YYYY" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-8 rounded-sm text-sm uppercase tracking-wide transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Submitting...' : (isEditMode ? 'Update Product' : 'Submit Product for Approval')}
                    </button>
                </div>
            </form>
        </div>
    );
}
