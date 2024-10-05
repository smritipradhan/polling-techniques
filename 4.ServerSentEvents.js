// server-side code in express

app.get("/real-time-updates", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");

  const sendRealTimeUpdates = () => {
    res.write("data: New data!\n\n");
    setTimeout(sendRealTimeUpdates, 3000);
  };

  sendRealTimeUpdates();
});

/*
We created a GET route /real-time-updates.
Set the Content-Type header as text/event-stream.
Use res.write() to send data to client. If we use res.send() or res.end() it will close the connection.
*/
