// Create a highlight popup element
const highlightPopup = document.createElement('div');
highlightPopup.id = 'highlight-extension-popup';
highlightPopup.style.cssText = `
  position: absolute;
  padding: 8px;
  background: #f39c12;
  color: white;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  z-index: 9999;
  display: none;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
`;
highlightPopup.innerText = 'Save Highlight';
document.body.appendChild(highlightPopup);

// Function to handle text selection
document.addEventListener('mouseup', function(event) {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  if (selectedText.length > 0) {
    // Show the highlight popup near the selection
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    highlightPopup.style.left = `${rect.left + window.scrollX}px`;
    highlightPopup.style.top = `${rect.bottom + window.scrollY + 5}px`;
    highlightPopup.style.display = 'block';
    
    // Store selected text and its context when the popup is clicked
    highlightPopup.onclick = function() {
      saveHighlight(selectedText, window.location.href, document.title);
      highlightPopup.style.display = 'none';
    };
  }
});

// Hide popup when clicking outside of it
document.addEventListener('mousedown', function(event) {
  if (event.target !== highlightPopup) {
    highlightPopup.style.display = 'none';
  }
});

// Function to save the highlight
function saveHighlight(text, url, pageTitle) {
  chrome.storage.local.get('highlights', function(data) {
    const highlights = data.highlights || [];
    highlights.push({
      id: Date.now(),
      text: text,
      url: url,
      pageTitle: pageTitle,
      date: new Date().toLocaleString()
    });
    
    chrome.storage.local.set({ highlights: highlights }, function() {
      console.log('Highlight saved!');
    });
  });
}