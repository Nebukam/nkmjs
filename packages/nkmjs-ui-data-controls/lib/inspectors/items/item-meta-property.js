// Edit a single meta property (can be anything)
const u = require("@nkmjs/utils");
const data = require("@nkmjs/data-core");

const SIGNAL = require(`../../signal`);
const META_IDS = require(`../../meta-ids`);
const InspectorWidget = require(`../../inspector-widget`);

class MetaPropertyInspectorItem extends InspectorWidget {
    constructor() { super(); }

    static __watchMidUpdate = false;
    static __ppdata = (p_owner, p_data) => {

        if (u.isInstanceOf(p_data, data.Metadata)) { return p_data; }

        let metadata = p_data.metadata;
        if (u.isInstanceOf(p_data, data.Metadata)) { return metadata; }

        return null;

    }

    _Init() {

        super._Init();

        this._metaPath = null;
        this._metaID = null;

        this._mObserver = new data.helpers.MetadataObserver();

        this._Bind(this._OnPropertyUpdated);
        if (this.constructor.__watchMidUpdate) { this._Bind(this._OnPropertyMidUpdate); }

        this._dataPreProcessor = this.constructor.__ppdata;

    }

    /**
     * @type {array|string}
     */
    get metaPath() { return this._metaPath; }
    set metaPath(p_value) {
        if (this._metaPath === p_value) { return; }

        let oldPath = this._metaPath;
        this._metaPath = p_value;

        if (oldPath) {
            // Unhook old path
            this._mObserver.Unhook(data.SIGNAL.META_UPDATED, oldPath, this._OnPropertyUpdated);

            if (this.constructor.__watchMidUpdate) {
                this._mObserver.Unhook(data.SIGNAL.META_MID_UPDATE, oldPath, this._OnPropertyMidUpdate);
            }
        }

        if (p_value) {
            
            // Hook new path & update metaID
            if (u.isArray(p_value)) { this._metaID = p_value[p_value.length - 1]; }
            else { this._metaID = this._metaPath.split('.').pop(); }

            this._mObserver.Hook(data.SIGNAL.META_UPDATED, this._metaPath, this._OnPropertyUpdated);

            if (this.constructor.__watchMidUpdate) {
                this._mObserver.Hook(data.SIGNAL.META_MID_UPDATE, this._metaPath, this._OnPropertyMidUpdate);
            }

            if (this._data) { this._OnPropertyUpdated(this._data, this._metaPath, this.dataValue, null); }

        } else {
            this._metaID = null;
        }

    }

    /**
     * @description Represent the last item of the metaPath property
     * @type {string}
     */
    get metaID() { return this._metaID; }

    /**
     * @type {*}
     */
    get dataValue() {
        if (!this._data || !this._metaPath) { return null; }
        return this._data.Get(this._metaPath);
    }

    _OnDataChanged(p_oldData) {
        // Note : does not super()
        if (this._data) {
            this._mObserver.target = this._data;
            if (this._metaPath) { this._OnPropertyUpdated(this._data, this._metaPath, this.dataValue, null); }
        } else { this._mObserver.target = null; }
    }

    /**
     * @access protected
     * @description Internal method to check whether a value change is also an
     * incompatible type change with the current inspector item
     * @param {*} p_newValue 
     * @param {*} p_oldValue 
     * @returns 
     * @customtag override-me
     */
    _ValidateType(p_newValue, p_oldValue) { return true; }

    /**
     * @access protected
     * @description Called whenever the property value matching the metaPath has changed.
     * @param {data.core.Metadata} p_meta 
     * @param {string} p_path 
     * @param {*} p_value 
     * @param {*} p_oldValue 
     * @returns Whether the new value has been validated through _ValidateType or not
     * @customtag override-me
     */
    _OnPropertyUpdated(p_meta, p_path, p_value, p_oldValue) {
        if (!this._ValidateType(p_value, p_oldValue)) {
            // Value type not validated, dispatch property change event and likely skip further updates
            this._Broadcast(SIGNAL.META_PROPERTY_TYPE_CHANGED, this);
            return false;
        } else {
            // Update input / display values accordingly
            return true;
        }
    }

    /**
     * @access protected
     * @description Called whenever a metadata 'mid_update' matches this inspector item's metaPath.
     * @param {data.core.Metadata} p_meta 
     * @param {string} p_path 
     * @customtag override-me
     */
    _OnPropertyMidUpdate(p_meta, p_path) { }

    _CleanUp() {
        this.metaPath = null;
        super._CleanUp();
    }

}

module.exports = MetaPropertyInspectorItem;