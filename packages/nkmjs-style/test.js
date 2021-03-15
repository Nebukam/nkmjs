
const com = require("@nkmjs/common");
const { STYLE, COLOR, RGBA } = require(".");

let palette = STYLE.CreatePalette();

palette.AddVariables({
    'default-margin': '10px',
    'default-padding': '5px',
    'color-warning': COLOR.RGBA().rgba,
    'world': `the worldeuuuuh`
});

palette.AddSuffixes({
    'small-scroll': {
        '::-webkit-scrollbar-track': {
            'background-color': `|color-warning|`,
        },
        '::-webkit-scrollbar': {
            width: `2px`,
            height: `2px`,
            'background-color': `|color-warning|`
        },
        '::-webkit-scrollbar-thumb': {
            'background-color': '|color-warning|',
        },
        ':hover::-webkit-scrollbar': {
            width: `4px`,
            height: `4px`,
        },
        ':hover::-webkit-scrollbar-thumb': {
            'background-color': '|color-warning|',
        }
    },
    'a-thing': {
        '::OHYEAH': {
            'hello': `to |world|`,
        }
    }
});

palette.AddProperties({
    'display-flex-row-nowrap': {
        position: `relative`,
        display: `flex`,
        'align-content': `flex-start|default-margin|`,
        'align-items': `center`,
    },
    'A': {
        'a-0': `A0`,
        'a-1': `A1`
    },
    'B': {
        'b-0': `B0`
    },
    'C': {
        'c-0': 'C0',
        'a-0': `A0inC`
    },
    'D': {
        'a-0': 'A0inD',
        'a-1': `A1inD`
    }

});

palette.AddRulesets({
    '.someClass': {
        'a-margin': '|default-margin|'
    },
    '.some-other-Class': {
        'tadaa-margin': '|default-margin||world|'
    },
    '.myScrollBar': {
        '@': [`C`, `D`]
    }
});

// ----> 

console.log(STYLE.Get(STYLE, () => {
    return {
        '.someClass': {
            'test-1': 'value',
            'test-2': '|default-padding|'
        },
        '.someClass2': {
            'test-1': 'value',
            'test-2': '|default-padding|',
            '@': [`display-flex-row-nowrap`]
        },
        '.some-other-Class': ``,
        '@.myScrollBar': [`small-scroll`, `a-thing`],
        '.myScrollBar': {
            yep: `works`,
            '@': [`A`, `B`],
            'self': `selfValue`
        },
        '.myScrollBar::-webkit-scrollbar-track': { hail: 'satan' }
    };
}));

STYLE.Get(STYLE, () => { throw new Error(); });

let someColor = RGBA.Get(127, 127, 127);
console.log(`rgba = ${someColor.rgba}`);
console.log(`hexa = ${someColor.hexa}`);

let someHSLColor = COLOR.RGBAtoHSLA(someColor);
console.log(`hsla = ${someHSLColor.hsla}`);

console.log(STYLE.TF(`this is test`, {
    strong: true,
    color: com.FLAGS.WARNING,
    style: {
        'hum': 0,
        '@': [`A`]
    }
}));

