const API_URL = 'https://crudcrud.com/api/5646f9e71804421ea835033b26010b6b/products';

async function addProduct() {
    
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const category = document.getElementById('product-category').value;

    const productId = document.getElementById('product-id').value;

    const product = { name, price, category };

    if (productId) {
        await updateProduct(productId, product);
    } else {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });

        const newProduct = await response.json();
        displayProduct(newProduct);
    }

    clearForm();
}

async function updateProduct(id, updatedProduct) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
    });

    const product = await response.json();
    const productCard = document.getElementById(`product-${id}`);
    productCard.querySelector('.card-title').innerText = product.name;
    productCard.querySelector('.card-subtitle').innerText = product.category;
    productCard.querySelector('.card-text').innerText = `${product.price}`;
}

async function deleteProduct(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    const productCard = document.getElementById(`product-${id}`);
    productCard.remove(); // Remove the product card from the display
}

function clearForm() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-category').value = 'electronics'; // Default category
    document.getElementById('product-id').value = ''; // Clear hidden ID field
}

function displayProduct(product) {
    const productList = document.getElementById('product-list');
    
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    card.id = `product-${product._id}`;
    card.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${product.category}</h6>
                <p class="card-text">$${product.price}</p>
                <button class="btn btn-warning" onclick="editProduct('${product._id}', '${product.name}', '${product.price}', '${product.category}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct('${product._id}')">Delete</button>
            </div>
        </div>
    `;
    productList.appendChild(card);
}

// Function to populate the form for editing
function editProduct(id, name, price, category) {
    document.getElementById('product-id').value = id;
    document.getElementById('product-name').value = name;
    document.getElementById('product-price').value = price;
    document.getElementById('product-category').value = category;
}
