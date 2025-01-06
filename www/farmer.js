// farmer.js

// Function to get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Function to load listings from Local Storage and display them
function loadListings() {
    const listingsContainer = document.getElementById('listings');
    listingsContainer.innerHTML = ''; // Clear existing listings

    const user = getCurrentUser();
    if (!user || user.role !== 'farmer') {
        // Redirect to login if not logged in or not a farmer
        window.location.href = 'index.html';
        return;
    }

    // Retrieve listings from Local Storage
    let listings = JSON.parse(localStorage.getItem('farmerListings')) || {};

    // Get listings specific to the current user
    let userListings = listings[user.email] || [];

    // Iterate and display each listing
    userListings.forEach((listing, index) => {
        const listingDiv = document.createElement('div');
        listingDiv.classList.add('listing-item');

        // If image is available
        if (listing.image) {
            const img = document.createElement('img');
            img.src = listing.image;
            img.alt = listing.productName;
            listingDiv.appendChild(img);
        }

        const title = document.createElement('h3');
        title.textContent = listing.productName;
        listingDiv.appendChild(title);

        const location = document.createElement('p');
        location.textContent = `Location: ${listing.location}`;
        listingDiv.appendChild(location);

        // Add delete button for each listing
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete Listing';
        deleteBtn.classList.add('delete-listing-btn');
        deleteBtn.onclick = () => deleteListing(user.email, index);
        listingDiv.appendChild(deleteBtn);

        listingsContainer.appendChild(listingDiv);
    });
}

// Function to delete a listing
function deleteListing(email, index) {
    let listings = JSON.parse(localStorage.getItem('farmerListings')) || {};

    if (listings[email] && listings[email][index]) {
        listings[email].splice(index, 1); // Remove the listing at the specified index

        // If no listings remain, delete the user's key
        if (listings[email].length === 0) {
            delete listings[email];
        }

        // Save back to Local Storage
        localStorage.setItem('farmerListings', JSON.stringify(listings));

        // Refresh the listings display
        loadListings();
    }
}

// Function to show the add listing form
function showAddListingForm() {
    const formContainer = document.getElementById('addListingForm');
    formContainer.style.display = 'flex';
}

// Function to hide the add listing form
function hideAddListingForm() {
    const formContainer = document.getElementById('addListingForm');
    formContainer.style.display = 'none';
    // Reset form fields
    document.getElementById('listingForm').reset();
}

// Function to handle form submission
function addListing(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const productName = document.getElementById('productName').value.trim();
    const location = document.getElementById('productLocation').value.trim();
    const productImage = document.getElementById('productImage').files[0];

    if (!productName || !location || !productImage) {
        alert('Please fill in all fields and select an image.');
        return;
    }

    // Read the image file as a data URL
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageURL = e.target.result;

        const user = getCurrentUser();
        if (!user || user.role !== 'farmer') {
            alert('You are not authorized to perform this action.');
            return;
        }

        // Create a new listing object
        const newListing = {
            productName: productName,
            location: location,
            image: imageURL
        };

        // Retrieve existing listings from Local Storage
        let listings = JSON.parse(localStorage.getItem('farmerListings')) || {};

        // Get the user's listings
        let userListings = listings[user.email] || [];

        // Add the new listing
        userListings.push(newListing);

        // Update the listings object
        listings[user.email] = userListings;

        // Save back to Local Storage
        localStorage.setItem('farmerListings', JSON.stringify(listings));

        // Refresh the listings display
        loadListings();

        // Hide the form
        hideAddListingForm();
    }

    reader.readAsDataURL(productImage);
}

// Function to initialize farmer page
function initFarmerPage() {
    const user = getCurrentUser();
    if (!user || user.role !== 'farmer') {
        // Redirect to login if not logged in or not a farmer
        window.location.href = 'index.html';
        return;
    }

    // Load existing listings
    loadListings();

    // Attach event listeners to "Add New Listing" button
    const addListingBtn = document.querySelector('.add-listing-btn');
    addListingBtn.addEventListener('click', showAddListingForm);

    // Handle form submission
    const listingForm = document.getElementById('listingForm');
    listingForm.addEventListener('submit', addListing);

    // Handle cancel button
    const cancelBtn = document.getElementById('cancelBtn');
    cancelBtn.addEventListener('click', hideAddListingForm);
}

// Initialize the farmer page when DOM is loaded
document.addEventListener('DOMContentLoaded', initFarmerPage);
