'use strict';


const RESOURCES = require(`./lib/resources`);

let rsc = RESOURCES.Get(`https://i.pinimg.com/originals/e3/cf/7d/e3cf7d04683ad6f349c4861b5729a60f.jpg`);
//let resource = RESOURCES.Get(`pouet.png`);
rsc.Read({
    success:() => { console.log(`(1)success`); },
    error:(p_err) => { console.log(`(1)error`); console.log(p_err.message);},
    any:(p_err) => { console.log(`(1)any`);console.log(Object.prototype.toString.call(p_err.rsc._raw));}
});

let jrsc = RESOURCES.Get(`https://nebukam.github.io/steam/app/220/infos.json`);
//let resource = RESOURCES.Get(`pouet.png`);
jrsc.Read({
    success:() => { console.log(`(2)success`); },
    error:(p_err) => { console.log(`(2)error`); console.log(p_err.message);},
    any:(p_err) => { console.log(`(2)any`);console.log(p_err.rsc._raw);}
});


