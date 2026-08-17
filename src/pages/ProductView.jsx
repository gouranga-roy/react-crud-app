import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import productService from "../services/productService";

function ProductView() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load product
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await productService.getById(id);

                setProduct(response.data);
            } catch (error) {
                console.error(error);
                setError("Failed to load product.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Delete product
    const handleDelete = async () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${product.name}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await productService.delete(id);

            alert("Product deleted successfully.");

            navigate("/products");
        } catch (error) {
            console.error(error);

            alert("Failed to delete product.");
        }
    };

    if (loading) {
        return (
            <div>
                <h2>Loading product...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h2>{error}</h2>

                <Link to="/products">
                    Back to Products
                </Link>
            </div>
        );
    }

    if (!product) {
        return (
            <div>
                <h2>Product not found.</h2>

                <Link to="/products">
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Product Details</h1>

            <div>
                <strong>ID:</strong>

                <p>{product.id}</p>
            </div>

            <div>
                <strong>Product Name:</strong>

                <p>{product.name}</p>
            </div>

            <div>
                <strong>Category:</strong>

                <p>{product.category}</p>
            </div>

            <div>
                <strong>Price:</strong>

                <p>${product.price}</p>
            </div>

            <div>
                <strong>Quantity:</strong>

                <p>{product.quantity}</p>
            </div>

            <div>
                <strong>Description:</strong>

                <p>
                    {product.description ||
                        "No description available."}
                </p>
            </div>

            <div>
                <strong>Status:</strong>

                <p>
                    {product.status === "active"
                        ? "Active"
                        : "Inactive"}
                </p>
            </div>

            <div>
                <strong>Created At:</strong>

                <p>
                    {product.createdAt
                        ? product.createdAt
                        : "N/A"}
                </p>
            </div>

            {/* Actions */}
            <div>
                <Link
                    to={`/products/${product.id}/edit`}
                >
                    Edit Product
                </Link>

                {" "}

                <button onClick={handleDelete}>
                    Delete Product
                </button>

                {" "}

                <Link to="/products">
                    Back to Products
                </Link>
            </div>
        </div>
    );
}

export default ProductView;
