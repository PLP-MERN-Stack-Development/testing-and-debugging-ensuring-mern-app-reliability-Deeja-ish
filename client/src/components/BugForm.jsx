import { useState } from 'react';

function BugForm({ onReportBug, initialData = {}, isUpdating = false }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Please add a title and description');
      return;
    }

    onReportBug({ title, description });

    // Clear form
    setTitle('');
    setDescription('');
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <h2>{isUpdating ? 'Update Bug' : 'Report a New Bug'}</h2>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Login button not working"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue in detail..."
            rows={4}
          />
        </div>
        <button type="submit">Submit Bug</button>
      </form>
    </section>
  );
}

export default BugForm;