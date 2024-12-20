import React, { useState } from "react";
import axios from "axios";

const UserList = ({ users, currentUserId }) => {
  const [sendingRequest, setSendingRequest] = useState(false);

  const sendFriendRequest = async (toUserId) => {
    setSendingRequest(true);
    try {
      await axios.post("http://localhost:3000/friendRequests", {
        fromUserId: currentUserId,
        toUserId,
        status: "pending",
      });
      alert("Friend request sent!");
    } catch (error) {
      console.error("Error sending friend request", error);
    } finally {
      setSendingRequest(false);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            {user.id !== currentUserId && (
              <button
                onClick={() => sendFriendRequest(user.id)}
                disabled={sendingRequest}
              >
                Send Friend Request
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
