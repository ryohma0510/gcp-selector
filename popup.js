document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop form from trying to submit
  
    var serviceName = document.getElementById('service').value;
    var projectName = document.getElementById('project').value;
  
    var url = 'https://console.cloud.google.com/' + serviceName + '?project=' + projectName;
  
    // Open the URL in a new tab
    window.open(url, '_blank');
  });
  