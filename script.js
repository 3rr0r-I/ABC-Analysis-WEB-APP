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
    if (!validFormat.test(channelData)) {
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
