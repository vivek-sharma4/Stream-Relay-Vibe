import React, { useState, useEffect } from "react";
import axios from "axios";

const FriendRequests = ({ userId }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/friendRequests?toUserId=${userId}`
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching friend requests", error);
      }
    };
    fetchRequests();
  }, [userId]);

  const handleRequest = async (requestId, action) => {
    try {
      await axios.patch(`http://localhost:3000/friendRequests/${requestId}`, {
        status: action,
      });

      if (action === "accepted") {
        const request = requests.find((req) => req.id === requestId);
        // Update both users' friends lists if needed
        await axios.patch(`http://localhost:3000/users/${request.fromUserId}`, {
          friends: [...request.fromUserId.friends, userId],
        });
        await axios.patch(`http://localhost:3000/users/${userId}`, {
          friends: [...userId.friends, request.fromUserId],
        });
      }

      // Remove the request from the UI after it's handled
      setRequests(requests.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error("Error handling friend request", error);
    }
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li key={request.id}>
              {`Friend request from user ${request.fromUserId}`}
              <button
                onClick={() => handleRequest(request.id, "accepted")}
              >
                Accept
              </button>
              <button
                onClick={() => handleRequest(request.id, "rejected")}
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendRequests;
