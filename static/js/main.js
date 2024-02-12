function submitPrompt() {
  // Get the user input from the input field
  var prompt = document.getElementById('promptInput').value;

  // Send a POST request to the Flask API endpoint
  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: prompt })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse response as JSON
    return response.json();
  })
  .then(data => {
    // Get the URL of the generated image from the response data
    var imageUrl = data.image_url;
    
    // Display the generated image in the chat box
    displayImage(imageUrl);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while processing your request.');
  });
}

// Function to display the generated image in the chat box
function displayImage(imageUrl) {
  var imageContainer = document.getElementById('imageContainer');
  imageContainer.innerHTML = '<img src="' + imageUrl + '" alt="Generated Image">';
}
