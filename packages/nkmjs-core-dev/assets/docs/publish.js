/*global env: true */
'use strict';

var doop = require('jsdoc/util/doop');
var fs = require('jsdoc/fs');
var helper = require('jsdoc/util/templateHelper');
var logger = require('jsdoc/util/logger');
var path = require('jsdoc/path');
var taffy = require('taffydb').taffy;
var template = require('jsdoc/template');
var util = require('util');
const { relative } = require('path');

var htmlsafe = helper.htmlsafe;
var linkto = helper.linkto;
var resolveAuthorLinks = helper.resolveAuthorLinks;
var scopeToPunc = helper.scopeToPunc;
var hasOwnProp = Object.prototype.hasOwnProperty;

var data;
var view;

var outdir = path.normalize(env.opts.destination);
var globalDocMap = new Map();
var globalDocMapID = new Map();
var globalDocData = [];


var currentgroup = null;

function copyFile(source, target, cb) {
    var cbCalled = false;

    var rd = fs.createReadStream(source);
    rd.on("error", function (err) {
        done(err);
    });
    var wr = fs.createWriteStream(target);
    wr.on("error", function (err) {
        done(err);
    });
    wr.on("close", function (ex) {
        done();
    });
    rd.pipe(wr);

    function done(err) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }
}

function find(spec) {
    return helper.find(data, spec);
}

function tutoriallink(tutorial) {
    return helper.toTutorial(tutorial, null, { tag: 'em', classname: 'disabled', prefix: 'Tutorial: ' });
}

function getAncestorLinks(doclet) {
    return helper.getAncestorLinks(data, doclet);
}

function hashToLink(doclet, hash) {
    if (!/^(#.+)/.test(hash)) { return hash; }

    var url = helper.createLink(doclet);

    url = url.replace(/(#.+|$)/, hash);
    return '<a href="' + url + '">' + hash + '</a>';
}

function needsSignature(doclet) {
    var needsSig = false;

    // function and class definitions always get a signature
    if (doclet.kind === 'function' || doclet.kind === 'class' && !doclet.hideconstructor) {
        needsSig = true;
    }
    // typedefs that contain functions get a signature, too
    else if (doclet.kind === 'typedef' && doclet.type && doclet.type.names &&
        doclet.type.names.length) {
        for (var i = 0, l = doclet.type.names.length; i < l; i++) {
            if (doclet.type.names[i].toLowerCase() === 'function') {
                needsSig = true;
                break;
            }
        }
    }
    // and namespaces that are functions get a signature (but finding them is a		
    // bit messy)		
    else if (doclet.kind === 'namespace' && doclet.meta && doclet.meta.code &&
        doclet.meta.code.type && doclet.meta.code.type.match(/[Ff]unction/)) {
        needsSig = true;
    }

    return needsSig;
}

function getSignatureAttributes(item) {
    var attributes = [];

    if (item.optional) {
        attributes.push('opt');
    }

    if (item.nullable === true) {
        attributes.push('nullable');
    }
    else if (item.nullable === false) {
        attributes.push('non-null');
    }

    return attributes;
}

function updateItemName(item) {
    var attributes = getSignatureAttributes(item);
    var itemName = item.name || '';

    if (item.variable) {
        itemName = '&hellip;' + itemName;
    }

    if (attributes && attributes.length) {
        itemName = util.format('%s<span class="signature-attributes">%s</span>', itemName,
            attributes.join(', '));
    }

    return itemName;
}

function addParamAttributes(params) {
    return params.filter(function (param) {
        return param.name && param.name.indexOf('.') === -1;
    }).map(updateItemName);
}

function buildItemTypeStrings(item) {
    var types = [];

    if (item && item.type && item.type.names) {
        item.type.names.forEach(function (name) {
            types.push(linkto(name, htmlsafe(name)));
        });
    }

    return types;
}

function buildAttribsString(attribs, p_short = false) {
    var attribsString = '';

    if (attribs && attribs.length) {
        attribs.sort();
        attribs.reverse();
        for (let i = 0, n = attribs.length; i < n; i++) {
            let t = attribs[i];
            if (!p_short) { attribsString += `<span class="type-signature-tag tag-${t}">${t}</span>`; }
            else { attribsString += `<span class="type-signature-tag tag-${t}">·</span>`; }
        }
        //attribsString = htmlsafe(util.format('(%s) ', attribs.join(', ')));
    }

    return attribsString;
}

function addNonParamAttributes(items) {
    var types = [];

    items.forEach(function (item) {
        types = types.concat(buildItemTypeStrings(item));
    });

    return types;
}

function addSignatureParams(f) {
    var params = f.params ? addParamAttributes(f.params) : [];
    f.signature = util.format('%s(%s)', (f.signature || ''), params.join(', '));
}

function addSignatureReturns(f) {
    var attribs = [];
    var attribsString = '';
    var returnTypes = [];
    var returnTypesString = '';
    var source = f.yields || f.returns;

    // jam all the return-type attributes into an array. this could create odd results (for example,
    // if there are both nullable and non-nullable return types), but let's assume that most people
    // who use multiple @return tags aren't using Closure Compiler type annotations, and vice-versa.
    if (source) {
        source.forEach(function (item) {
            helper.getAttribs(item).forEach(function (attrib) {
                if (attribs.indexOf(attrib) === -1) {
                    attribs.push(attrib);
                }
            });
        });

        attribsString = buildAttribsString(attribs);
    }

    if (source) {
        returnTypes = addNonParamAttributes(source);
    }
    if (returnTypes.length) {
        returnTypes.forEach((v, i) => { returnTypes[i] = tplTxt(v); })
        returnTypesString = util.format(' &rarr; %s{%s}', attribsString, returnTypes.join('|'));
    }

    f.signature = '<span class="signature">' + (f.signature || '') + '</span>' +
        '<span class="type-signature">' + returnTypesString + '</span>';
}

function addSignatureTypes(f) {
    var types = f.type ? buildItemTypeStrings(f) : [];

    f.signature = (f.signature || '') + '<span class="type-signature">' +
        (types.length ? ' :' + types.join('|') : '') + '</span>';
}

function addAttribs(f) {
    var attribs = helper.getAttribs(f);
    if (f.customtags) { attribs.push(...f.customtags); }
    f.attribs = `<span class="attrib-tags">${buildAttribsString(attribs)}</span>`;
    f.shortAttribs = `<span class="attrib-tags">${buildAttribsString(attribs, true)}</span>`;
}

function shortenPaths(files, commonPrefix) {
    Object.keys(files).forEach(function (file) {
        files[file].shortened = files[file].resolved.replace(commonPrefix, '')
            // always use forward slashes
            .replace(/\\/g, '/');
    });

    return files;
}

function getPathFromDoclet(doclet) {
    if (!doclet.meta) {
        return null;
    }

    return doclet.meta.path && doclet.meta.path !== 'null' ?
        path.join(doclet.meta.path, doclet.meta.filename) :
        doclet.meta.filename;
}

function nmspace(p_name) {
    try {
        let split = p_name.split(`.`);
        split.splice(-2, 2); //remove name & ext, just keep prefixes
        return split.join(`.`);
    } catch (e) {
        return ``;
    }
}

function splitnmspace(p_name, p_size = 1) {
    if (!p_name) { return { namespace: null, name: p_name }; }
    p_name = p_name.replace(/\b(module|event):/g, '');
    try {
        let split = p_name.split(`.`),
            name = split.splice(-p_size, p_size);
        return { namespace: split.join(`.`), name: name.join(`.`) };
    } catch (e) {
        return { namespace: null, name: p_name };
    }
}

function tplTxt(p_name) {
    let nfo = splitnmspace(p_name);
    var name = nfo.name;
    try {
        let anchorSplit = name.split(`#`);
        if (anchorSplit.length >= 2) {
            name = `${anchorSplit.shift()}<span class="n-anchor"> → ${anchorSplit.join('#')}<span>`;
        }
    } catch (e) { }
    if (nfo.namespace) {
        return `<span class="namespace">${nfo.namespace}.</span>${name}`;
    } else {
        return name;
    }
}

function tplSignal(p_name) {
    let nfo = splitnmspace(p_name, 2);
    if (nfo.namespace) {
        let nameSplit = nfo.name.split(`.`);
        return `<span class="namespace">${nfo.namespace}.</span>${nameSplit[0]}<span class='signal-name'>${nameSplit[1]}</span>`;
    } else {
        return nfo.name;
    }
}

function shortName(p_name) {
    let split = p_name.split(`.`);
    if (split.length >= 2) {
        return split.pop();
    } else { return p_name; }
}

function inheritSignals(doclet, p_from = null) {

    if (p_from == null) {
        if (doclet.augments && doclet.augments.length) {
            doclet.augments.forEach((aug) => { inheritSignals(doclet, shortName(aug)); });
        }
        return;
    }

    try {
        p_from = find({ kind: 'class', name: p_from })[0];
        if (!p_from) { return; }
    } catch (e) { return; }


    // For each augment, inherit its signals 
    if (p_from.augments && p_from.augments.length) {
        p_from.augments.forEach((aug) => { inheritSignals(doclet, shortName(aug)); });
    }

    //push p_from signals into doctlet
    if (p_from.signals && p_from.signals.length) {
        if (!doclet.signals) { doclet.signals = []; }
        p_from.signals.forEach((s) => {

            let sCopy = {
                name: s.name,
                description: s.description,
                augment: p_from.longname
            };

            let tf = find({ kind: 'typedef', name: s.name });
            if (tf && tf.length) {

                sCopy.typedef = tf[0];

                let displayName = tf[0].type.names[0], exists = false;

                // Make sure a signal with the same displayName isn't registered already
                doclet.signals.forEach((__s) => { if (__s.displayName && __s.displayName === displayName) { exists = true; } });

                if (!exists) {
                    sCopy.displayName = displayName;
                    doclet.signals.push(sCopy);
                }
            }
        }
        );

    }


}

function generate(type, title, docs, filename, resolveLinks) {
    resolveLinks = resolveLinks === false ? false : true;

    var docData = {
        type: type,
        title: title,
        fname: `⁘ ${nmspace(filename)}`
    };

    for (let i = 0, n = docs.length; i < n; i++) {

        let doc = docs[i];
        let signals = doc.signals;

        inheritSignals(doc);

        if (signals) {

            signals.forEach((s) => {
                if (s.augment) { return; }
                let tf = find({ kind: 'typedef', name: s.name });
                if (tf && tf.length) {
                    s.typedef = tf[0];
                    s.displayName = tf[0].type.names[0];
                }
                else {
                    s.typedef = null;
                    s.displayName = ``;
                }
            });
        }

        //processDoclets( find({ memberof: doc.longname}), doc.longname, docData );
        if (type == `Class`) {
            // flagMeaningfulness( find({kind: 'function', memberof: doc.longname}), doc.longname );
        }

    }

    docData.docs = docs;
    docData.preProcessed = globalDocMapID.get();

    var outpath = path.join(outdir, filename),
        html = view.render('container.tmpl', docData);

    if (resolveLinks) {
        html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>
    }

    env.conf.nkmdash.contentGroups = null;

    fs.writeFileSync(outpath, html, 'utf8');
}

function generateSourceFiles(sourceFiles, encoding) {
    encoding = encoding || 'utf8';
    Object.keys(sourceFiles).forEach(function (file) {
        var source;
        // links are keyed to the shortened path in each doclet's `meta.shortpath` property
        var sourceOutfile = helper.getUniqueFilename(sourceFiles[file].shortened);
        helper.registerLink(sourceFiles[file].shortened, sourceOutfile);

        try {
            source = {
                kind: 'source',
                code: helper.htmlsafe(fs.readFileSync(sourceFiles[file].resolved, encoding))
            };
        }
        catch (e) {
            logger.error('Error while generating source file %s: %s', file, e.message);
        }

        generate('Source', sourceFiles[file].shortened, [source], sourceOutfile, false);
    });
}

/**
 * Look for classes or functions with the same name as modules (which indicates that the module
 * exports only that class or function), then attach the classes or functions to the `module`
 * property of the appropriate module doclets. The name of each class or function is also updated
 * for display purposes. This function mutates the original arrays.
 *
 * @private
 * @param {Array.<module:jsdoc/doclet.Doclet>} doclets - The array of classes and functions to
 * check.
 * @param {Array.<module:jsdoc/doclet.Doclet>} modules - The array of module doclets to search.
 */
function attachModuleSymbols(doclets, modules) {
    var symbols = {};

    // build a lookup table
    doclets.forEach(function (symbol) {
        symbols[symbol.longname] = symbols[symbol.longname] || [];
        symbols[symbol.longname].push(symbol);
    });

    return modules.map(function (module) {
        if (symbols[module.longname]) {
            module.modules = symbols[module.longname]
                // Only show symbols that have a description. Make an exception for classes, because
                // we want to show the constructor-signature heading no matter what.
                .filter(function (symbol) {
                    return symbol.description || symbol.kind === 'class';
                })
                .map(function (symbol) {
                    symbol = doop(symbol);

                    if (symbol.kind === 'class' || symbol.kind === 'function' && !symbol.hideconstructor) {
                        symbol.name = symbol.name.replace('module:', '(require("') + '"))';
                    }

                    return symbol;
                });
        }
    });
}

function buildGroupNav(member, nkmdash) {
    if (member.group) {
        if (currentgroup != member.group.name) {
            currentgroup = member.group.name;
            return `<li class="nav-group-header"${nkmdash.collapse ? ` style='display: none;'` : ``}> ${member.group.name}</li>`
        } else {
            return ``;
        }
    } else {
        currentgroup = null;
        return ``;
    }
}

// Process docs group/ordering etc

function rankAccess(a) {
    return a ?
        a == `private` ? 3 :
            a == `internal` ? 2 :
                a == `protected` ? 1 :
                    a == `public` ? 0 : 0
        : 0;
}

function rankOrder(a) {
    return a.order ? a.order * -1 : /^[^a-z]*$/.test(a.name) ? -100 : 0;
}

function orderDoclets(a, type) {
    let list = []; a.forEach((i) => { list.push(i); });

    list.sort((a, b) => {
        let _a = rankAccess(a.access),
            _b = rankAccess(b.access),
            _oa = rankOrder(a),
            _ob = rankOrder(b),
            group = 0,
            kind = a.kind.localeCompare(b.kind);

        if (a.group || b.group) {
            if (!b.group) { group = -1; }
            else if (!a.group) { group = 1; }
            else { group = a.group.localeCompare(b.group) }
        }

        return group != 0 ? group :
            (_a < _b) ? -1 :
                (_a > _b) ? 1 :
                    (_oa < _ob) ? -1 :
                        (_oa > _ob) ? 1 :
                            kind != 0 ? kind :
                                a.name.localeCompare(b.name);

    });

    if (type == 'members') {

    }

    return list;
}

function sortDoclets(list) {
    list.sort((a, b) => {
        let _a = rankAccess(a.access),
            _b = rankAccess(b.access),
            _oa = rankOrder(a),
            _ob = rankOrder(b),
            group = 0,
            kind = a.kind ? a.kind.localeCompare(b.kind) : 0,
            _na = splitnmspace(a.longname),
            _nb = splitnmspace(b.longname),
            space = 0;

        if (_na.namespace || _nb.namespace) {
            if (_na.namespace && _nb.namespace){ space = _na.namespace.localeCompare(_nb.namespace); }
            else{ space = _na.namespace ? -1 : 1; }
        }

        if (a.group || b.group) {
            if (!b.group) { group = -1; }
            else if (!a.group) { group = 1; }
            else { group = a.group.localeCompare(b.group) }
        }

        return space != 0 ? space :
            group != 0 ? group :
                (_a < _b) ? -1 :
                    (_a > _b) ? 1 :
                        (_oa < _ob) ? -1 :
                            (_oa > _ob) ? 1 :
                                kind != 0 ? kind * -1 :
                                    a.name.localeCompare(b.name);

    });
}

var docletCount = 0;
var docletsWithDocCount = 0;

function preProcessDoc(item) {

    if (item.kind == 'class') {
        //console.log(item.longname);
    }

    var docData = {
        longname: item.longname,
        groups: {},
        orderedGroups: [],
        roaming: []
    };

    globalDocMapID.set(item.longname, docData);
    globalDocMap.set(item, docData);
    globalDocData.push(docData);

    preProcessDoclets(find({ memberof: item.longname }), item, docData);

}

function preProcessDoclets(list, parent, docData) {

    var roaming = [];

    list.forEach((doclet) => {

        if (doclet.discreet && (doclet.inherited || doclet.override)) { return; }

        if (doclet.description) {
            docletCount++;
            if (doclet.description != `<p>TODO</p>`) { docletsWithDocCount++; }
        }

        let groupDoc;

        // Organize content by group        
        if (doclet.group) {

            groupDoc = docData.groups[doclet.group];
            if (!groupDoc) {
                docData.groups[doclet.group] =
                    groupDoc = {
                        name: doclet.group,
                        description: null,
                        items: [],
                        order: 0
                    };
                docData.orderedGroups.push(groupDoc);
            }

            if (!groupDoc.description && doclet.groupdescription) { groupDoc.description = doclet.groupdescription; }
            if (!doclet.grouporder) { groupDoc.order = doclet.grouporder; }
            if (!groupDoc.items.includes(doclet)) { groupDoc.items.push(doclet); }

        } else {
            roaming.push(doclet);
        }

        if (doclet.inherited) {
            if (doclet.inherits === doclet.overrides) {
            } else {
                doclet.overrides = doclet.inherits;
            }
        } else {
            if (doclet.overrides) {
                // "Real" override
                doclet.meaningfulOverride = true;
            }
        }

    });

    // Create a group from roaming data
    if (roaming.length) {
        let roamingName = `Misc`;
        docData.groups[roamingName] = groupDoc = { name: roamingName, description: null, items: roaming, order: Number.MAX_SAFE_INTEGER, roaming: true };
        docData.orderedGroups.push(groupDoc);
    }

    // Sort group content
    for (var key in docData.groups) {
        sortDoclets(docData.groups[key].items);
    }

    // Order group themselves
    docData.orderedGroups.sort((a, b) => { return b.order - a.order; });
    if (docData.orderedGroups.length == 1 && docData.orderedGroups[0].roaming) {
        docData.nogroup = true;
    }
    return list;

}

function postProcessGlobalDocs() {
    // Todo : remove empty groups etc
}

//

function buildMemberNav(items, itemHeading, itemsSeen, linktoFn) {
    var nav = '';

    if (items && items.length) {
        var itemsNav = '';
        var nkmdash = env && env.conf && env.conf.nkmdash || {};
        var level = typeof nkmdash.navLevel === 'number' && nkmdash.navLevel >= 0 ?
            nkmdash.navLevel :
            Infinity;

        var currentMemberOf = null;

        sortDoclets(items);

        items.forEach(function (item) {
            var displayName;
            //var methods = find({ kind: 'function', memberof: item.longname });
            //var members = find({ kind: 'member', memberof: item.longname });
            var conf = env && env.conf || {};
            var classes = '';
            var groupedData = globalDocMap.get(item);



            //methods = orderDoclets(methods);
            //members = orderDoclets(members);

            // show private class?
            if (nkmdash.private === false && item.access === 'private') return;

            // depth to show?
            if (item.ancestors && item.ancestors.length > level) {
                classes += 'level-hide';
            }

            if (item.memberof) {
                if (currentMemberOf != item.memberof) {
                    currentMemberOf = item.memberof;
                    itemsNav += `<li class="namespace"> ⁘ ${item.memberof}</li>`;
                }
            }

            classes = classes ? ' class="' + classes + '"' : '';
            itemsNav += '<li' + classes + '>';
            if (!hasOwnProp.call(item, 'longname')) {
                itemsNav += linktoFn('', item.name);
            } else if (!hasOwnProp.call(itemsSeen, item.longname)) {
                displayName = item.name;
                //if (conf.templates.default.useLongnameInNav) { displayName = item.longname; }
                //else { displayName = item.name; }

                displayName = displayName.replace(/\b(module|event):/g, '');

                if (displayName.indexOf(`.`) != -1) {
                    let split = displayName.split(`.`),
                        a = split.pop(),
                        b = split.join(`.`);
                    displayName = `<span class='namespace'>${b} </span>${a}`;
                }
                if (item.type === 2) { // Tutorial                    
                    displayName = item.longname.split('-'); displayName.shift(); displayName = displayName.join(' ');
                    item.displayName = displayName;
                    itemsNav += `<a href="tutorial-${item.name}.html">${displayName}</a>`;
                } else {
                    itemsNav += linktoFn(item.longname, displayName);
                }

                if (groupedData) {

                    groupedData.orderedGroups.forEach((g) => {

                        let localNav = ``;
                        g.items.forEach((i) => {

                            let dtype = i.kind;
                            if (i.customtags && i.customtags.length && i.customtags.includes(`read-only`)) { dtype = `read-only`; }

                            localNav += `<li data-type='${dtype}'`;
                            if (i.inherited) { localNav += ` class="inherited" `; }
                            if (nkmdash.collapse) { localNav += " style='display: none;'"; }
                            localNav += ">";
                            localNav += linkto(i.longname, i.name);
                            localNav += i.shortAttribs ? i.shortAttribs : ``;
                            localNav += "</li>";

                        });

                        if (localNav != ``) {
                            itemsNav += `<ul class="group">`;
                            itemsNav += groupedData.nogroup ? `` : `<li class="nav-group-header"${nkmdash.collapse ? ` style='display: none;'` : ``}><a href="#a-${g.name}"> ${g.name}</a></li>`
                            itemsNav += localNav;
                            itemsNav += `</ul>`;
                        }

                    });

                }

                itemsSeen[item.longname] = true;
            }
            itemsNav += '</li>';
        });

        if (itemsNav !== '') {
            nav += '<h3>' + itemHeading + '</h3><ul>' + itemsNav + '</ul>';
        }
    }

    //Navigation tweaks

    return nav;
}

function linktoTutorial(longname, name) {
    return tutoriallink(name);
}

function linktoExternal(longname, name) {
    return linkto(longname, name.replace(/(^"|"$)/g, ''));
}

/**
 * Create the navigation sidebar.
 * @param {object} members The members that will be used to create the sidebar.
 * @param {array<object>} members.classes
 * @param {array<object>} members.externals
 * @param {array<object>} members.globals
 * @param {array<object>} members.mixins
 * @param {array<object>} members.modules
 * @param {array<object>} members.namespaces
 * @param {array<object>} members.tutorials
 * @param {array<object>} members.events
 * @param {array<object>} members.interfaces
 * @return {string} The HTML for the navigation sidebar.
 */

function buildNav(members) {
    var nav = '<h2><a href="index.html">Home</a></h2>';
    var seen = {};
    var seenTutorials = {};
    var nkmdash = env && env.conf && env.conf.nkmdash || {};
    if (nkmdash.menu) {
        for (var menu in nkmdash.menu) {
            nav += '<h2><a ';
            //add attributes
            for (var attr in nkmdash.menu[menu]) {
                nav += attr + '="' + nkmdash.menu[menu][attr] + '" ';
            }
            nav += '>' + menu + '</a></h2>';
        }
    }
    var defaultOrder = [
        'Extras', 'Classes', 'Modules', 'Externals', 'Events', 'Namespaces', 'Mixins', 'Interfaces'
    ];
    var order = nkmdash.sectionOrder || defaultOrder;
    var sections = {
        Classes: buildMemberNav(members.classes, 'Classes', seen, linkto),
        Modules: buildMemberNav(members.modules, 'Modules', {}, linkto),
        Externals: buildMemberNav(members.externals, 'Externals', seen, linktoExternal),
        Events: buildMemberNav(members.events, 'Events', seen, linkto),
        Namespaces: buildMemberNav(members.namespaces, 'Namespaces', seen, linkto),
        Mixins: buildMemberNav(members.mixins, 'Mixins', seen, linkto),
        Extras: buildMemberNav(members.tutorials, 'Content', seenTutorials, linktoTutorial),
        Interfaces: buildMemberNav(members.interfaces, 'Interfaces', seen, linkto),
    };
    order.forEach(member => nav += sections[member]);

    return nav;

    if (members.globals.length) {
        var globalNav = '';

        members.globals.forEach(function (g) {
            if ((nkmdash.typedefs || g.kind !== 'typedef') && !hasOwnProp.call(seen, g.longname)) {
                globalNav += '<li>' + linkto(g.longname, g.name) + '</li>';
            }
            seen[g.longname] = true;
        });

        if (!globalNav) {
            // turn the heading into a link so you can actually get to the global page
            nav += '<h3>' + linkto('global', 'Global') + '</h3>';
        }
        else {
            nav += '<h3>Global</h3><ul>' + globalNav + '</ul>';
        }
    }

    return nav;
}


/**
    @param {TAFFY} taffyData See <http://taffydb.com/>.
    @param {object} opts
    @param {Tutorial} tutorials
 */
exports.publish = function (taffyData, opts, tutorials) {
    var nkmdash = env && env.conf && env.conf.nkmdash || {};
    data = taffyData;

    var conf = env.conf.templates || {};
    conf.default = conf.default || {};

    var templatePath = path.normalize(opts.template);
    view = new template.Template(path.join(templatePath, 'tmpl'));

    // claim some special filenames in advance, so the All-Powerful Overseer of Filename Uniqueness
    // doesn't try to hand them out later
    var indexUrl = helper.getUniqueFilename('index');
    // don't call registerLink() on this one! 'index' is also a valid longname

    var globalUrl = helper.getUniqueFilename('global');
    helper.registerLink('global', globalUrl);

    // set up templating
    view.layout = conf.default.layoutFile ?
        path.getResourcePath(path.dirname(conf.default.layoutFile),
            path.basename(conf.default.layoutFile)) :
        'layout.tmpl';

    // set up tutorials for helper
    helper.setTutorials(tutorials);

    data = helper.prune(data);

    nkmdash.sort !== false && data.sort('longname, version, since');
    helper.addEventListeners(data);

    var sourceFiles = {};
    var sourceFilePaths = [];
    data().each(function (doclet) {

        if (nkmdash.removeQuotes) {
            if (nkmdash.removeQuotes === "all") {
                if (doclet.name) {
                    doclet.name = doclet.name.replace(/"/g, '');
                    doclet.name = doclet.name.replace(/'/g, '');
                }
                if (doclet.longname) {
                    doclet.longname = doclet.longname.replace(/"/g, '');
                    doclet.longname = doclet.longname.replace(/'/g, '');
                }
            }
            else if (nkmdash.removeQuotes === "trim") {
                if (doclet.name) {
                    doclet.name = doclet.name.replace(/^"(.*)"$/, '$1');
                    doclet.name = doclet.name.replace(/^'(.*)'$/, '$1');
                }
                if (doclet.longname) {
                    doclet.longname = doclet.longname.replace(/^"(.*)"$/, '$1');
                    doclet.longname = doclet.longname.replace(/^'(.*)'$/, '$1');
                }
            }
        }
        doclet.attribs = '';

        if (doclet.examples) {
            doclet.examples = doclet.examples.map(function (example) {
                var caption, code;

                if (example && example.match(/^\s*<caption>([\s\S]+?)<\/caption>(\s*[\n\r])([\s\S]+)$/i)) {
                    caption = RegExp.$1;
                    code = RegExp.$3;
                }

                return {
                    caption: caption || '',
                    code: code || example || ''
                };
            });
        }
        if (doclet.see) {
            doclet.see.forEach(function (seeItem, i) {
                doclet.see[i] = hashToLink(doclet, seeItem);
            });
        }

        // build a list of source files
        var sourcePath;
        if (doclet.meta) {
            sourcePath = getPathFromDoclet(doclet);
            sourceFiles[sourcePath] = {
                resolved: sourcePath,
                shortened: null
            };
            if (sourceFilePaths.indexOf(sourcePath) === -1) {
                sourceFilePaths.push(sourcePath);
            }
        }

        preProcessDoc(doclet);

    });

    postProcessGlobalDocs();

    // update outdir if necessary, then create outdir
    var packageInfo = (find({ kind: 'package' }) || [])[0];
    if (packageInfo && packageInfo.name) {
        outdir = path.join(outdir, packageInfo.name, (packageInfo.version || ''));
    }
    fs.mkPath(outdir);

    // copy the template's static files to outdir
    var fromDir = path.join(templatePath, 'static');
    var staticFiles = fs.ls(fromDir, 3);

    staticFiles.forEach(function (fileName) {
        var toDir = fs.toDir(fileName.replace(fromDir, outdir));
        fs.mkPath(toDir);
        copyFile(fileName, path.join(toDir, path.basename(fileName)), function (err) { if (err) console.err(err); });
    });

    // copy user-specified static files to outdir
    var staticFilePaths;
    var staticFileFilter;
    var staticFileScanner;
    if (conf.default.staticFiles) {
        // The canonical property name is `include`. We accept `paths` for backwards compatibility
        // with a bug in JSDoc 3.2.x.
        staticFilePaths = conf.default.staticFiles.include ||
            conf.default.staticFiles.paths ||
            [];
        staticFileFilter = new (require('jsdoc/src/filter')).Filter(conf.default.staticFiles);
        staticFileScanner = new (require('jsdoc/src/scanner')).Scanner();

        staticFilePaths.forEach(function (filePath) {
            var extraStaticFiles = staticFileScanner.scan([filePath], 10, staticFileFilter);

            extraStaticFiles.forEach(function (fileName) {
                var sourcePath = fs.toDir(filePath);
                var toDir = fs.toDir(fileName.replace(sourcePath, outdir));
                fs.mkPath(toDir);
                copyFile(fileName, path.join(toDir, path.basename(fileName)), function (err) { if (err) console.err(err); });
            });
        });
    }

    if (sourceFilePaths.length) {
        sourceFiles = shortenPaths(sourceFiles, path.commonPrefix(sourceFilePaths));
    }
    data().each(function (doclet) {
        var url = helper.createLink(doclet);
        helper.registerLink(doclet.longname, url);

        // add a shortened version of the full path
        var docletPath;
        if (doclet.meta) {
            docletPath = getPathFromDoclet(doclet);
            docletPath = sourceFiles[docletPath].shortened;
            if (docletPath) {
                doclet.meta.shortpath = docletPath;
            }
        }
    });

    data().each(function (doclet) {
        var url = helper.longnameToUrl[doclet.longname];

        if (url.indexOf('#') > -1) {
            doclet.id = helper.longnameToUrl[doclet.longname].split(/#/).pop();
        }
        else {
            doclet.id = doclet.name;
        }

        if (needsSignature(doclet)) {
            addSignatureParams(doclet);
            addSignatureReturns(doclet);
            addAttribs(doclet);
        }
    });

    // do this after the urls have all been generated
    data().each(function (doclet) {
        doclet.ancestors = getAncestorLinks(doclet);

        if (doclet.kind === 'member') {
            addSignatureTypes(doclet);
            addAttribs(doclet);
        }

        if (doclet.kind === 'constant') {
            addSignatureTypes(doclet);
            addAttribs(doclet);
            doclet.kind = 'member';
        }
    });

    var members = helper.getMembers(data);
    members.tutorials = tutorials.children;

    // output pretty-printed source files by default
    var outputSourceFiles = conf.default && conf.default.outputSourceFiles !== false
        ? true
        : false;

    // add template helpers
    view.find = find;
    view.orderDoclets = orderDoclets;
    view.tplTxt = tplTxt;
    view.tplSignal = tplSignal;
    view.linkto = linkto;
    view.resolveAuthorLinks = resolveAuthorLinks;
    view.tutoriallink = tutoriallink;
    view.htmlsafe = htmlsafe;
    view.outputSourceFiles = outputSourceFiles;
    view.globalDocMap = globalDocMap;

    // once for all
    view.nav = buildNav(members);
    attachModuleSymbols(find({ longname: { left: 'module:' } }), members.modules);

    // generate the pretty-printed source files first so other pages can link to them
    if (outputSourceFiles) {
        generateSourceFiles(sourceFiles, opts.encoding);
    }

    if (members.globals.length) {
        generate('', 'Global', [{ kind: 'globalobj' }], globalUrl);
    }

    // index page displays information from package.json and lists files
    var files = find({ kind: 'file' });
    var packages = find({ kind: 'package' });

    generate('', 'Home',
        packages.concat(
            [{ kind: 'mainpage', readme: opts.readme, longname: (opts.mainpagetitle) ? opts.mainpagetitle : 'Main Page' }]
        ).concat(files),
        indexUrl);

    // set up the lists that we'll use to generate pages
    var classes = taffy(members.classes);
    var modules = taffy(members.modules);
    var namespaces = taffy(members.namespaces);
    var mixins = taffy(members.mixins);
    var externals = taffy(members.externals);
    var interfaces = taffy(members.interfaces);

    Object.keys(helper.longnameToUrl).forEach(function (longname) {
        var myModules = helper.find(modules, { longname: longname });
        if (myModules.length) {
            generate('Module', myModules[0].name, myModules, helper.longnameToUrl[longname]);
        }

        var myClasses = helper.find(classes, { longname: longname });
        if (myClasses.length) {
            generate('Class', myClasses[0].name, myClasses, helper.longnameToUrl[longname]);
        }

        var myNamespaces = helper.find(namespaces, { longname: longname });
        if (myNamespaces.length) {
            generate('Namespace', myNamespaces[0].name, myNamespaces, helper.longnameToUrl[longname]);
        }

        var myMixins = helper.find(mixins, { longname: longname });
        if (myMixins.length) {
            generate('Mixin', myMixins[0].name, myMixins, helper.longnameToUrl[longname]);
        }

        var myExternals = helper.find(externals, { longname: longname });
        if (myExternals.length) {
            generate('External', myExternals[0].name, myExternals, helper.longnameToUrl[longname]);
        }

        var myInterfaces = helper.find(interfaces, { longname: longname });
        if (myInterfaces.length) {
            generate('Interface', myInterfaces[0].name, myInterfaces, helper.longnameToUrl[longname]);
        }
    });

    var docProgress = ((docletsWithDocCount / docletCount) * 100).toFixed(2) + `%`;
    console.log(`${docletsWithDocCount}/${docletCount} :: ${docProgress}`);

    var metadata = JSON.parse(require('fs').readFileSync(`metadata.json`));
    metadata.documentation_progress = docProgress;
    require('fs').writeFileSync('metadata.json', JSON.stringify(metadata));

    // TODO: move the tutorial functions to templateHelper.js
    function generateTutorial(title, tutorial, filename) {

        var tutorialData = {
            title: tutorial.displayName,
            header: tutorial.title,
            content: tutorial.parse(),
            children: tutorial.children
        };

        var tutorialPath = path.join(outdir, filename);
        var html = view.render('tutorial.tmpl', tutorialData);

        // yes, you can use {@link} in tutorials too!
        html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>
        fs.writeFileSync(tutorialPath, html, 'utf8');
    }

    // tutorials can have only one parent so there is no risk for loops
    function saveChildren(node) {
        node.children.forEach(function (child) {
            generateTutorial(child.title.replace('-', ' '), child, helper.tutorialToUrl(child.name));
            saveChildren(child);
        });
    }

    saveChildren(tutorials);
};
