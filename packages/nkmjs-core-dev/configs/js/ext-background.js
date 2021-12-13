var appTab = null;
%context_api%.%action_api_name%.onClicked.addListener(
    (activeTab) => {
        if(appTab){
            %context_api%.tabs.get(appTab.id, (t) =>{
                if(!t){
                    %context_api%.tabs.create({url: %context_api%.runtime.getURL('index.html')}, 
                        (t) => { appTab = t; });
                }else{
                    %context_api%.tabs.update(t.id, { active: true });
                }
            });
        }else{
            %context_api%.runtime.sendMessage(
                {ping: true}, null, 
                (response) => {
                    if (!response) {
                        %context_api%.tabs.create({url: %context_api%.runtime.getURL('index.html')}, 
                        (t) => { appTab = t; });
                }
        });
    }
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.url) {
            var url = request.url;
            fetch(url, { mode: 'no-cors' })
                .then((response) => {
                    response = response.clone();
                    if (!request.type || request.type == 'text') {
                        return response.text();
                    } else if (request.type == 'blob') {
                        return response.blob();
                    } else if (request.type == 'json') {
                        return response.json();
                    } else if (request.type == 'arrayBuffer') {
                        return response.arrayBuffer();
                    }
                }).then((data) => {
                    if (request.type == 'blob') {
                        var reader = new FileReader();
                        data = reader.readAsDataURL(data);
                    } else if (request.type == 'arrayBuffer') {
                        var enc = new TextEncoder();
                        data = enc.decode(data);
                    } else {
                        data = data;
                    }
                    sendResponse({ data: data });
                })
                .catch(error => {
                    sendResponse({ error: error });
                })
            return true;  // Will respond asynchronously.
        }
    });