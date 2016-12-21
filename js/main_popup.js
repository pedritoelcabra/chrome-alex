

function onWindowLoad() {
  renderStatus('Alex loaded!');
  enableActionButton();

  document.getElementById("launch-button").addEventListener("click", launchAlex);
}

window.onload = onWindowLoad;

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function enableActionButton(){
  document.getElementById('action').innerHTML = 
  `
  <input type="button" id="launch-button" value="Launch"">
  `;
}

function launchAlex(){
  chrome.tabs.executeScript(null, {
    file: "js/content_script.js"
  }, function() {
    if (chrome.runtime.lastError) {
      renderStatus('There was an error injecting script : \n' + chrome.runtime.lastError.message);
    }
  });
}

chrome.runtime.onMessage.addListener(function(request, sender) {
  console.log(request);
  if (request.action == "getText") {
    renderStatus(request.textContent);
  }
});