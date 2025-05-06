import React, { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [events, setEvents] = useState([]);
  const [eventInput, setEventInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    if (eventInput.trim()) {
      setEvents([...events, eventInput]);
      setEventInput('');
    }
  };

  const handleUpdate = () => {
    if (eventInput.trim() && editIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents[editIndex] = eventInput;
      setEvents(updatedEvents);
      setEventInput('');
      setEditIndex(null);
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEventInput(events[index]);
    setActiveTab('update');
  };

  const handleDelete = (index) => {
    const filtered = events.filter((_, i) => i !== index);
    setEvents(filtered);
  };

  const tabs = ['home', 'add', 'update', 'delete', 'about'];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
      color: '#fff',
      fontFamily: 'Segoe UI, sans-serif',
      padding: '2rem'
    }}>
      {/* Navbar Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setEventInput(''); setEditIndex(null); }}
            style={{
              backgroundColor: activeTab === tab ? '#fff' : '#ffffff30',
              color: activeTab === tab ? '#2c5364' : '#fff',
              margin: '0 0.5rem',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Card UI */}
      <div style={{
        backgroundColor: '#ffffff20',
        padding: '2rem',
        borderRadius: '1rem',
        width: '90%',
        maxWidth: '500px',
        margin: '0 auto',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        textAlign: 'center'
      }}>
        {activeTab === 'home' && (
          <>
            <h1>Welcome to Event Manager</h1>
            <p style={{ fontSize: '1.1rem' }}>
              Use this application to add, update, and delete events.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Navigate using the tabs above to get started.
            </p>
          </>
        )}

        {activeTab === 'add' && (
          <>
            <h2>Add Event</h2>
            <input
              value={eventInput}
              onChange={(e) => setEventInput(e.target.value)}
              placeholder="Enter event name"
              style={{ padding: '0.5rem', width: '80%', marginBottom: '1rem', borderRadius: '0.5rem' }}
            />
            <br />
            <button onClick={handleAdd} style={buttonStyle}>Add</button>
          </>
        )}

        {activeTab === 'update' && (
          <>
            <h2>Update Event</h2>
            <input
              value={eventInput}
              onChange={(e) => setEventInput(e.target.value)}
              placeholder="Update event name"
              style={{ padding: '0.5rem', width: '80%', marginBottom: '1rem', borderRadius: '0.5rem' }}
            />
            <br />
            <button onClick={handleUpdate} style={buttonStyle}>Update</button>
          </>
        )}

        {activeTab === 'delete' && (
          <>
            <h2>Delete Events</h2>
            {events.map((event, index) => (
              <div key={index} style={{
                backgroundColor: '#fff',
                color: '#2c5364',
                margin: '0.5rem 0',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                {event}
                <div>
                  <button onClick={() => handleEditClick(index)} style={{ marginRight: '0.5rem' }}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'about' && (
          <>
            <h2>About</h2>
            <p>This simple React app allows you to manage events without a backend.</p>
            <p>All data is stored in memory for demonstration purposes.</p>
          </>
        )}
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#fff',
  color: '#2c5364',
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '0.5rem',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

export default App;
