
var links=["url1","url2"];
// Download 
function downloadCheckedLinks() {


alert(globallinkdata)

  /* for (var i = 0; i < visibleLinks.length; ++i) {
    if (document.getElementById('check' + i).checked) {
      chrome.downloads.download({url: visibleLinks[i]},
                                             function(id) {
      });
    }
  }
  window.close(); */
}

chrome.extension.onRequest.addListener(function(lk) {
  links =  lk;
});


window.onload = function() {
  document.getElementById('download1').onclick = downloadCheckedLinks;

	chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'send_links.js', allFrames: true});
    });
  }); 
};
