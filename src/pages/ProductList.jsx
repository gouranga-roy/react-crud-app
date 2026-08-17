import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productService from "../services/productService";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await productService.getAll();

            setProducts(response.data);
        } catch (error) {
            setError("Failed to load products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await productService.delete(id);

            setProducts((previousProducts) =>
                previousProducts.filter(
                    (product) => product.id !== id
                )
            );
        } catch (error) {
            alert("Failed to delete product.");
        }
    };

    if (loading) {
        return <h3>Loading...</h3>;
    }

    if (error) {
        return <h3>{error}</h3>;
    }

    return (
        <div>
            <h1>Product List</h1>

            <Link to="/products/create">
                Add Product
            </Link>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>

                            <td>
                                <Link
                                    to={`/products/${product.id}`}
                                >
                                    View
                                </Link>

                                {" | "}

                                <Link
                                    to={`/products/${product.id}/edit`}
                                >
                                    Edit
                                </Link>

                                {" | "}

                                <button
                                    onClick={() =>
                                        handleDelete(product.id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
