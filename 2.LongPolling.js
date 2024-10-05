//Note: These snippets provide the bare minimum just to convey the idea.

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
