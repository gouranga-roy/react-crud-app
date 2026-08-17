import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../services/productService";

function ProductCreate() {

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

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

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
        }

        if (!form.quantity) {
            newErrors.quantity = "Quantity is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!validate()) {
            return;
        }

        try {

            await productService.create(form);

            navigate("/products");

        } catch (error) {

            alert("Failed to create product.");

        }
    };

    return (
        <div>

            <h1>Create Product</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Product Name</label>

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>

                <div>
                    <label>Category</label>

                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                    />

                    {errors.category && (
                        <p>{errors.category}</p>
                    )}
                </div>

                <div>
                    <label>Price</label>

                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                    />

                    {errors.price && (
                        <p>{errors.price}</p>
                    )}
                </div>

                <div>
                    <label>Quantity</label>

                    <input
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                    />

                    {errors.quantity && (
                        <p>{errors.quantity}</p>
                    )}
                </div>

                <div>
                    <label>Description</label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Status</label>

                    <select
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

                <button type="submit">
                    Save Product
                </button>

            </form>

        </div>
    );
}

export default ProductCreate;
