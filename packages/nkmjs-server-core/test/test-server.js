const server = require(`../index`);

class TestHandler extends server.handlers.Fetch{
    constructor(){super();}
    
    Handle(){ 
        console.log(this._req.query.url);
        this.Fetch(this._req.query.url); 
    }
    
    _OnFetchSuccess(p_response){
        this._res.send(p_response.data);
        super._OnFetchSuccess(p_response);
    }
}

class TestServer extends server.ServerBase{
    constructor(p_config){super(p_config);}

    _Init(){
        super._Init();
        this._RegisterAPIs({
            testFetchHandler:{
                route:`/route/`,
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