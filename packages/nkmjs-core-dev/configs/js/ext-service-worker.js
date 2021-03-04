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