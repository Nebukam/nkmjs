exports.defineTags = function (dictionary) {
    dictionary.defineTag("category", {
        mustHaveValue: true,
        canHaveType: false,
        canHaveName: false,
        onTagged: function (doclet, tag) {
            doclet.category = tag.value;
        }
    });

    dictionary.defineTag("signal", {
        mustHaveValue: true,
        canHaveType: false,
        canHaveName: true,
        onTagged: function (doclet, tag) {
            if(!doclet.signals){ doclet.signals = [];}
            
            let desc = tag.value.description,
            split = desc.split(`#`);
            //args = ;

            doclet.signals.push(tag.value);
        }
    });

    dictionary.defineTag("broadcasts", {
        mustHaveValue: true,
        canHaveType: false,
        canHaveName: true,
        onTagged: function (doclet, tag) {
            if(!doclet.broadcasts){ doclet.broadcasts = [];}
            doclet.broadcasts.push(tag.value);
        }
    });

    dictionary.defineTag("order", {
        mustHaveValue: true,
        canHaveType: false,
        canHaveName: false,
        onTagged: function (doclet, tag) {
            doclet.order = tag.value;
        }
    });

    dictionary.defineTag("group", {
        mustHaveValue: true,
        canHaveType: false,
        canHaveName: false,
        onTagged: function (doclet, tag) {
            doclet.group = tag.value;
        }
    });
    
    dictionary.defineTag("groupdescription", {
        mustHaveValue: true,
        canHaveType: false,
        canHaveName: false,
        onTagged: function (doclet, tag) {
            doclet.groupdescription = tag.value;
        }
    });

    dictionary.defineTag("grouporder", {
        mustHaveValue: true,
        canHaveType: false,
        canHaveName: false,
        onTagged: function (doclet, tag) {
            doclet.grouporder = tag.value;
        }
    });

    dictionary.defineTag("discreet", {
        mustHaveValue: false,
        canHaveType: false,
        canHaveName: false,
        onTagged: function (doclet, tag) {
            doclet.discreet = true;
        }
    });

    dictionary.defineTag("customtag", {
        mustHaveValue: true,
        canHaveType: false,
        canHaveName: false,
        onTagged: function (doclet, tag) {
            doclet.order = tag.value;
            if(!doclet.customtags){ doclet.customtags = [];}
            doclet.customtags.push(tag.value);
        }
    });
}; 