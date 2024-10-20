// Array to store quotes with categories
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Wisdom" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate the category filter dropdown
function populateCategories() {
  // Extract unique categories from the quotes array
  const categories = [...new Set(quotes.map(quote => quote.category))];
  const categoryFilter = document.getElementById('categoryFilter');

  // Clear existing options and add "All Categories"
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  // Add unique categories to the dropdown
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter and display quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  let filteredQuotes = quotes;

  if (selectedCategory !== 'all') {
    filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
  }

  const filteredQuoteList = document.getElementById('quoteList');
  filteredQuoteList.innerHTML = ''; // Clear current list

  // Display the filtered quotes
  filteredQuotes.forEach(quote => {
    const li = document.createElement('li');
    li.textContent = `"${quote.text}" - Category: ${quote.category}`;
    filteredQuoteList.appendChild(li);
  });

  // Save the selected category to localStorage
  localStorage.setItem('selectedCategory', selectedCategory);
}

// Display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - Category: ${quote.category}`;
}

// Add a new quote dynamically
function createAddQuoteForm() {
  const quoteText = document.getElementById('newQuoteText').value;
  const quoteCategory = document.getElementById('newQuoteCategory').value;

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes(); // Save the updated quotes array to localStorage
    populateCategories(); // Update the category filter with new categories
    filterQuotes(); // Re-apply the filter in case it affects the new quote
    alert('New quote added successfully!');
    
    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert('Please enter both a quote and a category.');
  }
}

// Export the quotes to a JSON file
function exportQuotes() {
  const dataStr = JSON.stringify(quotes);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes); // Add imported quotes to the existing array
    saveQuotes(); // Save the updated quotes array to localStorage
    populateCategories(); // Re-populate the categories dropdown
    filterQuotes(); // Re-apply the filter in case it affects the imported quotes
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Load saved category filter and apply it on page load
document.addEventListener('DOMContentLoaded', () => {
  populateCategories(); // Populate categories when the page loads
  const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';
  document.getElementById('categoryFilter').value = lastSelectedCategory;
  filterQuotes(); // Apply the last selected filter to show the correct quotes
});

// Event listener for showing a new random quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
