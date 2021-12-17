const server = require(`../index`);

class TestHandler extends server.handlers.Fetch{
    constructor(){super();}
    
    Handle(){ this.Fetch(this._request.params.url); }
    
    _OnFetchSuccess(p_response){
        this._response.send(p_response.data);
        super._OnFetchSuccess(p_response);
    }
}

class TestServer extends server.ServerBase{
    constructor(p_config){super(p_config);}

    _Init(){
        super._Init();
        this._RegisterAPIs({
            testFetchHandler:{
                route:`/route/:url`,
                handler:TestHandler,
                owner:this
            },
        });
    }

    _Boot(){
        super._Boot();
        this.testFetchHandler.Start();
    }

}

new TestServer();