const { ElectronBase } = require(`@nkmjs/core/lib-electron`).electron;

class MyElectronApp extends ElectronBase{
    
    constructor(p_config){super(p_config);}

}

module.exports = MyElectronApp;