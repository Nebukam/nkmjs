self.addEventListener('install', function (e) {
    chrome.%action_api_name%.onClicked.addListener(function (activeTab) {
        chrome.tabs.create({ url: runtime.getURL('index.html') });
    });
    self.skipWaiting();
});