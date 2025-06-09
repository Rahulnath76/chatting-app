
const initiateSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} Joined the room`);
    })

    socket.on("send_message", async (data) => {
      // console.log(data);
      io.to(data.receiverId).emit("recieve_message", data.message);
      socket.emit("recieve_message", data.message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    })
  })
};

export { initiateSocket };
