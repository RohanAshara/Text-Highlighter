function HighlightItem({ highlight, onDelete }) {
    const openSourcePage = () => {
      if (chrome.tabs) {
        chrome.tabs.create({ url: highlight.url });
      }
    };
  
    return (
      <div className="highlight-item">
        <div className="highlight-content">
          <div className="highlight-text">{highlight.text}</div>
          <div className="highlight-meta">
            <span className="highlight-page" onClick={openSourcePage}>
              {highlight.pageTitle}
            </span>
            <span className="highlight-date">{highlight.date}</span>
          </div>
        </div>
        <button 
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          Delete
        </button>
      </div>
    );
  }
  
  export default HighlightItem;