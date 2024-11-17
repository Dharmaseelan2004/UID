// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);  // Track errors in state

    // Fetch items from the server
    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/items');
            if (!response.ok) throw new Error('Failed to fetch items');
            const data = await response.json();
            setItems(data);
            setError(null);  // Clear previous errors if successful
        } catch (error) {
            console.error('Error fetching items:', error);
            setError('Could not load items. Please try again later.');
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = { name, description, quantity };

        try {
            const response = await fetch('http://localhost:5000/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });
            if (!response.ok) throw new Error('Failed to add item');
            setName('');
            setDescription('');
            setQuantity(1);
            fetchItems();  // Refresh the item list
            setError(null);  // Clear errors if successful
        } catch (error) {
            console.error('Error adding item:', error);
            setError('Could not add item. Please try again later.');
        }
    };

    return (
        <div className="App">
            <h1>Item List</h1>
            {error && <p className="error-message">{error}</p>}  {/* Display error messages */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
                <button type="submit">Add Item</button>
            </form>
            <h2>Items:</h2>
            <ul>
                {items.map((item) => (
                    <li key={item._id}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Quantity: {item.quantity}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
