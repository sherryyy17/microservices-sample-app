import React, { useEffect, useState, useRef } from "react";

function App() {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const userRef = useRef();
    const productRef = useRef();

    useEffect(() => {
        fetchUsers();
        fetchProducts();
    }, []);

    const fetchUsers = async () => {
        const res = await fetch("http://localhost:5001/users");
        const data = await res.json();
        setUsers(data);
    };

    const fetchProducts = async () => {
        const res = await fetch("http://localhost:5002/products");
        const data = await res.json();
        setProducts(data);
    };

    const addUser = async () => {
        const name = userRef.current.value;
        if (!name) return;
        await fetch("http://localhost:5001/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });
        userRef.current.value = "";
        fetchUsers();
    };

    const addProduct = async () => {
        const name = productRef.current.value;
        if (!name) return;
        await fetch("http://localhost:5002/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });
        productRef.current.value = "";
        fetchProducts();
    };

    return (
        <div>
            <h1>Users</h1>
            <input ref={userRef} placeholder="Enter user name" />
            <button onClick={addUser}>Add User</button>
            <ul>{users.map(user => <li key={user._id}>{user.name}</li>)}</ul>

            <h1>Products</h1>
            <input ref={productRef} placeholder="Enter product name" />
            <button onClick={addProduct}>Add Product</button>
            <ul>{products.map(product => <li key={product._id}>{product.name}</li>)}</ul>
        </div>
    );
}

export default App;
