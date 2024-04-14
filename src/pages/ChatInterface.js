
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatInterface({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const currentUserId = window.localStorage.getItem('userId');
  const currentUserType = window.localStorage.getItem('userType');
  console.log(selectedUser);
  const handleSendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() === '') {
      return;
    }

    const message = {
      senderId: currentUserId,
      senderType: currentUserType,
      receiverId: selectedUser.id,
      receiverType: selectedUser.usertype,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, message]);
    axios.post('http://localhost/send_message.php', message)
      .then((response) => {
        // Handle response if needed
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setNewMessage('');
  };

  useEffect(() => {
    const fetchAndUpdateMessages = () => {
      if (!selectedUser || !selectedUser.id) {
        console.log("No selected user to fetch messages for.");
        return;
      }
      const senderId = currentUserId;
      const senderType = currentUserType;
      const recipientId = selectedUser.id;
      const recipientType = selectedUser.usertype;
      const data = { senderId: senderId, senderType: senderType, recipientId: recipientId, recipientType: recipientType };
      axios.post('http://localhost/get_messages.php', data)
        .then((response) => {
          if (response.data.status === 'success') {
            setMessages(response.data.messages);
          } else {
            console.error(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    fetchAndUpdateMessages();
    console.log(messages);
  }, [selectedUser, currentUserId]);

  return (
    <div className="chat">
      <div className="chat-header">
        {selectedUser && selectedUser.username ? (
          <h2>{selectedUser.username}</h2>
        ) : (
          <h2> </h2> // Render a blank heading if no user is selected
        )}
        {/* Render chat interface for selected user */}
      </div>
      <div id="chat-history" className="chat-history">
        {messages.map((message, index) => (
          <div key={index}>
            <SenderName senderId={message.senderId} senderType={message.senderType} />
            <span className="timestamp">
              {new Date(message.timestamp).toLocaleString([], {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <p className="message-data">{message.message}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <textarea
          name="message-to-send"
          id="message-to-send"
          rows="3"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button className="submit" type="button" onClick={handleSendMessage} disabled={!selectedUser || !selectedUser.id}>
          Send
        </button>
      </div>
    </div>
  );
}

function SenderName({ senderId, senderType }) {
  const [senderName, setSenderName] = useState('');

  useEffect(() => {
    const fetchSenderName = async () => {
      try {
        const response = await axios.post('http://localhost/get_username.php', { id: senderId, type:senderType });
        const name = response.data; // Assuming 'username' is the key containing the sender's name
        console.log(name);
        setSenderName(name);
      } catch (error) {
        console.error("Error fetching sender name:", error);
      }
    };

    fetchSenderName();
  }, [senderId]);

  return <span className="sendername">{senderName}</span>;
}

export default ChatInterface;
