document.getElementById('detectButton').addEventListener('click', function() {
    const fileInput = document.getElementById('audioFile');
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
      const audioData = event.target.result;
      chrome.runtime.sendMessage({ type: "DETECT_VOICE", audioData }, function(response) {
        document.getElementById('result').innerText = response.result;
      });
    };
    
    reader.readAsDataURL(file);
  });
  