const com = require("@nkmjs/common");
const Document = require(`./lib/document`);

let doc = new Document();

console.log(com.NFOS.Get(Document));
console.log(com.NFOS.Get(doc));
console.log(com.NFOS.Get(doc) === NFOS.Get(Document));