chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "DETECT_VOICE") {
      // Send audio file to backend server for analysis
      fetch('http://localhost:3000/api/detect', {
        method: 'POST',
        body: message.audioData // Assuming audioData contains the audio file data
      })
      .then(response => response.json())
      .then(result => {
        // Handle classification result
        sendResponse(result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      return true; // Required to indicate asynchronous response
    }
  });
  