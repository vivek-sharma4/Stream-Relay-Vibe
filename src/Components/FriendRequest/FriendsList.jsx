import React, { useEffect, useState } from "react";
import axios from "axios";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const loggedInUserId = 1; // Assume the logged-in user has ID 1

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${loggedInUserId}`).then((response) => {
      const friendIds = response.data.friends;
      axios.get("http://localhost:3000/users").then((res) => {
        setFriends(res.data.filter((user) => friendIds.includes(user.id)));
      });
    });
  }, []);

  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
