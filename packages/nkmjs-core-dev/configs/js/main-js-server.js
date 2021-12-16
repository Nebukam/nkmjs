const { ServerBase } = require(`@nkmjs/core/lib/core-server`).electron;

class ServerProcess extends ServerBase{
    constructor(p_config){super(p_config);}

    _Boot(){
        super._Boot();
    }

}

module.exports = ServerProcess;