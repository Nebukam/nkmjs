const electron = require(`@nkmjs/core/electron`);

class MyElectronApp extends electron.core.ElectronBase{
    
    constructor(p_config){super(p_config);}

}

module.exports = MyElectronApp;