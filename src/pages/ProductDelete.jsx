import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import productService from "../services/productService";

function ProductDelete() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
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
        try {
            setDeleting(true);
            setError("");

            await productService.delete(id);

            alert("Product deleted successfully.");

            navigate("/products");
        } catch (error) {
            console.error(error);

            setError("Failed to delete product.");
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div>
                <h2>Loading product...</h2>
            </div>
        );
    }

    if (error && !product) {
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
            <h1>Delete Product</h1>

            {error && (
                <div>
                    <p>{error}</p>
                </div>
            )}

            <div>
                <h3>
                    Are you sure you want to delete
                    this product?
                </h3>

                <p>
                    <strong>ID:</strong>{" "}
                    {product.id}
                </p>

                <p>
                    <strong>Name:</strong>{" "}
                    {product.name}
                </p>

                <p>
                    <strong>Category:</strong>{" "}
                    {product.category}
                </p>

                <p>
                    <strong>Price:</strong>{" "}
                    ${product.price}
                </p>
            </div>

            <div>
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                >
                    {deleting
                        ? "Deleting..."
                        : "Yes, Delete Product"}
                </button>

                {" "}

                <Link to={`/products/${id}`}>
                    Cancel
                </Link>
            </div>
        </div>
    );
}

export default ProductDelete;
