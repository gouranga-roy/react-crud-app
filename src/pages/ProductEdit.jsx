import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import productService from "../services/productService";

function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
        status: "active",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Load existing product
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await productService.getById(id);

                setForm({
                    name: response.data.name || "",
                    category: response.data.category || "",
                    price: response.data.price || "",
                    quantity: response.data.quantity || "",
                    description: response.data.description || "",
                    status: response.data.status || "active",
                });
            } catch (error) {
                console.error(error);
                setError("Failed to load product.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: value,
        }));

        // Remove field error while typing
        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: "",
        }));
    };

    // Form validation
    const validate = () => {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Product name is required.";
        }

        if (!form.category.trim()) {
            newErrors.category = "Category is required.";
        }

        if (!form.price) {
            newErrors.price = "Price is required.";
        } else if (Number(form.price) < 0) {
            newErrors.price = "Price cannot be negative.";
        }

        if (form.quantity === "") {
            newErrors.quantity = "Quantity is required.";
        } else if (Number(form.quantity) < 0) {
            newErrors.quantity = "Quantity cannot be negative.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Submit update
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            setSubmitting(true);
            setError("");

            const updatedData = {
                ...form,
                price: Number(form.price),
                quantity: Number(form.quantity),
            };

            await productService.update(id, updatedData);

            alert("Product updated successfully.");

            navigate("/products");
        } catch (error) {
            console.error(error);
            setError("Failed to update product.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div>
                <h2>Loading product...</h2>
            </div>
        );
    }

    if (error && !form.name) {
        return (
            <div>
                <h2>{error}</h2>

                <Link to="/products">
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Edit Product</h1>

            {error && (
                <div>
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Product Name */}
                <div>
                    <label htmlFor="name">
                        Product Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                    />

                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label htmlFor="category">
                        Category
                    </label>

                    <input
                        id="category"
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="Enter category"
                    />

                    {errors.category && (
                        <p>{errors.category}</p>
                    )}
                </div>

                {/* Price */}
                <div>
                    <label htmlFor="price">
                        Price
                    </label>

                    <input
                        id="price"
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        min="0"
                    />

                    {errors.price && (
                        <p>{errors.price}</p>
                    )}
                </div>

                {/* Quantity */}
                <div>
                    <label htmlFor="quantity">
                        Quantity
                    </label>

                    <input
                        id="quantity"
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                        min="0"
                    />

                    {errors.quantity && (
                        <p>{errors.quantity}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description">
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        rows="5"
                    />
                </div>

                {/* Status */}
                <div>
                    <label htmlFor="status">
                        Status
                    </label>

                    <select
                        id="status"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>
                    </select>
                </div>

                {/* Buttons */}
                <div>
                    <button
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting
                            ? "Updating..."
                            : "Update Product"}
                    </button>

                    {" "}

                    <Link to="/products">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default ProductEdit;
