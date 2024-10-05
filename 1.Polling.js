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
