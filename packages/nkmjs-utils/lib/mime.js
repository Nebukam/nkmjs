'use strict';

/**
 * @typedef MIMEDefinition
 * @property {string} ext i.e '.js'
 * @property {string} desc i.e 'JavaScript'
 * @property {string} mime i.e 'text/javascript'
 */

/**
 * MIME is a wrapper class that contains a bunch of utilitary static methods to manipulate MIME types.
 * It also contains a collection of the most commonly used mime types.
 * @class
 * @hideconstructor
 * @category test
 * @memberof utils
 */
class MIME {
    constructor() { }

    /**
     * @access private
     */
    static __commonMIMEs = [
        { ext: `.localStorage`, desc: `A local storage object in string form`, type: `text/plain` },
        { ext: `.aac`, desc: `AAC audio`, type: `audio/aac` },
        { ext: `.abw`, desc: `AbiWord document`, type: `application/x-abiword` },
        { ext: `.arc`, desc: `Archive document (multiple files embedded)`, type: `application/x-freearc` },
        { ext: `.avi`, desc: `AVI: Audio Video Interleave`, type: `video/x-msvideo` },
        { ext: `.azw`, desc: `Amazon Kindle eBook format`, type: `application/vnd.amazon.ebook` },
        { ext: `.bin`, desc: `Any kind of binary data`, type: `application/octet-stream` },
        { ext: `.bmp`, desc: `Windows OS/2 Bitmap Graphics`, type: `image/bmp` },
        { ext: `.bz`, desc: `BZip archive`, type: `application/x-bzip` },
        { ext: `.bz2`, desc: `BZip2 archive`, type: `application/x-bzip2` },
        { ext: `.csh`, desc: `C-Shell script`, type: `application/x-csh` },
        { ext: `.css`, desc: `Cascading Style Sheets (CSS)`, type: `text/css` },
        { ext: `.csv`, desc: `Comma-separated values (CSV)`, type: `text/csv` },
        { ext: `.doc`, desc: `Microsoft Word`, type: `application/msword` },
        { ext: `.docx`, desc: `Microsoft Word (OpenXML)`, type: `application/vnd.openxmlformats-officedocument.wordprocessingml.document` },
        { ext: `.eot`, desc: `MS Embedded OpenType fonts`, type: `application/vnd.ms-fontobject` },
        { ext: `.epub`, desc: `Electronic publication (EPUB)`, type: `application/epub+zip` },
        { ext: `.gz`, desc: `GZip Compressed Archive`, type: `application/gzip` },
        { ext: `.gif`, desc: `Graphics Interchange Format (GIF)`, type: `image/gif` },
        { ext: `.htm`, desc: `HyperText Markup Language (HTML)`, type: `text/html` },
        { ext: `.html`, desc: `HyperText Markup Language (HTML)`, type: `text/html` },
        { ext: `.ico`, desc: `Icon format`, type: `image/vnd.microsoft.icon` },
        { ext: `.ics`, desc: `iCalendar format`, type: `text/calendar` },
        { ext: `.jar`, desc: `Java Archive (JAR)`, type: `application/java-archive` },
        { ext: `.jpeg`, desc: `JPEG images`, type: `image/jpeg` },
        { ext: `.jpg`, desc: `JPEG images`, type: `image/jpeg` },
        { ext: `.js`, desc: `JavaScript`, type: `text/javascript` },
        { ext: `.json`, desc: `JSON format`, type: `application/json` },
        { ext: `.jsonld`, desc: `JSON-LD format`, type: `application/ld+json` },
        { ext: `.mid`, desc: `Musical Instrument Digital Interface (MIDI)`, type: `audio/midi audio/x-midi` },
        { ext: `.midi`, desc: `Musical Instrument Digital Interface (MIDI)`, type: `audio/midi audio/x-midi` },
        { ext: `.mjs`, desc: `JavaScript module`, type: `text/javascript` },
        { ext: `.mp3`, desc: `MP3 audio`, type: `audio/mpeg` },
        { ext: `.mpeg`, desc: `MPEG Video`, type: `video/mpeg` },
        { ext: `.mpkg`, desc: `Apple Installer Package`, type: `application/vnd.apple.installer+xml` },
        { ext: `.odp`, desc: `OpenDocument presentation document`, type: `application/vnd.oasis.opendocument.presentation` },
        { ext: `.ods`, desc: `OpenDocument spreadsheet document`, type: `application/vnd.oasis.opendocument.spreadsheet` },
        { ext: `.odt`, desc: `OpenDocument text document`, type: `application/vnd.oasis.opendocument.text` },
        { ext: `.oga`, desc: `OGG audio`, type: `audio/ogg` },
        { ext: `.ogv`, desc: `OGG video`, type: `video/ogg` },
        { ext: `.ogx`, desc: `OGG`, type: `application/ogg` },
        { ext: `.opus`, desc: `Opus audio`, type: `audio/opus` },
        { ext: `.otf`, desc: `OpenType font`, type: `font/otf` },
        { ext: `.png`, desc: `Portable Network Graphics`, type: `image/png` },
        { ext: `.pdf`, desc: `Adobe Portable Document Format (PDF)`, type: `application/pdf` },
        { ext: `.php`, desc: `Hypertext Preprocessor (Personal Home Page)`, type: `application/x-httpd-php` },
        { ext: `.ppt`, desc: `Microsoft PowerPoint`, type: `application/vnd.ms-powerpoint` },
        { ext: `.pptx`, desc: `Microsoft PowerPoint (OpenXML)`, type: `application/vnd.openxmlformats-officedocument.presentationml.presentation` },
        { ext: `.rar`, desc: `RAR archive`, type: `application/vnd.rar` },
        { ext: `.rtf`, desc: `Rich Text Format (RTF)`, type: `application/rtf` },
        { ext: `.sh`, desc: `Bourne shell script`, type: `application/x-sh` },
        { ext: `.svg`, desc: `Scalable Vector Graphics (SVG)`, type: `image/svg+xml` },
        { ext: `.swf`, desc: `Small web format (SWF) or Adobe Flash document`, type: `application/x-shockwave-flash` },
        { ext: `.tar`, desc: `Tape Archive (TAR)`, type: `application/x-tar` },
        { ext: `.tif`, desc: `Tagged Image File Format (TIFF)`, type: `image/tiff` },
        { ext: `.tiff`, desc: `Tagged Image File Format (TIFF)`, type: `image/tiff` },
        { ext: `.ts`, desc: `MPEG transport stream`, type: `video/mp2t` },
        { ext: `.ttf`, desc: `TrueType Font`, type: `font/ttf` },
        { ext: `.txt`, desc: `Text, (generally ASCII or ISO 8859-n)`, type: `text/plain` },
        { ext: `.vsd`, desc: `Microsoft Visio`, type: `application/vnd.visio` },
        { ext: `.wav`, desc: `Waveform Audio Format`, type: `audio/wav` },
        { ext: `.weba`, desc: `WEBM audio`, type: `audio/webm` },
        { ext: `.webm`, desc: `WEBM video`, type: `video/webm` },
        { ext: `.webp`, desc: `WEBP image`, type: `image/webp` },
        { ext: `.woff`, desc: `Web Open Font Format (WOFF)`, type: `font/woff` },
        { ext: `.woff2`, desc: `Web Open Font Format (WOFF)`, type: `font/woff2` },
        { ext: `.xhtml`, desc: `XHTML`, type: `application/xhtml+xml` },
        { ext: `.xls`, desc: `Microsoft Excel`, type: `application/vnd.ms-excel` },
        { ext: `.xlsx`, desc: `Microsoft Excel (OpenXML)`, type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` },
        { ext: `.xml`, desc: `XML`, type: `text/xml` },
        { ext: `.xul`, desc: `XUL`, type: `application/vnd.mozilla.xul+xml` },
        { ext: `.zip`, desc: `ZIP archive`, type: `application/zip` },
        { ext: `.3gp`, desc: `3GPP audio/video container`, type: `video/3gpp audio/3gpp` },
        { ext: `.3g2`, desc: `3GPP2 audio/video container`, type: `video/3gpp2 audio/3gpp2` },
        { ext: `.7z`, desc: `7-zip archive`, type: `application/x-7z-compressed` }
    ];

    /**
     * @access private
     */
    static _GenerateMap() {
        this._map = {};
        for (let i = 0, n = this.__commonMIMEs.length; i < n; i++) {
            let m = this.__commonMIMEs[i];
            this._map[m.ext] = { mime: m.type, desc: m.desc };
        }
    }

    /**
     * @description The Map of all the currently registered `{@link MIMEDefinition}`s.
     * @type {Map}
     */
    static get mimes() {
        if (!this._map) { this._GenerateMap(); }
        return this._map;
    }

    /**
     * @description Returns the `{@link MIMEDefinition}`associated with a given extension, if any.
     * Any {@link MIMEDefinition} registered with the same .ext will be overwritten.
     * @param {string} p_ext 
     * @returns {MIMEDefinition}
     * @example MIME.Get('.js');
     */
    static Get(p_ext) {
        if (this._map) { return this._map[p_ext]; }
        else { this._GenerateMap(); }
        return this._map[p_ext];
    }

    /**
     * @description Registers a `{@link MIMEDefinition}` that can be retrieved using `{@link utils.MIME.Get|MIME.Get}`
     * @param {MIMEDefinition} p_mime MIME Definition to be added. Will be mapped to its `{@link MIMEDefinition.ext|ext}` property.
     * @example MIME.Set({ ext: '.js', desc: 'JavaScript', type: 'text/javascript' });
     */
    static Set(p_mime) {
        this._map[m.ext] = p_mime;
    }


}

module.exports = MIME;
