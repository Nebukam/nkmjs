const io = require(`@nkmjs/io-core`);
const { IOElectron, FSIODelete } = require(`.`);

(new IOElectron()).Deploy();
/*
RESOURCES.GetDir(`some/random/path/bro/shit/fuck`).Write({ io:IO_TYPE.FILE_SYSTEM,
    success:(p_rsc)=>{ console.log(`Write success`);  },
    error:(p_err)=>{ console.log(`error`); console.log(p_err.message); }
});
*/
let rsc = io.RESOURCES.Get(`some/random/path/bro/shit/fuck/test.txt`, { cl:io.resources.JSONResource })
rsc.content = { someText:'yey' };

rsc.Read({ 
    success:(p_rsc)=>{ 
        console.log(`Write success -- will now delete`);
        io.RESOURCES.Get(`some/`).Delete({
            success:()=>{ console.log(`Delete success`); },
            error:(p_err)=>{ console.log(`Delete error`); console.log(p_err.message); }
        })
    },
    error:(p_err)=>{ 
        console.log(`Write fail -- will now write`);
        p_err.rsc.Write({
            success:(p_rsc)=>{ console.log(`Write success`); },
            error:(p_err)=>{ console.log(p_err.message); }
        });
    }
});
