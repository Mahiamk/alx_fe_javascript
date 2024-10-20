// Array to store quotes with categories
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Wisdom" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - Category: ${quote.category}`;
}

// Function to add a new quote dynamically
function createAddQuoteForm() {
  const quoteText = document.getElementById('newQuoteText').value;
  const quoteCategory = document.getElementById('newQuoteCategory').value;

  if (quoteText && quoteCategory) {
    // Add the new quote to the array
    quotes.push({ text: quoteText, category: quoteCategory });

    // Create a new list item for the DOM
    const quoteListItem = document.createElement('li');
    quoteListItem.textContent = `"${quoteText}" - Category: ${quoteCategory}`;

    // Append the new list item to the quote list
    const quoteList = document.getElementById('quoteList');
    quoteList.appendChild(quoteListItem);

    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // Optional: Confirm to the user that the quote was added
    alert('New quote added successfully!');
  } else {
    alert('Please enter both a quote and a category.');
  }
}

// Event listener for showing a new random quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
