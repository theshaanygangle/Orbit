// utils/socketManager.js
export const socketManager = (io) => {
  io.on("connection", (socket) => {
    console.log("⚡ New socket connected:", socket.id);

    // 1️⃣ Setup user when they connect
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
      console.log("✅ User joined socket room:", userData._id);
    });

    // 2️⃣ Join specific chat room (1-to-1 or group)
    socket.on("join_chat", (room) => {
      socket.join(room);
      console.log("📥 User joined chat room:", room);
    });

    // 3️⃣ Handle typing indicator
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop_typing", (room) => socket.in(room).emit("stop_typing"));

    // 4️⃣ Handle new messages
    socket.on("new_message", (newMessage) => {
      const chat = newMessage.chat;
      if (!chat.users) return console.log("❌ chat.users not defined");

      // send message to all users in chat except sender
      chat.users.forEach((user) => {
        if (user._id === newMessage.sender._id) return;
        socket.in(user._id).emit("message_received", newMessage);
      });
    });

    // 5️⃣ Notify group members about update (add/remove/rename)
    socket.on("group_update", (updatedChat) => {
      updatedChat.users.forEach((user) => {
        socket.in(user._id).emit("group_update", updatedChat);
      });
    });

    // 6️⃣ When user disconnects
    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
      socket.removeAllListeners();
    });
  });
};
