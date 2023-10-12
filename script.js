function updateTable() {

    var table = document.getElementById("table");
    var tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";


    var storage = getCurrentStorage();
    var keys = Object.keys(storage);

    if (keys.length === 0) {

        var emptyRow = document.createElement("tr");
        var emptyHeader = document.createElement("td");
        emptyHeader.setAttribute("colspan", "3");
        emptyHeader.textContent = "Нет данных";
        emptyRow.appendChild(emptyHeader);
        tbody.appendChild(emptyRow);
    } else {
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = storage[key];

            var row = document.createElement("tr");
            var keyCell = document.createElement("td");
            var valueCell = document.createElement("td");
            var deleteCell = document.createElement("td");
            var deleteButton = document.createElement("button");

            keyCell.textContent = key;
            valueCell.textContent = value;
            deleteButton.textContent = "X";
            deleteButton.onclick = function () {
                deleteItem(key);
            };

            deleteCell.appendChild(deleteButton);
            row.appendChild(keyCell);
            row.appendChild(valueCell);
            row.appendChild(deleteCell);
            tbody.appendChild(row);
        }
    }
}

function getCurrentStorage() {
    var currentStorage;
    var storageSelect = document.getElementById("storageSelect");
    var selectedOption = storageSelect.options[storageSelect.selectedIndex].value;

    if (selectedOption === "local") {
        currentStorage = localStorage;
    } else if (selectedOption === "session") {
        currentStorage = sessionStorage;
    }

    return currentStorage;
}


function saveItem() {
    var keyInput = document.getElementById("keyInput");
   
    var valueInput = document.getElementById("valueInput");
    var key = keyInput.value;
    var value = valueInput.value;

    var storage = getCurrentStorage();
    storage.setItem(key, value);

    updateTable();
}

function deleteItem(key) {
    var confirmDelete = confirm("Вы уверены, что хотите удалить эту запись?");

    if (confirmDelete) {
        var storage = getCurrentStorage();
        storage.removeItem(key);
        updateTable();
    }
}

function clearStorage() {
    var confirmClear = confirm("Вы уверены, что хотите полностью очистить хранилище?");

    if (confirmClear) {
        var storage = getCurrentStorage();
        storage.clear();
        updateTable();
    }
}

window.onload = updateTable;