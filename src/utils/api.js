// const API_BASE_URL = 'http://127.0.0.1:8000';
const API_BASE_URL = 'https://backend-v1-psi.vercel.app';

export async function getProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/product/`, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function getCart() {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/`, {
            credentials: "include",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching cart:', error);
        return { Items: [], TotalItems: 0, TotalAmount: 0 };
    }
}

export async function addToCart(productId, quantity = 1) {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ ProductId: productId, Quantity: quantity }),
            credentials: "include",
            mode: 'cors'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
}

export async function clearCart() {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/clear`, {
            method: 'POST',
            credentials: "include",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
}

export async function checkoutCart(checkoutDetails) {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                CustomerName: checkoutDetails.CustomerName,
                CustomerPhone: checkoutDetails.CustomerPhone,
                Email: checkoutDetails.Email,
                Address: checkoutDetails.Address,
                City: checkoutDetails.City,
                Notes: checkoutDetails.Notes
            }),
            credentials: "include",
            mode: 'cors'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error checking out cart:', error);
        throw error;
    }
}