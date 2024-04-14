import React, { Fragment, useState, useEffect } from 'react';
import UserList from './UserList';
import ChatInterface from './ChatInterface';
import OfficerHeader from './OfficerHeader';
function OfficerChat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const handleUserSelect = (user) => {
      setSelectedUser(user);
  };
  return (
    <Fragment>
      <header>
        <div className="header-container">
          <h1>Chat</h1>
          <OfficerHeader />
        </div>
      </header>
      <section id="chat">
        <div className="chat-box">
          <div className="container clearfix">
              <UserList onSelectUser={handleUserSelect} />
              <ChatInterface selectedUser={selectedUser} />
          </div>
        </div>
      </section>
      </Fragment>
  );
}

export default OfficerChat;