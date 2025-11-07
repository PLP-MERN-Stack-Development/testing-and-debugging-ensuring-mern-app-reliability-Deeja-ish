import { useState, useEffect } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';
import bugService from './services/bugService';

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bugs on initial load
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        setLoading(true);
        const data = await bugService.getBugs();
        setBugs(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching bugs:', err);
        setError('Failed to load bugs. Please try refreshing.');
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []); 

  // Handler for reporting a new bug
  const handleReportBug = async (bugData) => {
    try {
      const newBug = await bugService.reportBug(bugData);
      setBugs([newBug, ...bugs]); 
    } catch (err) {
      console.error('Error reporting bug:', err);
      setError('Failed to report bug.');
    }
  };

  // Handler for updating bug status
  const handleUpdateStatus = async (id, status) => {
    try {
      const updatedBug = await bugService.updateBug(id, status);
      setBugs(
        bugs.map((bug) => (bug._id === id ? { ...bug, ...updatedBug } : bug))
      );
    } catch (err) {
      console.error('Error updating bug:', err);
      setError('Failed to update bug status.');
    }
  };

  // Handler for deleting a bug
  const handleDeleteBug = async (id) => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      try {
        await bugService.deleteBug(id);
        setBugs(bugs.filter((bug) => bug._id !== id));
      } catch (err) {
        console.error('Error deleting bug:', err);
        setError('Failed to delete bug.');
      }
    }
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <header>
          <h1>🐜 Bug Tracker</h1>
          <p>Track and resolve issues in your project.</p>
        </header>

        <main>
          <BugForm onReportBug={handleReportBug} />

          {loading && <p>Loading bugs...</p>}
          {error && <p className="error-message">{error}</p>}

          {!loading && !error && (
            <BugList
              bugs={bugs}
              onDelete={handleDeleteBug}
              onUpdateStatus={handleUpdateStatus}
            />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;