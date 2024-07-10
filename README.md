# ABC Analysis Web App

This repository is what I made from the knowledge I got from freeCodeCamp.


## Documentation

# ABC Analysis Web App

## Overview
The ABC Analysis Web App is a tool designed to help users categorize items into three categories (A, B, and C) based on their consumption values. The app allows users to add, edit, delete, sort, and filter channels (items) and perform ABC analysis. The results of the analysis can be filtered by category.

## Features
- **Add Channels**: Users can add new channels in the format `itemName: value`.
- **Edit Channels**: Users can edit existing channels.
- **Delete Channels**: Users can delete channels with a confirmation modal to prevent accidental deletions.
- **Sort Channels**: Users can sort channels by name or value.
- **Filter Channels**: Users can filter channels by name and by category (A, B, C, All).
- **Calculate ABC Analysis**: Users can perform ABC analysis on the added channels.
- **Local Storage**: The app saves channels to local storage, so data persists across sessions.

## Usage Instructions

### Adding a Channel
1. Enter the channel data in the input field in the format `itemName: value`.
2. Click the "Add Channel" button.

### Editing a Channel
1. Click the "Edit" button next to the channel you want to edit.
2. Modify the channel data in the prompt dialog.
3. Click "OK" to save changes or "Cancel" to discard changes.

### Deleting a Channel
1. Click the "Delete" button next to the channel you want to delete.
2. Confirm the deletion in the modal dialog by clicking "Yes, delete".
3. Click "Cancel" to discard the deletion.

### Sorting Channels
1. Click the "Sort by Name" button to sort channels alphabetically by their name.
2. Click the "Sort by Value" button to sort channels by their value in descending order.

### Filtering Channels
1. Use the filter input field to filter channels by name. The grid will update as you type.
2. Use the category dropdown to filter channels by category (A, B, C, All).

### Calculating ABC Analysis
1. Click the "Calculate" button to perform ABC analysis on the added channels.
2. The results will be displayed in the grid, categorized by A, B, and C.

## Code Structure

### HTML (`index.html`)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ABC Analysis Web App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app">
        <h1>ABC Analysis</h1>
        <div id="controls">
            <button id="sort-name" title="Sort channels by name">Sort by Name</button>
            <button id="sort-value" title="Sort channels by value">Sort by Value</button>
            <input type="text" id="filter-input" placeholder="Filter by name" title="Filter channels by name">
        </div>
        <div id="grid-container"></div>
        <div>
            <input type="text" id="channel-input" placeholder="Enter channel data">
            <button id="add-channel" title="Add a new channel in the format 'itemName: value'">Add Channel</button>
        </div>
        <button id="calculate" title="Calculate ABC analysis based on the added channels">Calculate</button>
        <div>
            <label for="category-select">Select Category:</label>
            <select id="category-select" title="Filter channels by category">
                <option value="All">All</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
        </div>
    </div>
    <!-- Modal for confirming deletion -->
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <p id="modal-text">Are you sure you want to delete this channel?</p>
            <button id="confirm-delete">Yes, delete</button>
            <button id="cancel-delete">Cancel</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### CSS (`styles.css`)
```css
body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
}

#app {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 600px;
    width: 100%;
}

h1 {
    margin-bottom: 20px;
    color: #333;
}

#controls {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

#controls button,
#controls input {
    margin: 5px;
}

#grid-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 20px;
}

#grid-container div {
    background: #e0e0e0;
    padding: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

input[type="text"] {
    padding: 10px;
    margin-right: 10px;
    width: calc(100% - 130px);
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background: #007BFF;
    color: white;
    cursor: pointer;
    margin: 5px;
    position: relative;
}

button:hover {
    background: #0056b3;
}

button.edit {
    background: #ffc107;
}

button.edit:hover {
    background: #e0a800;
}

button.delete {
    background: #dc3545;
}

button.delete:hover {
    background: #c82333;
}

button[title]::after {
    content: attr(title);
    position: absolute;
    left: 50%;
    bottom: 100%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 5px;
    border-radius: 3px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
}

button:hover[title]::after {
    opacity: 1;
}

#category-select {
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

/* Modal styles */
.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 400px;
    border-radius: 8px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
```

### JavaScript (`script.js`)
```javascript
document.getElementById("add-channel").addEventListener("click", addChannel);
document.getElementById("calculate").addEventListener("click", calculateABC);
document.getElementById("category-select").addEventListener("change", updateGrid);
document.getElementById("sort-name").addEventListener("click", () => sortChannels("name"));
document.getElementById("sort-value").addEventListener("click", () => sortChannels("value"));
document.getElementById("filter-input").addEventListener("input", updateGrid);

let channels = JSON.parse(localStorage.getItem('channels')) || [];
let categories = { A: [], B: [], C: [] };
let channelToDeleteIndex = null;

// Initialize the grid with saved data
updateGrid();

function addChannel() {
    const channelInput = document.getElementById("channel-input");
    const channelData = channelInput.value.trim();

    if (!validateChannelInput(channelData)) {
        alert("Invalid input format! Please use the format 'itemName: value' with a positive numerical value.");
        return;
    }

    channels.push(channelData);
    saveChannels();
    updateGrid();
    channelInput.value = '';
}

function validateChannelInput(channelData) {
    const validFormat = /^[a-zA-Z0-9\s]+:\s*\d+(\.\d+)?$/;
    if (!validFormat.test(channelData))

 {
        return false;
    }

    const [name, value] = channelData.split(':').map(s => s.trim());
    if (isNaN(value) || parseFloat(value) <= 0) {
        return false;
    }

    return true;
}

function saveChannels() {
    localStorage.setItem('channels', JSON.stringify(channels));
}

function updateGrid() {
    const gridContainer = document.getElementById("grid-container");
    const selectedCategory = document.getElementById("category-select").value;
    const filterValue = document.getElementById("filter-input").value.toLowerCase();
    gridContainer.innerHTML = '';

    let itemsToDisplay = selectedCategory === 'All'
        ? channels
        : categories[selectedCategory].map(item => `${item.name}: ${item.value}`);

    if (filterValue) {
        itemsToDisplay = itemsToDisplay.filter(channel => channel.toLowerCase().includes(filterValue));
    }

    itemsToDisplay.forEach((channel, index) => {
        const channelDiv = document.createElement("div");
        channelDiv.textContent = `Channel ${index + 1}: ${channel}`;
        
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit");
        editButton.title = "Edit this channel";
        editButton.onclick = () => editChannel(index);
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.title = "Delete this channel";
        deleteButton.onclick = () => showDeleteModal(index);
        
        channelDiv.appendChild(editButton);
        channelDiv.appendChild(deleteButton);
        
        gridContainer.appendChild(channelDiv);
    });
}

function editChannel(index) {
    const newChannelData = prompt("Edit channel data (itemName: value)", channels[index]);
    if (newChannelData && validateChannelInput(newChannelData)) {
        channels[index] = newChannelData.trim();
        saveChannels();
        updateGrid();
    } else {
        alert("Invalid input format! Please use the format 'itemName: value' with a positive numerical value.");
    }
}

function showDeleteModal(index) {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
    channelToDeleteIndex = index;
}

function hideDeleteModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    channelToDeleteIndex = null;
}

function deleteChannel() {
    if (channelToDeleteIndex !== null) {
        channels.splice(channelToDeleteIndex, 1);
        saveChannels();
        updateGrid();
        hideDeleteModal();
    }
}

document.getElementById("confirm-delete").addEventListener("click", deleteChannel);
document.getElementById("cancel-delete").addEventListener("click", hideDeleteModal);
document.querySelector(".close").addEventListener("click", hideDeleteModal);

function sortChannels(criteria) {
    channels.sort((a, b) => {
        const [nameA, valueA] = a.split(':').map(s => s.trim());
        const [nameB, valueB] = b.split(':').map(s => s.trim());
        if (criteria === "name") {
            return nameA.localeCompare(nameB);
        } else if (criteria === "value") {
            return parseFloat(valueB) - parseFloat(valueA);
        }
    });
    updateGrid();
}

function calculateABC() {
    if (channels.length === 0) {
        alert("No channels to analyze!");
        return;
    }

    try {
        let items = channels.map(channel => {
            const [name, value] = channel.split(':').map(s => s.trim());
            return { name, value: parseFloat(value) };
        });

        items.sort((a, b) => b.value - a.value);

        const totalValue = items.reduce((acc, item) => acc + item.value, 0);

        let cumulativePercentage = 0;
        categories = { A: [], B: [], C: [] };

        items.forEach(item => {
            cumulativePercentage += (item.value / totalValue) * 100;
            const itemWithPercentage = { ...item, percentage: cumulativePercentage.toFixed(2) };

            if (cumulativePercentage <= 80) {
                categories.A.push(itemWithPercentage);
            } else if (cumulativePercentage <= 95) {
                categories.B.push(itemWithPercentage);
            } else {
                categories.C.push(itemWithPercentage);
            }
        });

        displayResults(categories);
    } catch (error) {
        alert("An error occurred during the calculation: " + error.message);
    }
}

function displayResults(categories) {
    const selectedCategory = document.getElementById("category-select").value;
    updateGrid();
}

// Export functions for testing
module.exports = {
    addChannel,
    calculateABC
};
```

## How to Run the Application
1. Ensure you have all the files (`index.html`, `styles.css`, and `script.js`) in the same directory.
2. Open `index.html` in a web browser.
3. Use the functionalities as described in the Usage Instructions section.

## Conclusion
This web app provides a comprehensive tool for performing ABC analysis with added capabilities for sorting, filtering, and persistent data storage. It is designed to be user-friendly and highly interactive, making it a valuable resource for managing and analyzing inventory or other categorical data.

