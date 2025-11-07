import BugItem from './BugItem';

function BugList({ bugs, onDelete, onUpdateStatus }) {
  if (!bugs || bugs.length === 0) {
    return <h3>No bugs reported yet. Good job!</h3>;
  }

  return (
    <section className="bug-list">
      <h2>Current Bugs</h2>
      {bugs.map((bug) => (
        <BugItem
          key={bug._id}
          bug={bug}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </section>
  );
}

export default BugList;