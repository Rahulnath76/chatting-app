const initiateSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} Joined the room`);
    });

    // socket.on("test_event", (data) => {
    //   console.log("Got from client", data);
    //   socket.emit("receive_message", { text: "hi from server" });
    // });

    socket.on("send_message", async (data) => {
      console.log(data);
      const payload = {
        chatId: data.message.sender._id,
        message: data.message,
      }
      io.to(data.receiverId).emit("receive_message", payload);
      // socket.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
};

export { initiateSocket };
