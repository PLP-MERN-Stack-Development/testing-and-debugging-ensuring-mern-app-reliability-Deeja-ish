import React from 'react';

function BugItem({ bug, onDelete, onUpdateStatus }) {
  return (
    <div className="bug-item">
      <div className="bug-item-content">
        <h3>{bug.title}</h3>
        <p>{bug.description}</p>
        <strong className={`status-${bug.status.replace(' ', '-')}`}>
          {bug.status}
        </strong>
        <br />
        <small>Reported: {new Date(bug.createdAt).toLocaleString()}</small>
      </div>

      <div className="bug-item-actions">
        {bug.status !== 'In-Progress' && (
          <button onClick={() => onUpdateStatus(bug._id, 'In-Progress')}>
            Start Work
          </button>
        )}
        {bug.status !== 'Resolved' && (
          <button onClick={() => onUpdateStatus(bug._id, 'Resolved')}>
            Mark as Resolved
          </button>
        )}
        <button className="delete-btn" onClick={() => onDelete(bug._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BugItem;