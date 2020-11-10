fetch("https://jsonplaceholder.typicode.com/users").then((response) => {
  if (response.status === 200) {
      return response.json();
  }
}).then(data => {
    console.log(data);
});
