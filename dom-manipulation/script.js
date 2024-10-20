// Array to store quotes with categories
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Wisdom" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}
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

document.addEventListener('DOMContentLoaded', () => {
  const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
  if (lastQuote) {
    document.getElementById('quoteDisplay').innerHTML = `"${lastQuote.text}" - Category: ${lastQuote.category}`;
  }
});

// Event listener for showing a new random quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to export quotes to a JSON file
function exportQuotes() {
  const dataStr = JSON.stringify(quotes);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

