// Get references to HTML elements
const expenseForm = document.getElementById("expense-form");
const expensesList = document.getElementById("expenses-list");

// Function to get expense data from the form
function getExpenseData() {
  const amount = parseFloat(document.getElementById("amount").value);
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  return { amount, description, category };
}

// Function to display an expense on the list
function displayExpense(expense) {
  // Create a list item element with Bootstrap classes
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex justify-content-between align-items-center";

  // Set the inner HTML of the list item with expense details and Bootstrap buttons
  listItem.innerHTML = `
    <span>${expense.amount} - ${expense.description} (${expense.category})</span>
    <div>
      <button class="btn btn-danger btn-sm delete-btn">Delete</button>
      <button class="btn btn-warning btn-sm edit-btn">Edit</button>
    </div>
  `;

  // Append the list item to the expenses list
  expensesList.appendChild(listItem);
}

// Handle form submission event
expenseForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const expenseData = getExpenseData();

  // Add expense to local storage (explained later)
  // ...

  // Clear the form after adding expense
  expenseForm.reset();

  displayExpense(expenseData);
});

// Add functionality to handle delete and edit buttons (for future implementation)
expensesList.addEventListener("click", function(event) {
  if (event.target.classList.contains("delete-btn")) {
    // Delete functionality
    event.target.closest("li").remove();
  } else if (event.target.classList.contains("edit-btn")) {
    // Edit functionality (not implemented)
    alert("Edit functionality not implemented.");
  }
});
