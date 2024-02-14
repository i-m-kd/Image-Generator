function submitPrompt() {
  var prompt = document.getElementById('promptInput').value;

  const validationResult = validatePrompt(prompt)
  if(!validationResult.isValid) {
    alert(validationResult.message);
    return;
  }

  fetch('/generate', {
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
    var taskId = data.task_id;
    checkTaskStatus(taskId)
    
  
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

function checkTaskStatus(taskId) {
  fetch(`/status/${taskId}`)
    .then(response => response.json())
    .then(data => {
      if (data.state === 'SUCCESS') {
        // Task completed successfully, display the image
        displayImage(data.result); // Assuming `result` is the image URL
      } else if (data.state === 'PENDING') {
        // Task is still pending, check again after a delay
        setTimeout(() => checkTaskStatus(taskId), 2000); // Poll every 2 seconds
      } else {
        // Handle failure or other task states
        alert('An error occurred: ' + data.status);
      }
    })
    .catch(error => console.error('Error checking task status:', error));
}
