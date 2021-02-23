const { NFOS } = require(`@nkmjs/common`);
const Document = require(`./lib/document`);

let doc = new Document();

console.log(NFOS.Get(Document));
console.log(NFOS.Get(doc));
console.log(NFOS.Get(doc) === NFOS.Get(Document));