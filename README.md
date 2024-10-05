# Polling Techniques

Polling techniques in software development refer to a method where a system or client regularly checks or "polls" a resource (such as a server or a file) at set intervals to determine if there have been any changes or updates.

Polling techniques are often used in scenarios like fetching new data, checking the status of a process, or updating a UI. 

Example :-  Notification system, a chat-application, an upload progress bar or social media status indicator.

### 1. Regular Polling / Polling
### 2. Long Polling
### 3. Short Polling / Aggressive Polling
### 4. Adaptive Polling
### 5. Server Sent Events

## Polling / Regular Polling

This is the simplest approach to follow when building a real-time app. In Polling client makes request to server in hope for updated data. The client makes requests at fixed intervals to the server asking if new data is available or if the resource has changed. (Note :)

```
const URL = "https://jsonplaceholder.typicode.com/posts/";

const fetchPosts = async () => {
  try {
    console.log("Fetching new data...");

    const response = await (await fetch(URL)).json();

    console.log("Data fetched!");
  } catch (err) {
    console.log("Request failed: ", err.message);
  }
};

setInterval(fetchPosts, 5000);

```

### Advantages:
- Simple to implement.
- Works even if the server or network is unreliable.
### Disadvantages:
- Inefficient: Even if there are no updates, the client still sends requests, wasting resources.
- Can introduce unnecessary load on the server if polling frequency is high.
- May introduce a delay between the time an event occurs and when the client becomes aware of it (since the client only checks periodically).

## Long Polling

Long polling is a more efficient technique than regular polling. In long polling, the client sends a request to the server, but the server doesn't respond immediately. Instead, the server holds the request open until there is new data to send or a timeout occurs.

```
// Note: These snippets provide the bare minimum just to convey the idea. Mock function may overdose.

const URL = "https://jsonplaceholder.typicode.com/posts";

const fetchPosts = async () => {
  try {
    console.log("Fetching new data...");

    const response = await (await fetch(URL)).json();

    console.log("Data fetched!");

    return response;
  } catch (err) {
    console.log("Request failed: ", err.message);
  }
};

const longPoll = async () => {
  // response might be delayed as server might not have updated data
  const response = await fetchPosts();

  if (response) {
    return longPoll();
  }
};

longPoll();
```

### Advantages:

- Reduces unnecessary requests compared to regular polling.
- More real-time than fixed interval polling since the server sends data as soon as it becomes available.

### Disadvantages:

- Still involves an overhead of maintaining open HTTP connections.
- The client needs to handle potential timeouts and retry mechanisms.
- Can increase latency slightly since the client has to initiate a new request after each response.

## 3. Short Polling

In short polling, the client sends requests more frequently at very short intervals, aiming to minimize the delay between updates. This is useful for highly dynamic data where the delay between requests must be minimal, but it's less efficient.

### Advantages:

- Provides near-real-time data updates.
- Works in simple environments without the need for server-side changes.

### Disadvantages:
- Highly inefficient as it puts more load on the server with frequent requests.
- May introduce performance bottlenecks for both client and server if the polling rate is too aggressive.


## Server Sent Events

In SSE, client makes the initial request to the server to set up a connection. Post that server pushes updated data to client whenever it is available. No further engagement is required from client. SSE is a push-based technique where the server sends updates to the client over a persistent HTTP connection

### Advantages:
- Provides real-time updates without the client having to send frequent requests.
- More efficient than long polling since the connection is kept open, and the server pushes updates when available.

### Disadvantages:
- Requires support for HTTP/1.1 and may not work in environments with proxies that cut off persistent connections.
- SSE only supports one-way communication (server to client), so it’s less flexible than alternatives like WebSockets.


## Polling vs. Push Techniques

While polling (regular or long) is one of the most widely used techniques for real-time data retrieval, push-based techniques like WebSockets or Server-Sent Events (SSE) are generally more efficient for real-time communication. In push-based methods, the server sends updates to the client as soon as they are available, removing the need for the client to constantly request updates.

1. WebSockets: A full-duplex protocol for real-time, bidirectional communication between the client and server.
2. Server-Sent Events (SSE): A lightweight alternative where the server pushes updates to the client in one direction.

When to Use Polling:

1. Simple Applications: When the overhead of setting up WebSockets or other real-time communication systems isn’t justified.
2. Non-Critical Real-Time: When it’s acceptable to have some delay in getting data.
3. Legacy Systems: When working with systems that don’t support more advanced techniques like WebSockets or SSE.

### Polling Best Practices:

- Set Appropriate Polling Intervals: Adjust the interval based on the expected frequency of changes.
- Use Adaptive Polling: Increase the polling interval when no changes are detected and reduce it during active periods.
- Handle Timeouts and Errors: Always handle network failures and server timeouts to ensure the client can gracefully retry.
- Use Long Polling If Necessary: For more real-time updates, consider long polling if push mechanisms like WebSockets are unavailable.
- By understanding the various polling techniques, you can make better design choices based on your specific application needs.


Refer : https://dev.to/thesanjeevsharma/real-time-updates-polling-sse-and-web-sockets-277i