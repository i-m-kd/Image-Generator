function submitPrompt() {
  var prompt = document.getElementById('promptInput').value;

  const validationResult = validatePrompt(prompt)
  if(!validationResult.isValid) {
    alert(validationResult.message);
    return;
  }

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

function validatePrompt(prompt) {
  if(!prompt) {
    return { isValid: false, message: "Prompt cannot be empty !!" };
  }
  if (prompt.length > 256) {
    return { isValid: false, message: "Prompt is too long. Maximum allowed characters: 256 !!" };
  }
  if (!/^[a-zA-Z]+$/.test(prompt)) {
    return { isValid: false, message: "Prompt must only contain alphabets for now !!" };
  }
  return { isValid: true}
}