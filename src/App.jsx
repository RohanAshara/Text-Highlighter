import { useState, useEffect } from 'react';
import './App.css';
import HighlightItem from './components/HighlightItem';

function App() {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load highlights from Chrome storage when component mounts
    const loadHighlights = async () => {
      if (chrome.storage) {
        chrome.storage.local.get('highlights', (data) => {
          setHighlights(data.highlights || []);
          setLoading(false);
        });
      } else {
        // For development outside of extension
        setHighlights([]);
        setLoading(false);
      }
    };

    loadHighlights();
  }, []);

  const deleteHighlight = (id) => {
    const updatedHighlights = highlights.filter(highlight => highlight.id !== id);
    setHighlights(updatedHighlights);
    
    if (chrome.storage) {
      chrome.storage.local.set({ highlights: updatedHighlights });
    }
  };

  const clearAllHighlights = () => {
    setHighlights([]);
    
    if (chrome.storage) {
      chrome.storage.local.set({ highlights: [] });
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Text Highlighter</h1>
        {highlights.length > 0 && (
          <button className="clear-btn" onClick={clearAllHighlights}>
            Clear All
          </button>
        )}
      </header>

      <div className="highlights-container">
        {loading ? (
          <p>Loading highlights...</p>
        ) : highlights.length === 0 ? (
          <div className="empty-state">
            <p>No highlights saved yet.</p>
            <p>Select text on any webpage and click "Save Highlight" to get started!</p>
          </div>
        ) : (
          highlights.map(highlight => (
            <HighlightItem 
              key={highlight.id}
              highlight={highlight}
              onDelete={() => deleteHighlight(highlight.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;