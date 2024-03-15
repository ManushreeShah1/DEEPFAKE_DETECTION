// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "UPLOAD_FILE") {
      // Create a file input element
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "audio/*"; // Accept audio files only
      
      // Trigger click event to open file picker dialog
      fileInput.click();
      
      // Listen for file selection
      fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        // Read the file as data URL
        reader.onload = function(event) {
          const audioData = event.target.result;
          // Send the audio data to the background script
          chrome.runtime.sendMessage({ type: "DETECT_VOICE", audioData }, function(response) {
            // Handle the response if needed
            console.log(response.result);
          });
        };
        
        reader.readAsDataURL(file);
      });
    }
  });
  