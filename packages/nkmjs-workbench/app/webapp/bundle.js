"use strict";function _wrapNativeSuper(Class){var _cache=typeof Map==="function"?new Map():undefined;_wrapNativeSuper=function _wrapNativeSuper(Class){if(Class===null||!_isNativeFunction(Class))return Class;if(typeof Class!=="function"){throw new TypeError("Super expression must either be null or a function");}if(typeof _cache!=="undefined"){if(_cache.has(Class))return _cache.get(Class);_cache.set(Class,Wrapper);}function Wrapper(){return _construct(Class,arguments,_getPrototypeOf(this).constructor);}Wrapper.prototype=Object.create(Class.prototype,{constructor:{value:Wrapper,enumerable:false,writable:true,configurable:true}});return _setPrototypeOf(Wrapper,Class);};return _wrapNativeSuper(Class);}function _construct(Parent,args,Class){if(_isNativeReflectConstruct()){_construct=Reflect.construct;}else{_construct=function _construct(Parent,args,Class){var a=[null];a.push.apply(a,args);var Constructor=Function.bind.apply(Parent,a);var instance=new Constructor();if(Class)_setPrototypeOf(instance,Class.prototype);return instance;};}return _construct.apply(null,arguments);}function _isNativeFunction(fn){return Function.toString.call(fn).indexOf("[native code]")!==-1;}function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function set(target,property,value,receiver){if(typeof Reflect!=="undefined"&&Reflect.set){set=Reflect.set;}else{set=function set(target,property,value,receiver){var base=_superPropBase(target,property);var desc;if(base){desc=Object.getOwnPropertyDescriptor(base,property);if(desc.set){desc.set.call(receiver,value);return true;}else if(!desc.writable){return false;}}desc=Object.getOwnPropertyDescriptor(receiver,property);if(desc){if(!desc.writable){return false;}desc.value=value;Object.defineProperty(receiver,property,desc);}else{_defineProperty(receiver,property,value);}return true;};}return set(target,property,value,receiver);}function _set(target,property,value,receiver,isStrict){var s=set(target,property,value,receiver||target);if(!s&&isStrict){throw new Error('failed to set property');}return value;}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(iter))return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _get(target,property,receiver){if(typeof Reflect!=="undefined"&&Reflect.get){_get=Reflect.get;}else{_get=function _get(target,property,receiver){var base=_superPropBase(target,property);if(!base)return;var desc=Object.getOwnPropertyDescriptor(base,property);if(desc.get){return desc.get.call(receiver);}return desc.value;};}return _get(target,property,receiver||target);}function _superPropBase(object,property){while(!Object.prototype.hasOwnProperty.call(object,property)){object=_getPrototypeOf(object);if(object===null)break;}return object;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=_getPrototypeOf(Derived),result;if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else{result=Super.apply(this,arguments);}return _possibleConstructorReturn(this,result);};}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true;}catch(e){return false;}}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a;}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r);},p,p.exports,r,e,n,t);}return n[i].exports;}for(var u="function"==typeof require&&require,i=0;i<t.length;i++){o(t[i]);}return o;}return r;})()({1:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={RELAY:require("./lib/relay"),Request:require("./lib/request"),ACTION_REQUEST:require("./lib/action-request"),Action:require("./lib/actions/action"),ActionGroup:require("./lib/actions/action-group"),ActionStack:require("./lib/actions/action-stack"),COMMAND_SIGNAL:require("./lib/commands/command-event"),Command:require("./lib/commands/command"),CommandFn:require("./lib/commands/command-fn"),CommandBox:require("./lib/commands/command-box"),CommandChain:require("./lib/commands/command-chain"),CommandAction:require("./lib/commands/command-action")};},{"./lib/action-request":2,"./lib/actions/action":5,"./lib/actions/action-group":3,"./lib/actions/action-stack":4,"./lib/commands/command":12,"./lib/commands/command-action":7,"./lib/commands/command-box":8,"./lib/commands/command-chain":9,"./lib/commands/command-event":10,"./lib/commands/command-fn":11,"./lib/relay":13,"./lib/request":14}],2:[function(require,module,exports){'use strict';var ACTION_REQUEST=function ACTION_REQUEST(){_classCallCheck(this,ACTION_REQUEST);};_defineProperty(ACTION_REQUEST,"EXIT",'exit');_defineProperty(ACTION_REQUEST,"EDIT",'edit');_defineProperty(ACTION_REQUEST,"PREVIEW",'preview');_defineProperty(ACTION_REQUEST,"OPEN",'open');_defineProperty(ACTION_REQUEST,"CLOSE",'close');_defineProperty(ACTION_REQUEST,"CREATE",'create');_defineProperty(ACTION_REQUEST,"SAVE",'save');_defineProperty(ACTION_REQUEST,"DELETE",'delete');_defineProperty(ACTION_REQUEST,"RENAME",'rename');_defineProperty(ACTION_REQUEST,"APPLY",'apply');_defineProperty(ACTION_REQUEST,"DIALOG",'dialog');module.exports["default"]=module.exports=ACTION_REQUEST;},{}],3:[function(require,module,exports){'use strict';var Action=require("./action");var ActionGroup=/*#__PURE__*/function(_Action){_inherits(ActionGroup,_Action);var _super=_createSuper(ActionGroup);function ActionGroup(){_classCallCheck(this,ActionGroup);return _super.call(this);}_createClass(ActionGroup,[{key:"_Init",value:// ----> Init
/**
     * @access protected
     */function _Init(){_get(_getPrototypeOf(ActionGroup.prototype),"_Init",this).call(this);this._actions=new Array(0);this._last=null;}},{key:"last",get:function get(){return this._last;}/**
     * @access protected
     * @param {*} p_action 
     */},{key:"_Register",value:function _Register(p_action){this._actions.push(p_action);this._last=p_action;return p_action;}},{key:"Do",value:function Do(p_operation){//Do nothing
var p_merge=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;}/**
     * @access protected
     * @param {*} p_operation 
     * @param {*} p_merge 
     */},{key:"_InternalDo",value:function _InternalDo(p_operation){//Do nothing
var p_merge=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;}/**
     * @access protected
     */},{key:"_InternalUndo",value:function _InternalUndo(){var list=this._actions;for(var i=list.length-1;i>=0;i--){list[i].Undo();}}/**
     * @access protected
     */},{key:"_InternalRedo",value:function _InternalRedo(){var list=this._actions;for(var i=0,n=list.length;i<n;i++){list[i].Redo();}}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){this._last=null;var list=this._actions;while(list.length!=0){list.pop().Release();}this._actions.length=0;_get(_getPrototypeOf(ActionGroup.prototype),"_CleanUp",this).call(this);}}],[{key:"mergeable",get:function get(){return false;}}]);return ActionGroup;}(Action);module.exports["default"]=module.exports=ActionGroup;},{"./action":5}],4:[function(require,module,exports){'use strict';var _require=require("@nkmjs/utils"),U=_require.U;var _require2=require("@nkmjs/common"),POOL=_require2.POOL;var ActionGroup=require("./action-group");var ActionStack=/*#__PURE__*/function(){function ActionStack(){_classCallCheck(this,ActionStack);this._Init();this._PostInit();}// ----> Init
/**
     * @access protected
     */_createClass(ActionStack,[{key:"_Init",value:function _Init(){this._maxCount=-1;this._headIndex=-1;this._stack=new Array(0);this._isEnabled=true;this._groupingActive=false;this._group=null;}/**
     * @access protected
     */},{key:"_PostInit",value:function _PostInit(){}// ----> Availability
},{key:"isEnabled",get:function get(){return this._isEnabled;}},{key:"enabled",set:function set(p_value){if(p_value){this.Enable();}else{this.Disable();}}},{key:"Enable",value:function Enable(){if(this._isEnabled){return false;}this._isEnabled=true;return true;}},{key:"Disable",value:function Disable(){if(!this._isEnabled){return false;}this._isEnabled=false;return true;}},{key:"ToggleGrouping",value:function ToggleGrouping(p_toggle){if(this._groupingActive===p_toggle){return;}this._groupingActive=p_toggle;if(!p_toggle&&this._group){//TODO : If group has only one action merge it with the stack instead
this._group=null;}}// ----> Registration
},{key:"Do",value:function Do(p_actionClass,p_operation){if(!this._isEnabled){return null;}if(this._groupingActive){if(!this._group){this._group=this._Register(POOL.Rent(ActionGroup));}}// Check if last action can be updated instead of creating a new one.
var lastAction;if(this._group){lastAction=this._group.last;}else{lastAction=this._stack.length>0?this._stack[this._stack.length-1]:null;}if(p_actionClass.mergeable){if(U.isInstanceOf(lastAction,p_actionClass)){if(lastAction.CanMerge(p_operation)){//Merge if mergeable & can merge current options
return lastAction.Do(p_operation,true);;}}}if(this._group){return this._group._Register(POOL.Rent(p_actionClass).Do(p_operation,false));}else{return this._Register(POOL.Rent(p_actionClass).Do(p_operation,false));}}/**
     * @access protected
     * Register an action that has just been performed.
     * Clears any action undoed before.
     * @param {*} p_action 
     */},{key:"_Register",value:function _Register(p_action){var stack=this._stack;if(this._headIndex!=stack.length-1){//Actions have be undoed but still in line.
var index=this._headIndex+1;for(var i=index;i<stack.length;i++){stack[i].Release();}stack.length=index;}stack.push(p_action);this._headIndex=stack.length-1;return p_action;}/**
     * Undo the last action in line
     */},{key:"Undo",value:function Undo(){var stack=this._stack;if(stack.length===0){return;}var index=this._headIndex;//No more action in line.
if(index===-1){return;}var action=stack[index];this._headIndex=index-1;action.Undo();}/**
     * Redo the next action in line, if any
     */},{key:"Redo",value:function Redo(){if(this._stack.length===0){return;}var index=this._headIndex;index+=1;//Redo-ing action that hasn`t happened yet.
if(index>=this._stack.length){return;}var action=this._stack[index];this._headIndex=index;action.Redo();}/**
     * Clear all action in the stack
     */},{key:"Clear",value:function Clear(){this.ToggleGrouping(false);var stack=this._stack;while(stack.length!=0){stack.pop().Release();}stack.length=0;this._headIndex=-1;this._groupingActive=false;}}]);return ActionStack;}();module.exports["default"]=module.exports=ActionStack;},{"./action-group":3,"@nkmjs/common":27,"@nkmjs/utils":268}],5:[function(require,module,exports){'use strict';var _require3=require("@nkmjs/common"),DisposableObject=_require3.DisposableObject;var Action=/*#__PURE__*/function(_DisposableObject){_inherits(Action,_DisposableObject);var _super2=_createSuper(Action);function Action(){_classCallCheck(this,Action);return _super2.call(this);}_createClass(Action,[{key:"_Init",value:// ----> Init
/**
     * @access protected
     */function _Init(){_get(_getPrototypeOf(Action.prototype),"_Init",this).call(this);this._operation=null;this._undoed=false;}},{key:"operation",get:function get(){return this._operation;}// ----> Can merge ?
/**
     * Checks whether the given operation can be merged with the current one.
     * This is especially useful for small-increment actions that can be merged into a 
     * single one instead of clogging the undo/redo stack.
     * @param {object} p_operation 
     * @returns {boolean} True if the operations can be merged into a single action, otherwise false.
     */},{key:"CanMerge",value:function CanMerge(p_operation){return false;}// ----> Do / undo
/**
     * Performs the action.
     * @param {*} p_operation 
     * @param {*} p_merge True if the operation should be merged, otherwise false.
     * @returns {actions.Action} self
     */},{key:"Do",value:function Do(p_operation){var p_merge=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(!p_merge){this._operation=p_operation;}this._InternalDo(p_operation,p_merge);return this;}/**
     * Undo the action based on its current stored operation.
     */},{key:"Undo",value:function Undo(){this._undoed=true;this._InternalUndo();}/**
     * Redo the action based on its current stored operation.
     */},{key:"Redo",value:function Redo(){this._undoed=false;this._InternalRedo();}/**
     * @access protected
     * @param {*} p_operation 
     * @param {*} p_merge 
     */},{key:"_InternalDo",value:function _InternalDo(p_operation){var p_merge=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;}/**
     * @access protected
     */},{key:"_InternalUndo",value:function _InternalUndo(){}/**
     * @access protected
     */},{key:"_InternalRedo",value:function _InternalRedo(){}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){this._operation=null;this._undoed=false;_get(_getPrototypeOf(Action.prototype),"_CleanUp",this).call(this);}}],[{key:"mergeable",get:function get(){return false;}}]);return Action;}(DisposableObject);module.exports["default"]=module.exports=Action;},{"@nkmjs/common":27}],6:[function(require,module,exports){/**
 * Command can trigger actions.
 * Commands are a receptacle for :
 * - a function to execute
 * - shortcuts that will execute said function
 * - events that will allow UI to feedback the availability of a given command
 */'use strict';var _require4=require("@nkmjs/utils"),U=_require4.U;var _require5=require("@nkmjs/common"),SIGNAL=_require5.SIGNAL,POOL=_require5.POOL,DisposableObjectEx=_require5.DisposableObjectEx;var COMMAND_SIGNAL=require("./command-event");var Command=/*#__PURE__*/function(_DisposableObjectEx){_inherits(Command,_DisposableObjectEx);var _super3=_createSuper(Command);function Command(){_classCallCheck(this,Command);return _super3.call(this);}// ----> Static members
_createClass(Command,[{key:"_Init",value:// ----> Init
/**
     * @access protected
     */function _Init(){_get(_getPrototypeOf(Command.prototype),"_Init",this).call(this);this._icon="";this._name=U.CamelSplit(this.constructor.name);this._isEnabled=true;this._context=null;this._emitter=null;this._order=0;this._running=false;}},{key:"running",get:function get(){return this._running;}/**
     * Display order of the command
     */},{key:"order",get:function get(){return this._order;},set:function set(p_value){this._order=p_value;}/**
     * Icon asset of the command
     */},{key:"icon",get:function get(){return this._icon;},set:function set(p_value){this._icon=p_value;}/**
     * Display name of the command
     */},{key:"name",get:function get(){return this._name;},set:function set(p_value){this._name=p_value;}/**
     * Current 'originator' of the command, i.e what made the execution request.
     */},{key:"emitter",get:function get(){return this._emitter;},set:function set(p_value){if(this._emitter===p_value){return;}var oldEmitter=this._emitter;this._emitter=p_value;if(oldEmitter){oldEmitter.Unwatch(SIGNAL.RELEASED,this._OnEmitterReleased,this);}if(p_value){p_value.Watch(SIGNAL.RELEASED,this._OnEmitterReleased,this);}}/**
     * @access protected
     * @param {*} p_emitter 
     */},{key:"_OnEmitterReleased",value:function _OnEmitterReleased(p_emitter){this.emitter=null;}// ----> Availability
},{key:"isEnabled",get:function get(){return this._isEnabled;}},{key:"enabled",set:function set(p_value){if(p_value){this.Enable();}else{this.Disable();}}},{key:"Enable",value:function Enable(){if(this._isEnabled){return false;}this._isEnabled=true;this._Broadcast(SIGNAL.UPDATED,this);return true;}},{key:"Disable",value:function Disable(){if(!this._isEnabled){return false;}this._isEnabled=false;this._Broadcast(SIGNAL.UPDATED,this);return true;}// ----> Execution
},{key:"context",get:function get(){return this._context;},set:function set(p_value){var sanitizedValue=this._SanitizeContext(p_value);if(this._context===sanitizedValue){return;}this._context=sanitizedValue;this._OnContextChanged();this.enabled=this.CanExecute(this._context);}/**
     * @access protected
     * @param {*} p_context 
     */},{key:"_SanitizeContext",value:function _SanitizeContext(p_context){return p_context;}/**
     * @access protected
     */},{key:"_OnContextChanged",value:function _OnContextChanged(){}/**
     * Checks whether this command can be executed within a given context
     * @param {*} p_context 
     * @returns {boolean} True if the command can be executed in the given context, otherwise false.
     */},{key:"CanExecute",value:function CanExecute(p_context){return true;}/**
     * Execute the command within a given context
     * @param {*} p_context 
     */},{key:"Execute",value:function Execute(p_context){if(this._running){return;}this.context=U.Default(p_context,this._context);if(!this._isEnabled){return;}this._Start();this._InternalExecute();}/**
     * @access protected
     */},{key:"_InternalExecute",value:function _InternalExecute(){}/**
     * @access protected
     */},{key:"_InternalCancel",value:function _InternalCancel(){}// ----> Default events
/**
     * @access protected
     */},{key:"_Start",value:function _Start(){if(this._running){return;}this._running=true;this._Broadcast(COMMAND_SIGNAL.START,this);this._Broadcast(SIGNAL.UPDATED,this);}/**
     * @access protected
     */},{key:"_Success",value:function _Success(){this._Broadcast(COMMAND_SIGNAL.SUCCESS,this);this._End();}/**
     * @access protected
     * @param {*} p_msg 
     */},{key:"_Fail",value:function _Fail(p_msg){console.error("".concat(this," failed : ").concat(p_msg));this._Broadcast(COMMAND_SIGNAL.FAIL,this,p_msg);this._End();}},{key:"Cancel",value:function Cancel(){if(!this._running){return;}this._Cancel();}/**
     * @access protected
     */},{key:"_Cancel",value:function _Cancel(){this._InternalCancel();this._Broadcast(COMMAND_SIGNAL.CANCEL,this);this._End();}/**
     * @access protected
     */},{key:"_End",value:function _End(){this._running=false;this._Broadcast(COMMAND_SIGNAL.END,this);this._Broadcast(SIGNAL.UPDATED,this);}// ----> Pooling
/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){this.Cancel();this._icon="";this._isEnabled=true;this.context=null;this.emitter=null;this.order=0;_get(_getPrototypeOf(Command.prototype),"_CleanUp",this).call(this);}},{key:"toString",value:function toString(){return"[>>".concat(this.constructor.name,"]");}}],[{key:"Rent",value:function Rent(p_class){var p_name=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_icon=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var cmd=POOL.Rent(p_class);cmd.name=U.isEmpty(p_name)?U.CamelSplit(p_class.name):p_name;cmd.icon=U.isEmpty(p_icon)?"%ICON%/icon_cmd.svg":p_icon;return cmd;}}]);return Command;}(DisposableObjectEx);module.exports["default"]=module.exports=Command;},{"./command-event":10,"@nkmjs/common":27,"@nkmjs/utils":268}],7:[function(require,module,exports){'use strict';var _require6=require("@nkmjs/utils"),U=_require6.U;var _require7=require("@nkmjs/common"),POOL=_require7.POOL;var COMMAND_SIGNAL=require("./command-event");var Command=require("./command");// CommandAction requires :
// - an action constructor
// - the 'context' is the action's operation
// - an emitter, used to seek up an editor, if any.
var _COMMAND_ACTION=null;var CommandAction=/*#__PURE__*/function(_Command){_inherits(CommandAction,_Command);var _super4=_createSuper(CommandAction);function CommandAction(){_classCallCheck(this,CommandAction);return _super4.call(this);}_createClass(CommandAction,[{key:"_Init",value:// ----> Init
/**
     * @access protected
     */function _Init(){_get(_getPrototypeOf(CommandAction.prototype),"_Init",this).call(this);this._actionClass=null;}},{key:"actionClass",get:function get(){return this._actionClass;},set:function set(p_value){this._actionClass=p_value;}},{key:"CanExecute",value:function CanExecute(p_context){if(!p_context||!this._actionClass){return false;}return true;}/**
     * @access protected
     */},{key:"_InternalExecute",value:function _InternalExecute(){//TODO : Check whether or not there is an ongoing drag'n drop action
//and concatenate all resulting actions
var editor=null;if(this._emitter){editor=this._emitter.editor;if(!editor){//Look in parenting stack in case no editor is found
//stop at first editor or last ?
//assume first for now.
var editorClass=POOL.GetClass("Editor"),p=this._emitter;while(!editor&&p){if(U.isInstanceOf(p,editorClass)){editor=p;}p=p.parent;}}}if(editor){//If editor found, make it do the thing
editor.Do(this._actionClass,this._context);}else{//If no editor found, create action, execute it then release it immediately.
POOL.Rent(this._actionClass).Do(this._context,false).Release();}this._Success();}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){this._actionClass=null;_get(_getPrototypeOf(CommandAction.prototype),"_CleanUp",this).call(this);}}],[{key:"Do",value:function Do(){var p_emitter=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var p_actionClass=arguments.length>1?arguments[1]:undefined;var p_operation=arguments.length>2?arguments[2]:undefined;var A=this._COMMAND_ACTION;if(!A){A=this._COMMAND_ACTION=new CommandAction();}A.emitter=p_emitter;A.actionClass=p_actionClass;A.Execute(p_operation);}}]);return CommandAction;}(Command);module.exports["default"]=module.exports=CommandAction;},{"./command":12,"./command-event":10,"@nkmjs/common":27,"@nkmjs/utils":268}],8:[function(require,module,exports){'use strict';var _require8=require("@nkmjs/utils"),U=_require8.U;var _require9=require("@nkmjs/collections"),List=_require9.List,Dictionary=_require9.Dictionary;var Command=require("./command");/**
 * A CommandBox is meant to be a repo of commands available for a single context.
 * It is also a mean to centralize command instances and have them act as "soft singleton" if needed,
 * especially if a broad context should be able to enable/disable specific commands.
 */var CommandBox=/*#__PURE__*/function(){function CommandBox(){var p_onRegister=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;_classCallCheck(this,CommandBox);this._context=null;this._commandList=new List(0);this._commandHooks=new Dictionary();this._onRegisterCmd=p_onRegister;}// ----> Init
_createClass(CommandBox,[{key:"list",get:function get(){return this._commandList;}},{key:"context",get:function get(){return this._context;},set:function set(p_value){this._context=p_value;var cmdList=this._commandList;for(var i=0,n=cmdList.count;i<n;i++){cmdList.At(i).context=p_value;}}// ----> Command registration
/**
     * 
     * @param {function} p_class The constructor of Command to be created
     * @param {string} p_name Name of the Command
     * @param {string} p_icon Icon of the Command
     * @param {array} p_hooks Auto-hook for the Command, in the format { evt:`SIGNAL`, fn:`function`, thisArg:`function's this (optional)` }. 
     * Events are either generic Command events (COMMAND_SIGNAL.xxx) or custom ones, if any.
     * @returns {actions.Command} The newly created Command.
     */},{key:"Create",value:function Create(p_class){var p_name=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_icon=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var p_hooks=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;var cmd=Command.Rent(p_class,p_name,p_icon);this._Register(cmd,p_hooks);return cmd;}/**
     * @access protected
     * @param {*} p_cmd 
     * @param {*} p_hooks 
     */},{key:"_Register",value:function _Register(p_cmd){var p_hooks=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;if(this._commandList.Add(p_cmd)){if(p_hooks){this._commandHooks.Set(p_cmd,p_hooks);for(var i=0,n=p_hooks.length;i<n;i++){var hook=p_hooks[i];p_cmd.Watch(hook.evt,hook.fn,U.Default(hook.thisArg,null));}}this._OnCommandRegistered(p_cmd);}}/**
     * @access protected
     * @param {*} p_cmd 
     */},{key:"_OnCommandRegistered",value:function _OnCommandRegistered(p_cmd){p_cmd.context=this._context;if(this._onRegisterCmd){this._onRegisterCmd.call(null,p_cmd);}}/**
     * Removes a command from the box.
     * @param {actions.Command} p_cmd 
     */},{key:"RemoveCommand",value:function RemoveCommand(p_cmd){if(this._commandList.Remove(p_cmd)){var hooks=this._commandHooks.Get(p_cmd);if(hooks){this._commandHooks.Remove(p_cmd);for(var i=0,n=p_hooks.length;i<n;i++){var hook=p_hooks[i];p_cmd.Unwatch(hook.evt,hook.fn,U.Default(hook.thisArg,null));}}this._OnCommandRemoved(p_cmd);}}/**
     * @access protected
     * @param {*} p_cmd 
     */},{key:"_OnCommandRemoved",value:function _OnCommandRemoved(p_cmd){p_cmd.context=null;}}]);return CommandBox;}();module.exports["default"]=module.exports=CommandBox;},{"./command":12,"@nkmjs/collections":21,"@nkmjs/utils":268}],9:[function(require,module,exports){/**
 * Command can trigger actions.
 * Commands are a receptacle for :
 * - a function to execute
 * - shortcuts that will execute said function
 * - events that will allow UI to feedback the availability of a given command
 */'use strict';var _require10=require("@nkmjs/utils"),U=_require10.U;var _require11=require("@nkmjs/common"),SIGNAL=_require11.SIGNAL,Observer=_require11.Observer;var COMMAND_SIGNAL=require("./command-event");var Command=require("./command");var CommandChain=/*#__PURE__*/function(_Command2){_inherits(CommandChain,_Command2);var _super5=_createSuper(CommandChain);function CommandChain(){_classCallCheck(this,CommandChain);return _super5.call(this);}// ----> Init
/**
     * @access protected
     */_createClass(CommandChain,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(CommandChain.prototype),"_Init",this).call(this);this._nodes=new Array(0);this._currentIndex=0;this._cmdObserver=new Observer();this._cmdObserver.Hook(COMMAND_SIGNAL.START,this._NodeStart,this);this._cmdObserver.Hook(COMMAND_SIGNAL.END,this._NodeEnd,this);this._cmdObserver.Hook(COMMAND_SIGNAL.SUCCESS,this._NodeSuccess,this);this._cmdObserver.Hook(COMMAND_SIGNAL.FAIL,this._NodeFail,this);}// ----> Execution
/**
     * @access protected
     */},{key:"_OnContextChanged",value:function _OnContextChanged(){_get(_getPrototypeOf(CommandChain.prototype),"_OnContextChanged",this).call(this);for(var i=0,n=this._nodes.length;i<n;i++){this._nodes[i].context=this._context;}}},{key:"CanExecute",value:function CanExecute(p_context){var r=_get(_getPrototypeOf(CommandChain.prototype),"CanExecute",this).call(this,p_context);if(!r){return false;}for(var i=0,n=this._nodes.length;i<n;i++){if(!this._nodes[i].CanExecute(p_context)){return false;}}return true;}},{key:"Execute",value:function Execute(){var p_context=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;if(this._running){return;}this.context=U.Default(p_context,this._context);if(!this._isEnabled){return;}this._Start();this._InternalExecute();}/**
     * @access protected
     */},{key:"_InternalExecute",value:function _InternalExecute(){this._currentIndex=-1;this._ExecuteNextIndex();}/**
     * @access protected
     */},{key:"_ExecuteNextIndex",value:function _ExecuteNextIndex(){this._currentIndex+=1;var l=this._nodes.length;if(this._currentIndex>=l){this._Success();return;}var cmd=this._nodes[this._currentIndex];this._cmdObserver.ObserveOnly(cmd);cmd.Execute(this._context);}/**
     * @access protected
     */},{key:"_InternalCancel",value:function _InternalCancel(){}// ----> Node events
/**
     * @access protected
     * @param {*} p_cmd 
     */},{key:"_NodeStart",value:function _NodeStart(p_cmd){}/**
     * @access protected
     * @param {*} p_cmd 
     */},{key:"_NodeSuccess",value:function _NodeSuccess(p_cmd){this._ExecuteNextIndex();}/**
     * @access protected
     * @param {*} p_cmd 
     * @param {*} p_msg 
     */},{key:"_NodeFail",value:function _NodeFail(p_cmd,p_msg){this._Fail(p_msg);}/**
     * @access protected
     * @param {*} p_cmd 
     */},{key:"_NodeEnd",value:function _NodeEnd(p_cmd){}// ----> Default events
/**
     * @access protected
     */},{key:"_Start",value:function _Start(){if(this._running){return;}this._running=true;this._Broadcast(COMMAND_SIGNAL.START,this);this._Broadcast(SIGNAL.UPDATED,this);}/**
     * @access protected
     */},{key:"_Success",value:function _Success(){this._Broadcast(COMMAND_SIGNAL.SUCCESS,this);this._End();}/**
     * @access protected
     * @param {*} p_msg 
     */},{key:"_Fail",value:function _Fail(p_msg){this._Broadcast(COMMAND_SIGNAL.FAIL,this,p_msg);this._End();}},{key:"Cancel",value:function Cancel(){if(!this._running){return;}this._Cancel();}/**
     * @access protected
     */},{key:"_Cancel",value:function _Cancel(){this._InternalCancel();this._Broadcast(COMMAND_SIGNAL.CANCEL,this);this._End();}/**
     * @access protected
     */},{key:"_End",value:function _End(){this._running=false;this._Broadcast(COMMAND_SIGNAL.END,this);this._Broadcast(SIGNAL.UPDATED,this);}// ----> Pooling
/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(CommandChain.prototype),"_CleanUp",this).call(this);}},{key:"toString",value:function toString(){return"[>>".concat(this.constructor.name,"]");}}]);return CommandChain;}(Command);module.exports["default"]=module.exports=CommandChain;},{"./command":12,"./command-event":10,"@nkmjs/common":27,"@nkmjs/utils":268}],10:[function(require,module,exports){'use strict';var COMMAND_SIGNAL=function COMMAND_SIGNAL(){_classCallCheck(this,COMMAND_SIGNAL);};_defineProperty(COMMAND_SIGNAL,"SUCCESS",Symbol("success"));_defineProperty(COMMAND_SIGNAL,"FAIL",Symbol("fail"));_defineProperty(COMMAND_SIGNAL,"CANCEL",Symbol("cancel"));_defineProperty(COMMAND_SIGNAL,"START",Symbol("start"));_defineProperty(COMMAND_SIGNAL,"END",Symbol("end"));module.exports["default"]=module.exports=COMMAND_SIGNAL;},{}],11:[function(require,module,exports){/**
 * Command can trigger actions.
 * Commands are a receptacle for :
 * - a function to execute
 * - shortcuts that will execute said function
 * - events that will allow UI to feedback the availability of a given command
 */'use strict';var _require12=require("@nkmjs/utils"),U=_require12.U;var _require13=require("@nkmjs/common"),SIGNAL=_require13.SIGNAL,POOL=_require13.POOL;var COMMAND_SIGNAL=require("./command-event");var Command=require("./Command");var CommandFn=/*#__PURE__*/function(_Command3){_inherits(CommandFn,_Command3);var _super6=_createSuper(CommandFn);function CommandFn(){_classCallCheck(this,CommandFn);return _super6.call(this);}// ----> Static members
_createClass(CommandFn,[{key:"_Init",value:// ----> Init
/**
     * @access protected
     */function _Init(){_get(_getPrototypeOf(CommandFn.prototype),"_Init",this).call(this);this._fn=null;this._thisArg=null;this._options=null;}},{key:"thisArg",get:function get(){return this._thisArg;},set:function set(p_value){this._thisArg=p_value;}},{key:"fn",get:function get(){return this._fn;},set:function set(p_value){this._fn=p_value;}},{key:"options",get:function get(){return this._options;},set:function set(p_value){this._options=p_value;this.fn=U.Get(p_value,"fn",null);if(!this._fn){throw new Error("CommandFn options have no function defined.");}this.thisArg=U.Get(p_value,"thisArg",null);this.name=U.Get(p_value,"name",U.CamelSplit(this._fn.name));this.icon=U.Get(p_value,"icon","%ICON%/icon_cmd.svg");this.order=U.Get(p_value,"order",0);}/**
     * @access protected
     */},{key:"_InternalExecute",value:function _InternalExecute(){try{if(this._context){this._fn.call(this._thisArg,this._context);}else{this._fn.call(this._thisArg);}this._Success();}catch(e){this._Fail(e.message);}}}],[{key:"RentFn",value:function RentFn(p_options){var fn=U.Get(p_options,"fn",null);if(!fn){throw new Error("Cannot create CommandFn with empty function");}var cmd=POOL.Rent(CommandFn);cmd.options=p_options;return cmd;}}]);return CommandFn;}(Command);module.exports["default"]=module.exports=CommandFn;},{"./Command":6,"./command-event":10,"@nkmjs/common":27,"@nkmjs/utils":268}],12:[function(require,module,exports){arguments[4][6][0].apply(exports,arguments);},{"./command-event":10,"@nkmjs/common":27,"@nkmjs/utils":268,"dup":6}],13:[function(require,module,exports){/**
 * This is the core facade for all system and apps.
 */'use strict';var _require14=require("@nkmjs/utils"),LOG=_require14.LOG;var _require15=require("@nkmjs/collections"),List=_require15.List;var _require16=require("@nkmjs/services"),ServiceBase=_require16.ServiceBase;var RELAY=/*#__PURE__*/function(_ServiceBase){_inherits(RELAY,_ServiceBase);var _super7=_createSuper(RELAY);function RELAY(){_classCallCheck(this,RELAY);return _super7.call(this);}/**
     * @access protected
     */_createClass(RELAY,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(RELAY.prototype),"_Init",this).call(this);this._requests=new List();}},{key:"HandleRequest",value:function HandleRequest(p_request){this._requests.Add(p_request);this._Broadcast(p_request.requestType,p_request);this._tick.Schedule();}},{key:"_Tick",value:function _Tick(p_delta){_get(_getPrototypeOf(RELAY.prototype),"_Tick",this).call(this,p_delta);//Clear requests stack
var list=this._requests;for(var i=0;i<list.count;i++){var release=true,request=list.At(i);if(!request.handled){if(request.life>=request.timeout){//Unhandled request timeout
request.HandleFail("timeout");}else{//Keep request alive
request.life+=p_delta;release=false;}}if(release){request.Release();list.RemoveAt(i);i--;}}}/**
     * 
     * @param {string} p_evt 
     * @param {function} p_fn 
     */},{key:"_ipcOn",value:/**
     * 
     * @param {string} p_evt 
     * @param {function} p_fn 
     */function _ipcOn(p_evt,p_fn){/* Placeholder */}/**
     * 
     * @param {string} p_evt 
     * @param {function} p_fn 
     */},{key:"_ipcSend",value:/**
     * 
     * @param {string} p_evt 
     * @param {function} p_fn 
     */function _ipcSend(p_evt){/* Placeholder */}/**
     * 
     * @param {*} p_options 
     * @returns {Promise}
     */},{key:"_ShowOpenDialog",value:/**
     * 
     * @param {*} p_options 
     * @returns {Promise}
     */function _ShowOpenDialog(p_options){return null;}}],[{key:"HandleRequest",value:function HandleRequest(p_request){LOG._("\u26A1 ".concat(p_request),'color: #bebebe');this.instance.HandleRequest(p_request);}},{key:"Broadcast",value:function Broadcast(p_evt){var _this$instance;for(var _len=arguments.length,args=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}(_this$instance=this.instance)._Broadcast.apply(_this$instance,[p_evt].concat(args));}},{key:"Watch",value:function Watch(p_evt,p_fn){var p_subscriber=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;this.instance.Watch(p_evt,p_fn,p_subscriber);}},{key:"Unwatch",value:function Unwatch(p_evt,p_fn){var p_subscriber=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;this.instance.Unwatch(p_evt,p_fn,p_subscriber);}},{key:"ipcOn",value:function ipcOn(p_evt,p_fn){this.instance._ipcOn(p_evt,p_fn);}},{key:"ipcSend",value:function ipcSend(p_evt){var _this$instance2;for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){args[_key2-1]=arguments[_key2];}(_this$instance2=this.instance)._ipcSend.apply(_this$instance2,[p_evt].concat(args));}},{key:"ShowOpenDialog",value:function ShowOpenDialog(p_options){return this.instance._ShowOpenDialog(p_options);}}]);return RELAY;}(ServiceBase);module.exports["default"]=module.exports=RELAY;},{"@nkmjs/collections":21,"@nkmjs/services":150,"@nkmjs/utils":268}],14:[function(require,module,exports){'use strict';var _require17=require("@nkmjs/common"),POOL=_require17.POOL,DisposableObject=_require17.DisposableObject;var RELAY=require("./relay");var Request=/*#__PURE__*/function(_DisposableObject2){_inherits(Request,_DisposableObject2);var _super8=_createSuper(Request);function Request(){_classCallCheck(this,Request);return _super8.call(this);}_createClass(Request,[{key:"_Init",value:/**
     * @access protected
     */function _Init(){_get(_getPrototypeOf(Request.prototype),"_Init",this).call(this);this._emitter=null;this._requestType=null;this._options=null;this._handled=false;this._handler=null;this._onFail=null;this._onSuccess=null;this._timeout=0;this._life=0;this._failReason="";}},{key:"requestType",get:function get(){return this._requestType;},set:function set(p_value){this._requestType=p_value;}},{key:"emitter",get:function get(){return this._emitter;},set:function set(p_value){this._emitter=p_value;}},{key:"onSuccess",get:function get(){return this._onSuccess;},set:function set(p_value){this._onSuccess=p_value;}},{key:"onFail",get:function get(){return this._onFail;},set:function set(p_value){this._onFail=p_value;}/**
     * @access protected
     */},{key:"_Success",value:function _Success(){if(this._onSuccess){this._onSuccess.call(this._emitter,this);}}/**
     * @access protected
     * @param {*} p_reason 
     */},{key:"_Fail",value:function _Fail(p_reason){this._failReason=p_reason?p_reason:"undocumented";if(this._onFail){this._onFail.call(this._emitter,this);}}},{key:"timeout",get:function get(){return this._timeout;},set:function set(p_value){this._timeout=p_value;}},{key:"life",get:function get(){return this._life;},set:function set(p_value){this._life=p_value;}},{key:"options",get:function get(){return this._options;},set:function set(p_value){this._options=p_value;}},{key:"failReason",get:function get(){return this._failReason;}},{key:"GetOption",value:function GetOption(p_id){var p_fallback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var opt=this._options;if(!opt||!opt.hasOwnProperty(p_id)){return p_fallback;}return opt[p_id];}},{key:"handled",get:function get(){return this._handled;}},{key:"HandleSuccess",value:function HandleSuccess(p_handler){if(this._handled){throw new Error("A request may not be handled twice.");}this._handled=true;this._handler=p_handler;this._Success();}},{key:"HandleFail",value:function HandleFail(p_reason){this._Fail(p_reason);}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){this._emitter=null;this._requestType=null;this._options=null;this._handled=false;this._handler=null;this._onFail=null;this._onSuccess=null;this._timeout=0;this._life=0;_get(_getPrototypeOf(Request.prototype),"_CleanUp",this).call(this);}},{key:"toString",value:function toString(){return"!".concat(this.constructor.name,":").concat(this._requestType,",").concat(this._emitter);}}],[{key:"Emit",value:function Emit(p_requestType){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_emitter=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var p_onSuccess=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;var p_onFail=arguments.length>4&&arguments[4]!==undefined?arguments[4]:null;var p_timeout=arguments.length>5&&arguments[5]!==undefined?arguments[5]:0;var p_requestClass=arguments.length>6&&arguments[6]!==undefined?arguments[6]:Request;var p_global=arguments.length>7&&arguments[7]!==undefined?arguments[7]:true;var request=POOL.Rent(p_requestClass);request.requestType=p_requestType;request.emitter=p_emitter;request.onFail=p_onFail;request.onSuccess=p_onSuccess;request.timeout=p_timeout;request.options=p_options;if(p_global){RELAY.HandleRequest(request);}return request;}}]);return Request;}(DisposableObject);module.exports["default"]=module.exports=Request;},{"./relay":13,"@nkmjs/common":27}],15:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={APP_MESSAGES:require("./lib/app-messages"),AppBase:require("./lib/app-base")};},{"./lib/app-base":16,"./lib/app-messages":17}],16:[function(require,module,exports){/**
 * Streamlined app kickstart constructor
 * - is provided with a few basic data from electron such as global paths
 * - attempts to load preferences
 *      - on fail : create preference file
 *      - on success : read preference file
 *          - load and deploy base kit dependencies
 */'use strict';var _require18=require("@nkmjs/utils"),U=_require18.U,UDOM=_require18.UDOM,PATH=_require18.PATH,LOG=_require18.LOG;var _require19=require("@nkmjs/common"),SIGNAL=_require19.SIGNAL,TIME=_require19.TIME,SingletonEx=_require19.SingletonEx,POOL=_require19.POOL;var _require20=require("@nkmjs/environment"),ENV=_require20.ENV,ENV_SIGNAL=_require20.ENV_SIGNAL;var _require21=require("@nkmjs/actions"),ACTION_REQUEST=_require21.ACTION_REQUEST,RELAY=_require21.RELAY,CommandBox=_require21.CommandBox;var _require22=require("@nkmjs/io-core"),RESOURCES=_require22.RESOURCES;var _require23=require("@nkmjs/ui-core"),UI=_require23.UI,LayerContainer=_require23.LayerContainer;var _require24=require("@nkmjs/dialog"),DIALOG=_require24.DIALOG;var _require25=require("@nkmjs/data-core"),Metadata=_require25.Metadata;var _require26=require("@nkmjs/ui-workspace"),DialogHandler=_require26.DialogHandler;var _require27=require("./dialogs"),AutoUpdateDialogBox=_require27.AutoUpdateDialogBox;var APP_MESSAGES=require("./app-messages");var UserPreferences=require("./helpers/user-preferences");var _require28=require("@nkmjs/style"),STYLE=_require28.STYLE;/*

    #1 - Create app instance
        -> App instance registers itself to environment
        -> App instance hook to environment readiness

    #2 - Set environment config (that will allow the app to bootstrap correctly)
        -> App is starting with a cleanly set environment

*/var AppBase=/*#__PURE__*/function(_SingletonEx){_inherits(AppBase,_SingletonEx);var _super9=_createSuper(AppBase);function AppBase(){_classCallCheck(this,AppBase);return _super9.call(this);}_createClass(AppBase,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(AppBase.prototype),"_Init",this).call(this);this._APPID="".concat(this.constructor.name);this._darkPaletteBuilder=null;this._lightPaletteBuilder=null;this._userPreferences=POOL.Rent(UserPreferences);this._defaultUserPreferences={};this._mainWrapperClass=LayerContainer;this._mainWrapper=null;this._layers=null;this._dialogHandlerClass=DialogHandler;this._dialogHandler=null;this._commands=new CommandBox();this._ipcBindings=[{evt:APP_MESSAGES.NODE_MESSAGE,fn:this._Bind(this._onNodeMessage)},{evt:APP_MESSAGES.NODE_ERROR,fn:this._Bind(this._onNodeError)},{evt:APP_MESSAGES.NODE_WARNING,fn:this._Bind(this._onNodeWarning)}];ENV.FEATURES.Watch(ENV_SIGNAL.COLORSCHEME_CHANGED,this._OnColorschemeChange,this);}/**
     * Called by constructor.
     */},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(AppBase.prototype),"_PostInit",this).call(this);ENV.instance.RegisterServices(RELAY,RESOURCES,DIALOG);if(!this._mainWrapperClass){throw new Error("No app wrapper constructor defined.");}if(!U.isInstanceOf(this._mainWrapperClass,LayerContainer)){throw new Error("App wrapper constructor (".concat(this._mainWrapperClass.name,") must implement LayerContainer."));}}/**
     * @type {LayerContainer}
     */},{key:"mainWrapper",get:function get(){return this._mainWrapper;}/**
     * @type {Metadata}
     */},{key:"userPreferences",get:function get(){return this._userPreferences;}/**
     * Called once by the environment when the DOM
     * readyState >= interactive
     */},{key:"SetUp",value:function SetUp(){LOG._("".concat(this._APPID," : SETUP"),"#339a6e","#212121");if(ENV.FEATURES.isNodeEnabled){this._RegisterIPCBindings();}// ----> At that point, the Service Manager has started.
// Initialize and start critical services.
// TODO : Move what's below somewhere else.
this._mainWrapper=UI.Rent(this._mainWrapperClass);this._mainWrapper.setAttribute("id","app");// Insert main.css in ShadowDom so all subsequent elements benefit from it
UDOM.AttachFirst(UDOM.New("link",{href:STYLE.instance.current.GetCSSLink("@/main.css"),rel:"stylesheet"}),this._mainWrapper._host);if(this._layers){for(var i=0,n=this._layers.length;i<n;i++){var conf=this._layers[i],layer=this._mainWrapper.Add(conf.cl);if(conf.id){this[conf.id]=layer;}}}this._dialogHandler=this._mainWrapper.Add(this._dialogHandlerClass);// Watch to dialog events as soon as we are ready to handle them
RELAY.Watch(ACTION_REQUEST.DIALOG,this._HandleDialogRequest,this);}},{key:"_RegisterIPCBindings",value:function _RegisterIPCBindings(){var binding;for(var i=0,n=this._ipcBindings.length;i<n;i++){binding=this._ipcBindings[i];RELAY.ipcOn(binding.evt,binding.fn);}}/**
     * Called by once the environment when the DOM
     * readyState === complete, after SetUp has been called.
     */},{key:"Start",value:function Start(){LOG._("".concat(this._APPID," : START"),"#339a6e","#212121");// Push the app wrapper to the DOM
UDOM.New("link",{href:STYLE.instance.current.GetCSSLink("@/main.css"),rel:"stylesheet"},document.head);UDOM.Attach(this._mainWrapper,document.body);this._userPreferences.Load("".concat(this._APPID,"Preferences"),this._defaultUserPreferences,this._Bind(this._InitUserPreferences),this._Bind(this._OnAppReadyInternal));}},{key:"_InitUserPreferences",value:function _InitUserPreferences(p_userPreferences){}},{key:"_OnAppReadyInternal",value:function _OnAppReadyInternal(p_data){RELAY.instance.Watch(ACTION_REQUEST.EDIT,this._OnEditRequest,this);// Load base kits... ?
//this._LoadBaseKits();
if(ENV.FEATURES.isNodeEnabled){if(false){//Check if auto-updates are enabled
DIALOG.Push({dialogClass:AutoUpdateDialogBox});}}this.AppReady();LOG._("".concat(this._APPID," : READY"),"#030107","#339a6e");}},{key:"AppReady",value:function AppReady(p_data){}},{key:"_HandleDialogRequest",value:function _HandleDialogRequest(p_request){this._dialogHandler.HandleDialogRequest(p_request);}},{key:"_OnEditRequest",value:function _OnEditRequest(p_request){}// ---->
},{key:"_OnColorschemeChange",value:function _OnColorschemeChange(){}// ---->
},{key:"ReloadApp",value:function ReloadApp(){RELAY.ipcSend(APP_MESSAGES.DO_RELOAD_APP);}/**
     * 
     * @param {*} p_options Window options
     * @param {string} p_options.id window ID, used to check whether the window exist already
     * @param {string} p_options.pathname path to window content (html file or html string)
     * @param {number} p_options.width window width
     * @param {number} p_options.height window height
     * @param {number} p_options.minWidth window min width
     * @param {number} p_options.minHeight window min height
     * @param {boolean} p_options.frame 
     * @param {boolean} p_options.show 
     * @param {string} p_options.icon 
     * @param {string} p_options.backgroundColor 
     */},{key:"OpenWindow",value:function OpenWindow(p_options){RELAY.ipcSend(APP_MESSAGES.DO_OPEN_WINDOW,p_options);}/**
     * 
     * @param {*} p_options 
     * @param {string} p_options.id
     */},{key:"CloseWindow",value:function CloseWindow(p_options){RELAY.ipcSend(APP_MESSAGES.DO_CLOSE_WINDOW,p_options);}},{key:"Print",value:function Print(p_options){RELAY.ipcSend(APP_MESSAGES.DO_PRINT_WINDOW,p_options);}},{key:"LoadAndPrint",value:function LoadAndPrint(p_options){RELAY.ipcSend(APP_MESSAGES.DO_OPEN_AND_PRINT_WINDOW,p_options);}// ----> ELECTRON Message handling (error/warning/messages)
},{key:"_onNodeError",value:function _onNodeError(p_evt,p_content){var _DIALOG$Push;console.error(p_content.error);DIALOG.Push((_DIALOG$Push={},_defineProperty(_DIALOG$Push,COM_ID.TITLE,p_content.message),_defineProperty(_DIALOG$Push,COM_ID.ICON,"% ICON % /icon_error.svg"),_defineProperty(_DIALOG$Push,COM_ID.MESSAGE,"".concat(p_content.error.message)),_defineProperty(_DIALOG$Push,"actions",[{text:"Close"}]),_DIALOG$Push));}},{key:"_onNodeWarning",value:function _onNodeWarning(p_evt,p_content){var _DIALOG$Push2;console.warning(p_content.message);DIALOG.Push((_DIALOG$Push2={},_defineProperty(_DIALOG$Push2,COM_ID.TITLE,"Attention !"),_defineProperty(_DIALOG$Push2,COM_ID.ICON,"%ICON%/icon_warning.svg"),_defineProperty(_DIALOG$Push2,COM_ID.MESSAGE,"".concat(p_content.message)),_defineProperty(_DIALOG$Push2,"actions",[{text:"Close"}]),_DIALOG$Push2));}},{key:"_onNodeMessage",value:function _onNodeMessage(p_evt,p_content){console.log(p_content.message);}}]);return AppBase;}(SingletonEx);module.exports["default"]=module.exports=AppBase;},{"./app-messages":17,"./dialogs":19,"./helpers/user-preferences":20,"@nkmjs/actions":1,"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/dialog":81,"@nkmjs/environment":92,"@nkmjs/io-core":98,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/ui-workspace":234,"@nkmjs/utils":268}],17:[function(require,module,exports){'use strict';var APP_MESSAGES=function APP_MESSAGES(){_classCallCheck(this,APP_MESSAGES);};_defineProperty(APP_MESSAGES,"ERROR","node-error");_defineProperty(APP_MESSAGES,"WARNING","node-warning");_defineProperty(APP_MESSAGES,"MESSAGE","node-message");_defineProperty(APP_MESSAGES,"AU_CHECK_REQUEST","au-check-request");_defineProperty(APP_MESSAGES,"AU_CHECK_REQUEST_HANDLED","au-check-request-handled");_defineProperty(APP_MESSAGES,"AU_NO_SERVER","au-no-server");_defineProperty(APP_MESSAGES,"AU_ATTEMPT_CHECK","au-attempt-check");_defineProperty(APP_MESSAGES,"AU_CHECKING_FOR_UPDATE","au-checking-for-update");_defineProperty(APP_MESSAGES,"AU_UPDATE_AVAILABLE","au-udpate-available");_defineProperty(APP_MESSAGES,"AU_UPDATE_NOT_AVAILABLE","au-update-not-available");_defineProperty(APP_MESSAGES,"AU_UPDATE_DOWNLOADED","au-update-downloaded");_defineProperty(APP_MESSAGES,"NODE_MESSAGE","node-message");_defineProperty(APP_MESSAGES,"NODE_ERROR","node-error");_defineProperty(APP_MESSAGES,"NODE_WARNING","node-warning");_defineProperty(APP_MESSAGES,"DO_RELOAD_APP","do-reload-app");_defineProperty(APP_MESSAGES,"DO_OPEN_WINDOW","request-window-open");_defineProperty(APP_MESSAGES,"DO_RELOAD_WINDOW","request-window-reload");_defineProperty(APP_MESSAGES,"DO_CLOSE_WINDOW","request-window-close");_defineProperty(APP_MESSAGES,"DO_PRINT_WINDOW","request-window-print");_defineProperty(APP_MESSAGES,"DO_OPEN_AND_PRINT_WINDOW","request-window-and-print");module.exports["default"]=module.exports=APP_MESSAGES;},{}],18:[function(require,module,exports){'use strict';var _require29=require("@nkmjs/utils"),U=_require29.U;var _require30=require('@nkmjs/environment'),ENV=_require30.ENV;var _require31=require("@nkmjs/style"),CSS=_require31.CSS;var _require32=require("@nkmjs/ui-core"),UI=_require32.UI;var _require33=require("@nkmjs/ui-workspace"),DialogBox=_require33.DialogBox;var APP_MESSAGES=require("../app-messages.js");// Auto update dialog
var AutoUpdateDialogBox=/*#__PURE__*/function(_DialogBox){_inherits(AutoUpdateDialogBox,_DialogBox);var _super10=_createSuper(AutoUpdateDialogBox);function AutoUpdateDialogBox(){_classCallCheck(this,AutoUpdateDialogBox);return _super10.call(this);}_createClass(AutoUpdateDialogBox,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(AutoUpdateDialogBox.prototype),"_Init",this).call(this);}},{key:"_OnDataChanged",value:function _OnDataChanged(p_oldValue){_get(_getPrototypeOf(AutoUpdateDialogBox.prototype),"_OnDataChanged",this).call(this,p_oldValue);var d=this._data;RELAY.ipcOn(APP_MESSAGES.AU_ERROR,this._Bind(this._OnAUError));RELAY.ipcOn(APP_MESSAGES.AU_CHECKING_FOR_UPDATE,this._Bind(this._OnAUCheckingForUpdate));RELAY.ipcOn(APP_MESSAGES.AU_UPDATE_AVAILABLE,this._Bind(this._OnAUUpdateAvailable));RELAY.ipcOn(APP_MESSAGES.AU_UPDATE_NOT_AVAILABLE,this._Bind(this._OnAUUpdateNotAvailable));RELAY.ipcOn(APP_MESSAGES.AU_UPDATE_DOWNLOADED,this._Bind(this._OnAUUpdateDownloaded));RELAY.ipcOn(APP_MESSAGES.AU_CHECK_REQUEST_HANDLED,this._Bind(this._OnAURequestHandled));RELAY.ipcSend(APP_MESSAGES.AU_CHECK_REQUEST);}// ----> Event handling
},{key:"_OnAURequestHandled",value:function _OnAURequestHandled(p_evt,p_arg,p_err){if(p_arg===APP_MESSAGES.AU_NO_SERVER){this._Close();return;}}//Error !
},{key:"_OnAUError",value:function _OnAUError(p_evt,p_arg){this._title.text="Oops !";this._bodyContent.text="Encountered a bumper while auto-updating : ".concat(p_arg);this._ClearHandles();this.CreateHandle({text:"Well then.",trigger:{fn:this._Close}});}//Emitted when checking if an update has started.
},{key:"_OnAUCheckingForUpdate",value:function _OnAUCheckingForUpdate(p_evt,p_arg){this._title.text="Checking for update";this._bodyContent.text="Stand still.";}//Emitted when there is an available update. 
//The update is downloaded automatically.
},{key:"_OnAUUpdateAvailable",value:function _OnAUUpdateAvailable(p_evt,p_arg){this._title.text="Great !";this._bodyContent.text="An update was found, it is already downloading in the background.\nYou can either wait for the download to finish or carry on.";this.CreateHandle({text:"Install now !",trigger:{fn:this._Close}});this.CreateHandle({text:"Continue working.",trigger:{fn:this._Close}});}//Emitted when there is no available update.
},{key:"_OnAUUpdateNotAvailable",value:function _OnAUUpdateNotAvailable(p_evt,p_arg){//Just close the popup
this._title.text="You're all set !";this._bodyContent.text="No need for update.";this._ClearHandles();this.CreateHandle({text:"Well then.",trigger:{fn:this._Close}});}//Emitted when an update has been downloaded.
},{key:"_OnAUUpdateDownloaded",value:function _OnAUUpdateDownloaded(p_evt,p_arg){//Change handles to "install now" / "later"
this._title.text="Ray-day";this._bodyContent.text="Update has been downloaded and is ready to be installed.";this._ClearHandles();this.CreateHandle({text:"Install now !",trigger:{fn:this._Close}});this.CreateHandle({text:"Later.",trigger:{fn:this._Close}});}// ---->
},{key:"_Clear",value:function _Clear(){_get(_getPrototypeOf(AutoUpdateDialogBox.prototype),"_Clear",this).call(this);}},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(AutoUpdateDialogBox.prototype),"_CleanUp",this).call(this);}}]);return AutoUpdateDialogBox;}(DialogBox);module.exports["default"]=module.exports=AutoUpdateDialogBox;UI.Register('nkmjs-auto-update-dialog-box',AutoUpdateDialogBox);},{"../app-messages.js":17,"@nkmjs/environment":92,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/ui-workspace":234,"@nkmjs/utils":268}],19:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={AutoUpdateDialogBox:require("./dialog-box-auto-update")};},{"./dialog-box-auto-update":18}],20:[function(require,module,exports){'use strict';var _require34=require("@nkmjs/utils"),U=_require34.U,PATH=_require34.PATH;var _require35=require("@nkmjs/common"),DisposableObjectEx=_require35.DisposableObjectEx,SIGNAL=_require35.SIGNAL,DelayedCall=_require35.DelayedCall;var _require36=require("@nkmjs/data-core"),Metadata=_require36.Metadata,DATA_SIGNAL=_require36.DATA_SIGNAL;var _require37=require("@nkmjs/documents"),DOCUMENTS=_require37.DOCUMENTS;var UserPreferences=/*#__PURE__*/function(_DisposableObjectEx2){_inherits(UserPreferences,_DisposableObjectEx2);var _super11=_createSuper(UserPreferences);function UserPreferences(){_classCallCheck(this,UserPreferences);return _super11.call(this);}_createClass(UserPreferences,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(UserPreferences.prototype),"_Init",this).call(this);this._document=null;this._waitForThen=false;this._initFn=null;this._thenFn=null;this._Bind(this._OnDocumentLoadSuccess);this._Bind(this._OnDocumentLoadError);this._Bind(this._OnDocumentSaveSuccess);this._Bind(this._OnDocumentSaveError);this._delayedSave=new DelayedCall(this._Bind(this.Save));}/**
     * 
     * @param {string} p_name 
     * @param {function} p_initFn 
     * @param {function} p_thenFn 
     */},{key:"Load",value:function Load(p_name,p_defaults,p_initFn,p_thenFn){this._initFn=p_initFn;this._thenFn=p_thenFn;this._defaults=p_defaults;this._waitForThen=true;this._document=DOCUMENTS.Get({path:"".concat(PATH.USER_DATA,"/").concat(p_name,".json"),data:Metadata});this._document.Watch(DATA_SIGNAL.DIRTY,this._OnDocumentDirty,this);this._document.Load({success:this._OnDocumentLoadSuccess,error:this._OnDocumentLoadError});}},{key:"_OnDocumentLoadSuccess",value:function _OnDocumentLoadSuccess(){// Force an initialization of parameters, so if any has been added
// to the app, they will be present.
this.Init();this._Then();}},{key:"_OnDocumentLoadError",value:function _OnDocumentLoadError(){this.Init();}},{key:"Init",value:function Init(){if(this._defaults){U.SetMissing(this._document.currentData._data,this._defaults);}this._initFn(this._document.currentData);this._document.Dirty();}},{key:"Save",value:function Save(){this._document.Save({success:this._OnDocumentSaveSuccess,error:this._OnDocumentSaveError});}},{key:"_OnDocumentSaveSuccess",value:function _OnDocumentSaveSuccess(){this._Then();}// Definitely something wrong going on.
},{key:"_OnDocumentSaveError",value:function _OnDocumentSaveError(p_err){throw p_err;}},{key:"_Then",value:function _Then(){if(this._waitForThen){this._thenFn(this._document.currentData);}this._waitForThen=false;}},{key:"_OnDocumentDirty",value:function _OnDocumentDirty(){this._delayedSave.Schedule();}}]);return UserPreferences;}(DisposableObjectEx);module.exports["default"]=module.exports=UserPreferences;},{"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/documents":86,"@nkmjs/utils":268}],21:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={List:require("./lib/list"),Dictionary:require("./lib/dictionary"),KDictionary:require("./lib/k-dictionary"),DictionaryList:require("./lib/dictionary-list")};},{"./lib/dictionary":23,"./lib/dictionary-list":22,"./lib/k-dictionary":25,"./lib/list":26}],22:[function(require,module,exports){'use strict';var DictionaryList=/*#__PURE__*/function(){function DictionaryList(){_classCallCheck(this,DictionaryList);this._map=new Map();}_createClass(DictionaryList,[{key:"internalMap",get:function get(){return this._map;}},{key:"count",get:function get(){return this._map.size;}},{key:"isEmpty",get:function get(){return this._map.size<=0;}},{key:"keys",get:function get(){return Array.from(this._map.keys());}/**
     * Return whether or not the Dictionary contains the given key.
     * If a value is specified, return whether or not the key has the given value registered.
     * @param {*} p_key 
     * @param {*} p_value 
     * @returns {boolean} True if the Dictionary contains the matching KVP, otherwise false.
     */},{key:"Contains",value:function Contains(p_key){var p_value=arguments.length>1&&arguments[1]!==undefined?arguments[1]:undefined;if(!this._map.has(p_key)){return false;}if(p_value===undefined){return true;}else{return this._map.get(p_key).includes(p_value);}}/**
     * Return the value count for the given key.
     * @param {*} p_key 
     * @returns {number} 
     */},{key:"Count",value:function Count(p_key){if(this._map.has(p_key)){return this._map.get(p_key).length;}else{return 0;}}/**
     * Add a value to the list associated with the given key.
     * @param {*} p_key 
     * @param {*} p_value 
     */},{key:"Set",value:function Set(p_key,p_value){var list=null;if(this._map.has(p_key)){list=this._map.get(p_key);}else{list=new Array(0);this._map.set(p_key,list);}if(list.includes(p_value)){return;}list.push(p_value);}/**
     * Return the list associated with the given key.
     * If index is specified (>= 0), return the value at the given index or undefined if out-of-bounds
     * @param {*} p_key 
     * @param {number} p_index 
     * @returns {*} 
     */},{key:"Get",value:function Get(p_key){var p_index=arguments.length>1&&arguments[1]!==undefined?arguments[1]:-1;if(!this._map.has(p_key)){return undefined;}var list=this._map.get(p_key);if(p_index===-1){return list;}else if(list.length<p_index){return list[p_index];}else{throw new Error("index is out of bounds");}}/**
     * Remove the given value from the list associated with the given key.
     * Returns true if the value existed and has been removed, otherwise return false.
     * @param {*} p_key 
     * @param {*} p_value 
     * @returns {boolean} True if the KVP has been found and removed, otherwise false.
     */},{key:"Remove",value:function Remove(p_key,p_value){if(!p_value||!p_key){return false;}var list=this._map.get(p_key);if(!list){return false;}var index=list.indexOf(p_value);if(index!=-1){list.splice(index,1);if(list.length===0){this._map["delete"](p_key);}return true;}return false;}/**
     * @description TODO
     * @param {*} p_key 
     * @param  {...any} args 
     */},{key:"RemoveMultiple",value:function RemoveMultiple(p_key){throw new Error("RemoveMultiple not implemented");}/**
     * Remove and return the last value from the list associated with the given key
     * @param {*} p_key 
     * @returns {*} 
     */},{key:"Pop",value:function Pop(p_key){if(!this._map.has(p_key)){return undefined;}var list=this._map.get(p_key),value=list.pop();if(list.length===0){this._map["delete"](p_key);}return value;}/**
     * Clears all keys and values.
     */},{key:"Clear",value:function Clear(){this._map.forEach(this._Clear,this);this._map.clear();}/**
     * @access private
     * @param {*} p_value 
     * @param {*} p_key 
     * @param {*} p_map 
     */},{key:"_Clear",value:function _Clear(p_value,p_key,p_map){p_value.length=0;}}]);return DictionaryList;}();module.exports["default"]=module.exports=DictionaryList;},{}],23:[function(require,module,exports){'use strict';var isVoid=require("./helpers/isVoid");var Dictionary=/*#__PURE__*/function(){function Dictionary(){_classCallCheck(this,Dictionary);this._map=new Map();}_createClass(Dictionary,[{key:"internalMap",get:function get(){return this._map;}},{key:"count",get:function get(){return this._map.size;}},{key:"isEmpty",get:function get(){return this._map.size<=0;}},{key:"keys",get:function get(){return Array.from(this._map.keys());}/**
     * Return whether or not the Dictionary contains the given key.
     * @param {*} p_key 
     * @returns {boolean} True if the Dictionary contains the key, otherwise false
     */},{key:"Contains",value:function Contains(p_key){return this._map.has(p_key);}/**
     * Associate a value to a given key.
     * @param {*} p_key 
     * @param {*} p_value
     */},{key:"Set",value:function Set(p_key,p_value){this._map.set(p_key,p_value);}/**
     * Return the value associated with the given key.
     * @param {*} p_key 
     * @returns {*} 
     */},{key:"Get",value:function Get(p_key){return this._map.get(p_key);}/**
     * Reverse lookup through the keys and return an array 
     * of keys mapped to given value. Costly function, avoid.
     * @param {*} p_value 
     * @returns {array} 
     */},{key:"GetValueKeys",value:function GetValueKeys(p_value){if(isVoid(p_value)){return null;}var result=null,keyList=this.keys;for(var i=0,n=keyList.length;i<n;i++){var key=keyList[i];if(this._map.get(key)===p_value){if(result===null){result=new Array(1);}result.push(key);}}return result;}/**
     * Remove the given key from the Dictionary, along with its associated value.
     * Returns true if the key existed and has been removed, otherwise return false.
     * @param {*} p_key 
     * @returns {boolean} True if the value has been deleted, otherwise false
     */},{key:"Remove",value:function Remove(p_key){return this._map["delete"](p_key);}/**
     * Loops through all keys in Dictionary. Callback should match the signature : (key, value).
     * @param {function} p_fn
     * @param {object} p_this
     * @param {boolean} p_reverse
     */},{key:"ForEach",value:function ForEach(p_fn){var p_this=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_reverse=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var keys=Array.from(this._map.keys());if(p_reverse){for(var i=keys.length-1;i>=0;i--){var key=keys[i];p_fn.call(p_this,key,this._map.get(key));}}else{for(var _i=0,n=keys.length;_i<n;_i++){var _key3=keys[_i];p_fn.call(p_this,_key3,this._map.get(_key3));}}}/**
     * Clears the Dictionary from all keys and values.
     */},{key:"Clear",value:function Clear(){this._map.clear();}}]);return Dictionary;}();module.exports["default"]=module.exports=Dictionary;},{"./helpers/isVoid":24}],24:[function(require,module,exports){'use strict';module.exports["default"]=module.exports=function isVoid(p_value){return typeof p_value==='undefined'||p_value===null;};},{}],25:[function(require,module,exports){'use strict';var KDictionary=/*#__PURE__*/function(){function KDictionary(){_classCallCheck(this,KDictionary);this._rootMap=new Map();}/**
     * @description TODO
     */_createClass(KDictionary,[{key:"rootMap",get:function get(){return this._rootMap;}/**
     * @description TODO
     * @param {*} keyChain 
     * @returns {boolean} True if the KDictionary contains the provided keyChain, otherwise false.
     */},{key:"Contains",value:function Contains(){var map=this._rootMap;for(var i=0,n=arguments.length;i<n;i++){map=map.get(i<0||arguments.length<=i?undefined:arguments[i]);if(!map){return false;}}return true;}/**
     * @description TODO
     * @param {*} keyChain 
     */},{key:"Set",value:function Set(){for(var _len3=arguments.length,keyChain=new Array(_len3),_key4=0;_key4<_len3;_key4++){keyChain[_key4]=arguments[_key4];}var value=keyChain.pop(),key=keyChain.pop(),map=this._rootMap,lastMap=map;for(var i=0,n=keyChain.length;i<n;i++){var kkey=keyChain[i];map=map.get(kkey);if(!map){map=new Map();lastMap.set(kkey,map);}lastMap=map;}lastMap.set(key,value);}/**
     * @description TODO
     * @param {*} keyChain 
     * @returns {*} 
     */},{key:"Get",value:function Get(){for(var _len4=arguments.length,keyChain=new Array(_len4),_key5=0;_key5<_len4;_key5++){keyChain[_key5]=arguments[_key5];}var key=keyChain.pop(),map=this._rootMap;for(var i=0,n=keyChain.length;i<n;i++){map=map.get(keyChain[i]);if(!map){return null;}}return map.get(key);}/**
     * @description TODO
     * @param {*} keyChain 
     */},{key:"Remove",value:function Remove(){for(var _len5=arguments.length,keyChain=new Array(_len5),_key6=0;_key6<_len5;_key6++){keyChain[_key6]=arguments[_key6];}var key=keyChain.pop(),map=this._rootMap;for(var i=0,n=keyChain.length;i<n;i++){map=map.get(keyChain[i]);if(!map){return null;}}var value=map.get(key);if(typeof p_value==='undefined'||p_value===null){return;}if((typeof value==='function'?value.prototype:value)instanceof Map){value.clear();}map.remove(key);}/**
     * Clears the Dictionary from all keys and values.
     */},{key:"Clear",value:function Clear(){//TODO : In-depth clear to avoid generating too much garbage
this._rootMap.clear();}}]);return KDictionary;}();module.exports["default"]=module.exports=KDictionary;},{}],26:[function(require,module,exports){'use strict';var isVoid=require("./helpers/isVoid");/**
 * A list of item that does not accept duplicates nor null values.
 */var List=/*#__PURE__*/function(){function List(){var p_length=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;_classCallCheck(this,List);this._array=new Array(p_length);}_createClass(List,[{key:"internalArray",get:function get(){return this._array;}},{key:"isEmpty",get:function get(){return this._array.length===0;}},{key:"count",get:function get(){return this._array.length;}},{key:"first",get:function get(){return this._array[0];}},{key:"last",get:function get(){return this._array[this._array.length-1];}/**
     * Return whether or not the List contains the given item.
     * @param {*} p_item 
     */},{key:"Contains",value:function Contains(p_item){return this._array.includes(p_item);}/**
     * @description TODO
     * @param {*} p_item 
     */},{key:"IndexOf",value:function IndexOf(p_item){return this._array.indexOf(p_item);}/**
     * @description TODO
     * @param {*} p_item 
     * @returns {boolean} True if the item has been added to the list, otherwise false.
    */},{key:"Add",value:function Add(p_item){if(isVoid(p_item)){return false;}if(this._array.includes(p_item)){return false;}this._array.push(p_item);return true;}/**
     * @description TODO
     * @param {*} p_item 
     * @returns {*} 
     */},{key:"Remove",value:function Remove(p_item){if(isVoid(p_item)){return false;}return this.RemoveAt(this._array.indexOf(p_item));}/**
     * @description TODO
     * @param {*} p_index 
     * @returns {*} 
     */},{key:"RemoveAt",value:function RemoveAt(p_index){if(p_index<0||p_index>=this._array.length){return false;}return this._array.splice(p_index,1);}/**
     * @description TODO
     * @param {*} p_item 
     * @param {*} p_index 
     * @returns {*} 
     */},{key:"Insert",value:function Insert(p_item,p_index){if(isVoid(p_item)){return false;}var index=this._array.indexOf(p_item);if(index!=-1){return;}if(p_index>=this._array.length){this._array.push(p_item);return p_item;}this._array.splice(p_index,0,p_item);return p_item;}/**
     * @description TODO
     * @param {number} p_index 
     * @returns {*} 
     */},{key:"At",value:function At(p_index){return this._array[p_index];}/**
     * @description TODO
     * @returns {*} 
     */},{key:"Pop",value:function Pop(){return this._array.pop();}/**
     * @description TODO
     * @returns {*} 
     */},{key:"Shift",value:function Shift(){return this._array.shift();}/**
     * Loops through all items in List. Callback should match the signature : (item, index)
     * @param {function} p_fn
     * @param {object} p_this
     * @param {boolean} p_reverse
     */},{key:"ForEach",value:function ForEach(p_fn){var p_this=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_reverse=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var n=this._array.length;if(p_reverse){for(var i=n-1;i>=0;i--){p_fn.call(p_this,this._array[i],i);}}else{for(var _i2=0;_i2<n;_i2++){p_fn.call(p_this,this._array[_i2],_i2);}}}/**
     * Clears the List
     */},{key:"Clear",value:function Clear(){this._array.length=0;}}]);return List;}();module.exports["default"]=module.exports=List;},{"./helpers/isVoid":24}],27:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={SIGNAL:require("./lib/signal"),COMMON_FLAG:require("./lib/common-flag"),COM_ID:require("./lib/common-id"),NFOS:require("./lib/nfos"),Singleton:require("./lib/helpers/singleton"),SingletonEx:require("./lib/helpers/singleton-ex"),StateBase:require("./lib/helpers/state-base"),StateMachine:require("./lib/helpers/state-machine"),TIME:require("./lib/time/time"),BINDINGS:require("./lib/bindings"),BindingKit:require("./lib/helpers/binding-kit"),POOL:require("./lib/pool/pool"),DisposableObject:require("./lib/pool/disposable-object"),DisposableObjectEx:require("./lib/pool/disposable-object-ex"),SignalBroadcaster:require("./lib/signals/signal-broadcaster"),SignalBox:require("./lib/signals/signal-box"),Observer:require("./lib/signals/observer"),DelayedCall:require("./lib/time/delayed-call"),Callbacks:require("./lib/helpers/callbacks"),CallList:require("./lib/helpers/call-list"),OptionsHandler:require("./lib/helpers/options-handler"),CSYMBOL:require("./lib/helpers/class-symbol"),OptionObject:require("./lib/helpers/options-object")};},{"./lib/bindings":28,"./lib/common-flag":29,"./lib/common-id":30,"./lib/helpers/binding-kit":31,"./lib/helpers/call-list":32,"./lib/helpers/callbacks":33,"./lib/helpers/class-symbol":34,"./lib/helpers/options-handler":35,"./lib/helpers/options-object":36,"./lib/helpers/singleton":38,"./lib/helpers/singleton-ex":37,"./lib/helpers/state-base":39,"./lib/helpers/state-machine":40,"./lib/nfos":41,"./lib/pool/disposable-object":43,"./lib/pool/disposable-object-ex":42,"./lib/pool/pool":44,"./lib/signal":45,"./lib/signals/observer":46,"./lib/signals/signal-box":47,"./lib/signals/signal-broadcaster":48,"./lib/time/delayed-call":49,"./lib/time/time":50}],28:[function(require,module,exports){'use strict';var _require38=require("@nkmjs/utils"),U=_require38.U;var _require39=require("@nkmjs/collections"),DictionaryList=_require39.DictionaryList,KDictionary=_require39.KDictionary,Dictionary=_require39.Dictionary;var SingletonEx=require("./helpers/singleton-ex");var NFOS=require("./nfos");var BINDINGS=/*#__PURE__*/function(_SingletonEx2){_inherits(BINDINGS,_SingletonEx2);var _super12=_createSuper(BINDINGS);function BINDINGS(){_classCallCheck(this,BINDINGS);return _super12.call(this);}_createClass(BINDINGS,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(BINDINGS.prototype),"_Init",this).call(this);this._classLookup=new Dictionary();this._classReverseLookup=new Dictionary();this._squashedAssocs=new KDictionary();//Array of squashed associations (as kits get loaded and all)
this._contextMap=new KDictionary();this._contextKeyLists=new DictionaryList();this._distanceMap=new KDictionary();}},{key:"_SetClass",value:function _SetClass(p_key,p_class){this._classLookup.Set(p_key,p_class);this._classReverseLookup.Set(p_class,p_key);}/**
     * 
     * @param {string} p_key 
     * @returns {function}
     */},{key:"_GetClass",value:function _GetClass(p_key){return this._classLookup.Get(p_key);}/**
     * 
     * @param {function} p_class 
     * @returns {string}
     */},{key:"_GetClassKey",value:function _GetClassKey(p_class){var uid=this._classReverseLookup.Get(p_class);if(!uid){uid=U.Get(NFOS.Get(p_class),"uid",null);if(!uid){throw new Error("No valid NFO found for ".concat(p_class));}this._SetClass(uid,p_class);}return uid;}/**
     * 
     * @param {string} p_key 
     * @returns {function}
     */},{key:"_RemoveClass",value:function _RemoveClass(p_key){this._classLookup.Remove(p_key);}/**
     * Create an key-control pair in a given context.
     * @param {*} p_context Context where the key:binding will be set
     * @param {*} p_key key
     * @param {*} p_binding value to bound to p_key in p_context
     */},{key:"_Set",value:/**
     * @access protected
     * @param {*} p_context Context where the key:binding will be set
     * @param {*} p_key key
     * @param {*} p_binding value to bound to p_key in p_context
     */function _Set(p_context,p_key,p_binding){//TODO : Check if a value is being squashed, and store it to restore it on kit concealing
//console.log(`Set assoc ${p_context}=>${p_key}=${p_control}`);
this._contextMap.Set(p_context,p_key,p_binding);//console.log(`= ${this._contextMap.Get(p_context, p_key)}`);
this._contextKeyLists.Set(p_context,p_key);}/**
     * Try to get whatever is associated to p_key in the given context p_context.
     * @param {function} p_context 
     * @param {Function|Object} p_key 
     * @param {*} p_fallback fallback value in case no existing binding is found
     * @param {boolean} p_broad Whether or not to look for alternative matches
     */},{key:"_Get",value:/**
     * @access protected
     * @param {function} p_context 
     * @param {Function|Object} p_key 
     * @param {*} p_broad Whether or not to look for alternative matches
     */function _Get(p_context,p_key){var p_broad=arguments.length>2&&arguments[2]!==undefined?arguments[2]:true;var p_eval=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;var binding=this._contextMap.Get(p_context,p_key);if(!binding){if(p_broad){//&& typeof p_context === 'function'
//p_borad === true, look for other associations in this context that would fit
//Ensure we're looking at a constructor context first
var keyList=this._contextKeyLists.Get(p_context);if(!keyList){//console.warn(`No association found for key:${p_key.name}, context:${p_context.name ? p_context.name : p_context}`);
return null;}var distance=-1,closestDistance=Number.MAX_SAFE_INTEGER;for(var i=0,n=keyList.length;i<n;i++){var otherKey=keyList[i];distance=this._distanceMap.Get(p_key,otherKey);if(U.isVoid(distance)){distance=U.InheritanceDistance(p_key,otherKey);this._distanceMap.Set(p_key,otherKey,distance);}if(distance===-1){continue;}if(distance<closestDistance){var tResult=this._contextMap.Get(p_context,otherKey);if(tResult){closestDistance=distance;binding=tResult;}}}if(!binding){//TODO : Lookup for alternative contexts that fits and repeat the process.
//TODO : store evaluated p_contexts in p_eval to avoid infinite looping   
}}}return binding;}/**
     * 
     * @param {*} p_key 
     * @param {*} p_binding 
     * @param {*} p_context 
     */},{key:"_Remove",value:/**
     * @access protected
     * @param {*} p_key 
     * @param {*} p_binding 
     * @param {*} p_context 
     */function _Remove(p_context,p_key,p_binding){this._contextMap.Remove(p_context,p_key,p_binding);this._contextKeyLists.Remove(p_context,p_key);//TODO : Restore any squashed associations
}}],[{key:"Expand",value:function Expand(p_bindings){if(U.isFunc(p_bindings)){p_bindings=new p_bindings();}p_bindings.Deploy();}/**
     * 
     * @param {string} p_key 
     * @param {function} p_class 
     * @returns {function}
     */},{key:"SetClass",value:function SetClass(p_key,p_class){this.instance._SetClass(p_key,p_class);}},{key:"GetClass",value:function GetClass(p_key){return this.instance._GetClass(p_key);}},{key:"GetClassKey",value:function GetClassKey(p_class){return this.instance._GetClassKey(p_class);}},{key:"RemoveClass",value:function RemoveClass(p_key){this.instance._RemoveClass(p_key);}},{key:"Set",value:function Set(p_context,p_key,p_binding){this.instance._Set(p_context,p_key,p_binding);}},{key:"Get",value:function Get(p_context,p_key){var p_fallback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var p_broad=arguments.length>3&&arguments[3]!==undefined?arguments[3]:true;p_key=U.isFunc(p_key)?p_key:p_key.constructor;if(!U.isFunc(p_key)){throw new Error("p_key must be a constructor or have an accessible constructor.");}var result=this.instance._Get(p_context,p_key,p_broad);if(!result){return p_fallback;}return result;}},{key:"Remove",value:function Remove(p_context,p_key,p_binding){this.instance._Remove(p_context,p_key,p_binding);}}]);return BINDINGS;}(SingletonEx);module.exports["default"]=module.exports=BINDINGS;},{"./helpers/singleton-ex":37,"./nfos":41,"@nkmjs/collections":21,"@nkmjs/utils":268}],29:[function(require,module,exports){'use strict';var COMMON_FLAG=function COMMON_FLAG(){_classCallCheck(this,COMMON_FLAG);};_defineProperty(COMMON_FLAG,"INFOS","infos");_defineProperty(COMMON_FLAG,"WARNING","warning");_defineProperty(COMMON_FLAG,"ERROR","error");_defineProperty(COMMON_FLAG,"READY","ready");_defineProperty(COMMON_FLAG,"DIRTY","dirty");_defineProperty(COMMON_FLAG,"LOADING","loading");_defineProperty(COMMON_FLAG,"PROCESSING","processing");_defineProperty(COMMON_FLAG,"WAITING","waiting");_defineProperty(COMMON_FLAG,"ACTIVE","active");module.exports["default"]=module.exports=COMMON_FLAG;},{}],30:[function(require,module,exports){'use strict';var COM_ID=function COM_ID(){_classCallCheck(this,COM_ID);};_defineProperty(COM_ID,"METAPREFIX","META@");_defineProperty(COM_ID,"UID","uid");_defineProperty(COM_ID,"NAME","name");_defineProperty(COM_ID,"TITLE","title");_defineProperty(COM_ID,"MESSAGE","message");_defineProperty(COM_ID,"ICON","icon");_defineProperty(COM_ID,"PATH","path");_defineProperty(COM_ID,"DATA","data");_defineProperty(COM_ID,"CMD_PRIMARY","primaryCommand");_defineProperty(COM_ID,"CMD_SECONDARY","secondaryCommand");_defineProperty(COM_ID,"CMD_LIST","commandList");_defineProperty(COM_ID,"OWNER","owner");module.exports["default"]=module.exports=COM_ID;},{}],31:[function(require,module,exports){'use strict';var _require40=require("@nkmjs/collections"),Dictionary=_require40.Dictionary;var _require41=require("@nkmjs/utils"),U=_require41.U,LOG=_require41.LOG;var NFOS=require("../nfos");var DisposableObjectEx=require("../pool/disposable-object-ex");var BINDINGS=require("../bindings");var BindingKit=/*#__PURE__*/function(_DisposableObjectEx3){_inherits(BindingKit,_DisposableObjectEx3);var _super13=_createSuper(BindingKit);function BindingKit(){_classCallCheck(this,BindingKit);return _super13.call(this);}_createClass(BindingKit,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(BindingKit.prototype),"_Init",this).call(this);this._deployed=false;this._KVPS=new Array(0);this._CLASSES=new Array(0);this._classDict=new Dictionary();/* KVP Example

        this.AddClass(
            SomeClass
        );

        this.Add({
            context:EDITOR,
            kvps:[
                { key:DATA_CLASS, binding:UI_EDITOR_CLASS }
            ]
        },
        {
            context:SERIALIZATION_CONTEXT.SERIALIZER,
            kvps:[
                { key:SKEY.JSON, binding:JSONSerializer }
            ]
        },
        {
            context:SKEY.JSON,
            kvps:[
                { key:DATA_CLASS, binding:ThatDataClassSerializer }
            ]
        },
        {
            context:DataBlock,
            kvps:[
                { key:'a.meta.property.path', binding:UIControlClass }
            ]
        });

        */}},{key:"Add",value:function Add(){if(this._deployed){throw new Error("Cannot add binding to kit while it is deployed.");}for(var i=0,n=arguments.length;i<n;i++){this._KVPS.push(i<0||arguments.length<=i?undefined:arguments[i]);}}},{key:"AddClasses",value:function AddClasses(){if(this._deployed){throw new Error("Cannot add binding to kit while it is deployed.");}for(var i=0,n=arguments.length;i<n;i++){this._CLASSES.push(i<0||arguments.length<=i?undefined:arguments[i]);}}/**
     * Register this kit's data to global bindings
     */},{key:"Deploy",value:function Deploy(){if(this._deployed){return;}var b=BINDINGS.instance;for(var i=0,n=this._KVPS.length;i<n;i++){var assoc=this._KVPS[i],context=assoc.context,kvps=assoc.kvps;for(var k=0,_n=kvps.length;k<_n;k++){var kvp=kvps[k];b._Set(context,kvp.key,kvp.binding);if(true){// TODO : REMOVE, FOR DEV ONLY
var cName=U.isFunc(context)?context.name:context,kName=U.isFunc(kvp.key)?kvp.key.name:kvp.key,vName=U.isFunc(kvp.binding)?kvp.binding.name:kvp.binding;LOG._("\u2505 ".concat(cName," \u27FC ").concat(kName," \u291E ").concat(vName),"#7f7f7f");}}}for(var _i3=0,_n2=this._CLASSES.length;_i3<_n2;_i3++){var cl=this._CLASSES[_i3],uid=U.Get(NFOS.Get(cl),"uid",null);if(!uid){throw new Error("No valid NFO found for ".concat(this._CLASSES[_i3]));}this._classDict.Set(cl,uid);b._SetClass(uid,cl);LOG._("\u29C9 ".concat(uid," \u291E ").concat(cl.name),"#7f7f7f");}this._deployed=true;}/**
     * Register this kit's data to global bindings
     */},{key:"Conceal",value:function Conceal(){if(!this._deployed){return;}var b=BINDINGS.instance;for(var i=0,n=this._KVPS.length;i<n;i++){var assoc=this._KVPS[i],context=assoc.context,_kvps=assoc.kvps;for(var k=0,_n3=_kvps.length;k<_n3;k++){var kvp=_kvps[k];b._Remove(context,kvp.key,kvp.binding);}}var kvps=this._classDict.keys;for(var _i4=0,_n4=kvps.length;_i4<_n4;_i4++){b._RemoveClass(this._classDict.Get(kvps[_i4]));}this._deployed=false;}},{key:"_CleanUp",value:function _CleanUp(){this.Conceal();_get(_getPrototypeOf(BindingKit.prototype),"_CleanUp",this).call(this);}}]);return BindingKit;}(DisposableObjectEx);module.exports["default"]=module.exports=BindingKit;},{"../bindings":28,"../nfos":41,"../pool/disposable-object-ex":42,"@nkmjs/collections":21,"@nkmjs/utils":268}],32:[function(require,module,exports){'use strict';var _require42=require("@nkmjs/collections"),List=_require42.List;var _require43=require("@nkmjs/utils"),U=_require43.U;var CallList=/*#__PURE__*/function(){function CallList(){_classCallCheck(this,CallList);this._list=new List(0);}_createClass(CallList,[{key:"count",get:function get(){return this._list.count;}/**
     * 
     * @param {function} p_fn 
     */},{key:"Add",value:function Add(p_fn){if(!U.isFunc(p_fn)){throw new Error("p_fn is not a Function.");}this._list.Add(p_fn);}},{key:"Remove",value:function Remove(p_fn){this._list.Remove(p_fn);}},{key:"Notify",value:function Notify(){for(var _len6=arguments.length,args=new Array(_len6),_key7=0;_key7<_len6;_key7++){args[_key7]=arguments[_key7];}for(var i=0,n=this._list.count;i<n;i++){this._list.At(i).apply(null,args);}}},{key:"NotifyFlush",value:function NotifyFlush(){this.Notify.apply(this,arguments);this.Clear();}},{key:"Clear",value:function Clear(){this._list.Clear();}}]);return CallList;}();module.exports["default"]=module.exports=CallList;},{"@nkmjs/collections":21,"@nkmjs/utils":268}],33:[function(require,module,exports){'use strict';var _require44=require("@nkmjs/collections"),List=_require44.List;var Callbacks=/*#__PURE__*/function(){function Callbacks(){_classCallCheck(this,Callbacks);this._dispatching=false;this._onSuccessList=new List(0);this._onErrorList=new List(0);this._onAnyList=new List(0);}/**
     * Add onSuccess function
     * @type {function}
     */_createClass(Callbacks,[{key:"onSuccess",set:function set(p_value){if(this._dispatching){return;}this._onSuccessList.Add(p_value);}/**
     * Add onError function
     * @type {function}
     */},{key:"onError",set:function set(p_value){if(this._dispatching){return;}this._onErrorList.Add(p_value);}/**
     * Add onAny function
     * @type {function}
     */},{key:"onAny",set:function set(p_value){if(this._dispatching){return;}this._onAnyList.Add(p_value);}/**
     * Add a set of callbacks
     * @param {*} p_options 
     * @param {*} p_options.success onSuccess
     * @param {*} p_options.error onError
     * @param {*} p_options.any onAny
     */},{key:"Add",value:function Add(p_options){if(!p_options||this._dispatching){return;}if(p_options.success){this._onSuccessList.Add(p_options.success);}if(p_options.error){this._onErrorList.Add(p_options.error);}if(p_options.any){this._onAnyList.Add(p_options.any);}}},{key:"then",value:function then(p_fn){this.onSuccess=p_fn;return this;}},{key:"catch",value:function _catch(p_fn){this.onError=p_fn;return this;}},{key:"finally",value:function _finally(p_fn){this.onAny=p_fn;return this;}/**
     * Call all success handlers with provided arguments, then all 'any'
     * @param  {...any} args 
     */},{key:"OnSuccess",value:function OnSuccess(){if(this._dispatching){return;}for(var _len7=arguments.length,args=new Array(_len7),_key8=0;_key8<_len7;_key8++){args[_key8]=arguments[_key8];}this._Dispatch.apply(this,[this._onSuccessList].concat(args));this._Dispatch.apply(this,[this._onAnyList].concat(args));}/**
     * Call all error handlers with provided arguments, then all 'any'
     * @param  {...any} args 
     */},{key:"OnError",value:function OnError(){if(this._dispatching){return;}for(var _len8=arguments.length,args=new Array(_len8),_key9=0;_key9<_len8;_key9++){args[_key9]=arguments[_key9];}this._Dispatch.apply(this,[this._onErrorList].concat(args));this._Dispatch.apply(this,[this._onAnyList].concat(args));}/**
     * Call all success handlers with provided arguments, then all 'any',
     * then removes all handlers
     * @param  {...any} args 
     */},{key:"OnSuccessFlush",value:function OnSuccessFlush(){if(this._dispatching){return;}this.OnSuccess.apply(this,arguments);this.Clear();}/**
     * Call all error handlers with provided arguments, then all 'any',
     * then removes all handlers
     * @param  {...any} args 
     */},{key:"OnErrorFlush",value:function OnErrorFlush(){if(this._dispatching){return;}this.OnError.apply(this,arguments);this.Clear();}/**
     * @access protected
     * @param {*} p_list 
     * @param  {...any} args 
     */},{key:"_Dispatch",value:function _Dispatch(p_list){if(this._dispatching){return;}this._dispatching=true;for(var _len9=arguments.length,args=new Array(_len9>1?_len9-1:0),_key10=1;_key10<_len9;_key10++){args[_key10-1]=arguments[_key10];}for(var i=0,n=p_list.count;i<n;i++){p_list.At(i).apply(null,args);}this._dispatching=false;}/**
     * Removes all callback handlers
     */},{key:"Clear",value:function Clear(){if(this._dispatching){return;}this._onSuccessList.Clear();this._onErrorList.Clear();this._onAnyList.Clear();}}]);return Callbacks;}();module.exports["default"]=module.exports=Callbacks;},{"@nkmjs/collections":21}],34:[function(require,module,exports){'use strict';var CSYMBOL=function CSYMBOL(){_classCallCheck(this,CSYMBOL);};module.exports["default"]=module.exports=CSYMBOL;},{}],35:[function(require,module,exports){'use strict';var _require45=require("@nkmjs/utils"),U=_require45.U;var _require46=require("@nkmjs/collections"),DictionaryList=_require46.DictionaryList;/**
 * Associate a callback to an option id in order to easily manage
 * handling options inside an object.
 */var __direct=Symbol("direct");var OptionsHandler=/*#__PURE__*/function(){function OptionsHandler(){var p_wrapUpFn=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var p_beginFn=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_defaults=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;_classCallCheck(this,OptionsHandler);this._hooks=new DictionaryList();this._defaults=p_defaults;this._beginFn=p_beginFn;this._wrapUpFn=p_wrapUpFn;}_createClass(OptionsHandler,[{key:"defaults",get:function get(){return this._defaults;},set:function set(p_value){this._defaults=p_value;}},{key:"beginFn",get:function get(){return this._beginFn;},set:function set(p_value){this._beginFn=p_value;}},{key:"wrapUpFn",get:function get(){return this._wrapUpFn;}/**
     * Hook an option ID to a function or property ID
     * @param {string} p_optionID 
     * @param {Function|string} p_fn 
     */,set:function set(p_value){this._wrapUpFn=p_value;}},{key:"Hook",value:function Hook(p_optionID){var p_fn=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_default=arguments.length>2&&arguments[2]!==undefined?arguments[2]:undefined;if(p_fn===null){p_fn=__direct;}this._hooks.Set(p_optionID,p_fn);if(p_default!=undefined){if(!this._defaults){this._defaults={};}this._defaults[p_optionID]=p_default;}}/**
     * Unhook an ID-callback pair
     * @param {string} p_optionID 
     * @param {Function|string} p_fn 
     */},{key:"UnHook",value:function UnHook(p_optionID){var p_fn=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;if(p_fn===null){p_fn=__direct;}this._hooks.Remove(p_optionID,p_fn);}/**
     * Process an option object and trigger associated callbacks with the option value
     * as well as the options themselves.
     * @param {*} p_target target object on which properties are set
     * @param {object} p_options 
     * @param {object} p_altOptions an alternative set of options to forward to handlers (used when appending options)
     */},{key:"Process",value:function Process(p_target,p_options){var p_altOptions=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;if(this._beginFn){this._beginFn(p_options,p_altOptions);}if(this._defaults){for(var key in this._defaults){if(!(key in p_options)){// Force defaults
p_options[key]=this._defaults[key];}}}if(!p_altOptions){p_altOptions=p_options;}for(var _key11 in p_options){var callList=this._hooks.Get(_key11),value=p_options[_key11];if(!callList){continue;}for(var i=0,n=callList.length;i<n;i++){var fn=callList[i];if(fn===__direct){p_target[_key11]=value;continue;}if(U.isString(fn)){// Consider string property setters
p_target[fn]=value;}else{fn(value,p_altOptions);}}}if(this._wrapUpFn){this._wrapUpFn.call(null,p_altOptions);}}/**
     * Process a single option
     * @param {*} p_target 
     * @param {*} p_optionID 
     * @param {*} p_optionValue 
     * @param {*} p_others 
     * @param {*} p_wrapUp whether or not to wrap-up option call 
     */},{key:"ProcessSingle",value:function ProcessSingle(p_target,p_optionID,p_optionValue){var p_others=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;var p_wrapUp=arguments.length>4&&arguments[4]!==undefined?arguments[4]:false;var callList=this._hooks.Get(p_optionID);if(callList===__direct){p_target[p_optionID]=p_optionValue;return;}if(!callList){return;}for(var i=0,n=callList.count;i<n;i++){var fn=callList.At(i);if(U.isString(fn)){// Consider string property setters
p_target[fn]=p_optionValue;}else{fn(p_optionValue,p_others);}}if(p_wrapUp&&this._wrapUpFn){this._wrapUpFn.call(null,p_others);}}},{key:"WrapUp",value:function WrapUp(p_options){if(this._wrapUpFn){this._wrapUpFn.call(null,p_options);}}},{key:"Clear",value:function Clear(){this._hooks.Clear();this._defaults=null;}}]);return OptionsHandler;}();module.exports["default"]=module.exports=OptionsHandler;},{"@nkmjs/collections":21,"@nkmjs/utils":268}],36:[function(require,module,exports){'use strict';var _require47=require("@nkmjs/utils"),U=_require47.U;var DisposableObjectEx=require("../pool/disposable-object-ex");var OptionsHandler=require("./options-handler");var OptionObject=/*#__PURE__*/function(_DisposableObjectEx4){_inherits(OptionObject,_DisposableObjectEx4);var _super14=_createSuper(OptionObject);function OptionObject(){_classCallCheck(this,OptionObject);return _super14.call(this);}_createClass(OptionObject,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(OptionObject.prototype),"_Init",this).call(this);this._options={};this._optionHandler=new OptionsHandler();}},{key:"optionHandler",get:function get(){return this._optionHandler;}},{key:"options",get:function get(){return this._options;},set:function set(p_options){this._options=p_options;this._optionHandler.Process(this,p_options);}// ----> Options
},{key:"AppendOptions",value:function AppendOptions(p_options){if(!this._options){this._options={};}for(var member in p_options){var value=p_options[member];this._options[member]=value;}this._optionHandler.Process(this,p_options,this._options);}/**
     * Return the option value at specified id.
     * Return the fallback value in case no option exists.
     * @param {string} p_id 
     * @param {*} p_fallback 
     */},{key:"GetOption",value:function GetOption(p_id){var p_fallback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;if(!this._options.hasOwnProperty(p_id)){return p_fallback;}return this._options[p_id];}/**
     * Return the option value at specified id.
     * Return the fallback value in case no option exists.
     * @param {string} p_id 
     * @param {*} p_fallback 
     */},{key:"GetOrSetOption",value:function GetOrSetOption(p_id){var p_fallback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_process=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;if(!this._options.hasOwnProperty(p_id)){this.SetOption(p_id,p_fallback);return p_fallback;}else{return this._options[p_id];}}/**
     * Set the value of the option with the specified id.
     * @param {string} p_id 
     * @param {*} p_value 
     */},{key:"SetOption",value:function SetOption(p_id,p_value){if(!this._options){this._options={};}if(p_id in this._options&&this._options[p_id]===p_value){return;}//process value first so if one already exists, it can be fetched as 'previous value'
this._optionHandler.ProcessSingle(this,p_id,p_value,this._options,true);this._options[p_id]=p_value;}},{key:"_CleanUp",value:function _CleanUp(){this._options={};//U.DeepClear(this._options, true); //Circular bs going on
_get(_getPrototypeOf(OptionObject.prototype),"_CleanUp",this).call(this);}}]);return OptionObject;}(DisposableObjectEx);module.exports["default"]=module.exports=OptionObject;},{"../pool/disposable-object-ex":42,"./options-handler":35,"@nkmjs/utils":268}],37:[function(require,module,exports){'use strict';var Singleton=require("./singleton");var SignalBox=require("../signals/signal-box");var SingletonEx=/*#__PURE__*/function(_Singleton){_inherits(SingletonEx,_Singleton);var _super15=_createSuper(SingletonEx);function SingletonEx(){_classCallCheck(this,SingletonEx);return _super15.call(this);}/**
     * @access protected
     */_createClass(SingletonEx,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(SingletonEx.prototype),"_Init",this).call(this);this._signals=new SignalBox();}/**
     * @access protected
     * @param {*} p_signalId 
     * @param  {...any} args 
     */},{key:"_Broadcast",value:function _Broadcast(p_signalId){var _this$_signals;for(var _len10=arguments.length,args=new Array(_len10>1?_len10-1:0),_key12=1;_key12<_len10;_key12++){args[_key12-1]=arguments[_key12];}(_this$_signals=this._signals).Broadcast.apply(_this$_signals,[p_signalId].concat(args));}},{key:"Watch",value:function Watch(p_signalId,p_fn,p_listener){this._signals.Add(p_signalId,p_fn,p_listener);}},{key:"WatchOnce",value:function WatchOnce(p_signalId,p_fn,p_listener){this._signals.AddOnce(p_signalId,p_fn,p_listener);}},{key:"Unwatch",value:function Unwatch(p_signalId,p_fn,p_listener){this._signals.Remove(p_signalId,p_fn,p_listener);}}],[{key:"Watch",value:function Watch(p_signalId,p_fn,p_listener){this.instance._signals.Add(p_signalId,p_fn,p_listener);}},{key:"WatchOnce",value:function WatchOnce(p_signalId,p_fn,p_listener){this.instance._signals.AddOnce(p_signalId,p_fn,p_listener);}},{key:"Unwatch",value:function Unwatch(p_signalId,p_fn,p_listener){this.instance._signals.Remove(p_signalId,p_fn,p_listener);}}]);return SingletonEx;}(Singleton);module.exports["default"]=module.exports=SingletonEx;},{"../signals/signal-box":47,"./singleton":38}],38:[function(require,module,exports){'use strict';var Singleton=/*#__PURE__*/function(){function Singleton(){_classCallCheck(this,Singleton);if(this.constructor.__instance){throw new Error("Cannot create multiple instance of a singleton.");}this.constructor.__instance=this;try{var w=window;this._isBrowser=true;}catch(e){this._isBrowser=false;}this._Init();this._PostInit();}_createClass(Singleton,[{key:"isBrowser",get:/**
     * Whether or not the code is executed in a browser context
     * @type {boolean}
     */function get(){return this._isBrowser;}/**
     * @access protected
     * @param {*} p_func 
     */},{key:"_Bind",value:function _Bind(p_func){return this[p_func.name]=p_func.bind(this);}/**
     * @access protected
     */},{key:"_Init",value:function _Init(){}/**
     * @access protected
     */},{key:"_PostInit",value:function _PostInit(){}}],[{key:"instance",get:/**
     * Unique instance
     * @type {*}
     */function get(){if(!this.__instance){new this();}return this.__instance;}}]);return Singleton;}();_defineProperty(Singleton,"__instance",null);module.exports["default"]=module.exports=Singleton;},{}],39:[function(require,module,exports){'use strict';var _require48=require("@nkmjs/collections"),Dictionary=_require48.Dictionary;var _require49=require("@nkmjs/utils"),U=_require49.U;var StateBase=/*#__PURE__*/function(){function StateBase(){_classCallCheck(this,StateBase);this._id="";this._data=null;}/**
     * State id
     * @type {string}
     */_createClass(StateBase,[{key:"id",get:function get(){return this._id;}/**
     * State data
     * @type {object}
     */},{key:"data",get:function get(){return this._data;}/**
     * Get or create a state with a given id and data
     * @param {string} p_stateId 
     * @param {object} p_data 
     * @returns {StateBase} Requested state
     */},{key:"toString",value:function toString(){return this._id;}}],[{key:"GetOrCreate",value:function GetOrCreate(p_stateId){var p_data=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;if(U.isVoid(this._stateMap)){this._stateMap=new Dictionary();}var state=this._stateMap.Get(p_stateId);if(U.isVoid(state)){state=new this();state._id=p_stateId;state._data=p_data;this._stateMap.Set(p_stateId,state);}return state;}}]);return StateBase;}();module.exports["default"]=module.exports=StateBase;/* State Class Example

const _state_a_opts = {};
const _state_b_opts = {};

class MyState extends StateBase{
    constructor(){ super(); }

    static get STATE_A(){ return MyState.GetOrCreate(`state_a`, _state_a_opts); }
    static get STATE_B(){ return MyState.GetOrCreate(`state_b`, _state_b_opts); }

}

module.exports = MyState;

*/},{"@nkmjs/collections":21,"@nkmjs/utils":268}],40:[function(require,module,exports){'use strict';var _require50=require("@nkmjs/utils"),U=_require50.U;var SIGNAL=require("../signal");var DisposableObjectEx=require("../pool/disposable-object-ex");var SignalBox=require("../signals/signal-box");var StateBase=require("./state-base");var StateMachine=/*#__PURE__*/function(_DisposableObjectEx5){_inherits(StateMachine,_DisposableObjectEx5);var _super16=_createSuper(StateMachine);function StateMachine(){var _this;_classCallCheck(this,StateMachine);_this=_super16.call(this);_this._currentState=null;_this._owner=_assertThisInitialized(_this);_this._signals=new SignalBox();return _this;}/**
     * State machine owner
     * @type {DisposableObjectEx}
     */_createClass(StateMachine,[{key:"owner",get:function get(){return this._owner;}/**
     * Current state
     * @type {StateBase}
     */,set:function set(p_value){if(U.isVoid(p_value)){p_value=this;}this._owner=p_value;}},{key:"currentState",get:/**
     * Current state
     * @type {StateBase}
     */function get(){return this._currentState;}/**
     * 
     * @param {*} p_state 
     * @returns {boolean} True if the current state is p_state, otherwise false.
     */,set:function set(p_value){if(this._currentState===p_value){return;}var oldValue=this._currentState;this._currentState=p_value;if(oldValue){}if(p_value){}this._OnCurrentStateChanged(oldValue);this._Broadcast(SIGNAL.STATE_CHANGED,this._owner,p_value,oldValue);if(this._owner===this){this._signals.Broadcast(p_value,this._owner);}else{this._owner._Broadcast(p_value,this._owner);}}},{key:"Is",value:function Is(p_state){return this._currentState===p_state;}/**
     * 
     * @param  {...any} args a list of states
     * @returns {boolean} True if the current state is any of the provided arguments, otherwise false.
     */},{key:"IsAny",value:function IsAny(){for(var i=0,n=arguments.length;i<n;i++){if(this._currentState===(i<0||arguments.length<=i?undefined:arguments[i])){return true;}}return false;}/**
     * 
     * @param {*} p_state 
     * @returns {boolean} True if the current state is NOT p_state, otherwise false.
     */},{key:"IsNot",value:function IsNot(p_state){return this._currentState!=p_state;}/**
     * 
     * @param  {...any} args a list of states
     * @returns {boolean} True if the current state is NOT any of the provided arguments, otherwise false.
     */},{key:"IsNotAny",value:function IsNotAny(){for(var i=0,n=arguments.length;i<n;i++){if(this._currentState===(i<0||arguments.length<=i?undefined:arguments[i])){return false;}}return true;}/**
     * @access protected
     */},{key:"_OnCurrentStateChanged",value:function _OnCurrentStateChanged(p_oldState){}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){this._currentState=null;this._owner=null;this._signals.RemoveAll();_get(_getPrototypeOf(StateMachine.prototype),"_CleanUp",this).call(this);}}]);return StateMachine;}(DisposableObjectEx);module.exports["default"]=module.exports=StateMachine;},{"../pool/disposable-object-ex":42,"../signal":45,"../signals/signal-box":47,"./state-base":39,"@nkmjs/utils":268}],41:[function(require,module,exports){'use strict';var _require51=require("@nkmjs/utils"),U=_require51.U;var __NFO__="__NFO__";var NFOS=/*#__PURE__*/function(){function NFOS(){_classCallCheck(this,NFOS);}_createClass(NFOS,null,[{key:"Get",value:/**
     * Attempts to retrieve constructor-level metadata.
     * Checks first for a __NFO__ property in the body of the object (if an object is provided)
     * Then checks for a static __NFO__ method in the constructor     
     * @param {*} p_obj
     * @param {object} p_fallback
     * @returns {object} The meta information linked to the provided object, or null.
     */function Get(p_obj){var p_fallback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;if(U.isObject(p_obj)){if(__NFO__ in p_obj){return p_obj[__NFO__];}else if(__NFO__ in p_obj.constructor){return p_obj.constructor[__NFO__];}}else if(U.isFunc(p_obj)&&__NFO__ in p_obj){return p_obj[__NFO__];}return p_fallback;}/**
     * Copy missing infos from baseClass to a base object
     * @param {*} p_base target (base) nfo
     * @param {*} p_baseClass class to extend nfo from
     * @param {*} p_merge properties ID to be merged in (properties should be arrays)
     */},{key:"Ext",value:function Ext(p_base,p_baseClass){var p_merge=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var source=p_baseClass[__NFO__];for(var key in source){var sourceValue=source[key];if(!p_base.hasOwnProperty(key)){if(U.isArray(sourceValue)){p_base[key]=_toConsumableArray(sourceValue);}else if(U.isObject()){p_base[key]=this.Ext({},sourceValue);}else{p_base[key]=sourceValue;}}else{var baseValue=p_base[key];if(U.isArray(baseValue)){if(U.isArray(sourceValue)&&p_merge&&p_merge.includes(key)){for(var i=0,n=sourceValue.length;i<n;i++){if(!baseValue.includes(sourceValue[i])){baseValue.push(sourceValue[i]);}}}}else if(U.isObject(baseValue)&&UTILS.isObject(sourceValue)){this.Ext(baseValue,sourceValue,p_merge);}else{// Ignore
}}}return p_base;}}]);return NFOS;}();_defineProperty(NFOS,"KEY",__NFO__);module.exports["default"]=module.exports=NFOS;},{"@nkmjs/utils":268}],42:[function(require,module,exports){'use strict';var DisposableObject=require("./disposable-object");var SignalBox=require("../signals/signal-box");var SIGNAL=require("../signal");var DisposableObjectEx=/*#__PURE__*/function(_DisposableObject3){_inherits(DisposableObjectEx,_DisposableObject3);var _super17=_createSuper(DisposableObjectEx);function DisposableObjectEx(){_classCallCheck(this,DisposableObjectEx);return _super17.call(this);}// ----> Init
/**
     * @access protected
     */_createClass(DisposableObjectEx,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(DisposableObjectEx.prototype),"_Init",this).call(this);this._releasePrevented=false;this._signals=new SignalBox();}// ----> Signals
/**
     * @access protected
     * @param {*} p_signalId 
     * @param  {...any} args 
     */},{key:"_Broadcast",value:function _Broadcast(p_signalId){var _this$_signals2;for(var _len11=arguments.length,args=new Array(_len11>1?_len11-1:0),_key13=1;_key13<_len11;_key13++){args[_key13-1]=arguments[_key13];}(_this$_signals2=this._signals).Broadcast.apply(_this$_signals2,[p_signalId].concat(args));}/**
     * Watch a signal broadcasted by this object
     * @param {*} p_signalId The signal to watch for
     * @param {function} p_fn The callback to trigger when the signal fires
     * @param {*} p_listener The callback's 'thisArg', if any
     */},{key:"Watch",value:function Watch(p_signalId,p_fn){var p_listener=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;this._signals.Add(p_signalId,p_fn,p_listener);}/**
     * Watch a signal broadcasted by this object, once only.
     * @param {*} p_signalId The signal to watch for
     * @param {function} p_fn The callback to trigger when the signal fires
     * @param {*} p_listener The callback's 'thisArg', if any
     */},{key:"WatchOnce",value:function WatchOnce(p_signalId,p_fn){var p_listener=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;this._signals.AddOnce(p_signalId,p_fn,p_listener);}/**
     * Unwatch a signal broadcasted by this object
     * @param {*} p_signalId The signal that was being watched
     * @param {function} p_fn The callback to be removed
     * @param {*} p_listener The callback's 'thisArg', if any
     */},{key:"Unwatch",value:function Unwatch(p_signalId,p_fn){var p_listener=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;this._signals.Remove(p_signalId,p_fn,p_listener);}// ----> Pooling
/**
     * Interrupts the releasing process and prevents this object from being released.
     * Needs to be called right after SIGNAL.RELEASING has been broadcasted, otherwise has no effect.
     */},{key:"PreventRelease",value:function PreventRelease(){this._releasePrevented=true;}/**
     * Releases the object and pool it.
     */},{key:"Release",value:function Release(){if(this._isReleasing){return;}this._signals.silent=false;this._isReleasing=true;this._releasePrevented=false;this._Broadcast(SIGNAL.RELEASING,this);if(this._releasePrevented){this._isReleasing=false;this._releasePrevented=false;return;}this._Broadcast(SIGNAL.RELEASED,this);this._CleanUp();if(this._returnFn!=undefined){this._returnFn(this);}this._isReleasing=false;}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(DisposableObjectEx.prototype),"_CleanUp",this).call(this);this._releasePrevented=false;this._signals.Clear();}}]);return DisposableObjectEx;}(DisposableObject);module.exports["default"]=module.exports=DisposableObjectEx;},{"../signal":45,"../signals/signal-box":47,"./disposable-object":43}],43:[function(require,module,exports){'use strict';var DisposableObject=/*#__PURE__*/function(){function DisposableObject(){_classCallCheck(this,DisposableObject);this._Init();this._PostInit();}/**
     * @access protected
     */_createClass(DisposableObject,[{key:"_Init",value:function _Init(){this._isReleasing=false;this._returnFn=null;}},{key:"isReleasing",get:function get(){return this._isReleasing;}/**
     * @access protected
     */},{key:"_PostInit",value:function _PostInit(){}/**
     * @access protected
     * Bind the given function to this object and returns it.
     * Note that it replaces the function reference, hence referencing function before they are being bound in _Init,
     * ( i.e in the constructor ) will target an obsolete function.
     * @param {*} p_func 
     */},{key:"_Bind",value:function _Bind(p_func){return this[p_func.name]=p_func.bind(this);}// ----> Pooling
/**
     * Releases the object and return it back to the pool.
     */},{key:"Release",value:function Release(){if(this._isReleasing){return;}this._isReleasing=true;this._CleanUp();if(this._returnFn!=undefined){this._returnFn(this);}this._isReleasing=false;}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){}}]);return DisposableObject;}();module.exports["default"]=module.exports=DisposableObject;},{}],44:[function(require,module,exports){'use strict';var _require52=require("@nkmjs/utils"),U=_require52.U;var _require53=require("@nkmjs/collections"),Dictionary=_require53.Dictionary,DictionaryList=_require53.DictionaryList;var Singleton=require("../helpers/singleton");var DisposableObject=require("./disposable-object");var POOL=/*#__PURE__*/function(_Singleton2){_inherits(POOL,_Singleton2);var _super18=_createSuper(POOL);function POOL(){_classCallCheck(this,POOL);return _super18.call(this);}/**
     * @access protected
     */_createClass(POOL,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(POOL.prototype),"_Init",this).call(this);this._globalTypes=new Dictionary();this._globalPool=new DictionaryList();this._Bind(this._Return);}/**
     * @description TODO
     * @param {class} p_class 
     */},{key:"_Register",value:/**
     * @access private
     * Register custom element
     * @param {DisposableObject} p_class 
     */function _Register(p_class){if(!U.isFunc(p_class)){throw new Error("Register used with invalid constructor : ".concat(p_class));}this._globalTypes.Set(p_class.name,p_class);//#LOG console.log(`%c+ ${p_class.name}`, 'color: #ff8a00');
}},{key:"_GetClass",value:/**
     * @access private
     * @param {*} p_id 
     */function _GetClass(p_id){return this._globalTypes.Get(p_id);}/// POOLING ///
/**
     * @access private
     * Return a deprecated DisposableHTMLElement to be re-used later.
     * @param {DisposableObject} p_obj 
     */},{key:"_Return",value:function _Return(p_obj){if(!U.isObject(p_obj)||!U.isInstanceOf(p_obj,DisposableObject)){throw new Error("Return used with invalid object : "+p_obj);}var keyName=p_obj.constructor.name;if(!this._globalTypes.Contains(keyName)){throw new Error("Return used with a never-registered object type : "+keyName);}this._globalPool.Set(keyName,p_obj);}/**
     * @description TODO
     * @param {class} p_class 
     */},{key:"_Rent",value:/**
     * @access private
     * @description TODO
     * @param {class} p_class 
     * @returns {*} An object of the provided type
     */function _Rent(p_class){var keyName=null;if(U.isString(p_class)){keyName=p_class;}else if(typeof p_class==="function"){keyName=p_class.name;}else{throw new Error("Rent requires either a string or a constructor.");}if(!this._globalTypes.Contains(keyName)){if(typeof p_class==="function"&&U.isInstanceOf(p_class.prototype,DisposableObject)){this._Register(p_class);}else{throw new Error("Could not find any constructor association for : ".concat(keyName));}}p_class=this._globalTypes.Get(keyName);var obj=this._globalPool.Pop(keyName);if(!obj){obj=new p_class();obj._returnFn=this._Return;}if('Wake'in obj){obj.Wake();}return obj;}}],[{key:"Register",value:function Register(p_class){this.instance._Register(p_class);}},{key:"GetClass",value:function GetClass(p_id){return this.instance._GetClass(p_id);}},{key:"Rent",value:function Rent(p_class){return this.instance._Rent(p_class);}}]);return POOL;}(Singleton);module.exports["default"]=module.exports=POOL;},{"../helpers/singleton":38,"./disposable-object":43,"@nkmjs/collections":21,"@nkmjs/utils":268}],45:[function(require,module,exports){'use strict';var SIGNAL=function SIGNAL(){_classCallCheck(this,SIGNAL);};_defineProperty(SIGNAL,"RELEASING",Symbol("releasing"));_defineProperty(SIGNAL,"RELEASED",Symbol("released"));_defineProperty(SIGNAL,"UPDATED",Symbol("updated"));_defineProperty(SIGNAL,"RENAMING",Symbol("renaming"));_defineProperty(SIGNAL,"RENAMED",Symbol("renamed"));_defineProperty(SIGNAL,"STATE_CHANGING",Symbol("stateChanging"));_defineProperty(SIGNAL,"STATE_CHANGED",Symbol("stateChanged"));_defineProperty(SIGNAL,"STARTED",Symbol("started"));_defineProperty(SIGNAL,"STOPPED",Symbol("stopped"));_defineProperty(SIGNAL,"PROGRESS",Symbol("progress"));_defineProperty(SIGNAL,"COMPLETE",Symbol("complete"));_defineProperty(SIGNAL,"FAIL",Symbol("fail"));_defineProperty(SIGNAL,"CANCELED",Symbol("canceled"));_defineProperty(SIGNAL,"READY",Symbol("ready"));_defineProperty(SIGNAL,"TICK",Symbol("tick"));_defineProperty(SIGNAL,"ITEM_ADDED",Symbol("itemAdded"));_defineProperty(SIGNAL,"ITEM_REMOVED",Symbol("itemRemoved"));_defineProperty(SIGNAL,"ITEM_UPDATED",Symbol("itemUpdated"));module.exports["default"]=module.exports=SIGNAL;},{}],46:[function(require,module,exports){'use strict';var _require54=require("@nkmjs/utils"),U=_require54.U;var DisposableObjectEx=require("../pool/disposable-object-ex");/**
 * Allows to 'hook' (listen) to signal broadcasted by an object, without having to 
 * subscribe/unsubscribe each time the object changes. 
 * Especially useful to observe data in UI/MVCs.
 */var Observer=/*#__PURE__*/function(_DisposableObjectEx6){_inherits(Observer,_DisposableObjectEx6);var _super19=_createSuper(Observer);function Observer(){_classCallCheck(this,Observer);return _super19.call(this);}// ----> Init
_createClass(Observer,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Observer.prototype),"_Init",this).call(this);this._hooks=new Array(0);this._targets=new Array(0);this._isEnabled=true;}// ----> Availability
},{key:"isEnabled",get:function get(){return this._isEnabled;}},{key:"enabled",set:function set(p_value){if(p_value){this.Enable();}else{this.Disable();}}},{key:"Enable",value:function Enable(){if(this._isEnabled){return false;}this._isEnabled=true;for(var i=0,n=this._targets.length;i<n;i++){this._WatchAll(this._targets[i]);}return true;}},{key:"Disable",value:function Disable(){if(this._isEnabled){return false;}this._isEnabled=false;for(var i=0,n=this._targets.length;i<n;i++){this._UnwatchAll(this._targets[i]);}return true;}/**
     * Register a signal subscription
     * @param {Symbol} p_evt 
     * @param {function} p_fn 
     * @param {*} p_subscriber 
     */},{key:"Hook",value:function Hook(p_evt,p_fn){var p_subscriber=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;this._hooks.push({evt:p_evt,thisArg:p_subscriber,fn:p_fn});if(this._isEnabled){for(var i=0,n=this._targets.length;i<n;i++){this._targets[i].Watch(p_evt,p_fn,p_subscriber);}}}/**
     * Unregister a signal subscription
     * @param {Symbol} p_evt 
     * @param {function} p_fn 
     * @param {*} p_subscriber 
     */},{key:"Unhook",value:function Unhook(p_evt,p_fn){var p_subscriber=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;for(var i=0,n=this._hooks.length;i<n;i++){var hook=this._hooks[i];if(hook.evt===p_evt&&hook.thisArg===p_subscriber&&hook.fn===p_fn){this._hooks.splice(i,1);i--;n--;if(this._isEnabled){for(var _i5=0,_n5=this._targets.length;_i5<_n5;_i5++){this._targets[_i5].Unwatch(p_evt,p_fn,p_subscriber);}}}}}},{key:"targets",get:function get(){return this._targets;}},{key:"targetCount",get:function get(){return this._targets.length;}/**
     * Starts watching for signals of a given target
     * @param {*} p_target 
     * @returns {*} target
     */},{key:"Observe",value:function Observe(p_target){if(!p_target){throw new Error("Target cannot be null.");}if(this._targets.includes(p_target)){return p_target;}this._targets.push(p_target);if(this._isEnabled){this._WatchAll(p_target);}return p_target;}/**
     * Starts watching for signals of a given target, and removes all other targets
     * @param {*} p_target may be null
     * @returns {*} target
     */},{key:"ObserveOnly",value:function ObserveOnly(p_target){if(this._targets.includes(p_target)){return p_target;}this.Flush();if(p_target){this._targets.push(p_target);if(this._isEnabled){this._WatchAll(p_target);}}return p_target;}/**
     * Stop watching for signals of a given target
     * @param {*} p_target 
     * @returns {*} target
     */},{key:"Unobserve",value:function Unobserve(p_target){if(!p_target){throw new Error("Target cannot be null.");}var index=this._targets.indexOf(p_target);if(index===-1){return p_target;}this._targets.splice(index,1);if(this._isEnabled){this._UnwatchAll(p_target);}return p_target;}},{key:"_WatchAll",value:function _WatchAll(p_target){for(var i=0,n=this._hooks.length;i<n;i++){var hook=this._hooks[i];p_target.Watch(hook.evt,hook.fn,hook.thisArg);}}},{key:"_UnwatchAll",value:function _UnwatchAll(p_target){if(p_target.isReleasing){return;}for(var i=0,n=this._hooks.length;i<n;i++){var hook=this._hooks[i];p_target.Unwatch(hook.evt,hook.fn,hook.thisArg);}}/**
     * Stop watching targets and flushes them
     */},{key:"Flush",value:function Flush(){if(this._isEnabled){for(var i=0,n=this._targets.length;i<n;i++){this._UnwatchAll(this._targets[i]);}}this._targets.length=0;}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){this.Flush();this._hooks.length=0;this._isEnabled=true;_get(_getPrototypeOf(Observer.prototype),"_CleanUp",this).call(this);}}]);return Observer;}(DisposableObjectEx);module.exports["default"]=module.exports=Observer;},{"../pool/disposable-object-ex":42,"@nkmjs/utils":268}],47:[function(require,module,exports){'use strict';var _require55=require("@nkmjs/utils"),U=_require55.U;var _require56=require("@nkmjs/collections"),Dictionary=_require56.Dictionary;var DisposableObject=require("../pool/disposable-object");var POOL=require("../pool/pool");var SignalBroadcaster=require("./signal-broadcaster");/**
 * A boilerplate object to manage signals.
 * Usually a single object has a single signalBox.
 */var SignalBox=/*#__PURE__*/function(_DisposableObject4){_inherits(SignalBox,_DisposableObject4);var _super20=_createSuper(SignalBox);function SignalBox(){var _this2;_classCallCheck(this,SignalBox);_this2=_super20.call(this);_this2._signals=new Dictionary();_this2._silent=false;return _this2;}_createClass(SignalBox,[{key:"silent",get:function get(){return this._silent;},set:function set(p_value){this._silent=p_value;}},{key:"hasWatchers",get:function get(){return this._signals.count>0;}},{key:"isEmpty",value:function isEmpty(p_signal){var s=this._signals;if(!s.Contains(p_signal)){return true;}else{return s.Get(p_signal).isEmpty;}}/**
     * Broadcast a signal with arguments
     * @param {Symbol} p_signalId 
     * @param {*} args
     */},{key:"Broadcast",value:function Broadcast(p_signalId){if(this._silent||this._signals.isEmpty){return;}var signal=this._signals.Get(p_signalId);if(U.isVoid(signal)){return;}for(var _len12=arguments.length,args=new Array(_len12>1?_len12-1:0),_key14=1;_key14<_len12;_key14++){args[_key14-1]=arguments[_key14];}signal.Broadcast.apply(signal,args);}/**
     * Register a signal subscription
     * @param {Symbol} p_signalId 
     * @param {function} p_fn 
     * @param {*} p_listener 
     */},{key:"Add",value:function Add(p_signalId,p_fn){var p_listener=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var signal=this._signals.Get(p_signalId);if(U.isVoid(signal)){signal=POOL.Rent(SignalBroadcaster);this._signals.Set(p_signalId,signal);}signal.Add(p_fn,p_listener);}/**
     * Register a signal subscription that will be removed after it fires once.
     * @param {Symbol} p_signalId 
     * @param {function} p_fn 
     * @param {*} p_listener 
     */},{key:"AddOnce",value:function AddOnce(p_signalId,p_fn){var p_listener=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var signal=this._signals.Get(p_signalId);if(U.isVoid(signal)){signal=POOL.Rent(SignalBroadcaster);this._signals.Set(p_signalId,signal);}signal.AddOnce(p_fn,p_listener);}/**
     * Unregister a signal subscription
     * @param {Symbol} p_signalId 
     * @param {function} p_fn 
     * @param {*} p_listener 
     */},{key:"Remove",value:function Remove(p_signalId,p_fn){var p_listener=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var signal=this._signals.Get(p_signalId);if(U.isVoid(signal)){return;}signal.Remove(p_fn,p_listener);if(signal.isEmpty){this._signals.Remove(p_signalId);signal.Release();}}/**
     * Unregister all subscription to a given signal
     * @param {Symbol} p_signalId 
     */},{key:"RemoveAll",value:function RemoveAll(p_signalId){var signal=this._signals.Get(p_signalId);if(U.isVoid(signal)){return;}this._signals.Remove(p_signalId);signal.Release();}/**
     * Clears all signals & subscriptions
     */},{key:"Clear",value:function Clear(){var signals=this._signals,keys=signals.keys;for(var i=0,n=keys.length;i<n;i++){signals.Get(keys[i]).Release();}signals.Clear();}}]);return SignalBox;}(DisposableObject);module.exports["default"]=module.exports=SignalBox;},{"../pool/disposable-object":43,"../pool/pool":44,"./signal-broadcaster":48,"@nkmjs/collections":21,"@nkmjs/utils":268}],48:[function(require,module,exports){'use strict';var _require57=require("@nkmjs/utils"),U=_require57.U;var _require58=require("@nkmjs/collections"),DictionaryList=_require58.DictionaryList;var DisposableObject=require("../pool/disposable-object");/**
 * An single signal broadcast manager.
 */var SignalBroadcaster=/*#__PURE__*/function(_DisposableObject5){_inherits(SignalBroadcaster,_DisposableObject5);var _super21=_createSuper(SignalBroadcaster);function SignalBroadcaster(){_classCallCheck(this,SignalBroadcaster);return _super21.call(this);}_createClass(SignalBroadcaster,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(SignalBroadcaster.prototype),"_Init",this).call(this);this._broadcasting=false;this._removeAll=false;this._slots=new DictionaryList();this._onceSlots=new DictionaryList();this._deprecatedKVP=new Array(0);this._queuedBroadcasts=new Array(0);}},{key:"isEmpty",get:function get(){return this._slots.count===0;}},{key:"count",get:function get(){return this._slots.count;}/**
     * Register a subscriber.
     * NOTE : If a 'once' subscription exists with the same signature, it will change to be permanent
     * @param {function} p_fn 
     * @param {*} p_listener 
     */},{key:"Add",value:function Add(p_fn){var p_listener=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;if(!U.isFunc(p_fn)){throw new Error("p_fn is not a function");}if(U.isVoid(p_listener)){p_listener=SignalBroadcaster.BLANK;}this._slots.Set(p_listener,p_fn);this._onceSlots.Remove(p_listener,p_fn);}},{key:"AddOnce",value:function AddOnce(p_fn){var p_listener=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;if(!U.isFunc(p_fn)){throw new Error("p_fn is not a function");}if(U.isVoid(p_listener)){p_listener=SignalBroadcaster.BLANK;}this._slots.Set(p_listener,p_fn);this._onceSlots.Set(p_listener,p_fn);}/**
     * Unregister a subscriber
     * @param {function} p_fn 
     * @param {*} p_listener 
     */},{key:"Remove",value:function Remove(p_fn){var p_listener=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;if(!U.isFunc(p_fn)){throw new Error("p_fn is not a function");}if(U.isVoid(p_listener)){p_listener=SignalBroadcaster.BLANK;}if(this._slots.Contains(p_listener)){if(this._broadcasting){this._deprecatedKVP.push([p_listener,p_fn]);}else{this._slots.Remove(p_listener,p_fn);}}if(this._onceSlots.Contains(p_listener)){if(this._broadcasting){this._deprecatedKVP.push([p_listener,p_fn]);}else{this._onceSlots.Remove(p_listener,p_fn);}}}/**
     * Remove all subscribers
     */},{key:"RemoveAll",value:function RemoveAll(){if(this._broadcasting){this._removeAll=true;return;}this._queuedBroadcasts.length=0;this._slots.Clear();this._onceSlots.Clear();this._deprecatedKVP.length=0;this._removeAll=false;}/**
     * Broadcast arguments to subscribers
     * @param  {...any} args
     */},{key:"Broadcast",value:function Broadcast(){for(var _len13=arguments.length,args=new Array(_len13),_key15=0;_key15<_len13;_key15++){args[_key15]=arguments[_key15];}if(this._broadcasting){//May cause chaos.
this._queuedBroadcasts.push(args);console.warn("Dispatching signal while already dispatching. Queueing.");return;}this._broadcasting=true;this._args=args;if(args===null||args===undefined){this._slots.internalMap.forEach(this.__BroadcastWithoutArgs,this);}else{this._slots.internalMap.forEach(this.__BroadcastWithArgs,this);}this._PostDispatch();}/**
     * @access protected
     */},{key:"_PostDispatch",value:function _PostDispatch(){this._broadcasting=false;this._onceSlots.Clear();if(this._removeAll){this.RemoveAll();}else{for(var i=0,n=this._deprecatedKVP.length;i<n;i++){var kvp=this._deprecatedKVP[i];this._slots.Remove(kvp[0],kvp[1]);}}this._deprecatedKVP.length=0;if(this._queuedBroadcasts.length!=0){this.Broadcast.apply(this,this._queuedBroadcasts.shift());}}/**
     * @access protected
     * @param {array} p_callbacks 
     * @param {*} p_listener 
     * @param {Map} p_map 
     */},{key:"__BroadcastWithoutArgs",value:function __BroadcastWithoutArgs(p_callbacks,p_listener,p_map){var onceList=this._onceSlots.Get(p_listener);if(p_listener===SignalBroadcaster.BLANK){if(onceList){for(var i=0,n=p_callbacks.length;i<n;i++){var fn=p_callbacks[i];fn.apply(null);if(onceList.includes(fn)){this._deprecatedKVP.push([p_listener,fn]);}}}else{for(var _i6=0,_n6=p_callbacks.length;_i6<_n6;_i6++){p_callbacks[_i6].apply(null);}}}else{if(onceList){for(var _i7=0,_n7=p_callbacks.length;_i7<_n7;_i7++){var _fn=p_callbacks[_i7];_fn.apply(p_listener);if(onceList.includes(_fn)){this._deprecatedKVP.push([p_listener,_fn]);}}}else{for(var _i8=0,_n8=p_callbacks.length;_i8<_n8;_i8++){p_callbacks[_i8].apply(p_listener);}}}}/**
     * @access protected
     * @param {array} p_callbacks 
     * @param {*} p_listener 
     * @param {Map} p_map 
     */},{key:"__BroadcastWithArgs",value:function __BroadcastWithArgs(p_callbacks,p_listener,p_map){var onceList=this._onceSlots.Get(p_listener);if(p_listener===SignalBroadcaster.BLANK){if(onceList){for(var i=0,n=p_callbacks.length;i<n;i++){var fn=p_callbacks[i];fn.apply(null,this._args);if(onceList.includes(fn)){this._deprecatedKVP.push([p_listener,fn]);}}}else{for(var _i9=0,_n9=p_callbacks.length;_i9<_n9;_i9++){p_callbacks[_i9].apply(null,this._args);}}}else{if(onceList){for(var _i10=0,_n10=p_callbacks.length;_i10<_n10;_i10++){var _fn2=p_callbacks[_i10];_fn2.apply(p_listener,this._args);if(onceList.includes(_fn2)){this._deprecatedKVP.push([p_listener,_fn2]);}}}else{for(var _i11=0,_n11=p_callbacks.length;_i11<_n11;_i11++){p_callbacks[_i11].apply(p_listener,this._args);}}}}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){this.RemoveAll();_get(_getPrototypeOf(SignalBroadcaster.prototype),"_CleanUp",this).call(this);}}]);return SignalBroadcaster;}(DisposableObject);_defineProperty(SignalBroadcaster,"BLANK",Symbol("none"));module.exports["default"]=module.exports=SignalBroadcaster;},{"../pool/disposable-object":43,"@nkmjs/collections":21,"@nkmjs/utils":268}],49:[function(require,module,exports){'use strict';var _require59=require("@nkmjs/utils"),U=_require59.U;var TIME=require("./time");/**
 * Allows to simply Schedule or Cancel a call on TIME.NEXT_TICK.
 * Useful to debounce function calls that are knowns to happen often withing a single frame 
 * yet only useful/more performant if called once after a batch of updates.)
 */var DelayedCall=/*#__PURE__*/function(){function DelayedCall(){var p_fn=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var p_delay=arguments.length>1&&arguments[1]!==undefined?arguments[1]:-1;_classCallCheck(this,DelayedCall);this.Clear();this._Call=this._Call.bind(this);this.Schedule=this.Schedule.bind(this);this._delay=p_delay;this._elapsed=0;if(p_fn){this._callback=p_fn;}}/**
     * Whether this DelayedCall is scheduled or not
     * @returns {boolean}
     */_createClass(DelayedCall,[{key:"scheduled",get:function get(){return this._scheduled;}/**
     * This delayed' call callback
     * @param {function} p_value
     */},{key:"callback",get:function get(){return this._callback;}/**
     * Schedule this DelayedCall's callback to be called on TIME.NEXT_TICK
     */,set:function set(p_value){var wasScheduled=this._scheduled;this.Cancel();this._callback=p_value;if(wasScheduled){this.Schedule();}}},{key:"Schedule",value:function Schedule(){if(this._scheduled||U.isVoid(this._callback)){return;}this._scheduled=true;TIME.instance.NextTickAdd(this._Call);}/**
     * Cancel the delayed call, if it was scheduled.
     */},{key:"Cancel",value:function Cancel(){if(this._scheduled&&!U.isVoid(this._callback)){TIME.instance.NextTickRemove(this._Call);this._elapsed=0;}}},{key:"_Call",value:function _Call(p_delta){if(this._delay>0){this._elapsed+=p_delta;if(this._elapsed<this._delay){TIME.instance.NextTickAdd(this._Call);return;}}this._scheduled=false;this._elapsed=0;this._callback(p_delta);}},{key:"Clear",value:function Clear(){this.Cancel();this._scheduled=false;this._callback=null;}}]);return DelayedCall;}();module.exports["default"]=module.exports=DelayedCall;},{"./time":50,"@nkmjs/utils":268}],50:[function(require,module,exports){(function(process){(function(){'use strict';var _require60=require("@nkmjs/utils"),U=_require60.U;var SIGNAL=require("../signal");var SingletonEx=require("../helpers/singleton-ex");var CallList=require("../helpers/call-list");/**
 * A ticker singleton that allow for easy manipulation of time & frame.
 * Mostly useful for animation, as well as debouncing.
 */var TIME=/*#__PURE__*/function(_SingletonEx3){_inherits(TIME,_SingletonEx3);var _super22=_createSuper(TIME);function TIME(){_classCallCheck(this,TIME);return _super22.call(this);}_createClass(TIME,[{key:"_Init",value:/**
     * @access protected
     */function _Init(){_get(_getPrototypeOf(TIME.prototype),"_Init",this).call(this);this._lastTick=null;this._deltaTime=0;this._timeScale=1;this._clA=new CallList();this._clB=new CallList();this._nextTick=this._clA;this._nextTickScheduled=false;this._Bind(this._Tick);}/**
     * @access protected
     */},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(TIME.prototype),"_PostInit",this).call(this);if(this._isBrowser){window.requestAnimationFrame(this._Tick);}}/**
     * Current delta time.
     * Up-to-date only in functions called on NEXT_TICK, otherwise represent the last frame' deltaTime.
     */},{key:"deltaTime",get:function get(){return this._deltaTime;}},{key:"timeScale",get:function get(){return this._timeScale;},set:function set(value){this._timeScale=value;}/**
     * Add a callback to next frame's tick (if browser) or process.nextTick (if nodejs).
     * @param {function} p_fn 
     */},{key:"NextTickAdd",value:function NextTickAdd(p_fn){if(!U.isFunc(p_fn)){throw new Error("p_fn is not a function");}this._nextTick.Add(p_fn);this._ScheduleNextTick();}/**
     * Add a callback to next frame's tick (if browser) or process.nextTick (if nodejs).
     * @param {function} p_fn 
     */},{key:"NextTickRemove",value:function NextTickRemove(p_fn){if(!U.isFunc(p_fn)){throw new Error("p_fn is not a function");}this._nextTick.Remove(p_fn);}},{key:"_ScheduleNextTick",value:function _ScheduleNextTick(){if(!this._isBrowser&&!this._nextTickScheduled){// In node only schedule NextTick once, otherwise the process stays open.
this._nextTickScheduled=true;process.nextTick(this._Tick);}}/**
     * @access private
     * @param {*} p_timestamp 
     */},{key:"_Tick",value:function _Tick(p_timestamp){if(this._lastTick===null){this._lastTick=p_timestamp;}this._deltaTime=(p_timestamp-this._lastTick)*this._timeScale;this._lastTick=p_timestamp;// Push callback in an alternate calllist
var currentCl=this._nextTick;this._nextTick=currentCl===this._clA?this._clB:this._clA;currentCl.NotifyFlush(this._deltaTime);this._Broadcast(SIGNAL.TICK,this._deltaTime);if(this._isBrowser){window.requestAnimationFrame(this._Tick);}else{this._nextTickScheduled=false;if(this._nextTick.count>0){this._ScheduleNextTick();}}}}],[{key:"NEXT_TICK",set:function set(p_fn){TIME.instance.NextTickAdd(p_fn);}}]);return TIME;}(SingletonEx);module.exports["default"]=module.exports=TIME;}).call(this);}).call(this,require('_process'));},{"../helpers/call-list":32,"../helpers/singleton-ex":37,"../signal":45,"@nkmjs/utils":268,"_process":274}],51:[function(require,module,exports){'use strict';var _require61=require("@nkmjs/common"),BindingKit=_require61.BindingKit;var _require62=require("./lib/data"),Metadata=_require62.Metadata,DataBlock=_require62.DataBlock;var _require63=require("./lib/serialization"),TEXTSerializer=_require63.TEXTSerializer,JSONSerializer=_require63.JSONSerializer,SERIALIZATION_CONTEXT=_require63.SERIALIZATION_CONTEXT;var _require64=require("./lib/serialization/json"),MetadataJSONSerializer=_require64.MetadataJSONSerializer,DataBlockJSONSerializer=_require64.DataBlockJSONSerializer;var Bindings=/*#__PURE__*/function(_BindingKit){_inherits(Bindings,_BindingKit);var _super23=_createSuper(Bindings);function Bindings(){_classCallCheck(this,Bindings);return _super23.call(this);}_createClass(Bindings,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Bindings.prototype),"_Init",this).call(this);this.AddClasses(Metadata,DataBlock);this.Add({context:SERIALIZATION_CONTEXT.SERIALIZER,kvps:[{key:SERIALIZATION_CONTEXT.JSON,binding:JSONSerializer},{key:SERIALIZATION_CONTEXT.TEXT,binding:TEXTSerializer}]},{context:SERIALIZATION_CONTEXT.JSON,kvps:[{key:Metadata,binding:MetadataJSONSerializer},{key:DataBlock,binding:DataBlockJSONSerializer}]});}}]);return Bindings;}(BindingKit);module.exports["default"]=module.exports=Bindings;},{"./lib/data":65,"./lib/serialization":73,"./lib/serialization/json":75,"@nkmjs/common":27}],52:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={DATA_SIGNAL:require("./lib/data-signal"),Metadata:require("./lib/data/metadata"),MetadataObserver:require("./lib/helpers/observer-metadata"),ID:require("./lib/id/id"),Repertoire:require("./lib/data/repertoire"),DataBlock:require("./lib/data/data-block"),DataFactory:require("./lib/data/data-factory"),// Catalog
CATALOG_SIGNAL:require("./lib/catalog/catalog-signal"),CATALOG_SORTING:require("./lib/catalog/catalog-sorting"),CatalogItem:require("./lib/catalog/catalog-item"),Catalog:require("./lib/catalog/catalog"),CatalogSelection:require("./lib/catalog/catalog-selection"),CatalogSearch:require("./lib/catalog/catalog-search"),CatalogWatcher:require("./lib/catalog/catalog-watcher"),CatalogHandler:require("./lib/catalog/catalog-handler"),DataObserver:require("./lib/helpers/observer-data"),// Serialization
BaseSerializer:require("./lib/serialization/serializer-base"),JSONSerializer:require("./lib/serialization/serializer-json"),TEXTSerializer:require("./lib/serialization/serializer-text"),SERIALIZATION_CONTEXT:require("./lib/serialization/serialization-context"),JSONSerializers:require("./lib/serialization/json")};require("@nkmjs/common").BINDINGS.Expand(require("./bindings"));},{"./bindings":51,"./lib/catalog/catalog":60,"./lib/catalog/catalog-handler":53,"./lib/catalog/catalog-item":54,"./lib/catalog/catalog-search":55,"./lib/catalog/catalog-selection":56,"./lib/catalog/catalog-signal":57,"./lib/catalog/catalog-sorting":58,"./lib/catalog/catalog-watcher":59,"./lib/data-signal":62,"./lib/data/data-block":63,"./lib/data/data-factory":64,"./lib/data/metadata":66,"./lib/data/repertoire":67,"./lib/helpers/observer-data":68,"./lib/helpers/observer-metadata":69,"./lib/id/id":71,"./lib/serialization/json":75,"./lib/serialization/serialization-context":77,"./lib/serialization/serializer-base":78,"./lib/serialization/serializer-json":79,"./lib/serialization/serializer-text":80,"@nkmjs/common":27}],53:[function(require,module,exports){'use strict';var _require65=require("@nkmjs/utils"),U=_require65.U;var _require66=require("@nkmjs/collections"),Dictionary=_require66.Dictionary;var _require67=require("@nkmjs/common"),SIGNAL=_require67.SIGNAL,DisposableObjectEx=_require67.DisposableObjectEx,Observer=_require67.Observer;var CATALOG_SIGNAL=require("./catalog-signal");var CatalogItem=require("./catalog-item");var Catalog=require("./catalog");var CatalogWatcher=require("./catalog-watcher");/**
 * A CatalogHandler is a basic implementation of the CatalogWatcher.
 * It simply dispatches an addition event as well as releases any mapped object on deletion.
 */var CatalogHandler=/*#__PURE__*/function(_CatalogWatcher){_inherits(CatalogHandler,_CatalogWatcher);var _super24=_createSuper(CatalogHandler);function CatalogHandler(){_classCallCheck(this,CatalogHandler);return _super24.call(this);}// ----> Init
_createClass(CatalogHandler,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(CatalogHandler.prototype),"_Init",this).call(this);// TODO : Proper CatalogWatcher integration
}/**
     * 
     * @param {data.core.catalog.Catalog} p_catalog 
     * @param {data.core.catalog.CatalogItem} p_item 
     */},{key:"_OnCatalogItemAdded",value:function _OnCatalogItemAdded(p_catalog,p_item){if(!_get(_getPrototypeOf(CatalogHandler.prototype),"_OnCatalogItemAdded",this).call(this,p_catalog,p_item)){return false;}this._Broadcast(SIGNAL.ITEM_ADDED,this,p_item,null);return true;}/**
     * 
     * @param {data.core.catalog.Catalog} p_catalog 
     * @param {data.core.catalog.CatalogItem} p_item 
     */},{key:"_OnCatalogItemRemoved",value:function _OnCatalogItemRemoved(p_catalog,p_item){var mappedObject=_get(_getPrototypeOf(CatalogHandler.prototype),"_OnCatalogItemRemoved",this).call(this,p_catalog,p_item);if(mappedObject===false){return false;}this._Broadcast(SIGNAL.ITEM_REMOVED,this,p_item,mappedObject);return mappedObject;}}]);return CatalogHandler;}(CatalogWatcher);module.exports["default"]=module.exports=CatalogHandler;},{"./catalog":60,"./catalog-item":54,"./catalog-signal":57,"./catalog-watcher":59,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/utils":268}],54:[function(require,module,exports){'use strict';var _require68=require("@nkmjs/utils"),U=_require68.U;var _require69=require("@nkmjs/common"),COM_ID=_require69.COM_ID,SIGNAL=_require69.SIGNAL,OptionObject=_require69.OptionObject;var _require70=require("@nkmjs/common"),DelayedCall=_require70.DelayedCall;var DATA_ID=require("../data-id");var CATALOG_SIGNAL=require("./catalog-signal");/**
 * 
 * Options
 * 
 * @param {object} p_options 
 * @param {DataBlock} p_options.data  
 * @param {string} p_options.path 
 * @param {string} p_options.name 
 * @param {string} p_options.icon
 * @param {actions.Command} p_options.primaryCommand
 * @param {actions.Command} p_options.secondaryCommand
 * @param {actions.Command} p_options.commandList  
 */var CatalogItem=/*#__PURE__*/function(_OptionObject){_inherits(CatalogItem,_OptionObject);var _super25=_createSuper(CatalogItem);function CatalogItem(){_classCallCheck(this,CatalogItem);return _super25.call(this);}// ----> Init
/**
     * @access protected
     */_createClass(CatalogItem,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(CatalogItem.prototype),"_Init",this).call(this);this._parent=null;this._isDir=false;this._rootCatalog=null;this._rootDistance=-1;this._autoRelease=true;this._delayedUpdate=new DelayedCall(this._Bind(this._OnUpdate));this._optionHandler.wrapUpFn=this._Bind(this._OnOptionsUpdated);this._optionHandler.Hook(COM_ID.DATA);this._optionHandler.Hook(DATA_ID.BOUND);}},{key:"isDir",get:function get(){return this._isDir;}},{key:"rootCatalog",get:function get(){return this._rootCatalog;},set:function set(p_value){this._rootCatalog=p_value;}},{key:"rootDistance",get:function get(){return this._rootDistance;},set:function set(p_value){this._rootDistance=p_value;}/**
     * True : the item will be released as it is removed from its parent
     * without having been attached to another catalog
     */},{key:"autoRelease",get:function get(){return this._autoRelease;},set:function set(p_value){this._autoRelease=p_value;}},{key:"parent",get:function get(){return this._parent;}/**
     * @access protected
     * @param {object} p_options 
     */,set:function set(p_value){if(this._parent===p_value){return;}var oldValue=this._parent;this._parent=p_value;if(oldValue){oldValue.Remove(this);}if(p_value){p_value.Add(this);}}},{key:"_OnOptionsUpdated",value:function _OnOptionsUpdated(p_options){this._delayedUpdate.Schedule();}},{key:"name",get:function get(){return this._options[COM_ID.NAME];},set:function set(p_value){this.SetOption(COM_ID.NAME,p_value);}},{key:"path",get:function get(){return this._options[COM_ID.PATH];},set:function set(p_value){this.SetOption(COM_ID.PATH,p_value);}},{key:"dataBound",get:function get(){return this._options[DATA_ID.BOUND];},set:function set(p_value){this.SetOption(DATA_ID.BOUND,p_value);}},{key:"data",get:function get(){return this._options[COM_ID.DATA];},set:function set(p_value){var p_oldValue=this._options[COM_ID.DATA];this._options[COM_ID.DATA]=p_value;this._OnDataChanged(p_value,p_oldValue);}},{key:"primaryCommand",get:function get(){return this._options[COM_ID.CMD_PRIMARY];},set:function set(p_value){this.SetOption(COM_ID.CMD_PRIMARY,p_value);}},{key:"secondaryCommand",get:function get(){return this._options[COM_ID.CMD_SECONDARY];},set:function set(p_value){this.SetOption(COM_ID.CMD_SECONDARY,p_value);}},{key:"commandList",get:function get(){return this._options[COM_ID.CMD_LIST];},set:function set(p_value){this.SetOption(COM_ID.CMD_LIST,p_value);}/**
     * @access protected
     * @param {*} p_oldData 
     */},{key:"_OnDataChanged",value:function _OnDataChanged(p_newData,p_oldData){if(p_oldData&&"Unwatch"in p_oldData){p_oldData.Unwatch(SIGNAL.RELEASED,this._OnDataReleased,this);}if(p_newData&&"Watch"in p_newData){p_newData.Watch(SIGNAL.RELEASED,this._OnDataReleased,this);}this._Broadcast(CATALOG_SIGNAL.ITEM_DATA_CHANGED,this,p_newData,p_oldData);this._delayedUpdate.Schedule();}/**
     * @access protected
     * @param {*} p_data 
     */},{key:"_OnDataReleased",value:function _OnDataReleased(p_data){this._Broadcast(CATALOG_SIGNAL.ITEM_DATA_RELEASED,this,p_data);if(this._options[DATA_ID.BOUND]){this.Release();}}// ----> Commands
},{key:"AddCommand",value:function AddCommand(p_cmd){var cmdList=this.GetOrSetOption(COM_ID.CMD_LIST,[],false);if(cmdList.includes(p_cmd)){return;}cmdList.push(p_cmd);this._delayedUpdate.Schedule();}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){if(this._parent){this._parent.Remove(this);}this._autoRelease=true;this._parent=null;this._rootCatalog=null;this._rootDistance=-1;this.data=null;_get(_getPrototypeOf(CatalogItem.prototype),"_CleanUp",this).call(this);}/**
     * @access protected
     */},{key:"_OnUpdate",value:function _OnUpdate(){this._Broadcast(SIGNAL.UPDATED,this);}},{key:"toString",value:function toString(){return"".concat(this._options[COM_ID.NAME]," (").concat(this.constructor.name,")");}}]);return CatalogItem;}(OptionObject);module.exports["default"]=module.exports=CatalogItem;},{"../data-id":61,"./catalog-signal":57,"@nkmjs/common":27,"@nkmjs/utils":268}],55:[function(require,module,exports){'use strict';var _require71=require("@nkmjs/utils"),U=_require71.U;var _require72=require("@nkmjs/common"),SIGNAL=_require72.SIGNAL,POOL=_require72.POOL,DisposableObjectEx=_require72.DisposableObjectEx;//A Catalog selection is a catalog which item belong to other catalogs.
//as such it does not own items internally, nor releases them
var CatalogSearch=/*#__PURE__*/function(_DisposableObjectEx7){_inherits(CatalogSearch,_DisposableObjectEx7);var _super26=_createSuper(CatalogSearch);function CatalogSearch(){_classCallCheck(this,CatalogSearch);return _super26.call(this);}/**
     * @access protected
     */_createClass(CatalogSearch,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(CatalogSearch.prototype),"_Init",this).call(this);this._searchResult=new CatalogSearch();this._sourceCatalog=null;}}]);return CatalogSearch;}(DisposableObjectEx);module.exports["default"]=module.exports=CatalogSearch;},{"@nkmjs/common":27,"@nkmjs/utils":268}],56:[function(require,module,exports){'use strict';var _require73=require("@nkmjs/utils"),U=_require73.U;var _require74=require("@nkmjs/common"),SIGNAL=_require74.SIGNAL;var Catalog=require("./catalog");//A Catalog selection is a catalog which item belong to other catalogs.
//as such it does not own items internally, nor releases them
var CatalogSelection=/*#__PURE__*/function(_Catalog){_inherits(CatalogSelection,_Catalog);var _super27=_createSuper(CatalogSelection);function CatalogSelection(){_classCallCheck(this,CatalogSelection);return _super27.call(this);}_createClass(CatalogSelection,[{key:"GetOrCreateCatalog",value:function GetOrCreateCatalog(p_options){throw new Error("CatalogSelection does not support item creation.");}},{key:"Register",value:function Register(p_itemInfos){throw new Error("CatalogSelection does not support item creation.");}/**
     * @access protected
     * @param {*} p_item 
     */},{key:"_OnItemAdded",value:function _OnItemAdded(p_item){//p_item.parent = this;
this._Broadcast(SIGNAL.ITEM_ADDED,this,p_item);p_item.Watch(SIGNAL.RELEASED,this._OnItemReleased,this);if(this._autoSort){this._delayedSort.Schedule();}}/**
     * @access protected
     * @param {*} p_item 
     */},{key:"_OnItemRemoved",value:function _OnItemRemoved(p_item){this._Broadcast(SIGNAL.ITEM_REMOVED,this,p_item);p_item.Unwatch(SIGNAL.RELEASED,this._OnItemReleased,this);//if(p_item.parent === this){
//    p_item.parent = null;
//    if(p_item._autoRelease){
//        p_item.Release();
//    }
//}       
}/**
     * Clears the catalog and releases all items
     */},{key:"Clear",value:function Clear(){var list=this._items,n=list.length;//for(let i = 0, n = list.length; i < n; i++ ){
//    list[list.length-1].Release();
//}
while(n!=0){this.Remove(list[n-1]);n=list.length;}list.length=0;this._delayedSort.Cancel();}}]);return CatalogSelection;}(Catalog);module.exports["default"]=module.exports=CatalogSelection;},{"./catalog":60,"@nkmjs/common":27,"@nkmjs/utils":268}],57:[function(require,module,exports){'use strict';var CATALOG_SIGNAL=function CATALOG_SIGNAL(){_classCallCheck(this,CATALOG_SIGNAL);};_defineProperty(CATALOG_SIGNAL,"ROOT_ITEM_ADDED",Symbol("rootItemAdded"));_defineProperty(CATALOG_SIGNAL,"ROOT_ITEM_REMOVED",Symbol("rootItemRemoved"));_defineProperty(CATALOG_SIGNAL,"ITEM_DATA_CHANGED",Symbol("dataItemAdded"));_defineProperty(CATALOG_SIGNAL,"ITEM_DATA_RELEASED",Symbol("dataItemRemoved"));_defineProperty(CATALOG_SIGNAL,"ITEM_DATA_UPDATED",Symbol("dataItemUpdated"));_defineProperty(CATALOG_SIGNAL,"SORTED",Symbol("sorted"));module.exports["default"]=module.exports=CATALOG_SIGNAL;},{}],58:[function(require,module,exports){'use strict';var _optionID="";var _compareMethod=null;/*

compareFunction(a,b) < 0
Then a comes before b in the answer.

compareFunction(a,b) > 0
Then b comes before a in the answer.

compareFunction(a,b) = 0
Then the order of a and b remains unchanged.

*/var CATALOG_SORTING=/*#__PURE__*/function(){function CATALOG_SORTING(){_classCallCheck(this,CATALOG_SORTING);}_createClass(CATALOG_SORTING,null,[{key:"NAME_ASC",value:function NAME_ASC(p_a,p_b){var a=p_a._isDir,b=p_b._isDir;if(a&&b||!a&&!b){return p_a.name.localeCompare(p_b.name);}else if(!a){return 1;}else{return-1;}}},{key:"NAME_DSC",value:function NAME_DSC(p_a,p_b){var a=p_a._isDir,b=p_b._isDir;if(a&&b||!a&&!b){return p_a.name.localeCompare(p_b.name)*-1;}else if(!a){return 1;}else{return-1;}}// 0, 1, 2
},{key:"NUMERIC_ASC",value:function NUMERIC_ASC(p_a,p_b){return p_a-p_b;}// 2, 1, 0
},{key:"NUMERIC_DSC",value:function NUMERIC_DSC(p_a,p_b){return p_b-p_a;}// a, b, c
},{key:"STRING_ASC",value:function STRING_ASC(p_a,p_b){return p_a.localeCompare(p_b);}// c, b, a
},{key:"STRING_DSC",value:function STRING_DSC(p_a,p_b){return p_a.localeCompare(p_b)*-1;}},{key:"OPTION",value:function OPTION(p_a,p_b){var a=p_a._isDir,b=p_b._isDir;if(a&&b||!a&&!b){return _compareMethod(p_a.GetOption(_optionID),p_b.GetOption(_optionID));}else if(!a){return 1;}else{return-1;}}},{key:"SortByOption",value:function SortByOption(p_catalog,p_optionId,p_method){_optionID=p_optionId;_compareMethod=p_method;p_catalog._items.sort(CATALOG_SORTING.OPTION);}}]);return CATALOG_SORTING;}();module.exports["default"]=module.exports=CATALOG_SORTING;},{}],59:[function(require,module,exports){'use strict';var _require75=require("@nkmjs/utils"),U=_require75.U;var _require76=require("@nkmjs/collections"),Dictionary=_require76.Dictionary;var _require77=require("@nkmjs/common"),BINDINGS=_require77.BINDINGS,SIGNAL=_require77.SIGNAL,Observer=_require77.Observer,DisposableObjectEx=_require77.DisposableObjectEx;var CATALOG_SIGNAL=require("./catalog-signal");var Catalog=require("../catalog/catalog");var CatalogItem=require("./catalog-item");/**
 * A CatalogWatcher observe a catalog's additions and removals.
 * It's an abstract class, look for actual implementations in CatalogHandler & CatalogBuilder
 */var CatalogWatcher=/*#__PURE__*/function(_DisposableObjectEx8){_inherits(CatalogWatcher,_DisposableObjectEx8);var _super28=_createSuper(CatalogWatcher);function CatalogWatcher(){_classCallCheck(this,CatalogWatcher);return _super28.call(this);}_createClass(CatalogWatcher,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(CatalogWatcher.prototype),"_Init",this).call(this);this._owner=null;this._catalog=null;this._map=new Map();this._filters=null;this._itemCount=0;this._isEnabled=true;this._isDeepWatchEnabled=false;this._catalogObserver=new Observer();this._catalogObserver.Hook(SIGNAL.ITEM_ADDED,this._OnCatalogItemAdded,this);this._catalogObserver.Hook(SIGNAL.ITEM_REMOVED,this._OnCatalogItemRemoved,this);this._catalogObserver.Hook(CATALOG_SIGNAL.SORTED,this._OnCatalogSorted,this);// TODO : Filter integration + 'in-depth' recursive calls on ItemAdded if the watcher is 
//both filtered AND flagged as 'flatten catalog'
}/**
     * @type {number}
     */},{key:"count",get:function get(){return this._map.size;}/**
     * @type {*}
     */},{key:"owner",get:function get(){return this._owner;},set:function set(p_value){this._owner=p_value;}/**
     * @type {data.core.catalog.Catalog}
     */},{key:"catalog",get:function get(){return this._catalog;},set:function set(p_value){if(this._catalog===p_value){return;}var oldValue=this._catalog;this._catalog=p_value;if(oldValue){this._catalogObserver.Unobserve(oldValue);}if(p_value){this._catalogObserver.Observe(p_value);}this._OnCatalogChanged(oldValue);}// ----> Availability
},{key:"isEnabled",get:function get(){return this._isEnabled;}},{key:"enabled",set:function set(p_value){if(p_value){this.Enable();}else{this.Disable();}}/**
     * Enable this watcher. If a catalog is set, it will be processed
     * and addition signals will be broadcasted.
     */},{key:"Enable",value:function Enable(){if(this._isEnabled){return false;}this._isEnabled=true;this._catalogObserver.Enable();if(this._catalog){this._AddCatalogContent(this._catalog,this._isDeepWatchEnabled);}return true;}/**
     * Disable this watcher. If a catalog is set, it will be processed
     * and removal signals will be broadcasted.
     */},{key:"Disable",value:function Disable(){if(!this._isEnabled){return false;}this._isEnabled=false;this._catalogObserver.Disable();if(this._catalog){this._RemoveCatalogContent(this._catalog,this._isDeepWatchEnabled);}return true;}// ----> Flattening
},{key:"isDeepWatchEnabled",get:function get(){return this._isDeepWatchEnabled;}},{key:"deepWatch",set:function set(p_value){if(this._isDeepWatchEnabled===p_value){return;}this._isDeepWatchEnabled=p_value;if(this._isDeepWatchEnabled){// Unkook regular signals
this._catalogObserver.Unhook(SIGNAL.ITEM_ADDED,this._OnCatalogItemAdded,this);this._catalogObserver.Unhook(SIGNAL.ITEM_REMOVED,this._OnCatalogItemRemoved,this);this._catalogObserver.Unhook(CATALOG_SIGNAL.SORTED,this._OnCatalogSorted,this);// Hook root signals
this._catalogObserver.Hook(CATALOG_SIGNAL.ROOT_ITEM_ADDED,this._OnCatalogItemAdded,this);this._catalogObserver.Hook(CATALOG_SIGNAL.ROOT_ITEM_REMOVED,this._OnCatalogItemRemoved,this);if(this._isEnabled&&this._catalog){this._RemoveCatalogContent(this._catalog);this._AddCatalogContent(this._catalog,true);}}else{// Unkook root signals
this._catalogObserver.Unhook(CATALOG_SIGNAL.ROOT_ITEM_ADDED,this._OnCatalogItemAdded,this);this._catalogObserver.Unhook(CATALOG_SIGNAL.ROOT_ITEM_REMOVED,this._OnCatalogItemRemoved,this);// Hook regular signals
this._catalogObserver.Hook(SIGNAL.ITEM_ADDED,this._OnCatalogItemAdded,this);this._catalogObserver.Hook(SIGNAL.ITEM_REMOVED,this._OnCatalogItemRemoved,this);this._catalogObserver.Hook(CATALOG_SIGNAL.SORTED,this._OnCatalogSorted,this);if(this._isEnabled&&this._catalog){this._RemoveCatalogContent(this._catalog,true);this._AddCatalogContent(this._catalog);}}}// ---->
/**
     * Goes over the content of a given catalog and calls _OnCatalogItemAdded
     * for each encountered item. 
     * This function is useful when the watcher is enabled with a set catalog to go through.
     * @param {data.core.catalog.Catalog} p_catalog 
     * @param {boolean} p_deep
     */},{key:"_AddCatalogContent",value:function _AddCatalogContent(p_catalog){var p_deep=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var list=p_catalog._items;if(p_deep){for(var i=0,n=list.length;i<n;i++){var item=list[i];if(item.isDir){this._AddCatalogContent(item,p_deep);}else{this._OnCatalogItemAdded(p_catalog,item);}}}else{for(var _i12=0,_n12=list.length;_i12<_n12;_i12++){var _item=list[_i12];this._OnCatalogItemAdded(p_catalog,_item);}}}/**
     * Goes over the content of a given catalog and calls _OnCatalogItemRemoved
     * for each encountered item. 
     * This function is useful when the watcher is disabled with a set catalog to go through.
     * @param {data.core.catalog.Catalog} p_catalog 
     * @param {boolean} p_deep 
     */},{key:"_RemoveCatalogContent",value:function _RemoveCatalogContent(p_catalog){var p_deep=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var list=p_catalog._items;if(p_deep){for(var i=0,n=list.length;i<n;i++){var item=list[i];if(item.isDir){this._RemoveCatalogContent(item,p_deep);}else{this._OnCatalogItemRemoved(p_catalog,item);}}}else{for(var _i13=0,_n13=list.length;_i13<_n13;_i13++){var _item2=list[_i13];this._OnCatalogItemRemoved(p_catalog,_item2);}}}/**
     * 
     * @param {data.core.catalog.Catalog} p_oldValue previously assigned catalog, if any
     */},{key:"_OnCatalogChanged",value:function _OnCatalogChanged(p_oldValue){if(!this._isEnabled){return false;}if(p_oldValue){this._RemoveCatalogContent(p_oldValue,this._isDeepWatchEnabled);}if(this._catalog){this._AddCatalogContent(this._catalog,this._isDeepWatchEnabled);}return true;}/**
     * 
     * @param {data.core.catalog.Catalog} p_catalog 
     * @param {data.core.catalog.CatalogItem} p_item 
     */},{key:"_OnCatalogItemAdded",value:function _OnCatalogItemAdded(p_catalog,p_item){if(this._isDeepWatchEnabled){if(p_item.isDir||p_item.rootDistance<=this._catalog.rootDistance){return false;}}this._itemCount++;if(this._filters&&!this._filters.Check(p_item)){return false;}p_item.Watch(CATALOG_SIGNAL.ITEM_DATA_RELEASED,this._OnItemDataReleased,this);return true;}/**
     * 
     * @param {data.core.catalog.Catalog} p_catalog 
     * @param {data.core.catalog.CatalogItem} p_item 
     */},{key:"_OnCatalogItemRemoved",value:function _OnCatalogItemRemoved(p_catalog,p_item){if(this._isDeepWatchEnabled){if(p_item.isDir||p_item.rootDistance<=this._catalog.rootDistance){return false;}}this._itemCount--;if(!p_item.isReleasing){p_item.Unwatch(CATALOG_SIGNAL.ITEM_DATA_RELEASED,this._OnItemDataReleased,this);}var mappedObject=this._map.get(p_item);if(mappedObject){this._map["delete"](p_item);}return mappedObject;}/**
     * 
     * @param {data.core.catalog.CatalogItem} p_item 
     * @param {*} p_data 
     */},{key:"_OnItemDataReleased",value:function _OnItemDataReleased(p_item,p_data){}/**
     * 
     * @param {data.core.catalog.Catalog} p_catalog 
     */},{key:"_OnCatalogSorted",value:function _OnCatalogSorted(p_catalog){this._Broadcast(CATALOG_SIGNAL.SORTED,this);}// ----> Map
/**
     * 
     * @param {data.core.catalog.CatalogItem} p_item 
     * @param {*} p_mappedValue 
     * @returns {*} mappedValue
     */},{key:"Set",value:function Set(p_item,p_mappedValue){this._map.set(p_item,p_mappedValue);return p_mappedValue;}/**
     * 
     * @param {data.core.catalog.CatalogItem} p_item 
     * @returns {*} value mapped to provided item, if any
     */},{key:"Get",value:function Get(p_item){return this._map.get(p_item);}/**
     * 
     * @param {number} p_index 
     * @returns {*}
     */},{key:"GetAt",value:function GetAt(p_index){return this._map.get(this._catalog._items[p_index]);}/**
     * 
     * @param {*} p_value 
     * @returns {array}
     */},{key:"GetValueKeys",value:function GetValueKeys(p_value){var keys=this._map.keys,results=null;for(var i=0,n=keys.length;i<n;i++){var key=keys[i],value=this._map.Get(key);if(value===p_value){if(!results){results=new Array(1);}results.push(key);}}return results;}// ---->
},{key:"_CleanUp",value:function _CleanUp(){this.flattened=false;this.catalog=null;this._owner=null;this._isEnabled=true;this._itemCount=0;_get(_getPrototypeOf(CatalogWatcher.prototype),"_CleanUp",this).call(this);}}]);return CatalogWatcher;}(DisposableObjectEx);module.exports["default"]=module.exports=CatalogWatcher;},{"../catalog/catalog":60,"./catalog-item":54,"./catalog-signal":57,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/utils":268}],60:[function(require,module,exports){'use strict';var _require78=require("@nkmjs/utils"),U=_require78.U;var _require79=require("@nkmjs/common"),BINDINGS=_require79.BINDINGS,SIGNAL=_require79.SIGNAL,POOL=_require79.POOL,COM_ID=_require79.COM_ID;var _require80=require("@nkmjs/common"),DelayedCall=_require80.DelayedCall;var CATALOG_SIGNAL=require("./catalog-signal");var CATALOG_SORTING=require("./catalog-sorting");var CatalogItem=require("./catalog-item");var Catalog=/*#__PURE__*/function(_CatalogItem){_inherits(Catalog,_CatalogItem);var _super29=_createSuper(Catalog);function Catalog(){var _this3;var p_autoSort=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;_classCallCheck(this,Catalog);_this3=_super29.call(this);_this3.autoSort=p_autoSort;return _this3;}_createClass(Catalog,[{key:"_Init",value:/**
     * @access protected
     */function _Init(){_get(_getPrototypeOf(Catalog.prototype),"_Init",this).call(this);this._optionHandler.beginFn=this._Bind(this._OnOptionsWillUpdate);this._optionHandler.Hook("autoSort","autoSort");this._isDir=true;this._expanded=false;this._items=new Array(0);this._rootCatalog=this;this._sortPending=false;this._autoSort=true;this._defaultSortFunc=null;this._delayedSort=new DelayedCall(this._Bind(this.Sort));}},{key:"expanded",get:function get(){return this._expanded;},set:function set(p_value){this._expanded=p_value;}},{key:"count",get:function get(){return this._items.length;}},{key:"rootCatalog",set:function set(p_value){if(this._rootCatalog===p_value){return;}this._rootCatalog=p_value;var distancePlusOne=this._rootDistance+1;for(var i=0,n=this._items.length;i<n;i++){var item=this._items[i];item.rootCatalog=this._rootCatalog;item.rootDistance=distancePlusOne;}}/**
     * @access protected
     * @param {object} p_options 
     */},{key:"_OnOptionsWillUpdate",value:function _OnOptionsWillUpdate(p_options){this.autoSort=U.Get(p_options,"autoSort",this._parent?this._parent.autoSort:this._autoSort);}/**
     * Returns the item at the specified position in this catalog.
     * @param {number} p_index the item's index.
     * @returns {data.core.catalog.CatalogItem|data.core.catalog.Catalog} The item present at the given index. Otherwise throws an out-of-bound error.
     */},{key:"At",value:function At(p_index){if(this._items.length<=p_index){throw new Error("Argument error : Catalog index outside boundaries.");}return this._items[p_index];}/**
     * Loops through all items in Catalog. Callback should match the signature :
     * (item, index)
     * @param {object} p_fn
     * @param {object} p_this
     * @param {object} p_reverse
     */},{key:"ForEach",value:function ForEach(p_fn){var p_this=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_reverse=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var n=this._items.length;if(p_this){if(p_reverse){for(var i=n-1;i>=0;i--){p_fn.call(p_this,this._items[i],i);}}else{for(var _i14=0;_i14<n;_i14++){p_fn.call(p_this,this._items[_i14],_i14);}}}else{if(p_reverse){for(var _i15=n-1;_i15>=0;_i15--){p_fn.call(null,this._items[_i15],_i15);}}else{for(var _i16=0;_i16<n;_i16++){p_fn.call(null,this._items[_i16],_i16);}}}}/**
     * Gets or create a catalog inside this one using the specified options
     * @param {object} p_options
     * @param {DataBlock} p_options.data  
     * @param {string} p_options.path 
     * @param {string} p_options.name 
     * @param {string} p_options.icon
     * @param {actions.Command} p_options.primaryCommand
     * @param {actions.Command} p_options.secondaryCommand
     * @param {actions.Command} p_options.commandList  
     * @param {boolean} p_options.autoSort 
     * @returns {data.core.catalog.Catalog} Either a new catalog with the provided options, otherwise an existing one that matches them.
     */},{key:"GetOrCreateCatalog",value:function GetOrCreateCatalog(p_options){var _U$Ensure;var catalogName=U.isString(p_options)?p_options:p_options[COM_ID.NAME];var list=this._items,catalog=null;for(var i=0,n=list.length;i<n;i++){catalog=list[i];if(U.isInstanceOf(catalog,Catalog)&&catalog.name===catalogName){return catalog;}}catalog=POOL.Rent(Catalog.GetItemClass(p_options,true));catalog.options=U.Ensure(U.isObject(p_options)?p_options:{},(_U$Ensure={},_defineProperty(_U$Ensure,COM_ID.NAME,catalogName),_defineProperty(_U$Ensure,COM_ID.ICON,"%ICON%/icon_directory.svg"),_U$Ensure));return this.Add(catalog);}/**
     * Create a catalog item given the specified item infos.
     * @param {object} p_itemInfos
     * @param {DataBlock} p_itemInfos.data  
     * @param {string} p_itemInfos.path 
     * @param {string} p_itemInfos.name 
     * @param {string} p_itemInfos.icon
     * @param {actions.Command} p_itemInfos.primaryCommand
     * @param {actions.Command} p_itemInfos.secondaryCommand
     * @param {actions.Command} p_itemInfos.commandList  
     * @param {boolean} p_itemInfos.autoSort  
     * @returns {data.core.catalog.CatalogItem|data.core.catalog.Catalog} A new catalog or item, based on the provided itemInfos
     */},{key:"Register",value:function Register(p_itemInfos){if(!p_itemInfos){throw new Error("Cannot register item with null infos");}var pathInfos=Catalog.PathInfos(p_itemInfos.path);//If no valid path is provided, simply create and return a new CatalogItem
if(!pathInfos.valid||!pathInfos.path){var _U$EnsureMultiple;var item=POOL.Rent(Catalog.GetItemClass(p_itemInfos));item.options=U.EnsureMultiple(p_itemInfos,(_U$EnsureMultiple={},_defineProperty(_U$EnsureMultiple,COM_ID.NAME,pathInfos.name),_defineProperty(_U$EnsureMultiple,COM_ID.icon,"%ICON%/icon_document.svg"),_U$EnsureMultiple));return this.Add(item);}//Given a path we reach for the root to handle registration
if(this._rootCatalog!=this){return this._rootCatalog.Register(p_itemInfos);}//As the root, resolve or create the provided path
var path=pathInfos.path,catalog=null;for(var i=0,n=path.length;i<n;i++){catalog=(i===0?this:catalog).GetOrCreateCatalog(path[i]);}if(pathInfos.isDir){var _U$EnsureMultiple2;catalog.options=U.EnsureMultiple(p_itemInfos,(_U$EnsureMultiple2={},_defineProperty(_U$EnsureMultiple2,COM_ID.NAME,pathInfos.name),_defineProperty(_U$EnsureMultiple2,COM_ID.icon,"%ICON%/icon_directory.svg"),_U$EnsureMultiple2));return catalog;}else{var _U$EnsureMultiple3;var _item3=POOL.Rent(Catalog.GetItemClass(p_itemInfos));_item3.options=U.EnsureMultiple(p_itemInfos,(_U$EnsureMultiple3={},_defineProperty(_U$EnsureMultiple3,COM_ID.NAME,pathInfos.name),_defineProperty(_U$EnsureMultiple3,COM_ID.icon,"%ICON%/icon_document.svg"),_U$EnsureMultiple3));return catalog.Add(_item3);}}/**
     * Add the specified item to this catalog
     * @param {data.core.catalog.CatalogItem|data.core.catalog.Catalog} p_item 
     * @returns {data.core.catalog.CatalogItem|data.core.catalog.Catalog} If it is newly added, returns the item. Otherwise, returns null.
     */},{key:"Add",value:function Add(p_item){if(!U.isInstanceOf(p_item,CatalogItem)){throw new Error("Cannot Add a non-CatalogItem (".concat(p_item,") to Catalog."));}if(this._items.includes(p_item)){return null;}this._items.push(p_item);this._OnItemAdded(p_item);return p_item;}/**
     * @access protected
     * Callback when an item has been added to the catalog
     * @param {data.core.catalog.CatalogItem|data.core.catalog.Catalog} p_item 
     */},{key:"_OnItemAdded",value:function _OnItemAdded(p_item){p_item.parent=this;p_item.rootCatalog=this._rootCatalog;p_item.rootDistance=this._rootDistance+1;p_item.Watch(SIGNAL.RELEASED,this._OnItemReleased,this);if(this._rootCatalog){this._rootCatalog._Broadcast(CATALOG_SIGNAL.ROOT_ITEM_ADDED,this._rootCatalog,p_item);}this._Broadcast(SIGNAL.ITEM_ADDED,this,p_item);if(this._autoSort){this._delayedSort.Schedule();}}/**
     * @access protected
     * Callback when an item has been released
     * @param {data.core.catalog.CatalogItem|data.core.catalog.Catalog} p_item 
     */},{key:"_OnItemReleased",value:function _OnItemReleased(p_item){this.Remove(p_item);}/**
     * Removes the specified item from this catalog
     * @param {data.core.catalog.CatalogItem} p_item 
     */},{key:"Remove",value:function Remove(p_item){if(!U.isInstanceOf(p_item,CatalogItem)){return;}var index=this._items.indexOf(p_item);if(index===-1){return;}this._items.splice(index,1);this._OnItemRemoved(p_item);}/**
     * @access protected
     * Callback when an item is removed from this catalog
     * @param {data.core.catalog.CatalogItem} p_item 
     */},{key:"_OnItemRemoved",value:function _OnItemRemoved(p_item){this._Broadcast(SIGNAL.ITEM_REMOVED,this,p_item);if(this._rootCatalog){this._rootCatalog._Broadcast(CATALOG_SIGNAL.ROOT_ITEM_REMOVED,this._rootCatalog,p_item);}p_item.Unwatch(SIGNAL.RELEASED,this._OnItemReleased,this);if(p_item.parent===this){p_item.parent=null;if(p_item.autoRelease){p_item.Release();}}}/**
     * Resolve the specified path and return the item if it exists.
     * @param {string | Array} p_path
     * @param {number} p_from
     */},{key:"Resolve",value:function Resolve(p_path){//TODO:Resolve path or id, based on whether it`s an array or a string
var p_from=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;}},{key:"FindDataHolders",value:function FindDataHolders(p_data){var p_results=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;if(!p_results){p_results=new Array(0);}for(var i=0,n=this._items.length;i<n;i++){var item=this._items[i];if(item.data===p_data){if(!p_results.includes(item)){p_results.push(item);}}if(U.isInstanceOf(item,Catalog)){item.FindDataHolders(p_data,p_results);}}return p_results;}},{key:"FindFirstDataHolder",value:function FindFirstDataHolder(p_data){for(var i=0,n=this._items.length;i<n;i++){var item=this._items[i];if(item.data===p_data){return item;}if(U.isInstanceOf(item,Catalog)){item=item.FindDataHolders(p_data);if(item){return item;}}}return null;}},{key:"FindFirstDataByStringID",value:function FindFirstDataByStringID(p_stringID){for(var i=0,n=this._items.length;i<n;i++){var item=this._items[i],idata=item.data;if(idata&&idata.id&&idata.id.name===p_stringID){return item;}}return null;}},{key:"FindFirstByOptionValue",value:function FindFirstByOptionValue(p_key,p_value){for(var i=0,n=this._items.length;i<n;i++){var item=this._items[i],opt=item._options[p_key];if(opt&&opt===p_value){return item;}}return null;}// ---->
},{key:"autoSort",get:function get(){return this._autoSort;},set:function set(p_value){if(this._autoSort===p_value){return;}this._autoSort=p_value;if(p_value){this._delayedSort.Schedule();}else{this._delayedSort.Cancel();}}},{key:"defaultSortFunc",get:function get(){return this._defaultSortFunc;},set:function set(p_value){this._defaultSortFunc=p_value;}/**
     * Sort this Catalog based on sorting options. Format :
     * { id:'id to look for and test (optional)', fn:'sorting function' }.
     * Triggers a 'SORTED' signal if the Catalog has been effectively sorted.
     * @param {object} p_options Optional sorting options
     * @param {function} p_options.fn sorting function
     * @param {string} p_options.id option id to check
     */},{key:"Sort",value:function Sort(){var p_options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var sorted=false;if(!p_options){this._items.sort(this._defaultSortFunc?this._defaultSortFunc:CATALOG_SORTING.NAME_ASC);sorted=true;}else{if(p_options.id){CATALOG_SORTING.SortByOption(this,p_options.id,p_options.fn);sorted=true;}else if(p_options.fn){this._items.sort(p_options.fn);sorted=true;}}if(sorted){this._Broadcast(CATALOG_SIGNAL.SORTED,this);}}/**
     * Clears the catalog and releases all items
     */},{key:"Clear",value:function Clear(){var n=this._items.length-1;while(n>0){this._items[n].Release();n--;}this._items.length=0;this._delayedSort.Cancel();}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){this.Clear();this._autoSort=true;this._defaultSortFunc=null;_get(_getPrototypeOf(Catalog.prototype),"_CleanUp",this).call(this);this._rootCatalog=this;this._rootDistance=-1;}},{key:"StructToString",value:function StructToString(){var p_string=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var p_depth=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;if(!p_string){p_string='';}if(U.isVoid(p_depth)){p_depth=-1;}p_depth++;var s="\t",spaces="";for(var i=0;i<p_depth;i++){spaces+=s;}p_string+="".concat(spaces,"/").concat(this._name," \n");for(var _i17=0,n=this._items.length;_i17<n;_i17++){var item=this._items[_i17];if(U.isInstanceOf(item,Catalog)){p_string=item.StructToString(p_string,p_depth);}else{p_string+="".concat(spaces).concat(s,"\xB7 ").concat(item.name,"\n");}}return p_string;}},{key:"toString",value:function toString(){//starts with `!` to ensure this gets sorted first in arrays
return"!".concat(this._name," (").concat(this._items.length,")");}}],[{key:"PathInfos",value:/**
     * Parse a string to a catalog-friendly format
     * @param {string} p_path 
     */function PathInfos(p_path){var result={path:null,isDir:false,name:null,valid:false};if(!p_path){return result;}else{result.valid=true;}var pathSplit=p_path.split("/"),isDir=false,name='';if(pathSplit.length===1){//Assumed to be a single item
name=pathSplit[0];}else{var pathArray=new Array();for(var i=0,n=pathSplit.length;i<n;i++){var current=pathSplit.shift();if(!U.isEmpty(current)){pathArray.push(current);}else if(i===n-1){isDir=true;}}if(isDir){name=pathArray[pathArray.length-1];}else{name=pathArray.pop();}result.path=pathArray;}result.isDir=isDir;result.name=name;return result;}/**
     * Creates a Catalog from a mockup object.
     * @param {object} p_rootOptions
     * @param {DataBlock} p_rootOptions.data  
     * @param {string} p_rootOptions.path 
     * @param {string} p_rootOptions.name 
     * @param {string} p_rootOptions.icon
     * @param {actions.Command} p_rootOptions.primaryCommand
     * @param {actions.Command} p_rootOptions.secondaryCommand
     * @param {actions.Command} p_rootOptions.commandList  
     * @param {boolean} p_rootOptions.autoSort
     * @param {*} p_content 
     * @param {*} p_parent 
     */},{key:"CreateFrom",value:function CreateFrom(p_rootOptions,p_content){var p_parent=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;if(!p_content&&!p_rootOptions){throw new Error("Cannot create Catalog from null options nor struct.");}var catalog=POOL.Rent(this.GetItemClass(p_rootOptions,true));catalog.options=p_rootOptions;if(p_parent){catalog.parent=p_parent;}if(p_content){for(var i=0,n=p_content.length;i<n;i++){var item_options=p_content[i];if(item_options.hasOwnProperty("content")){Catalog.CreateFrom(item_options,item_options.content,catalog);}else{catalog.Register(item_options);}}}return catalog;}/**
     * Find a suitable item class based on provided options
     * @param {*} p_itemOptions 
     * @param {*} p_forceCatalog 
     */},{key:"GetItemClass",value:function GetItemClass(p_itemOptions){var p_forceCatalog=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var itemClass=null;if(U.isObject(p_itemOptions)){var data=U.Get(p_itemOptions,"data",null);if(data){itemClass=BINDINGS.Get(Catalog,data,null);}if(!itemClass){if(p_forceCatalog||U.isArray(U.Get(p_itemOptions,"content",null))){itemClass=this.__default_catalogClass;}else{itemClass=this.__default_itemClass;}}}else{itemClass=p_forceCatalog?this.__default_catalogClass:this.__default_itemClass;}return itemClass;}}]);return Catalog;}(CatalogItem);_defineProperty(Catalog,"__default_catalogClass",Catalog);_defineProperty(Catalog,"__default_itemClass",CatalogItem);module.exports["default"]=module.exports=Catalog;},{"./catalog-item":54,"./catalog-signal":57,"./catalog-sorting":58,"@nkmjs/common":27,"@nkmjs/utils":268}],61:[function(require,module,exports){'use strict';var DATA_ID=function DATA_ID(){_classCallCheck(this,DATA_ID);};_defineProperty(DATA_ID,"AUTO_RELEASE","autoRelease");_defineProperty(DATA_ID,"BOUND","dataBound");module.exports["default"]=module.exports=DATA_ID;},{}],62:[function(require,module,exports){'use strict';var DATA_SIGNAL=function DATA_SIGNAL(){_classCallCheck(this,DATA_SIGNAL);};_defineProperty(DATA_SIGNAL,"ITEM_REGISTERED",Symbol("itemRegistered"));_defineProperty(DATA_SIGNAL,"ITEM_UNREGISTERED",Symbol("itemUnregistered"));_defineProperty(DATA_SIGNAL,"ITEM_UPDATED",Symbol("itemUpdated"));_defineProperty(DATA_SIGNAL,"META_ADDED",Symbol("metaAdded"));_defineProperty(DATA_SIGNAL,"META_REMOVED",Symbol("metaRemoved"));_defineProperty(DATA_SIGNAL,"META_UPDATED",Symbol("metaUpdated"));_defineProperty(DATA_SIGNAL,"META_MID_UPDATE",Symbol("metaMidUpdate"));_defineProperty(DATA_SIGNAL,"DIRTY",Symbol("dirty"));_defineProperty(DATA_SIGNAL,"DIRTY_CLEARED",Symbol("dirty-cleared"));_defineProperty(DATA_SIGNAL,"VALUE_CHANGED",Symbol("valueChanged"));module.exports["default"]=module.exports=DATA_SIGNAL;},{}],63:[function(require,module,exports){'use strict';var _defineProperty2;var _require81=require("@nkmjs/common"),COM_ID=_require81.COM_ID,SIGNAL=_require81.SIGNAL,DisposableObjectEx=_require81.DisposableObjectEx;var DATA_SIGNAL=require("../data-signal");var Metadata=require("./metadata");var ID=require("../id/id");var DataBlock=/*#__PURE__*/function(_DisposableObjectEx9){_inherits(DataBlock,_DisposableObjectEx9);var _super30=_createSuper(DataBlock);function DataBlock(){_classCallCheck(this,DataBlock);return _super30.call(this);}/**
     * @access protected
     */_createClass(DataBlock,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(DataBlock.prototype),"_Init",this).call(this);this._id=null;this._isTemp=false;this._metadirty=false;this._isDirty=false;this._ecosystem=null;this._metadata=new Metadata();this._metadata.owner=this;this._metadata.Watch(DATA_SIGNAL.DIRTY,this.Dirty,this);this._metadata.Watch(DATA_SIGNAL.DIRTY_CLEARED,this._OnMetadataCleaned,this);this._ready=true;}/**
     * @returns {boolean}
     */},{key:"ready",get:function get(){return this._ready;}/**
     * @returns {Metadata} metadata
     */},{key:"metadata",get:function get(){return this._metadata;}},{key:"uri",get:function get(){"".concat(this._id.name);}/**
     * @returns {boolean} True if the DataBlock is dirty, otherwise false
     */},{key:"isDirty",get:function get(){return this._isDirty;}/**
     * 
     */},{key:"Dirty",value:function Dirty(){if(this._isDirty){return;}this._isDirty=true;this._Broadcast(DATA_SIGNAL.DIRTY,this);}/**
     * 
     */},{key:"ClearDirty",value:function ClearDirty(){if(!this._isDirty){return;}this._isDirty=false;this._Broadcast(DATA_SIGNAL.DIRTY_CLEARED,this);}/**
     * @returns {ID} This DataBlock's ID, if any.
     */},{key:"id",get:function get(){return this._id;}/**
     * DataBlock's ID.
     * @param {ID} p_value The ID.
     */,set:function set(p_value){if(this._id===p_value){return;}var oldId=this._id;this._id=p_value;if(oldId){oldId.Unwatch(SIGNAL.RENAMED,this.Dirty,this);}if(p_value){p_value.Watch(SIGNAL.RENAMED,this.Dirty,this);}}/**
     * @returns {string}
     */},{key:"name",get:function get(){return this._id?this._id.name:"";}/**
     * @returns {boolean} True if the DataBlock is meant to be a temporary one, otherwise false.
     */},{key:"isTemp",get:function get(){return this._isTemp;}/**
     * Make this DataBlock dirty and broadcast an 'UPDATED' signal.
     */},{key:"CommitUpdate",value:function CommitUpdate(){this.Dirty();this._Broadcast(SIGNAL.UPDATED,this);}/**
     * Packs the object's data into a writable format. The result of Pack is what
     * is meant to be provided to Unpack().
     * @returns {object} packed DataObject
     */},{key:"Pack",value:function Pack(){return{'!!!warning!!!':"you must re-implement the DataBlock.Pack() method in your data objects !"};}/**
     * Unpack data contained in the provided p_object. p_object should have
     * been created by the Pack() method.
     * @param {object} p_object packaged data
     */},{key:"Unpack",value:function Unpack(p_object){}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){if(this._id){this._id.Release();this._id=null;}this._metadata._dirty=false;this._metadirty=false;this._isDirty=false;this._ready=true;this._isTemp=false;this._metadata.Clear();_get(_getPrototypeOf(DataBlock.prototype),"_CleanUp",this).call(this);}/**
     * @access protected
     */},{key:"_OnMetadataCleaned",value:function _OnMetadataCleaned(){}},{key:"toString",value:function toString(){if(this._id){return"[".concat(this.constructor.name,"::").concat(this._id.name,"]");}else{return"[".concat(this.constructor.name,"::]");}}}]);return DataBlock;}(DisposableObjectEx);_defineProperty(DataBlock,"__NFO__",(_defineProperty2={},_defineProperty(_defineProperty2,COM_ID.ICON,"%ICON%/icon_data_block.svg"),_defineProperty(_defineProperty2,COM_ID.UID,"@nkmjs/data-core:data-block"),_defineProperty2));module.exports["default"]=module.exports=DataBlock;},{"../data-signal":62,"../id/id":71,"./metadata":66,"@nkmjs/common":27}],64:[function(require,module,exports){'use strict';var _require82=require("@nkmjs/utils"),U=_require82.U;var _require83=require("@nkmjs/collections"),List=_require83.List;var _require84=require("@nkmjs/common"),SIGNAL=_require84.SIGNAL,POOL=_require84.POOL,DisposableObjectEx=_require84.DisposableObjectEx;var DATA_SIGNAL=require("../data-signal");var DataBlock=require("./data-block");var Repertoire=require("./repertoire");var DataFactory=/*#__PURE__*/function(_DisposableObjectEx10){_inherits(DataFactory,_DisposableObjectEx10);var _super31=_createSuper(DataFactory);function DataFactory(){_classCallCheck(this,DataFactory);return _super31.call(this);}_createClass(DataFactory,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(DataFactory.prototype),"_Init",this).call(this);this._id=null;this._tempItemList=new List(0);this._itemRep=new Repertoire();this._itemRep.Watch(DATA_SIGNAL.ITEM_REGISTERED,this._OnItemRegistered,this);this._itemRep.Watch(DATA_SIGNAL.ITEM_UNREGISTERED,this._OnItemUnregistered,this);this._itemClass=null;}},{key:"id",get:function get(){return this._id;},set:function set(p_value){_set(_getPrototypeOf(DataFactory.prototype),"_id",p_value,this,true);}},{key:"itemClass",get:function get(){return this._itemClass;},set:function set(p_value){if(!U.isInstanceOf(p_value,DataBlock)){throw new Error("itemClass must inherit DataBlock");}this._itemClass=p_value;}},{key:"itemList",get:function get(){return this._itemRep.itemList;}},{key:"count",get:function get(){return this._itemRep.itemList.length;}/**
     * Return whether an string ID already exists
     * @param {string} p_stringID 
     * @returns {boolean} True if the ID is available, otherwise false.
     */},{key:"IsIDAvailable",value:function IsIDAvailable(p_stringID){return this._itemRep.IsIDAvailable(p_stringID);}/**
     * Create a temp data item to be registered afterward.
     * @param {class} p_class 
     * @returns {*} Newly created item.
     */},{key:"CreateTemp",value:function CreateTemp(){var p_class=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var cl=this._itemClass;if(!U.isVoid(p_class)){if(!U.isInstanceOf(p_class,cl)){throw new Error("CreateTemp custom constructor (".concat(p_class,") does not extends factory constructor (").concat(this._itemClass.name,")"));}else{cl=p_class;}}if(U.isVoid(cl)){throw new Error("Cannot create temp item with no itemClass set.");}var newItem=POOL.Rent(cl);newItem._isTemp=true;this._tempItemList.Add(newItem);newItem.Watch(SIGNAL.RELEASED,this._OnItemReleased,this);return newItem;}/**
     * Register an item previously created through CreateTemp() with a given ID.
     * @param {*} p_item 
     * @param {string|ID} p_id 
     * @returns {*} The newly registered item.
     */},{key:"Register",value:function Register(p_item,p_id){if(!this._tempItemList.Contains(p_item)){throw new Error("Cannot register an item that hasn't been created by this factory.");}else{this._tempItemList.Remove(p_item);p_item._isTemp=false;}this._itemRep.Register(p_item,p_id);return p_item;}/**
     * @access protected
     * @param {*} p_repertoire 
     * @param {*} p_item 
     */},{key:"_OnItemRegistered",value:function _OnItemRegistered(p_repertoire,p_item){this._Broadcast(DATA_SIGNAL.ITEM_REGISTERED,this,p_item);}/**
     * Unregister and release an item created by this library
     * @param {*} p_item 
     */},{key:"Unregister",value:function Unregister(p_item){this._itemRep.Unregister(p_item);p_item.Release();}/**
     * @access protected
     * @param {*} p_repertoire 
     * @param {*} p_item 
     */},{key:"_OnItemUnregistered",value:function _OnItemUnregistered(p_repertoire,p_item){this._Broadcast(DATA_SIGNAL.ITEM_UNREGISTERED,this,p_item);}/**
     * @access protected
     * @param {*} p_item 
     */},{key:"_OnItemReleased",value:function _OnItemReleased(p_item){this._tempItemList.Remove(p_item);}/**
     * Return the item associated with the given ID.
     * Returns null if no ID or item is found.
     * @param {string | ID} p_id 
     */},{key:"Get",value:function Get(p_id){return this._itemRep.Get(p_id);}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){throw new Error("CleanUp Not implemented in ".concat(this.constructor.name));this._itemClass=null;_get(_getPrototypeOf(DataFactory.prototype),"_CleanUp",this).call(this);}}]);return DataFactory;}(DisposableObjectEx);module.exports["default"]=module.exports=DataFactory;},{"../data-signal":62,"./data-block":63,"./repertoire":67,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/utils":268}],65:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={Metadata:require("./metadata"),DataBlock:require("./data-block"),Repertoire:require("./repertoire"),DataFactory:require("./data-factory")};},{"./data-block":63,"./data-factory":64,"./metadata":66,"./repertoire":67}],66:[function(require,module,exports){'use strict';var _defineProperty3;var _require85=require("@nkmjs/utils"),U=_require85.U;var _require86=require("@nkmjs/common"),COM_ID=_require86.COM_ID,SIGNAL=_require86.SIGNAL,POOL=_require86.POOL,DisposableObjectEx=_require86.DisposableObjectEx;var DATA_SIGNAL=require("../data-signal");var Metadata=/*#__PURE__*/function(_DisposableObjectEx11){_inherits(Metadata,_DisposableObjectEx11);var _super32=_createSuper(Metadata);function Metadata(){var _this4;_classCallCheck(this,Metadata);_this4=_super32.call(this);_this4._owner=null;_this4._data={};_this4._dirty=false;return _this4;}_createClass(Metadata,[{key:"owner",get:function get(){return this._owner;},set:function set(p_value){this._owner=p_value;}/**
     * @returns {boolean} True if the DataBlock is dirty, otherwise false
     */},{key:"isDirty",get:function get(){return this._isDirty;}/**
     * 
     */},{key:"Dirty",value:function Dirty(){if(this._isDirty){return;}this._isDirty=true;this._Broadcast(DATA_SIGNAL.DIRTY,this);}/**
     * 
     */},{key:"ClearDirty",value:function ClearDirty(){if(!this._isDirty){return;}this._isDirty=false;this._Broadcast(DATA_SIGNAL.DIRTY_CLEARED,this);}},{key:"Set",value:function Set(p_path,p_value){var path=null;if(Array.isArray(p_path)){path=p_path;}else if(typeof p_path==='string'){path=p_path.split('.');}else{throw new Error("Path ".concat(p_path," is invalid."));}var element=this._data,lastElement=element,i=0,n=path.length,countMinusOne=n-1,dispatch=false,created=false,previousValue=null;//TODO : For loop the path to dispatch all level of update afterward
//so if presentation.color.A is updated
//we can still listen to update applied to presentation.color 
//Also, we probably want to stack update and dispatch them on next update to aleviate garbage collection
//update 0 - 1 - 2 - 3
//dispatch 3 - 2 - 1 - 0
while(i<n){var id=path[i];if(i===countMinusOne){var existingValue=lastElement[id];if(U.isVoid(existingValue)){created=true;}if(existingValue===p_value){return p_value;}dispatch=true;previousValue=existingValue;lastElement[id]=p_value;lastElement=p_value;}else{element=lastElement[id];if(U.isVoid(element)){element={};lastElement[id]=element;}lastElement=element;}i++;}if(dispatch){if(created){this._Broadcast(DATA_SIGNAL.META_ADDED,this,p_path,lastElement);}n-=1;for(var p=0;p<n;p++){this._Broadcast(DATA_SIGNAL.META_MID_UPDATE,this,U.Join(path,'.',0,p));}this._Broadcast(DATA_SIGNAL.META_UPDATED,this,p_path,lastElement,previousValue);this._Broadcast(SIGNAL.UPDATED,this);this.Dirty();}return lastElement;}},{key:"Get",value:function Get(p_path){var p_fallback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var path=null;if(Array.isArray(p_path)){path=p_path;}else if(U.isString(p_path)){path=p_path.split('.');}else{throw new Error("Path ".concat(p_path," is invalid."));}var element=null;if(U.isVoid(p_fallback)){element=this._data;while(!U.isVoid(element)&&path.length!=0){element=element[path.shift()];}path.length=0;return element;}else{element=this._data;var lastElement=element;while(path.length!=0){element=lastElement[path.shift()];if(U.isVoid(element)){path.length=0;this._signals.silent=true;element=this.Set(p_path,p_fallback);this._signals.silent=false;// This was causing a lot of signal loops.
return element;}lastElement=element;}return element;}}},{key:"Clear",value:function Clear(){this._data=U.DeepClear(this._data,true);}},{key:"Clone",value:function Clone(){var p_source=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var p_silent=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;if(p_source){if(U.isInstanceOf(p_source,Metadata)){this._data=U.Clone(p_source._data);}else if(U.isObject(p_source)){this._data=U.Clone(p_source);}else{return;}if(!p_silent){this.Dirty();}else{this.ClearDirty();}}else{return Metadata.Copy(this);}}},{key:"toString",value:function toString(){return"{Metadata}";}}],[{key:"Copy",value:function Copy(p_metadata){var newMetadata=POOL.Rent(Metadata);newMetadata._data=U.Clone(p_metadata._data);return newMetadata;}}]);return Metadata;}(DisposableObjectEx);_defineProperty(Metadata,"__NFO__",(_defineProperty3={},_defineProperty(_defineProperty3,COM_ID.ICON,"%ICON%/icon_data_block.svg"),_defineProperty(_defineProperty3,COM_ID.UID,"@nkmjs/data-core:metadata"),_defineProperty3));module.exports["default"]=module.exports=Metadata;},{"../data-signal":62,"@nkmjs/common":27,"@nkmjs/utils":268}],67:[function(require,module,exports){'use strict';var _require87=require("@nkmjs/utils"),U=_require87.U;var _require88=require("@nkmjs/collections"),Dictionary=_require88.Dictionary;var _require89=require("@nkmjs/common"),SIGNAL=_require89.SIGNAL,POOL=_require89.POOL,DisposableObjectEx=_require89.DisposableObjectEx;var _require90=require("../id"),ID=_require90.ID,IDDispenser=_require90.IDDispenser;var DATA_SIGNAL=require("../data-signal");var DataBlock=require("./data-block");var Repertoire=/*#__PURE__*/function(_DisposableObjectEx12){_inherits(Repertoire,_DisposableObjectEx12);var _super33=_createSuper(Repertoire);function Repertoire(){_classCallCheck(this,Repertoire);return _super33.call(this);}_createClass(Repertoire,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Repertoire.prototype),"_Init",this).call(this);this._idDispenser=new IDDispenser();this._itemList=new List(0);this._itemMap=new Dictionary();// <ID, entry>
}},{key:"idDispenser",get:function get(){return this._idDispenser;}},{key:"itemList",get:function get(){return this._itemList;}},{key:"itemMap",get:function get(){return this._itemMap;}},{key:"count",get:function get(){return this._itemList.count;}},{key:"IndexOf",value:function IndexOf(p_item){return this._itemList.IndexOf(p_item);}/**
     * Return whether a given string is available to be used
     * to create a new ID
     * @param {string} p_stringID 
     * @returns {boolean} True if the ID is available, otherwise false.
     */},{key:"IsIDAvailable",value:function IsIDAvailable(p_stringID){return this._idDispenser.IsAvailable(p_stringID);}/**
     * Return whether or not the repertoire contains the given ID
     * @param {string|ID} p_id 
     * @returns {boolean} True if the ID is owned by this repertoire, otherwise false.
     */},{key:"ContainsID",value:function ContainsID(p_id){return this._idDispenser.ContainsID(p_id);}/**
     * Return the ID associated with a given string, if any
     * @param {string} p_stringID 
     * @returns {ID} The ID associated to the p_stringID provided, otherwise null.
     */},{key:"GetID",value:function GetID(p_stringID){return this._idDispenser.Get(p_stringID);}/**
     * Create and return new ID with a given string.
     * @param {string} p_stringID 
     */},{key:"ReserveID",value:function ReserveID(p_stringID){if(!this._idDispenser.IsIDAvailable(p_stringID)){throw new Error("Cannot create an ID that already exists.");}var newID=this._idDispenser.Create(p_stringID);newID.Watch(SIGNAL.RELEASED,this._OnIDReleased,this);newID.Watch(SIGNAL.RENAMED,this._OnIDRenamed,this);return newID;}/**
     * @access protected
     * @param {*} p_id 
     * @param {*} p_oldName 
     */},{key:"_OnIDRenamed",value:function _OnIDRenamed(p_id,p_oldName){this._Broadcast(SIGNAL.RENAMED,p_id,p_oldName);}/**
     * @access protected
     * @param {*} p_id 
     */},{key:"_OnIDReleased",value:function _OnIDReleased(p_id){var item=this._itemMap.Get(p_id);if(item){console.warn("An ID (".concat(p_id.name,") has been released. Removing existing item from repertoire."));this.Unregister(item);}}/**
     * Register an item with a given ID. If no ID is provided, creates and assign
     * a randomly generated one.
     * @param {*} p_item 
     * @param {string|ID} p_id 
     */},{key:"Register",value:function Register(p_item){var p_id=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;if(U.isVoid(p_item)){throw new Error("Cannot register a null item.");}if(!U.isInstanceOf(p_item,DataBlock)){throw new Error("Cannot register a non-DataBlock item.");}if(!U.isVoid(p_item.id)){throw new Error("Cannot register an item with an ID already set.");}if(this._itemList.Contains(p_item)){throw new Error("Cannot re-register an item.");}var itemID=null;if(U.isVoid(p_id)){//No ID provided. Create a random one.
itemID=this.ReserveID(U.unsafeUID);}else{//An ID has been provided.
var _itemID=p_id;if(U.isInstanceOf(p_id,ID)){//ID is an object of type ID.
if(this._idDispenser.GetID(p_id.name)===p_id){//ID appear to be owned by this repertoire.
if(this._itemMap.Contains(p_id)){throw new Error("ID(".concat(p_id,") already in use."));}else{/* ID exists but not in use. */}}else{//ID isn`t owned by this repertoire.
throw new Error("Cannot register an item with an ID(".concat(p_id.name,") that hasn't been provided by this repertoire."));}_itemID=p_id;}else{//ID is a string. (Or should be)
if(!U.isString(p_id)){throw new Error("Cannot register an item with an ID that isn't an ID object nor a string.");}if(U.isEmpty(p_id)){throw new Error("Cannot use empty string as ID. Use null or undefined instead to generate a random one.");}var existingID=this._idDispenser.Get(p_id);if(!U.isVoid(existingID)){//An ID has already been created with this string
if(this._itemMap.Contains(existingID)){throw new Error("ID(".concat(p_id,") already in use."));}_itemID=existingID;}else{_itemID=this.ReserveID(p_id);}}}this._itemList.Add(p_item);this._itemMap.Set(itemID,p_item);p_item.id=itemID;//console.log(`Registered : ${p_item} with id ${p_item.id}`);
this._OnItemRegistered(p_item);this._Broadcast(DATA_SIGNAL.ITEM_REGISTERED,this,p_item);}/**
     * @access protected
     * @param {*} p_item 
     */},{key:"_OnItemRegistered",value:function _OnItemRegistered(p_item){p_item.Watch(SIGNAL.RELEASED,this._OnItemReleased,this);}/**
     * Unregister an item and releases its ID.
     * @param {*} p_item 
     */},{key:"Unregister",value:function Unregister(p_item){if(U.isVoid(p_item)){throw new Error("Cannot unregister a null item.");}var itemID=p_item.id;if(U.isVoid(itemID)){throw new Error("Cannot unregister a item with no ID.");}if(U.isVoid(this._itemList.Remove(p_item))){throw new Error("Cannot unregister an item that is not in the repertoire.");}this._itemMap.Remove(itemID);this._OnItemUnregistered(p_item);this._Broadcast(DATA_SIGNAL.ITEM_UNREGISTERED,this,p_item);//Free ID
p_item.id=null;itemID.Release();}/**
     * @access protected
     * @param {*} p_item 
     */},{key:"_OnItemUnregistered",value:function _OnItemUnregistered(p_item){p_item.Unwatch(SIGNAL.RELEASED,this._OnItemReleased,this);}/**
     * @access protected
     * @param {*} p_item 
     */},{key:"_OnItemReleased",value:function _OnItemReleased(p_item){this.Unregister(p_item);}/**
     * 
     * @param {string|ID} p_id 
     * @returns {*} Item mapped to this ID, if any. Otherwise, null.
     */},{key:"Get",value:function Get(p_id){if(U.isVoid(p_id)){throw new Error("p_id cannot be null or undefined");}if(U.isString(p_id)){var id=this._idDispenser.Get(p_id);if(U.isVoid(id)){return null;}}else if(U.isInstanceOf(p_id,ID)){}else{throw new Error("p_id must be either of type string or ID.");}return this._itemMap.Get(p_id);}},{key:"At",value:function At(p_index){return this._itemList.At(p_index);F;}},{key:"Clear",value:function Clear(){//TODO : Implement clearing the repertoire
}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){this.Clear();_get(_getPrototypeOf(Repertoire.prototype),"_CleanUp",this).call(this);}}]);return Repertoire;}(DisposableObjectEx);module.exports["default"]=module.exports=Repertoire;},{"../data-signal":62,"../id":72,"./data-block":63,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/utils":268}],68:[function(require,module,exports){'use strict';var _require91=require("@nkmjs/utils"),U=_require91.U;var _require92=require("@nkmjs/common"),COM_ID=_require92.COM_ID,Observer=_require92.Observer;var DataBlock=require("../data/data-block");var DataObserver=/*#__PURE__*/function(_Observer){_inherits(DataObserver,_Observer);var _super34=_createSuper(DataObserver);function DataObserver(){_classCallCheck(this,DataObserver);return _super34.call(this);}/**
     * Starts watching for signals of a given target
     * @param {*} p_target 
     * @returns {*} target
     */_createClass(DataObserver,[{key:"Observe",value:function Observe(p_target){return _get(_getPrototypeOf(DataObserver.prototype),"Observe",this).call(this,this._ExtractNestedData(p_target));}/**
     * Starts watching for signals of a given target, and removes all other targets
     * @param {*} p_target may be null
     * @returns {*} target
     */},{key:"ObserveOnly",value:function ObserveOnly(p_target){return _get(_getPrototypeOf(DataObserver.prototype),"ObserveOnly",this).call(this,this._ExtractNestedData(p_target));}/**
     * Stop watching for signals of a given target
     * @param {*} p_target 
     * @returns {*} target
     */},{key:"Unobserve",value:function Unobserve(p_target){return _get(_getPrototypeOf(DataObserver.prototype),"Unobserve",this).call(this,this._ExtractNestedData(p_target));}},{key:"_ExtractNestedData",value:function _ExtractNestedData(p_value){if(p_value&&!U.isInstanceOf(p_value,DataBlock)){if(U.isInstanceOf(p_value[COM_ID.DATA],DataBlock)){p_value=p_value[COM_ID.DATA];}else{p_value=null;}}return p_value;}}]);return DataObserver;}(Observer);module.exports["default"]=module.exports=DataObserver;},{"../data/data-block":63,"@nkmjs/common":27,"@nkmjs/utils":268}],69:[function(require,module,exports){'use strict';var DATA_SIGNAL=require("../data-signal");var _require93=require("@nkmjs/common"),DisposableObjectEx=_require93.DisposableObjectEx,Observer=_require93.Observer;var _add_="ADD";var _rem_="REM";var _upd_="UPD";var _mpd_="IPD";var MetadataObserver=/*#__PURE__*/function(_DisposableObjectEx13){_inherits(MetadataObserver,_DisposableObjectEx13);var _super35=_createSuper(MetadataObserver);function MetadataObserver(){_classCallCheck(this,MetadataObserver);return _super35.call(this);}// ----> Init
/**
     * @access protected
     */_createClass(MetadataObserver,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(MetadataObserver.prototype),"_Init",this).call(this);this._observer=new Observer();this._observer.Hook(DATA_SIGNAL.META_ADDED,this._OnMetaAdded,this);this._observer.Hook(DATA_SIGNAL.META_REMOVED,this._OnMetaRemoved,this);this._observer.Hook(DATA_SIGNAL.META_UPDATED,this._OnMetaUpdated,this);this._observer.Hook(DATA_SIGNAL.META_MID_UPDATE,this._OnMetaMidUpdate,this);}},{key:"target",get:function get(){return this._observer._target;},set:function set(p_value){this._observer.target=p_value;}/**
     * @access protected
     * @param {*} p_evt 
     */},{key:"_GetPrefix",value:function _GetPrefix(p_evt){switch(p_evt){case DATA_SIGNAL.META_ADDED:return _add_;case DATA_SIGNAL.META_REMOVED:return _rem_;case DATA_SIGNAL.META_UPDATED:return _upd_;case DATA_SIGNAL.META_MID_UPDATE:return _mpd_;}throw new Error("Cannot hook to a signal that isn't META_ADDED, META_REMOVED or META_UPDATED");}},{key:"Hook",value:function Hook(p_evt,p_path,p_fn,p_subscriber){var evt="".concat(this._GetPrefix(p_evt),"@").concat(p_path);this.Watch(evt,p_fn,p_subscriber);}},{key:"Unhook",value:function Unhook(p_evt,p_path,p_fn,p_subscriber){var evt="".concat(this._GetPrefix(p_evt),"@").concat(p_path);this.Unwatch(evt,p_fn,p_subscriber);}/**
     * @access protected
     * @param {*} p_meta 
     * @param {*} p_path 
     * @param {*} p_value 
     */},{key:"_OnMetaAdded",value:function _OnMetaAdded(p_meta,p_path,p_value){var evt="".concat(_add_,"@").concat(p_path);this._Broadcast(evt,p_meta,p_path,p_value);}/**
     * @access protected
     * @param {*} p_meta 
     * @param {*} p_path 
     */},{key:"_OnMetaRemoved",value:function _OnMetaRemoved(p_meta,p_path){var evt="".concat(_rem_,"@").concat(p_path);this._Broadcast(evt,p_meta,p_path,p_value,p_oldValue);}/**
     * @access protected
     * @param {*} p_meta 
     * @param {*} p_path 
     * @param {*} p_value 
     * @param {*} p_oldValue 
     */},{key:"_OnMetaUpdated",value:function _OnMetaUpdated(p_meta,p_path,p_value,p_oldValue){var evt="".concat(_upd_,"@").concat(p_path);this._Broadcast(evt,p_meta,p_path,p_value,p_oldValue);}/**
     * @access protected
     * @param {*} p_meta 
     * @param {*} p_path 
     */},{key:"_OnMetaMidUpdate",value:function _OnMetaMidUpdate(p_meta,p_path){var evt="".concat(_mpd_,"@").concat(p_path);this._Broadcast(evt,p_meta,p_path);}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){this.target=null;_get(_getPrototypeOf(MetadataObserver.prototype),"_CleanUp",this).call(this);}}]);return MetadataObserver;}(DisposableObjectEx);module.exports["default"]=module.exports=MetadataObserver;},{"../data-signal":62,"@nkmjs/common":27}],70:[function(require,module,exports){'use strict';var _require94=require("@nkmjs/utils"),U=_require94.U;var _require95=require("@nkmjs/collections"),Dictionary=_require95.Dictionary,List=_require95.List;var _require96=require("@nkmjs/common"),SIGNAL=_require96.SIGNAL,POOL=_require96.POOL,DisposableObjectEx=_require96.DisposableObjectEx;var ID=require("./id");var IDDispenser=/*#__PURE__*/function(_DisposableObjectEx14){_inherits(IDDispenser,_DisposableObjectEx14);var _super36=_createSuper(IDDispenser);function IDDispenser(){_classCallCheck(this,IDDispenser);return _super36.call(this);}/**
     * @access protected
     */_createClass(IDDispenser,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(IDDispenser.prototype),"_Init",this).call(this);this._idMap=new Dictionary();this._idList=new List();// - Repertoire for IDs to avoid duplicate IDs.
// - factory should check for duplicates through repertoire
}},{key:"idList",get:function get(){return this._idList;}/**
     * @description TODO
     * @param {string} p_stringID 
     * @returns {boolean} True if the string ID is available, other false.
     */},{key:"IsAvailable",value:function IsAvailable(p_stringID){return!this._idMap.Contains(p_stringID);}/**
     * Return whether or not the repertoire contains an ID associated with
     * a given string
     * @param {string|ID} p_id 
     * @returns {boolean} True if the Dispenser contains the given ID, otherwise false.
     */},{key:"Contains",value:function Contains(p_id){if(U.isString(p_id)){return this._idMap.Contains(p_id);}else if(U.isInstanceOf(p_id,ID)){return this._idList.Contains(p_id);}throw new Error("p_id must be either string or ID.");}/**
     * Return the ID associated with a given string, if any
     * @param {string} p_string 
     * @returns {ID} The ID, if any. Otherwise, null.
     */},{key:"Get",value:function Get(p_string){return this._idMap.Get(p_string);}/**
     * Create and return new ID with a given string.
     * @param {string} p_string 
     * @returns {ID} The newly created ID
     */},{key:"Create",value:function Create(p_string){if(!this.IsAvailable(p_string)){throw new Error("ID ".concat(p_string," is not available."));}var newID=POOL.Rent(ID);newID.name=p_string;this._idMap.Set(p_string,newID);this._idList.Add(newID);newID.Watch(SIGNAL.RENAMING,this._OnIDRenaming,this);newID.Watch(SIGNAL.RENAMED,this._OnIDRenamed,this);newID.Watch(SIGNAL.RELEASED,this._OnIDReleased,this);return newID;}/**
     * Removes & release a given ID.
     * @param {ID} p_id 
     * @returns {boolean} True if the ID existed and has been released, otherwise false.
     */},{key:"Remove",value:function Remove(p_id){if(this._idMap.Remove(p_id.name)){p_id.Release();this._idList.Remove(p_id);return true;}return false;}/**
     * @access protected
     * TODO : DocF
     * @param {*} p_id 
     * @param {*} p_newName 
     */},{key:"_OnIDRenaming",value:function _OnIDRenaming(p_id,p_newName){if(this._idMap.Contains(p_newName)){p_id.PreventRenaming();}}/**
     * @access protected
     * @description TODO
     * @param {*} p_id 
     * @param {*} p_newName 
     * @param {*} p_oldName 
     */},{key:"_OnIDRenamed",value:function _OnIDRenamed(p_id,p_newName,p_oldName){this._idMap.Remove(p_oldName);this._idMap.Set(p_newName,p_id);}/**
     * @access protected
     * @description TODO
     * @param {*} p_id 
     */},{key:"_OnIDReleased",value:function _OnIDReleased(p_id){this.Remove(p_id);}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(IDDispenser.prototype),"_CleanUp",this).call(this);}}]);return IDDispenser;}(DisposableObjectEx);module.exports["default"]=module.exports=IDDispenser;},{"./id":71,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/utils":268}],71:[function(require,module,exports){'use strict';var _require97=require("@nkmjs/common"),SIGNAL=_require97.SIGNAL,POOL=_require97.POOL,DisposableObjectEx=_require97.DisposableObjectEx;var ID=/*#__PURE__*/function(_DisposableObjectEx15){_inherits(ID,_DisposableObjectEx15);var _super37=_createSuper(ID);function ID(){_classCallCheck(this,ID);return _super37.call(this);}// ----> Static methods
_createClass(ID,[{key:"_Init",value:// ----> Init
/**
     * @access protected
     */function _Init(){_get(_getPrototypeOf(ID.prototype),"_Init",this).call(this);this._renamingPrevented=false;this._name="";}/**
     * @description TODO
     */},{key:"PreventRenaming",value:function PreventRenaming(){this._renamingPrevented=true;}},{key:"name",get:function get(){return this._name;}/**
     * @access protected
     */,set:function set(p_value){if(this._name===p_value){return;}this._Broadcast(SIGNAL.RENAMING,this,p_value);if(this._renamingPrevented){this._renamingPrevented=false;return;}var oldName=this._name;this._name=p_value;this._renamingPrevented=false;this._Broadcast(SIGNAL.RENAMED,this,oldName);}},{key:"_CleanUp",value:function _CleanUp(){this._name="";_get(_getPrototypeOf(ID.prototype),"_CleanUp",this).call(this);}},{key:"toString",value:function toString(){return"[ID::".concat(this.name,"]");}}],[{key:"New",value:function New(p_id){var newID=POOL.Rent(ID);newID.name=p_id;return newID;}}]);return ID;}(DisposableObjectEx);module.exports["default"]=module.exports=ID;},{"@nkmjs/common":27}],72:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={ID:require("./id"),IDDispenser:require("./id-dispenser")};},{"./id":71,"./id-dispenser":70}],73:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={BaseSerializer:require("./serializer-base"),JSONSerializer:require("./serializer-json"),TEXTSerializer:require("./serializer-text"),SERIALIZATION_CONTEXT:require("./serialization-context"),COREJSONSerializers:require("./json")};},{"./json":75,"./serialization-context":77,"./serializer-base":78,"./serializer-json":79,"./serializer-text":80}],74:[function(require,module,exports){var _require98=require("@nkmjs/common"),BINDINGS=_require98.BINDINGS;var DataBlock=require("../../data/data-block");var SERIALIZATION_CONTEXT=require("../serialization-context");var BaseSerializer=require("../serializer-base");/**
 * This is a base implementation. It only add & serialize the known "metadata" property.
 * 
 */ /*
   expected input/ouput :

   {
       ...
       "metadata":{*},
       "data":{*},
       ...
   }
   
*/var __metaID="metadata";var __dataID="data";var DataBlockJSONSerializer=/*#__PURE__*/function(_BaseSerializer){_inherits(DataBlockJSONSerializer,_BaseSerializer);var _super38=_createSuper(DataBlockJSONSerializer);function DataBlockJSONSerializer(){_classCallCheck(this,DataBlockJSONSerializer);return _super38.call(this);}/**
     * Return the target as a JSON Object
     * @param {DataBlock} p_data 
     * @param {object} p_options 
     * @returns {object}
     */_createClass(DataBlockJSONSerializer,null,[{key:"Serialize",value:function Serialize(p_data){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var metadata=p_data[__metaID];var serializer=BINDINGS.Get(SERIALIZATION_CONTEXT.JSON,metadata);var serial=p_data.Pack();serial[__metaID]=serializer.Serialize(metadata,p_options);return serial;}/**
     * Return an entry object from the provided serial
     * Or override available info in provided target.
     * @param {object} p_serial  
     * @param {DataBlock} p_data SHOULD Not be null
     * @param {object} p_options 
     * @returns {DataBlock}
     */},{key:"Deserialize",value:function Deserialize(p_serial){var p_data=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;if(!p_serial){throw new Error("Cannot unpack null data.");}if(!p_data){throw new Error("Cannot unpack to null target.");}var metadata=p_data.metadata,serializer=BINDINGS.Get(SERIALIZATION_CONTEXT.JSON,metadata);if(__metaID in p_serial){serializer.Deserialize(p_serial[__metaID],metadata,p_options);}p_data.Unpack(p_serial);return p_data;}}]);return DataBlockJSONSerializer;}(BaseSerializer);module.exports["default"]=module.exports=DataBlockJSONSerializer;},{"../../data/data-block":63,"../serialization-context":77,"../serializer-base":78,"@nkmjs/common":27}],75:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={MetadataJSONSerializer:require("./metadata-json-serializer"),DataBlockJSONSerializer:require("./data-block-json-serializer")};},{"./data-block-json-serializer":74,"./metadata-json-serializer":76}],76:[function(require,module,exports){var _require99=require("@nkmjs/utils"),U=_require99.U;var Metadata=require("../../data/metadata");var BaseSerializer=require("../serializer-base");var MetadataJSONSerializer=/*#__PURE__*/function(_BaseSerializer2){_inherits(MetadataJSONSerializer,_BaseSerializer2);var _super39=_createSuper(MetadataJSONSerializer);function MetadataJSONSerializer(){_classCallCheck(this,MetadataJSONSerializer);return _super39.call(this);}/**
     * Return the target as a JSON Object
     * @param {Metadata} p_data 
     * @param {object} p_options 
     * @returns {object}
     */_createClass(MetadataJSONSerializer,null,[{key:"Serialize",value:function Serialize(p_data){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;return p_data._data;}/**
     * Return an entry object from the provided serial
     * Or override available info in provided target.
     * @param {object} p_serial 
     * @param {Metadata} p_data
     * @param {object} p_options  
     * @returns {Metadata}
     */},{key:"Deserialize",value:function Deserialize(p_serial){var p_data=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;if(!p_serial){throw new Error("Cannot unpack null data.");}if(!p_data){throw new Error("Cannot unpack metadata with a null target");}U.SetOverwrite(p_data._data,p_serial);return p_data;}}]);return MetadataJSONSerializer;}(BaseSerializer);module.exports["default"]=module.exports=MetadataJSONSerializer;},{"../../data/metadata":66,"../serializer-base":78,"@nkmjs/utils":268}],77:[function(require,module,exports){'use strict';var _require100=require("@nkmjs/common"),CSYMBOL=_require100.CSYMBOL;/**
 * Using Class as key in order to support @nkmjs-common BINDINGS
 */var SERIALIZER=/*#__PURE__*/function(_CSYMBOL){_inherits(SERIALIZER,_CSYMBOL);var _super40=_createSuper(SERIALIZER);function SERIALIZER(){_classCallCheck(this,SERIALIZER);return _super40.call(this);}return SERIALIZER;}(CSYMBOL);var NONE=/*#__PURE__*/function(_CSYMBOL2){_inherits(NONE,_CSYMBOL2);var _super41=_createSuper(NONE);function NONE(){_classCallCheck(this,NONE);return _super41.call(this);}return NONE;}(CSYMBOL);var TEXT=/*#__PURE__*/function(_CSYMBOL3){_inherits(TEXT,_CSYMBOL3);var _super42=_createSuper(TEXT);function TEXT(){_classCallCheck(this,TEXT);return _super42.call(this);}return TEXT;}(CSYMBOL);var JSON=/*#__PURE__*/function(_CSYMBOL4){_inherits(JSON,_CSYMBOL4);var _super43=_createSuper(JSON);function JSON(){_classCallCheck(this,JSON);return _super43.call(this);}return JSON;}(CSYMBOL);_defineProperty(JSON,"META_KEY",'meta');_defineProperty(JSON,"DATA_KEY",'data');_defineProperty(JSON,"ERRORS_KEY",'errors');_defineProperty(JSON,"CLASS",'class');module.exports["default"]=module.exports={SERIALIZER:SERIALIZER,NONE:NONE,TEXT:TEXT,JSON:JSON};},{"@nkmjs/common":27}],78:[function(require,module,exports){'use strict';var BaseSerializer=/*#__PURE__*/function(){function BaseSerializer(){_classCallCheck(this,BaseSerializer);}/**
     * 
     * @param {*} p_data The object to serialize
     * @param {*} p_options Serialization options
     * @returns {*} Serialized object
     */_createClass(BaseSerializer,null,[{key:"Serialize",value:function Serialize(p_data){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;throw new Error("not implemented");}/**
     * 
     * @param {*} p_input The data to be deserialized
     * @param {*} p_data The existing object to deserialize into
     * @param {*} p_options Deserialization options
     * @returns {*} Deserialized object (== p_data, if provided)
     */},{key:"Deserialize",value:function Deserialize(p_input){var p_data=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;throw new Error("not implemented");}}]);return BaseSerializer;}();module.exports["default"]=module.exports=BaseSerializer;},{}],79:[function(require,module,exports){var _require101=require("@nkmjs/common"),POOL=_require101.POOL,NFOS=_require101.NFOS,BINDINGS=_require101.BINDINGS;var DataBlock=require("../data/data-block");var BaseSerializer=require("./serializer-base");var SERIALIZATION_CONTEXT=require("./serialization-context");var JSON=SERIALIZATION_CONTEXT.JSON;/*
    expected input/output :

    {
        "__NFO__":{ 
            "instanceOf":"class-system-uid",
            ...
        },
        ...
    }

*/var JSONSerializer=/*#__PURE__*/function(_BaseSerializer3){_inherits(JSONSerializer,_BaseSerializer3);var _super44=_createSuper(JSONSerializer);function JSONSerializer(){_classCallCheck(this,JSONSerializer);return _super44.call(this);}/**
     * 
     * @param {*} p_data The object to serialize
     * @param {object} p_options Serialization options
     * @returns {object} Serialized object
     */_createClass(JSONSerializer,null,[{key:"Serialize",value:function Serialize(p_data){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;// Retrieve serializer
var serializer=BINDINGS.Get(SERIALIZATION_CONTEXT.JSON,p_data.constructor,null);if(!serializer){throw new Error("Could not find suitable serializer for target=".concat(p_data));}var serial=serializer.Serialize(p_data);// Ensure there is a data object
if(!(JSON.DATA_KEY in serial)){var wrapper={};wrapper[JSON.DATA_KEY]=serial;serial=wrapper;}// Ensure there is a meta object
var metas=null;if(!(JSON.META_KEY in serial)){metas={};serial[JSON.META_KEY]=metas;}else{metas=serial[JSON.META_KEY];}metas[JSON.CLASS]=BINDINGS.GetClassKey(p_data.constructor);return serial;}/**
     * 
     * @param {object} p_serial The data to be deserialized
     * @param {*} p_data The existing object to deserialize into
     * @param {object} p_options Deserialization options
     * @returns {*} Deserialized object (== p_data, if provided)
     */},{key:"Deserialize",value:function Deserialize(p_serial){var p_data=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var targetClass=null;// Retrieve reference constructor
if(p_data!=null){targetClass=p_data.constructor;}else{var metas=p_serial[JSON.META_KEY];if(!metas){throw new Error("Cannot unserialize without nfos");}targetClass=BINDINGS.GetClass(metas[JSON.CLASS]);if(!targetClass){throw new Error("Could not find constructor ".concat(metas.instanceOf));}p_data=POOL.Rent(targetClass);}var dataWrapper=null;if(!(JSON.DATA_KEY in p_serial)){return p_data;}else{dataWrapper=p_serial[JSON.DATA_KEY];}// Retrieve serializer
var serializer=BINDINGS.Get(SERIALIZATION_CONTEXT.JSON,targetClass,null);if(!serializer){throw new Error("Could not find suitable de-serializer for target=".concat(p_data));}// Deserialize !
return serializer.Deserialize(dataWrapper,p_data,p_options);}}]);return JSONSerializer;}(BaseSerializer);module.exports["default"]=module.exports=JSONSerializer;},{"../data/data-block":63,"./serialization-context":77,"./serializer-base":78,"@nkmjs/common":27}],80:[function(require,module,exports){var JSONSerializer=require("./serializer-json");/*
*   At the moment, the text serializer does a JSON.stringify of the JSONSerializer result, which is bad.
*/var TEXTSerializer=/*#__PURE__*/function(_JSONSerializer){_inherits(TEXTSerializer,_JSONSerializer);var _super45=_createSuper(TEXTSerializer);function TEXTSerializer(){_classCallCheck(this,TEXTSerializer);return _super45.call(this);}/**
     * 
     * @param {*} p_data The object to serialize
     * @param {*} p_options Serialization options
     * @returns {string} Serialized object
     */_createClass(TEXTSerializer,null,[{key:"Serialize",value:function Serialize(p_data){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;return JSON.stringify(JSONSerializer.Serialize(p_data,p_options));}/**
     * 
     * @param {*} p_serial The data to be deserialized
     * @param {*} p_data The existing object to deserialize into
     * @param {*} p_options Deserialization options
     * @returns {*} Deserialized object (== p_data, if provided)
     */},{key:"Deserialize",value:function Deserialize(p_serial){var p_data=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;return JSON.parse(JSONSerializer.Deserialize(p_serial,p_data,p_options));}}]);return TEXTSerializer;}(JSONSerializer);module.exports["default"]=module.exports=TEXTSerializer;},{"./serializer-json":79}],81:[function(require,module,exports){module.exports["default"]=module.exports={DIALOG:require("./lib/dialog"),DIALOG_SIGNAL:require("./lib/dialog-signal"),DialogInfos:require("./lib/dialog-infos")};},{"./lib/dialog":84,"./lib/dialog-infos":82,"./lib/dialog-signal":83}],82:[function(require,module,exports){var _require102=require("@nkmjs/utils"),U=_require102.U;var _require103=require("@nkmjs/common"),COM_ID=_require103.COM_ID,SIGNAL=_require103.SIGNAL,COMMON_FLAG=_require103.COMMON_FLAG,DisposableObjectEx=_require103.DisposableObjectEx,OptionsHandler=_require103.OptionsHandler;var DIALOG_SIGNAL=require("./dialog-signal");var DialogInfos=/*#__PURE__*/function(_DisposableObjectEx16){_inherits(DialogInfos,_DisposableObjectEx16);var _super46=_createSuper(DialogInfos);function DialogInfos(){var _this5;_classCallCheck(this,DialogInfos);_this5=_super46.call(this);_defineProperty(_assertThisInitialized(_this5),"F",void 0);return _this5;}/**
     * @access protected
     */_createClass(DialogInfos,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(DialogInfos.prototype),"_Init",this).call(this);this._actions=new Array(0);this._content=new Array(0);this._optionsHandler=new OptionsHandler();this._optionsHandler.Hook("origin","_origin");this._optionsHandler.Hook(COM_ID.TITLE,"_title");this._optionsHandler.Hook(COM_ID.MESSAGE,"_message");this._optionsHandler.Hook("type","_type");this._optionsHandler.Hook("dialogClass","_dialogClass");this._optionsHandler.Hook("primary","_primary");this._optionsHandler.Hook("secondary","_secondary");this._optionsHandler.Hook("content");this._optionsHandler.Hook("actions");this._Reset();}},{key:"_Reset",value:function _Reset(){this._origin=null;this._title="";this._message="";this._type="";this._dialogClass=null;this._primary=null;this._secondary=null;this._consumed=false;this._inputClass=null;this._actions.length=0;this._content.length=0;}},{key:"origin",get:function get(){return this._origin;},set:function set(p_value){this._origin=p_value;}},{key:"title",get:function get(){return this._title;},set:function set(p_value){this._title=p_value;}},{key:"message",get:function get(){return this._message;},set:function set(p_value){this._message=p_value;}},{key:"type",get:function get(){return this._type;},set:function set(p_value){this._type=p_value;}},{key:"dialogClass",get:function get(){return this._dialogClass;},set:function set(p_value){this._dialogClass=p_value;}},{key:"primary",get:function get(){return this._primary;},set:function set(p_value){this._primary=p_value;}},{key:"secondary",get:function get(){return this._secondary;},set:function set(p_value){this._secondary=p_value;}},{key:"content",get:function get(){return this._content;},set:function set(p_value){if(this._content===p_value){return;}if(!p_value){this._content.length=0;return;}for(var i=0,n=p_value.length;i<n;i++){this._content.push(p_value[i]);}}},{key:"actions",get:function get(){return this._actions;},set:function set(p_value){if(this._actions===p_value){return;}if(!p_value){this._actions.length=0;return;}this._primary=null;this._secondary=null;for(var i=0,n=p_value.length;i<n;i++){var action=p_value[i];this._actions.push(action);if(i===0){this._primary=action;}else if(i===1){this._secondary=action;}}}},{key:"options",get:function get(){return this._options;},set:function set(p_value){this._options=p_value;this._optionsHandler.Process(this,p_value);//TODO : Add support for custom popup content request
// = when displaying popup, callback to some function providing both dialog & dialog info
this._Broadcast(SIGNAL.UPDATED,this);}},{key:"GetOption",value:function GetOption(p_id,p_fallback){return U.Get(this._options,p_id,p_fallback);}},{key:"Consume",value:function Consume(){if(this._consumed){return;}this._consumed=true;this._Broadcast(DIALOG_SIGNAL.CONSUMED,this);}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){this._Reset();_get(_getPrototypeOf(DialogInfos.prototype),"_CleanUp",this).call(this);}},{key:"toString",value:function toString(){return"<? ".concat(this._title," : ").concat(this._message," />");}}]);return DialogInfos;}(DisposableObjectEx);module.exports["default"]=module.exports=DialogInfos;},{"./dialog-signal":83,"@nkmjs/common":27,"@nkmjs/utils":268}],83:[function(require,module,exports){'use strict';var DIALOG_SIGNAL=function DIALOG_SIGNAL(){_classCallCheck(this,DIALOG_SIGNAL);};_defineProperty(DIALOG_SIGNAL,"CONSUMED",Symbol("consumed"));module.exports["default"]=module.exports=DIALOG_SIGNAL;},{}],84:[function(require,module,exports){/**
 * This is the core facade for all system and apps.
 */'use strict';var _require104=require("@nkmjs/utils"),U=_require104.U;var _require105=require("@nkmjs/collections"),List=_require105.List,Dictionary=_require105.Dictionary;var _require106=require("@nkmjs/common"),POOL=_require106.POOL;var _require107=require("@nkmjs/services"),ServiceBase=_require107.ServiceBase;var _require108=require("@nkmjs/actions"),ACTION_REQUEST=_require108.ACTION_REQUEST,Request=_require108.Request;var DialogInfos=require("./dialog-infos");var DIALOG=/*#__PURE__*/function(_ServiceBase2){_inherits(DIALOG,_ServiceBase2);var _super47=_createSuper(DIALOG);function DIALOG(){_classCallCheck(this,DIALOG);return _super47.call(this);}/**
     * @access protected
     */_createClass(DIALOG,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(DIALOG.prototype),"_Init",this).call(this);this._dialogs=new List();this._ownedDialogData=new Dictionary();this._Bind(this._ProcessNext);this._inDialog=false;}/**
     * @access protected
     */},{key:"_Start",value:function _Start(){if(!_get(_getPrototypeOf(DIALOG.prototype),"Start",this).call(this)){return false;}//Some dialog push can occur prior to the service being started
this._ProcessNext();return true;}},{key:"_Push",value:/**
     * @access protected
     * @param {*} p_options 
     */function _Push(p_options){var dialogInfos=null;if(!U.isInstanceOf(p_options,DialogInfos)){dialogInfos=POOL.Rent(DialogInfos);dialogInfos.options=p_options;this._ownedDialogData.Set(dialogInfos,true);}else{dialogInfos=p_options;}if(dialogInfos.origin){//TODO : Allow to push additional popup if they are emitted from the current one
//and when closed, retrieve the "previous" one.
//i.e store a LIFO stack of dialogs [A <-> B <-> C]
}if(!this._dialogs.Add(dialogInfos)){throw Error("DialogInfos already exists in stack. Are you trying to push the same dialogInfo multiple times ?");}if(this._started){//Only process dialog requests once the service is started
this._ProcessNext();}return dialogInfos;}/**
     * @access protected
     */},{key:"_ProcessNext",value:function _ProcessNext(){if(this._inDialog){return null;}var next=this._dialogs.Shift();if(!next){this._inDialog=false;return null;}this._inDialog=true;next.Watch(DialogInfos.CONSUMED,this._OnDialogConsumed,this);Request.Emit(ACTION_REQUEST.DIALOG,{data:next},this,this._OnRequestSuccess,this._OnRequestFail);}/**
     * @access protected
     * @param {*} p_request 
     */},{key:"_OnRequestFail",value:function _OnRequestFail(p_request){var dialog=p_request.options.infos;throw new Error("Unhandled dialog : ".concat(dialog));}/**
     * @access protected
     * @param {*} p_request 
     */},{key:"_OnRequestSuccess",value:function _OnRequestSuccess(p_request){//this._Success();
}/**
     * @access protected
     * @param {*} p_dialog 
     */},{key:"_OnDialogConsumed",value:function _OnDialogConsumed(p_dialog){var dialogInfos=p_dialog.data;this._dialogs.Remove(p_dialog);p_dialog.Release();if(this._ownedDialogData.Get(dialogInfos)){this._ownedDialogData.Remove(dialogInfos);dialogInfos.Release();}this._inDialog=false;this._ProcessNext();}}],[{key:"Push",value:function Push(p_options){this.instance._Push(p_options);}}]);return DIALOG;}(ServiceBase);module.exports["default"]=module.exports=DIALOG;},{"./dialog-infos":82,"@nkmjs/actions":1,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/services":150,"@nkmjs/utils":268}],85:[function(require,module,exports){'use strict';var _require109=require("@nkmjs/common"),BindingKit=_require109.BindingKit;var _require110=require("@nkmjs/data-core"),Metadata=_require110.Metadata;var DOCUMENT_CONTEXT=require("./lib/document-context");var _require111=require("./lib/documents"),MetaDocument=_require111.MetaDocument;var Bindings=/*#__PURE__*/function(_BindingKit2){_inherits(Bindings,_BindingKit2);var _super48=_createSuper(Bindings);function Bindings(){_classCallCheck(this,Bindings);return _super48.call(this);}_createClass(Bindings,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Bindings.prototype),"_Init",this).call(this);this.Add({context:DOCUMENT_CONTEXT.DOCUMENT,kvps:[{key:Metadata,binding:MetaDocument}]});}}]);return Bindings;}(BindingKit);module.exports["default"]=module.exports=Bindings;},{"./lib/document-context":87,"./lib/documents":91,"@nkmjs/common":27,"@nkmjs/data-core":52}],86:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={DOCUMENTS:require("./lib/documents-manager"),Document:require("./lib/document"),MetaDocument:require("./lib/documents/document-meta")};require("@nkmjs/common").BINDINGS.Expand(require("./bindings"));},{"./bindings":85,"./lib/document":88,"./lib/documents-manager":89,"./lib/documents/document-meta":90,"@nkmjs/common":27}],87:[function(require,module,exports){'use strict';/**
 * Using Class as key in order to support @nkmjs-common BINDINGS
 */var DOCUMENT=function DOCUMENT(){_classCallCheck(this,DOCUMENT);};module.exports["default"]=module.exports={DOCUMENT:DOCUMENT};},{}],88:[function(require,module,exports){'use strict';var _defineProperty4;var _require112=require("@nkmjs/utils"),U=_require112.U,PATH=_require112.PATH;var _require113=require("@nkmjs/common"),COM_ID=_require113.COM_ID,NFOS=_require113.NFOS,BINDINGS=_require113.BINDINGS,SIGNAL=_require113.SIGNAL,DisposableObjectEx=_require113.DisposableObjectEx,Observer=_require113.Observer,Callbacks=_require113.Callbacks;var _require114=require("@nkmjs/data-core"),SERIALIZATION_CONTEXT=_require114.SERIALIZATION_CONTEXT,DATA_SIGNAL=_require114.DATA_SIGNAL;var _require115=require("@nkmjs/io-core"),IO_SIGNAL=_require115.IO_SIGNAL,ENCODING=_require115.ENCODING,RESOURCES=_require115.RESOURCES,Resource=_require115.Resource,IO_TYPE=_require115.IO_TYPE;/**
 * A document is wrapper for a resource and a data object.
 * It aim at streamlining working with custom datatype & saving them on disk.
 */var Document=/*#__PURE__*/function(_DisposableObjectEx17){_inherits(Document,_DisposableObjectEx17);var _super49=_createSuper(Document);function Document(){_classCallCheck(this,Document);return _super49.call(this);}_createClass(Document,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Document.prototype),"_Init",this).call(this);this._currentPath=null;this._currentRsc=null;this._callbacks=new Callbacks();this._resourceObserver=new Observer();this._resourceObserver.Hook(SIGNAL.RELEASED,this._OnRscReleased,this);this._resourceObserver.Hook(IO_SIGNAL.READ_COMPLETE,this._OnReadComplete,this);this._resourceObserver.Hook(IO_SIGNAL.WRITE_START,this._OnWriteStart,this);this._dataObserver=new Observer();this._dataObserver.Hook(SIGNAL.RELEASED,this._OnDataReleased,this);this._dataObserver.Hook(DATA_SIGNAL.DIRTY,this._OnDataDirty,this);this._dataObserver.Hook(DATA_SIGNAL.DIRTY_CLEARED,this._OnDataCleaned,this);this._Bind(this._OnLoadError);this._Bind(this._OnSaveError);this._Bind(this._OnSaveSuccess);}/*
        Whatever property is set has pre-sceance over the other.
        If you choose to set a path, if there is a resource set and it doesn't match 
        the provided path, it will be set to null.
        If you choose to set a resource, the path will be set to that resource's path.
    */},{key:"currentPath",get:function get(){},set:function set(p_value){p_value=PATH.SHORT(p_value);if(this._currentPath===p_value){return;}this._currentPath=p_value;if(!U.isEmpty(p_value)&&this._currentRsc){if(this._currentRsc.path!=p_value){// Current resource doesn't have the provided path : unlink it.
// Document will fetch the correct resource when required.
this._currentRsc=null;}}}},{key:"currentRsc",get:function get(){return this._currentRsc;},set:function set(p_value){if(this._currentRsc===p_value){return;}var oldRsc=this._currentRsc;//TODO : Take a stance on what to do with the old resource.
this._currentRsc=p_value;if(oldRsc){this._resourceObserver.Unobserve(oldRsc);}if(p_value){this._resourceObserver.Observe(p_value);this.currentPath=p_value.path;// Only update path if we're provided with a valid resource.
}}},{key:"currentData",get:function get(){return this._currentData;},set:function set(p_value){if(this._currentData===p_value){if(p_value){if(p_value.isDirty){this.Dirty();}else{this.ClearDirty();}}return;}var oldData=this._currentData;this._currentData=p_value;if(oldData){this._dataObserver.Unobserve(oldData);}if(p_value){this._dataObserver.Observe(p_value);// Dirty document if data is dirty
if(p_value.isDirty){this.Dirty();}else{this.ClearDirty();}}}/**
     * @returns {boolean} True if the DataBlock is dirty, otherwise false
     */},{key:"isDirty",get:function get(){return this._isDirty;}/**
     * 
     */},{key:"Dirty",value:function Dirty(){if(this._isDirty){return;}this._isDirty=true;this._Broadcast(DATA_SIGNAL.DIRTY,this);}/**
     * 
     */},{key:"ClearDirty",value:function ClearDirty(){if(!this._isDirty){return;}this._isDirty=false;this._Broadcast(DATA_SIGNAL.DIRTY_CLEARED,this);}// ----> RSC Management
},{key:"_GetRsc",value:function _GetRsc(){var p_path=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;// Override existing path if one is provided
if(p_path){this.currentPath=p_path;}if(!this._currentRsc){// No resource currently set, fetch it.
if(U.isEmpty(this._currentPath)){throw new Error("Empty path.");}this.currentRsc=RESOURCES.Get(this._currentPath,p_options);}return this._currentRsc;}},{key:"_OnRscReleased",value:function _OnRscReleased(p_rsc){this.currentRsc=null;}// ----> Data Management
},{key:"_OnDataReleased",value:function _OnDataReleased(p_data){this.data=null;}},{key:"_OnDataDirty",value:function _OnDataDirty(p_data){this.Dirty();}},{key:"_OnDataCleaned",value:function _OnDataCleaned(p_data){this.ClearDirty();}// ----> Load
},{key:"Load",value:function Load(){var p_options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var nfo=NFOS.Get(this),rsc=this._GetRsc(U.Get(p_options,"path",null),{cl:nfo.resource,encoding:nfo.encoding});if(!rsc){throw new Error("No resource set.");}if(rsc.Read({io:U.Get(p_options,"io",nfo.defaultIOType),error:this._OnLoadError})){//Plug events
this._callbacks.Add(p_options);return true;}else{return false;}}},{key:"_OnLoadError",value:function _OnLoadError(p_err){p_err.document=this;this._callbacks.OnErrorFlush(p_err);}/**
     * Use the resource's unserialized content to rebuild
     * a typed data object through this document's serializer
     * @param {*} p_rsc
     */},{key:"_OnReadComplete",value:function _OnReadComplete(p_rsc){this.currentData=this._Unpack(p_rsc.content,this._currentData);this._callbacks.OnSuccessFlush(this);}/**
     * Called when the linked ressource has successfully loaded.
     * Use the serializer in __NFO__ to unserialize resource
     * @access protected
     * @param {*} p_content 
     */},{key:"_Unpack",value:function _Unpack(p_content){var p_data=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;// If data already exists, attempt to unserialize into existing data.
// Otherwise, create a new data !
// SomeSerializer.Read( p_rsc.content )
var serializer=BINDINGS.Get(SERIALIZATION_CONTEXT.SERIALIZER,NFOS.Get(this).serializationContext),data=serializer.Deserialize(p_content,p_data,null);//TODO : A way to provide deserialization options
this.Dirty();return data;}// ----> Save
},{key:"Save",value:function Save(){var p_options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;if(!this._currentData){throw new Error("No data.");}var nfo=NFOS.Get(this),rsc=this._GetRsc(U.Get(p_options,"path",null),{cl:nfo.resource,encoding:nfo.encoding});if(!rsc){throw new Error("No resource set.");}if(rsc.Write({io:U.Get(p_options,"io",nfo.defaultIOType),error:this._OnSaveError,success:this._OnSaveSuccess})){this._callbacks.Add(p_options);return true;}else{return false;}}/**
     * Set the resource content to be serialized.
     * i.e : if the resource is a JSON Resource, the resource content is expect to be a { JSON }. 
     * @param {*} p_rsc 
     */},{key:"_OnWriteStart",value:function _OnWriteStart(p_rsc){p_rsc.content=this._Pack(this._currentData);}},{key:"_OnSaveSuccess",value:function _OnSaveSuccess(){this._callbacks.OnSuccessFlush(this);}},{key:"_OnSaveError",value:function _OnSaveError(p_err){p_err.document=this;this._callbacks.OnErrorFlush(p_err);}/**
     * Called when the ressource has started writing its data (not before)
     * Used as rsc._serializeFn
     */},{key:"_Pack",value:function _Pack(p_data){//Pack document data into serializable data
var serializer=BINDINGS.Get(SERIALIZATION_CONTEXT.SERIALIZER,NFOS.Get(this).serializationContext);return serializer.Serialize(p_data,null);}// ----> Delete
},{key:"Delete",value:function Delete(){var p_options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;}},{key:"_CleanUp",value:function _CleanUp(){this.currentRsc=null;this._currentPath=null;_get(_getPrototypeOf(Document.prototype),"_CleanUp",this).call(this);}}]);return Document;}(DisposableObjectEx);_defineProperty(Document,"__NFO__",(_defineProperty4={},_defineProperty(_defineProperty4,COM_ID.ICON,"%ICON%/icon_document.svg"),_defineProperty(_defineProperty4,"resource",Resource),_defineProperty(_defineProperty4,"encoding",ENCODING.UTF8),_defineProperty(_defineProperty4,"serializationContext",SERIALIZATION_CONTEXT.NONE),_defineProperty(_defineProperty4,"defaultIOType",IO_TYPE.DEFAULT),_defineProperty4));module.exports["default"]=module.exports=Document;},{"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/io-core":98,"@nkmjs/utils":268}],89:[function(require,module,exports){'use strict';var _require116=require("@nkmjs/utils"),U=_require116.U;var _require117=require("@nkmjs/common"),BINDINGS=_require117.BINDINGS,POOL=_require117.POOL,SingletonEx=_require117.SingletonEx;var _require118=require("@nkmjs/data-core"),DataBlock=_require118.DataBlock;var DOCUMENT_CONTEXT=require("./document-context");var DOCUMENTS=/*#__PURE__*/function(_SingletonEx4){_inherits(DOCUMENTS,_SingletonEx4);var _super50=_createSuper(DOCUMENTS);function DOCUMENTS(){_classCallCheck(this,DOCUMENTS);return _super50.call(this);}_createClass(DOCUMENTS,[{key:"_Init",value:function _Init(){}/**
     * 
     * @param {object} p_options 
     * @param {object} p_options.path Document's resource path
     * @param {Document|Function} p_options.document Document object or constructor
     * @param {DataBlock|Function} p_options.data DataBlock object or constructor
     * @returns {Document}
     */},{key:"_Get",value:/**
     * 
     * @param {object} p_options 
     * @param {object} p_options.path Document's resource path
     * @param {Document|Function} p_options.document Document object or constructor
     * @param {DataBlock|Function} p_options.data DataBlock object or constructor
     * @returns {Document}
     */function _Get(p_options){var document,data,path;// First, check if data is set. If so, it should drive the type of document (if not set)
data=U.Get(p_options,"data",null);document=U.Get(p_options,"document",null);path=U.Get(p_options,"path",null);if(data&&!document){document=BINDINGS.Get(DOCUMENT_CONTEXT.DOCUMENT,data,null);}if(!document){throw new Error("Not enough options set to create a new document.");}document=POOL.Rent(document);if(path){document.currentPath=path;}if(data){if(U.isFunc(data)){data=POOL.Rent(data);}document.currentData=data;}return document;}}],[{key:"Get",value:function Get(p_options){return this.instance._Get(p_options);}}]);return DOCUMENTS;}(SingletonEx);module.exports["default"]=module.exports=DOCUMENTS;},{"./document-context":87,"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/utils":268}],90:[function(require,module,exports){'use strict';var _require119=require("@nkmjs/utils"),U=_require119.U;var _require120=require("@nkmjs/common"),NFOS=_require120.NFOS;var _require121=require("@nkmjs/environment"),ENV=_require121.ENV;var _require122=require("@nkmjs/data-core"),SERIALIZATION_CONTEXT=_require122.SERIALIZATION_CONTEXT;var _require123=require("@nkmjs/io-core"),IO_TYPE=_require123.IO_TYPE,JSONResource=_require123.JSONResource;var Document=require("../document");/**
 * A MetaDocument is a cross-plateform 'meta' file.
 * If run in a nodejs environment, is it saved on the drive, while in browser it will be stored
 * in either storageArea (extensions) or localStorage (PWA)
 */var MetaDocument=/*#__PURE__*/function(_Document){_inherits(MetaDocument,_Document);var _super51=_createSuper(MetaDocument);function MetaDocument(){_classCallCheck(this,MetaDocument);return _super51.call(this);}_createClass(MetaDocument,[{key:"_CheckOptions",value:function _CheckOptions(){var p_options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;p_options=p_options?p_options:{};p_options.io=ENV.IF_NODE(IO_TYPE.FILE_SYSTEM,IO_TYPE.LOCAL_STORAGE);return p_options;}},{key:"Load",value:function Load(){var p_options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;return _get(_getPrototypeOf(MetaDocument.prototype),"Load",this).call(this,this._CheckOptions(p_options));}},{key:"Save",value:function Save(){var p_options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;return _get(_getPrototypeOf(MetaDocument.prototype),"Save",this).call(this,this._CheckOptions(p_options));}},{key:"Delete",value:function Delete(){var p_options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;return _get(_getPrototypeOf(MetaDocument.prototype),"Delete",this).call(this,this._CheckOptions(p_options));}}]);return MetaDocument;}(Document);_defineProperty(MetaDocument,"__NFO__",NFOS.Ext({resource:JSONResource,serializationContext:SERIALIZATION_CONTEXT.JSON},Document.__NFO__));module.exports["default"]=module.exports=MetaDocument;},{"../document":88,"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/environment":92,"@nkmjs/io-core":98,"@nkmjs/utils":268}],91:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={MetaDocument:require("./document-meta")};},{"./document-meta":90}],92:[function(require,module,exports){'use struct';module.exports["default"]=module.exports={ENV_STATE:require("./lib/dom-state"),ENV_DISPLAY:require("./lib/env-display"),ENV_SIGNAL:require("./lib/env-signal"),ENV:require("./lib/environment")};},{"./lib/dom-state":93,"./lib/env-display":94,"./lib/env-signal":95,"./lib/environment":96}],93:[function(require,module,exports){'use strict';var DOM_STATE=function DOM_STATE(){_classCallCheck(this,DOM_STATE);};_defineProperty(DOM_STATE,"NONE","none");_defineProperty(DOM_STATE,"LOADING","loading");_defineProperty(DOM_STATE,"INTERACTIVE","interactive");_defineProperty(DOM_STATE,"COMPLETE","complete");module.exports["default"]=module.exports=DOM_STATE;},{}],94:[function(require,module,exports){'use strict';var ENV_DISPLAY=function ENV_DISPLAY(){_classCallCheck(this,ENV_DISPLAY);};_defineProperty(ENV_DISPLAY,"NONE","none");_defineProperty(ENV_DISPLAY,"DEFAULT","browser");_defineProperty(ENV_DISPLAY,"FULLSCREEN","fullscreen");_defineProperty(ENV_DISPLAY,"MINIMAL","minimal-ui");_defineProperty(ENV_DISPLAY,"STANDALONE","standalone");_defineProperty(ENV_DISPLAY,"displayModes",[ENV_DISPLAY.DEFAULT,ENV_DISPLAY.FULLSCREEN,ENV_DISPLAY.MINIMAL,ENV_DISPLAY.STANDALONE]);_defineProperty(ENV_DISPLAY,"COLORSCHEME_DARK","dark");_defineProperty(ENV_DISPLAY,"COLORSCHEME_LIGHT","light");_defineProperty(ENV_DISPLAY,"COLORSCHEME_NO_PREFERENCES","no-preferences");_defineProperty(ENV_DISPLAY,"colorSchemes",[ENV_DISPLAY.COLORSCHEME_DARK,ENV_DISPLAY.COLORSCHEME_LIGHT,ENV_DISPLAY.COLORSCHEME_NO_PREFERENCES]);module.exports["default"]=module.exports=ENV_DISPLAY;},{}],95:[function(require,module,exports){'use strict';var ENV_SIGNAL=function ENV_SIGNAL(){_classCallCheck(this,ENV_SIGNAL);};_defineProperty(ENV_SIGNAL,"START",Symbol("environment-start"));_defineProperty(ENV_SIGNAL,"DOMSTATE_CHANGED",Symbol("displaymode-changed"));_defineProperty(ENV_SIGNAL,"DISPLAYMODE_CHANGED",Symbol("color-scheme-changed"));_defineProperty(ENV_SIGNAL,"COLORSCHEME_CHANGED",Symbol("domstate-changed"));module.exports["default"]=module.exports=ENV_SIGNAL;},{}],96:[function(require,module,exports){/**
 * This is the core facade for all system and apps.
 */'use strict';var _require124=require("@nkmjs/utils"),U=_require124.U,PATH=_require124.PATH,LOG=_require124.LOG;var _require125=require("@nkmjs/collections"),List=_require125.List;var _require126=require("@nkmjs/common"),SingletonEx=_require126.SingletonEx,CallList=_require126.CallList;var _require127=require("@nkmjs/services"),ServicesManager=_require127.ServicesManager,ServiceBase=_require127.ServiceBase;var ENV_SIGNAL=require("./env-signal");var Features=require("./helpers/features");var DOM_STATE=require("./dom-state");var ENV=/*#__PURE__*/function(_SingletonEx5){_inherits(ENV,_SingletonEx5);var _super52=_createSuper(ENV);function ENV(){_classCallCheck(this,ENV);return _super52.call(this);}/**
     * @type {Features}
     */_createClass(ENV,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(ENV.prototype),"_Init",this).call(this);this._features=new Features();this._app=null;this._config=null;this._started=false;this._running=false;this._services=new List();this._Bind(this._BootService);this._onStart=new CallList();}},{key:"features",get:function get(){return this._features;}// ----> 
/**
     * The main app.
     * @type {AppBase}
     */},{key:"app",get:function get(){return this._app;}/**
     * @type {array}
     */},{key:"paths",get:function get(){return this._config.paths;}/**
     * @type {object}
     */},{key:"config",get:function get(){return this._config;}/**
     * Add any number of services to be started during bootstrap.
     * @param  {...any} args Service constructor to InitializeAndStart
     */},{key:"RegisterServices",value:function RegisterServices(){var serviceClass;for(var _len14=arguments.length,args=new Array(_len14),_key16=0;_key16<_len14;_key16++){args[_key16]=arguments[_key16];}if(this._running){console.warn("RegisterServices called post-Start. Be sure this is intended.");args.forEach(this._BootService);return;}for(var i=0,n=args.length;i<n;i++){this._services.Add(args[i]);}}/**
     * Starts the environment : 
     * - process the provided config object
     * - register & initialize the registered services
     * @param {object} p_config 
     * @param {object} p_config.paths
     * @param {object} p_config.argv
     * @param {object} p_config.app
     */},{key:"Start",value:function Start(p_config){if(this._started){throw new Error("Cannot ENV.Start more than once.");}this._started=true;LOG._("ENV : START","#33979b","#212121");ENV.instance._features.List();this._config=p_config;var paths=p_config.paths;if(paths){for(var member in paths){PATH.SET(member,paths[member]);}}PATH.SET("%ICON%","img/icons");PATH.SET("%PATTERN%","img/patterns");// Initialize app, if any.
var appClass=U.Get(p_config,"webapp",null);if(appClass){LOG._("ENV : App found (".concat(appClass.name,")"),"#33979b","#212121");//LOG._(`ENV : App found (${appClass.name})`, `#182000`, `#7ca500`);
var appObject=new appClass();this._app=appObject;}else{LOG._("ENV : App not found","#fff","#980700");}ServicesManager.instance.Boot();this._services.ForEach(this._BootService);// Only dispatch ENV_SIGNAL.START once the DOM is ready.
// otherwise _OnStart() will be called in _OnDOMReady
if(this._features.isBrowser){switch(this._features.domState){case DOM_STATE.NONE:case DOM_STATE.LOADING:case DOM_STATE.INTERACTIVE:this._features.Watch(ENV_SIGNAL.DOMSTATE_CHANGED,this._OnDOMStateChanged,this);break;case DOM_STATE.COMPLETE:if(this._app){this._app.SetUp();}this._OnStart();break;}}else{this._OnStart();}}},{key:"_OnDOMStateChanged",value:function _OnDOMStateChanged(state){switch(this._features.domState){case DOM_STATE.LOADING:break;case DOM_STATE.INTERACTIVE:if(this._app){this._app.SetUp();}break;case DOM_STATE.COMPLETE:this._features.Unwatch(ENV_SIGNAL.DOMSTATE_CHANGED,this._OnDOMStateChanged,this);this._OnStart();break;}}/**
     * Commit environment start
     */},{key:"_OnStart",value:function _OnStart(){if(this._running){return;}this._running=true;if(this._app){this._app.Start();}this._onStart.NotifyFlush(this);this._Broadcast(ENV_SIGNAL.START,this);}/**
     * InitializeAndStart a single service from its constructor
     * @access protected
     * @param {*} p_serviceClass 
     */},{key:"_BootService",value:function _BootService(p_serviceClass){if(!U.isInstanceOf(p_serviceClass,ServiceBase)){throw new Error("".concat(p_serviceClass," is not a service."));}p_serviceClass.instance.InitializeAndStart();}}],[{key:"FEATURES",get:function get(){return this.instance._features;}},{key:"APP",get:function get(){return this.instance._app;}},{key:"onStart",value:function onStart(p_fn){this.instance._onStart.Add(p_fn);}/**
     * Checks whether nodejs is enabled and return the value
     * according to that.
     * @param {*} p_ifNodeIsEnabled
     * @param {*} p_ifNodeIsDisabled 
     * @returns {*} p_ifNodeIsEnabled if node is enabled, otherwise p_ifNodeIsDisabled
     */},{key:"IF_NODE",value:function IF_NODE(p_ifNodeIsEnabled,p_ifNodeIsDisabled){return this.instance.features.isNodeEnabled?p_ifNodeIsEnabled:p_ifNodeIsDisabled;}}]);return ENV;}(SingletonEx);module.exports["default"]=module.exports=ENV;},{"./dom-state":93,"./env-signal":95,"./helpers/features":97,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/services":150,"@nkmjs/utils":268}],97:[function(require,module,exports){'use strict';var _require128=require("@nkmjs/utils"),U=_require128.U,LOG=_require128.LOG;var _require129=require("@nkmjs/common"),DisposableObjectEx=_require129.DisposableObjectEx;var ENV_DISPLAY=require("../env-display");var DOM_STATE=require("../dom-state");var ENV_SIGNAL=require("../env-signal");var Features=/*#__PURE__*/function(_DisposableObjectEx18){_inherits(Features,_DisposableObjectEx18);var _super53=_createSuper(Features);function Features(){var _this6;_classCallCheck(this,Features);_this6=_super53.call(this);_this6._isNodeEnabled=false;// <-- Electron or Nodejs context ?
_this6._isBrowser=false;_this6._isMobile=false;_this6._isTablet=false;_this6._isDesktop=false;_this6._isExtension=false;_this6._isTouchEnabled=false;_this6._context=null;_this6._hasStorageArea=false;_this6._storageArea=null;_this6._prefersColorScheme=ENV_DISPLAY.COLORSCHEME_NO_PREFERENCES;_this6._displayMode=ENV_DISPLAY.NONE;_this6._domState=DOM_STATE.NONE;_this6._isCORSEnabled=false;// Extension check
try{// Check if chromium environment extension
_this6._context=chrome;// <-- Chromium
_this6._isExtension=true;if(!chrome.extension){throw new Error();}}catch(e){try{_this6._context=browser;// <-- Mozilla
_this6._isExtension=true;if(!browser.extension){throw new Error();}}catch(e){_this6._isExtension=false;_this6._context=null;}}// Storage check
try{_this6._storageArea=chrome.storage;// <-- Chromium
_this6._hasStorageArea=!U.isVoid(_this6._storageArea);if(!_this6._hasStorageArea){throw new Error();}}catch(e){try{_this6._storageArea=browser.storage;// <-- Mozilla
_this6._hasStorageArea=!U.isVoid(_this6._storageArea);}catch(e){_this6._storageArea=null;_this6._hasStorageArea=false;}}// Browser checks
try{var w=window;// <-- throw in node.js
_this6._isBrowser=true;_this6._isTouchEnabled='ontouchstart'in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;// see if DOM is already available
var domReadyState=document.readyState;if(domReadyState===DOM_STATE.COMPLETE||domReadyState===DOM_STATE.INTERACTIVE){_this6._OnDisplayModeChange();_this6.domState=domReadyState;}else{// DOM still loading
document.addEventListener("readystatechange",_this6._Bind(_this6._OnDOMStateChange));}try{var xhr=new XMLHttpRequest();if(U.isVoid(xhr.withCredentials)){_this6._isCORSEnabled=false;}else{_this6._isCORSEnabled=true;}}catch(e){_this6._isCORSEnabled=false;console.warn(e);}}catch(e){_this6._isBrowser=false;}return _this6;}// ----> Properties
_createClass(Features,[{key:"isBrowser",get:function get(){return this._isBrowser;}},{key:"isMobile",get:function get(){return this._isMobile;}},{key:"isTablet",get:function get(){return this._isTablet;}},{key:"isDesktop",get:function get(){return this._isDesktop;}},{key:"isTouchEnabled",get:function get(){return this._isTouchEnabled;}},{key:"hasStorage",get:function get(){return this._hasStorageArea;}},{key:"storageArea",get:function get(){return this._storageArea;}},{key:"isExtension",get:function get(){return this._isExtension;}},{key:"context",get:function get(){return this._context;}// extension context, abstract chrome.xxx, browser.xxx
},{key:"isCORSEnabled",get:function get(){return this._isCORSEnabled;}},{key:"isNodeEnabled",get:function get(){return this._isNodeEnabled;}// ----> DOM State
},{key:"domState",get:function get(){return this._domState;},set:function set(p_value){if(this._domState===p_value){return;}var oldState=this._domState;this._domState=p_value;LOG._U("domState",this._domState,oldState,"#f7d801");switch(this._domState){case DOM_STATE.LOADING:// The document is still loading.
break;case DOM_STATE.INTERACTIVE:// The document has finished loading. We can now access the DOM elements.
// But sub-resources such as images, stylesheets and frames are still loading.
// Update displayMode
var mode=ENV_DISPLAY.DEFAULT;if(navigator.standalone){mode=ENV_DISPLAY.STANDALONE;}for(var i=0,n=ENV_DISPLAY.displayModes.length;i<n;i++){var mdq=window.matchMedia("(display-mode: ".concat(ENV_DISPLAY.displayModes[i],")"));if(mdq.matches){mode=ENV_DISPLAY.displayModes[i];}mdq.addEventListener('change',this._OnDisplayModeChange);}this._displayMode=mode;// Update prefers-color-scheme
mode=ENV_DISPLAY.COLORSCHEME_NO_PREFERENCES;for(var _i18=0,_n14=ENV_DISPLAY.colorSchemes.length;_i18<_n14;_i18++){var _mdq=window.matchMedia("(prefers-color-scheme: ".concat(ENV_DISPLAY.colorSchemes[_i18],")"));if(_mdq.matches){mode=ENV_DISPLAY.colorSchemes[_i18];}_mdq.addEventListener('change',this._OnDisplayModeChange);}this._prefersColorScheme=mode;break;case DOM_STATE.COMPLETE:// The page is fully loaded. 
break;}this._Broadcast(ENV_SIGNAL.DOMSTATE_CHANGED,this._domState);}},{key:"_OnDOMStateChange",value:function _OnDOMStateChange(){if(document.readyState===DOM_STATE.COMPLETE){document.removeEventListener("DOMContentLoaded",this._OnDOMStateChange);}this.domState=document.readyState;}},{key:"_OnDisplayModeChange",value:function _OnDisplayModeChange(){// Display Mode
var mode=ENV_DISPLAY.DEFAULT;if(navigator.standalone){mode=ENV_DISPLAY.STANDALONE;}for(var i=0,n=ENV_DISPLAY.displayModes.length;i<n;i++){var mdq=window.matchMedia("(display-mode: ".concat(ENV_DISPLAY.displayModes[i],")"));if(mdq.matches){mode=ENV_DISPLAY.displayModes[i];}}this.displayMode=mode;// Color Scheme
mode=ENV_DISPLAY.COLORSCHEME_NO_PREFERENCES;for(var _i19=0,_n15=ENV_DISPLAY.colorSchemes.length;_i19<_n15;_i19++){var _mdq2=window.matchMedia("(prefers-color-scheme: ".concat(ENV_DISPLAY.colorSchemes[_i19],")"));if(_mdq2.matches){mode=ENV_DISPLAY.colorSchemes[_i19];}}this.prefersColorScheme=mode;}// ----> Display State
},{key:"displayMode",get:function get(){return this._displayMode;},set:function set(p_value){if(this._displayMode===p_value){return;}var oldMode=this._displayMode;this._displayMode=p_value;LOG._U("displayMode",this._displayMode,oldMode,"#f7d801");this._Broadcast(ENV_SIGNAL.DISPLAYMODE_CHANGED,this._displayMode,oldMode);}},{key:"prefersColorScheme",get:function get(){return this._prefersColorScheme;},set:function set(p_value){if(this._prefersColorScheme===p_value){return;}var oldValue=this._prefersColorScheme;this._prefersColorScheme=p_value;LOG._U("prefersColorScheme",this._prefersColorScheme,oldValue,"#f7d801");this._Broadcast(ENV_SIGNAL.COLORSCHEME_CHANGED,this._prefersColorScheme,oldValue);}//
},{key:"List",value:function List(){var g="\u2714",b="\uD83D\uDFAB",gt="889000",bt="d86100",bg="#171717";LOG._("".concat(this._isBrowser?g:b," isBrowser"),"#".concat(this._isBrowser?gt:bt),bg);LOG._("".concat(this._isExtension?g:b," isExtension"),"#".concat(this._isExtension?gt:bt),bg);LOG._("".concat(this._isMobile?g:b," isMobile"),"#".concat(this._isMobile?gt:bt),bg);LOG._("".concat(this._isTablet?g:b," isTablet"),"#".concat(this._isTablet?gt:bt),bg);LOG._("".concat(this._isDesktop?g:b," isDesktop"),"#".concat(this._isDesktop?gt:bt),bg);LOG._("".concat(this._isTouchEnabled?g:b," isToucheEnabled"),"#".concat(this._isTouchEnabled?gt:bt),bg);LOG._("".concat(this._hasStorageArea?g:b," hasStorageArea"),"#".concat(this._hasStorageArea?gt:bt),bg);LOG._("".concat(this._isCORSEnabled?g:b," isCORSEnabled"),"#".concat(this._isCORSEnabled?gt:bt),bg);LOG._("\u25A2 displayMode : ".concat(this._displayMode),"#889000",bg);LOG._("\u25D0 prefersColorScheme : ".concat(this._prefersColorScheme),"#889000",bg);LOG._("".concat(this._isNodeEnabled?g:b," isNodeEnabled"),"#".concat(this._isNodeEnabled?'182000':'fff'),"#".concat(this._isNodeEnabled?'7ca500':'980700'));}}]);return Features;}(DisposableObjectEx);module.exports["default"]=module.exports=Features;},{"../dom-state":93,"../env-display":94,"../env-signal":95,"@nkmjs/common":27,"@nkmjs/utils":268}],98:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={ENCODING:require("./lib/encoding"),RESPONSE_TYPE:require("./lib/response-type"),IO_TYPE:require("./lib/io-type"),IO_SIGNAL:require("./lib/io-signal"),RESOURCES:require("./lib/resources-manager"),RESSOURCE_STATE:require("./lib/resource-state"),Resource:require("./lib/resource"),Directory:require("./lib/directory"),IOProcess:require("./lib/io-process"),ResourceOperation:require("./lib/resource-operation"),// Resources
BinaryResource:require("./lib/resources/resource-binary"),BlobResource:require("./lib/resources/resource-blob"),TextResource:require("./lib/resources/resource-text"),JSONResource:require("./lib/resources/resource-json")};},{"./lib/directory":99,"./lib/encoding":100,"./lib/io-process":101,"./lib/io-signal":112,"./lib/io-type":113,"./lib/resource":116,"./lib/resource-operation":114,"./lib/resource-state":115,"./lib/resources-manager":117,"./lib/resources/resource-binary":118,"./lib/resources/resource-blob":119,"./lib/resources/resource-json":120,"./lib/resources/resource-text":121,"./lib/response-type":122}],99:[function(require,module,exports){'use strict';var _require130=require("@nkmjs/utils"),U=_require130.U;var _require131=require("@nkmjs/common"),SIGNAL=_require131.SIGNAL;var _require132=require("@nkmjs/collections"),List=_require132.List;var Resource=require("./resource");var Directory=/*#__PURE__*/function(_Resource){_inherits(Directory,_Resource);var _super54=_createSuper(Directory);function Directory(){_classCallCheck(this,Directory);return _super54.call(this);}_createClass(Directory,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Directory.prototype),"_Init",this).call(this);this._requestRsc=null;this._directories=new List();this._resources=new List();}},{key:"isDir",get:function get(){return true;}},{key:"_OnPathUpdated",value:function _OnPathUpdated(p_oldPath){//TODO : Update all sub items path corresponding to this directory's path.
}},{key:"_Encode",value:function _Encode(){return null;}},{key:"_Decode",value:function _Decode(){var fullPath=PATH.FULL(this._path);for(var i=0,n=this._raw.length;i<n;i++){var rsc=this._requestRsc("".concat(fullPath,"/").concat(this._raw[i]));}}},{key:"Add",value:function Add(p_rsc){var added=false;if(p_rsc.isDir){added=this._directories.Add(p_rsc);}else{added=this._resources.Add(p_rsc);}if(added){//console.log(`${this._path} += ${p_rsc._path}`);
p_rsc.Watch(SIGNAL.RELEASED,this._OnRscReleased,this);p_rsc.directory=this;}}},{key:"Remove",value:function Remove(p_rsc){var removed=false;if(p_rsc.isDir){removed=this._directories.Remove(p_rsc);}else{removed=this._resources.Remove(p_rsc);}if(removed){if(p_rsc.directory===this){p_rsc.directory=null;}p_rsc.Unwatch(SIGNAL.RELEASED,this._OnRscReleased,this);}}},{key:"ReleaseContent",value:function ReleaseContent(){var arr=this._resources.internalArray;for(var i=0,n=arr.length;i<n;i++){arr[arr.length-1].Release();}arr=this._directories.internalArray;for(var _i20=0,_n16=arr.length;_i20<_n16;_i20++){var dir=arr[arr.length-1];dir.ReleaseContent();dir.Release();}}},{key:"ReleaseWithContent",value:function ReleaseWithContent(){this.ReleaseContent();this.Release();}},{key:"_OnRscReleased",value:function _OnRscReleased(p_rsc){this.Remove(p_rsc);}}]);return Directory;}(Resource);module.exports["default"]=module.exports=Directory;},{"./resource":116,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/utils":268}],100:[function(require,module,exports){'use strict';var ENCODING=function ENCODING(){_classCallCheck(this,ENCODING);};_defineProperty(ENCODING,"UTF8",'utf8');_defineProperty(ENCODING,"UCS2",'ucs2');_defineProperty(ENCODING,"UTF16le",'utf16le');_defineProperty(ENCODING,"LATIN1",'latin1');_defineProperty(ENCODING,"BINARY",'binary');_defineProperty(ENCODING,"BASE64",'base64');_defineProperty(ENCODING,"ASCII",'ascii');_defineProperty(ENCODING,"HEX",'hex');module.exports["default"]=module.exports=ENCODING;},{}],101:[function(require,module,exports){'use strict';var _require133=require("@nkmjs/utils"),U=_require133.U,PATH=_require133.PATH;var _require134=require("@nkmjs/common"),SIGNAL=_require134.SIGNAL,DisposableObjectEx=_require134.DisposableObjectEx;var IOProcess=/*#__PURE__*/function(_DisposableObjectEx19){_inherits(IOProcess,_DisposableObjectEx19);var _super55=_createSuper(IOProcess);function IOProcess(){_classCallCheck(this,IOProcess);return _super55.call(this);}_createClass(IOProcess,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(IOProcess.prototype),"_Init",this).call(this);this._operation=null;this._running=false;this._globalResourceMap=null;}},{key:"running",get:function get(){return this._running;}},{key:"rsc",get:function get(){return this._operation.rsc;}},{key:"encoding",get:function get(){this._operation.rsc.encoding;}},{key:"operation",get:function get(){return this._operation;},set:function set(p_value){this._operation=p_value;}/**
     * Called by the IOQueue before Process
     * This is to make sure basic infos are valid before starting the process itself.
     */},{key:"Validate",value:function Validate(){if(U.isEmpty(this._operation.rsc.path)){this._OnError(new Error("Resource path is empty."));return false;}return true;}},{key:"Process",value:function Process(){throw new Error("Process not implemented in io-process");}},{key:"_OnStart",value:function _OnStart(){this._running=true;this._operation.OnStart();}},{key:"_OnProgress",value:function _OnProgress(p_progress){this._operation.OnProgress(p_progress);}},{key:"_OnError",value:function _OnError(p_err){this._operation.OnError(p_err);this._OnComplete();}},{key:"_OnSuccess",value:function _OnSuccess(){this._operation.OnSuccess();this._OnComplete();}},{key:"_OnComplete",value:function _OnComplete(){this._running=false;this._Broadcast(SIGNAL.COMPLETE,this);this.Release();}},{key:"_CleanUp",value:function _CleanUp(){this._operation=null;this._running=false;this._globalResourceMap=null;_get(_getPrototypeOf(IOProcess.prototype),"_CleanUp",this).call(this);}},{key:"toString",value:function toString(){return"[".concat(this.constructor.name,"::").concat(this._operation?this._operation.fullPath:'NO_OPERATION_SET',"]");}}]);return IOProcess;}(DisposableObjectEx);module.exports["default"]=module.exports=IOProcess;},{"@nkmjs/common":27,"@nkmjs/utils":268}],102:[function(require,module,exports){'use strict';var _require135=require("@nkmjs/utils"),U=_require135.U,PATH=_require135.PATH;var _require136=require("@nkmjs/common"),SIGNAL=_require136.SIGNAL;var IOProcess=require("../io-process");/**
 * HTTP IO Rename
 */var HTTPIORename=/*#__PURE__*/function(_IOProcess){_inherits(HTTPIORename,_IOProcess);var _super56=_createSuper(HTTPIORename);function HTTPIORename(){_classCallCheck(this,HTTPIORename);return _super56.call(this);}_createClass(HTTPIORename,[{key:"Process",value:function Process(){this._OnStart();this._OnProgress(0);this._OnError(new Error("HTTP delete not supported."));}}]);return HTTPIORename;}(IOProcess);module.exports["default"]=module.exports=HTTPIORename;},{"../io-process":101,"@nkmjs/common":27,"@nkmjs/utils":268}],103:[function(require,module,exports){'use strict';var _require137=require("@nkmjs/utils"),U=_require137.U,PATH=_require137.PATH;var _require138=require("@nkmjs/common"),SIGNAL=_require138.SIGNAL;var axios=require('axios');var IOProcess=require("../io-process");var ENCODING=require("../encoding");/**
 * HTTP IO Reader
 */var HTTPIOReader=/*#__PURE__*/function(_IOProcess2){_inherits(HTTPIOReader,_IOProcess2);var _super57=_createSuper(HTTPIOReader);function HTTPIOReader(){_classCallCheck(this,HTTPIOReader);return _super57.call(this);}_createClass(HTTPIOReader,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(HTTPIOReader.prototype),"_Init",this).call(this);this._Bind(this._OnProgress);this._Bind(this._OnRequestSuccess);this._Bind(this._OnError);}},{key:"Process",value:function Process(){this._OnStart();var options={onDownloadProgress:this._OnProgress,responseType:this.rsc.type};if(this.rsc.mime){options.headers={'Content-Type':this.rsc.mime};}_get(_getPrototypeOf(HTTPIOReader.prototype),"_OnProgress",this).call(this,0);axios.get(this._operation.fullPath,options).then(this._OnRequestSuccess)["catch"](this._OnError);}},{key:"_OnProgress",value:function _OnProgress(p_evt){var totalLength=p_evt.lengthComputable?p_evt.total:p_evt.target.getResponseHeader('content-length')||p_evt.target.getResponseHeader('x-decompressed-content-length');console.log("onDownloadProgress",p_evt.loaded,totalLength);var progress=1;if(totalLength!==null){progress=p_evt.loaded/totalLength;}_get(_getPrototypeOf(HTTPIOReader.prototype),"_OnProgress",this).call(this,progress);}},{key:"_OnRequestSuccess",value:function _OnRequestSuccess(p_evt){this.rsc.raw=p_evt.data;this._OnSuccess();}},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(HTTPIOReader.prototype),"_CleanUp",this).call(this);}}]);return HTTPIOReader;}(IOProcess);module.exports["default"]=module.exports=HTTPIOReader;},{"../encoding":100,"../io-process":101,"@nkmjs/common":27,"@nkmjs/utils":268,"axios":123}],104:[function(require,module,exports){'use strict';var _require139=require("@nkmjs/utils"),U=_require139.U,PATH=_require139.PATH;var _require140=require("@nkmjs/common"),SIGNAL=_require140.SIGNAL;var IOProcess=require("../io-process");/**
 * HTTP IO Rename
 */var HTTPIORename=/*#__PURE__*/function(_IOProcess3){_inherits(HTTPIORename,_IOProcess3);var _super58=_createSuper(HTTPIORename);function HTTPIORename(){_classCallCheck(this,HTTPIORename);return _super58.call(this);}_createClass(HTTPIORename,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(HTTPIORename.prototype),"_Init",this).call(this);this._targetPath=null;}},{key:"targetPath",get:function get(){return this._targetPath;},set:function set(p_value){this._targetPath=PATH.FULL(p_value);}},{key:"Validate",value:function Validate(){if(!_get(_getPrototypeOf(HTTPIORename.prototype),"Validate",this).call(this)){return false;}var existing=this._resources.Get(PATH.SHORT(this._targetPath));if(existing&&existing!=this.rsc){this._OnError(new Error("Cannot rename resource from '".concat(this.rsc.path,"' to '").concat(this._targetPath,"' : destination already exists")));return false;}return true;}},{key:"Process",value:function Process(){this._OnStart();this._OnProgress(0);this._OnError(new Error("HTTP rename not supported."));}},{key:"_CleanUp",value:function _CleanUp(){this._targetPath=null;_get(_getPrototypeOf(HTTPIORename.prototype),"_CleanUp",this).call(this);}}]);return HTTPIORename;}(IOProcess);module.exports["default"]=module.exports=HTTPIORename;},{"../io-process":101,"@nkmjs/common":27,"@nkmjs/utils":268}],105:[function(require,module,exports){'use strict';var _require141=require("@nkmjs/utils"),U=_require141.U,PATH=_require141.PATH,MIME=_require141.MIME;var _require142=require("@nkmjs/common"),SIGNAL=_require142.SIGNAL;var IOProcess=require("../io-process");var BLOBResource=require("../resources/resource-blob");/**
 * HTTP IO Writer
 */var HTTPIOWriter=/*#__PURE__*/function(_IOProcess4){_inherits(HTTPIOWriter,_IOProcess4);var _super59=_createSuper(HTTPIOWriter);function HTTPIOWriter(){_classCallCheck(this,HTTPIOWriter);return _super59.call(this);}_createClass(HTTPIOWriter,[{key:"Process",value:function Process(){this._OnStart();this._OnProgress(0);try{var a=HTTPIOWriter.dlLink;a.download="".concat(PATH.name(this._operation.fullPath)).concat(ext);a.href=window.URL.createObjectURL(U.isInstanceOf(this.rsc.content,Blob)?this.rsc.content:new Blob([this.rsc.content],{type:"".concat(this.rsc.mime?this.rsc.mime.type:"text/plain")}));a.click();//hack much
this._OnSuccess();}catch(p_err){this._OnError(p_err);}}}],[{key:"dlLink",get:function get(){if(this.__a){return this.__a;}this.__a=document.createElement('a');this.__a.style.display='none';return this.__a;}}]);return HTTPIOWriter;}(IOProcess);module.exports["default"]=module.exports=HTTPIOWriter;},{"../io-process":101,"../resources/resource-blob":119,"@nkmjs/common":27,"@nkmjs/utils":268}],106:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={HTTPIOReader:require("./http-io-reader"),HTTPIOWriter:require("./http-io-writer"),HTTPIORename:require("./http-io-rename"),HTTPIODelete:require("./http-io-delete"),StorageIOReader:require("./storage-io-reader"),StorageIOWriter:require("./storage-io-writer"),StorageIORename:require("./storage-io-rename"),StorageIODelete:require("./storage-io-delete")};},{"./http-io-delete":102,"./http-io-reader":103,"./http-io-rename":104,"./http-io-writer":105,"./storage-io-delete":107,"./storage-io-reader":108,"./storage-io-rename":109,"./storage-io-writer":110}],107:[function(require,module,exports){'use strict';var _require143=require("@nkmjs/utils"),U=_require143.U,PATH=_require143.PATH;var _require144=require("@nkmjs/common"),SIGNAL=_require144.SIGNAL;var _require145=require("@nkmjs/environment"),ENV=_require145.ENV;var axios=require('axios');var IOProcess=require("../io-process");var ENCODING=require("../encoding");var StorageIODelete=/*#__PURE__*/function(_IOProcess5){_inherits(StorageIODelete,_IOProcess5);var _super60=_createSuper(StorageIODelete);function StorageIODelete(){_classCallCheck(this,StorageIODelete);return _super60.call(this);}_createClass(StorageIODelete,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(StorageIODelete.prototype),"_Init",this).call(this);this._Bind(this._OnStorageRemoved);}},{key:"Process",value:function Process(){this._OnStart();this._OnProgress(0);if(ENV.FEATURES.hasStorage){// Use chromium async storage (Chrome/Edge/Mozilla)
var _storage=ENV.FEATURES.storageArea;_storage.sync.remove(this._operation.fullPath,this._OnStorageRemoved);}else{// Use browser sync localStorage
try{localStorage.removeItem(this._operation.fullPath);this._OnProgress(1);this._OnSuccess();}catch(e){this._OnError(new Error("Key '".concat(this._operation.fullPath,"' is not set.")));}}}},{key:"_OnStorageRemoved",value:function _OnStorageRemoved(p_evt){this._OnProgress(1);this._OnSuccess();}}]);return StorageIODelete;}(IOProcess);module.exports["default"]=module.exports=StorageIODelete;},{"../encoding":100,"../io-process":101,"@nkmjs/common":27,"@nkmjs/environment":92,"@nkmjs/utils":268,"axios":123}],108:[function(require,module,exports){'use strict';var _require146=require("@nkmjs/utils"),U=_require146.U,PATH=_require146.PATH;var _require147=require("@nkmjs/common"),SIGNAL=_require147.SIGNAL;var _require148=require("@nkmjs/environment"),ENV=_require148.ENV;var axios=require('axios');var IOProcess=require("../io-process");var ENCODING=require("../encoding");var StorageIOReader=/*#__PURE__*/function(_IOProcess6){_inherits(StorageIOReader,_IOProcess6);var _super61=_createSuper(StorageIOReader);function StorageIOReader(){_classCallCheck(this,StorageIOReader);return _super61.call(this);}_createClass(StorageIOReader,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(StorageIOReader.prototype),"_Init",this).call(this);this._Bind(this._OnStorageRead);}},{key:"Process",value:function Process(){this._OnStart();this._OnProgress(0);if(ENV.FEATURES.hasStorage){// Use chromium async storage (Chrome/Edge/Mozilla)
var _storage2=ENV.FEATURES.storageArea;_storage2.sync.get(this._operation.fullPath,this._OnStorageRead);}else{// Use browser sync localStorage
var data=localStorage.getItem(this._operation.fullPath);if(!data){// Fail : data do not exists
this._OnError(new Error("Key '".concat(this._operation.fullPath,"' is not set.")));}else{// Success 
this._OnProgress(1);this.rsc.raw=data;this._OnSuccess();}}}},{key:"_OnStorageRead",value:function _OnStorageRead(p_evt){var data=p_data[this._operation.fullPath];if(U.isVoid(data)){// Data do not exists
this._OnError(new Error("Key '".concat(this._operation.fullPath,"' is not set.")));}else{// Data exists
this._OnProgress(1);this.rsc.raw=data;this._OnSuccess();}}},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(StorageIOReader.prototype),"_CleanUp",this).call(this);}}]);return StorageIOReader;}(IOProcess);module.exports["default"]=module.exports=StorageIOReader;},{"../encoding":100,"../io-process":101,"@nkmjs/common":27,"@nkmjs/environment":92,"@nkmjs/utils":268,"axios":123}],109:[function(require,module,exports){'use strict';var _require149=require("@nkmjs/utils"),U=_require149.U,PATH=_require149.PATH;var _require150=require("@nkmjs/common"),SIGNAL=_require150.SIGNAL;var _require151=require("@nkmjs/environment"),ENV=_require151.ENV;var IOProcess=require("../io-process");/**
 * HTTP IO Rename
 */var StorageIORename=/*#__PURE__*/function(_IOProcess7){_inherits(StorageIORename,_IOProcess7);var _super62=_createSuper(StorageIORename);function StorageIORename(){_classCallCheck(this,StorageIORename);return _super62.call(this);}_createClass(StorageIORename,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(StorageIORename.prototype),"_Init",this).call(this);this._targetPath=null;this._oldPath=null;}},{key:"targetPath",get:function get(){return this._targetPath;},set:function set(p_value){this._targetPath=p_value;}},{key:"Validate",value:function Validate(){if(!_get(_getPrototypeOf(StorageIORename.prototype),"Validate",this).call(this)){return false;}var existing=this._resources.Get(PATH.SHORT(this._targetPath));if(existing&&existing!=this.rsc){this._OnError(new Error("Cannot rename resource from '".concat(this._operation.fullPath,"' to '").concat(this._targetPath,"' : destination already exists")));return false;}return true;}},{key:"Process",value:function Process(){this._OnStart();this._OnProgress(0);this._oldPath=this._operation.fullPath;if(ENV.FEATURES.hasStorage){// Use chromium async storage (Chrome/Edge/Mozilla)
var _storage3=ENV.FEATURES.storageArea;_storage3.sync.get(this._targetPath,this._OnRenameExistsCheck);}else{// Use browser sync localStorage
var existingData=localStorage.getItem(this._targetPath);if(!existingData){// Success : data does not exists
localStorage.setItem(this._targetPath,localStorage.getItem(this._oldPath));localStorage.removeItem(this._oldPath);this._OnProgress(1);this._UpdatePath(this._targetPath);this._OnSuccess();}else{// Fail : data already exists
this._OnError(new Error("Can't rename '".concat(this._oldPath,"' to '").concat(this._targetPath,"' : data is already present.")));}}}/**
     * @access private
     */},{key:"_OnRenameExistsCheck",value:function _OnRenameExistsCheck(p_data){var data=p_data[this._oldPath];if(U.isVoid(data)){// Data do not exists !
var _storage4=ENV.FEATURES.storageArea,dataCopy={};dataCopy[this._targetPath]=data;_storage4.sync.set(dataCopy,this._OnRenameStorageWritten);}else{// Data exists
this._OnError(new Error("Can't rename '".concat(this._oldPath,"' to '").concat(this._targetPath,"' : data is already present.")));}}/**
     * @access private
     */},{key:"_OnRenameStorageWritten",value:function _OnRenameStorageWritten(p_data){if(!p_data){this._OnError(runtime.lastError);}else{this._OnProgress(0.5);storage.sync.remove(this._oldPath,this._OnRenameStorageOldDeleted);}}/**
     * @access private
     */},{key:"_OnRenameStorageOldDeleted",value:function _OnRenameStorageOldDeleted(p_data){if(!p_data){this._OnError(runtime.lastError);}else{this._OnProgress(1);this._UpdatePath(this._targetPath);this._OnSuccess();}}},{key:"_CleanUp",value:function _CleanUp(){this._targetPath=null;this._oldPath=null;_get(_getPrototypeOf(StorageIORename.prototype),"_CleanUp",this).call(this);}}]);return StorageIORename;}(IOProcess);module.exports["default"]=module.exports=StorageIORename;},{"../io-process":101,"@nkmjs/common":27,"@nkmjs/environment":92,"@nkmjs/utils":268}],110:[function(require,module,exports){'use strict';var _require152=require("@nkmjs/utils"),U=_require152.U,PATH=_require152.PATH,MIME=_require152.MIME;var _require153=require("@nkmjs/common"),SIGNAL=_require153.SIGNAL;var _require154=require("@nkmjs/environment"),ENV=_require154.ENV;var IOProcess=require("../io-process");/**
 * Browser IO Writer
 */var StorageIOWriter=/*#__PURE__*/function(_IOProcess8){_inherits(StorageIOWriter,_IOProcess8);var _super63=_createSuper(StorageIOWriter);function StorageIOWriter(){_classCallCheck(this,StorageIOWriter);return _super63.call(this);}_createClass(StorageIOWriter,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(StorageIOWriter.prototype),"_Init",this).call(this);}},{key:"Process",value:function Process(){this._OnStart();this._OnProgress(0);if(ENV.FEATURES.hasStorage){// Use chromium async storage (Chrome/Edge/Mozilla)
var _storage5=ENV.FEATURES.storageArea,data={};data[this._operation.fullPath]=this.rsc.raw;_storage5.sync.set(data,this._OnStorageWritten);}else{// Use browser sync localStorage
this._OnProgress(1);localStorage.setItem(this._operation.fullPath,this.rsc.raw);this._OnSuccess();}}},{key:"_OnStorageWritten",value:function _OnStorageWritten(p_data){if(!p_data){this._OnError(runtime.lastError);}else{this._OnProgress(1);this._OnSuccess();}}},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(StorageIOWriter.prototype),"_CleanUp",this).call(this);}}]);return StorageIOWriter;}(IOProcess);module.exports["default"]=module.exports=StorageIOWriter;},{"../io-process":101,"@nkmjs/common":27,"@nkmjs/environment":92,"@nkmjs/utils":268}],111:[function(require,module,exports){'use strict';var _require155=require("@nkmjs/utils"),U=_require155.U,PATH=_require155.PATH;var _require156=require("@nkmjs/common"),SIGNAL=_require156.SIGNAL,Observer=_require156.Observer,DisposableObjectEx=_require156.DisposableObjectEx;var _require157=require("@nkmjs/collections"),List=_require157.List;var IOQueue=/*#__PURE__*/function(_DisposableObjectEx20){_inherits(IOQueue,_DisposableObjectEx20);var _super64=_createSuper(IOQueue);function IOQueue(){_classCallCheck(this,IOQueue);return _super64.call(this);}_createClass(IOQueue,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(IOQueue.prototype),"_Init",this).call(this);this._queue=new List();this._currentItem=null;this._running=false;this._itemObserver=new Observer();this._itemObserver.Hook(SIGNAL.FAIL,this._OnCurrentRscProcessingFailed,this);this._itemObserver.Hook(SIGNAL.COMPLETE,this._OnCurrentRscProcessingComplete,this);}},{key:"running",get:function get(){return this._running;}},{key:"isEmpty",get:function get(){return this._queue.isEmpty;}},{key:"currentItem",get:function get(){return this._currentItem;},set:function set(p_value){if(this._currentItem===p_value){return;}var oldValue=this._currentItem;this._currentItem=p_value;if(oldValue){this._itemObserver.Unobserve(oldValue);}if(p_value){this._itemObserver.Observe(p_value);}}},{key:"Add",value:function Add(p_process){if(p_process===this._currentItem){return;}this._queue.Add(p_process);}},{key:"Remove",value:function Remove(p_process){if(p_process===this._currentItem){return;}this._queue.Remove(p_process);}},{key:"ProcessNext",value:function ProcessNext(){if(this._running){return;}this._running=true;this._currentItem=this._queue.Shift();if(!this._currentItem){this._running=false;return;}this._currentItem.Watch(SIGNAL.COMPLETE,this._OnCurrentItemComplete,this);if(this._currentItem.Validate()){this._currentItem.Process();}}},{key:"_OnCurrentItemComplete",value:function _OnCurrentItemComplete(p_item){this._running=false;this.ProcessNext();}},{key:"_CleanUp",value:function _CleanUp(){this._queue.Clear();_get(_getPrototypeOf(IOQueue.prototype),"_CleanUp",this).call(this);}}]);return IOQueue;}(DisposableObjectEx);module.exports["default"]=module.exports=IOQueue;},{"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/utils":268}],112:[function(require,module,exports){'use strict';var IO_SIGNAL=function IO_SIGNAL(){_classCallCheck(this,IO_SIGNAL);};_defineProperty(IO_SIGNAL,"RSC_REGISTERED",Symbol("rscRegistered"));_defineProperty(IO_SIGNAL,"RSC_UNREGISTERED",Symbol("rscUnregistered"));_defineProperty(IO_SIGNAL,"READ_START",Symbol("readStart"));_defineProperty(IO_SIGNAL,"READ_ERROR",Symbol("readError"));_defineProperty(IO_SIGNAL,"READ_PROGRESS",Symbol("readProgress"));_defineProperty(IO_SIGNAL,"READ_COMPLETE",Symbol("readComplete"));_defineProperty(IO_SIGNAL,"WRITE_STAR",Symbol("writeStart"));_defineProperty(IO_SIGNAL,"WRITE_ERROR",Symbol("writeError"));_defineProperty(IO_SIGNAL,"WRITE_PROGRESS",Symbol("writeProgress"));_defineProperty(IO_SIGNAL,"WRITE_COMPLETE",Symbol("writeComplete"));_defineProperty(IO_SIGNAL,"RENAME_START",Symbol("renameStart"));_defineProperty(IO_SIGNAL,"RENAME_ERROR",Symbol("renameError"));_defineProperty(IO_SIGNAL,"RENAME_PROGRESS",Symbol("renameProgress"));_defineProperty(IO_SIGNAL,"RENAME_COMPLETE",Symbol("renameComplete"));_defineProperty(IO_SIGNAL,"DELETE_START",Symbol("deleteStart"));_defineProperty(IO_SIGNAL,"DELETE_ERROR",Symbol("deleteError"));_defineProperty(IO_SIGNAL,"DELETE_PROGRESS",Symbol("deleteProgress"));_defineProperty(IO_SIGNAL,"DELETE_COMPLETE",Symbol("deleteComplete"));_defineProperty(IO_SIGNAL,"RENAMED",Symbol("renamed"));module.exports["default"]=module.exports=IO_SIGNAL;},{}],113:[function(require,module,exports){'use strict';var IO_TYPE=function IO_TYPE(){_classCallCheck(this,IO_TYPE);};_defineProperty(IO_TYPE,"DEFAULT","default");_defineProperty(IO_TYPE,"REMOTE","remote");_defineProperty(IO_TYPE,"LOCAL_STORAGE","local-storage");_defineProperty(IO_TYPE,"FILE_SYSTEM","file-system");module.exports["default"]=module.exports=IO_TYPE;},{}],114:[function(require,module,exports){'use strict';var _require158=require("@nkmjs/utils"),U=_require158.U,PATH=_require158.PATH;var _require159=require("@nkmjs/common"),SIGNAL=_require159.SIGNAL,DisposableObjectEx=_require159.DisposableObjectEx,SignalBox=_require159.SignalBox,Callbacks=_require159.Callbacks;var ResourceOperation=/*#__PURE__*/function(_DisposableObjectEx21){_inherits(ResourceOperation,_DisposableObjectEx21);var _super65=_createSuper(ResourceOperation);function ResourceOperation(){_classCallCheck(this,ResourceOperation);return _super65.call(this);}_createClass(ResourceOperation,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(ResourceOperation.prototype),"_Init",this).call(this);this._callbacks=new Callbacks();this._originalState=null;this._ioType=null;this._cancelled=false;this._fullPath=null;this._Reset();}},{key:"rsc",get:function get(){return this._rsc;},set:function set(p_value){if(U.isVoid(p_value)){p_value=this;}this._rsc=p_value;}},{key:"ioType",get:function get(){return this._ioType;}},{key:"fullPath",get:function get(){return this._fullPath;}},{key:"_Reset",value:function _Reset(){this._rsc=null;// Ressource
this._originalState=null;this._callbacks.Clear();this._states=null;this._ioType=null;this._fullPath=null;}/*

        operation.Start(
            this,
            {
                start:{ state:xxx, evt:xxx },
                progress:{ state:xxx, evt:xxx },
                error:{ state:xxx, evt:xxx },
                complete:{ state:xxx, evt:xxx },
                end:{ state:xxx, evt:xxx }
            },
            {
                success:fn,
                error:fn,
                any:fn
            });

    */ /**
     * @param {Resource} p_rsc
     * @param {function} p_fn
     * 
     * @param {object} p_states { state:xxx, evt:xxx, fn:xxx }
     * @param {object} p_states.prepare
     * @param {object} p_states.start
     * @param {object} p_states.progress
     * @param {object} p_states.error
     * @param {object} p_states.success
     * @param {object} p_states.end
     * 
     * @param {object} p_options
     * @param {function} p_callbacks.success
     * @param {function} p_callbacks.error
     * @param {function} p_callbacks.any
     * 
     * @param {array} args to be passed to p_fn
     */},{key:"Prepare",value:function Prepare(p_rsc,p_fn,p_states){var p_options=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;var args=arguments.length>4&&arguments[4]!==undefined?arguments[4]:[];this._cancelled=false;this._rsc=p_rsc;this._fullPath=PATH.FULL(p_rsc.path);this._ioType=U.Get(p_options,"io",null);this._callbacks.Add(p_options);this._states=p_states;this._originalState=this._rsc._state.currentState;this._rsc._state.currentState=this._states.prepare.state;args.unshift(this);p_fn.apply(null,args);}/**
     * Cancel the current operation
     */},{key:"Cancel",value:function Cancel(){//TODO : Implement cancelation in the IO process
this._cancelled=true;this._rsc._state.currentState=this._originalState;this.OnEnd();}},{key:"OnStart",value:function OnStart(){this._rsc._state.currentState=this._states.start;this._rsc._Broadcast(this._states.start.evt,this._rsc);if(this._states.start.fn){this._states.start.fn();}}},{key:"OnError",value:function OnError(p_err){if(this._states.error.fn){this._states.error.fn();}this._rsc._state.currentState=this._states.error.state;p_err.rsc=this._rsc;this._callbacks.OnErrorFlush(p_err);this._rsc._Broadcast(this._states.error.evt,this._rsc,p_err);this.OnEnd();}},{key:"OnProgress",value:function OnProgress(p_progress){if(this._states.progress.fn){this._states.progress.fn();}this._rsc._state.currentState=this._states.progress.state;this._rsc._Broadcast(this._states.progress.evt,this._rsc,p_progress);}},{key:"OnSuccess",value:function OnSuccess(){if(this._states.success.fn){this._states.success.fn();}this._rsc._state.currentState=this._states.success.state;this._callbacks.OnSuccessFlush(this._rsc);this._rsc._Broadcast(this._states.success.evt,this._rsc);this.OnEnd();}},{key:"OnEnd",value:function OnEnd(){if(this._rsc._operation===this){this._rsc._operation=null;}this.Release();}/**
     * @access protected
     */},{key:"_CleanUp",value:function _CleanUp(){this._Reset();_get(_getPrototypeOf(ResourceOperation.prototype),"_CleanUp",this).call(this);}}]);return ResourceOperation;}(DisposableObjectEx);module.exports["default"]=module.exports=ResourceOperation;},{"@nkmjs/common":27,"@nkmjs/utils":268}],115:[function(require,module,exports){'use strict';var _require160=require("@nkmjs/common"),StateBase=_require160.StateBase;var RESSOURCE_STATE=/*#__PURE__*/function(_StateBase){_inherits(RESSOURCE_STATE,_StateBase);var _super66=_createSuper(RESSOURCE_STATE);function RESSOURCE_STATE(){_classCallCheck(this,RESSOURCE_STATE);return _super66.call(this);}_createClass(RESSOURCE_STATE,null,[{key:"NONE",get:function get(){return RESSOURCE_STATE.GetOrCreate("none");}},{key:"READ_PENDING",get:function get(){return RESSOURCE_STATE.GetOrCreate("read-pending");}},{key:"READING",get:function get(){return RESSOURCE_STATE.GetOrCreate("reading");}},{key:"WRITE_PENDING",get:function get(){return RESSOURCE_STATE.GetOrCreate("write-pending");}},{key:"WRITING",get:function get(){return RESSOURCE_STATE.GetOrCreate("writing");}},{key:"RENAME_PENDING",get:function get(){return RESSOURCE_STATE.GetOrCreate("rename-pending");}},{key:"RENAMING",get:function get(){return RESSOURCE_STATE.GetOrCreate("renaming");}},{key:"DELETE_PENDING",get:function get(){return RESSOURCE_STATE.GetOrCreate("delete-pending");}},{key:"DELETING",get:function get(){return RESSOURCE_STATE.GetOrCreate("deleting");}},{key:"READY",get:function get(){return RESSOURCE_STATE.GetOrCreate("ready");}}]);return RESSOURCE_STATE;}(StateBase);module.exports["default"]=module.exports=RESSOURCE_STATE;},{"@nkmjs/common":27}],116:[function(require,module,exports){'use strict';var _require161=require("@nkmjs/utils"),U=_require161.U,PATH=_require161.PATH,MIME=_require161.MIME;var _require162=require("@nkmjs/common"),SIGNAL=_require162.SIGNAL,POOL=_require162.POOL,DisposableObjectEx=_require162.DisposableObjectEx,StateMachine=_require162.StateMachine,DisposableObject=_require162.DisposableObject,Callbacks=_require162.Callbacks;var IO_SIGNAL=require("./io-signal.js");var RESSOURCE_STATE=require("./resource-state");var ResourceOperation=require("./resource-operation");var RESPONSE_TYPE=require("./response-type.js");var Resource=/*#__PURE__*/function(_DisposableObjectEx22){_inherits(Resource,_DisposableObjectEx22);var _super67=_createSuper(Resource);function Resource(){_classCallCheck(this,Resource);return _super67.call(this);}_createClass(Resource,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Resource.prototype),"_Init",this).call(this);this._name=null;this._path=null;this._mime=null;this._type=this.constructor.defaultType;this._encoding=null;this._stats=null;this._exists=false;this._loaded=false;this._raw=null;this._content=null;this._directory=null;this._readFn=null;this._writeFn=null;this._deleteFn=null;this._renameFn=null;this._commitRnFn=null;this._deserializeFn=null;this._serializeFn=null;this._state=new StateMachine();this._state.currentState=RESSOURCE_STATE.NONE;this._state.owner=this;this._operation=null;this._releaseOnDeleteSuccess=false;this._readOperationConfig={prepare:{state:RESSOURCE_STATE.READ_PENDING},start:{state:RESSOURCE_STATE.READING,evt:IO_SIGNAL.READ_START},progress:{state:RESSOURCE_STATE.READING,evt:IO_SIGNAL.READ_PROGRESS},error:{state:RESSOURCE_STATE.NONE,evt:IO_SIGNAL.READ_ERROR},success:{state:RESSOURCE_STATE.READY,evt:IO_SIGNAL.READ_COMPLETE,fn:this._Bind(this._OnReadSuccess)}};this._writeOperationConfig={prepare:{state:RESSOURCE_STATE.WRITE_PENDING},start:{state:RESSOURCE_STATE.WRITING,evt:IO_SIGNAL.WRITE_START,fn:this._Bind(this._OnWriteStart)},progress:{state:RESSOURCE_STATE.WRITING,evt:IO_SIGNAL.WRITE_PROGRESS},error:{state:RESSOURCE_STATE.NONE,evt:IO_SIGNAL.WRITE_ERROR},success:{state:RESSOURCE_STATE.READY,evt:IO_SIGNAL.WRITE_COMPLETE}};this._renameOperationConfig={prepare:{state:RESSOURCE_STATE.RENAME_PENDING},start:{state:RESSOURCE_STATE.RENAMING,evt:IO_SIGNAL.RENAME_START},progress:{state:RESSOURCE_STATE.RENAMING,evt:IO_SIGNAL.RENAME_PROGRESS},error:{state:RESSOURCE_STATE.NONE,evt:IO_SIGNAL.RENAME_ERROR},success:{state:RESSOURCE_STATE.READY,evt:IO_SIGNAL.RENAME_COMPLETE}};this._deleteOperationConfig={prepare:{state:RESSOURCE_STATE.DELETE_PENDING},start:{state:RESSOURCE_STATE.DELETING,evt:IO_SIGNAL.DELETE_START},progress:{state:RESSOURCE_STATE.DELETING,evt:IO_SIGNAL.DELETE_PROGRESS},error:{state:RESSOURCE_STATE.NONE,evt:IO_SIGNAL.DELETE_ERROR},success:{state:RESSOURCE_STATE.READY,evt:IO_SIGNAL.DELETE_COMPLETE,fn:this._Bind(this._OnDeleteSuccess)}};}/**
     * @type {boolean}
     */},{key:"loaded",get:/**
     * @type {boolean}
     */function get(){return this._loaded;}},{key:"directory",get:/**
     * @type {Resource}
     */function get(){return this._directory;},set:function set(p_value){if(this._directory===p_value){return;}var oldDir=this._directory;this._directory=p_value;this._OnDirectoryChanged(oldDir);}},{key:"_OnDirectoryChanged",value:function _OnDirectoryChanged(p_oldValue){if(p_oldValue){p_oldValue.Remove(this);}if(this._directory){this._directory.Add(this);}}/**
     * @type {boolean}
     */},{key:"isDir",get:function get(){return false;}/**
     * @type {string}
     */},{key:"name",get:function get(){return this._name;}/**
     * @type {string}
     */},{key:"path",get:function get(){return this._path;},set:function set(p_value){if(this._path){throw new Error("Attempting to change the already set path of an rsc. Use Rename instead.");}this._path=p_value;this._UpdatePathInfos();}/**
     * @type {object}
     */},{key:"mime",get:function get(){return this._mime;},set:function set(p_value){this._mime=p_value;}/**
     * @type {string}
     */},{key:"type",get:function get(){return this._type;},set:function set(p_value){this._type=p_value;}/**
     * @type {string}
     */},{key:"encoding",get:function get(){return this._encoding;},set:function set(p_value){this._encoding=p_value;}/**
     * @type {RESSOURCE_STATE}
     */},{key:"state",get:function get(){return this._state.currentState;}/**
     * @type {object}
     */},{key:"stats",get:function get(){return this._stats;},set:function set(p_value){this._stats=p_value;}/**
     * @type {boolean}
     */},{key:"exists",get:function get(){return this._exists;},set:function set(p_value){this._exists=p_value;}},{key:"_UpdatePath",value:function _UpdatePath(p_newPath){var oldPath=this._path;this._path=p_newPath;this._UpdatePathInfos();this._commitRnFn(this,oldPath);this._OnPathUpdated(oldPath);this._Broadcast(IO_SIGNAL.RENAMED,this,oldPath);}},{key:"_OnPathUpdated",value:function _OnPathUpdated(p_oldPath){}},{key:"_UpdatePathInfos",value:function _UpdatePathInfos(){try{this._name=PATH.name(new URL(PATH.FULL(this._path)).pathname);}catch(err){this._name=PATH.name(this._path);}if(!this._mime){this._mime=MIME.Get(PATH.ext(this._path));}}/**
     * @type {*}
     */},{key:"raw",get:function get(){return this._raw;},set:function set(p_value){this._raw=p_value;}/**
     * @type {*}
     */},{key:"content",get:function get(){return this._content;},set:function set(p_value){this._content=p_value;}// ----> OPERATIONS
/**
     * 
     * @param {function} p_fn 
     * @param {object} p_states 
     * @param {object} p_options 
     * @param  {...any} args 
     */},{key:"_PrepareOperation",value:function _PrepareOperation(p_fn,p_states){var p_options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;if(this._state.IsNotAny(RESSOURCE_STATE.NONE,RESSOURCE_STATE.READY)){console.warn("Resource ".concat(this," not in a state allowing operation"));return false;}this._operation=POOL.Rent(ResourceOperation);for(var _len15=arguments.length,args=new Array(_len15>3?_len15-3:0),_key17=3;_key17<_len15;_key17++){args[_key17-3]=arguments[_key17];}this._operation.Prepare(this,p_fn,p_states,p_options,args);return true;}/**
     * Cancels the ongoing operation, if any
     */},{key:"CancelOperation",value:function CancelOperation(){if(this._operation){this._operation.Cancel();}}// ----> READ
/**
     * 
     * @param {object} p_options 
     * @param {string} p_options.io IO_TYPE
     * @param {function} p_options.success
     * @param {function} p_options.error
     * @param {function} p_options.any
     */},{key:"Read",value:function Read(){var p_options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;return this._PrepareOperation(this._readFn,this._readOperationConfig,p_options);}},{key:"_OnReadSuccess",value:function _OnReadSuccess(){this._loaded=true;this._content=this._Decode();}/**
     * @access protected
     * Deserialize is called by the IO system in order to get a readable 
     * version of the resource's content by the app.
     */},{key:"_Decode",value:function _Decode(){if(!this._deserializeFn){throw new Error("Deserialize not implemented in resource. If you don't use a serializer, make sure to set Resource._deserializeFn.");}return this._deserializeFn(this._raw,this);}// ----> WRITE
/**
     * 
     * @param {object} p_options 
     * @param {string} p_options.io IO_TYPE
     * @param {function} p_options.success
     * @param {function} p_options.error
     * @param {function} p_options.any
     */},{key:"Write",value:function Write(){var p_options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;return this._PrepareOperation(this._writeFn,this._writeOperationConfig,p_options);}},{key:"_OnWriteStart",value:function _OnWriteStart(){this._raw=this._Encode();}/**
     * @access protected
     * Serialize is called by the IO system in order to get a 'raw', 
     * writable version of the resource's content.
     */},{key:"_Encode",value:function _Encode(){if(!this._serializeFn){throw new Error("Serialize not implemented in resource. If you don't use a serializer, make sure to set Resource._serializeFn.");}return this._serializeFn(this._content,this);}// ----> RENAME
/**
     * @param {string} p_newPath 
     * @param {object} p_options 
     * @param {string} p_options.io IO_TYPE
     * @param {function} p_options.success
     * @param {function} p_options.error
     * @param {function} p_options.any
     */},{key:"Rename",value:function Rename(p_newPath){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;return this._PrepareOperation(this._renameFn,this._renameOperationConfig,p_options,p_newPath);}// ----> DELETE
/**
     * @param {object} p_options 
     * @param {string} p_options.io IO_TYPE
     * @param {function} p_options.success
     * @param {function} p_options.error
     * @param {function} p_options.any
     */},{key:"Delete",value:function Delete(){var p_options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;return this._PrepareOperation(this._deleteFn,this._deleteOperationConfig,p_options);}},{key:"DeleteAndRelease",value:function DeleteAndRelease(){this._releaseOnDeleteSuccess=true;return this._PrepareOperation(this._deleteFn,this._deleteOperationConfig,p_options);}},{key:"_OnDeleteSuccess",value:function _OnDeleteSuccess(){if(U.isInstanceOf(this._content,DisposableObject)){this._content.Release();}// this might be dangerous
this._content=null;this._raw=null;this._loaded=false;if(this._releaseOnDeleteSuccess){this.Release();}}// ----> Cleanup
},{key:"_CleanUp",value:function _CleanUp(){if(this._operation){this.CancelOperation();}this._operation=null;this._name=null;this._path=null;this._mime=null;this._type=this.constructor.defaultType;this._encoding=null;this._stats=null;this._exists=false;this._loaded=false;this._raw=null;this._content=null;this._readFn=null;this._writeFn=null;this._readFn=null;this._writeFn=null;this._deleteFn=null;this._renameFn=null;this._commitRnFn=null;this._deserializeFn=null;this._serializeFn=null;this._releaseOnDeleteSuccess=false;this._state.currentState=RESSOURCE_STATE.NONE;_get(_getPrototypeOf(Resource.prototype),"_CleanUp",this).call(this);}},{key:"toString",value:function toString(){return"[".concat(this.constructor.name,"::").concat(this.path,"]");}}]);return Resource;}(DisposableObjectEx);_defineProperty(Resource,"defaultType",RESPONSE_TYPE.TEXT);module.exports["default"]=module.exports=Resource;},{"./io-signal.js":112,"./resource-operation":114,"./resource-state":115,"./response-type.js":122,"@nkmjs/common":27,"@nkmjs/utils":268}],117:[function(require,module,exports){/**
 * This is the core facade for all system and apps.
 */'use strict';var _require163=require("@nkmjs/utils"),U=_require163.U,PATH=_require163.PATH;var _require164=require("@nkmjs/common"),SIGNAL=_require164.SIGNAL,POOL=_require164.POOL;var _require165=require("@nkmjs/collections"),Dictionary=_require165.Dictionary;var _require166=require("@nkmjs/services"),ServiceBase=_require166.ServiceBase;var IO_SIGNAL=require("./io-signal");var ENCODING=require("./encoding");var RESPONSE_TYPE=require("./response-type");var Resource=require("./resource");var Directory=require("./directory");var IOQueue=require("./io-queue");var _require167=require("./io-processes"),StorageIOReader=_require167.StorageIOReader,StorageIOWriter=_require167.StorageIOWriter,StorageIORename=_require167.StorageIORename,StorageIODelete=_require167.StorageIODelete,HTTPIOReader=_require167.HTTPIOReader,HTTPIOWriter=_require167.HTTPIOWriter,HTTPIORename=_require167.HTTPIORename,HTTPIODelete=_require167.HTTPIODelete;var IO_TYPE=require("./io-type");var ResourceOperation=require("./resource-operation");var IOProcess=require("./io-process");var RESOURCES=/*#__PURE__*/function(_ServiceBase3){_inherits(RESOURCES,_ServiceBase3);var _super68=_createSuper(RESOURCES);function RESOURCES(){_classCallCheck(this,RESOURCES);return _super68.call(this);}_createClass(RESOURCES,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(RESOURCES.prototype),"_Init",this).call(this);this._resources=new Dictionary();this._IOStatCheck=this._GetStats;this._io={};this._io[IO_TYPE.DEFAULT]={read:HTTPIOReader,write:HTTPIOWriter,rename:HTTPIORename,"delete":HTTPIODelete};this._io[IO_TYPE.REMOTE]={read:HTTPIOReader,write:HTTPIOWriter,rename:HTTPIORename,"delete":HTTPIODelete};this._io[IO_TYPE.LOCAL_STORAGE]={read:StorageIOReader,write:StorageIOWriter,rename:StorageIORename,"delete":StorageIODelete};this._IOQueue=new IOQueue();this._Bind(this._RequestRead);this._Bind(this._RequestWrite);this._Bind(this._RequestDelete);this._Bind(this._RequestRename);this._Bind(this._CommitRename);this._Bind(this._RequestRsc);}/**
     * 
     * @param {string} p_path 
     * @param {*} p_options
     * @param {*} p_options.cl
     * @param {string} p_options.encoding ENCODING
     * @param {string} p_options.type RESPONSE_TYPE
     * @returns {Resource}
     */},{key:"_GetStats",value:/**
     * Return system stats on a resource
     * @param {string} p_path 
     * @param {object} p_options
     */function _GetStats(p_path,p_options){return null;}/**
     * 
     * @param {*} p_path 
     * @returns {Resource|*}
     */},{key:"_TryGet",value:function _TryGet(p_path){return this._resources.Get(PATH.SHORT(p_path));}/**
     * 
     * @param {string} p_path 
     * @param {object} p_options
     * @param {*} p_options.cl Resource constructor
     * @param {string} p_options.encoding ENCODING
     * @param {string} p_options.type RESPONSE_TYPE
     * @returns {Resource}
     */},{key:"_Get",value:function _Get(p_path){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;//Rule of thumb : resources are mapped using SHRINKED path.
var shortPath=PATH.SHORT(p_path),rsc=this._resources.Get(shortPath);if(rsc){if(rscClass&&!U.isInstanceOf(rsc,rscClass)){throw new Error("Attempting to get an existing resource (".concat(rsc.constructor.name,") with a mismatching type(").concat(rscClass.name,")"));}return rsc;}var rscClass=U.Get(p_options,"cl",null),stats=null,fullPath=PATH.FULL(p_path);try{stats=this._GetStats(fullPath);}catch(err){stats=null;}if(!stats){if(!rscClass){rscClass=Resource;}}else if(stats.isDirectory()){if(rscClass&&!U.isInstanceOf(rscClass,Directory)){throw new Error("Directory cannot be assigned Resource constructor (".concat(rscClass.name,")"));}if(!rscClass){rscClass=Directory;}}else{if(!rscClass){rscClass=Resource;}}rsc=POOL.Rent(rscClass);/*
        if(rsc.isDir){
            console.log(`++/ ${p_path}`);
        }else{
            console.log(`+++ ${p_path}`);
        }
        */rsc.path=shortPath;rsc.encoding=U.Get(p_options,"encoding",ENCODING.UTF8);rsc.type=U.Get(p_options,"type",RESPONSE_TYPE.TEXT);rsc.stats=stats;rsc.exists=stats!=null;this._RegisterRsc(rsc);return rsc;}/**
     * @access protected
     * @param {Resource} p_rsc 
     */},{key:"_RegisterRsc",value:function _RegisterRsc(p_rsc){p_rsc._readFn=this._RequestRead;p_rsc._writeFn=this._RequestWrite;p_rsc._deleteFn=this._RequestDelete;p_rsc._renameFn=this._RequestRename;p_rsc._commitRnFn=this._CommitRename;if(p_rsc.isDir){p_rsc._requestRsc=this._RequestRsc;}p_rsc.Watch(SIGNAL.RELEASED,this._OnRscReleased,this);this._resources.Set(p_rsc.path,p_rsc);var dirPath=PATH.dir(p_rsc.path),dirRsc=this._resources.Get(dirPath);if(dirRsc&&dirRsc!=p_rsc){dirRsc.Add(p_rsc);}this._Broadcast(IO_SIGNAL.RSC_REGISTERED,p_rsc);}///
/**
     * @access protected
     * @param {string} p_ioId 
     * @param {ResourceOperation} p_operation 
     * @returns {string}
     */},{key:"_IOID",value:function _IOID(p_ioId,p_operation){if(U.isEmpty(p_ioId)||!(p_ioId in this._io)){return IO_TYPE.DEFAULT;}return p_ioId;}/**
     * @access protected
     * @param {ResourceOperation} p_operation 
     */},{key:"_RequestRead",value:function _RequestRead(p_operation){var ioProcess=POOL.Rent(this._io[this._IOID(p_operation.ioType,p_operation)].read);ioProcess.operation=p_operation;this._PushIOProcess(ioProcess);}/**
     * @access protected
     * @param {ResourceOperation} p_operation 
     */},{key:"_RequestWrite",value:function _RequestWrite(p_operation){var ioProcess=POOL.Rent(this._io[this._IOID(p_operation.ioType,p_operation)].write);ioProcess.operation=p_operation;this._PushIOProcess(ioProcess);}/**
     * @access protected
     * @param {ResourceOperation} p_operation 
     */},{key:"_RequestDelete",value:function _RequestDelete(p_operation){var ioProcess=POOL.Rent(this._io[this._IOID(p_operation.ioType,p_operation)]["delete"]);ioProcess.operation=p_operation;this._PushIOProcess(ioProcess);}/**
     * @access protected
     * @param {ResourceOperation} p_operation 
     * @param {string} p_newPath 
     */},{key:"_RequestRename",value:function _RequestRename(p_operation,p_newPath){var ioProcess=POOL.Rent(this._io[this._IOID(p_operation.ioType,p_operation)].rename);ioProcess.operation=p_operation;ioProcess.targetPath=p_newPath;this._PushIOProcess(ioProcess);}/**
     * @access protected
     * @param {IOProcess} p_ioProcess 
     */},{key:"_PushIOProcess",value:function _PushIOProcess(p_ioProcess){p_ioProcess._globalResourceMap=this._resources;this._IOQueue.Add(p_ioProcess);this._tick.Schedule();}/**
     * @access protected
     * @param {Resource} p_rsc 
     * @param {string} p_oldKey 
     */},{key:"_CommitRename",value:function _CommitRename(p_rsc,p_oldKey){this._resources.Remove(p_oldKey);var newPath=p_rsc.path;this._resources.Set(newPath,p_rsc);//Check if target directory is loaded
//and add the item if necessary
var dirPath=PATH.dir(newPath),dir=this._resources.Get(dirPath);if(dir){//If found, update directory
p_rsc.directory=dir;}else if(p_rsc.directory){//Otherwise, clear that resource directory
p_rsc.directory=null;}}/**
     * @access protected
     * @param {string} p_path 
     * @param {string} p_encoding 
     * @param {*} p_class 
     * @returns {Resource}
     */},{key:"_RequestRsc",value:function _RequestRsc(p_path){var p_encoding=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_class=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;return this._Get(p_path,p_encoding,p_class);}///
/**
     * @access protected
     * @param {Resource} p_rsc 
     */},{key:"_OnRscReleased",value:function _OnRscReleased(p_rsc){this._resources.Remove(p_rsc.path);this._Broadcast(IO_SIGNAL.RSC_UNREGISTERED,p_rsc);}},{key:"_Tick",value:function _Tick(p_delta){_get(_getPrototypeOf(RESOURCES.prototype),"_Tick",this).call(this,p_delta);this._UpdateQueue(this._IOQueue);}},{key:"_UpdateQueue",value:function _UpdateQueue(p_queue){if(!p_queue.isEmpty){this._tick.Schedule();}//TODO : This won't do
if(!p_queue.running&&!p_queue.isEmpty){p_queue.ProcessNext();}}}],[{key:"Get",value:function Get(p_path){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;return this.instance._Get(p_path,p_options);}/**
     * 
     * @param {string} p_path 
     * @returns {Resource|*}
     */},{key:"TryGet",value:function TryGet(p_path){return this.instance._TryGet(p_path);}/**
     * 
     * @param {string} p_path 
     * @returns {Directory}
     */},{key:"GetDir",value:function GetDir(p_path){return this.instance._Get(p_path,{cl:Directory});}}]);return RESOURCES;}(ServiceBase);module.exports["default"]=module.exports=RESOURCES;},{"./directory":99,"./encoding":100,"./io-process":101,"./io-processes":106,"./io-queue":111,"./io-signal":112,"./io-type":113,"./resource":116,"./resource-operation":114,"./response-type":122,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/services":150,"@nkmjs/utils":268}],118:[function(require,module,exports){'use strict';var _require168=require("@nkmjs/utils"),U=_require168.U,PATH=_require168.PATH;var _require169=require("@nkmjs/common"),SIGNAL=_require169.SIGNAL;var Resource=require("../resource");var RESPONSE_TYPE=require("../response-type");var BinaryResource=/*#__PURE__*/function(_Resource2){_inherits(BinaryResource,_Resource2);var _super69=_createSuper(BinaryResource);function BinaryResource(){_classCallCheck(this,BinaryResource);return _super69.call(this);}//TODO : Implement this
return BinaryResource;}(Resource);_defineProperty(BinaryResource,"defaultType",RESPONSE_TYPE.ARRAYBUFFER);module.exports["default"]=module.exports=BinaryResource;},{"../resource":116,"../response-type":122,"@nkmjs/common":27,"@nkmjs/utils":268}],119:[function(require,module,exports){'use strict';var _require170=require("@nkmjs/utils"),U=_require170.U,PATH=_require170.PATH;var _require171=require("@nkmjs/common"),SIGNAL=_require171.SIGNAL;var BinaryResource=require("./resource-text");var RESPONSE_TYPE=require("../response-type");var BlobResource=/*#__PURE__*/function(_BinaryResource){_inherits(BlobResource,_BinaryResource);var _super70=_createSuper(BlobResource);function BlobResource(){_classCallCheck(this,BlobResource);return _super70.call(this);}_createClass(BlobResource,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(BlobResource.prototype),"_Init",this).call(this);this._objectURL=null;}},{key:"objectURL",get:function get(){if(this._objectURL){return this._objectURL;}this._objectURL=URL.createObjectURL(this._content);}},{key:"_Encode",value:function _Encode(){if(U.isInstanceOf(this._content,Blob)){return this._content;}else if(this._mime){return new Blob([this._content],{type:this._mime.type});}else{return new Blob([this._content]);}}},{key:"_Decode",value:function _Decode(){this._objectURL=null;if(U.isInstanceOf(this._raw,Blob)){return this._raw;}else if(this._mime){return new Blob([this._raw],{type:this._mime.type});}else{return new Blob([this._raw]);}}},{key:"_CleanUp",value:function _CleanUp(){if(this._objectURL){URL.revokeObjectURL(this._objectURL);this._objectURL=null;}_get(_getPrototypeOf(BlobResource.prototype),"_CleanUp",this).call(this);}}]);return BlobResource;}(BinaryResource);_defineProperty(BlobResource,"defaultType",RESPONSE_TYPE.BLOB);module.exports["default"]=module.exports=BlobResource;},{"../response-type":122,"./resource-text":121,"@nkmjs/common":27,"@nkmjs/utils":268}],120:[function(require,module,exports){'use strict';var _require172=require("@nkmjs/utils"),U=_require172.U,PATH=_require172.PATH;var _require173=require("@nkmjs/common"),SIGNAL=_require173.SIGNAL;var TextResource=require("./resource-text");var RESPONSE_TYPE=require("../response-type");var JSONResource=/*#__PURE__*/function(_TextResource){_inherits(JSONResource,_TextResource);var _super71=_createSuper(JSONResource);function JSONResource(){_classCallCheck(this,JSONResource);return _super71.call(this);}_createClass(JSONResource,[{key:"_Encode",value:function _Encode(){return U.isObject(this._content)?JSON.stringify(this._content,null,"     "):"{}";}},{key:"_Decode",value:function _Decode(){return JSON.parse(_get(_getPrototypeOf(JSONResource.prototype),"_Decode",this).call(this));}}]);return JSONResource;}(TextResource);_defineProperty(JSONResource,"defaultType",RESPONSE_TYPE.JSON);module.exports["default"]=module.exports=JSONResource;},{"../response-type":122,"./resource-text":121,"@nkmjs/common":27,"@nkmjs/utils":268}],121:[function(require,module,exports){'use strict';var _require174=require("@nkmjs/utils"),U=_require174.U,PATH=_require174.PATH;var _require175=require("@nkmjs/common"),SIGNAL=_require175.SIGNAL;var Resource=require("../resource");var RESPONSE_TYPE=require("../response-type");var TextResource=/*#__PURE__*/function(_Resource3){_inherits(TextResource,_Resource3);var _super72=_createSuper(TextResource);function TextResource(){_classCallCheck(this,TextResource);return _super72.call(this);}_createClass(TextResource,[{key:"_Encode",value:function _Encode(){return this._content?this._content:'';}},{key:"_Decode",value:function _Decode(){if(U.isString(this._raw)){return this._raw;}else if(U.isArrayBuffer(this._raw)){var decoder=new TextDecoder(this._encoding);return decoder.decode(ArrayBuffer.isView(this._raw)?this._raw:new DataView(this._raw,0));}try{// Fallback to Blob, wrapped in try{} in case this code is
// executed in Node
var fileReader=new FileReaderSync();if(U.isInstanceOf(this._raw,Blob)){return fileReader.readAsString(this._raw,this._encoding);}else{return"";}}catch(e){return"";}}}]);return TextResource;}(Resource);_defineProperty(TextResource,"defaultType",RESPONSE_TYPE.TEXT);module.exports["default"]=module.exports=TextResource;},{"../resource":116,"../response-type":122,"@nkmjs/common":27,"@nkmjs/utils":268}],122:[function(require,module,exports){'use strict';var RESPONSE_TYPE=function RESPONSE_TYPE(){_classCallCheck(this,RESPONSE_TYPE);};_defineProperty(RESPONSE_TYPE,"TEXT",'text');_defineProperty(RESPONSE_TYPE,"ARRAYBUFFER",'arraybuffer');_defineProperty(RESPONSE_TYPE,"BLOB",'blob');_defineProperty(RESPONSE_TYPE,"DOCUMENT",'document');_defineProperty(RESPONSE_TYPE,"JSON",'json');module.exports["default"]=module.exports=RESPONSE_TYPE;},{}],123:[function(require,module,exports){module.exports=require('./lib/axios');},{"./lib/axios":125}],124:[function(require,module,exports){'use strict';var utils=require('./../utils');var settle=require('./../core/settle');var cookies=require('./../helpers/cookies');var buildURL=require('./../helpers/buildURL');var buildFullPath=require('../core/buildFullPath');var parseHeaders=require('./../helpers/parseHeaders');var isURLSameOrigin=require('./../helpers/isURLSameOrigin');var createError=require('../core/createError');module.exports=function xhrAdapter(config){return new Promise(function dispatchXhrRequest(resolve,reject){var requestData=config.data;var requestHeaders=config.headers;if(utils.isFormData(requestData)){delete requestHeaders['Content-Type'];// Let the browser set it
}var request=new XMLHttpRequest();// HTTP basic authentication
if(config.auth){var username=config.auth.username||'';var password=config.auth.password?unescape(encodeURIComponent(config.auth.password)):'';requestHeaders.Authorization='Basic '+btoa(username+':'+password);}var fullPath=buildFullPath(config.baseURL,config.url);request.open(config.method.toUpperCase(),buildURL(fullPath,config.params,config.paramsSerializer),true);// Set the request timeout in MS
request.timeout=config.timeout;// Listen for ready state
request.onreadystatechange=function handleLoad(){if(!request||request.readyState!==4){return;}// The request errored out and we didn't get a response, this will be
// handled by onerror instead
// With one exception: request that using file: protocol, most browsers
// will return status as 0 even though it's a successful request
if(request.status===0&&!(request.responseURL&&request.responseURL.indexOf('file:')===0)){return;}// Prepare the response
var responseHeaders='getAllResponseHeaders'in request?parseHeaders(request.getAllResponseHeaders()):null;var responseData=!config.responseType||config.responseType==='text'?request.responseText:request.response;var response={data:responseData,status:request.status,statusText:request.statusText,headers:responseHeaders,config:config,request:request};settle(resolve,reject,response);// Clean up request
request=null;};// Handle browser request cancellation (as opposed to a manual cancellation)
request.onabort=function handleAbort(){if(!request){return;}reject(createError('Request aborted',config,'ECONNABORTED',request));// Clean up request
request=null;};// Handle low level network errors
request.onerror=function handleError(){// Real errors are hidden from us by the browser
// onerror should only fire if it's a network error
reject(createError('Network Error',config,null,request));// Clean up request
request=null;};// Handle timeout
request.ontimeout=function handleTimeout(){var timeoutErrorMessage='timeout of '+config.timeout+'ms exceeded';if(config.timeoutErrorMessage){timeoutErrorMessage=config.timeoutErrorMessage;}reject(createError(timeoutErrorMessage,config,'ECONNABORTED',request));// Clean up request
request=null;};// Add xsrf header
// This is only done if running in a standard browser environment.
// Specifically not if we're in a web worker, or react-native.
if(utils.isStandardBrowserEnv()){// Add xsrf header
var xsrfValue=(config.withCredentials||isURLSameOrigin(fullPath))&&config.xsrfCookieName?cookies.read(config.xsrfCookieName):undefined;if(xsrfValue){requestHeaders[config.xsrfHeaderName]=xsrfValue;}}// Add headers to the request
if('setRequestHeader'in request){utils.forEach(requestHeaders,function setRequestHeader(val,key){if(typeof requestData==='undefined'&&key.toLowerCase()==='content-type'){// Remove Content-Type if data is undefined
delete requestHeaders[key];}else{// Otherwise add header to the request
request.setRequestHeader(key,val);}});}// Add withCredentials to request if needed
if(!utils.isUndefined(config.withCredentials)){request.withCredentials=!!config.withCredentials;}// Add responseType to request if needed
if(config.responseType){try{request.responseType=config.responseType;}catch(e){// Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
// But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
if(config.responseType!=='json'){throw e;}}}// Handle progress if needed
if(typeof config.onDownloadProgress==='function'){request.addEventListener('progress',config.onDownloadProgress);}// Not all browsers support upload events
if(typeof config.onUploadProgress==='function'&&request.upload){request.upload.addEventListener('progress',config.onUploadProgress);}if(config.cancelToken){// Handle cancellation
config.cancelToken.promise.then(function onCanceled(cancel){if(!request){return;}request.abort();reject(cancel);// Clean up request
request=null;});}if(!requestData){requestData=null;}// Send the request
request.send(requestData);});};},{"../core/buildFullPath":131,"../core/createError":132,"./../core/settle":136,"./../helpers/buildURL":140,"./../helpers/cookies":142,"./../helpers/isURLSameOrigin":145,"./../helpers/parseHeaders":147,"./../utils":149}],125:[function(require,module,exports){'use strict';var utils=require('./utils');var bind=require('./helpers/bind');var Axios=require('./core/Axios');var mergeConfig=require('./core/mergeConfig');var defaults=require('./defaults');/**
 * Create an instance of Axios
 *
 * @param {object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */function createInstance(defaultConfig){var context=new Axios(defaultConfig);var instance=bind(Axios.prototype.request,context);// Copy axios.prototype to instance
utils.extend(instance,Axios.prototype,context);// Copy context to instance
utils.extend(instance,context);return instance;}// Create the default instance to be exported
var axios=createInstance(defaults);// Expose Axios class to allow class inheritance
axios.Axios=Axios;// Factory for creating new instances
axios.create=function create(instanceConfig){return createInstance(mergeConfig(axios.defaults,instanceConfig));};// Expose Cancel & CancelToken
axios.Cancel=require('./cancel/Cancel');axios.CancelToken=require('./cancel/CancelToken');axios.isCancel=require('./cancel/isCancel');// Expose all/spread
axios.all=function all(promises){return Promise.all(promises);};axios.spread=require('./helpers/spread');// Expose isAxiosError
axios.isAxiosError=require('./helpers/isAxiosError');module.exports["default"]=module.exports=axios;// Allow use of default import syntax in TypeScript
module.exports["default"]=axios;},{"./cancel/Cancel":126,"./cancel/CancelToken":127,"./cancel/isCancel":128,"./core/Axios":129,"./core/mergeConfig":135,"./defaults":138,"./helpers/bind":139,"./helpers/isAxiosError":144,"./helpers/spread":148,"./utils":149}],126:[function(require,module,exports){'use strict';/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */function Cancel(message){this.message=message;}Cancel.prototype.toString=function toString(){return'Cancel'+(this.message?': '+this.message:'');};Cancel.prototype.__CANCEL__=true;module.exports=Cancel;},{}],127:[function(require,module,exports){'use strict';var Cancel=require('./Cancel');/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {function} executor The executor function.
 */function CancelToken(executor){if(typeof executor!=='function'){throw new TypeError('executor must be a function.');}var resolvePromise;this.promise=new Promise(function promiseExecutor(resolve){resolvePromise=resolve;});var token=this;executor(function cancel(message){if(token.reason){// Cancellation has already been requested
return;}token.reason=new Cancel(message);resolvePromise(token.reason);});}/**
 * Throws a `Cancel` if cancellation has been requested.
 */CancelToken.prototype.throwIfRequested=function throwIfRequested(){if(this.reason){throw this.reason;}};/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */CancelToken.source=function source(){var cancel;var token=new CancelToken(function executor(c){cancel=c;});return{token:token,cancel:cancel};};module.exports=CancelToken;},{"./Cancel":126}],128:[function(require,module,exports){'use strict';module.exports=function isCancel(value){return!!(value&&value.__CANCEL__);};},{}],129:[function(require,module,exports){'use strict';var utils=require('./../utils');var buildURL=require('../helpers/buildURL');var InterceptorManager=require('./InterceptorManager');var dispatchRequest=require('./dispatchRequest');var mergeConfig=require('./mergeConfig');/**
 * Create a new instance of Axios
 *
 * @param {object} instanceConfig The default config for the instance
 */function Axios(instanceConfig){this.defaults=instanceConfig;this.interceptors={request:new InterceptorManager(),response:new InterceptorManager()};}/**
 * Dispatch a request
 *
 * @param {object} config The config specific for this request (merged with this.defaults)
 */Axios.prototype.request=function request(config){/*eslint no-param-reassign:0*/ // Allow for axios('example/url'[, config]) a la fetch API
if(typeof config==='string'){config=arguments[1]||{};config.url=arguments[0];}else{config=config||{};}config=mergeConfig(this.defaults,config);// Set config.method
if(config.method){config.method=config.method.toLowerCase();}else if(this.defaults.method){config.method=this.defaults.method.toLowerCase();}else{config.method='get';}// Hook up interceptors middleware
var chain=[dispatchRequest,undefined];var promise=Promise.resolve(config);this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor){chain.unshift(interceptor.fulfilled,interceptor.rejected);});this.interceptors.response.forEach(function pushResponseInterceptors(interceptor){chain.push(interceptor.fulfilled,interceptor.rejected);});while(chain.length){promise=promise.then(chain.shift(),chain.shift());}return promise;};Axios.prototype.getUri=function getUri(config){config=mergeConfig(this.defaults,config);return buildURL(config.url,config.params,config.paramsSerializer).replace(/^\?/,'');};// Provide aliases for supported request methods
utils.forEach(['delete','get','head','options'],function forEachMethodNoData(method){/*eslint func-names:0*/Axios.prototype[method]=function(url,config){return this.request(mergeConfig(config||{},{method:method,url:url,data:(config||{}).data}));};});utils.forEach(['post','put','patch'],function forEachMethodWithData(method){/*eslint func-names:0*/Axios.prototype[method]=function(url,data,config){return this.request(mergeConfig(config||{},{method:method,url:url,data:data}));};});module.exports=Axios;},{"../helpers/buildURL":140,"./../utils":149,"./InterceptorManager":130,"./dispatchRequest":133,"./mergeConfig":135}],130:[function(require,module,exports){'use strict';var utils=require('./../utils');function InterceptorManager(){this.handlers=[];}/**
 * Add a new interceptor to the stack
 *
 * @param {function} fulfilled The function to handle `then` for a `Promise`
 * @param {function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {number} An ID used to remove interceptor later
 */InterceptorManager.prototype.use=function use(fulfilled,rejected){this.handlers.push({fulfilled:fulfilled,rejected:rejected});return this.handlers.length-1;};/**
 * Remove an interceptor from the stack
 *
 * @param {number} id The ID that was returned by `use`
 */InterceptorManager.prototype.eject=function eject(id){if(this.handlers[id]){this.handlers[id]=null;}};/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {function} fn The function to call for each interceptor
 */InterceptorManager.prototype.forEach=function forEach(fn){utils.forEach(this.handlers,function forEachHandler(h){if(h!==null){fn(h);}});};module.exports=InterceptorManager;},{"./../utils":149}],131:[function(require,module,exports){'use strict';var isAbsoluteURL=require('../helpers/isAbsoluteURL');var combineURLs=require('../helpers/combineURLs');/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */module.exports=function buildFullPath(baseURL,requestedURL){if(baseURL&&!isAbsoluteURL(requestedURL)){return combineURLs(baseURL,requestedURL);}return requestedURL;};},{"../helpers/combineURLs":141,"../helpers/isAbsoluteURL":143}],132:[function(require,module,exports){'use strict';var enhanceError=require('./enhanceError');/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {object} [request] The request.
 * @param {object} [response] The response.
 * @returns {Error} The created error.
 */module.exports=function createError(message,config,code,request,response){var error=new Error(message);return enhanceError(error,config,code,request,response);};},{"./enhanceError":134}],133:[function(require,module,exports){'use strict';var utils=require('./../utils');var transformData=require('./transformData');var isCancel=require('../cancel/isCancel');var defaults=require('../defaults');/**
 * Throws a `Cancel` if cancellation has been requested.
 */function throwIfCancellationRequested(config){if(config.cancelToken){config.cancelToken.throwIfRequested();}}/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */module.exports=function dispatchRequest(config){throwIfCancellationRequested(config);// Ensure headers exist
config.headers=config.headers||{};// Transform request data
config.data=transformData(config.data,config.headers,config.transformRequest);// Flatten headers
config.headers=utils.merge(config.headers.common||{},config.headers[config.method]||{},config.headers);utils.forEach(['delete','get','head','post','put','patch','common'],function cleanHeaderConfig(method){delete config.headers[method];});var adapter=config.adapter||defaults.adapter;return adapter(config).then(function onAdapterResolution(response){throwIfCancellationRequested(config);// Transform response data
response.data=transformData(response.data,response.headers,config.transformResponse);return response;},function onAdapterRejection(reason){if(!isCancel(reason)){throwIfCancellationRequested(config);// Transform response data
if(reason&&reason.response){reason.response.data=transformData(reason.response.data,reason.response.headers,config.transformResponse);}}return Promise.reject(reason);});};},{"../cancel/isCancel":128,"../defaults":138,"./../utils":149,"./transformData":137}],134:[function(require,module,exports){'use strict';/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {object} [request] The request.
 * @param {object} [response] The response.
 * @returns {Error} The error.
 */module.exports=function enhanceError(error,config,code,request,response){error.config=config;if(code){error.code=code;}error.request=request;error.response=response;error.isAxiosError=true;error.toJSON=function toJSON(){return{// Standard
message:this.message,name:this.name,// Microsoft
description:this.description,number:this.number,// Mozilla
fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,// Axios
config:this.config,code:this.code};};return error;};},{}],135:[function(require,module,exports){'use strict';var utils=require('../utils');/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {object} config1
 * @param {object} config2
 * @returns {object} New object resulting from merging config2 to config1
 */module.exports=function mergeConfig(config1,config2){// eslint-disable-next-line no-param-reassign
config2=config2||{};var config={};var valueFromConfig2Keys=['url','method','data'];var mergeDeepPropertiesKeys=['headers','auth','proxy','params'];var defaultToConfig2Keys=['baseURL','transformRequest','transformResponse','paramsSerializer','timeout','timeoutMessage','withCredentials','adapter','responseType','xsrfCookieName','xsrfHeaderName','onUploadProgress','onDownloadProgress','decompress','maxContentLength','maxBodyLength','maxRedirects','transport','httpAgent','httpsAgent','cancelToken','socketPath','responseEncoding'];var directMergeKeys=['validateStatus'];function getMergedValue(target,source){if(utils.isPlainObject(target)&&utils.isPlainObject(source)){return utils.merge(target,source);}else if(utils.isPlainObject(source)){return utils.merge({},source);}else if(utils.isArray(source)){return source.slice();}return source;}function mergeDeepProperties(prop){if(!utils.isUndefined(config2[prop])){config[prop]=getMergedValue(config1[prop],config2[prop]);}else if(!utils.isUndefined(config1[prop])){config[prop]=getMergedValue(undefined,config1[prop]);}}utils.forEach(valueFromConfig2Keys,function valueFromConfig2(prop){if(!utils.isUndefined(config2[prop])){config[prop]=getMergedValue(undefined,config2[prop]);}});utils.forEach(mergeDeepPropertiesKeys,mergeDeepProperties);utils.forEach(defaultToConfig2Keys,function defaultToConfig2(prop){if(!utils.isUndefined(config2[prop])){config[prop]=getMergedValue(undefined,config2[prop]);}else if(!utils.isUndefined(config1[prop])){config[prop]=getMergedValue(undefined,config1[prop]);}});utils.forEach(directMergeKeys,function merge(prop){if(prop in config2){config[prop]=getMergedValue(config1[prop],config2[prop]);}else if(prop in config1){config[prop]=getMergedValue(undefined,config1[prop]);}});var axiosKeys=valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);var otherKeys=Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key){return axiosKeys.indexOf(key)===-1;});utils.forEach(otherKeys,mergeDeepProperties);return config;};},{"../utils":149}],136:[function(require,module,exports){'use strict';var createError=require('./createError');/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {function} resolve A function that resolves the promise.
 * @param {function} reject A function that rejects the promise.
 * @param {object} response The response.
 */module.exports=function settle(resolve,reject,response){var validateStatus=response.config.validateStatus;if(!response.status||!validateStatus||validateStatus(response.status)){resolve(response);}else{reject(createError('Request failed with status code '+response.status,response.config,null,response.request,response));}};},{"./createError":132}],137:[function(require,module,exports){'use strict';var utils=require('./../utils');/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */module.exports=function transformData(data,headers,fns){/*eslint no-param-reassign:0*/utils.forEach(fns,function transform(fn){data=fn(data,headers);});return data;};},{"./../utils":149}],138:[function(require,module,exports){(function(process){(function(){'use strict';var utils=require('./utils');var normalizeHeaderName=require('./helpers/normalizeHeaderName');var DEFAULT_CONTENT_TYPE={'Content-Type':'application/x-www-form-urlencoded'};function setContentTypeIfUnset(headers,value){if(!utils.isUndefined(headers)&&utils.isUndefined(headers['Content-Type'])){headers['Content-Type']=value;}}function getDefaultAdapter(){var adapter;if(typeof XMLHttpRequest!=='undefined'){// For browsers use XHR adapter
adapter=require('./adapters/xhr');}else if(typeof process!=='undefined'&&Object.prototype.toString.call(process)==='[object process]'){// For node use HTTP adapter
adapter=require('./adapters/http');}return adapter;}var defaults={adapter:getDefaultAdapter(),transformRequest:[function transformRequest(data,headers){normalizeHeaderName(headers,'Accept');normalizeHeaderName(headers,'Content-Type');if(utils.isFormData(data)||utils.isArrayBuffer(data)||utils.isBuffer(data)||utils.isStream(data)||utils.isFile(data)||utils.isBlob(data)){return data;}if(utils.isArrayBufferView(data)){return data.buffer;}if(utils.isURLSearchParams(data)){setContentTypeIfUnset(headers,'application/x-www-form-urlencoded;charset=utf-8');return data.toString();}if(utils.isObject(data)){setContentTypeIfUnset(headers,'application/json;charset=utf-8');return JSON.stringify(data);}return data;}],transformResponse:[function transformResponse(data){/*eslint no-param-reassign:0*/if(typeof data==='string'){try{data=JSON.parse(data);}catch(e){/* Ignore */}}return data;}],/**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */timeout:0,xsrfCookieName:'XSRF-TOKEN',xsrfHeaderName:'X-XSRF-TOKEN',maxContentLength:-1,maxBodyLength:-1,validateStatus:function validateStatus(status){return status>=200&&status<300;}};defaults.headers={common:{'Accept':'application/json, text/plain, */*'}};utils.forEach(['delete','get','head'],function forEachMethodNoData(method){defaults.headers[method]={};});utils.forEach(['post','put','patch'],function forEachMethodWithData(method){defaults.headers[method]=utils.merge(DEFAULT_CONTENT_TYPE);});module.exports=defaults;}).call(this);}).call(this,require('_process'));},{"./adapters/http":124,"./adapters/xhr":124,"./helpers/normalizeHeaderName":146,"./utils":149,"_process":274}],139:[function(require,module,exports){'use strict';module.exports=function bind(fn,thisArg){return function wrap(){var args=new Array(arguments.length);for(var i=0;i<args.length;i++){args[i]=arguments[i];}return fn.apply(thisArg,args);};};},{}],140:[function(require,module,exports){'use strict';var utils=require('./../utils');function encode(val){return encodeURIComponent(val).replace(/%3A/gi,':').replace(/%24/g,'$').replace(/%2C/gi,',').replace(/%20/g,'+').replace(/%5B/gi,'[').replace(/%5D/gi,']');}/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */module.exports=function buildURL(url,params,paramsSerializer){/*eslint no-param-reassign:0*/if(!params){return url;}var serializedParams;if(paramsSerializer){serializedParams=paramsSerializer(params);}else if(utils.isURLSearchParams(params)){serializedParams=params.toString();}else{var parts=[];utils.forEach(params,function serialize(val,key){if(val===null||typeof val==='undefined'){return;}if(utils.isArray(val)){key=key+'[]';}else{val=[val];}utils.forEach(val,function parseValue(v){if(utils.isDate(v)){v=v.toISOString();}else if(utils.isObject(v)){v=JSON.stringify(v);}parts.push(encode(key)+'='+encode(v));});});serializedParams=parts.join('&');}if(serializedParams){var hashmarkIndex=url.indexOf('#');if(hashmarkIndex!==-1){url=url.slice(0,hashmarkIndex);}url+=(url.indexOf('?')===-1?'?':'&')+serializedParams;}return url;};},{"./../utils":149}],141:[function(require,module,exports){'use strict';/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */module.exports=function combineURLs(baseURL,relativeURL){return relativeURL?baseURL.replace(/\/+$/,'')+'/'+relativeURL.replace(/^\/+/,''):baseURL;};},{}],142:[function(require,module,exports){'use strict';var utils=require('./../utils');module.exports=utils.isStandardBrowserEnv()?// Standard browser envs support document.cookie
function standardBrowserEnv(){return{write:function write(name,value,expires,path,domain,secure){var cookie=[];cookie.push(name+'='+encodeURIComponent(value));if(utils.isNumber(expires)){cookie.push('expires='+new Date(expires).toGMTString());}if(utils.isString(path)){cookie.push('path='+path);}if(utils.isString(domain)){cookie.push('domain='+domain);}if(secure===true){cookie.push('secure');}document.cookie=cookie.join('; ');},read:function read(name){var match=document.cookie.match(new RegExp('(^|;\\s*)('+name+')=([^;]*)'));return match?decodeURIComponent(match[3]):null;},remove:function remove(name){this.write(name,'',Date.now()-86400000);}};}():// Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv(){return{write:function write(){},read:function read(){return null;},remove:function remove(){}};}();},{"./../utils":149}],143:[function(require,module,exports){'use strict';/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */module.exports=function isAbsoluteURL(url){// A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
// RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
// by any combination of letters, digits, plus, period, or hyphen.
return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);};},{}],144:[function(require,module,exports){'use strict';/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */module.exports=function isAxiosError(payload){return _typeof(payload)==='object'&&payload.isAxiosError===true;};},{}],145:[function(require,module,exports){'use strict';var utils=require('./../utils');module.exports=utils.isStandardBrowserEnv()?// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv(){var msie=/(msie|trident)/i.test(navigator.userAgent);var urlParsingNode=document.createElement('a');var originURL;/**
    * Parse a URL to discover it's components
    *
    * @param {string} url The URL to be parsed
    * @returns {object}
    */function resolveURL(url){var href=url;if(msie){// IE needs attribute set twice to normalize properties
urlParsingNode.setAttribute('href',href);href=urlParsingNode.href;}urlParsingNode.setAttribute('href',href);// urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
return{href:urlParsingNode.href,protocol:urlParsingNode.protocol?urlParsingNode.protocol.replace(/:$/,''):'',host:urlParsingNode.host,search:urlParsingNode.search?urlParsingNode.search.replace(/^\?/,''):'',hash:urlParsingNode.hash?urlParsingNode.hash.replace(/^#/,''):'',hostname:urlParsingNode.hostname,port:urlParsingNode.port,pathname:urlParsingNode.pathname.charAt(0)==='/'?urlParsingNode.pathname:'/'+urlParsingNode.pathname};}originURL=resolveURL(window.location.href);/**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {string} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */return function isURLSameOrigin(requestURL){var parsed=utils.isString(requestURL)?resolveURL(requestURL):requestURL;return parsed.protocol===originURL.protocol&&parsed.host===originURL.host;};}():// Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv(){return function isURLSameOrigin(){return true;};}();},{"./../utils":149}],146:[function(require,module,exports){'use strict';var utils=require('../utils');module.exports=function normalizeHeaderName(headers,normalizedName){utils.forEach(headers,function processHeader(value,name){if(name!==normalizedName&&name.toUpperCase()===normalizedName.toUpperCase()){headers[normalizedName]=value;delete headers[name];}});};},{"../utils":149}],147:[function(require,module,exports){'use strict';var utils=require('./../utils');// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf=['age','authorization','content-length','content-type','etag','expires','from','host','if-modified-since','if-unmodified-since','last-modified','location','max-forwards','proxy-authorization','referer','retry-after','user-agent'];/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {string} headers Headers needing to be parsed
 * @returns {object} Headers parsed into an object
 */module.exports=function parseHeaders(headers){var parsed={};var key;var val;var i;if(!headers){return parsed;}utils.forEach(headers.split('\n'),function parser(line){i=line.indexOf(':');key=utils.trim(line.substr(0,i)).toLowerCase();val=utils.trim(line.substr(i+1));if(key){if(parsed[key]&&ignoreDuplicateOf.indexOf(key)>=0){return;}if(key==='set-cookie'){parsed[key]=(parsed[key]?parsed[key]:[]).concat([val]);}else{parsed[key]=parsed[key]?parsed[key]+', '+val:val;}}});return parsed;};},{"./../utils":149}],148:[function(require,module,exports){'use strict';/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {function} callback
 * @returns {function}
 */module.exports=function spread(callback){return function wrap(arr){return callback.apply(null,arr);};};},{}],149:[function(require,module,exports){'use strict';var bind=require('./helpers/bind');/*global toString:true*/ // utils is a library of generic helper functions non-specific to axios
var toString=Object.prototype.toString;/**
 * Determine if a value is an Array
 *
 * @param {object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */function isArray(val){return toString.call(val)==='[object Array]';}/**
 * Determine if a value is undefined
 *
 * @param {object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */function isUndefined(val){return typeof val==='undefined';}/**
 * Determine if a value is a Buffer
 *
 * @param {object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */function isBuffer(val){return val!==null&&!isUndefined(val)&&val.constructor!==null&&!isUndefined(val.constructor)&&typeof val.constructor.isBuffer==='function'&&val.constructor.isBuffer(val);}/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */function isArrayBuffer(val){return toString.call(val)==='[object ArrayBuffer]';}/**
 * Determine if a value is a FormData
 *
 * @param {object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */function isFormData(val){return typeof FormData!=='undefined'&&val instanceof FormData;}/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */function isArrayBufferView(val){var result;if(typeof ArrayBuffer!=='undefined'&&ArrayBuffer.isView){result=ArrayBuffer.isView(val);}else{result=val&&val.buffer&&val.buffer instanceof ArrayBuffer;}return result;}/**
 * Determine if a value is a String
 *
 * @param {object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */function isString(val){return typeof val==='string';}/**
 * Determine if a value is a Number
 *
 * @param {object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */function isNumber(val){return typeof val==='number';}/**
 * Determine if a value is an Object
 *
 * @param {object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */function isObject(val){return val!==null&&_typeof(val)==='object';}/**
 * Determine if a value is a plain Object
 *
 * @param {object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */function isPlainObject(val){if(toString.call(val)!=='[object Object]'){return false;}var prototype=Object.getPrototypeOf(val);return prototype===null||prototype===Object.prototype;}/**
 * Determine if a value is a Date
 *
 * @param {object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */function isDate(val){return toString.call(val)==='[object Date]';}/**
 * Determine if a value is a File
 *
 * @param {object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */function isFile(val){return toString.call(val)==='[object File]';}/**
 * Determine if a value is a Blob
 *
 * @param {object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */function isBlob(val){return toString.call(val)==='[object Blob]';}/**
 * Determine if a value is a Function
 *
 * @param {object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */function isFunction(val){return toString.call(val)==='[object Function]';}/**
 * Determine if a value is a Stream
 *
 * @param {object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */function isStream(val){return isObject(val)&&isFunction(val.pipe);}/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */function isURLSearchParams(val){return typeof URLSearchParams!=='undefined'&&val instanceof URLSearchParams;}/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {string} str The String to trim
 * @returns {string} The String freed of excess whitespace
 */function trim(str){return str.replace(/^\s*/,'').replace(/\s*$/,'');}/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */function isStandardBrowserEnv(){if(typeof navigator!=='undefined'&&(navigator.product==='ReactNative'||navigator.product==='NativeScript'||navigator.product==='NS')){return false;}return typeof window!=='undefined'&&typeof document!=='undefined';}/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {function} fn The callback to invoke for each item
 */function forEach(obj,fn){// Don't bother if no value provided
if(obj===null||typeof obj==='undefined'){return;}// Force an array if not already something iterable
if(_typeof(obj)!=='object'){/*eslint no-param-reassign:0*/obj=[obj];}if(isArray(obj)){// Iterate over array values
for(var i=0,l=obj.length;i<l;i++){fn.call(null,obj[i],i,obj);}}else{// Iterate over object keys
for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){fn.call(null,obj[key],key,obj);}}}}/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {object} obj1 Object to merge
 * @returns {object} Result of all merge properties
 */function merge()/* obj1, obj2, obj3, ... */{var result={};function assignValue(val,key){if(isPlainObject(result[key])&&isPlainObject(val)){result[key]=merge(result[key],val);}else if(isPlainObject(val)){result[key]=merge({},val);}else if(isArray(val)){result[key]=val.slice();}else{result[key]=val;}}for(var i=0,l=arguments.length;i<l;i++){forEach(arguments[i],assignValue);}return result;}/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {object} a The object to be extended
 * @param {object} b The object to copy properties from
 * @param {object} thisArg The object to bind function to
 * @return {object} The resulting value of object a
 */function extend(a,b,thisArg){forEach(b,function assignValue(val,key){if(thisArg&&typeof val==='function'){a[key]=bind(val,thisArg);}else{a[key]=val;}});return a;}/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */function stripBOM(content){if(content.charCodeAt(0)===0xFEFF){content=content.slice(1);}return content;}module.exports={isArray:isArray,isArrayBuffer:isArrayBuffer,isBuffer:isBuffer,isFormData:isFormData,isArrayBufferView:isArrayBufferView,isString:isString,isNumber:isNumber,isObject:isObject,isPlainObject:isPlainObject,isUndefined:isUndefined,isDate:isDate,isFile:isFile,isBlob:isBlob,isFunction:isFunction,isStream:isStream,isURLSearchParams:isURLSearchParams,isStandardBrowserEnv:isStandardBrowserEnv,forEach:forEach,merge:merge,extend:extend,trim:trim,stripBOM:stripBOM};},{"./helpers/bind":139}],150:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={SERVICE_SIGNAL:require("./lib/service-signal"),SERVICE_STATE:require("./lib/service-state"),ServiceBase:require("./lib/service-base"),ServicesManager:require("./lib/services-manager")};},{"./lib/service-base":151,"./lib/service-signal":152,"./lib/service-state":153,"./lib/services-manager":154}],151:[function(require,module,exports){'use strict';var _require176=require("@nkmjs/utils"),LOG=_require176.LOG;var _require177=require("@nkmjs/common"),SingletonEx=_require177.SingletonEx,DelayedCall=_require177.DelayedCall;var ServicesManager=require("./services-manager");var ServiceBase=/*#__PURE__*/function(_SingletonEx6){_inherits(ServiceBase,_SingletonEx6);var _super73=_createSuper(ServiceBase);function ServiceBase(){_classCallCheck(this,ServiceBase);return _super73.call(this);}/**
     * @access protected
     */_createClass(ServiceBase,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(ServiceBase.prototype),"_Init",this).call(this);this._initialized=false;this._started=false;this._running=false;this._tick=new DelayedCall(this._Bind(this._Tick));}},{key:"Initialize",value:function Initialize(){if(this._initialized){return;}ServicesManager.instance.Register(this);this._initialized=true;}},{key:"InitializeAndStart",value:function InitializeAndStart(){this.Initialize();this.Start();}},{key:"started",get:function get(){return this._started;}},{key:"running",get:function get(){return this._running;}},{key:"Start",value:function Start(){if(!this._initialized){console.error("Attempting to start a service (".concat(this.constructor.name,") that hasn't been initialized yet."));return false;}if(this._started){return false;}this._started=true;LOG._("STARTED :\xB7 ".concat(this.constructor.name),"#add800","#2e3a00");return true;}},{key:"Stop",value:function Stop(){if(!this._started){return;}this._started=false;LOG._("STOPPED :: ".concat(this.constructor.name),"#ef8700","#492900");}},{key:"Restart",value:function Restart(){}},{key:"_Tick",value:function _Tick(p_delta){}}]);return ServiceBase;}(SingletonEx);module.exports["default"]=module.exports=ServiceBase;},{"./services-manager":154,"@nkmjs/common":27,"@nkmjs/utils":268}],152:[function(require,module,exports){'use strict';var SERVICE_STATE=require("./service-state");var SERVICE_SIGNAL=/*#__PURE__*/function(){function SERVICE_SIGNAL(){_classCallCheck(this,SERVICE_SIGNAL);}_createClass(SERVICE_SIGNAL,null,[{key:"UNINITIALIZED",get:function get(){return SERVICE_STATE.UNINITIALIZED;}},{key:"INITIALIZING",get:function get(){return SERVICE_STATE.INITIALIZING;}},{key:"INITIALIZED",get:function get(){return SERVICE_STATE.INITIALIZED;}},{key:"STARTING",get:function get(){return SERVICE_STATE.STARTING;}},{key:"STARTED",get:function get(){return SERVICE_STATE.STARTED;}},{key:"STOPPING",get:function get(){return SERVICE_STATE.STOPPING;}},{key:"STOPPED",get:function get(){return SERVICE_STATE.STOPPED;}}]);return SERVICE_SIGNAL;}();module.exports["default"]=module.exports=SERVICE_SIGNAL;},{"./service-state":153}],153:[function(require,module,exports){'use strict';var _require178=require("@nkmjs/common"),StateBase=_require178.StateBase;var SERVICE_STATE=/*#__PURE__*/function(_StateBase2){_inherits(SERVICE_STATE,_StateBase2);var _super74=_createSuper(SERVICE_STATE);function SERVICE_STATE(){_classCallCheck(this,SERVICE_STATE);return _super74.call(this);}_createClass(SERVICE_STATE,null,[{key:"UNINITIALIZED",get:function get(){return SERVICE_STATE.GetOrCreate("uninitialized");}},{key:"INITIALIZING",get:function get(){return SERVICE_STATE.GetOrCreate("initializing");}},{key:"INITIALIZED",get:function get(){return SERVICE_STATE.GetOrCreate("initialized");}},{key:"STARTING",get:function get(){return SERVICE_STATE.GetOrCreate("starting");}},{key:"STARTED",get:function get(){return SERVICE_STATE.GetOrCreate("started");}},{key:"STOPPING",get:function get(){return SERVICE_STATE.GetOrCreate("stopping");}},{key:"STOPPED",get:function get(){return SERVICE_STATE.GetOrCreate("stopped");}}]);return SERVICE_STATE;}(StateBase);module.exports["default"]=module.exports=SERVICE_STATE;},{"@nkmjs/common":27}],154:[function(require,module,exports){'use strict';var _require179=require("@nkmjs/collections"),List=_require179.List;var _require180=require("@nkmjs/common"),TIME=_require180.TIME,SingletonEx=_require180.SingletonEx;var ServicesManager=/*#__PURE__*/function(_SingletonEx7){_inherits(ServicesManager,_SingletonEx7);var _super75=_createSuper(ServicesManager);function ServicesManager(){_classCallCheck(this,ServicesManager);return _super75.call(this);}/**
     * @access protected
     */_createClass(ServicesManager,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(ServicesManager.prototype),"_Init",this).call(this);this._services=new List();}/**
     * @access protected
     */},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(ServicesManager.prototype),"_PostInit",this).call(this);}},{key:"Boot",value:function Boot(){}},{key:"Register",value:function Register(p_instance){this._services.Add(p_instance.constructor);}}]);return ServicesManager;}(SingletonEx);module.exports["default"]=module.exports=ServicesManager;},{"@nkmjs/collections":21,"@nkmjs/common":27}],155:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={FONT_FLAG:require("./lib/font-flag"),ColorBase:require("./lib/colors/color-base"),RGBA:require("./lib/colors/rgba"),HSLA:require("./lib/colors/hsla"),COLOR:require("./lib/colors/color"),CSS:require("./lib/css"),STYLE:require("./lib/style"),Palette:require("./lib/palette"),PaletteBuilder:require("./lib/palette-builder")};},{"./lib/colors/color":157,"./lib/colors/color-base":156,"./lib/colors/hsla":158,"./lib/colors/rgba":159,"./lib/css":160,"./lib/font-flag":162,"./lib/palette":164,"./lib/palette-builder":163,"./lib/style":165}],156:[function(require,module,exports){'use strict';var ColorBase=function ColorBase(){_classCallCheck(this,ColorBase);};module.exports["default"]=module.exports=ColorBase;},{}],157:[function(require,module,exports){'use strict';var _require181=require("@nkmjs/utils"),U=_require181.U;var _HSLA=require("./hsla");var _RGBA=require("./rgba");var COLOR=/*#__PURE__*/function(){function COLOR(){_classCallCheck(this,COLOR);}_createClass(COLOR,null,[{key:"HSLA",value:function HSLA(){var h=arguments.length>0&&arguments[0]!==undefined?arguments[0]:360;var s=arguments.length>1&&arguments[1]!==undefined?arguments[1]:100;var l=arguments.length>2&&arguments[2]!==undefined?arguments[2]:100;var a=arguments.length>3&&arguments[3]!==undefined?arguments[3]:1;return new _HSLA(h,s,l,a);}},{key:"RGBA",value:function RGBA(){var r=arguments.length>0&&arguments[0]!==undefined?arguments[0]:255;var g=arguments.length>1&&arguments[1]!==undefined?arguments[1]:255;var b=arguments.length>2&&arguments[2]!==undefined?arguments[2]:255;var a=arguments.length>3&&arguments[3]!==undefined?arguments[3]:1;return new _RGBA(r,g,b,a);}},{key:"RGBAtoHSLA",value:function RGBAtoHSLA(p_rgba){// Find greatest and smallest channel values
var r=p_rgba.r,g=p_rgba.g,b=p_rgba.b,cmin=Math.min(r,g,b),cmax=Math.max(r,g,b),delta=cmax-cmin,h=0,s=0,l=0;// Calculate hue
// No difference
if(delta===0){h=0;}else if(cmax===r){h=(g-b)/delta%6;}// Red is max
else if(cmax===g){h=(b-r)/delta+2;}// Green is max
else{h=(r-g)/delta+4;}// Blue is max
h=Math.round(h*60);// Make negative hues positive behind 360°
if(h<0){h+=360;}// Calculate lightness
l=(cmax+cmin)/2;// Calculate saturation
s=delta===0?0:delta/(1-Math.abs(2*l-1));// Multiply l and s by 100
s=+(s*100).toFixed(1);l=+(l*100).toFixed(1);return new _HSLA(h,s,l,p_rgba.a);}},{key:"HSLAtoRGBA",value:function HSLAtoRGBA(p_hsla){var h=p_hsla.h,s=p_hsla.s,l=p_hsla.l,c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs(h/60%2-1)),m=l-c/2,r=0,g=0,b=0;if(0<=h&&h<60){r=c;g=x;b=0;}else if(60<=h&&h<120){r=x;g=c;b=0;}else if(120<=h&&h<180){r=0;g=c;b=x;}else if(180<=h&&h<240){r=0;g=x;b=c;}else if(240<=h&&h<300){r=x;g=0;b=c;}else if(300<=h&&h<360){r=c;g=0;b=x;}r=Math.round((r+m)*255);g=Math.round((g+m)*255);b=Math.round((b+m)*255);return new _RGBA(r,g,b,p_hsla.a);}}]);return COLOR;}();module.exports["default"]=module.exports=COLOR;},{"./hsla":158,"./rgba":159,"@nkmjs/utils":268}],158:[function(require,module,exports){'use strict';var ColorBase=require("./color-base");var HSLA=/*#__PURE__*/function(_ColorBase){_inherits(HSLA,_ColorBase);var _super76=_createSuper(HSLA);/**
     * 
     * @param {number} p_h 0-360
     * @param {number} p_s 0-100
     * @param {number} p_l 0-100
     * @param {number} p_a 0-1
     */function HSLA(){var _this7;var p_h=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var p_s=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var p_l=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;var p_a=arguments.length>3&&arguments[3]!==undefined?arguments[3]:1;_classCallCheck(this,HSLA);_this7=_super76.call(this);_this7._H=p_h;_this7._S=p_s;_this7._L=p_l;_this7._a=p_a;return _this7;}/**
     * 
     * @param {number} p_h 0-360
     * @param {number} p_s 0-100
     * @param {number} p_l 0-100
     * @param {number} p_a 0-1
     * @returns {HSLA} self
     */_createClass(HSLA,[{key:"Set",value:function Set(){var p_h=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var p_s=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var p_l=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;var p_a=arguments.length>3&&arguments[3]!==undefined?arguments[3]:1;this._H=p_h;this._S=p_s;this._L=p_l;this._a=p_a;return this;}},{key:"H",get:function get(){return this._H;},set:function set(p_value){this._H=p_value;}},{key:"h",get:function get(){return this._H/360;},set:function set(p_value){this._H=p_value*360;}},{key:"S",get:function get(){return this._S;},set:function set(p_value){this._S=p_value;}},{key:"s",get:function get(){return this._S/100;},set:function set(p_value){this._S=p_value*100;}},{key:"L",get:function get(){return this._L;},set:function set(p_value){this._L=p_value;}},{key:"l",get:function get(){return this._L/100;},set:function set(p_value){this._L=p_value*100;}},{key:"A",get:function get(){return this._a*255;},set:function set(p_value){this._a=p_value/255;}},{key:"a",get:function get(){return this._a;},set:function set(p_value){this._a=p_value;}},{key:"hsl",get:function get(){return"hsl(".concat(this._H,",").concat(this._S,"%,").concat(this._L,"%)");}},{key:"hsla",get:function get(){return"hsla(".concat(this._H,",").concat(this._S,"%,").concat(this._L,"%,").concat(this._a,")");}},{key:"toString",value:function toString(){return this.hsla;}}],[{key:"hex",value:/**
     * 
     * @param {string} p_hex #FFFFFF
     * @returns {HSLA} New HSLA
     */function hex(p_hex){var color=new HSLA();color.hex=p_hex;return color;}/**
     * 
     * @param {number} p_h 0-360
     * @param {number} p_s 0-100
     * @param {number} p_l 0-100
     * @param {number} p_a 0-1
     * @returns {HSLA} New HSLA
     */},{key:"Get",value:function Get(){var p_h=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var p_s=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var p_l=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;var p_a=arguments.length>3&&arguments[3]!==undefined?arguments[3]:1;var color=new HSLA();color.R=p_h;color.G=p_s;color.B=p_l;color.a=p_a;return color;}}]);return HSLA;}(ColorBase);module.exports["default"]=module.exports=HSLA;},{"./color-base":156}],159:[function(require,module,exports){'use strict';var ColorBase=require("./color-base");var RGBA=/*#__PURE__*/function(_ColorBase2){_inherits(RGBA,_ColorBase2);var _super77=_createSuper(RGBA);/**
     * 
     * @param {number} p_r 0-255
     * @param {number} p_g 0-255
     * @param {number} p_b 0-255
     * @param {number} p_a 0-1
     */function RGBA(){var _this8;var p_r=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var p_g=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var p_b=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;var p_a=arguments.length>3&&arguments[3]!==undefined?arguments[3]:1;_classCallCheck(this,RGBA);_this8=_super77.call(this);_this8._R=p_r;_this8._G=p_g;_this8._B=p_b;_this8._a=p_a;return _this8;}/**
     * 
     * @param {number} p_r 0-255
     * @param {number} p_g 0-255
     * @param {number} p_b 0-255
     * @param {number} p_a 0-1
     * @returns {RGBA} self
     */_createClass(RGBA,[{key:"Set",value:function Set(){var p_r=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var p_g=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var p_b=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;var p_a=arguments.length>3&&arguments[3]!==undefined?arguments[3]:1;this._R=p_r;this._G=p_g;this._B=p_b;this._a=p_a;return this;}},{key:"R",get:function get(){return this._R;},set:function set(p_value){this._R=p_value;}},{key:"r",get:function get(){return this._R/255;},set:function set(p_value){this._R=p_value*255;}},{key:"G",get:function get(){return this._G;},set:function set(p_value){this._G=p_value;}},{key:"g",get:function get(){return this._G/255;},set:function set(p_value){this._G=p_value*255;}},{key:"B",get:function get(){return this._B;},set:function set(p_value){this._B=p_value;}},{key:"b",get:function get(){return this._B/255;},set:function set(p_value){this._B=p_value*255;}},{key:"A",get:function get(){return this._a*255;},set:function set(p_value){this._a=p_value/255;}},{key:"a",get:function get(){return this._a;},set:function set(p_value){this._a=p_value;}},{key:"hex",get:function get(){var p_r=this._R.toString(16);p_r=p_r.length===1?"0"+p_r:p_r;var p_g=this._G.toString(16);p_g=p_g.length===1?"0"+p_g:p_g;var p_b=this._B.toString(16);p_b=p_b.length===1?"0"+p_b:p_b;return"#".concat(p_r).concat(p_g).concat(p_b);},set:function set(p_value){var result=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(p_value);if(result){this._R=parseInt(result[1],16);this._G=parseInt(result[2],16);this._B=parseInt(result[3],16);}else{this._R=0;this._G=0;this._B=0;}}},{key:"hexa",get:function get(){var p_r=this._R.toString(16);p_r=p_r.length===1?"0"+p_r:p_r;var p_g=this._G.toString(16);p_g=p_g.length===1?"0"+p_g:p_g;var p_b=this._B.toString(16);p_b=p_b.length===1?"0"+p_b:p_b;var p_a=this.A.toString(16);p_a=p_a.length===1?"0"+p_a:p_a;return"#".concat(p_r).concat(p_g).concat(p_b).concat(p_a);},set:function set(p_value){var result=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(p_value);if(result){this._R=parseInt(result[1],16);this._G=parseInt(result[2],16);this._B=parseInt(result[3],16);this._a=parseInt(result[4],16)/255;}else{this._R=0;this._G=0;this._B=0;this._a=0;}}},{key:"rgb",get:function get(){return"rgb(".concat(this._R,",").concat(this._G,",").concat(this._B,")");}},{key:"rgba",get:function get(){return"rgba(".concat(this._R,",").concat(this._G,",").concat(this._B,",").concat(this._a,")");}},{key:"toString",value:function toString(){return this.rgba;}}],[{key:"hex",value:/**
     * 
     * @param {string} p_hex #FFFFFF
     * @returns {RGBA} New RGBA
     */function hex(p_hex){var color=new RGBA();color.hex=p_hex;return color;}/**
     * 
     * @param {number} p_r 0-255
     * @param {number} p_g 0-255
     * @param {number} p_b 0-255
     * @param {number} p_a 0-1
     * @returns {RGBA} New RGBA
     */},{key:"Get",value:function Get(){var p_r=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var p_g=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var p_b=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;var p_a=arguments.length>3&&arguments[3]!==undefined?arguments[3]:1;var color=new RGBA();color.R=p_r;color.G=p_g;color.B=p_b;color.a=p_a;return color;}}]);return RGBA;}(ColorBase);module.exports["default"]=module.exports=RGBA;},{"./color-base":156}],160:[function(require,module,exports){'use strict';var _require182=require("@nkmjs/utils"),U=_require182.U,UDOM=_require182.UDOM;var _require183=require("@nkmjs/common"),Singleton=_require183.Singleton;var __media="@media ";var _CSS=/*#__PURE__*/function(_Singleton3){_inherits(CSS,_Singleton3);var _super78=_createSuper(CSS);function CSS(){_classCallCheck(this,CSS);return _super78.call(this);}/**
     * Return an HTMLElement formatted as
     * <style> import url("path") </style>
     * @param {string} p_import_path 
     */_createClass(CSS,null,[{key:"CSSImport",value:function CSSImport(p_import_path){var element=UDOM.New("style",{type:"text/css"});element.innerText="@import url(\"".concat(p_import_path,"\")");return element;}/**
     * Return a CSS style element formatted as
     * <style> id{ prop:value; } </style>
     * @param {Object|string} p_properties 
     * @returns {Element}
     */},{key:"Style",value:function Style(p_properties){var element=UDOM.New("style");var css=null;if(U.IsString(p_properties)){css=p_properties;}else{css="";if(p_properties!=null&&p_properties!=undefined){for(var att in p_properties){css+=_CSS.CSS(att,p_properties[att]);}}}element.innerText=css;return element;}/**
     * Return a CSS string formatted as
     * id{ prop:value; }
     * @param {string} p_id 
     * @param {object} p_properties 
     * @returns {string}
     */},{key:"CSS",value:function CSS(p_id,p_properties){if(!U.isObject(p_properties)){return"";}if(p_id.indexOf(__media)===0){var css="";for(var p in p_properties){css+=_CSS.CSS(p,p_properties[p]);}return"".concat(p_id,"{").concat(css,"}");}else{return"".concat(p_id,"{").concat(_CSS.InlineCSS(p_properties),"}");}}/**
     * Return an inline CSS string formatted as
     * prop:value;
     * @param {string} p_id 
     * @param {object} p_properties 
     * @returns {string}
     */},{key:"InlineCSS",value:function InlineCSS(p_properties){if(!U.isObject(p_properties)){return"";}var css="";if(p_properties!=null&&p_properties!=undefined){for(var att in p_properties){css+="".concat(att,":").concat(p_properties[att],";");}}return css;}/**
     * Overwrites properties in base with copies of value in source
     * @param {*} p_base 
     * @param {*} p_source 
     */},{key:"Merge",value:function Merge(p_base,p_source){if(!p_base){return JSON.parse(JSON.stringify(p_source));}for(var name in p_source){var baseValue=p_base[name],sourceValue=p_source[name];// For each property in p_source, add it to p_base and either overwrite or merge.
if(name in p_base){if(U.isArray(sourceValue)){if(sourceValue[0]===null){//first value is null, remove previous values
var arrCopy=_toConsumableArray(sourceValue);arrCopy.unshift();//remove null
p_base[name]=arrCopy;}else{if(U.isArray(baseValue)){//Append values at the end of existing array
for(var i=0,n=sourceValue.length;i<n;i++){var itemValue=sourceValue[i];if(!baseValue.includes(itemValue)){baseValue.push(itemValue);}}}else{//Copy array
p_base[name]=_toConsumableArray(sourceValue);}}}else if(U.isObject(sourceValue)){this.Merge(baseValue,sourceValue);}else{p_base[name]=sourceValue;}}else{if(U.isArray(sourceValue)){p_base[name]=_toConsumableArray(sourceValue);}else if(U.isObject(sourceValue)){p_base[name]=JSON.parse(JSON.stringify(sourceValue));}else{p_base[name]=sourceValue;}}}return p_base;}/**
     * Add p_source properties & values from p_source missing into p_base.
     * Only merge array, does not overwrite values.
     * @param {*} p_base 
     * @param {*} p_source 
     */},{key:"Compose",value:function Compose(p_base,p_source){if(!p_base){return JSON.parse(JSON.stringify(p_source));}for(var name in p_source){var baseValue=p_base[name],sourceValue=p_source[name];// For each property in p_source, add it to p_base if it does not exists already.
// Only merge arrays (in front), if allowed.
if(name in p_base){if(U.isArray(sourceValue)){if(U.isArray(baseValue)){if(baseValue[0]===null){continue;}for(var i=0,n=sourceValue.length;i<n;i++){var itemValue=sourceValue[i];if(!baseValue.includes(itemValue)){baseValue.unshift(itemValue);}}}}else if(U.isObject(sourceValue)){this.Compose(baseValue,sourceValue);}else{p_base[name]=sourceValue;}}else{if(U.isArray(sourceValue)){p_base[name]=_toConsumableArray(sourceValue);}else if(U.isObject(sourceValue)){p_base[name]=JSON.parse(JSON.stringify(sourceValue));}else{p_base[name]=sourceValue;}}}return p_base;}/**
     * Add p_source properties & values from p_source missing into p_base.
     * Only merge array, does not overwrite values.
     * @param {*} p_base 
     * @param {*} p_source 
     */},{key:"Extends",value:function Extends(p_base,p_source){if(!p_base){return JSON.parse(JSON.stringify(p_source));}for(var name in p_source){var baseValue=p_base[name],sourceValue=p_source[name];// For each property in p_source, add it to p_base if it does not exists already.
// Only merge arrays (in front), if allowed.
if(name in p_base){if(U.isArray(sourceValue)){if(U.isArray(baseValue)){if(baseValue[0]===null){continue;}for(var i=0,n=sourceValue.length;i<n;i++){var itemValue=sourceValue[i];if(!baseValue.includes(itemValue)){baseValue.unshift(itemValue);}}}}else if(U.isObject(sourceValue)){this.Extends(baseValue,sourceValue);}}else{if(U.isArray(sourceValue)){p_base[name]=_toConsumableArray(sourceValue);}else if(U.isObject(sourceValue)){p_base[name]=JSON.parse(JSON.stringify(sourceValue));}else{p_base[name]=sourceValue;}}}return p_base;}}]);return CSS;}(Singleton);module.exports["default"]=module.exports=_CSS;},{"@nkmjs/common":27,"@nkmjs/utils":268}],161:[function(require,module,exports){'use strict';var _require184=require("@nkmjs/common"),COMMON_FLAG=_require184.COMMON_FLAG;var COLOR=require("./colors/color");var PaletteBuilder=require("./palette-builder");var DefaultStylesheet=/*#__PURE__*/function(_PaletteBuilder){_inherits(DefaultStylesheet,_PaletteBuilder);var _super79=_createSuper(DefaultStylesheet);function DefaultStylesheet(){_classCallCheck(this,DefaultStylesheet);return _super79.call(this);}_createClass(DefaultStylesheet,[{key:"Build",value:function Build(palette){var defaultColors={};defaultColors[COMMON_FLAG.INFOS]=COLOR.RGBA(102,175,204);defaultColors[COMMON_FLAG.WARNING]=COLOR.RGBA(255,206,0);defaultColors[COMMON_FLAG.ERROR]=COLOR.RGBA(226,5,0);defaultColors[COMMON_FLAG.READY]=COLOR.RGBA(120,164,0);defaultColors[COMMON_FLAG.DIRTY]=COLOR.RGBA(164,100,0);defaultColors[COMMON_FLAG.LOADING]=COLOR.RGBA(102,119,204);defaultColors[COMMON_FLAG.PROCESSING]=COLOR.RGBA(102,119,204);defaultColors[COMMON_FLAG.WAITING]=COLOR.RGBA(102,119,204);defaultColors[COMMON_FLAG.ACTIVE]=COLOR.RGBA(62,193,136);palette.AddColors(defaultColors);palette.AddDocumentRulesets({'html, body':{'margin':0,'padding':0,'font-family':"'Regular', sans-serif",'font-size':'0.85rem',/* 0.9375rem */'font-weight':400,'line-height':1.5,'color':'#dedede',/* contrast indice 4.65 */'text-align':'left','background-color':'#1e1e1e','overflow':'hidden'}});palette.AddVariables({'margin-medium':'10px','padding-medium':'5px','scroll-size-small':'2px','scroll-size':'4px','color-warning':COLOR.RGBA().rgba,'size-xs':'16px','size-s':'24px','size-m':'32px','size-l':'50px','size-xl':'108px'});palette.AddSuffixes({'small-scroll':{'::-webkit-scrollbar-track':{'background-color':"|color-warning|"},'::-webkit-scrollbar':{'width':"|scroll-size-small|",'height':"|scroll-size-small|",'background-color':"|color-warning|"},'::-webkit-scrollbar-thumb':{'background-color':'|color-warning|'},':hover::-webkit-scrollbar':{'width':"|scroll-size|",'height':"|scroll-size|"},':hover::-webkit-scrollbar-thumb':{'background-color':'|color-warning|'}}});palette.AddSuffixes({'interactive-shadow':{'':{filter:"drop-shadow(0px 2px 1px rgba(0,0,0,0.1))"},'(.focused)':{'cursor':"pointer",'z-index':99999,filter:"drop-shadow(0px 2px 5px rgba(0,0,0,1))"},'(.selected)':{filter:"drop-shadow(0px 2px 2px rgba(0,0,0,0.2))"},'(.selected.focused)':{filter:"drop-shadow(0px 2px 5px rgba(0,0,0,1))"},'(.disabled)':{}},'interactive-area':{'':{'background-color':"#000",'border-radius':"5px"},'(.selected)':{},'(.selected.focused)':{},'(.disabled)':{}}});//
// Presets
//
palette.AddRulesets({'h4':{'margin-block-start':0,'margin-block-end':0}});palette.AddProperties({'layer':{'position':"absolute",'top':"0px",'left':"0px",'width':"100%",'height':"100%",'box-sizing':"border-box"},'invisible-fill':{'position':"absolute",'top':"0px",'left':"0px",'width':"100%",'height':"100%",'box-sizing':"border-box",'opacity':'0'},'cover':{'background-size':"cover",'background-position':"center"}});//
// Text & Fonts
//
palette.AddProperties({'icon-small':{'width':"20px",'height':"20px",'@':["cover"]}});//
// Generic filters
//
palette.AddProperties({'drop-shadow':{'filter':"drop-shadow(0px 5px 5px rgba(0,0,0,0.2))"}});}}]);return DefaultStylesheet;}(PaletteBuilder);module.exports["default"]=module.exports=DefaultStylesheet;},{"./colors/color":157,"./palette-builder":163,"@nkmjs/common":27}],162:[function(require,module,exports){'use strict';var FONT_FLAG=function FONT_FLAG(){_classCallCheck(this,FONT_FLAG);}// Generics    
;_defineProperty(FONT_FLAG,"TITLE","title");_defineProperty(FONT_FLAG,"LABEL","label");_defineProperty(FONT_FLAG,"TEXT","text");_defineProperty(FONT_FLAG,"TAG","font-tag");_defineProperty(FONT_FLAG,"SMALL","font-small");_defineProperty(FONT_FLAG,"MEDIUM","font-medium");_defineProperty(FONT_FLAG,"LARGE","font-large");_defineProperty(FONT_FLAG,"XLARGE","font-xlarge");module.exports["default"]=module.exports=FONT_FLAG;},{}],163:[function(require,module,exports){'use strict';var PaletteBuilder=/*#__PURE__*/function(){function PaletteBuilder(){_classCallCheck(this,PaletteBuilder);}_createClass(PaletteBuilder,[{key:"Build",value:function Build(palette){}}]);return PaletteBuilder;}();module.exports["default"]=module.exports=PaletteBuilder;},{}],164:[function(require,module,exports){'use strict';var _require185=require("@nkmjs/utils"),U=_require185.U,PATH=_require185.PATH,UDOM=_require185.UDOM;var _require186=require("@nkmjs/collections"),Dictionary=_require186.Dictionary;var _require187=require("@nkmjs/common"),NFOS=_require187.NFOS,DisposableObject=_require187.DisposableObject;var CSS=require("./css");var __DELIM_KVP="|";var __REF="@";/*

    {
        '.element':{ 'property':'|value|' },
        '.element':{ 'property':'25px' },
        '.element':{ 'color':'|warning|' },
        '.globalElement':``
    }

*/var Palette=/*#__PURE__*/function(_DisposableObject6){_inherits(Palette,_DisposableObject6);var _super80=_createSuper(Palette);function Palette(){_classCallCheck(this,Palette);return _super80.call(this);}/**
     * @access protected
     */_createClass(Palette,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Palette.prototype),"_Init",this).call(this);this._STYLE=null;this._fonts={};this._colors={};this._variables={};this._rulesets={};this._suffixes={};this._properties={};this._documentRulesets={};this._externalCSSMap={};this._themeId="default";this._cache=new Dictionary();}/**
     * 
     * @param {Palette} p_palette 
     */},{key:"InitFrom",value:function InitFrom(p_palette){this._fonts=JSON.parse(JSON.stringify(p_palette._fonts));this._colors=CSS.Merge(this._colors,p_palette._colors);this._variables=JSON.parse(JSON.stringify(p_palette._variables));this._rulesets=JSON.parse(JSON.stringify(p_palette._rulesets));this._suffixes=JSON.parse(JSON.stringify(p_palette._suffixes));this._properties=JSON.parse(JSON.stringify(p_palette._properties));this._documentRulesets=JSON.parse(JSON.stringify(p_palette._documentRulesets));this._externalCSSMap=JSON.parse(JSON.stringify(p_palette._externalCSSMap));}// ----> Document Rulesets
},{key:"AddCSSLink",value:function AddCSSLink(p_key,p_path){this._externalCSSMap[p_key]=p_path;}},{key:"GetCSSLink",value:function GetCSSLink(p_key){if(p_key in this._externalCSSMap){p_key=this._externalCSSMap[p_key];}if(p_key[0]===__REF){p_key="./css/themes/".concat(this._themeId).concat(p_key.substring(1));}else{p_key=PATH.FULL(p_key);}return p_key;}/**
     * Register a font face that will be added in the header 
     * in the form `@font-face { font-family: 'p_family'; src: url('p_url');}`
     * @param {*} p_family 
     * @param {*} p_url 
     */},{key:"AddFontFace",value:function AddFontFace(p_family,p_url){this._fonts[p_family]=PATH.FULL(p_url);}},{key:"AddColors",value:function AddColors(p_colors){for(var name in p_colors){var color=p_colors[name];this._colors[name]=color;this._variables["".concat(__DELIM_KVP).concat(name).concat(__DELIM_KVP)]=color;}}/**
     * Rulesets to be added to the document header
     * @param {object} p_ruleSets { '.element':{ 'rule':'value' }, '.element':{ 'rule':'value' } }
     */},{key:"AddDocumentRulesets",value:function AddDocumentRulesets(p_ruleSets){//TODO : Override existing properties/rulesets
}// ----> Global rulesets & KVPs
/**
     * 
     * @param {object} p_vars { 'A':'value', 'B':'value' }
     */},{key:"AddVariables",value:function AddVariables(p_vars){for(var name in p_vars){this._variables["".concat(__DELIM_KVP).concat(name).concat(__DELIM_KVP)]=p_vars[name];}}/**
     * 
     * @param {object} p_suffixes { 'kitID':{ 'suffix':{ ruleset }, 'suffix2':{ ruleset2 }, } }
     */},{key:"AddSuffixes",value:function AddSuffixes(p_suffixes){this._suffixes=CSS.Merge(this._suffixes,p_suffixes);}/**
     * 
     * @param {object} p_properties { 'groupID':{ 'prop':'value' } }
     */},{key:"AddProperties",value:function AddProperties(p_properties){this._properties=CSS.Merge(this._properties,p_properties);}/**
     * 
     * @param {object} p_rulesets { '.element':{ 'rule':'value' }, '.element':{ 'rule':'value' } }
     */},{key:"AddRulesets",value:function AddRulesets(p_rulesets){for(var el in p_rulesets){this.AddSingleRuleset(el,p_rulesets[el]);}}/**
     * 
     * @param {string} p_el Ruleset identifier
     * @param {object} p_ruleSet { 'rule':'value' }
     */},{key:"AddSingleRuleset",value:function AddSingleRuleset(p_el,p_ruleSet){var g=this._rulesets;if(p_el in g){g[p_el]=CSS.Merge(g[p_el],p_ruleSet);}else{g[p_el]=p_ruleSet;}}// ----> Process & Cache
/**
     * 
     * @param {class} p_class 
     * @param {function} p_generator 
     * @param {boolean} p_invalidateCache 
     * @returns {array} an array of styling items. Contains
     */},{key:"Get",value:function Get(p_class,p_generator){var p_invalidateCache=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var style=this._cache.Get(p_class);if(!U.isVoid(style)&&!p_invalidateCache){return style;}if(style){style.length=0;}else{style=new Array(0);}// Check if the class __NFO__ has any specific css imports
var nfos=NFOS.Get(p_class);if(nfos){if(nfos.css){for(var i=nfos.css.length-1;i>=0;i--){style.push(UDOM.New("link",{href:this.GetCSSLink(nfos.css[i]),rel:"stylesheet"}));}}if(nfos.ignoreLocal){this._cache.Set(p_class,style);return style;}}var styleObject=p_generator();if(!U.isEmpty(styleObject)){if(!U.isObject(styleObject)){throw new Error("Generator must return an object.");}//Replace KVPs before appending globals, for performance reasons
var styleString="";for(var el in styleObject){this._ProcessSuffixes(el,styleObject[el],styleObject);}for(var _el in styleObject){styleString+=CSS.CSS(_el,this._ProcessSingleRuleset(_el,styleObject[_el]));}var styleElement=UDOM.New("style");styleElement.innerText=styleString;style.push(styleElement);}this._cache.Set(p_class,style);return style;}},{key:"_ProcessSuffixes",value:function _ProcessSuffixes(p_el,p_ruleset,p_parent){//TODO : Check parent, see if we're currently processing rules inside a @media breakpoint
var refCandidate=p_el[0]===__REF;if(!U.isArray(p_ruleset)){if(refCandidate&&U.isObject(p_ruleset)){if(p_el.indexOf("@media")===0||p_el.indexOf("@supports")===0){//media query or supports query
for(var el in p_ruleset){this._ProcessSuffixes(el,p_ruleset[el],p_ruleset);}}}return;}if(!refCandidate||!U.isArray(p_ruleset)){return;}var prefix=p_el.substr(1,p_el.length-1);for(var i=0,n=p_ruleset.length;i<n;i++){var kitName=p_ruleset[i];if(!(kitName in this._suffixes)){continue;}var kit=this._suffixes[kitName],id=void 0,kitRuleset=void 0;for(var k in kit){id="".concat(prefix).concat(k);kitRuleset=kit[k];if(id in p_parent){p_parent[id]=CSS.Compose(p_parent[id],kitRuleset);}else{p_parent[id]=CSS.Compose(null,kitRuleset);}}}delete p_parent[p_el];}},{key:"_ProcessSingleRuleset",value:function _ProcessSingleRuleset(p_el,p_ruleset){var isObject=U.isObject(p_ruleset);if(p_el[0]===__REF&&isObject){if(p_el.indexOf("@media")===0||p_el.indexOf("@supports")===0){//media query or supports query
for(var el in p_ruleset){this._ProcessSingleRuleset(el,p_ruleset[el]);}console.log(p_ruleset);return p_ruleset;}}var g=this._rulesets,isGlobal=(p_el in g);if(isObject){if(isGlobal){CSS.Compose(p_ruleset,g[p_el]);}if(__REF in p_ruleset){var propGroup=p_ruleset[__REF];for(var i=0,n=propGroup.length;i<n;i++){var groupName=propGroup[i];if(groupName===null){continue;}if(groupName in this._properties){CSS.Compose(p_ruleset,this._properties[groupName]);}else{throw new Error("".concat(groupName," is not a valid property kit"));}}delete p_ruleset[__REF];}}else if(isGlobal){p_ruleset=CSS.Compose(null,g[p_el]);isObject=true;}else{p_ruleset="";}if(isObject){for(var r in p_ruleset){var rule=p_ruleset[r];if(U.isString(rule)&&rule.includes(__DELIM_KVP)){p_ruleset[r]=this._ReplaceVars(rule);}}}return p_ruleset;}},{key:"_ReplaceVars",value:function _ReplaceVars(p_str){for(var name in this._variables){p_str=p_str.replace(name,this._variables[name]);}return p_str;}}]);return Palette;}(DisposableObject);module.exports["default"]=module.exports=Palette;},{"./css":160,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/utils":268}],165:[function(require,module,exports){'use strict';var _require188=require("@nkmjs/utils"),U=_require188.U,UDOM=_require188.UDOM;var _require189=require("@nkmjs/common"),Singleton=_require189.Singleton,POOL=_require189.POOL,COMMON_FLAG=_require189.COMMON_FLAG;var ColorBase=require("./colors/color-base");var COLOR=require("./colors/color");var Palette=require("./palette");var CSS=require("./css");var DefaultStylesheet=require("./default-stylesheet");/*

    {
        '.element':{ 'property':'|value|' },
        '.element':{ 'property':'25px' },
        '.element':{ 'color':'|warning|' },
        '.globalElement':``
    }

*/var STYLE=/*#__PURE__*/function(_Singleton4){_inherits(STYLE,_Singleton4);var _super81=_createSuper(STYLE);function STYLE(){_classCallCheck(this,STYLE);return _super81.call(this);}/**
     * @access protected
     */_createClass(STYLE,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(STYLE.prototype),"_Init",this).call(this);this._defaultPalette=POOL.Rent(Palette);this._defaultPalette._STYLE=this;this._current=this._defaultPalette;this._headerStyle=null;this._cssPaths={};this._InitDefaults();}/**
     * Initialize a few default values
     */},{key:"_InitDefaults",value:function _InitDefaults(){var cssBuilder=new DefaultStylesheet();cssBuilder.Build(this._defaultPalette);}},{key:"defaultPalette",get:function get(){return this._defaultPalette;}},{key:"current",get:function get(){return this._current;},set:function set(p_value){if(p_value===null){p_value=this._defaultPalette;}this._current=p_value;}/**
     * 
     * @param {boolean} p_initWithDefaults 
     * @returns {Palette} new Palette
     */}],[{key:"CreatePalette",value:function CreatePalette(){var p_initWithDefaults=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;var p_makeCurrent=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var newPalette=POOL.Rent(Palette);newPalette._STYLE=this;if(p_initWithDefaults){newPalette.InitFrom(this.instance.defaultPalette);}if(p_makeCurrent){this.instance.current=newPalette;}return newPalette;}/**
     * Deploy current document rulesets into the header.
     * If it was deployed already, overwrites the previous statements.
     */},{key:"DeployCurrent",value:function DeployCurrent(){if(!this._isBrowser){return;}var pal=this.instance.current;var css="";for(var f in pal._fonts){css+="@font-face { font-family: '".concat(f,"'; src: url('").concat(pal._fonts[f],"');}\n");}css+="\n";var styleObject=pal._documentRulesets,ruleset;for(var el in styleObject){pal._ProcessSuffixes(el,styleObject[el],styleObject);}for(var _el2 in styleObject){css+=CSS.CSS(_el2,pal._ProcessSingleRuleset(_el2,styleObject[_el2]));}// Preload all available css rules
var externalCSSRules=this.instance.current._externalCSSMap;for(var cssKey in externalCSSRules){this.instance.current.PrintCSSLink(cssKey,document.head);}if(U.isVoid(this._headerStyle)){this._headerStyle=document.createElement('style');this._headerStyle.innerText=css;UDOM.Attach(this._headerStyle,document.head);}else{this._headerStyle.innerText=css;}}/**
     * Get the style associated to a constructor.
     * Generate and cache the result provided by the generator function, if none is cached.
     * @param {function} p_class used as unique key to generate or access cache.
     * @param {function} p_generator 
     * @param {function} p_invalidateCache 
     * @returns {string} 
     */},{key:"Get",value:function Get(p_class,p_generator){var p_invalidateCache=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;return this.instance.current.Get(p_class,p_generator,p_invalidateCache);}/**
     * Text format
     * @param {test} p_text 
     * @param {object} p_format 
     * @param {string|ColorBase} p_format.color only sets color (overriden by .style)
     * @param {boolean} p_format.strong adds a <strong> tag
     * @param {string} p_format.class css class
     * @param {object} p_format.style inline CSS
     * @param {string} p_type tag type
     */},{key:"TF",value:function TF(p_text,p_format){var p_type=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'span';p_text=p_format.strong?"<strong>".concat(p_text,"</strong>"):p_text;var css="";if(p_format.style){css=" style='".concat(CSS.InlineCSS(this.instance.current._ProcessSingleRuleset("",p_format.style)),"' ");}else if(p_format.color){var color=p_format.color;if(U.isString(color)){if(color in this.instance.current._colors){color=this.instance.current._colors[color];}}css=" style='color:".concat(color,";' ");}var cl=p_format["class"]?" class='".concat(p_format["class"],"'"):"";return"<".concat(p_type).concat(cl).concat(css,">").concat(p_text,"</").concat(p_type,">");}}]);return STYLE;}(Singleton);module.exports["default"]=module.exports=STYLE;},{"./colors/color":157,"./colors/color-base":156,"./css":160,"./default-stylesheet":161,"./palette":164,"@nkmjs/common":27,"@nkmjs/utils":268}],166:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={UI_SIGNAL:require("./lib/ui-signal"),UI_FLAG:require("./lib/ui-flag"),UI_ID:require("./lib/ui-id"),UI:require("./lib/ui"),INPUT:require("./lib/input"),MOUSE:require("./lib/mouse"),KEYBOARD:require("./lib/keyboard"),DisposableHTMLElement:require("./lib/disposable-htmlelement"),DisplayObject:require("./lib/display-object"),DisplayObjectContainer:require("./lib/display-object-container"),Widget:require("./lib/widget"),OrientableWidget:require("./lib/widget-orientable"),CatalogWidget:require("./lib/widget-catalog"),// Helpers
CatalogBuilder:require("./lib/helpers/catalog-builder"),CatalogViewBuilder:require("./lib/helpers/catalog-view-builder"),FlagBox:require("./lib/helpers/flag-box"),FlagEnum:require("./lib/helpers/flag-enum"),WidgetSelection:require("./lib/helpers/widget-selection"),Frame:require("./lib/helpers/frame"),Toolbar:require("./lib/helpers/toolbar"),PopIn:require("./lib/helpers/pop-in"),// Tree
TreeItem:require("./lib/tree/tree-item"),TreeItemGroup:require("./lib/tree/tree-item-group"),TreeRoot:require("./lib/tree/tree-root"),// Views
View:require("./lib/views/view"),Layer:require("./lib/views/layer"),LayerContainer:require("./lib/views/layer-container"),DrawerNav:require("./lib/views/drawer-nav"),Drawer:require("./lib/views/drawer"),// Manipulators
BaseManipulator:require("./lib/manipulators/manipulator-base"),ImageManipulator:require("./lib/manipulators/manipulator-image"),TextManipulator:require("./lib/manipulators/manipulator-text"),// Extension
ExtBase:require("./lib/extensions/ext-base"),ExtDrag:require("./lib/extensions/ext-drag"),ExtDrop:require("./lib/extensions/ext-drop"),ExtExpand:require("./lib/extensions/ext-expand"),ExtMouse:require("./lib/extensions/ext-mouse"),ExtMouseMove:require("./lib/extensions/ext-mouse-move"),// Buttons
ButtonBase:require("./lib/button-base"),ToolButton:require("./lib/buttons/button-tool"),ButtonEx:require("./lib/buttons/button-ex"),ButtonDragHandle:require("./lib/buttons/button-drag-handle"),// Templates
DOMTemplate:require("./lib/dom-template"),TPLFacadeLabel:require("./lib/templates/tpl-facade-label"),TPLFacadeTitles:require("./lib/templates/tpl-facade-titles"),TPLHeaderBodyFooter:require("./lib/templates/tpl-header-body-footer"),TPLBodyExpand:require("./lib/templates/tpl-body-expand"),TPLBodyHeaderTitles:require("./lib/templates/tpl-body-header-titles"),TPLFacadeExpandLabel:require("./lib/templates/tpl-facade-expand-label"),TPLFacadeExpandTitle:require("./lib/templates/tpl-facade-expand-title")};},{"./lib/button-base":167,"./lib/buttons/button-drag-handle":168,"./lib/buttons/button-ex":169,"./lib/buttons/button-tool":170,"./lib/display-object":172,"./lib/display-object-container":171,"./lib/disposable-htmlelement":173,"./lib/dom-template":174,"./lib/extensions/ext-base":175,"./lib/extensions/ext-drag":176,"./lib/extensions/ext-drop":177,"./lib/extensions/ext-expand":178,"./lib/extensions/ext-mouse":180,"./lib/extensions/ext-mouse-move":179,"./lib/helpers/catalog-builder":181,"./lib/helpers/catalog-view-builder":182,"./lib/helpers/flag-box":183,"./lib/helpers/flag-enum":184,"./lib/helpers/frame":185,"./lib/helpers/pop-in":186,"./lib/helpers/toolbar":187,"./lib/helpers/widget-selection":188,"./lib/input":189,"./lib/keyboard":190,"./lib/manipulators/manipulator-base":192,"./lib/manipulators/manipulator-image":193,"./lib/manipulators/manipulator-text":194,"./lib/mouse":195,"./lib/templates/tpl-body-expand":196,"./lib/templates/tpl-body-header-titles":197,"./lib/templates/tpl-facade-expand-label":198,"./lib/templates/tpl-facade-expand-title":199,"./lib/templates/tpl-facade-label":200,"./lib/templates/tpl-facade-titles":201,"./lib/templates/tpl-header-body-footer":202,"./lib/tree/tree-item":204,"./lib/tree/tree-item-group":203,"./lib/tree/tree-root":205,"./lib/ui":209,"./lib/ui-flag":206,"./lib/ui-id":207,"./lib/ui-signal":208,"./lib/views/drawer":211,"./lib/views/drawer-nav":210,"./lib/views/layer":213,"./lib/views/layer-container":212,"./lib/views/view":214,"./lib/widget":217,"./lib/widget-catalog":215,"./lib/widget-orientable":216}],167:[function(require,module,exports){'use strict';var _require190=require("@nkmjs/utils"),U=_require190.U;var _require191=require("@nkmjs/common"),NFOS=_require191.NFOS,SIGNAL=_require191.SIGNAL,Observer=_require191.Observer,OptionsHandler=_require191.OptionsHandler;var _require192=require("@nkmjs/actions"),Request=_require192.Request;var _require193=require("@nkmjs/actions"),Command=_require193.Command;var UI=require("./ui");var UI_SIGNAL=require("./ui-signal");var UI_FLAG=require("./ui-flag");var Widget=require("./widget");var FlagEnum=require("./helpers/flag-enum");var ButtonBase=/*#__PURE__*/function(_Widget){_inherits(ButtonBase,_Widget);var _super82=_createSuper(ButtonBase);function ButtonBase(){_classCallCheck(this,ButtonBase);return _super82.call(this);}_createClass(ButtonBase,[{key:"_Init",value:function _Init(){var _this9=this;_get(_getPrototypeOf(ButtonBase.prototype),"_Init",this).call(this);this._alwaysDisplayCommand=U.Default(this._alwaysDisplayCommand,false);this._command=null;this._isCommandTrigger=true;this._isCommandContext=true;this._isToggled=false;this._commandObserver=new Observer();this._commandObserver.Hook(SIGNAL.UPDATED,this._OnCommandUpdated,this);this._flags.Add(this,UI_FLAG.TOGGLED);this._sizeEnum=new FlagEnum(UI_FLAG.sizes);this._sizeEnum.Add(this);this._flavorEnum=new FlagEnum(UI_FLAG.flavors);this._flavorEnum.Add(this);this._variantEnum=new FlagEnum(UI_FLAG.variants);this._variantEnum.Add(this);this._optionsHandler=new OptionsHandler(null,this._Bind(this._OnOptionsWillUpdate));this._optionsHandler.Hook("data");this._optionsHandler.Hook("htitle");this._optionsHandler.Hook("trigger");this._optionsHandler.Hook("toggle");this._optionsHandler.Hook("request");this._optionsHandler.Hook("command");this._optionsHandler.Hook("isCommandTrigger");this._optionsHandler.Hook("isCommandContext");this._optionsHandler.Hook("alwaysVisible","alwaysDisplayCommand");this._optionsHandler.Hook("flagOn",function(p_value){for(var i=0,n=p_value.length;i<n;i++){_this9._flags.Set(p_value[i],true);}});this._optionsHandler.Hook("flagOff",function(p_value){for(var i=0,n=p_value.length;i<n;i++){_this9._flags.Set(p_value[i],false);}});this._optionsHandler.Hook("size",function(p_value){_this9._sizeEnum.Set(p_value);});this._optionsHandler.Hook("flavor",function(p_value){_this9._flavorEnum.Set(p_value);});this._optionsHandler.Hook("variant",function(p_value){_this9._variantEnum.Set(p_value);});}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(ButtonBase.prototype),"_PostInit",this).call(this);this._sizeEnum.Set(this.constructor.__default_size);this._flavorEnum.Set(this.constructor.__default_flavor);this._variantEnum.Set(this.constructor.__default_variant);}},{key:"size",get:function get(){return this._sizeEnum.currentFlag;},set:function set(p_value){this._sizeEnum.Set(p_value);}},{key:"flavor",get:function get(){return this._flavorEnum.currentFlag;},set:function set(p_value){this._flavorEnum.Set(p_value);}},{key:"variant",get:function get(){return this._variantEnum.currentFlag;},set:function set(p_value){this._variantEnum.Set(p_value);}},{key:"isToggled",get:function get(){return this._isToggled;}},{key:"isActivable",set:function set(p_value){_set(_getPrototypeOf(ButtonBase.prototype),"isActivable",p_value,this,true);this._flags.Set(UI_FLAG.DISABLED,!this._isActivable);}/**
     * @type {boolean}
     */},{key:"isCommandTrigger",get:function get(){return this._isCommandTrigger;},set:function set(p_value){this._isCommandTrigger=p_value;}/**
     * @type {boolean}
     */},{key:"isCommandContext",get:function get(){return this._isCommandContext;},set:function set(p_value){this._isCommandContext=p_value;}/**
     * @type {boolean}
     */},{key:"alwaysDisplayCommand",get:function get(){return this._alwaysDisplayCommand;},set:function set(p_value){this._alwaysDisplayCommand=p_value;if(p_value&&this._command){this.visible=true;}}// ----> DOM
},{key:"_Render",value:function _Render(){this.focusArea=this;}// ----> Options handling
/**
     * @type {object}
     */},{key:"options",set:function set(p_value){if(!p_value){return;}this._optionsHandler.Process(this,p_value);this._flags.Set(UI_FLAG.NO_SCALE,p_value.noscale?p_value.noscale:false);}},{key:"_OnOptionsWillUpdate",value:function _OnOptionsWillUpdate(p_options){if(!p_options){return;}p_options.htitle=U.Get(p_options,"htitle",U.Default(p_options.label,""));}/**
     * @type {actions.Command}
     */},{key:"command",get:function get(){return this._command;},set:function set(p_command){if(this._command===p_command){return;}var oldValue=this._command;this._command=p_command;if(oldValue){this._commandObserver.Unobserve(p_command);}if(p_command){this._commandObserver.Observe(p_command);this._OnCommandUpdated(p_command);this.htitle=p_command.name;this.order=p_command.order;}else{this.order=0;}}},{key:"_OnCommandUpdated",value:function _OnCommandUpdated(p_command){this.visible=this._alwaysDisplayCommand?true:p_command.isEnabled;}/**
     * @type {object}
     */},{key:"trigger",get:function get(){return this._trigger;},set:function set(p_value){this._trigger=p_value;}/**
     * @type {object}
     */},{key:"toggle",get:function get(){return this._toggle;},set:function set(p_value){this._toggle=p_value;}/**
     * @type {object}
     */},{key:"request",get:function get(){return this._request;},set:function set(p_value){this._request=p_value;}},{key:"Activate",value:function Activate(p_evt){if(!_get(_getPrototypeOf(ButtonBase.prototype),"Activate",this).call(this,p_evt)){return false;}// ----> Command
if(this._isCommandTrigger&&this._command){this._command.emitter=this;if(this._isCommandContext){this._command.Execute(this);}else{this._command.Execute();}}// ----> Trigger
if(this._trigger){var thisArg=U.Get(this._trigger,"thisArg",null);if(this._trigger.argArray){var _this$_trigger$fn;(_this$_trigger$fn=this._trigger.fn).call.apply(_this$_trigger$fn,[thisArg].concat(_toConsumableArray(this._trigger.argArray)));}else if(this._trigger.arg){if(this._trigger.arg===UI_FLAG.SELF){this._trigger.fn.call(thisArg,this);}else{this._trigger.fn.call(thisArg,this._trigger.arg);}}else{this._trigger.fn.call(thisArg);}}// ----> Toggle
if(this._toggle){if(this._isToggled){// Self-deactivate if toggle.yoyo = true
if(this._toggle.yoyo){this.Deactivate();}// Otherwise do nothing.
}else{this._isToggled=true;this._flags.Set(UI_FLAG.TOGGLED,true);var _thisArg=U.Get(this._toggle,"thisArg",null);if(this._toggle.argArray){var _this$_toggle$fn;(_this$_toggle$fn=this._toggle.fn).call.apply(_this$_toggle$fn,[_thisArg].concat(_toConsumableArray(this._toggle.argArray)));}else if(this._toggle.arg){if(this._toggle.arg===UI_FLAG.SELF){this._toggle.fn.call(_thisArg,this);}else{this._toggle.fn.call(_thisArg,this._toggle.arg);}}else{this._toggle.fn.call(_thisArg);}}}// ----> Request
if(this._request){if(!this._request.type){throw new Error("Cannot generate request of type 'null'");}var requestEmitter=U.Get(this._request,"emitter",this),options=U.Get(this._request,"options");// Override options value if a proxy has been set
var proxy=U.Get(this._request,"proxy",null);if(proxy){var _thisArg2=U.Get(proxy,"thisArg",null);if(proxy.argArray){options=proxy.fn.apply(_thisArg2,proxy.argArray);}else if(proxy.arg){options=proxy.fn.call(_thisArg2,proxy.arg);}else{options=proxy.fn.call(_thisArg2);}}requestEmitter._EmitLocalRequest(opts.type,options,U.Get(this._request,"onSuccess",null),U.Get(this._request,"onFail",null),U.Get(this._request,"timeout",0),U.Get(this._request,"cl",Request));}this._Broadcast(UI_SIGNAL.TRIGGERED,this);return true;}/**
     * Only used if the button has isToggle === true.
     */},{key:"Deactivate",value:function Deactivate(){if(!this._isToggled){return;}this._isToggled=false;this._flags.Set(UI_FLAG.TOGGLED,false);if(this._toggle){if(this._toggle.fnOff){var thisArg=U.Get(this._toggle,"thisArg",null);if(this._toggle.argArray){var _this$_toggle$fnOff;(_this$_toggle$fnOff=this._toggle.fnOff).call.apply(_this$_toggle$fnOff,[thisArg].concat(_toConsumableArray(this._toggle.argArray)));}else if(this._toggle.arg){if(this._toggle.arg===UI_FLAG.SELF){this._toggle.fnOff.call(thisArg,this);}else{this._toggle.fnOff.call(thisArg,this._toggle.arg);}}else{this._toggle.fnOff.call(thisArg);}}}this._Broadcast(UI_SIGNAL.DEACTIVATED,this);}},{key:"_CleanUp",value:function _CleanUp(){this.htitle="";this.command=null;this._isCommandTrigger=true;this._isCommandContext=true;this._isToggled=false;this.toggle=null;this.trigger=null;this.request=null;this.isActivable=true;this._flags.ApplyAll(false);this._sizeEnum.Set(this.constructor.__default_size);this._flavorEnum.Set(this.constructor.__default_flavor);this._variantEnum.Set(this.constructor.__default_variant);_get(_getPrototypeOf(ButtonBase.prototype),"_CleanUp",this).call(this);}}]);return ButtonBase;}(Widget);_defineProperty(ButtonBase,"__NFO__",NFOS.Ext({css:["@/buttons/shared.css"]},Widget,['css']));_defineProperty(ButtonBase,"__default_size",null);_defineProperty(ButtonBase,"__default_flavor",null);_defineProperty(ButtonBase,"__default_variant",null);module.exports["default"]=module.exports=ButtonBase;//UI.Register(`nkmjs-button`, ButtonBase);
},{"./helpers/flag-enum":184,"./ui":209,"./ui-flag":206,"./ui-signal":208,"./widget":217,"@nkmjs/actions":1,"@nkmjs/common":27,"@nkmjs/utils":268}],168:[function(require,module,exports){'use strict';var _require194=require("@nkmjs/utils"),U=_require194.U;var _require195=require("@nkmjs/common"),NFOS=_require195.NFOS;var _require196=require("@nkmjs/style"),CSS=_require196.CSS;var UI_FLAG=require("../ui-flag");var UI=require("../ui");var ToolButton=require("./button-tool");var ButtonDragHandle=/*#__PURE__*/function(_ToolButton){_inherits(ButtonDragHandle,_ToolButton);var _super83=_createSuper(ButtonDragHandle);function ButtonDragHandle(){_classCallCheck(this,ButtonDragHandle);return _super83.call(this);}_createClass(ButtonDragHandle,[{key:"_Style",value:function _Style(){return CSS.Extends({':host':_defineProperty({//border:`1px solid #ff0000`
cursor:"move"},"cursor","grab"),':host(.focused)':_defineProperty({cursor:"move"},"cursor","grab")},_get(_getPrototypeOf(ButtonDragHandle.prototype),"_Style",this).call(this));}}]);return ButtonDragHandle;}(ToolButton);_defineProperty(ButtonDragHandle,"__NFO__",NFOS.Ext({css:["@/buttons/button-drag-handle.css"]},ToolButton,['css']));module.exports["default"]=module.exports=ButtonDragHandle;UI.Register("nkmjs-button-drag-handle",ButtonDragHandle);},{"../ui":209,"../ui-flag":206,"./button-tool":170,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/utils":268}],169:[function(require,module,exports){'use strict';var _require197=require("@nkmjs/utils"),U=_require197.U,UDOM=_require197.UDOM;var _require198=require("@nkmjs/common"),NFOS=_require198.NFOS;var _require199=require("@nkmjs/style"),CSS=_require199.CSS,FONT_FLAG=_require199.FONT_FLAG;var UI_FLAG=require("../ui-flag");var UI_ID=require("../ui-id");var UI=require("../ui.js");var ButtonBase=require("../button-base");var _require200=require("../manipulators"),TextManipulator=_require200.TextManipulator,ImageManipulator=_require200.ImageManipulator;/**
 * A tool button is a simple button with an icon.
 */var ButtonEx=/*#__PURE__*/function(_ButtonBase){_inherits(ButtonEx,_ButtonBase);var _super84=_createSuper(ButtonEx);function ButtonEx(){_classCallCheck(this,ButtonEx);return _super84.call(this);}_createClass(ButtonEx,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(ButtonEx.prototype),"_Init",this).call(this);this._optionsHandler.Hook(UI_ID.ICON,null,"");this._optionsHandler.Hook(UI_ID.LABEL,null,"");this._optionsHandler.Hook("uppercaseText");this._icon=null;this._label=null;this._flags.Add(this,UI_FLAG.NO_ICON,UI_FLAG.NO_LABEL);}},{key:"_OnDataUpdated",value:function _OnDataUpdated(p_data){_get(_getPrototypeOf(ButtonEx.prototype),"_OnDataUpdated",this).call(this,p_data);//this._facade.data = p_data;
}// ----> DOM
},{key:"icon",get:function get(){return this._icon;},set:function set(p_value){this._flags.Set(UI_FLAG.NO_ICON,!this._icon.Set(p_value));}},{key:"label",get:function get(){return this._label;},set:function set(p_value){this._flags.Set(UI_FLAG.NO_LABEL,!this._label.Set(p_value));}},{key:"_Render",value:function _Render(){_get(_getPrototypeOf(ButtonEx.prototype),"_Render",this).call(this);this._icon=new ImageManipulator(UDOM.New("span",{"class":UI_ID.ICON},this._host));this._label=new TextManipulator(UDOM.New("span",{"class":UI_ID.LABEL},this._host));}},{key:"_CleanUp",value:function _CleanUp(){this._icon.Set(null);this._label.Set(null);_get(_getPrototypeOf(ButtonEx.prototype),"_CleanUp",this).call(this);}}]);return ButtonEx;}(ButtonBase);_defineProperty(ButtonEx,"__NFO__",NFOS.Ext({css:["@/buttons/button-ex.css"]},ButtonBase,['css']));module.exports["default"]=module.exports=ButtonEx;UI.Register("nkmjs-button-ex",ButtonEx);},{"../button-base":167,"../manipulators":191,"../ui-flag":206,"../ui-id":207,"../ui.js":209,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/utils":268}],170:[function(require,module,exports){'use strict';var _require201=require("@nkmjs/utils"),U=_require201.U,UDOM=_require201.UDOM;var _require202=require("@nkmjs/common"),NFOS=_require202.NFOS;var _require203=require("@nkmjs/style"),CSS=_require203.CSS;var UI_FLAG=require("../ui-flag");var UI_ID=require("../ui-id");var UI=require("../ui.js");var ButtonBase=require("../button-base");var ImageManipulator=require("../manipulators/manipulator-image");/**
 * A tool button is a simple button with an icon.
 */var ToolButton=/*#__PURE__*/function(_ButtonBase2){_inherits(ToolButton,_ButtonBase2);var _super85=_createSuper(ToolButton);function ToolButton(){_classCallCheck(this,ToolButton);return _super85.call(this);}_createClass(ToolButton,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(ToolButton.prototype),"_Init",this).call(this);this._optionsHandler.Hook(UI_ID.ICON,null,"");this._icon=null;}},{key:"_OnDataUpdated",value:function _OnDataUpdated(p_data){_get(_getPrototypeOf(ToolButton.prototype),"_OnDataUpdated",this).call(this,p_data);}// ----> DOM
},{key:"icon",get:function get(){return this._icon;},set:function set(p_value){this._icon.Set(p_value);}},{key:"_Render",value:function _Render(){_get(_getPrototypeOf(ToolButton.prototype),"_Render",this).call(this);this._icon=new ImageManipulator(UDOM.New("span",{"class":UI_ID.ICON},this._host),false);}},{key:"_PostRender",value:function _PostRender(){this._icon.Set(null);}},{key:"_CleanUp",value:function _CleanUp(){this._icon.Set(null);_get(_getPrototypeOf(ToolButton.prototype),"_CleanUp",this).call(this);}}]);return ToolButton;}(ButtonBase);_defineProperty(ToolButton,"__NFO__",NFOS.Ext({css:["@/buttons/button-tool.css"]},ButtonBase,['css']));module.exports["default"]=module.exports=ToolButton;UI.Register("nkmjs-tool-button",ToolButton);},{"../button-base":167,"../manipulators/manipulator-image":193,"../ui-flag":206,"../ui-id":207,"../ui.js":209,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/utils":268}],171:[function(require,module,exports){'use strict';var _require204=require("@nkmjs/utils"),U=_require204.U,UDOM=_require204.UDOM;var UI=require("./ui");var UI_SIGNAL=require("./ui-signal");var DisplayObject=require("./display-object");var DisplayObjectContainer=/*#__PURE__*/function(_DisplayObject){_inherits(DisplayObjectContainer,_DisplayObject);var _super86=_createSuper(DisplayObjectContainer);function DisplayObjectContainer(){_classCallCheck(this,DisplayObjectContainer);return _super86.call(this);}// ----> Init
_createClass(DisplayObjectContainer,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(DisplayObjectContainer.prototype),"_Init",this).call(this);this._displayObjects=new Array(0);}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(DisplayObjectContainer.prototype),"_PostInit",this).call(this);if(!this._wrapper){this._wrapper=this._host;}}// ----> Child Management
},{key:"count",get:function get(){return this._displayObjects.length;}/**
     * Return the display object at the given index.
     * @param {number} p_index 
     */},{key:"At",value:function At(p_index){return this._displayObjects[p_index];}/**
     * 
     * @param {*} p_displayObject 
     * @param {number} p_index 
     * @param {*} p_container 
     * @param {*} p_cssClass 
     */},{key:"Add",value:function Add(p_displayObject){var p_cssClass=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_container=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var p_index=arguments.length>3&&arguments[3]!==undefined?arguments[3]:-1;if(p_index>=this._displayObjects.length||p_index<0){p_index=-1;}if(U.isFunc(p_displayObject)&&U.isInstanceOf(p_displayObject,DisplayObject)){p_displayObject=UI.Rent(p_displayObject);}if(!p_displayObject){throw new Error("Cannot Add an empty display object.");}if(this._displayObjects.includes(p_displayObject)){if(p_index===-1){return p_displayObject;}this.Move(p_displayObject,p_index);return p_displayObject;}if(!p_container||p_container===this){p_container=this._wrapper;}else if(U.isInstanceOf(p_container,DisplayObjectContainer)){p_container=p_container.wrapper;}if(p_index===-1){this._displayObjects.push(p_displayObject);p_index=this._displayObjects.length-1;try{p_container.appendChild(p_displayObject);}catch(err){throw err;}}else{this._displayObjects.splice(p_index,0,p_displayObject);p_container.insertBefore(p_displayObject,this._displayObjects[p_index]);}p_displayObject.parent=this;if(p_cssClass){if(p_cssClass.includes(' ')){var classes=p_cssClass.split(' ');for(var i=0,n=classes.length;i<n;i++){p_displayObject.classList.add(classes[i]);}}else{p_displayObject.classList.add(p_cssClass);}}this._OnChildAdded(p_displayObject,p_index);return p_displayObject;}},{key:"Move",value:function Move(p_displayObject,p_index){if(!this._displayObjects.includes(p_displayObject)){throw new Error("Provided display object is not a child of this container.");}//TODO : Implement Move
console.warning("DisplayObject.Move is not implemented.");this._OnChildMoved(p_displayObject,p_index,p_index);}/**
     * 
     * @param {DisplayObject} p_displayObject 
     */},{key:"Remove",value:function Remove(p_displayObject){var index=this._displayObjects.indexOf(p_displayObject);if(index===-1){return p_displayObject;}return this.RemoveAt(index);}},{key:"RemoveAt",value:function RemoveAt(p_index){if(p_index<0||p_index>=this._displayObjects.length){return null;}var removedDisplayObject=this._displayObjects[p_index];this._displayObjects.splice(p_index,1);if(removedDisplayObject.parent===this){removedDisplayObject.parent=null;UDOM.Detach(removedDisplayObject);}this._OnChildRemoved(removedDisplayObject,p_index);return removedDisplayObject;}},{key:"_OnChildAdded",value:function _OnChildAdded(p_displayObject,p_index){this._Broadcast(UI_SIGNAL.CHILD_ADDED,this,p_displayObject,p_index);}},{key:"_OnChildMoved",value:function _OnChildMoved(p_displayObject,p_index,p_oldIndex){this._Broadcast(UI_SIGNAL.CHILD_MOVED,this,p_displayObject,p_index,p_oldIndex);}},{key:"_OnChildRemoved",value:function _OnChildRemoved(p_displayObject,p_index){this._Broadcast(UI_SIGNAL.CHILD_ADDED,this,p_displayObject,p_index);}}]);return DisplayObjectContainer;}(DisplayObject);module.exports["default"]=module.exports=DisplayObjectContainer;//UI.Register(`nkmjs-display-object-container`, DisplayObjectContainer);
},{"./display-object":172,"./ui":209,"./ui-signal":208,"@nkmjs/utils":268}],172:[function(require,module,exports){'use strict';var _require205=require("@nkmjs/utils"),U=_require205.U,UDOM=_require205.UDOM,PATH=_require205.PATH;var _require206=require("@nkmjs/collections"),Dictionary=_require206.Dictionary,List=_require206.List,DictionaryList=_require206.DictionaryList;var _require207=require("@nkmjs/actions"),RELAY=_require207.RELAY,Request=_require207.Request;var _require208=require("@nkmjs/common"),SignalBox=_require208.SignalBox,NFOS=_require208.NFOS;var _require209=require("@nkmjs/style"),STYLE=_require209.STYLE,CSS=_require209.CSS;var UI=require("./ui");var UI_FLAG=require("./ui-flag");var DisposableHTMLElement=require("./disposable-htmlelement");var FlagBox=require("./helpers/flag-box");var DisplayObject=/*#__PURE__*/function(_DisposableHTMLElemen){_inherits(DisplayObject,_DisposableHTMLElemen);var _super87=_createSuper(DisplayObject);function DisplayObject(){_classCallCheck(this,DisplayObject);return _super87.call(this);}// ----> Init
_createClass(DisplayObject,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(DisplayObject.prototype),"_Init",this).call(this);this._isTransformDirty=false;this._transforms={};this._wrapper=null;this._host=null;this._styles=null;this._shadowConfig={mode:"open"};this._visible=true;this._flags=new FlagBox();this._requestSignalBox=null;this._order=null;this._parent=null;}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(DisplayObject.prototype),"_PostInit",this).call(this);this._BuildHost();this._wrapper=this._host;this._PrintStyle();this._Render();this._PostRender();}// ---->
},{key:"order",get:function get(){return this._order;},set:function set(p_value){if(this._order===p_value){return;}this._order=p_value;if(p_value===null){this.style.removeProperty("--order");}else{this.style.setProperty("--order",p_value);}}},{key:"host",get:function get(){return this._host;}},{key:"wrapper",get:function get(){return this._wrapper;}},{key:"_BuildHost",value:function _BuildHost(){this._host=this.attachShadow(this._shadowConfig);}// ----> DOM
},{key:"_Style",value:function _Style(){}},{key:"_PrintStyle",value:function _PrintStyle(){var p_invalidateCache=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;if(this._styles){for(var i=0,n=this._styles.length;i<n;i++){this._styles[i].remove();}this._styles.length=0;}this._styles=STYLE.Get(this.constructor,this._Bind(this._Style),p_invalidateCache);for(var _i21=0,_n17=this._styles.length;_i21<_n17;_i21++){UDOM.Attach(this._styles[_i21].cloneNode(true),this._host);}}},{key:"_Render",value:function _Render(){}},{key:"_PostRender",value:function _PostRender(){}},{key:"BringToFront",value:function BringToFront(){UDOM.ToFront(this);}// ----> Hierarchy
},{key:"parent",get:function get(){return this._parent;},set:function set(p_value){if(this._parent===p_value){return;}var oldParent=this._parent;this._parent=p_value;if(oldParent){oldParent.Remove(this);}if(this._parent){this._parent.Add(this);}this._OnParentChanged(oldParent);}/**
     * Called when the parent of this display object has changed. 
     * @param {*} p_oldParent 
     */},{key:"_OnParentChanged",value:function _OnParentChanged(p_oldParent){}// ----> DOM
},{key:"visible",get:function get(){return this._visible;},set:function set(p_value){if(this._visible===p_value){return;}this._visible=p_value;if(!p_value){this.style.display="none";}else{this.style.removeProperty("display");}//if(p_value){ this.style.display = ``; }
//else{ this.style.display = `none`; }
}// ----> Flags
},{key:"flags",get:function get(){return this._flags;}// ----> Request Handling
},{key:"_EmitLocalRequest",value:function _EmitLocalRequest(p_requestType){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_onSuccess=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var p_onFail=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;var p_timeout=arguments.length>4&&arguments[4]!==undefined?arguments[4]:0;var p_requestClass=arguments.length>5&&arguments[5]!==undefined?arguments[5]:Request;this._HandleLocalRequest(Request.Emit(p_requestType,p_options,this,p_onSuccess,p_onFail,p_timeout,p_requestClass,false));}},{key:"_HandleLocalRequest",value:function _HandleLocalRequest(p_request){if(p_request.emitter!=this&&this._requestSignalBox){this._requestSignalBox.Broadcast(p_request.requestType,p_request);}if(this._parent){this._parent._HandleLocalRequest(p_request);}else{RELAY.HandleRequest(p_request);}}},{key:"_RegisterLocalRequestHandler",value:function _RegisterLocalRequestHandler(p_requestType,p_fn){if(!this._requestSignalBox){this._requestSignalBox=new SignalBox();}this._requestSignalBox.Add(p_requestType,p_fn,this);}},{key:"_UnregisterLocalRequestHandler",value:function _UnregisterLocalRequestHandler(p_requestType,p_fn){if(!this._requestSignalBox){return;}this._requestSignalBox.Remove(p_requestType,p_fn,this);}// ----> Transforms
},{key:"transforms",get:function get(){return this._transforms;},set:function set(p_value){if(this._transforms===p_value){return;}this._transforms=p_value;this._DirtyTransform();}},{key:"dirty",get:function get(){return this._isTransformDirty;}},{key:"_DirtyTransform",value:function _DirtyTransform(){if(this._isTransformDirty){return;}this._isTransformDirty=true;UI.AddDirty(this);}},{key:"x",get:function get(){return U.Get(this._transforms,'x',0);},set:function set(p_value){if(this._transforms.x!=p_value){this._transforms.x=p_value;this._DirtyTransform();}}},{key:"y",get:function get(){return U.Get(this._transforms,'y',0);},set:function set(p_value){if(this._transforms.y!=p_value){this._transforms.y=p_value;this._DirtyTransform();}}},{key:"z",get:function get(){return U.Get(this._transforms,'z',0);},set:function set(p_value){if(this._transforms.z!=p_value){this._transforms.z=p_value;this._DirtyTransform();}}},{key:"rotation",get:function get(){return U.Get(this._transforms,'rotation',0);},set:function set(p_value){if(this._transforms.rotation!=p_value){this._transforms.rotation=p_value;this._DirtyTransform();}}},{key:"rotationX",get:function get(){return U.Get(this._transforms,'rotationX',0);},set:function set(p_value){if(this._transforms.rotationX!=p_value){this._transforms.rotationX=p_value;this._DirtyTransform();}}},{key:"rotationY",get:function get(){return U.Get(this._transforms,'rotationY',0);},set:function set(p_value){if(this._transforms.rotationY!=p_value){this._transforms.rotationY=p_value;this._DirtyTransform();}}},{key:"rotationZ",get:function get(){return U.Get(this._transforms,'rotationZ',0);},set:function set(p_value){if(this._transforms.rotationZ!=p_value){this._transforms.rotationZ=p_value;this._DirtyTransform();}}},{key:"scale",get:function get(){return U.Get(this._transforms,'scale',0);},set:function set(p_value){if(this._transforms.scale!=p_value){this._transforms.scale=p_value;this._DirtyTransform();}}},{key:"scaleX",get:function get(){return U.Get(this._transforms,'scaleX',0);},set:function set(p_value){if(this._transforms.scaleX!=p_value){this._transforms.scaleX=p_value;this._DirtyTransform();}}},{key:"scaleY",get:function get(){return U.Get(this._transforms,'scaleY',0);},set:function set(p_value){if(this._transforms.scaleY!=p_value){this._transforms.scaleY=p_value;this._DirtyTransform();}}},{key:"scaleZ",get:function get(){return U.Get(this._transforms,'scaleZ',0);},set:function set(p_value){if(this._transforms.scaleZ!=p_value){this._transforms.scaleZ=p_value;this._DirtyTransform();}}},{key:"ApplyTransforms",value:function ApplyTransforms(){//Update host's inline style according to stored transforms
var t=this._transforms;if(!t){this.style.removeProperty("transform");return;}//TODO : Optimize this
var rr=U.Get(t,'rotation',0),rx=U.Get(t,'rotationX',0),ry=U.Get(t,'rotationY',0),rz=U.Get(t,'rotationZ',0),r="".concat(rr===0?"":"rotate(".concat(rr,"deg)")).concat(rx===0?"":"rotateX(".concat(rx,"deg)")).concat(ry===0?"":"rotateX(".concat(ry,"deg)")).concat(rz===0?"":"rotateZ(".concat(rz,"deg)")),tx=U.Get(t,'x',0),ty=U.Get(t,'y',0),tz=U.Get(t,'z',0),tt="".concat(tx===0?"":"translateX(".concat(tx,"px)")).concat(ty===0?"":"translateY(".concat(ty,"px)")).concat(tz===0?"":"translateZ(".concat(tz,"px)")),ss=U.Get(t,'scale',1),sx=U.Get(t,'scaleX',1),sy=U.Get(t,'scaleY',1),sz=U.Get(t,'scaleZ',1),s="".concat(ss===1?"":"scale(".concat(ss,",").concat(ss,")")).concat(sx===1?"":"scaleX(".concat(sx,")")).concat(sy===1?"":"scaleX(".concat(sy,")")).concat(sz===1?"":"scaleZ(".concat(sz,")"));this.style.transform="".concat(tt).concat(r).concat(s);this._isTransformDirty=false;}},{key:"size",set:function set(p_value){this.width=p_value;this.height=p_value;}},{key:"width",set:function set(p_value){this.style.width=U.isEmpty(p_value)?"":"".concat(p_value,"px");}},{key:"height",set:function set(p_value){this.style.height=U.isEmpty(p_value)?"":"".concat(p_value,"px");}},{key:"sizeRel",set:function set(p_value){this.widthRel=p_value;this.heightRel=p_value;}},{key:"widthRel",set:function set(p_value){this.style.width=U.isEmpty(p_value)?"":"".concat(p_value,"%");}},{key:"heightRel",set:function set(p_value){this.style.height=U.isEmpty(p_value)?"":"".concat(p_value,"%");}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){this.visible=true;this.parent=null;this.order=null;this._transforms={};this.style.removeProperty("transform");_get(_getPrototypeOf(DisplayObject.prototype),"_CleanUp",this).call(this);//Workaround shadow dom leaving webcomponents floating around.
UDOM.Detach(this);//UI.GRAVEYARD.appendChild(this);
}},{key:"displayPath",get:function get(){var arr=new Array(0),p=this._parent;while(p!=null){arr.push(p.constructor.name);p=p.parent;}arr.reverse();arr.push(this.constructor.name);return arr.join('.');}}]);return DisplayObject;}(DisposableHTMLElement);module.exports["default"]=module.exports=DisplayObject;//UI.Register(`nkmjs-display-object`, DisplayObject);
},{"./disposable-htmlelement":173,"./helpers/flag-box":183,"./ui":209,"./ui-flag":206,"@nkmjs/actions":1,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/utils":268}],173:[function(require,module,exports){'use strict';var _require210=require("@nkmjs/common"),SIGNAL=_require210.SIGNAL,SignalBox=_require210.SignalBox;var _require211=require("@nkmjs/utils"),UDOM=_require211.UDOM;var UI_SIGNAL=require("./ui-signal");var uinc=0;var DisposableHTMLElement=/*#__PURE__*/function(_HTMLElement){_inherits(DisposableHTMLElement,_HTMLElement);var _super88=_createSuper(DisposableHTMLElement);function DisposableHTMLElement(){var _this10;_classCallCheck(this,DisposableHTMLElement);_this10=_super88.call(this);_this10._Init();_this10._PostInit();return _this10;}_createClass(DisposableHTMLElement,[{key:"_Init",value:function _Init(){this._uinc=uinc++;this._returnFn=null;this._releasing=false;this._releasePrevented=false;this._signals=new SignalBox();this._released=false;this._isPainted=false;this._isFirstPaint=true;}},{key:"_PostInit",value:function _PostInit(){}},{key:"_Bind",value:function _Bind(p_func){return this[p_func.name]=p_func.bind(this);}// ----> Painting
},{key:"isPainted",get:function get(){return this._isPainted;}},{key:"_OnPaintChange",value:function _OnPaintChange(){if(this._isPainted){if(this._isFirstPaint){this._signals.Broadcast(UI_SIGNAL.FIRST_PAINT,this);}this._signals.Broadcast(UI_SIGNAL.PAINTED,this);}else{this._signals.Broadcast(UI_SIGNAL.UNPAINTED,this);}}// ----> Signals
},{key:"_Broadcast",value:function _Broadcast(p_signalId){var _this$_signals3;for(var _len16=arguments.length,args=new Array(_len16>1?_len16-1:0),_key18=1;_key18<_len16;_key18++){args[_key18-1]=arguments[_key18];}(_this$_signals3=this._signals).Broadcast.apply(_this$_signals3,[p_signalId].concat(args));}},{key:"Watch",value:function Watch(p_evt,p_fn){var p_suscriber=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;this._signals.Add(p_evt,p_fn,p_suscriber);}},{key:"WatchOnce",value:function WatchOnce(p_evt,p_fn){var p_suscriber=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;this._signals.AddOnce(p_evt,p_fn,p_suscriber);}},{key:"Unwatch",value:function Unwatch(p_signalId,p_fn){var p_suscriber=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;this._signals.Remove(p_signalId,p_fn,p_suscriber);}// ----> Pooling
},{key:"returnFunc",set:function set(value){this._returnFn=value;}},{key:"returnContext",set:function set(value){this._returnContext=value;}},{key:"PreventRelease",value:function PreventRelease(){this._releasePrevented=true;}/**
     * Releases the object and pool it.
     */},{key:"Release",value:function Release(){if(this._releasing){return;}this._releasing=true;this._Broadcast(SIGNAL.RELEASING,this);if(this._releasePrevented){this._releasing=false;this._releasePrevented=false;return;}this._released=true;this._Broadcast(SIGNAL.RELEASED,this);this._CleanUp();UDOM.Detach(this);if(this._returnFn!=undefined){this._returnFn(this);}this._releasing=false;}},{key:"_CleanUp",value:function _CleanUp(){this._releasePrevented=false;this._signals.Clear();this._isFirstPaint=true;this.constructor.__paintingObserver.unobserve(this);}},{key:"Wake",value:function Wake(){this._released=false;this._Wake();this._PostWake();this.constructor.__paintingObserver.observe(this);}},{key:"_Wake",value:function _Wake(){}},{key:"_PostWake",value:function _PostWake(){}},{key:"toString",value:function toString(){return"<".concat(this.constructor.name,">");}}]);return DisposableHTMLElement;}(/*#__PURE__*/_wrapNativeSuper(HTMLElement));_defineProperty(DisposableHTMLElement,"__usePaintCallback",false);_defineProperty(DisposableHTMLElement,"__paintingObserver",new IntersectionObserver(function(entries,observer){// Each entry describes an intersection change for one observed
// target element:
//   entry.boundingClientRect
//   entry.intersectionRatio
//   entry.intersectionRect
//   entry.isIntersecting
//   entry.rootBounds
//   entry.target
//   entry.time
for(var i=0,n=entries.length;i<n;i++){var entry=entries[i],target=entry.target;if(entry.isIntersecting){if(target._isPainted){continue;}target._isPainted=true;if(target.constructor.__usePaintCallback){target._OnPaintChange();}target._isFirstPaint=false;}else{if(!target._isPainted){continue;}target._isPainted=false;if(target.constructor.__usePaintCallback){target._OnPaintChange();}}}},{threshold:0}));module.exports["default"]=module.exports=DisposableHTMLElement;},{"./ui-signal":208,"@nkmjs/common":27,"@nkmjs/utils":268}],174:[function(require,module,exports){'use strict';var _require212=require("@nkmjs/utils"),U=_require212.U,UDOM=_require212.UDOM;var _require213=require("@nkmjs/common"),COM_ID=_require213.COM_ID;var DOMTemplate=/*#__PURE__*/function(){function DOMTemplate(){_classCallCheck(this,DOMTemplate);}// ----> Template
_createClass(DOMTemplate,[{key:"Render",value:/**
     * Render the DOM template into an host.
     * @param {*} p_host Object to create element into
     * @param {*} p_propertyHolder Object to create properties onto
     */function Render(p_host){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;if("_wrapper"in p_host){p_host=p_host._wrapper;}var owner=U.Get(p_options,COM_ID.OWNER,this);if(!owner){owner=this;}var tpl=this.constructor.__HTMLtemplate;if(!tpl){this.constructor._CreateTemplate();tpl=this.constructor.__HTMLtemplate;}for(var i=0,n=tpl.length;i<n;i++){var nodeInfos=tpl[i],node=nodeInfos.node.cloneNode(true);if(nodeInfos.parent){owner[nodeInfos.parent].appendChild(node);}else{p_host.appendChild(node);}if(nodeInfos.id){owner[nodeInfos.id]=node;}}return owner;}}],[{key:"_CreateTemplate",value:/**
     * Create a node template to be cloned by _RenderTemplate to speed up initialization.
     */function _CreateTemplate(){if(this.__HTMLtemplate){throw new Error("HTMLTemplate (".concat(this.name,") initialized more than once."));}this.__HTMLtemplate=new Array(0);}},{key:"_Add",value:function _Add(p_element){var p_id=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_parentId=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var node={node:p_element};if(p_id){node.id=p_id;}if(p_parentId){node.parent=p_parentId;}this.__HTMLtemplate.push(node);}},{key:"Render",value:function Render(p_tpl,p_host,p_options){var tpl=new p_tpl();tpl.Render(p_host,p_options);return tpl;}}]);return DOMTemplate;}();_defineProperty(DOMTemplate,"__HTMLtemplate",null);module.exports["default"]=module.exports=DOMTemplate;},{"@nkmjs/common":27,"@nkmjs/utils":268}],175:[function(require,module,exports){'use strict';var _require214=require("@nkmjs/utils"),U=_require214.U;var _require215=require("@nkmjs/common"),DisposableObjectEx=_require215.DisposableObjectEx,POOL=_require215.POOL;var ExtBase=/*#__PURE__*/function(_DisposableObjectEx23){_inherits(ExtBase,_DisposableObjectEx23);var _super89=_createSuper(ExtBase);function ExtBase(){var _this11;_classCallCheck(this,ExtBase);_this11=_super89.call(this);_this11._isEnabled=false;_this11._childExtensions=null;return _this11;}_createClass(ExtBase,[{key:"Add",value:function Add(p_ext){if(!this._childExtensions){this._childExtensions=new Array(0);}if(this._childExtensions.includes(p_ext)){return p_ext;}if(U.isFunc(p_ext)){p_ext=POOL.Rent(p_ext);}this._childExtensions.push(p_ext);p_ext.enabled=this._isEnabled;return p_ext;}},{key:"Remove",value:function Remove(p_ext){if(!this._childExtensions||this._childExtensions.includes(p_ext)){return null;}this._childExtensions.push(p_ext);p_ext.Disable();return p_ext;}// ----> Availability
},{key:"isEnabled",get:function get(){return this._isEnabled;}},{key:"enabled",set:function set(p_value){if(p_value){this.Enable();}else{this.Disable();}}},{key:"Enable",value:function Enable(){if(this._isEnabled){return false;}this._isEnabled=true;if(this._childExtensions){for(var i=0,n=this._childExtensions.length;i<n;i++){this._childExtensions[i].Enable();}}return true;}},{key:"Disable",value:function Disable(){if(!this._isEnabled){return false;}this._isEnabled=false;if(this._childExtensions){for(var i=0,n=this._childExtensions.length;i<n;i++){this._childExtensions[i].Disable();}}return true;}},{key:"_CleanUp",value:function _CleanUp(){this.Disable();this._childExtensions.length=0;this._childExtensions=null;_get(_getPrototypeOf(ExtBase.prototype),"_CleanUp",this).call(this);}}]);return ExtBase;}(DisposableObjectEx);module.exports["default"]=module.exports=ExtBase;},{"@nkmjs/common":27,"@nkmjs/utils":268}],176:[function(require,module,exports){'use strict';var _require216=require("@nkmjs/utils"),UDOM=_require216.UDOM;var _require217=require("@nkmjs/common"),SIGNAL=_require217.SIGNAL,Observer=_require217.Observer,DisposableObjectEx=_require217.DisposableObjectEx;var UI=require("../ui");var INPUT=require("../input");var UI_FLAG=require("../ui-flag");var UI_SIGNAL=require("../ui-signal");var ExtBase=require("./ext-base");var MOUSE=require("../mouse");var _dragDataContent=new Array(0);var ExtDrag=/*#__PURE__*/function(_ExtBase){_inherits(ExtDrag,_ExtBase);var _super90=_createSuper(ExtDrag);function ExtDrag(){_classCallCheck(this,ExtDrag);return _super90.call(this);}// ----> Init
_createClass(ExtDrag,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(ExtDrag.prototype),"_Init",this).call(this);this._isEnabled=true;this._target=null;this._activator=null;this._feedbackHost=null;this._grabDataCallback=null;this._ownerObserver=new Observer();this._ownerObserver.Hook(UI_SIGNAL.DRAG_STARTED,this._OnOwnerDragStarted,this);this._ownerObserver.Hook(UI_SIGNAL.DRAG_ENDED,this._OnOwnerDragEnded,this);this._ownerObserver.Hook(SIGNAL.RELEASED,this._OnOwnerReleased,this);this._Bind(this._mUp);this._Bind(this._mDown);this._Bind(this._mDragStart);this._Bind(this._mDrag);this._Bind(this._mDragEnd);this._hintElement=null;//The trick is not to add the draggable attribute until the drag handle gets the mousedown event.
}},{key:"_OnOwnerReleased",value:function _OnOwnerReleased(p_was){this.owner=null;}},{key:"grabDataCallback",get:function get(){return this._grabDataCallback;},set:function set(p_value){this._grabDataCallback=p_value;}},{key:"activator",get:function get(){return this._activator;},set:function set(p_value){if(this._activator===p_value){return;}var oldValue=this._activator;this._activator=p_value;if(this._isEnabled){if(oldValue){oldValue.removeEventListener("mousedown",this._mDown);}if(p_value){p_value.addEventListener("mousedown",this._mDown);}}}},{key:"owner",get:function get(){return this._owner;},set:function set(p_value){if(this._owner===p_value){return;}this._owner=p_value;this._ownerObserver.ObserveOnly(p_value);}},{key:"Setup",value:function Setup(p_target){var p_activator=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_feedback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var oldTarget=this._target;this._target=p_target;this.activator=p_activator?p_activator:p_target;this._feedbackHost=p_feedback?p_feedback:p_target;if(oldTarget){oldTarget.flags.Remove(oldTarget,UI_FLAG.DRAGGED);}if(p_target){p_target.flags.Add(p_target,UI_FLAG.DRAGGED);}}// ----> Availability
},{key:"isEnabled",get:function get(){return this._isEnabled;}},{key:"enabled",set:function set(p_value){if(p_value){this.Enable();}else{this.Disable();}}},{key:"Enable",value:function Enable(){if(!_get(_getPrototypeOf(ExtDrag.prototype),"Enable",this).call(this)){return false;}if(this._activator){this._activator.addEventListener("mousedown",this._mDown);}return true;}},{key:"Disable",value:function Disable(){if(!_get(_getPrototypeOf(ExtDrag.prototype),"Disable",this).call(this)){return false;}if(this._activator){this._activator.removeEventListener("mousedown",this._mDown);}return true;}//
},{key:"_mDown",value:function _mDown(p_evt){if(!this._isEnabled||p_evt.button!==MOUSE.BTN_LEFT){return;}this._target.setAttribute("draggable",true);this._target.addEventListener("dragstart",this._mDragStart);MOUSE.Watch(MOUSE.MOUSE_UP,this._mUp);}},{key:"_mUp",value:function _mUp(p_evt){if(!this._isEnabled||p_evt.button!==MOUSE.BTN_LEFT){return;}MOUSE.Unwatch(MOUSE.MOUSE_UP,this._mUp);this._EndDrag();}},{key:"_mDragStart",value:function _mDragStart(p_evt){if(this._feedbackHost){console.log(p_evt);p_evt.dataTransfer.setDragImage(this._feedbackHost,-10,-10);}MOUSE.Unwatch(MOUSE.MOUSE_UP,this._mUp);this._target.addEventListener("dragend",this._mDragEnd);this._target.addEventListener("drag",this._mDrag);_dragDataContent.length=0;this._OwnerBroadcast(UI_SIGNAL.DRAG_STARTED);UI.DragStarted(_dragDataContent,this._target);this._ShowHint();}},{key:"_mDrag",value:function _mDrag(p_evt){//Keep mouse position up-to-date in MOUSE
//mousemove being muted on drag :/
MOUSE.instance._mMove(p_evt);this._OwnerBroadcast(UI_SIGNAL.DRAGGED);}},{key:"_mDragEnd",value:function _mDragEnd(p_evt){this._EndDrag();this._OwnerBroadcast(UI_SIGNAL.DRAG_ENDED);UI.DragEnded();}},{key:"_GrabData",value:function _GrabData(){return this._grabDataCallback();}},{key:"_EndDrag",value:function _EndDrag(){this._target.removeAttribute("draggable");this._target.removeEventListener("dragstart",this._mDragStart);this._target.removeEventListener("dragend",this._mDragEnd);this._target.removeEventListener("drag",this._mDrag);this._HideHint();}// ----> Generic event handling
},{key:"_OwnerBroadcast",value:function _OwnerBroadcast(p_evt){this._owner._Broadcast(p_evt,this._owner);}},{key:"_OnOwnerDragStarted",value:function _OnOwnerDragStarted(p_target){if(!this._isEnabled){return;}_dragDataContent.push(this._GrabData());this._target.flags.Set(UI_FLAG.DRAGGED,true);}},{key:"_OnOwnerDragEnded",value:function _OnOwnerDragEnded(p_target){if(!this._isEnabled){return;}this._target.flags.Set(UI_FLAG.DRAGGED,false);}},{key:"_ShowHint",value:function _ShowHint(){if(this._feedbackHost){if(this._hintElement){UDOM.Attach(this._hintElement,this._feedbackHost);}else{this._hintElement=UDOM.New("div",{"class":"ext-overlay drag-overlay"},this._feedbackHost);}}}},{key:"_HideHint",value:function _HideHint(){if(this._hintElement){UDOM.Detach(this._hintElement);}}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){this._HideHint();this._hintElement=null;this._EndDrag();_get(_getPrototypeOf(ExtDrag.prototype),"_CleanUp",this).call(this);}}]);return ExtDrag;}(ExtBase);module.exports["default"]=module.exports=ExtDrag;},{"../input":189,"../mouse":195,"../ui":209,"../ui-flag":206,"../ui-signal":208,"./ext-base":175,"@nkmjs/common":27,"@nkmjs/utils":268}],177:[function(require,module,exports){'use strict';var _require218=require("@nkmjs/utils"),UDOM=_require218.UDOM;var INPUT=require("../input");var MOUSE=require("../mouse");var UI=require("../ui");var UI_FLAG=require("../ui-flag");var UI_SIGNAL=require("../ui-signal");var ExtBase=require("./ext-base");var _activeTarget=null;var ExtDrop=/*#__PURE__*/function(_ExtBase2){_inherits(ExtDrop,_ExtBase2);var _super91=_createSuper(ExtDrop);function ExtDrop(){_classCallCheck(this,ExtDrop);return _super91.call(this);}// ----> Init
_createClass(ExtDrop,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(ExtDrop.prototype),"_Init",this).call(this);this._target=null;this._feedbackHost=null;//TODO : Gotta emulate dragenter/leave
//in order to neatly handle nested drop handlers
this._hooks=new Array(0);this._allowedHooks=new Array(0);this._onDragOverHooks=new Array(0);this._onLeaveHooks=new Array(0);this._isAcceptingCurrentData=false;this._isActive=false;this._Bind(this._mDragEnter);this._Bind(this._mDragLeave);this._Bind(this._mDragOver);this._Bind(this._mDrop);this._hintElement=null;//TODO : Add event callbacks to handle differently different types of drop
//check if a drop is acceptable etc
}},{key:"target",get:function get(){return this._target;},set:function set(p_value){if(this._target===p_value){return;}var oldValue=this._target;this._target=p_value;if(this._isEnabled){if(oldValue){oldValue.removeEventListener("dragenter",this._mDragEnter);}if(p_value){p_value.addEventListener("dragenter",this._mDragEnter);}}}},{key:"Setup",value:function Setup(p_target){var p_feedback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var oldTarget=this._target;this.target=p_target;this._feedbackHost=p_feedback?p_feedback:p_target;if(oldTarget){oldTarget.flags.Remove(oldTarget,UI_FLAG.ALLOW_DROP);}if(p_target){p_target.flags.Add(p_target,UI_FLAG.ALLOW_DROP);}}// ----> Availability
},{key:"Enable",value:function Enable(){if(!_get(_getPrototypeOf(ExtDrop.prototype),"Enable",this).call(this)){return false;}if(this._target){this._target.addEventListener("dragenter",this._mDragEnter);}return true;}},{key:"Disable",value:function Disable(){if(!_get(_getPrototypeOf(ExtDrop.prototype),"Disable",this).call(this)){return false;}if(this._target){this._target.removeEventListener("dragenter",this._mDragEnter);}return true;}},{key:"_mDragEnter",value:function _mDragEnter(p_evt){this._allowedHooks.length=0;this._onDragOverHooks.length=0;this._onLeaveHooks.length=0;var dragList=UI.DRAG_DATA;outerloop:for(var i=0,n=this._hooks.length;i<n;i++){var hook=this._hooks[i],pass=false;innerloop:for(var d=0,n2=dragList.length;d<n2;d++){var dragData=dragList[d];if(hook.check.thisArg){pass=hook.check.fn.call(hook.check.thisArg,dragData);}else{pass=hook.check.fn(dragData);}if(pass){break innerloop;}}if(pass){this._allowedHooks.push(hook);if(hook.drag){this._onDragOverHooks.push(hook.drag);}if(hook.leave){this._onLeaveHooks.push(hook.leave);}}}if(this._allowedHooks.length===0){this._isAcceptingCurrentData=false;this._Clear();}else{this._isAcceptingCurrentData=true;this._target.addEventListener("dragleave",this._mDragLeave);this._target.addEventListener("dragover",this._mDragOver);}}},{key:"_dragEnd",value:function _dragEnd(p_extDrag){this._Clear();}},{key:"_mDragLeave",value:function _mDragLeave(p_evt){this._Clear();}},{key:"_mDragOver",value:function _mDragOver(p_evt){if(p_evt.defaultPrevented){this._Activate(false);return;}if(this._isAcceptingCurrentData){p_evt.preventDefault();this._Activate(true);var dragData=UI.DRAG_DATA;for(var i=0,n=this._onDragOverHooks.length;i<n;i++){var hook=this._onDragOverHooks[i];if(hook.thisArg){hook.fn.call(hook.thisArg,dragData);}else{hook.fn(dragData);}}}}},{key:"_mDrop",value:function _mDrop(p_evt){var dragList=UI.DRAG_DATA,pass=false;for(var d=0,n=dragList.length;d<n;d++){var dragData=dragList[d];for(var i=0,n2=this._allowedHooks.length;i<n2;i++){var hook=this._allowedHooks[i];if(hook.check.thisArg){pass=hook.check.fn.call(hook.check.thisArg,dragData);}else{pass=hook.check.fn(dragData);}if(!pass){continue;}if(hook.drop){hook.drop.fn.call(hook.drop.thisArg,dragData);}else{hook.drop.fn(dragData);}}}UI.DRAG_TARGET._Broadcast(UI_SIGNAL.DROPPED,UI.DRAG_TARGET);this._Clear();}},{key:"_Activate",value:function _Activate(p_toggle){if(this._isActive===p_toggle){return;}this._isActive=p_toggle;if(this._feedbackHost){this._feedbackHost.flags.Set(UI_FLAG.ALLOW_DROP,p_toggle);for(var i=0,n=this._allowedHooks.length;i<n;i++){var hook=this._allowedHooks[i],flags=hook.flag;if(!flags){continue;}if(Array.isArray(flags)){for(var _i22=0,n2=flags.length;_i22<n2;_i22++){this._feedbackHost.flags.Set(flags[_i22],p_toggle);}}else{this._feedbackHost.flags.Set(flags,p_toggle);}}}if(p_toggle){//Becomes the main drop target        
ExtDrop.ACTIVE_TARGET=this;this._target.addEventListener("drop",this._mDrop);UI.instance.Unwatch(UI_SIGNAL.DRAG_ENDED,this._dragEnd,this);}else{//Stops being the main drop target
if(ExtDrop.ACTIVE_TARGET===this){ExtDrop.ACTIVE_TARGET=null;}this._target.removeEventListener("drop",this._mDrop);UI.instance.Watch(UI_SIGNAL.DRAG_ENDED,this._dragEnd,this);}}},{key:"_Clear",value:function _Clear(){var dragData=UI.DRAG_DATA;for(var i=0,n=this._onLeaveHooks.length;i<n;i++){var hook=this._onLeaveHooks[i];if(hook.thisArg){hook.fn.call(hook.thisArg,dragData);}else{hook.fn(dragData);}}this._target.removeEventListener("dragleave",this._mDragLeave);this._target.removeEventListener("dragover",this._mDragOver);this._Activate(false);}// ----> Hint
//TODO: Implement hint management -- may need something more complex than just a bare div overlay
//in order to provide visual feedback/text on what's going to happen when item is dropped
},{key:"_ShowHint",value:function _ShowHint(){if(this._feedbackHost){if(this._hintElement){UDOM.Attach(this._hintElement,this._feedbackHost);}else{this._hintElement=UDOM.New("div",{"class":"ext-overlay drag-overlay"},this._feedbackHost);}}}},{key:"_HideHint",value:function _HideHint(){if(this._hintElement){UDOM.Detach(this._hintElement);}}// ----> Check
/**
     * 
     * Register callback list for specified steps in the form { fn:xxx, thisArg:xxx, flag:xxx }
     * where fn is the Function to be called with thisArg (optional).
     * 
     * @param {object} p_hookOptions 
     * @param {object} p_hookOptions.check
     * @param {object} p_hookOptions.drop
     * @param {object} p_hookOptions.drag
     * @param {object} p_hookOptions.leave
     * @param {object} p_hookOptions.flag optional flag or array of flags to be set TRUE on the feedbackTarget when the drop operation starts
     */},{key:"Hook",value:function Hook(p_hookOptions){this._hooks.push(p_hookOptions);}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){this._hooks.length=0;_get(_getPrototypeOf(ExtDrop.prototype),"_CleanUp",this).call(this);}}],[{key:"ACTIVE_TARGET",get:function get(){return _activeTarget;},set:function set(p_value){var oldTarget=_activeTarget;_activeTarget=p_value;if(oldTarget){oldTarget._Activate(false);}if(_activeTarget){_activeTarget._Activate(true);}}}]);return ExtDrop;}(ExtBase);module.exports["default"]=module.exports=ExtDrop;},{"../input":189,"../mouse":195,"../ui":209,"../ui-flag":206,"../ui-signal":208,"./ext-base":175,"@nkmjs/utils":268}],178:[function(require,module,exports){'use strict';var _require219=require("@nkmjs/utils"),U=_require219.U;var _require220=require("@nkmjs/common"),DisposableObjectEx=_require220.DisposableObjectEx;var UI_FLAG=require("../ui-flag");var UI_SIGNAL=require("../ui-signal");var DisplayObject=require("../display-object");var ExtBase=require("./ext-base");/**
 * 
 *  *--------------------------------*
 *  | + [] Item Name          [][][] |
 *  *--------------------------------*
 * 
 */var ExtExpand=/*#__PURE__*/function(_ExtBase3){_inherits(ExtExpand,_ExtBase3);var _super92=_createSuper(ExtExpand);function ExtExpand(){_classCallCheck(this,ExtExpand);return _super92.call(this);}// ----> Init
_createClass(ExtExpand,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(ExtExpand.prototype),"_Init",this).call(this);this._target=null;this._wrapper=null;this._isExpanded=false;this._activator=null;this._activateOnAlt=false;this._Bind(this._mClick);}},{key:"isExpanded",get:function get(){return this._isExpanded;}},{key:"activateOnAlt",get:function get(){return this._activateOnAlt;},set:function set(p_value){this._activateOnAlt=p_value;}},{key:"activator",get:function get(){return this._activator;},set:function set(p_value){//if(this._activator === p_value){return;}
var oldValue=this._activator;this._activator=p_value;if(this._isEnabled){if(oldValue){if(U.isInstanceOf(oldValue,DisplayObject)){oldValue.Unwatch(UI_SIGNAL.ACTIVATED,this._OnWidgetActivated,this);}else{oldValue.removeEventListener("click",this._mClick);}}if(p_value){if(U.isInstanceOf(p_value,DisplayObject)){p_value.Watch(UI_SIGNAL.ACTIVATED,this._OnWidgetActivated,this);}else{p_value.addEventListener("click",this._mClick);}}}}},{key:"Setup",value:function Setup(p_target,p_wrapper){var p_activator=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var p_activateOnAlt=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;this._target=p_target;this._wrapper=p_wrapper;if(!p_target){return;}p_target.flags.Add(p_target,UI_FLAG.EXPANDED,UI_FLAG.COLLAPSED);if(p_wrapper){p_target.flags.Add(p_wrapper,UI_FLAG.EXPANDED,UI_FLAG.COLLAPSED);}this._UpdateFlags();this._Broadcast(this._isExpanded?UI_SIGNAL.EXPANDED:UI_SIGNAL.COLLAPSED);if(p_activator){this.activator=p_activator;this._activateOnAlt=p_activateOnAlt;}}// ----> Availability
},{key:"Enable",value:function Enable(){if(!_get(_getPrototypeOf(ExtExpand.prototype),"Enable",this).call(this)){return false;}if(this._activator){if(U.isInstanceOf(this._activator,DisplayObject)){this._activator.Watch(UI_SIGNAL.ACTIVATED,this._OnWidgetActivated,this);}else{this._activator.addEventListener("click",this._mClick);}}return true;}},{key:"Disable",value:function Disable(){if(!_get(_getPrototypeOf(ExtExpand.prototype),"Disable",this).call(this)){return false;}if(this._activator){if(U.isInstanceOf(this._activator,DisplayObject)){this._activator.Unwatch(UI_SIGNAL.ACTIVATED,this._OnWidgetActivated,this);}else{this._activator.removeEventListener("click",this._mClick);}}return true;}},{key:"_OnWidgetActivated",value:function _OnWidgetActivated(p_widget,p_evt){this.Toggle();}},{key:"_mClick",value:function _mClick(p_evt){if(p_evt.detail>1){if(this._activateOnAlt){this.Toggle();}}//second click of dbclick
else if(!this._activateOnAlt){this.Toggle();}}},{key:"Toggle",value:function Toggle(){if(this._isExpanded){this.Collapse();}else{this.Expand();}}},{key:"Expand",value:function Expand(){var p_scrollTo=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;if(this._isExpanded){return;}this._isExpanded=true;this._UpdateFlags();if(p_scrollTo){this._target.scrollIntoView({behavior:'auto',block:'nearest',inline:'start'});}this._Broadcast(UI_SIGNAL.EXPANDED);}},{key:"Collapse",value:function Collapse(){if(!this._isExpanded){return;}this._isExpanded=false;this._UpdateFlags();this._Broadcast(UI_SIGNAL.COLLAPSED);}},{key:"_UpdateFlags",value:function _UpdateFlags(){if(!this._target){return;}this._target.flags.Set(UI_FLAG.EXPANDED,this._isExpanded);this._target.flags.Set(UI_FLAG.COLLAPSED,!this._isExpanded);}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){this._HideHint();this._hintElement=null;this._target=null;_get(_getPrototypeOf(ExtExpand.prototype),"_CleanUp",this).call(this);}}]);return ExtExpand;}(ExtBase);module.exports["default"]=module.exports=ExtExpand;},{"../display-object":172,"../ui-flag":206,"../ui-signal":208,"./ext-base":175,"@nkmjs/common":27,"@nkmjs/utils":268}],179:[function(require,module,exports){'use strict';var _require221=require("@nkmjs/utils"),U=_require221.U;var _require222=require("@nkmjs/common"),SIGNAL=_require222.SIGNAL,DisposableObjectEx=_require222.DisposableObjectEx;var UI_FLAG=require("../ui-flag");var FlagEnum=require("../helpers/flag-enum");var INPUT=require("../input");var ExtBase=require("./ext-base");/**
 * An BaseManipulator is an abstract control wrapper to manipulate a DOM element.
 * It circumvents the need for a fully-fledged display object to avoid bloating the DOM.
 */var ExtMouseMove=/*#__PURE__*/function(_ExtBase4){_inherits(ExtMouseMove,_ExtBase4);var _super93=_createSuper(ExtMouseMove);/**
     * 
     * @param {*} p_element 
     */function ExtMouseMove(){var _this12;var p_element=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;_classCallCheck(this,ExtMouseMove);_this12=_super93.call(this);_this12._element=p_element;_this12._isMouseOver=false;_this12._Bind(_this12._mOver);_this12._Bind(_this12._mOut);_this12._Bind(_this12._mMove);_this12._moveFn=null;_this12._startPos=null;_this12._currentPos=null;_this12._currentOffset=null;return _this12;}_createClass(ExtMouseMove,[{key:"element",get:function get(){return this._element;},set:function set(p_value){if(this._element===p_value){return;}var oldElement=this._element;this._element=p_value;if(this._isEnabled){if(oldElement){oldElement.removeEventListener("mouseenter",this._mOver);}if(this._element){this._element.addEventListener("mouseenter",this._mOver);}}}// ----> Availability
},{key:"Enable",value:function Enable(){if(!_get(_getPrototypeOf(ExtMouseMove.prototype),"Enable",this).call(this)){return false;}if(this._element){this._element.addEventListener("mouseenter",this._mOver);}return true;}},{key:"Disable",value:function Disable(){if(!_get(_getPrototypeOf(ExtMouseMove.prototype),"Disable",this).call(this)){return false;}if(this._element){this._element.removeEventListener("mouseenter",this._mOver);}return true;}},{key:"isMouseOver",get:function get(){return this._isMouseOver;}},{key:"startPos",get:function get(){return this._startPos;}},{key:"currentPos",get:function get(){return this._currentPos;}},{key:"currentOffset",get:function get(){return this._currentOffset;}/**
     * Pin current position as start
     */},{key:"PinStart",value:function PinStart(){this._startPos.x=this._currentPos.x;this._startPos.y=this._currentPos.y;}},{key:"distanceToStart",get:function get(){var a=this._startPos.x-this._currentPos.x;var b=this._startPos.y-this._currentPos.y;return Math.sqrt(a*a+b*b);}},{key:"distanceOffset",get:function get(){var a=this._currentOffset.x;var b=this._currentOffset.y;return Math.sqrt(a*a+b*b);}},{key:"moveFn",set:function set(p_value){this._moveFn=p_value;}},{key:"_mOver",value:function _mOver(p_evt){if(this._isMouseOver){return;}this._isMouseOver=true;this._startPos={x:p_evt.clientX,y:p_evt.clientY};this._currentPos={x:p_evt.clientX,y:p_evt.clientY};this._currentOffset={x:0,y:0};this._element.addEventListener("mousemove",this._mMove);}},{key:"_mOut",value:function _mOut(p_evt){if(!this._isMouseOver){return;}this._isMouseOver=false;this._element.removeEventListener("mousemove",this._mMove);}},{key:"_mMove",value:function _mMove(p_evt){this._currentOffset.x=this._currentPos.x-p_evt.clientX;this._currentOffset.y=this._currentPos.y-p_evt.clientY;this._currentPos.x=p_evt.clientX;this._currentPos.y=p_evt.clientY;if(this._moveFn){this._moveFn(this);}}}]);return ExtMouseMove;}(ExtBase);module.exports["default"]=module.exports=ExtMouseMove;},{"../helpers/flag-enum":184,"../input":189,"../ui-flag":206,"./ext-base":175,"@nkmjs/common":27,"@nkmjs/utils":268}],180:[function(require,module,exports){'use strict';var UI=require("../ui");var MOUSE=require("../mouse");var UI_SIGNAL=require("../ui-signal");var ExtBase=require("./ext-base");/**
 * An BaseManipulator is an abstract control wrapper to manipulate a DOM element.
 * It circumvents the need for a fully-fledged display object to avoid bloating the DOM.
 */var ExtMouse=/*#__PURE__*/function(_ExtBase5){_inherits(ExtMouse,_ExtBase5);var _super94=_createSuper(ExtMouse);/**
     * 
     * @param {*} p_element 
     */function ExtMouse(){var _this13;var p_element=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;_classCallCheck(this,ExtMouse);_this13=_super94.call(this);_this13._element=p_element;_this13._hooks={};_this13._using={};_this13._buttons={};_this13._isMouseOver=false;_this13._isAnyBtnDown=false;_this13._Bind(_this13._mOver);_this13._Bind(_this13._mOut);_this13._Bind(_this13._mDown);_this13._Bind(_this13._mUp);_this13._Bind(_this13._mUpOutside);_this13._Bind(_this13._mWheel);_this13._focusFn=null;/*

            p_evt.button 

            0 = Left click
            1 = Middle click
            2 = Right click
            3 = Prev click (ish)
            4 = Next click (ish)

        */return _this13;}_createClass(ExtMouse,[{key:"wheelFn",set:function set(p_value){this._wheelFn=p_value;}},{key:"focusFn",set:function set(p_value){this._focusFn=p_value;}//
},{key:"element",get:function get(){return this._element;},set:function set(p_value){if(this._element===p_value){return;}var oldElement=this._element;this._element=p_value;if(this._isEnabled){if(oldElement){oldElement.removeEventListener("mouseenter",this._mOver);}if(this._element){this._element.addEventListener("mouseenter",this._mOver);}}}// ----> Availability
},{key:"Enable",value:function Enable(){if(!_get(_getPrototypeOf(ExtMouse.prototype),"Enable",this).call(this)){return false;}if(this._element){this._element.addEventListener("mouseenter",this._mOver);}return true;}},{key:"Disable",value:function Disable(){if(!_get(_getPrototypeOf(ExtMouse.prototype),"Disable",this).call(this)){return false;}if(this._element){this._element.removeEventListener("mouseenter",this._mOver);}return true;}// ----> Internal Events
},{key:"isMouseOver",get:function get(){return this._isMouseOver;}},{key:"isMouseDown",value:function isMouseDown(){var p_btn=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;if(p_btn===null){for(var btn in this._buttons){if(this._buttons[btn]===MOUSE.DOWN){return true;}}return false;}return p_btn in this._buttons&&this._buttons[p_btn]===MOUSE.DOWN;}},{key:"_mOver",value:function _mOver(p_evt){this._isMouseOver=true;this._element.addEventListener("mousedown",this._mDown);this._element.addEventListener("mouseup",this._mUp);this._element.addEventListener("mouseleave",this._mOut);if(this._isAnyBtnDown){MOUSE.Unwatch(MOUSE.MOUSE_UP,this._mUpOutside);}if(this._focusFn){this._focusFn(true);}if(this._wheelFn){this._element.addEventListener('wheel',this._mWheel);}}},{key:"_mOut",value:function _mOut(p_evt){this._isMouseOver=false;this._element.removeEventListener("mousedown",this._mDown);this._element.removeEventListener("mouseup",this._mUp);this._element.removeEventListener("mouseleave",this._mOut);if(this._isAnyBtnDown){MOUSE.Watch(MOUSE.MOUSE_UP,this._mUpOutside);}else if(this._focusFn){this._focusFn(false);}if(this._wheelFn){this._element.removeEventListener('wheel',this._mWheel);}}},{key:"_mDown",value:function _mDown(p_evt){MOUSE.instance.StartUsing(this._using);this._isAnyBtnDown=true;// Check if any middle event is registered
var eNum=p_evt.button;this._buttons[eNum]=MOUSE.DOWN;this._Trigger("".concat(eNum,"_").concat(MOUSE.DOWN));UI.Watch(UI_SIGNAL.DRAG_ENDED,this._mUpOutside);}},{key:"_mUp",value:function _mUp(p_evt){var eNum=p_evt.button;if(this._buttons[eNum]===MOUSE.DOWN){this._buttons[eNum]=MOUSE.UP;this._Trigger("".concat(eNum,"_").concat(MOUSE.UP));if(p_evt.detail===1){this._Trigger("".concat(eNum,"_").concat(MOUSE.RELEASE));}else if(p_evt.detail===2){this._Trigger("".concat(eNum,"_").concat(MOUSE.RELEASE_TWICE));}}else{this._buttons[eNum]=MOUSE.UP;this._Trigger("".concat(eNum,"_").concat(MOUSE.UP));}delete this._buttons[eNum];this._isAnyBtnDown=this.isMouseDown();if(!this._isAnyBtnDown){UI.Unwatch(UI_SIGNAL.DRAG_ENDED,this._mUpOutside);MOUSE.instance.StopUsing(this._using);}}},{key:"_mUpOutside",value:function _mUpOutside(p_evt){if(p_evt){var eNum=p_evt.button;if(this._buttons[eNum]===MOUSE.DOWN){this._Trigger("".concat(eNum,"_").concat(MOUSE.RELEASE_OUTSIDE));}delete this._buttons[eNum];}else{// INPUT.DRAG_END does not have a button
for(var key in this._buttons){this._Trigger("".concat(this._buttons[key],"_").concat(MOUSE.RELEASE_OUTSIDE));}this._buttons={};}this._isAnyBtnDown=this.isMouseDown();if(!this._isAnyBtnDown){if(this._focusFn){this._focusFn(false);}MOUSE.Unwatch(MOUSE.MOUSE_UP,this._mUpOutside);UI.Unwatch(UI_SIGNAL.DRAG_ENDED,this._mUpOutside);MOUSE.instance.StopUsing(this._using);}}},{key:"_mWheel",value:function _mWheel(p_evt){if(this._wheelFn){this._wheelFn(p_evt);}}// ----> Event hooks
},{key:"Hook",value:function Hook(p_button,p_state,p_fn){var id="".concat(p_button,"_").concat(p_state),fnList=this._hooks[id];if(!this._using[p_button]){this._using[p_button]=1;}else{this._using[p_button]++;}if(!fnList){fnList=this._hooks[id]=new Array(0);}else{fnList=this._hooks[id];}if(fnList.includes(p_fn)){return;}fnList.push(p_fn);}},{key:"Unhook",value:function Unhook(p_button,p_state,p_fn){var id="".concat(p_button,"_").concat(p_state),fnList=this._hooks[id];if(!fnList){return;}if(this._using[p_button]){this._using[p_button]--;if(this._using[p_button]<=0){delete this._using[p_button];}}var index=fnList.indexOf(p_fn);if(index==-1){return;}fnList.splice(index,1);}},{key:"_Trigger",value:function _Trigger(p_id,p_evt){if(!this._isEnabled){return;}var fnList=this._hooks[p_id];if(!fnList){return;}for(var i=0,n=fnList.length;i<n;i++){fnList[i](p_evt);}}}]);return ExtMouse;}(ExtBase);module.exports["default"]=module.exports=ExtMouse;},{"../mouse":195,"../ui":209,"../ui-signal":208,"./ext-base":175}],181:[function(require,module,exports){'use strict';var _require223=require("@nkmjs/utils"),U=_require223.U;var _require224=require("@nkmjs/common"),BINDINGS=_require224.BINDINGS,SIGNAL=_require224.SIGNAL;var _require225=require("@nkmjs/data-core"),CatalogItem=_require225.CatalogItem,Catalog=_require225.Catalog,CatalogWatcher=_require225.CatalogWatcher;/**
 * A CatalogBuilder observe a catalog's additions and removals 
 * and keeps a display list up to date.
 */var CatalogBuilder=/*#__PURE__*/function(_CatalogWatcher2){_inherits(CatalogBuilder,_CatalogWatcher2);var _super95=_createSuper(CatalogBuilder);function CatalogBuilder(){_classCallCheck(this,CatalogBuilder);return _super95.call(this);}_createClass(CatalogBuilder,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(CatalogBuilder.prototype),"_Init",this).call(this);this._defaultItemClass=null;this._defaultGroupClass=null;this._host=null;}},{key:"host",get:function get(){return this._host;},set:function set(p_value){this._host=p_value;}/**
     * 
     * @param {data.core.catalog.Catalog} p_catalog 
     * @param {data.core.catalog.CatalogItem} p_item 
     */},{key:"_OnCatalogItemAdded",value:function _OnCatalogItemAdded(p_catalog,p_item){if(!_get(_getPrototypeOf(CatalogBuilder.prototype),"_OnCatalogItemAdded",this).call(this,p_catalog,p_item)){return false;}var mappedObject=null;if(U.isInstanceOf(p_item,Catalog)){mappedObject=this._owner.Add(BINDINGS.Get(this._owner,p_item,this._defaultGroupClass),"item group",this._host);}else{mappedObject=this._owner.Add(BINDINGS.Get(this._owner,p_item,this._defaultItemClass),"item",this._host);}this._map.set(p_item,mappedObject);mappedObject.data=p_item;this._Broadcast(SIGNAL.ITEM_ADDED,this,p_item,mappedObject);return true;}/**
     * 
     * @param {data.core.catalog.Catalog} p_catalog 
     * @param {data.core.catalog.CatalogItem} p_item 
     */},{key:"_OnCatalogItemRemoved",value:function _OnCatalogItemRemoved(p_catalog,p_item){var mappedObject=_get(_getPrototypeOf(CatalogBuilder.prototype),"_OnCatalogItemRemoved",this).call(this,p_catalog,p_item);if(mappedObject===false){return false;}this._Broadcast(SIGNAL.ITEM_REMOVED,this,p_item,mappedObject);if(mappedObject){mappedObject.Release();}return mappedObject;}/**
     * 
     * @param {data.core.catalog.Catalog} p_catalog 
     */},{key:"_OnCatalogSorted",value:function _OnCatalogSorted(p_catalog){var list=this._catalog._items,index=0;for(var i=0,n=list.length;i<n;i++){var item=this._items[i],mappedObject=this._map.get(item);if(!mappedObject){continue;}if(item.isDir){mappedObject.order=index;}else{mappedObject.order=this._itemCount+index;}index++;}_get(_getPrototypeOf(CatalogBuilder.prototype),"_OnCatalogSorted",this).call(this,p_catalog);}},{key:"_CleanUp",value:function _CleanUp(){this._defaultItemClass=null;this._defaultGroupClass=null;this._host=null;_get(_getPrototypeOf(CatalogBuilder.prototype),"_CleanUp",this).call(this);}}]);return CatalogBuilder;}(CatalogWatcher);module.exports["default"]=module.exports=CatalogBuilder;},{"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/utils":268}],182:[function(require,module,exports){'use strict';var _require226=require("@nkmjs/utils"),U=_require226.U;var _require227=require("@nkmjs/common"),SIGNAL=_require227.SIGNAL;var _require228=require("@nkmjs/data-core"),CatalogItem=_require228.CatalogItem,Catalog=_require228.Catalog,CatalogWatcher=_require228.CatalogWatcher;var UI=require("../ui");var UI_ID=require("../ui-id");var View=require("../views/view");var CatalogViewBuilder=/*#__PURE__*/function(_CatalogWatcher3){_inherits(CatalogViewBuilder,_CatalogWatcher3);var _super96=_createSuper(CatalogViewBuilder);function CatalogViewBuilder(){_classCallCheck(this,CatalogViewBuilder);return _super96.call(this);}// ----> Init
_createClass(CatalogViewBuilder,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(CatalogViewBuilder.prototype),"_Init",this).call(this);this._reverseMap=new Map();}/**
     * 
     * @param {data.core.catalog.Catalog} p_catalog 
     * @param {data.core.catalog.CatalogItem} p_item
     */},{key:"_OnCatalogItemAdded",value:function _OnCatalogItemAdded(p_catalog,p_item){if(!_get(_getPrototypeOf(CatalogViewBuilder.prototype),"_OnCatalogItemAdded",this).call(this,p_catalog,p_item)){return false;}// Create the view
var view=p_item.GetOption("view",null);if(!view){var viewType=p_item.GetOption("viewType",null);if(!viewType){throw new Error("Drawer's item has neither a view or a viewType set.");}if(!U.isInstanceOf(viewType,View)){throw new Error("viewType (".concat(viewType.name,") is not of type View"));}view=UI.Rent(viewType);p_item.SetOption(UI_ID.VIEW,view);}else{if(!U.isInstanceOf(view,View)){throw new Error("view is not of type View.");}}this._map.set(p_item,view);this._reverseMap.set(view,p_item);if(p_item.data){view.data=p_item.data;}else{view.data=p_item;}this._Broadcast(SIGNAL.ITEM_ADDED,this,p_item,view);return true;}/**
     * 
     * @param {data.core.catalog.Catalog} p_catalog 
     * @param {data.core.catalog.CatalogItem} p_item 
     */},{key:"_OnCatalogItemRemoved",value:function _OnCatalogItemRemoved(p_catalog,p_item){var mappedView=_get(_getPrototypeOf(CatalogViewBuilder.prototype),"_OnCatalogItemRemoved",this).call(this,p_catalog,p_item);if(mappedView===false){return false;}this._reverseMap["delete"](mappedView);this._Broadcast(SIGNAL.ITEM_REMOVED,this,p_item,mappedView);mappedView.Release();return mappedView;}}]);return CatalogViewBuilder;}(CatalogWatcher);module.exports["default"]=module.exports=CatalogViewBuilder;},{"../ui":209,"../ui-id":207,"../views/view":214,"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/utils":268}],183:[function(require,module,exports){'use strict';var _require229=require("@nkmjs/utils"),U=_require229.U,UDOM=_require229.UDOM;var _require230=require("@nkmjs/collections"),Dictionary=_require230.Dictionary,List=_require230.List,DictionaryList=_require230.DictionaryList;var _require231=require("@nkmjs/actions"),RELAY=_require231.RELAY,Request=_require231.Request;var _require232=require("@nkmjs/common"),SignalBox=_require232.SignalBox;var _require233=require("@nkmjs/style"),STYLE=_require233.STYLE,CSS=_require233.CSS;var UI=require("../ui");var UI_FLAG=require("../ui-flag");var __NULL=Symbol("null");var FlagBox=/*#__PURE__*/function(){function FlagBox(){_classCallCheck(this,FlagBox);this._elements=null;this._flags=new Dictionary();}// ----> Flags
/**
     * Sets the current value of a given flag, and updates elements accordingly.
     * @param {*} p_flag 
     * @param {*} p_toggle 
     */_createClass(FlagBox,[{key:"Set",value:function Set(p_flag,p_toggle){if(p_toggle){this._flags.Set(p_flag,true);this.Apply(p_flag,true);}else{this._flags.Set(p_flag,false);this.Apply(p_flag,false);}return p_toggle;}/**
     * 
     * @param {*} p_flag 
     * @returns {boolean} Returns true if the given flag is currently set,  otherwise false.
     */},{key:"IsSet",value:function IsSet(p_flag){var flag=this._flags.Get(p_flag);if(!flag){return false;}return flag;}/**
     * 
     * @param {*} p_flag 
     */},{key:"Toggle",value:function Toggle(p_flag){this.Set(p_flag,!this.IsSet(p_flag));}/**
     * Add an element to a set of possible flags. When any of the flags changes, the
     * element will be updated.
     * @param {Node} p_element 
     * @param  {...any} args 
     */},{key:"Add",value:function Add(p_element){if(!this._elements){this._elements=new DictionaryList();}//TODO : Check whether the flag is already active or not and apply it.
for(var i=0,n=arguments.length<=1?0:arguments.length-1;i<n;i++){this._elements.Set(i+1<1||arguments.length<=i+1?undefined:arguments[i+1],p_element);}}/**
     * Removes an element from a possible set of flags.
     * @param {*} p_element 
     * @param  {...any} args 
     */},{key:"Remove",value:function Remove(p_element){if(!this._elements){return;}for(var i=0,n=arguments.length<=1?0:arguments.length-1;i<n;i++){this._elements.Remove(i+1<1||arguments.length<=i+1?undefined:arguments[i+1],p_element);}}/**
     * Add or remove a flag from the classList of elements currently subject to that flag.
     * @param {*} p_flag 
     * @param {boolean} p_toggle True to add to the flag, False to remove it.
     */},{key:"Apply",value:function Apply(p_flag,p_toggle){if(!this._elements){return;}var list=this._elements.Get(p_flag);if(!list){return;}if(p_toggle){for(var i=0,n=list.length;i<n;i++){list[i].classList.add(p_flag);}}else{for(var _i23=0,_n18=list.length;_i23<_n18;_i23++){list[_i23].classList.remove(p_flag);}}}/**
     * Update all the flags & subjected elements
     * @param {boolean} p_toggle 
     */},{key:"ApplyAll",value:function ApplyAll(p_toggle){if(!this._elements){return;}var flagList=this._elements.keys;for(var i=0,n=flagList.length;i<n;i++){var flag=flagList[i],elList=this._elements.Get(flag);for(var e=0,en=elList.length;e<en;e++){if(p_toggle){elList[e].classList.add(flag);}else{elList[e].classList.remove(flag);}}}}/**
     * Clear all flags & elements (wipe)
     */},{key:"Clear",value:function Clear(){this._flags.Clear();if(!this._elements){return;}this._elements.Clear();}}]);return FlagBox;}();module.exports["default"]=module.exports=FlagBox;},{"../ui":209,"../ui-flag":206,"@nkmjs/actions":1,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/utils":268}],184:[function(require,module,exports){'use strict';var _require234=require("@nkmjs/utils"),U=_require234.U,UDOM=_require234.UDOM;var _require235=require("@nkmjs/collections"),Dictionary=_require235.Dictionary,List=_require235.List,DictionaryList=_require235.DictionaryList;var _require236=require("@nkmjs/actions"),RELAY=_require236.RELAY,Request=_require236.Request;var _require237=require("@nkmjs/common"),SignalBox=_require237.SignalBox,SignalBroadcaster=_require237.SignalBroadcaster,POOL=_require237.POOL;var _require238=require("@nkmjs/style"),STYLE=_require238.STYLE,CSS=_require238.CSS;var UI=require("../ui");var UI_FLAG=require("../ui-flag");var FlagEnum=/*#__PURE__*/function(){function FlagEnum(){var p_enum=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;_classCallCheck(this,FlagEnum);this._elements=new Array(0);this._managed=new Array(0);this._enum=p_enum?p_enum:new Array(0);this._currentFlag=null;this._onFlagChanged=POOL.Rent(SignalBroadcaster);}_createClass(FlagEnum,[{key:"currentFlag",get:function get(){return this._currentFlag;}},{key:"onFlagChanged",get:function get(){return this._onFlagChanged;}// ----> Enum
/**
     * Adds a set of possible values to this object
     * @param  {...any} values 
     */},{key:"AddEnum",value:function AddEnum(){for(var _len17=arguments.length,values=new Array(_len17),_key19=0;_key19<_len17;_key19++){values[_key19]=arguments[_key19];}if(values.length===1&&U.isArray(values[0])){values=values[0];}for(var i=0,n=values.length;i<n;i++){if(!this._enum.includes(values[i])){this._enum.push(values[i]);}}}/**
     * Removes a set of possible values from this object
     * @param  {...any} values 
     */},{key:"RemoveEnum",value:function RemoveEnum(){for(var _len18=arguments.length,values=new Array(_len18),_key20=0;_key20<_len18;_key20++){values[_key20]=arguments[_key20];}if(values.length===1&&U.isArray(values[0])){values=values[0];}var index;for(var i=0,n=values.length;i<n;i++){index=this._enum.indexOf(values[i]);if(index!=-1){this._enum.slice(index,1);}}}// ----> Elements
/**
     * Adds an element to a flagEnum
     * @param  {...Node} values 
     */},{key:"Add",value:function Add(){for(var _len19=arguments.length,values=new Array(_len19),_key21=0;_key21<_len19;_key21++){values[_key21]=arguments[_key21];}for(var i=0,n=values.length;i<n;i++){if(!this._elements.includes(values[i])){this._elements.push(values[i]);}}}/**
     * Removes an element from the flagEnum
     * @param  {...Node} values 
     */},{key:"Remove",value:function Remove(){for(var i=0,n=arguments.length;i<n;i++){var index=this._elements.indexOf(i<0||arguments.length<=i?undefined:arguments[i]);if(index!=-1){this._elements.slice(index,1);}}}// ----> Managed
/**
     * Add a set of flagEnum to be managed by the current one.
     * Flag set on the current flagEnum will be set on any managed flagEnums.
     * @param  {...FlagEnum} values 
     */},{key:"AddManaged",value:function AddManaged(){for(var _len20=arguments.length,values=new Array(_len20),_key22=0;_key22<_len20;_key22++){values[_key22]=arguments[_key22];}for(var i=0,n=values.length;i<n;i++){if(!this._managed.includes(values[i])){this._managed.push(values[i]);}}}/**
     * Removes a set of managed flagEnums
     * @param  {...FlagEnum} values 
     */},{key:"RemoveManaged",value:function RemoveManaged(){for(var i=0,n=arguments.length;i<n;i++){var index=this._managed.indexOf(i<0||arguments.length<=i?undefined:arguments[i]);if(index!=-1){this._managed.slice(index,1);}}}// ----> Apply & Set
/**
     * Goes through a list of object and set a given property name to this flagEnum's current flag.
     * @param {*} p_key 
     * @param {array} p_list 
     */},{key:"Apply",value:function Apply(p_key,p_list){for(var i=0,n=p_list.length;i<n;i++){var item=p_list[i];if(p_key in item){item[p_key]=this._currentFlag;}}}/**
     * Set the flagEnum current value.
     * Each element in this flagEnum list will have the previous enum value removed from its
     * classList, and the current one (if not null) will be added instead.
     * Managed flagEnum will be updated accordingly.
     * @param {*} p_flag 
     */},{key:"Set",value:function Set(p_flag){if(p_flag&&!this._enum.includes(p_flag)){throw new Error("flag '".concat(p_flag,"' not part of enum ").concat(this._enum));}for(var i=0,n=this._managed.length;i<n;i++){this._managed[i].Set(p_flag);}if(this._currentFlag===p_flag){return;}var oldFlag=this._currentFlag,el;this._currentFlag=p_flag;if(!oldFlag&&p_flag){for(var _i24=0,_n19=this._elements.length;_i24<_n19;_i24++){this._elements[_i24].classList.add(p_flag);}}else if(oldFlag&&!p_flag){for(var _i25=0,_n20=this._elements.length;_i25<_n20;_i25++){this._elements[_i25].classList.remove(oldFlag);}}else{for(var _i26=0,_n21=this._elements.length;_i26<_n21;_i26++){el=this._elements[_i26];el.classList.add(p_flag);el.classList.remove(oldFlag);}}this._onFlagChanged.Broadcast(p_flag,oldFlag);}//
/**
     * Bumps the current value to the provided flag if its index is higher than the current one.
     * @param {*} p_flag 
     */},{key:"Bump",value:function Bump(p_flag){var currentIndex=this._enum.indexOf(this._currentFlag),bumpIndex=this._enum.indexOf(p_flag);if(bumpIndex>currentIndex){this.Set(p_flag);}}},{key:"Clear",value:function Clear(){this.Set(null);this._flags.Clear();this._elements.length=0;this._enum.length=0;}}]);return FlagEnum;}();module.exports["default"]=module.exports=FlagEnum;},{"../ui":209,"../ui-flag":206,"@nkmjs/actions":1,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/utils":268}],185:[function(require,module,exports){'use strict';var _require239=require("@nkmjs/utils"),U=_require239.U,UDOM=_require239.UDOM;var _require240=require("@nkmjs/common"),NFOS=_require240.NFOS;var UI=require("../ui");var UI_FLAG=require("../ui-flag");var _require241=require("../manipulators"),ImageManipulator=_require241.ImageManipulator;var DisplayObject=require("../display-object");var Frame=/*#__PURE__*/function(_DisplayObject2){_inherits(Frame,_DisplayObject2);var _super97=_createSuper(Frame);function Frame(){_classCallCheck(this,Frame);return _super97.call(this);}// ----> Init
_createClass(Frame,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Frame.prototype),"_Init",this).call(this);this._imgManipulator=null;}// ----> DOM
},{key:"_Style",value:function _Style(){return{':host':{transition:"all 0.15s ease",position:"relative",'min-width':0,'@':['cover']},':host(.focused)':{},':host(.focused) .toolbar':{},':host(.selected)':{},':host(.selected.focused)':{}};}},{key:"_Render",value:function _Render(){this._imgManipulator=new ImageManipulator(this,false);}},{key:"Set",value:function Set(p_value){return this._imgManipulator.Set(p_value);}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){this._imgManipulator.Set(null);_get(_getPrototypeOf(Frame.prototype),"_CleanUp",this).call(this);}}]);return Frame;}(DisplayObject);module.exports["default"]=module.exports=Frame;UI.Register("nkmjs-frame",Frame);},{"../display-object":172,"../manipulators":191,"../ui":209,"../ui-flag":206,"@nkmjs/common":27,"@nkmjs/utils":268}],186:[function(require,module,exports){'use strict';var _require242=require("@nkmjs/utils"),U=_require242.U,UDOM=_require242.UDOM;var _require243=require("@nkmjs/common"),TIME=_require243.TIME,SIGNAL=_require243.SIGNAL,OptionsHandler=_require243.OptionsHandler;var UI=require("../ui");var UI_FLAG=require("../ui-flag");var UI_SIGNAL=require("../ui-signal");var DisplayObjectContainer=require("../display-object-container");var FlagEnum=require("./flag-enum");/**
 * A PopIn is a lightweight container with absolute positioning added to an object.
 * It is attached to a specific position in parent screen-space, and can follow an object if attached to one.
 * Use cases :
 * - input field feedback
 * - overlay search box (closable)
 * - informational popins
 * - contextual menu
 * 
 * If used at document level, the PopIn will attempt to find the best possible placement to stay visible (moving left/right/up/down)
 */var PopIn=/*#__PURE__*/function(_DisplayObjectContain){_inherits(PopIn,_DisplayObjectContain);var _super98=_createSuper(PopIn);function PopIn(){_classCallCheck(this,PopIn);return _super98.call(this);}_createClass(PopIn,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(PopIn.prototype),"_Init",this).call(this);this._content=null;this._options=null;this._placement=null;this._placementEnum=new FlagEnum(UI_FLAG.placements);this._placementEnum.Add(this);this._modeEnum=new FlagEnum(PopIn.MODE_ANCHOR,PopIn.MODE_FLOAT_INSIDE,PopIn.MODE_FLOAT_OUTSIDE);this._modeEnum.Add(this);this._optionsHandler=new OptionsHandler(this._Bind(this._OnOptionsProcessed));this._optionsHandler.Hook("mode");this._optionsHandler.Hook("context",null,document.body);this._optionsHandler.Hook("anchor");this._optionsHandler.Hook("placement",null,PopIn.CENTER);this._optionsHandler.Hook("origin",null,PopIn.CENTER);this._ownsContent=false;this._Bind(this._UpdateAnchoredPosition);}},{key:"options",get:function get(){return this._options;},set:function set(p_options){this._options=p_options;this.content=p_options.content;if(this._content){this._optionsHandler.Process(this,this._options);}else{throw new Error("PopIn options has no content set.");}}},{key:"mode",get:function get(){return this._modeEnum.currentFlag;},set:function set(p_value){this._modeEnum.Set(p_value);}},{key:"placement",get:function get(){return this._placement;},set:function set(p_value){this._placement=p_value;}/**
     * Point inside the pop-in to pin at position
     */},{key:"origin",get:function get(){return this._placement;},set:function set(p_value){this._placement=p_value;}},{key:"content",get:function get(){return this._content;},set:function set(p_value){var _this14=this;if(this._content===p_value){return;}if(this._content){if(this._ownsContent){this._content.Release();}else{// Clear inline style properties
}this._content=null;}if(!p_value){this._ownsContent=false;return;}this._ownsContent=U.isFunc(p_value);this._content=this.Add(p_value,"content");this._content.Watch(UI_SIGNAL.CLOSE_REQUESTED,function(){_this14.Release();});}},{key:"context",get:function get(){return this._context;},set:function set(p_value){if(this._context===p_value){return;}if(this._context){UDOM.Detach(this);}this._context=p_value;if(this._context){UDOM.Attach(this,this._context);}}},{key:"anchor",get:function get(){return this._anchor;},set:function set(p_value){if(this._anchor===p_value){return;}this._anchor=p_value;if(this._anchor){TIME.Watch(SIGNAL.TICK,this._UpdateAnchoredPosition);}else{TIME.Unwatch(SIGNAL.TICK,this._UpdateAnchoredPosition);}}},{key:"_OnOptionsProcessed",value:function _OnOptionsProcessed(p_options){}// ----> DOM
},{key:"_Style",value:function _Style(){return{':host':{'position':'absolute','border':'2px solid #ff0000',//'width':'0', 'height':'0',
'display':'flex'// making sure things are properly sized
},':host(.mode-float-inside)':{},':host(.mode-anchor)':{}/*
            // Float inside
            ':host(.mode-float-inside.top)':{ 'top':'0px' },
            ':host(.mode-float-inside.bottom)':{ 'bottom':'0px' },
            ':host(.mode-float-inside.left)':{ 'left':'0px' },
            ':host(.mode-float-inside.right)':{ 'right':'0px' },

            // Float outside
            ':host(.mode-float-outside.top)':{ 'top':'0px' },
            ':host(.mode-float-outside.bottom)':{ 'bottom':'0px' },
            ':host(.mode-float-outside.left)':{ 'left':'0px' },
            ':host(.mode-float-outside.right)':{ 'right':'0px' },
            */};}},{key:"_UpdateAnchoredPosition",value:function _UpdateAnchoredPosition(){var rect=UDOM.Rect(this._anchor,this.parentElement),centerX=rect.x+rect.width*0.5,centerY=rect.y+rect.height*0.5,x=centerX+rect.width*this._placement.x,y=centerY+rect.height*this._placement.y;if(this._placement.x<0.5){// offset by pop-in width
}else{// no re-positioning
}if(this._placement.y<0.5){// offset by pop-in width
}else{// no re-positioning
}this.style.left="".concat(x,"px");this.style.top="".concat(y,"px");}},{key:"_CleanUp",value:function _CleanUp(){this._ownsContent=false;this.context=null;this.content=null;this.anchor=null;this.mode=null;this._options=null;_get(_getPrototypeOf(PopIn.prototype),"_CleanUp",this).call(this);}}],[{key:"Pop",value:/**
     * 
     * @param {*} p_options
     * @param {*} p_options.context
     * @param {*} p_options.content
     * @param {*} p_options.anchor
     * 
     */function Pop(p_options){var popin=UI.Rent(PopIn);popin.options=p_options;return popin;}}]);return PopIn;}(DisplayObjectContainer);_defineProperty(PopIn,"MODE_ANCHOR","mode-anchor");_defineProperty(PopIn,"MODE_FLOAT_INSIDE","mode-float-inside");_defineProperty(PopIn,"MODE_FLOAT_OUTSIDE","mode-float-outside");_defineProperty(PopIn,"LEFT",{x:-0.5,y:0});_defineProperty(PopIn,"RIGHT",{x:0.5,y:0});_defineProperty(PopIn,"TOP",{x:0,y:-0.5});_defineProperty(PopIn,"BOTTOM",{x:0,y:0.5});_defineProperty(PopIn,"TOP_LEFT",{x:-0.5,y:-0.5});_defineProperty(PopIn,"TOP_RIGHT",{x:0.5,y:-0.5});_defineProperty(PopIn,"BOTTOM_LEFT",{x:-0.5,y:0.5});_defineProperty(PopIn,"BOTTOM_RIGHT",{x:0.5,y:0.5});_defineProperty(PopIn,"CENTER",{x:0,y:0});module.exports["default"]=module.exports=PopIn;UI.Register("nkmjs-pop-in",PopIn);},{"../display-object-container":171,"../ui":209,"../ui-flag":206,"../ui-signal":208,"./flag-enum":184,"@nkmjs/common":27,"@nkmjs/utils":268}],187:[function(require,module,exports){'use strict';var _require244=require("@nkmjs/utils"),U=_require244.U,UDOM=_require244.UDOM;var _require245=require("@nkmjs/common"),NFOS=_require245.NFOS,SIGNAL=_require245.SIGNAL;var _require246=require("@nkmjs/collections"),Dictionary=_require246.Dictionary;var UI=require("../ui.js");var UI_FLAG=require('../ui-flag');var OrientableWidget=require("../widget-orientable");var ToolButton=require("../buttons/button-tool");var ButtonBase=require("../button-base");var FlagEnum=require('./flag-enum');var UI_SIGNAL=require('../ui-signal');/**
 * 
 *  *--------------------------------*
 *  |                         [][][] |
 *  *--------------------------------*
 * 
 */var _flag_STRETCH="stretch";var _flag_STRETCH_SAME="stretch-same";var Toolbar=/*#__PURE__*/function(_OrientableWidget){_inherits(Toolbar,_OrientableWidget);var _super99=_createSuper(Toolbar);function Toolbar(){_classCallCheck(this,Toolbar);return _super99.call(this);}_createClass(Toolbar,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Toolbar.prototype),"_Init",this).call(this);this._defaultButtonClass=ToolButton;this._optionsMap=new Dictionary();this._handles=new Array(0);this._groups={};this._radioMap={};this._flags.Add(this,Toolbar.FLAG_STRETCH,Toolbar.FLAG_STRETCH_SAME);this._stretchEnum=new FlagEnum([_flag_STRETCH,_flag_STRETCH_SAME]);this._stretchEnum.Add(this);this._sizeEnum=new FlagEnum(UI_FLAG.sizes);this._sizeEnum.Add(this);this._sizeEnum.onFlagChanged.Add(this._Bind(this._OnSizeChanged));}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(Toolbar.prototype),"_PostInit",this).call(this);this._sizeEnum.Set(this.constructor.__default_size);}},{key:"size",get:function get(){return this._sizeEnum.currentFlag;},set:function set(p_value){this._sizeEnum.Set(p_value);}// ----> DOM
},{key:"_Style",value:function _Style(){return{':host':{'position':"relative",'display':"flex",'justify-content':"flex-start",'align-items':"center"},':host(.vertical)':{'flex-flow':"column nowrap"},':host(.horizontal)':{'flex-flow':"row nowrap"},'.group':{'position':"relative",'flex':"0 0 auto",'display':"flex",'justify-content':"flex-start",'align-items':"center"},'.item':{'position':"relative",'flex':"0 0 auto",'min-width':'0','min-height':'0'},':host(.stretch), :host(.stretch-same)':{'align-items':"stretch",'align-content':"stretch",'flex':"1 1 auto"}};}},{key:"stretch",set:function set(p_value){this._stretchEnum.Set(p_value);}},{key:"_Render",value:function _Render(){this.focusArea=this;}},{key:"_OnSizeChanged",value:function _OnSizeChanged(p_newValue,p_oldValue){this._sizeEnum.Apply("size",this._handles);}// ----> Handle management
},{key:"CreateHandle",value:function CreateHandle(p_options){var p_class=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var cl=U.Default(p_class,p_options.cl,this._defaultButtonClass),handle,group=U.Get(p_options,"group",null),toggle=group?U.Get(p_options,"toggle",null):null;if(group){group=this.GetGroup(group,true);handle=this.Add(cl,"item",group.element);group.handles.push(handle);if(toggle){handle.Watch(UI_SIGNAL.ACTIVATED,this._OnRadioActivated,this);handle.Watch(UI_SIGNAL.DEACTIVATED,this._OnRadioDeactivated,this);}}else{handle=this.Add(cl,"item");}this._optionsMap.Set(handle,p_options);handle.Watch(SIGNAL.RELEASED,this._OnHandleReleased,this);if(U.isInstanceOf(handle,ButtonBase)){handle.options=p_options;handle.size=this._sizeEnum.currentFlag;}handle.flags.Set(this._orientation,true);this._handles.push(handle);return handle;}/**
     * Get a handle group, with the possibility of creating it on the fly if it does not exist.
     * @param {string} p_group 
     * @param {boolean} p_create 
     */},{key:"GetGroup",value:function GetGroup(p_group){var p_create=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(p_group in this._groups){return this._groups[p_group];}if(!p_create){return null;}var group={element:UDOM.New("span",{"class":"group"},this),handles:[]};this._groups[p_group]=group;return group;}// ----> Radio handling
},{key:"_OnRadioActivated",value:function _OnRadioActivated(p_handle){var handleOptions=this._optionsMap.Get(p_handle),radio=handleOptions.radio;if(radio in this._radioMap){var was=this._radioMap[radio];was.Deactivate();}this._radioMap[radio]=p_handle;}},{key:"_OnRadioDeactivated",value:function _OnRadioDeactivated(p_handle){var handleOptions=this._optionsMap.Get(p_handle),radio=handleOptions.radio;if(radio in this._radioMap){var was=this._radioMap[radio];if(was===p_handle){delete this._radioMap[radio];}}}// ---->
},{key:"_OnHandleReleased",value:function _OnHandleReleased(p_handle){var options=this._optionsMap.Get(p_handle),groupId=U.Get(options,"group",null);if(groupId){var group=this.GetGroup(groupId);group.handles.splice(group.handles.indexOf(p_handle),1);//Delete if empty
if(group.handles.length===0){UDOM.Detach(group.element);group.element=null;group.handles.length=0;delete this._groups[groupId];}}p_handle.classList.remove("item");this._optionsMap.Remove(p_handle);// TODO : Check if radio & remove
var index=this._handles.indexOf(p_handle);if(index!=-1){this._handles.splice(index,1);}}},{key:"Clear",value:function Clear(){while(this._handles.length!=0){this._handles.pop().Release();}}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){this.Clear();this._sizeEnum.Set(this.constructor.__default_size);_get(_getPrototypeOf(Toolbar.prototype),"_CleanUp",this).call(this);}}],[{key:"FLAG_STRETCH",get:function get(){return _flag_STRETCH;}},{key:"FLAG_STRETCH_SAME",get:function get(){return _flag_STRETCH_SAME;}// ----> Init
}]);return Toolbar;}(OrientableWidget);_defineProperty(Toolbar,"__NFO__",NFOS.Ext({css:["@/helpers/toolbar.css"]},OrientableWidget,['css']));_defineProperty(Toolbar,"__default_size",UI_FLAG.SIZE_M);module.exports["default"]=module.exports=Toolbar;UI.Register("nkmjs-toolbar",Toolbar);},{"../button-base":167,"../buttons/button-tool":170,"../ui-flag":206,"../ui-signal":208,"../ui.js":209,"../widget-orientable":216,"./flag-enum":184,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/utils":268}],188:[function(require,module,exports){'use strict';var _require247=require("@nkmjs/common"),SIGNAL=_require247.SIGNAL,DisposableObjectEx=_require247.DisposableObjectEx;var _require248=require("@nkmjs/collections"),List=_require248.List;var UI_SIGNAL=require("../ui-signal");var INPUT=require("../input");/**
 * A WidgetSelection is an object that wraps most common control for user-driven widget selection.
 */var WidgetSelection=/*#__PURE__*/function(_DisposableObjectEx24){_inherits(WidgetSelection,_DisposableObjectEx24);var _super100=_createSuper(WidgetSelection);function WidgetSelection(){_classCallCheck(this,WidgetSelection);return _super100.call(this);}// ----> Init
_createClass(WidgetSelection,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(WidgetSelection.prototype),"_Init",this).call(this);this._stack=new List();this._shareEvents=true;this._allowMultiple=true;this._clearing=false;this._sharingEvent=false;}},{key:"shareEvents",get:function get(){return this._shareEvents;},set:function set(p_value){this._shareEvents=p_value;}},{key:"allowMultiple",get:function get(){return this._allowMultiple;},set:function set(p_value){this._allowMultiple=p_value;if(!p_value){this.Clear();}}/**
     * Adds an item to the selection
     * @param {*} p_item 
     * @returns {boolean} True if the object was added for the first time, otherwise false
     */},{key:"Add",value:function Add(p_item){if(this._stack.Contains(p_item)){if(INPUT.ctrl){this.Remove(p_item);}//TODO: Need a way to re-map ctrl to something else
return false;}// Clear selection multiple selection isn't allowed.
if(!this._allowMultiple||!INPUT.ctrl){this.Clear();}this._stack.Add(p_item);p_item.Watch(UI_SIGNAL.SELECTION_LOST,this._OnItemSelectionLost,this);p_item.Watch(UI_SIGNAL.DRAG_STARTED,this._OnItemDragStarted,this);p_item.Watch(UI_SIGNAL.DRAG_ENDED,this._OnItemDragEnded,this);p_item.Watch(SIGNAL.RELEASED,this._OnItemReleased,this);p_item.Select(true);this._Broadcast(SIGNAL.ITEM_ADDED,p_item);return true;}/**
     * Removes an item from the selection.
     * @param {*} p_item 
     */},{key:"Remove",value:function Remove(p_item){if(this._stack.Remove(p_item)){p_item.Select(false);p_item.Unwatch(UI_SIGNAL.SELECTION_LOST,this._OnItemSelectionLost,this);p_item.Unwatch(UI_SIGNAL.DRAG_STARTED,this._OnItemDragStarted,this);p_item.Unwatch(UI_SIGNAL.DRAG_ENDED,this._OnItemDragEnded,this);p_item.Unwatch(SIGNAL.RELEASED,this._OnItemReleased,this);this._Broadcast(SIGNAL.ITEM_REMOVED,p_item);}}},{key:"_OnItemSelectionLost",value:function _OnItemSelectionLost(p_item){this.Remove(p_item);}},{key:"_OnItemReleased",value:function _OnItemReleased(p_item){this.Remove(p_item);}},{key:"_OnItemDragStarted",value:function _OnItemDragStarted(p_item){this._SpreadEvent(UI_SIGNAL.DRAG_STARTED,p_item);}},{key:"_OnItemDragEnded",value:function _OnItemDragEnded(p_item){this._SpreadEvent(UI_SIGNAL.DRAG_ENDED,p_item);}/**
     * Spreads an event to all items inside the selection
     */},{key:"_SpreadEvent",value:function _SpreadEvent(p_evt,p_emitter){if(!this._shareEvents||this._sharingEvent){return;}this._sharingEvent=true;var list=this._stack.internalArray;for(var i=0,n=list.length;i<n;i++){var item=list[i];if(item!=p_emitter){item._Broadcast(p_evt,item);}}this._sharingEvent=false;}/**
     * Clear all item in the stack
     */},{key:"Clear",value:function Clear(){var stack=this._stack;while(!stack.isEmpty){this.Remove(stack.last);}}}]);return WidgetSelection;}(DisposableObjectEx);module.exports["default"]=module.exports=WidgetSelection;},{"../input":189,"../ui-signal":208,"@nkmjs/collections":21,"@nkmjs/common":27}],189:[function(require,module,exports){'use strict';var _require249=require("@nkmjs/collections"),Dictionary=_require249.Dictionary;var _require250=require("@nkmjs/common"),SingletonEx=_require250.SingletonEx;var MOUSE=require("./mouse");var INPUT=/*#__PURE__*/function(_SingletonEx8){_inherits(INPUT,_SingletonEx8);var _super101=_createSuper(INPUT);function INPUT(){_classCallCheck(this,INPUT);return _super101.call(this);}_createClass(INPUT,[{key:"_Init",value:/**
     * @access protected
     */function _Init(){_get(_getPrototypeOf(INPUT.prototype),"_Init",this).call(this);this._running=false;this._down=new Dictionary();this._Bind(this._KHandle);this._Bind(this._KBlur);this._shiftKey=false;this._ctrlKey=false;this._altKey=false;this._currentKeyEvent=null;if(this._isBrowser){this._Start();this._mouse=MOUSE.instance;}}/**
     * @access private
     */},{key:"_Start",value:function _Start(){if(this._running){return;}window.addEventListener('keydown',this._KHandle);window.addEventListener('keyup',this._KHandle);window.addEventListener('keypress',this._KHandle);window.addEventListener('blur',this._KBlur);this._running=true;}/**
     * @access private
     */},{key:"_Stop",value:function _Stop(){if(!this._running){return;}window.removeEventListener('keydown',this._KHandle);window.removeEventListener('keyup',this._KHandle);window.removeEventListener('keypress',this._KHandle);window.removeEventListener('blur',this._KBlur);this._running=false;}},{key:"running",get:function get(){return this._running;}},{key:"currentKeyEvent",get:function get(){return this._currentKeyEvent;}},{key:"shiftKey",get:function get(){return this._shiftKey;}},{key:"ctrlKey",get:function get(){return this._ctrlKey;}},{key:"altKey",get:function get(){return this._altKey;}},{key:"mouse",get:function get(){return this._mouse;}/**
     * @access private
     * @param {*} p_evt 
     */},{key:"_KHandle",value:function _KHandle(p_evt){//p_evt.preventDefault();
this._currentKeyEvent=p_evt;this._shiftKey=p_evt.shiftKey;this._ctrlKey=p_evt.ctrlKey;this._altKey=p_evt.altKey;var type=p_evt.type,key=p_evt.key,code=p_evt.code,which=p_evt.which;if(type==='keydown'){if(p_evt.repeat){this._Broadcast(INPUT.KEY_REPEAT);this._Broadcast("R_".concat(which));}else{this._down.Set(which,true);this._Broadcast(INPUT.KEY_DOWN);this._Broadcast("D_".concat(which));}}else if(type==='keyup'){this._down.Remove(which);this._Broadcast(INPUT.KEY_UP,which);this._Broadcast("U_".concat(which));}this._currentKeyEvent=null;}/**
     * @access private
     * @param {*} p_evt 
     */},{key:"_KBlur",value:function _KBlur(p_evt){var keys=this._down.keys;// Broadcast up events for all keys currently down.
for(var i=0,n=keys.length;i<n;i++){this._Broadcast(INPUT.KEY_UP,null);this._Broadcast("U_".concat(keys[i]),null);}this._down.Clear();}}],[{key:"shift",get:function get(){return this.instance.shiftKey;}},{key:"ctrl",get:function get(){return this.instance.ctrlKey;}},{key:"alt",get:function get(){return this.instance.altKey;}},{key:"ONKeyUp",value:function ONKeyUp(p_key,p_fn){this.Watch("U_".concat(p_key),p_fn);}},{key:"OFFKeyUp",value:function OFFKeyUp(p_key,p_fn){this.Unwatch("U_".concat(p_key),p_fn);}},{key:"ONKeyDown",value:function ONKeyDown(p_key,p_fn){this.Watch("D_".concat(p_key),p_fn);}},{key:"OFFKeyDown",value:function OFFKeyDown(p_key,p_fn){this.Unwatch("D_".concat(p_key),p_fn);}},{key:"ONKeyRepeat",value:function ONKeyRepeat(p_key,p_fn){this.Watch("R_".concat(p_key),p_fn);}},{key:"OFFKeyRepeat",value:function OFFKeyRepeat(p_key,p_fn){this.Unwatch("R_".concat(p_key),p_fn);}},{key:"MOUSE",get:function get(){return this.instance._mouse;}}]);return INPUT;}(SingletonEx);_defineProperty(INPUT,"KEY_UP",Symbol('keyUp'));_defineProperty(INPUT,"KEY_DOWN",Symbol('keyDown'));_defineProperty(INPUT,"KEY_REPEAT",Symbol('keyRepeat'));module.exports["default"]=module.exports=INPUT;},{"./mouse":195,"@nkmjs/collections":21,"@nkmjs/common":27}],190:[function(require,module,exports){'use strict';var KEYBOARD=function KEYBOARD(){_classCallCheck(this,KEYBOARD);};_defineProperty(KEYBOARD,"_backspace",8);_defineProperty(KEYBOARD,"_tab",9);_defineProperty(KEYBOARD,"_enter",13);_defineProperty(KEYBOARD,"_shift",16);_defineProperty(KEYBOARD,"_ctrl",17);_defineProperty(KEYBOARD,"_alt",18);_defineProperty(KEYBOARD,"_pause",19);_defineProperty(KEYBOARD,"_capsLock",20);_defineProperty(KEYBOARD,"_escape",27);_defineProperty(KEYBOARD,"_pageUp",33);_defineProperty(KEYBOARD,"_space",32);_defineProperty(KEYBOARD,"_pageDown",34);_defineProperty(KEYBOARD,"_end",35);_defineProperty(KEYBOARD,"_home",36);_defineProperty(KEYBOARD,"_arrowLeft",37);_defineProperty(KEYBOARD,"_arrowUp",38);_defineProperty(KEYBOARD,"_arrowRight",39);_defineProperty(KEYBOARD,"_arrowDown",40);_defineProperty(KEYBOARD,"_printScreen",44);_defineProperty(KEYBOARD,"_insert",45);_defineProperty(KEYBOARD,"_delete",46);_defineProperty(KEYBOARD,"_0",48);_defineProperty(KEYBOARD,"_1",49);_defineProperty(KEYBOARD,"_2",50);_defineProperty(KEYBOARD,"_3",51);_defineProperty(KEYBOARD,"_4",52);_defineProperty(KEYBOARD,"_5",53);_defineProperty(KEYBOARD,"_6",54);_defineProperty(KEYBOARD,"_7",55);_defineProperty(KEYBOARD,"_8",56);_defineProperty(KEYBOARD,"_9",57);_defineProperty(KEYBOARD,"_a",65);_defineProperty(KEYBOARD,"_b",66);_defineProperty(KEYBOARD,"_c",67);_defineProperty(KEYBOARD,"_d",68);_defineProperty(KEYBOARD,"_e",69);_defineProperty(KEYBOARD,"_f",70);_defineProperty(KEYBOARD,"_g",71);_defineProperty(KEYBOARD,"_h",72);_defineProperty(KEYBOARD,"_i",73);_defineProperty(KEYBOARD,"_j",74);_defineProperty(KEYBOARD,"_k",75);_defineProperty(KEYBOARD,"_l",76);_defineProperty(KEYBOARD,"_m",77);_defineProperty(KEYBOARD,"_n",78);_defineProperty(KEYBOARD,"_o",79);_defineProperty(KEYBOARD,"_p",80);_defineProperty(KEYBOARD,"_q",81);_defineProperty(KEYBOARD,"_r",82);_defineProperty(KEYBOARD,"_s",83);_defineProperty(KEYBOARD,"_t",84);_defineProperty(KEYBOARD,"_u",85);_defineProperty(KEYBOARD,"_v",86);_defineProperty(KEYBOARD,"_w",87);_defineProperty(KEYBOARD,"_x",88);_defineProperty(KEYBOARD,"_y",89);_defineProperty(KEYBOARD,"_z",90);_defineProperty(KEYBOARD,"_leftWindowKey",91);_defineProperty(KEYBOARD,"_rightWindowKey",92);_defineProperty(KEYBOARD,"_selectKey",93);_defineProperty(KEYBOARD,"_numpad0",96);_defineProperty(KEYBOARD,"_numpad1",97);_defineProperty(KEYBOARD,"_numpad2",98);_defineProperty(KEYBOARD,"_numpad3",99);_defineProperty(KEYBOARD,"_numpad4",100);_defineProperty(KEYBOARD,"_numpad5",101);_defineProperty(KEYBOARD,"_numpad6",102);_defineProperty(KEYBOARD,"_numpad7",103);_defineProperty(KEYBOARD,"_numpad8",104);_defineProperty(KEYBOARD,"_numpad9",105);_defineProperty(KEYBOARD,"_multiply",106);_defineProperty(KEYBOARD,"_add",107);_defineProperty(KEYBOARD,"_subtract",109);_defineProperty(KEYBOARD,"_decimalPoint",110);_defineProperty(KEYBOARD,"_divide",111);_defineProperty(KEYBOARD,"_f1",112);_defineProperty(KEYBOARD,"_f2",113);_defineProperty(KEYBOARD,"_f3",114);_defineProperty(KEYBOARD,"_f4",115);_defineProperty(KEYBOARD,"_f5",116);_defineProperty(KEYBOARD,"_f6",117);_defineProperty(KEYBOARD,"_f7",118);_defineProperty(KEYBOARD,"_f8",119);_defineProperty(KEYBOARD,"_f9",120);_defineProperty(KEYBOARD,"_f10",121);_defineProperty(KEYBOARD,"_f11",122);_defineProperty(KEYBOARD,"_f12",123);_defineProperty(KEYBOARD,"_numLock",144);_defineProperty(KEYBOARD,"_scrollLock",145);_defineProperty(KEYBOARD,"_myComputer",182);_defineProperty(KEYBOARD,"_myCalculator",183);_defineProperty(KEYBOARD,"_semiColon",186);_defineProperty(KEYBOARD,"_equalSign",187);_defineProperty(KEYBOARD,"_comma",188);_defineProperty(KEYBOARD,"_dash",189);_defineProperty(KEYBOARD,"_period",190);_defineProperty(KEYBOARD,"_forwardSlash",191);_defineProperty(KEYBOARD,"_openBracket",219);_defineProperty(KEYBOARD,"_backSlash",220);_defineProperty(KEYBOARD,"_closeBraket",221);_defineProperty(KEYBOARD,"_singleQuote",222);module.exports["default"]=module.exports=KEYBOARD;},{}],191:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={BaseManipulator:require("./manipulator-base"),ImageManipulator:require("./manipulator-image"),TextManipulator:require("./manipulator-text")};},{"./manipulator-base":192,"./manipulator-image":193,"./manipulator-text":194}],192:[function(require,module,exports){'use strict';var _require251=require("@nkmjs/utils"),U=_require251.U;var _require252=require("@nkmjs/common"),SIGNAL=_require252.SIGNAL,DisposableObjectEx=_require252.DisposableObjectEx;var UI_FLAG=require("../ui-flag");var FlagEnum=require("../helpers/flag-enum");/**
 * An BaseManipulator is an abstract control wrapper to manipulate a DOM element.
 * It circumvents the need for a fully-fledged display object to avoid bloating the DOM.
 */var BaseManipulator=/*#__PURE__*/function(){/**
     * 
     * @param {*} p_element 
     * @param {boolean} p_autoHide 
     */function BaseManipulator(){var p_element=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var p_autoHide=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var p_sizeControl=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;_classCallCheck(this,BaseManipulator);this._element=p_element;this._content=null;this._autoHide=p_autoHide;this._isVisible=true;if(p_sizeControl){this._sizeFlags=new FlagEnum(UI_FLAG.sizes);}else{this._sizeFlags=null;}}_createClass(BaseManipulator,[{key:"isVisible",get:function get(){return this._isVisible;}},{key:"element",get:function get(){return this._element;},set:function set(p_value){if(this._element===p_value){return;}var oldFlag=null;if(this._sizeFlags){var oldElement=this._element;oldFlag=this._sizeFlags._currentFlag;this._sizeFlags.Set(null);if(oldElement){this._sizeFlags.Remove(oldElement);}}this._element=p_value;if(this._sizeFlags){if(this._element){this._sizeFlags.Add(this._element);}this._sizeFlags.Set(oldFlag);}}},{key:"order",get:function get(){return this._element.style.order;},set:function set(p_value){this._element.style.order=p_value;}},{key:"content",get:function get(){return this._content;}},{key:"size",get:function get(){return this._sizeFlags;}/**
     * Set the content of the manipulated element.
     * @param {*} p_value 
     * @returns {boolean} True if the content is valid & visible, otherwise false.
     */},{key:"Set",value:function Set(p_value){var result=this._Update(this._element,p_value);var oldContent=this._content;if(oldContent&&U.isInstanceOf(oldContent,DisposableObjectEx)){oldContent.Unwatch(SIGNAL.UPDATED,this._OnContentUpdate,this);oldContent.Unwatch(SIGNAL.RENAMED,this._OnContentUpdate,this);oldContent.Unwatch(SIGNAL.RELEASED,this._OnContentReleased,this);}if(p_value&&U.isInstanceOf(this._content,DisposableObjectEx)){this._content=p_value;this._content.Watch(SIGNAL.UPDATED,this._OnContentUpdate,this);this._content.Watch(SIGNAL.RENAMED,this._OnContentUpdate,this);this._content.Watch(SIGNAL.RELEASED,this._OnContentReleased,this);}else{this._content=null;}return this._Toggle(result);}},{key:"_Update",value:function _Update(p_element,p_value){return true;}},{key:"_OnContentUpdate",value:function _OnContentUpdate(){this._Toggle(this._Update(this._element,this._content));}},{key:"_Toggle",value:function _Toggle(p_toggle){if(this._isVisible!=p_toggle&&this._autoHide){this._isVisible=p_toggle;if(!p_toggle){this._element.style.setProperty("display","none");}else{this._element.style.removeProperty("display");}}return p_toggle;}},{key:"_OnContentReleased",value:function _OnContentReleased(p_content){this.content=null;}}]);return BaseManipulator;}();module.exports["default"]=module.exports=BaseManipulator;},{"../helpers/flag-enum":184,"../ui-flag":206,"@nkmjs/common":27,"@nkmjs/utils":268}],193:[function(require,module,exports){'use strict';var _require253=require("@nkmjs/utils"),U=_require253.U,PATH=_require253.PATH;var UI_ID=require("../ui-id");var BaseManipulator=require("./manipulator-base");/**
 * An ImageManipulator is a control wrapper to manipulate an element's background image.
 * It circumvents the need for a fully-fledged display object to avoid bloating the DOM.
 */var ImageManipulator=/*#__PURE__*/function(_BaseManipulator){_inherits(ImageManipulator,_BaseManipulator);var _super102=_createSuper(ImageManipulator);/**
     * 
     * @param {*} p_element 
     * @param {boolean} p_autoHide 
     * @param {boolean} p_sizeControl 
     */function ImageManipulator(){var p_element=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var p_autoHide=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var p_sizeControl=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;_classCallCheck(this,ImageManipulator);return _super102.call(this,p_element,p_autoHide,p_sizeControl);}_createClass(ImageManipulator,[{key:"content",get:function get(){return this._element?this._element.style.backgroundImage:null;}/**
     * 
     * @param {*} p_element 
     * @param {*} p_value string or BlobResource
     */},{key:"_Update",value:function _Update(p_element,p_value){if(U.isVoid(p_value)){p_element.style.removeProperty("backgroundImage");return false;}else{var path="";if(U.isString(p_value)){path=p_value;}else if(UI_ID.ICON in p_value){path=p_value[UI_ID.ICON];}else if(UI_ID.PATH in p_value){path=p_value[UI_ID.PATH];}else if("img"in p_value){path=p_value.img;}else if("objectURL"in p_value){path=p_value.objectURL;}if(path===""||!U.isString(path)){return false;}path=PATH.FULL(path);p_element.style.backgroundImage="url(".concat(path,")");return true;}}}]);return ImageManipulator;}(BaseManipulator);module.exports["default"]=module.exports=ImageManipulator;},{"../ui-id":207,"./manipulator-base":192,"@nkmjs/utils":268}],194:[function(require,module,exports){'use strict';var _require254=require("@nkmjs/utils"),U=_require254.U;var HSLA=require("@nkmjs/style/lib/colors/hsla");var RGBA=require("@nkmjs/style/lib/colors/rgba");var BaseManipulator=require("./manipulator-base");/**
 * A TextManipulator is a control wrapper to manipulate an element's innerHTML.
 * It circumvents the need for a fully-fledged display object to avoid bloating the DOM.
 */var TextManipulator=/*#__PURE__*/function(_BaseManipulator2){_inherits(TextManipulator,_BaseManipulator2);var _super103=_createSuper(TextManipulator);/**
     * 
     * @param {*} p_element 
     * @param {boolean} p_autoHide 
     * @param {boolean} p_sizeControl 
     */function TextManipulator(){var p_element=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var p_autoHide=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var p_sizeControl=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;_classCallCheck(this,TextManipulator);return _super103.call(this,p_element,p_autoHide,p_sizeControl);}_createClass(TextManipulator,[{key:"content",get:function get(){return this._element?this._element.innerHTML:null;}/**
     * @type {boolean}
     */},{key:"uppercase",set:function set(p_value){if(p_value){this._element.style.setProperty('text-transform',"uppercase");}else{this._element.style.removeProperty('text-transform');}}/**
     * @type {boolean}
     */},{key:"ellipsis",set:function set(p_value){if(p_value){this._element.style.setProperty('white-space',"nowrap");this._element.style.setProperty('overflow',"hidden");this._element.style.setProperty('text-overflow',"ellipsis");}else{this._element.style.removeProperty('white-space');this._element.style.removeProperty('overflow');this._element.style.removeProperty('text-overflow');}}/**
     * @type {boolean}
     */},{key:"selectable",set:function set(p_value){if(p_value){this._element.style.setProperty('user-select',"text");}else{this._element.style.removeProperty('user-select');}}/**
     * @type {boolean}
     */},{key:"bold",set:function set(p_value){if(p_value){this._element.style.setProperty('font-weight',"bolder");}else{this._element.style.removeProperty('font-weight');}}/**
     * @type {boolean}
     */},{key:"italic",set:function set(p_value){if(p_value){this._element.style.setProperty('font-style',"italic");}else{this._element.style.removeProperty('font-style');}}/**
     * @type {string|RGBA|HSLA}
     */},{key:"color",set:function set(p_value){if(p_value){this._element.style.setProperty('color',p_value);}else{this._element.style.removeProperty('color');}}/**
     * 
     * @param {*} p_element 
     * @param {string} p_value 
     */},{key:"_Update",value:function _Update(p_element,p_value){if(U.isVoid(p_value)){p_element.innerHTML="";return false;}else{var text="";if(U.isString(p_value)){text=p_value;}else if("name"in p_value){text=p_value.name;}else if("title"in p_value){text=p_value.title;}else if("objectURL"in p_value){text=p_value.objectURL;}if(text===""){return false;}p_element.innerHTML=text;return true;}}}]);return TextManipulator;}(BaseManipulator);module.exports["default"]=module.exports=TextManipulator;},{"./manipulator-base":192,"@nkmjs/style/lib/colors/hsla":158,"@nkmjs/style/lib/colors/rgba":159,"@nkmjs/utils":268}],195:[function(require,module,exports){'use strict';var _require255=require("@nkmjs/collections"),Dictionary=_require255.Dictionary;var _require256=require("@nkmjs/common"),SingletonEx=_require256.SingletonEx,DelayedCall=_require256.DelayedCall;var UI_SIGNAL=require("./ui-signal");var MOUSE=/*#__PURE__*/function(_SingletonEx9){_inherits(MOUSE,_SingletonEx9);var _super104=_createSuper(MOUSE);function MOUSE(){_classCallCheck(this,MOUSE);return _super104.call(this);}_createClass(MOUSE,[{key:"_Init",value:/**
     * @access protected
     */function _Init(){_get(_getPrototypeOf(MOUSE.prototype),"_Init",this).call(this);this._running=false;this._using=new Array(0);this._usingDeprecated=new Array(0);this._position={x:0,y:0};this._clearUsing=new DelayedCall(this._Bind(this._ClearUsing));this._Bind(this._mDown);this._Bind(this._mUp);this._Bind(this._mMove);if(this._isBrowser){this._Start();}}/**
     * @access private
     */},{key:"_Start",value:function _Start(){if(this._running){return;}document.addEventListener('mousedown',this._mDown);document.addEventListener('mouseup',this._mUp);this._running=true;}/**
     * @access private
     */},{key:"_Stop",value:function _Stop(){if(!this._running){return;}document.removeEventListener('mousedown',this._mDown);document.removeEventListener('mouseup',this._mUp);this._running=false;}},{key:"running",get:function get(){return this._running;}},{key:"position",get:function get(){return this._position;}},{key:"StartUsing",value:function StartUsing(p_btns){var dIndex=this._usingDeprecated.indexOf(p_btns);if(dIndex!=-1){this._usingDeprecated.splice(dIndex,1);}if(this._using.includes(p_btns)){return;}this._using.push(p_btns);}},{key:"StopUsing",value:function StopUsing(p_btns){if(this._usingDeprecated.includes(p_btns)){return;}this._usingDeprecated.push(p_btns);this._clearUsing.Schedule();}},{key:"_IsUsing",value:function _IsUsing(p_btn){if(p_btn==MOUSE.BTN_LEFT){return false;}for(var i=0,n=this._using.length;i<n;i++){if(p_btn in this._using[i]){return true;}}return false;}},{key:"_ClearUsing",value:function _ClearUsing(){for(var i=0,n=this._usingDeprecated.length;i<n;i++){var btns=this._usingDeprecated[i],index=this._using.indexOf(btns);if(index!=-1){this._using.splice(index,1);}}}// ----> Event handling
/**
     * @access private
     * @param {*} p_evt 
     */},{key:"_mDown",value:function _mDown(p_evt){if(this._IsUsing(p_evt.button)){p_evt.preventDefault();}this._Broadcast(MOUSE.MOUSE_DOWN,p_evt);}/**
     * @access private
     * @param {*} p_evt 
     */},{key:"_mUp",value:function _mUp(p_evt){if(this._IsUsing(p_evt.button)){p_evt.preventDefault();}this._Broadcast(MOUSE.MOUSE_UP,p_evt);}/**
     * @access private
     * @param {*} p_evt 
     */},{key:"_mMove",value:function _mMove(p_evt){this._position.x=p_evt.clientX;this._position.y=p_evt.clientY;}}],[{key:"MOUSE",get:function get(){return this.instance.mouse;}},{key:"LocalMouse",value:function LocalMouse(p_el){var rect=p_el.getBoundingClientRect(),m=this.instance._position,x=m.x-rect.left,y=m.y-rect.top;return{x:x,y:y,normalized:{x:x/rect.width,y:y/rect.height}};}}]);return MOUSE;}(SingletonEx);_defineProperty(MOUSE,"BTN_LEFT",0);_defineProperty(MOUSE,"BTN_MIDDLE",1);_defineProperty(MOUSE,"BTN_RIGHT",2);_defineProperty(MOUSE,"BTN_PREV",3);_defineProperty(MOUSE,"BTN_NEXT",4);_defineProperty(MOUSE,"DOWN",0);_defineProperty(MOUSE,"UP",1);_defineProperty(MOUSE,"RELEASE",2);_defineProperty(MOUSE,"RELEASE_TWICE",3);_defineProperty(MOUSE,"RELEASE_OUTSIDE",4);_defineProperty(MOUSE,"WHEEL",5);_defineProperty(MOUSE,"MOUSE_UP",Symbol('mouseUp'));_defineProperty(MOUSE,"MOUSE_DOWN",Symbol('mouseDown'));module.exports["default"]=module.exports=MOUSE;},{"./ui-signal":208,"@nkmjs/collections":21,"@nkmjs/common":27}],196:[function(require,module,exports){'use strict';var _require257=require("@nkmjs/utils"),U=_require257.U,UDOM=_require257.UDOM;var UI_ID=require("../ui-id");var DOMTemplate=require("../dom-template");var ImageManipulator=require("../manipulators/manipulator-image");var TextManipulator=require("../manipulators/manipulator-text");var __header="_".concat(UI_ID.HEADER);var __expandIcon="_expandIcon";var __icon="_".concat(UI_ID.ICON);var __label="_".concat(UI_ID.LABEL);var __body="_".concat(UI_ID.BODY);var TPLBodyExpand=/*#__PURE__*/function(_DOMTemplate){_inherits(TPLBodyExpand,_DOMTemplate);var _super105=_createSuper(TPLBodyExpand);function TPLBodyExpand(){_classCallCheck(this,TPLBodyExpand);return _super105.call(this);}_createClass(TPLBodyExpand,[{key:"Render",value:function Render(p_host){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var owner=_get(_getPrototypeOf(TPLBodyExpand.prototype),"Render",this).call(this,p_host,p_options),expIconOpts=U.Get(p_options,"expandIcon",null),iconOpts=U.Get(p_options,UI_ID.ICON,null),labelOpts=U.Get(p_options,UI_ID.TITLE,null),expandIcon=owner[__expandIcon]=new ImageManipulator(owner[__expandIcon],expIconOpts&&"autoHide"in expIconOpts?expIconOpts.autoHide:false),icon=owner[__icon]=new ImageManipulator(owner[__icon],iconOpts&&"autoHide"in iconOpts?iconOpts.autoHide:true),label=owner[__label]=new TextManipulator(owner[__label],labelOpts&&"autoHide"in labelOpts?labelOpts.autoHide:false);if(expIconOpts){expandIcon.Set(expIconOpts.url);if(expIconOpts.htitle){expandIcon.element.htitle=expIconOpts.htitle;}if(expandIcon[UI_ID.CSS_CL]){expandIcon.element.classList.add(expandIcon[UI_ID.CSS_CL]);}}if(iconOpts){icon.Set(iconOpts);if(iconOpts[UI_ID.CSS_CL]){icon.element.classList.add(iconOpts[UI_ID.CSS_CL]);}}if(labelOpts){label.Set(labelOpts);if(labelOpts[UI_ID.CSS_CL]){label.element.classList.add(labelOpts[UI_ID.CSS_CL]);}}return owner;}}],[{key:"_CreateTemplate",value:function _CreateTemplate(){_get(_getPrototypeOf(TPLBodyExpand),"_CreateTemplate",this).call(this);this._Add(UDOM.New("div",{"class":UI_ID.HEADER}),__header);this._Add(UDOM.New("span",{"class":"".concat(UI_ID.ICON," expand")}),__expandIcon,__header);this._Add(UDOM.New("span",{"class":UI_ID.ICON}),__icon,__header);this._Add(UDOM.New("span",{"class":UI_ID.LABEL}),__label,__header);this._Add(UDOM.New("div",{"class":UI_ID.BODY}),__body);}}]);return TPLBodyExpand;}(DOMTemplate);module.exports["default"]=module.exports=TPLBodyExpand;},{"../dom-template":174,"../manipulators/manipulator-image":193,"../manipulators/manipulator-text":194,"../ui-id":207,"@nkmjs/utils":268}],197:[function(require,module,exports){'use strict';var _require258=require("@nkmjs/utils"),U=_require258.U,UDOM=_require258.UDOM;var UI_ID=require("../ui-id");var DOMTemplate=require("../dom-template");var ImageManipulator=require("../manipulators/manipulator-image");var TextManipulator=require("../manipulators/manipulator-text");var __icon="_".concat(UI_ID.ICON);var __title="_".concat(UI_ID.TITLE);var __subtitle="_".concat(UI_ID.SUBTITLE);var __header="_".concat(UI_ID.HEADER);var __body="_".concat(UI_ID.BODY);var __titles="_titles";var TPLBodyHeaderTitles=/*#__PURE__*/function(_DOMTemplate2){_inherits(TPLBodyHeaderTitles,_DOMTemplate2);var _super106=_createSuper(TPLBodyHeaderTitles);function TPLBodyHeaderTitles(){_classCallCheck(this,TPLBodyHeaderTitles);return _super106.call(this);}/*

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(UI_FLAG.NO_ICON, !this._icon.Set(p_value)); }

    get title() { return this._title; }
    set title(p_value) {  this._flags.Set(UI_FLAG.NO_LABEL, !this._title.Set(p_value)); }

    get subtitle() { return this._subtitle; }
    set subtitle(p_value) {  this._subtitle.Set(p_value); }

    get header(){ return this._header; }
    get body(){ return this._body; }


    */_createClass(TPLBodyHeaderTitles,[{key:"Render",value:function Render(p_host){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var owner=_get(_getPrototypeOf(TPLBodyHeaderTitles.prototype),"Render",this).call(this,p_host,p_options),iconOpts=U.Get(p_options,UI_ID.ICON,null),titleOpts=U.Get(p_options,UI_ID.TITLE,null),subtitleOpts=U.Get(p_options,UI_ID.SUBTITLE,null),icon=owner[__icon]=new ImageManipulator(owner[__icon],iconOpts&&"autoHide"in iconOpts?iconOpts.autoHide:false),title=owner[__title]=new TextManipulator(owner[__title],titleOpts&&"autoHide"in titleOpts?titleOpts.autoHide:false),subtitle=owner[__subtitle]=new TextManipulator(owner[__subtitle],subtitleOpts&&"autoHide"in subtitleOpts?subtitleOpts.autoHide:false);if(iconOpts){icon.Set(iconOpts);if(iconOpts[UI_ID.CSS_CL]){icon.element.classList.add(iconOpts[UI_ID.CSS_CL]);}}if(titleOpts){title.Set(titleOpts);if(titleOpts[UI_ID.CSS_CL]){title.element.classList.add(titleOpts[UI_ID.CSS_CL]);}}if(subtitleOpts){subtitle.Set(subtitleOpts);if(subtitleOpts[UI_ID.CSS_CL]){subtitle.element.classList.add(subtitleOpts[UI_ID.CSS_CL]);}}return owner;}}],[{key:"_CreateTemplate",value:function _CreateTemplate(){_get(_getPrototypeOf(TPLBodyHeaderTitles),"_CreateTemplate",this).call(this);this._Add(UDOM.New("div",{"class":UI_ID.HEADER}),__header);this._Add(UDOM.New("span",{"class":UI_ID.ICON}),__icon,__header);this._Add(UDOM.New("span",{"class":"titles"}),__titles,__header);this._Add(UDOM.New("span",{"class":UI_ID.TITLE}),__title,__titles);this._Add(UDOM.New("span",{"class":UI_ID.SUBTITLE}),__subtitle,__titles);this._Add(UDOM.New("div",{"class":UI_ID.BODY}),__body);}}]);return TPLBodyHeaderTitles;}(DOMTemplate);module.exports["default"]=module.exports=TPLBodyHeaderTitles;},{"../dom-template":174,"../manipulators/manipulator-image":193,"../manipulators/manipulator-text":194,"../ui-id":207,"@nkmjs/utils":268}],198:[function(require,module,exports){'use strict';var _require259=require("@nkmjs/utils"),U=_require259.U,UDOM=_require259.UDOM;var UI_ID=require("../ui-id");var DOMTemplate=require("../dom-template");var ImageManipulator=require("../manipulators/manipulator-image");var TextManipulator=require("../manipulators/manipulator-text");var __expandIcon="_expandIcon";var __icon="_".concat(UI_ID.ICON);var __label="_".concat(UI_ID.LABEL);var TPLFacadeExpandLabel=/*#__PURE__*/function(_DOMTemplate3){_inherits(TPLFacadeExpandLabel,_DOMTemplate3);var _super107=_createSuper(TPLFacadeExpandLabel);function TPLFacadeExpandLabel(){_classCallCheck(this,TPLFacadeExpandLabel);return _super107.call(this);}/*

    get expandIcon() { return this._expand_icon; }
    set expandIcon(p_value) { this._flags.Set(UI_FLAG.NO_ICON, !this._expand_icon.Set(p_value)); }

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(UI_FLAG.NO_ICON, !this._icon.Set(p_value)); }

    get title() { return this._title; }
    set title(p_value) {  this._flags.Set(UI_FLAG.NO_LABEL, !this._title.Set(p_value)); }

    */_createClass(TPLFacadeExpandLabel,[{key:"Render",value:function Render(p_host){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var owner=_get(_getPrototypeOf(TPLFacadeExpandLabel.prototype),"Render",this).call(this,p_host,p_options),expIconOpts=U.Get(p_options,"expandIcon",null),iconOpts=U.Get(p_options,UI_ID.ICON,null),labelOpts=U.Get(p_options,UI_ID.TITLE,null),expandIcon=owner[__expandIcon]=new ImageManipulator(owner[__expandIcon],expIconOpts&&"autoHide"in expIconOpts?expIconOpts.autoHide:false),icon=owner[__icon]=new ImageManipulator(owner[__icon],iconOpts&&"autoHide"in iconOpts?iconOpts.autoHide:true),label=owner[__label]=new TextManipulator(owner[__label],labelOpts&&"autoHide"in labelOpts?labelOpts.autoHide:false);if(expIconOpts){expandIcon.Set(expIconOpts.url);if(expIconOpts.htitle){expandIcon.element.htitle=expIconOpts.htitle;}if(expandIcon[UI_ID.CSS_CL]){expandIcon.element.classList.add(expandIcon[UI_ID.CSS_CL]);}}if(iconOpts){icon.Set(iconOpts);if(iconOpts[UI_ID.CSS_CL]){icon.element.classList.add(iconOpts[UI_ID.CSS_CL]);}}if(labelOpts){label.Set(labelOpts);if(labelOpts[UI_ID.CSS_CL]){label.element.classList.add(labelOpts[UI_ID.CSS_CL]);}}return owner;}}],[{key:"_CreateTemplate",value:function _CreateTemplate(){_get(_getPrototypeOf(TPLFacadeExpandLabel),"_CreateTemplate",this).call(this);this._Add(UDOM.New("span",{"class":"".concat(UI_ID.ICON," expand")}),__expandIcon);this._Add(UDOM.New("span",{"class":UI_ID.ICON}),__icon);this._Add(UDOM.New("span",{"class":UI_ID.LABEL}),__label);}}]);return TPLFacadeExpandLabel;}(DOMTemplate);module.exports["default"]=module.exports=TPLFacadeExpandLabel;},{"../dom-template":174,"../manipulators/manipulator-image":193,"../manipulators/manipulator-text":194,"../ui-id":207,"@nkmjs/utils":268}],199:[function(require,module,exports){'use strict';var _require260=require("@nkmjs/utils"),U=_require260.U,UDOM=_require260.UDOM;var UI_ID=require("../ui-id");var DOMTemplate=require("../dom-template");var ImageManipulator=require("../manipulators/manipulator-image");var TextManipulator=require("../manipulators/manipulator-text");var __expandIcon="_expandIcon";var __icon="_".concat(UI_ID.ICON);var __title="_".concat(UI_ID.TITLE);var TPLFacadeExpandTitle=/*#__PURE__*/function(_DOMTemplate4){_inherits(TPLFacadeExpandTitle,_DOMTemplate4);var _super108=_createSuper(TPLFacadeExpandTitle);function TPLFacadeExpandTitle(){var _this15;_classCallCheck(this,TPLFacadeExpandTitle);_this15=_super108.call(this);;return _this15;}/*

    get expandIcon() { return this._expand_icon; }
    set expandIcon(p_value) { this._flags.Set(UI_FLAG.NO_ICON, !this._expand_icon.Set(p_value)); }

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(UI_FLAG.NO_ICON, !this._icon.Set(p_value)); }

    get title() { return this._title; }
    set title(p_value) {  this._flags.Set(UI_FLAG.NO_LABEL, !this._title.Set(p_value)); }

    */_createClass(TPLFacadeExpandTitle,[{key:"Render",value:function Render(p_host){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var owner=_get(_getPrototypeOf(TPLFacadeExpandTitle.prototype),"Render",this).call(this,p_host,p_options),expIconOpts=U.Get(p_options,"expandIcon",null),iconOpts=U.Get(p_options,UI_ID.ICON,null),titleOpts=U.Get(p_options,UI_ID.TITLE,null),expandIcon=owner[__expandIcon]=new ImageManipulator(owner[__expandIcon],expIconOpts&&"autoHide"in expIconOpts?expIconOpts.autoHide:false),icon=owner[__icon]=new ImageManipulator(owner[__icon],iconOpts&&"autoHide"in iconOpts?iconOpts.autoHide:true),title=owner[__title]=new TextManipulator(owner[__title],titleOpts&&"autoHide"in titleOpts?titleOpts.autoHide:false);if(expIconOpts){expandIcon.Set(expIconOpts.url);if(expIconOpts.htitle){expandIcon.element.htitle=expIconOpts.htitle;}if(expandIcon[UI_ID.CSS_CL]){expandIcon.element.classList.add(expandIcon[UI_ID.CSS_CL]);}}if(iconOpts){icon.Set(iconOpts);if(iconOpts[UI_ID.CSS_CL]){icon.element.classList.add(iconOpts[UI_ID.CSS_CL]);}}if(titleOpts){title.Set(titleOpts);if(titleOpts[UI_ID.CSS_CL]){title.element.classList.add(titleOpts[UI_ID.CSS_CL]);}}return owner;}}],[{key:"_CreateTemplate",value:function _CreateTemplate(){_get(_getPrototypeOf(TPLFacadeExpandTitle),"_CreateTemplate",this).call(this);this._Add(UDOM.New("span",{"class":"".concat(UI_ID.ICON," expand")}),__expandIcon);this._Add(UDOM.New("span",{"class":UI_ID.ICON}),__icon);this._Add(UDOM.New("span",{"class":UI_ID.TITLE}),__title);}}]);return TPLFacadeExpandTitle;}(DOMTemplate);module.exports["default"]=module.exports=TPLFacadeExpandTitle;},{"../dom-template":174,"../manipulators/manipulator-image":193,"../manipulators/manipulator-text":194,"../ui-id":207,"@nkmjs/utils":268}],200:[function(require,module,exports){'use strict';var _require261=require("@nkmjs/utils"),U=_require261.U,UDOM=_require261.UDOM;var UI_ID=require("../ui-id");var DOMTemplate=require("../dom-template");var ImageManipulator=require("../manipulators/manipulator-image");var TextManipulator=require("../manipulators/manipulator-text");var __icon="_".concat(UI_ID.ICON);var __label="_".concat(UI_ID.LABEL);var TPLFacadeLabel=/*#__PURE__*/function(_DOMTemplate5){_inherits(TPLFacadeLabel,_DOMTemplate5);var _super109=_createSuper(TPLFacadeLabel);function TPLFacadeLabel(){var _this16;_classCallCheck(this,TPLFacadeLabel);_this16=_super109.call(this);;return _this16;}/*

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(UI_FLAG.NO_ICON, !this._icon.Set(p_value)); }

    get label() { return this._label; }
    set label(p_value) {  this._flags.Set(UI_FLAG.NO_LABEL, !this._label.Set(p_value)); }

    */_createClass(TPLFacadeLabel,[{key:"Render",value:function Render(p_host){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var owner=_get(_getPrototypeOf(TPLFacadeLabel.prototype),"Render",this).call(this,p_host,p_options),iconOpts=U.Get(p_options,UI_ID.ICON,null),labelOpts=U.Get(p_options,UI_ID.LABEL,null),icon=owner[__icon]=new ImageManipulator(owner[__icon],iconOpts&&"autoHide"in iconOpts?iconOpts.autoHide:true),label=owner[__label]=new TextManipulator(owner[__label],labelOpts&&"autoHide"in labelOpts?labelOpts.autoHide:false);if(iconOpts){icon.Set(iconOpts);if(iconOpts[UI_ID.CSS_CL]){icon.element.classList.add(iconOpts[UI_ID.CSS_CL]);}}if(labelOpts){label.Set(labelOpts);if(labelOpts[UI_ID.CSS_CL]){label.element.classList.add(labelOpts[UI_ID.CSS_CL]);}}return owner;}}],[{key:"_CreateTemplate",value:function _CreateTemplate(){_get(_getPrototypeOf(TPLFacadeLabel),"_CreateTemplate",this).call(this);this._Add(UDOM.New("span",{"class":UI_ID.ICON}),__icon);this._Add(UDOM.New("span",{"class":UI_ID.LABEL}),__label);}}]);return TPLFacadeLabel;}(DOMTemplate);module.exports["default"]=module.exports=TPLFacadeLabel;},{"../dom-template":174,"../manipulators/manipulator-image":193,"../manipulators/manipulator-text":194,"../ui-id":207,"@nkmjs/utils":268}],201:[function(require,module,exports){'use strict';var _require262=require("@nkmjs/utils"),U=_require262.U,UDOM=_require262.UDOM;var UI_ID=require("../ui-id");var DOMTemplate=require("../dom-template");var ImageManipulator=require("../manipulators/manipulator-image");var TextManipulator=require("../manipulators/manipulator-text");var __icon="_".concat(UI_ID.ICON);var __title="_".concat(UI_ID.TITLE);var __subtitle="_".concat(UI_ID.SUBTITLE);var TPLFacadeTitles=/*#__PURE__*/function(_DOMTemplate6){_inherits(TPLFacadeTitles,_DOMTemplate6);var _super110=_createSuper(TPLFacadeTitles);function TPLFacadeTitles(){_classCallCheck(this,TPLFacadeTitles);return _super110.call(this);}/*

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(UI_FLAG.NO_ICON, !this._icon.Set(p_value)); }

    get title() { return this._title; }
    set title(p_value) {  this._flags.Set(UI_FLAG.NO_LABEL, !this._title.Set(p_value)); }

    get subtitle() { return this._subtitle; }
    set subtitle(p_value) {  this._subtitle.Set(p_value); }


    */_createClass(TPLFacadeTitles,[{key:"Render",value:function Render(p_host){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var owner=_get(_getPrototypeOf(TPLFacadeTitles.prototype),"Render",this).call(this,p_host,p_options),iconOpts=U.Get(p_options,UI_ID.ICON,null),titleOpts=U.Get(p_options,UI_ID.TITLE,null),subtitleOpts=U.Get(p_options,UI_ID.SUBTITLE,null),icon=owner[__icon]=new ImageManipulator(owner[__icon],iconOpts&&"autoHide"in iconOpts?iconOpts.autoHide:true),title=owner[__title]=new TextManipulator(owner[__title],titleOpts&&"autoHide"in titleOpts?titleOpts.autoHide:false),subtitle=owner[__subtitle]=new TextManipulator(owner[__subtitle],subtitleOpts&&"autoHide"in subtitleOpts?subtitleOpts.autoHide:false);if(iconOpts){icon.Set(iconOpts);if(iconOpts[UI_ID.CSS_CL]){icon.element.classList.add(iconOpts[UI_ID.CSS_CL]);}}if(titleOpts){title.Set(titleOpts);if(titleOpts[UI_ID.CSS_CL]){title.element.classList.add(titleOpts[UI_ID.CSS_CL]);}}if(subtitleOpts){subtitle.Set(subtitleOpts);if(subtitleOpts[UI_ID.CSS_CL]){subtitle.element.classList.add(subtitleOpts[UI_ID.CSS_CL]);}}return owner;}}],[{key:"_CreateTemplate",value:function _CreateTemplate(){_get(_getPrototypeOf(TPLFacadeTitles),"_CreateTemplate",this).call(this);this._Add(UDOM.New("span",{"class":UI_ID.ICON}),__icon);this._Add(UDOM.New("span",{"class":UI_ID.TITLE}),__title);this._Add(UDOM.New("span",{"class":UI_ID.SUBTITLE}),__subtitle);}}]);return TPLFacadeTitles;}(DOMTemplate);module.exports["default"]=module.exports=TPLFacadeTitles;},{"../dom-template":174,"../manipulators/manipulator-image":193,"../manipulators/manipulator-text":194,"../ui-id":207,"@nkmjs/utils":268}],202:[function(require,module,exports){'use strict';var _require263=require("@nkmjs/utils"),U=_require263.U,UDOM=_require263.UDOM;var UI_ID=require("../ui-id");var DOMTemplate=require("../dom-template");var __header="_".concat(UI_ID.HEADER);var __body="_".concat(UI_ID.BODY);var __footer="_".concat(UI_ID.FOOTER);var TPLHeaderBodyFooter=/*#__PURE__*/function(_DOMTemplate7){_inherits(TPLHeaderBodyFooter,_DOMTemplate7);var _super111=_createSuper(TPLHeaderBodyFooter);function TPLHeaderBodyFooter(){_classCallCheck(this,TPLHeaderBodyFooter);return _super111.call(this);}/*

    get header(){ return this._header; }
    get body(){ return this._body; }
    get footer(){ return this._footer; }

    */_createClass(TPLHeaderBodyFooter,null,[{key:"_CreateTemplate",value:function _CreateTemplate(){_get(_getPrototypeOf(TPLHeaderBodyFooter),"_CreateTemplate",this).call(this);this._Add(UDOM.New("div",{"class":UI_ID.HEADER}),__header);this._Add(UDOM.New("div",{"class":UI_ID.BODY}),__body);this._Add(UDOM.New("div",{"class":UI_ID.FOOTER}),__footer);}}]);return TPLHeaderBodyFooter;}(DOMTemplate);module.exports["default"]=module.exports=TPLHeaderBodyFooter;},{"../dom-template":174,"../ui-id":207,"@nkmjs/utils":268}],203:[function(require,module,exports){'use strict';var _require264=require("@nkmjs/common"),NFOS=_require264.NFOS,SIGNAL=_require264.SIGNAL,POOL=_require264.POOL;var UI=require("../ui");var UI_ID=require("../ui-id");var UI_SIGNAL=require("../ui-signal");var ExtExpand=require("../extensions/ext-expand");var CatalogBuilder=require("../helpers/catalog-builder");var TreeItem=require("./tree-item");var TPLBodyExpand=require("../templates/tpl-body-expand");/**
 * 
 *  *--------------------------------*
 *  | + [] Item Name          [][][] |
 *  *--------------------------------*
 * 
 */var TreeItemGroup=/*#__PURE__*/function(_TreeItem){_inherits(TreeItemGroup,_TreeItem);var _super112=_createSuper(TreeItemGroup);function TreeItemGroup(){_classCallCheck(this,TreeItemGroup);return _super112.call(this);}_createClass(TreeItemGroup,[{key:"_Init",value:// ----> Init
function _Init(){_get(_getPrototypeOf(TreeItemGroup.prototype),"_Init",this).call(this);this._tplClass=TPLBodyExpand;this._extExpand=this._interactions.Add(ExtExpand);this._extExpand._toggled=false;this._extExpand.Watch(UI_SIGNAL.EXPANDED,this._Expand,this);this._extExpand.Watch(UI_SIGNAL.COLLAPSED,this._Collapse,this);this._builder=null;this._expandIcon=null;}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(TreeItemGroup.prototype),"_PostInit",this).call(this);this._SetupBuilder();this._extExpand.Setup(this,this._body,this._expandIcon.element);this.order=0;}},{key:"depth",set:function set(p_value){_set(_getPrototypeOf(TreeItemGroup.prototype),"depth",p_value,this,true);var depthPlusOne=p_value+1,keys=this._builder._map.keys;for(var i=0,n=keys.length;i<n;i++){this._builder._map.get(keys[i]).depth=depthPlusOne;}}},{key:"_SetupBuilder",value:function _SetupBuilder(){this._builder=POOL.Rent(CatalogBuilder);this._builder.owner=this;this._builder.host=this._body;this._builder._defaultItemClass=TreeItem;this._builder._defaultGroupClass=TreeItemGroup;this._builder.Watch(SIGNAL.ITEM_ADDED,this._OnBuilderItemAdded,this);this._builder.Watch(SIGNAL.ITEM_REMOVED,this._OnBuilderItemRemoved,this);}// ----> DOM
},{key:"icon",get:function get(){return this._icon;},set:function set(p_value){this._icon.Set(p_value);}},{key:"label",get:function get(){return this._label;},set:function set(p_value){this._label.Set(p_value);}//TODO : Body must break flex row
},{key:"_Style",value:function _Style(){return{':host':{'position':"relative",'display':"flex",'flex-flow':"column nowrap",'justify-content':'flex-start','align-items':"stretch"},':host(.expanded)':{'height':'auto'},'.header':{'position':"relative",'flex':'0 0 auto'},'.body':{'position':"relative",'flex':'1 0 auto','display':"none",'flex-flow':"column nowrap",'justify-content':'flex-start','align-items':"stretch",'min-width':0},':host(.expanded) .body':{'display':"flex"},'.item':{flex:"1 1 auto"}};}},{key:"_Render",value:function _Render(){var _this$_tplOptions;this._tplOptions=(_this$_tplOptions={},_defineProperty(_this$_tplOptions,UI_ID.OWNER,this),_defineProperty(_this$_tplOptions,UI_ID.ICON,{autoHide:true}),_defineProperty(_this$_tplOptions,"expandIcon",{htitle:"Expand"}),_this$_tplOptions);_get(_getPrototypeOf(TreeItemGroup.prototype),"_Render",this).call(this);this._icon.autoHide=true;this._toolbarCtnr=this._header;this.focusArea=this._header;this._dragActivator=this._header;this._dragFeedbackHost=this._header;}},{key:"Activate",value:function Activate(p_evt){if(this._toolbar&&this._toolbar.focused){return;}_get(_getPrototypeOf(TreeItemGroup.prototype),"Activate",this).call(this,p_evt);}},{key:"AltActivate",value:function AltActivate(p_evt){if(this._toolbar&&this._toolbar.focused){return;}if(!_get(_getPrototypeOf(TreeItemGroup.prototype),"AltActivate",this).call(this,p_evt)){return false;}this._extExpand.Toggle();}},{key:"Expand",value:function Expand(){this._extExpand.Expand();}},{key:"_Expand",value:function _Expand(){if(this._data){this._data.expanded=true;this._builder.Enable();}this._expandIcon.rotation=90;}},{key:"Collapse",value:function Collapse(){this._extExpand.Collapse();}},{key:"_Collapse",value:function _Collapse(){if(this._data){this._data.expanded=false;}this._builder.Disable();this._expandIcon.rotation=0;}},{key:"_OnDataChanged",value:function _OnDataChanged(p_oldData){_get(_getPrototypeOf(TreeItemGroup.prototype),"_OnDataChanged",this).call(this,p_oldData);//Ensure content is cleared before updating builder's data
this._builder.catalog=this._data;if(this._data){if(this._extExpand.isExpanded){this._data.expanded=true;}}else{this._extExpand.Collapse();}}// ----> Item Management
},{key:"_OnBuilderItemAdded",value:function _OnBuilderItemAdded(p_builder,p_item,p_widget){p_widget.classList.add("item");p_widget.depth=this._depth+1;//Re-order items ?
}},{key:"_OnBuilderItemRemoved",value:function _OnBuilderItemRemoved(p_builder,p_item,p_widget){p_widget.classList.remove("item");}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(TreeItemGroup.prototype),"_CleanUp",this).call(this);this.Collapse();}}]);return TreeItemGroup;}(TreeItem);_defineProperty(TreeItemGroup,"__NFO__",NFOS.Ext({css:["@/tree/tree-group.css"]},TreeItem,['css']));module.exports["default"]=module.exports=TreeItemGroup;UI.Register("nkmjs-tree-item-group",TreeItemGroup,"ul");},{"../extensions/ext-expand":178,"../helpers/catalog-builder":181,"../templates/tpl-body-expand":196,"../ui":209,"../ui-id":207,"../ui-signal":208,"./tree-item":204,"@nkmjs/common":27}],204:[function(require,module,exports){'use strict';var _require265=require("@nkmjs/utils"),U=_require265.U,UDOM=_require265.UDOM;var _require266=require("@nkmjs/common"),NFOS=_require266.NFOS,COMMON_FLAG=_require266.COMMON_FLAG;var _require267=require("@nkmjs/style"),CSS=_require267.CSS;var UI=require("../ui");var UI_ID=require("../ui-id");var MOUSE=require("../mouse");var DOMTemplate=require("../dom-template");var Toolbar=require("../helpers/toolbar");var TPLFacadeLabel=require("../templates/tpl-facade-label");var CatalogWidget=require("../widget-catalog");/**
 * 
 *  *--------------------------------*
 *  | [] Item Name            [][][] |
 *  *--------------------------------*
 * 
 */var TreeItem=/*#__PURE__*/function(_CatalogWidget){_inherits(TreeItem,_CatalogWidget);var _super113=_createSuper(TreeItem);function TreeItem(){var _this17;_classCallCheck(this,TreeItem);_this17=_super113.call(this);_this17.depth=0;return _this17;}_createClass(TreeItem,[{key:"_Init",value:// ----> Init
function _Init(){this.default_SelectOnActivation=U.Default(this.default_SelectOnActivation,true);_get(_getPrototypeOf(TreeItem.prototype),"_Init",this).call(this);this._notifiesSelectionStack=true;this._tplClass=TPLFacadeLabel;this._toolbarClass=Toolbar;this._toolbar=null;this._toolbarCtnr=null;this._depth=0;}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(TreeItem.prototype),"_PostInit",this).call(this);this.order=1;}// ----> DOM
},{key:"depth",get:function get(){return this._depth;},set:function set(p_value){this._depth=p_value;this.style.setProperty("--depth",this._depth);}},{key:"icon",get:function get(){return this._icon;},set:function set(p_value){this._icon.Set(p_value);}},{key:"label",get:function get(){return this._label;},set:function set(p_value){this._label.Set(p_value);}},{key:"_Style",value:function _Style(){return CSS.Extends({':host':{'position':'relative','min-width':0},'.toolbar':{'flex':"0 0 auto"}},_get(_getPrototypeOf(TreeItem.prototype),"_Style",this).call(this));}},{key:"_Render",value:function _Render(){if(!this._tplOptions){var _this$_tplOptions2;this._tplOptions=(_this$_tplOptions2={},_defineProperty(_this$_tplOptions2,UI_ID.OWNER,this),_defineProperty(_this$_tplOptions2,UI_ID.ICON,{autoHide:false}),_this$_tplOptions2);}DOMTemplate.Render(this._tplClass,this,this._tplOptions);this._toolbarCtnr=this;this.focusArea=this;}// ----> Update infos   
},{key:"_UpdateInfos",value:function _UpdateInfos(){if(this._itemData){this._flavorEnum.Set(this._itemData.isDirty?COMMON_FLAG.WARNING:null);if(!this._label.Set(this._itemData)){this._label.Set(this._data.options);}if(!this._icon.Set(this._itemData)){this._icon.Set(this._data.options);}}else{this._flavorEnum.Set(null);this._label.Set(this._data.options);this._icon.Set(this._data.options);}}// ----> COMMANDS
},{key:"_BuildCommand",value:function _BuildCommand(p_cmd){if(!this._toolbar){this._toolbar=this.Add(this._toolbarClass,"toolbar",this._toolbarCtnr);}this._toolbar.CreateHandle({command:p_cmd,isCommandTrigger:false,trigger:{thisArg:this,fn:this._ExecuteCommand,arg:p_cmd}});}/**
     * Clear any command handles created through `_BuildCommandHandles`
     */},{key:"_ClearCommandHandles",value:function _ClearCommandHandles(){_get(_getPrototypeOf(TreeItem.prototype),"_ClearCommandHandles",this).call(this);if(this._toolbar){this._toolbar.Release();this._toolbar=null;}}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){this._depth=0;_get(_getPrototypeOf(TreeItem.prototype),"_CleanUp",this).call(this);}}]);return TreeItem;}(CatalogWidget);_defineProperty(TreeItem,"__NFO__",NFOS.Ext({css:["@/tree/tree-item.css"]},CatalogWidget,['css']));module.exports["default"]=module.exports=TreeItem;UI.Register("nkmjs-tree-item",TreeItem,"li");},{"../dom-template":174,"../helpers/toolbar":187,"../mouse":195,"../templates/tpl-facade-label":200,"../ui":209,"../ui-id":207,"../widget-catalog":215,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/utils":268}],205:[function(require,module,exports){'use strict';var _require268=require("@nkmjs/utils"),U=_require268.U;var _require269=require("@nkmjs/common"),NFOS=_require269.NFOS;var UI=require("../ui");var TreeItemGroup=require("./tree-item-group");var TreeRoot=/*#__PURE__*/function(_TreeItemGroup){_inherits(TreeRoot,_TreeItemGroup);var _super114=_createSuper(TreeRoot);function TreeRoot(){_classCallCheck(this,TreeRoot);return _super114.call(this);}_createClass(TreeRoot,[{key:"_Init",value:// ----> Init
function _Init(){this.default_SelectOnActivation=false;_get(_getPrototypeOf(TreeRoot.prototype),"_Init",this).call(this);this._selectOnActivation=false;this._searchBtn=null;this._InitSelectionStack();// TODO : If 'flattened', make directories non-expandable items
}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(TreeRoot.prototype),"_PostInit",this).call(this);// TODO : Find an elegant way to make the toolbar static
/*
                this._searchBtn = this._toolbar.CreateHandle({
                    [UI_ID.ICON]:`%ICON%/icon_search.svg`, text:`Find...`,
                    trigger:{ thisArg:this, fn:this._OpenFind},
                    //request:{}
                });
                this._searchBtn.order = 99;
        */}},{key:"_Render",value:function _Render(){_get(_getPrototypeOf(TreeRoot.prototype),"_Render",this).call(this);this.style.setProperty("--tree_size","var(--size_s)");}},{key:"_OpenFind",value:function _OpenFind(){}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(TreeRoot.prototype),"_CleanUp",this).call(this);}}]);return TreeRoot;}(TreeItemGroup);_defineProperty(TreeRoot,"__NFO__",NFOS.Ext({css:["@/tree/tree-root.css"]},TreeItemGroup,['css']));module.exports["default"]=module.exports=TreeRoot;UI.Register("nkmjs-tree-root",TreeRoot);},{"../ui":209,"./tree-item-group":203,"@nkmjs/common":27,"@nkmjs/utils":268}],206:[function(require,module,exports){'use strict';var _require270=require("@nkmjs/common"),COMMON_FLAG=_require270.COMMON_FLAG;var UI_FLAG=function UI_FLAG(){_classCallCheck(this,UI_FLAG);}// Generics
;_defineProperty(UI_FLAG,"NONE","none");_defineProperty(UI_FLAG,"SELF","self");_defineProperty(UI_FLAG,"INSIDE","vertical");_defineProperty(UI_FLAG,"OUTSIDE","horizontal");_defineProperty(UI_FLAG,"VERTICAL","vertical");_defineProperty(UI_FLAG,"HORIZONTAL","horizontal");_defineProperty(UI_FLAG,"VERTICAL_AND_HORIZONTAL","vertical horizontal");_defineProperty(UI_FLAG,"orientations",[UI_FLAG.VERTICAL,UI_FLAG.HORIZONTAL,UI_FLAG.VERTICAL_AND_HORIZONTAL]);_defineProperty(UI_FLAG,"EXPANDED","expanded");_defineProperty(UI_FLAG,"COLLAPSED","collapsed");_defineProperty(UI_FLAG,"DISABLED","disabled");_defineProperty(UI_FLAG,"IDLE","idle");_defineProperty(UI_FLAG,"FOCUSED","focused");_defineProperty(UI_FLAG,"istates",[UI_FLAG.DISABLED,UI_FLAG.IDLE,UI_FLAG.FOCUSED]);_defineProperty(UI_FLAG,"ACTIVATED","activated");_defineProperty(UI_FLAG,"SELECTED","selected");_defineProperty(UI_FLAG,"TOGGLED","toggled");_defineProperty(UI_FLAG,"DRAGGED","dragged");_defineProperty(UI_FLAG,"ALLOW_DROP","allow-drop");_defineProperty(UI_FLAG,"LEFT","left");_defineProperty(UI_FLAG,"RIGHT","right");_defineProperty(UI_FLAG,"TOP","top");_defineProperty(UI_FLAG,"BOTTOM","bottom");_defineProperty(UI_FLAG,"TOP_LEFT","".concat(UI_FLAG.TOP," ").concat(UI_FLAG.LEFT));_defineProperty(UI_FLAG,"TOP_RIGHT","".concat(UI_FLAG.TOP," ").concat(UI_FLAG.RIGHT));_defineProperty(UI_FLAG,"BOTTOM_LEFT","".concat(UI_FLAG.BOTTOM," ").concat(UI_FLAG.LEFT));_defineProperty(UI_FLAG,"BOTTOM_RIGHT","".concat(UI_FLAG.BOTTOM," ").concat(UI_FLAG.RIGHT));_defineProperty(UI_FLAG,"placement",[UI_FLAG.LEFT,UI_FLAG.RIGHT,UI_FLAG.TOP,UI_FLAG.BOTTOM,UI_FLAG.TOP_LEFT,UI_FLAG.TOP_RIGHT,UI_FLAG.BOTTOM_LEFT,UI_FLAG.BOTTOM_RIGHT]);_defineProperty(UI_FLAG,"NO_ICON","no-icon");_defineProperty(UI_FLAG,"NO_LABEL","no-label");_defineProperty(UI_FLAG,"NO_SCALE","no-scale");_defineProperty(UI_FLAG,"FIXED_SIZE","fixed-size");_defineProperty(UI_FLAG,"SIZE_XS","size-xs");_defineProperty(UI_FLAG,"SIZE_S","size-s");_defineProperty(UI_FLAG,"SIZE_M","size-m");_defineProperty(UI_FLAG,"SIZE_L","size-l");_defineProperty(UI_FLAG,"SIZE_XL","size-xl");_defineProperty(UI_FLAG,"sizes",[UI_FLAG.SIZE_XS,UI_FLAG.SIZE_S,UI_FLAG.SIZE_M,UI_FLAG.SIZE_L,UI_FLAG.SIZE_XL]);_defineProperty(UI_FLAG,"CTA","cta");_defineProperty(UI_FLAG,"flavors",[COMMON_FLAG.INFOS,COMMON_FLAG.WARNING,COMMON_FLAG.ERROR,UI_FLAG.CTA]);_defineProperty(UI_FLAG,"flavorsExtended",[COMMON_FLAG.INFOS,COMMON_FLAG.WARNING,COMMON_FLAG.ERROR,COMMON_FLAG.READY,COMMON_FLAG.DIRTY,COMMON_FLAG.LOADING,COMMON_FLAG.PROCESSING,COMMON_FLAG.WAITING,COMMON_FLAG.active,UI_FLAG.CTA]);_defineProperty(UI_FLAG,"MINIMAL","minimal");_defineProperty(UI_FLAG,"FRAME","frame");_defineProperty(UI_FLAG,"variants",[UI_FLAG.MINIMAL,UI_FLAG.FRAME]);module.exports["default"]=module.exports=UI_FLAG;},{"@nkmjs/common":27}],207:[function(require,module,exports){'use strict';var _require271=require("@nkmjs/common"),COM_ID=_require271.COM_ID;var UI_ID=function UI_ID(){_classCallCheck(this,UI_ID);};_defineProperty(UI_ID,"UID",COM_ID.UID);_defineProperty(UI_ID,"NAME",COM_ID.NAME);_defineProperty(UI_ID,"TITLE",COM_ID.TITLE);_defineProperty(UI_ID,"MESSAGE",COM_ID.MESSAGE);_defineProperty(UI_ID,"ICON",COM_ID.ICON);_defineProperty(UI_ID,"PATH",COM_ID.PATH);_defineProperty(UI_ID,"DATA",COM_ID.DATA);_defineProperty(UI_ID,"CMD_PRIMARY",COM_ID.CMD_PRIMARY);_defineProperty(UI_ID,"CMD_SECONDARY",COM_ID.CMD_SECONDARY);_defineProperty(UI_ID,"CMD_LIST",COM_ID.CMD_LIST);_defineProperty(UI_ID,"OWNER",COM_ID.OWNER);_defineProperty(UI_ID,"LABEL","label");_defineProperty(UI_ID,"SUBTITLE","subtitle");_defineProperty(UI_ID,"HEADER","header");_defineProperty(UI_ID,"BODY","body");_defineProperty(UI_ID,"FOOTER","footer");_defineProperty(UI_ID,"VIEW","view");_defineProperty(UI_ID,"CONTROLS","controls");_defineProperty(UI_ID,"CSS_CL","csscl");module.exports["default"]=module.exports=UI_ID;},{"@nkmjs/common":27}],208:[function(require,module,exports){'use strict';var UI_SIGNAL=function UI_SIGNAL(){_classCallCheck(this,UI_SIGNAL);};_defineProperty(UI_SIGNAL,"PAINTED",Symbol("painted"));_defineProperty(UI_SIGNAL,"UNPAINTED",Symbol("unpainted"));_defineProperty(UI_SIGNAL,"FIRST_PAINT",Symbol("first-paint"));_defineProperty(UI_SIGNAL,"CHILD_ADDED",Symbol("childAdded"));_defineProperty(UI_SIGNAL,"CHILD_MOVED",Symbol("childMoved"));_defineProperty(UI_SIGNAL,"CHILD_REMOVED",Symbol("childRemoved"));_defineProperty(UI_SIGNAL,"SELECTION_GAIN",Symbol("selectionGain"));_defineProperty(UI_SIGNAL,"SELECTION_LOST",Symbol("selectionLost"));_defineProperty(UI_SIGNAL,"FOCUS_GAIN",Symbol("focusGain"));_defineProperty(UI_SIGNAL,"FOCUS_LOST",Symbol("focusLost"));_defineProperty(UI_SIGNAL,"ACTIVATED",Symbol("activated"));_defineProperty(UI_SIGNAL,"ALT_ACTIVATED",Symbol("altActivated"));_defineProperty(UI_SIGNAL,"TRIGGERED",Symbol("triggered"));_defineProperty(UI_SIGNAL,"DEACTIVATED",Symbol("deactivated"));_defineProperty(UI_SIGNAL,"DATA_CHANGED",Symbol("dataChanged"));_defineProperty(UI_SIGNAL,"DISPLAY_REQUESTED",Symbol("focusRequested"));_defineProperty(UI_SIGNAL,"CLOSE_REQUESTED",Symbol("closeRequested"));_defineProperty(UI_SIGNAL,"EXPANDED",Symbol("expanded"));_defineProperty(UI_SIGNAL,"COLLAPSED",Symbol("collapsed"));_defineProperty(UI_SIGNAL,"DRAG_STARTED",Symbol("dragStarted"));_defineProperty(UI_SIGNAL,"DRAGGED",Symbol("dragged"));_defineProperty(UI_SIGNAL,"DRAG_ENDED",Symbol("dragEnded"));_defineProperty(UI_SIGNAL,"DROPPED",Symbol("dropped"));module.exports["default"]=module.exports=UI_SIGNAL;},{}],209:[function(require,module,exports){'use strict';var _require272=require("@nkmjs/utils"),U=_require272.U,UDOM=_require272.UDOM;var _require273=require("@nkmjs/collections"),List=_require273.List,Dictionary=_require273.Dictionary,DictionaryList=_require273.DictionaryList;var _require274=require("@nkmjs/common"),SingletonEx=_require274.SingletonEx,DelayedCall=_require274.DelayedCall;var UI_SIGNAL=require("./ui-signal");var DisposableHTMLElement=require("./disposable-htmlelement");var UI=/*#__PURE__*/function(_SingletonEx10){_inherits(UI,_SingletonEx10);var _super115=_createSuper(UI);function UI(){_classCallCheck(this,UI);return _super115.call(this);}_createClass(UI,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(UI.prototype),"_Init",this).call(this);this._uiPool=new DictionaryList();this._uiTypes=new Dictionary();this._dirtyElements=new List(0);this._Bind(this._Return);this._delayedUpdate=new DelayedCall(this._Bind(this._UpdateDirty));}},{key:"_Register",value:/**
     * Register custom element
     * @param {string} p_id 
     * @param {DisposableHTMLElement} p_class 
     */function _Register(p_id,p_class){var p_extends=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"div";if(!U.isFunc(p_class)){throw new Error("Register used with invalid constructor : ".concat(p_class));}console.log(p_id);this._uiTypes.Set(p_class,p_id);customElements.define(p_id,p_class);//, { extends: p_extends });
//#LOG console.log(`%c+ ${p_class.name} %c<${p_id}>`, 'color: #9000ff', 'color: #b4b4b4');
}},{key:"_Return",value:// ----> Pooling
/**
     * Return a deprecated DisposableHTMLElement to be re-used later.
     * @param {DisposableHTMLElement} p_displayObject 
     */function _Return(p_displayObject){if(!U.isObject(p_displayObject)||!U.isInstanceOf(p_displayObject,DisposableHTMLElement)){throw new Error("Return used with invalid object : ".concat(p_displayObject));}var key=p_displayObject.constructor;if(!this._uiTypes.Contains(key)){throw new Error("Return used with a never-registered object type : ".concat(key));}this._uiPool.Set(key,p_displayObject);}},{key:"_Rent",value:/**
     * 
     * @param {function} p_class 
     * @param {*} p_parent 
     */function _Rent(p_class){var p_parent=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;if(!this._uiTypes.Contains(p_class)){throw new Error("".concat(p_class," could not be found."));}var obj=this._uiPool.Pop(p_class);if(!obj){obj=new p_class();obj._returnFn=this._Return;}obj.Wake();if(p_parent){p_parent.Add(obj);}return obj;}},{key:"_AddDirty",value:function _AddDirty(p_element){if(this._dirtyElements.Add(p_element)){this._delayedUpdate.Schedule();}}},{key:"_UpdateDirty",value:function _UpdateDirty(p_delta){this._dirtyElements.ForEach(function(p_item,p_index){p_item.ApplyTransforms();});this._dirtyElements.Clear();}// ----> Data drag handling    
}],[{key:"Register",value:function Register(p_id,p_class){var p_extends=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"div";this.instance._Register(p_id,p_class,p_extends);}},{key:"RegisterGroup",value:function RegisterGroup(p_group){for(var member in p_group){this.instance._Register(member,p_group[member]);}}},{key:"Rent",value:function Rent(p_class){var p_parent=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;return this.instance._Rent(p_class,p_parent);}},{key:"AddDirty",value:function AddDirty(p_element){if(!p_element){return;}this.instance._AddDirty(p_element);}},{key:"DRAG_DATA",get:function get(){return this._dragData;},set:function set(p_data){this._dragData=p_data;}},{key:"DRAG_TARGET",get:function get(){return this._dragTarget;},set:function set(p_target){this._dragTarget=p_target;}},{key:"dragLength",get:function get(){return this._dragLength;},set:function set(p_value){this._dragLength=p_value;}},{key:"DragStarted",value:function DragStarted(p_data,p_target){var dLength=0;if(p_data){if(Array.isArray(p_data)){dLength=p_data.length;}}this.dragLength=dLength;this.DRAG_DATA=p_data;this.DRAG_TARGET=p_target;this.instance._Broadcast(UI_SIGNAL.DRAG_STARTED,p_data);}},{key:"DragEnded",value:function DragEnded(){this.instance._Broadcast(UI_SIGNAL.DRAG_ENDED);this.DRAG_DATA=null;this.DRAG_TARGET=null;this.dragLength=0;}}]);return UI;}(SingletonEx);_defineProperty(UI,"_dragLength",0);_defineProperty(UI,"_dragData",null);_defineProperty(UI,"_dragTarget",null);module.exports["default"]=module.exports=UI;},{"./disposable-htmlelement":173,"./ui-signal":208,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/utils":268}],210:[function(require,module,exports){'use strict';var _require275=require("@nkmjs/utils"),U=_require275.U,UDOM=_require275.UDOM;var _require276=require("@nkmjs/common"),NFOS=_require276.NFOS;var _require277=require("@nkmjs/style"),CSS=_require277.CSS;var _require278=require("@nkmjs/collections"),Dictionary=_require278.Dictionary;var UI=require("../ui");var UI_ID=require("../ui-id");var UI_SIGNAL=require("../ui-signal");var UI_FLAG=require("../ui-flag");var DOMTemplate=require("../dom-template");var Toolbar=require("../helpers/toolbar");var TPLHeaderBodyFooter=require("../templates/tpl-header-body-footer");/**
 * DrawerControls are just a glorified toolbar designed to work with a Drawer, 
 * controlling which view should be displayed.
 */var DrawerNav=/*#__PURE__*/function(_Toolbar){_inherits(DrawerNav,_Toolbar);var _super116=_createSuper(DrawerNav);function DrawerNav(){_classCallCheck(this,DrawerNav);return _super116.call(this);}_createClass(DrawerNav,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(DrawerNav.prototype),"_Init",this).call(this);this._isHorizontalScrollEnabled=true;this._handlesMap=new Dictionary();this._currentHandle=null;this._header=null;this._body=null;this._footer=null;this._toolbar=null;}},{key:"currentHandle",get:function get(){return this._currentHandle;}// ----> DOM
},{key:"_Style",value:function _Style(){return CSS.Extends({':host':{//'align-content': `flex-start`,
'display':'grid',//'display': 'flex',
//'justify-content': `flex-start`,
'justify-content':"stretch",'align-items':"stretch"},'.body':{'flex':'1 1 auto','display':'flex','justify-content':"flex-start",'align-items':"stretch"},'.header, .footer':{flex:"0 0 auto"},//Vertical
':host(.vertical)':{'grid-template-rows':'max-content auto max-content'},':host(.vertical) .header':{'grid-row':'1'},':host(.vertical) .footer':{'grid-row':'3'},':host(.vertical) .body':{'grid-row':'2','flex-flow':"column nowrap",'overflow-x':"hidden",'overflow-y':"overlay",'width':'100%','min-height':'0'},//Horizontal
':host(.horizontal)':{'grid-template-columns':'max-content auto max-content'},':host(.horizontal) .header':{'grid-column':'1'},':host(.horizontal) .footer':{'grid-column':'3'},':host(.horizontal) .body':{'grid-column':'2','flex-flow':"row nowrap",'overflow-x':"overlay",'overflow-y':"hidden",'height':'100%','min-width':'0'}},_get(_getPrototypeOf(DrawerNav.prototype),"_Style",this).call(this));}},{key:"_Render",value:function _Render(){DOMTemplate.Render(TPLHeaderBodyFooter,this,_defineProperty({},UI_ID.OWNER,this));this._toolbar=this.Add(Toolbar,"toolbar",this._footer);this._orientation.AddManaged(this._toolbar._orientation);this._toolbar.orientation=this.constructor.__default_orientation;this._sizeEnum.AddManaged(this._toolbar._sizeEnum);this._toolbar.size=this.constructor.__default_size;this._wrapper=this._body;this.focusArea=this;}},{key:"_OnSizeChanged",value:function _OnSizeChanged(p_newValue,p_oldValue){_get(_getPrototypeOf(DrawerNav.prototype),"_OnSizeChanged",this).call(this,p_newValue,p_oldValue);this._toolbar.size=p_newValue;}},{key:"_OnOrientationChanged",value:function _OnOrientationChanged(p_newValue,p_oldValue){_get(_getPrototypeOf(DrawerNav.prototype),"_OnOrientationChanged",this).call(this,p_newValue,p_oldValue);this._orientation.Apply("orientation",this._handles);}// ----> Catalog Items handling
/**
     * 
     * @param {*} p_item 
     * @returns {*} the control associated to the item, otherwise null.
     */},{key:"Get",value:function Get(p_item){return this._handlesMap.Get(p_item);}/**
     * Requests a control from the drawer. Creates one if none already exists for the item
     * provided
     * @param {*} p_item item -- typically a CatalogItem, in the context of a Drawer.
     * @param {*} p_index index at which the control should be created. Not that if the control already exists, it will not be moved.
     * @returns {*} The control associated to the item
     */},{key:"CreateHandle",value:function CreateHandle(p_item){var p_index=arguments.length>1&&arguments[1]!==undefined?arguments[1]:-1;var handle=this._handlesMap.Get(p_item);if(handle){return handle;}handle=_get(_getPrototypeOf(DrawerNav.prototype),"CreateHandle",this).call(this,p_item);this._handlesMap.Set(p_item,handle);handle.data=p_item;handle.Watch(UI_SIGNAL.ACTIVATED,this._OnHandleActivated,this);if("orientation"in handle){handle.orientation=this._orientation.currentFlag;}return handle;}/**
     * Removes the control associated to the item
     * @param {*} p_item 
     * @returns {*} the control associated to the item after it has been released (so references to it can be cleared)
     */},{key:"Remove",value:function Remove(p_item){var handle=this._handlesMap.Get(p_item);if(!handle){return null;}handle.Release();return handle;}},{key:"_OnHandleActivated",value:function _OnHandleActivated(p_handle){this._Broadcast(DrawerNav.HANDLE_ACTIVATED,this,p_handle,this._optionsMap.Get(p_handle));}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){//TODO : Remove existing controls
this._handlesMap.Clear();_get(_getPrototypeOf(DrawerNav.prototype),"_CleanUp",this).call(this);}}]);return DrawerNav;}(Toolbar);_defineProperty(DrawerNav,"__NFO__",NFOS.Ext({css:["@/views/drawer-nav.css"]},Toolbar,['css']));_defineProperty(DrawerNav,"HANDLE_ACTIVATED",Symbol("controlActivated"));_defineProperty(DrawerNav,"__default_orientation",UI_FLAG.VERTICAL);module.exports["default"]=module.exports=DrawerNav;UI.Register('nkmjs-drawer-nav',DrawerNav);},{"../dom-template":174,"../helpers/toolbar":187,"../templates/tpl-header-body-footer":202,"../ui":209,"../ui-flag":206,"../ui-id":207,"../ui-signal":208,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/utils":268}],211:[function(require,module,exports){'use strict';var _require279=require("@nkmjs/utils"),U=_require279.U,UDOM=_require279.UDOM;var _require280=require("@nkmjs/common"),NFOS=_require280.NFOS,SIGNAL=_require280.SIGNAL;var _require281=require("@nkmjs/data-core"),CatalogItem=_require281.CatalogItem;var UI_ID=require("../ui-id");var UI=require("../ui");var UI_SIGNAL=require("../ui-signal");var UI_FLAG=require("../ui-flag");var View=require("./view");var CatalogViewBuilder=require("../helpers/catalog-view-builder");var DrawerNav=require("./drawer-nav");var Drawer=/*#__PURE__*/function(_View){_inherits(Drawer,_View);var _super117=_createSuper(Drawer);function Drawer(){_classCallCheck(this,Drawer);return _super117.call(this);}_createClass(Drawer,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Drawer.prototype),"_Init",this).call(this);this._empty=true;this._placholderViewClass=null;this._placeholderView=null;this._catalogViewBuilder=new CatalogViewBuilder();this._catalogViewBuilder.Watch(SIGNAL.ITEM_ADDED,this._OnCatalogItemAdded,this);this._catalogViewBuilder.Watch(SIGNAL.ITEM_REMOVED,this._OnCatalogItemRemoved,this);this._navClass=DrawerNav;this._nav=null;this._currentHandle=null;this._flags.Add(this,UI_FLAG.FIXED_SIZE);this._isCollapsable=true;}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(Drawer.prototype),"_PostInit",this).call(this);this._nav.Watch(DrawerNav.HANDLE_ACTIVATED,this._OnHandleActivated,this);if(this._placholderViewClass){this._placeholderView=this.Add(this._placholderViewClass,"view");this.currentView=this._placeholderView;}}},{key:"isCollapsable",get:function get(){return this._isCollapsable;},set:function set(p_value){this._isCollapsable=p_value;}// ----> Orientation
},{key:"_OnOrientationChanged",value:function _OnOrientationChanged(p_newValue,p_oldValue){_get(_getPrototypeOf(Drawer.prototype),"_OnOrientationChanged",this).call(this,p_newValue,p_oldValue);this._nav.orientation=p_newValue;}// ----> DOM
},{key:"_Style",value:function _Style(){return{':host':{'display':"grid",'justify-content':"stretch"},'.navigation':{//  'flex': `0 0 auto`
},'.view':{//   'flex': `1 1 auto`,
},// Vertical ( nav on the side )
':host(.vertical)':{'flex-flow':"row nowrap",'grid-template-columns':'max-content auto'},':host(.vertical).navigation':{//'height': `100%`,
'grid-column':'1'},':host(.vertical).view':{//'height': `100%`,
'grid-column':'2','flex-flow':"column nowrap",'overflow-x':"overlay",'overflow-y':"overlay",'width':'100%','min-height':'0'},// Horizontal ( nav on top )
':host(.horizontal)':{'grid-template-rows':'max-content auto'},':host(.horizontal).navigation':{//'width': `100%`
'grid-row':'1'},':host(.horizontal).view':{//'width': `100%`
'grid-row':'2','flex-flow':"row nowrap",'overflow-x':"overlay",'overflow-y':"overlay",'height':'100%','min-width':'0'}};}},{key:"_Render",value:function _Render(){_get(_getPrototypeOf(Drawer.prototype),"_Render",this).call(this);this._nav=this.Add(this._navClass,"navigation");this._orientation.AddManaged(this._nav._orientation);this._nav.orientation=this.constructor.__default_orientation;}// ----> Catalog Management
},{key:"catalog",get:function get(){return this._catalogViewBuilder.catalog;},set:function set(p_value){this._catalogViewBuilder.catalog=p_value;}/**
     * Create a view & a nav item from a catalogItem
     * @param {CatalogViewBuilder} p_builder 
     * @param {data.core.catalog.CatalogItem} p_item 
     */},{key:"_OnCatalogItemAdded",value:function _OnCatalogItemAdded(p_builder,p_item,p_mappedView){var handle=this._nav.CreateHandle(p_item);handle.Watch(UI_SIGNAL.CLOSE_REQUESTED,this._OnHandleCloseRequest,this);p_mappedView.Watch(UI_SIGNAL.DISPLAY_REQUESTED,this._OnViewRequestDisplay,this);p_mappedView.visible=false;p_mappedView.classList.add(UI_ID.VIEW);this.Add(p_mappedView);this._Broadcast(Drawer.VIEW_ADDED,this,p_mappedView,handle);if(this._empty){this._OnDrawerNonEmpty();this._OnViewRequestDisplay(p_mappedView);}return p_mappedView;}/**
     * Remove the view & handle associated with the removed catalogItem
     * @param {CatalogViewBuilder} p_builder 
     * @param {data.core.catalog.CatalogItem} p_item 
     * @param {View} p_mappedView 
     */},{key:"_OnCatalogItemRemoved",value:function _OnCatalogItemRemoved(p_builder,p_item,p_mappedView){var handle=this._nav.Remove(p_item);if(this.currentHandle===handle){this.currentHandle=null;}if(p_mappedView===this.currentView){this.currentView=null;if(this._nav._handles.length===0){this._OnDrawerEmpty();}// TODO : Customize which view is set as default
else{this.currentHandle=this._nav._handles[0];}}}},{key:"_OnHandleActivated",value:function _OnHandleActivated(p_nav,p_handle){var view=this._catalogViewBuilder.Get(p_handle.data);if(!U.isInstanceOf(view,View)){return;}if(this._isCollapsable){if(this._currentView===view){this.currentView=null;return;}}view.RequestDisplay();}},{key:"_OnHandleCloseRequest",value:function _OnHandleCloseRequest(p_handle){//TODO : Find a way to make this behavior more configurable
//TODO : Check if there are change to apply to the open document, yada yada yada (in workspace cell, that is)
var catalogItem=p_handle.data;catalogItem.Release();}// ----> Views Management
},{key:"_OnViewRequestDisplay",value:function _OnViewRequestDisplay(p_view){this.currentView=p_view;}},{key:"_OnDrawerEmpty",value:function _OnDrawerEmpty(){this._empty=true;this._Broadcast(Drawer.EMPTY,this);console.log(this._placeholderView);this.currentView=this._placeholderView;}},{key:"_OnDrawerNonEmpty",value:function _OnDrawerNonEmpty(p_view){this._empty=false;}// ----> Drawer
},{key:"currentHandle",get:function get(){return this._currentHandle;},set:function set(p_value){if(this._currentHandle===p_value){return;}var oldValue=this._currentHandle;this._currentHandle=p_value;if(oldValue){oldValue.Select(false);}if(this._currentHandle){this._currentHandle.Select(true);}this._OnCurrentHandleChanged(oldValue);}},{key:"_OnCurrentHandleChanged",value:function _OnCurrentHandleChanged(p_oldTab){var catalogItem=this._currentHandle?this._currentHandle.data:null,view=this._catalogViewBuilder.Get(catalogItem);if(!view){return;}if(this.currentView!=view){view.RequestDisplay();}}},{key:"currentView",get:function get(){return this._currentView;},set:function set(p_value){if(this._currentView===p_value){return;}var oldValue=this._currentView;this._currentView=p_value;if(oldValue){oldValue.visible=false;}if(this._currentView){this._currentView.visible=true;}this._OnCurrentViewChanged(oldValue);}},{key:"_OnCurrentViewChanged",value:function _OnCurrentViewChanged(p_oldView){if(!this._currentView){this.currentHandle=null;return;}// Retrieve the corresponding handle
var item=this._catalogViewBuilder._reverseMap.get(this._currentView);if(item){this.currentHandle=this._nav.Get(item);}this._currentView.DisplayGranted();}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){// Move the nav back in if it has been taken out
if(this._nav.parentElement!=this._host){UDOM.AttachFirst(this._nav,this._host,false);}this._catalogViewBuilder.catalog=null;_get(_getPrototypeOf(Drawer.prototype),"_CleanUp",this).call(this);}}]);return Drawer;}(View);_defineProperty(Drawer,"__NFO__",NFOS.Ext({css:["@/views/drawer.css"]},View,['css']));_defineProperty(Drawer,"VIEW_ADDED",Symbol("viewCreated"));_defineProperty(Drawer,"EMPTY",Symbol("empty"));_defineProperty(Drawer,"__default_orientation",UI_FLAG.VERTICAL);module.exports["default"]=module.exports=Drawer;UI.Register('nkmjs-drawer',Drawer);},{"../helpers/catalog-view-builder":182,"../ui":209,"../ui-flag":206,"../ui-id":207,"../ui-signal":208,"./drawer-nav":210,"./view":214,"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/utils":268}],212:[function(require,module,exports){'use strict';var _require282=require("@nkmjs/utils"),U=_require282.U;var _require283=require("@nkmjs/style"),CSS=_require283.CSS;var UI=require("../ui");var Layer=require("./layer");var LayerContainer=/*#__PURE__*/function(_Layer){_inherits(LayerContainer,_Layer);var _super118=_createSuper(LayerContainer);function LayerContainer(){_classCallCheck(this,LayerContainer);return _super118.call(this);}// ----> Init
_createClass(LayerContainer,[{key:"_Init",value:function _Init(){this._layerClassName="layer";_get(_getPrototypeOf(LayerContainer.prototype),"_Init",this).call(this);}// ----> DOM
},{key:"_Style",value:function _Style(){var s=CSS.Extends({':host':{//position:`relative`,
}},_get(_getPrototypeOf(LayerContainer.prototype),"_Style",this).call(this));s[".".concat(this._layerClassName)]={'@':["layer"]};return s;}},{key:"_OnChildAdded",value:function _OnChildAdded(p_displayObject,p_index){_get(_getPrototypeOf(LayerContainer.prototype),"_OnChildAdded",this).call(this,p_displayObject,p_index);p_displayObject.classList.add(this._layerClassName);}},{key:"_OnChildRemoved",value:function _OnChildRemoved(p_displayObject,p_index){_get(_getPrototypeOf(LayerContainer.prototype),"_OnChildRemoved",this).call(this,p_displayObject,p_index);p_displayObject.classList.remove(this._layerClassName);}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(LayerContainer.prototype),"_CleanUp",this).call(this);}}]);return LayerContainer;}(Layer);module.exports["default"]=module.exports=LayerContainer;UI.Register("nkmjs-layer-container",LayerContainer);},{"../ui":209,"./layer":213,"@nkmjs/style":155,"@nkmjs/utils":268}],213:[function(require,module,exports){'use strict';var _require284=require("@nkmjs/utils"),U=_require284.U;var UI=require("../ui");var View=require("./view");var Layer=/*#__PURE__*/function(_View2){_inherits(Layer,_View2);var _super119=_createSuper(Layer);function Layer(){_classCallCheck(this,Layer);return _super119.call(this);}// ----> Init
_createClass(Layer,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Layer.prototype),"_Init",this).call(this);}// ----> DOM
},{key:"_Style",value:function _Style(){return{':host':{'@':["layer"],// absolute, 0,0 100% 100% box-sizing border-box
'overflow':'hidden'}};}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(Layer.prototype),"_CleanUp",this).call(this);}}]);return Layer;}(View);module.exports["default"]=module.exports=Layer;UI.Register("nkmjs-layer",Layer);},{"../ui":209,"./view":214,"@nkmjs/utils":268}],214:[function(require,module,exports){'use strict';var _require285=require("@nkmjs/utils"),U=_require285.U;var _require286=require("@nkmjs/collections"),List=_require286.List;var _require287=require("@nkmjs/actions"),CommandBox=_require287.CommandBox;var UI=require("../ui");var UI_SIGNAL=require("../ui-signal");var UI_FLAG=require("../ui-flag");var OrientableWidget=require("../widget-orientable");/**
 * A View is a simple OrientableWidget that can request focus, and includes
 * an internal CommandBox.
 */var View=/*#__PURE__*/function(_OrientableWidget2){_inherits(View,_OrientableWidget2);var _super120=_createSuper(View);function View(){_classCallCheck(this,View);return _super120.call(this);}_createClass(View,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(View.prototype),"_Init",this).call(this);this._commands=new CommandBox(this._Bind(this._OnCmdRegister));}},{key:"RequestDisplay",value:function RequestDisplay(){this._Broadcast(UI_SIGNAL.DISPLAY_REQUESTED,this);//Handle notifications bubbles & warnings the same way.
}/**
     * Callback when RequestDisplay has been handled.
     */},{key:"DisplayGranted",value:function DisplayGranted(){}},{key:"_OnCmdRegister",value:function _OnCmdRegister(p_cmd){}}]);return View;}(OrientableWidget);_defineProperty(View,"__default_iState",null);module.exports["default"]=module.exports=View;UI.Register('nkmjs-view',View);},{"../ui":209,"../ui-flag":206,"../ui-signal":208,"../widget-orientable":216,"@nkmjs/actions":1,"@nkmjs/collections":21,"@nkmjs/utils":268}],215:[function(require,module,exports){'use strict';var _require288=require("@nkmjs/utils"),U=_require288.U;var _require289=require("@nkmjs/common"),COM_ID=_require289.COM_ID,POOL=_require289.POOL,SIGNAL=_require289.SIGNAL,COMMON_FLAG=_require289.COMMON_FLAG,Observer=_require289.Observer;var _require290=require("@nkmjs/data-core"),DATA_SIGNAL=_require290.DATA_SIGNAL,DataBlock=_require290.DataBlock,DataObserver=_require290.DataObserver,CATALOG_SIGNAL=_require290.CATALOG_SIGNAL,CatalogItem=_require290.CatalogItem;var MOUSE=require("./mouse");var UI_FLAG=require("./ui-flag");var Widget=require("./widget");var FlagEnum=require("./helpers/flag-enum");var ExtDrag=require("./extensions/ext-drag");var CatalogWidget=/*#__PURE__*/function(_Widget2){_inherits(CatalogWidget,_Widget2);var _super121=_createSuper(CatalogWidget);function CatalogWidget(){_classCallCheck(this,CatalogWidget);return _super121.call(this);}// ----> Init
_createClass(CatalogWidget,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(CatalogWidget.prototype),"_Init",this).call(this);this._Bind(this._ExecuteCommand);this._dataObserver.Hook(CATALOG_SIGNAL.ITEM_DATA_CHANGED,this._OnItemDataChanged,this);this._itemData=null;this._flavorEnum=new FlagEnum(UI_FLAG.flavors);this._flavorEnum.Add(this);this._interactions.Hook(MOUSE.BTN_LEFT,MOUSE.RELEASE_TWICE,this._Bind(this.AltActivate));this._extDrag=this._interactions.Add(ExtDrag);this._extDrag.grabDataCallback=this._Bind(this._GrabDragData);this._dragActivator=null;this._dragFeedbackHost=this;}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(CatalogWidget.prototype),"_PostInit",this).call(this);this._extDrag.Setup(this,this._dragActivator,this._dragFeedbackHost);}},{key:"_Wake",value:function _Wake(){_get(_getPrototypeOf(CatalogWidget.prototype),"_Wake",this).call(this);this._extDrag.owner=this;}// ----> DOM
/**
     * @param {string}
     */},{key:"flavor",get:/**
     * @returns {string}
     */function get(){return this._flavorEnum.currentFlag;}// ----> DATA    
,set:function set(p_value){this._flavorEnum.Set(p_value);}},{key:"_OnDataChanged",value:function _OnDataChanged(p_oldData){_get(_getPrototypeOf(CatalogWidget.prototype),"_OnDataChanged",this).call(this,p_oldData);this.itemData=this._ExtractItemData(this._data);if(this._data){this._UpdateInfos();}if(this._isFocused){this._BuildCommandHandles();}}},{key:"_OnDataUpdated",value:function _OnDataUpdated(p_data){_get(_getPrototypeOf(CatalogWidget.prototype),"_OnDataUpdated",this).call(this,p_data);if(!this._itemData){this._UpdateInfos();}}},{key:"_OnItemDataChanged",value:function _OnItemDataChanged(p_item,p_newData,p_oldData){this.itemData=this._ExtractItemData(p_newData);}},{key:"_ExtractItemData",value:function _ExtractItemData(p_value){if(!p_value){return null;}if(U.isInstanceOf(p_value,CatalogItem)){return p_value.GetOption(COM_ID.DATA,null);}return null;}},{key:"_HookItemDataSignals",value:function _HookItemDataSignals(p_observer){p_observer.Hook(DATA_SIGNAL.DIRTY,this._OnItemDataDirty,this);p_observer.Hook(DATA_SIGNAL.DIRTY_CLEARED,this._OnItemDataCleaned,this);p_observer.Hook(SIGNAL.UPDATED,this._OnItemDataUpdated,this);}},{key:"itemData",set:function set(p_value){if(this._itemData==p_value){return;}var oldData=this._itemData;this._itemData=p_value;if(oldData){this._itemDataObserver.Flush();}if(this._itemData){if(!this._itemDataObserver){// Create observer
this._itemDataObserver=POOL.Rent(Observer);this._HookItemDataSignals(this._itemDataObserver);}this._itemDataObserver.ObserveOnly(this._itemData);this._OnItemDataUpdated(this._itemData);}else if(this._itemDataObserver){this._itemDataObserver.Release();this._itemDataObserver=null;}}},{key:"_OnItemDataDirty",value:function _OnItemDataDirty(p_data){this._flavorEnum.Set(COMMON_FLAG.WARNING);}},{key:"_OnItemDataCleaned",value:function _OnItemDataCleaned(p_data){this._flavorEnum.Set(null);}},{key:"_OnItemDataUpdated",value:function _OnItemDataUpdated(p_data){this._UpdateInfos();}// ----> Update infos
},{key:"_UpdateInfos",value:function _UpdateInfos(){}// ---->
},{key:"_GrabDragData",value:function _GrabDragData(){return this._data;}},{key:"_FocusGain",value:function _FocusGain(){_get(_getPrototypeOf(CatalogWidget.prototype),"_FocusGain",this).call(this);if(!this._data){return;}this._BuildCommandHandles();//TODO : Check if we're not drag and dropping something first.
if(this._data.primaryCommand){this._data.primaryCommand.context=this;}if(this._data.secondaryCommand){this._data.secondaryCommand.context=this;}}},{key:"_FocusLost",value:function _FocusLost(){_get(_getPrototypeOf(CatalogWidget.prototype),"_FocusLost",this).call(this);if(!this._data){return;}this._ClearCommandHandles();}},{key:"AltActivate",value:function AltActivate(p_evt){if(this._data.primaryCommand){this._data.primaryCommand.Execute();return false;}return true;}// ----> COMMANDS
/**
     * Create command handles in the toolbar
     * according to the content of `this._data.commandList`
     */},{key:"_BuildCommandHandles",value:function _BuildCommandHandles(){this._ClearCommandHandles();if(!this._data){return;}var list=this._data.commandList;if(!list){return;}for(var i=0,n=list.length;i<n;i++){var cmd=list[i];cmd.context=this;this._BuildCommand(cmd);}}},{key:"_BuildCommand",value:function _BuildCommand(p_cmd){}/**
     * Clear any command handles created through `_BuildCommandHandles`
     */},{key:"_ClearCommandHandles",value:function _ClearCommandHandles(){}/**
     * Callback for the command handles when triggered.
     * @param {actions.Command} p_cmd 
     */},{key:"_ExecuteCommand",value:function _ExecuteCommand(p_cmd){p_cmd.emitter=this;p_cmd.Execute(this._data);}}]);return CatalogWidget;}(Widget);module.exports["default"]=module.exports=CatalogWidget;},{"./extensions/ext-drag":176,"./helpers/flag-enum":184,"./mouse":195,"./ui-flag":206,"./widget":217,"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/utils":268}],216:[function(require,module,exports){'use strict';var UI=require("./ui");var UI_FLAG=require("./ui-flag");var FlagEnum=require("./helpers/flag-enum");var Widget=require("./widget");var _require291=require("@nkmjs/utils"),UDOM=_require291.UDOM;var OrientableWidget=/*#__PURE__*/function(_Widget3){_inherits(OrientableWidget,_Widget3);var _super122=_createSuper(OrientableWidget);function OrientableWidget(){_classCallCheck(this,OrientableWidget);return _super122.call(this);}_createClass(OrientableWidget,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(OrientableWidget.prototype),"_Init",this).call(this);this._isHorizontalScrollEnabled=false;this._orientation=new FlagEnum(UI_FLAG.orientations);this._orientation.Add(this);this._orientation.onFlagChanged.Add(this._Bind(this._OnOrientationChanged));this._Bind(this._HorizontalScroll);}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(OrientableWidget.prototype),"_PostInit",this).call(this);this._orientation.Set(this.constructor.__default_orientation);}// ----> Orientation
},{key:"orientation",get:function get(){return this._orientation;},set:function set(p_value){this._orientation.Set(p_value);}},{key:"_OnOrientationChanged",value:function _OnOrientationChanged(p_newValue,p_oldValue){if(this._isHorizontalScrollEnabled){if(this._orientation.currentFlag===UI_FLAG.VERTICAL){this._interactions.wheelFn=null;}else{this._interactions.wheelFn=this._HorizontalScroll;}}}// ----> DOM
},{key:"_HorizontalScroll",value:function _HorizontalScroll(p_evt){if(!UDOM.OverflowsX(this._wrapper)){return;}var delta=Math.sign(p_evt.deltaY);this._wrapper.scrollBy({top:0,// could be negative value
left:delta*50//behavior: 'smooth' 
});p_evt.preventDefault();}},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(OrientableWidget.prototype),"_CleanUp",this).call(this);this._orientation.Set(this.constructor.__default_orientation);}}]);return OrientableWidget;}(Widget);_defineProperty(OrientableWidget,"CONTROL_ACTIVATED",Symbol("controlActivated"));_defineProperty(OrientableWidget,"__default_orientation",UI_FLAG.HORIZONTAL);module.exports["default"]=module.exports=OrientableWidget;},{"./helpers/flag-enum":184,"./ui":209,"./ui-flag":206,"./widget":217,"@nkmjs/utils":268}],217:[function(require,module,exports){'use strict';var _require292=require("@nkmjs/utils"),U=_require292.U;var _require293=require("@nkmjs/common"),SIGNAL=_require293.SIGNAL,Observer=_require293.Observer;var UI=require("./ui");var UI_SIGNAL=require("./ui-signal");var UI_FLAG=require("./ui-flag");var INPUT=require("./input");var MOUSE=require("./mouse");var DisplayObjectContainer=require("./display-object-container");var WidgetSelection=require("./helpers/widget-selection");var FlagEnum=require("./helpers/flag-enum");var ExtMouse=require("./extensions/ext-mouse");var Widget=/*#__PURE__*/function(_DisplayObjectContain2){_inherits(Widget,_DisplayObjectContain2);var _super123=_createSuper(Widget);function Widget(){_classCallCheck(this,Widget);return _super123.call(this);}_createClass(Widget,[{key:"_Init",value:// ----> Init
function _Init(){_get(_getPrototypeOf(Widget.prototype),"_Init",this).call(this);this._data=null;this._notifiesSelectionStack=false;this._isSelectable=true;this._isSelected=false;this._isFocusable=true;this._isFocused=false;this._isHighlighted=false;this._isActivable=true;this._interactions=new ExtMouse();this._interactions.focusFn=this._Bind(this.Focus);this._interactions.Hook(MOUSE.BTN_LEFT,MOUSE.RELEASE,this._Bind(this.Activate));this._focusArea=null;this._dataObserver=new Observer();this._dataObserver.Hook(SIGNAL.UPDATED,this._OnDataUpdated,this);this._flags.Add(this,UI_FLAG.ACTIVATED,UI_FLAG.SELECTED);this._istateEnum=new FlagEnum(UI_FLAG.istates);this._istateEnum.Add(this);this.default_SelectOnActivation=U.Default(this.default_SelectOnActivation,false);this._selectOnActivation=this.default_SelectOnActivation;}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(Widget.prototype),"_PostInit",this).call(this);this._istateEnum.Set(this.constructor.__default_iState);}},{key:"_OnPaintChange",value:function _OnPaintChange(){_get(_getPrototypeOf(Widget.prototype),"_OnPaintChange",this).call(this);this._interactions.enabled=this._isPainted;}},{key:"notifiesSelectionStack",get:function get(){return this._notifiesSelectionStack;},set:function set(p_value){this._notifiesSelectionStack=p_value;}},{key:"htitle",get:function get(){this.getAttribute("title");}// ----> Interactions
,set:function set(p_value){this.setAttribute("title",p_value);}},{key:"focusArea",get:function get(){return this._focusArea;},set:function set(p_value){if(this._focusArea===p_value){return;}this._focusArea=p_value;this._interactions.element=this._focusArea;}// ----> Selection
},{key:"selectOnActivation",get:function get(){return this._selectOnActivation;},set:function set(p_value){this._selectOnActivation=p_value;}},{key:"_InitSelectionStack",value:function _InitSelectionStack(){if(this._selectionStack){return;}var sStack=new WidgetSelection();sStack.Watch(SIGNAL.ITEM_ADDED,this._OnSelectionStackAdd,this);sStack.Watch(SIGNAL.ITEM_REMOVED,this._OnSelectionStackRemove,this);this._selectionStack=sStack;}},{key:"_OnSelectionStackAdd",value:function _OnSelectionStackAdd(p_item){}},{key:"_OnSelectionStackRemove",value:function _OnSelectionStackRemove(p_item){}},{key:"isSelectable",get:function get(){return this._isSelectable;},set:function set(p_value){if(this._isSelectable===p_value){return;}this._isSelectable=p_value;if(!p_value){this.Select(false);}}},{key:"isSelected",get:function get(){return this._isSelected;}},{key:"selectionStack",get:function get(){if(this._selectionStack){return this._selectionStack;}else{if(!this._parent){return null;}else{return this._parent.selectionStack;}}}},{key:"Select",value:function Select(p_toggle){if(!this._isSelectable){return;}if(this._isSelected===p_toggle){return;}this._isSelected=p_toggle;this._flags.Set(UI_FLAG.SELECTED,p_toggle);var sStack=this._notifiesSelectionStack?this._parent?this._parent.selectionStack:null:null;if(p_toggle){this._SelectionGain();this._Broadcast(UI_SIGNAL.SELECTION_GAIN,this);if(sStack){sStack.Add(this);}this._Highlight(true);}else{this._SelectionLost();this._Broadcast(UI_SIGNAL.SELECTION_LOST,this);if(sStack){sStack.Remove(this);}if(!this._isFocused){this._Highlight(false);}}}},{key:"_SelectionGain",value:function _SelectionGain(){}},{key:"_SelectionLost",value:function _SelectionLost(){}// ----> Focus
},{key:"isFocusable",get:function get(){return this._isFocusable;},set:function set(p_value){if(this._isFocusable===p_value){return;}this._isFocusable=p_value;if(!p_value){this.Focus(false);this._istateEnum.Set(UI_FLAG.DISABLED);this.style["pointer-events"]="none";}else{this._istateEnum.Set(UI_FLAG.IDLE);this.style.removeProperty("pointer-events");}}},{key:"isFocused",get:function get(){return this._isFocused;}},{key:"Focus",value:function Focus(p_toggle){if(!this._isFocusable){return;}if(p_toggle&&!this._isFocusable){p_toggle=false;}if(this._isFocused===p_toggle){return;}this._isFocused=p_toggle;if(p_toggle){this._istateEnum.Set(UI_FLAG.FOCUSED);}else{this._istateEnum.Set(UI_FLAG.IDLE);}if(p_toggle){this._FocusGain();this._Highlight(true);}else{this._FocusLost();if(!this._isSelected){this._Highlight(false);}}}},{key:"_FocusGain",value:function _FocusGain(){}},{key:"_FocusLost",value:function _FocusLost(){}// ----> Highlight
/**
     * A widget is highlighted if it is either Focused, Selected, or both.
     * @param {*} p_toggle 
     */},{key:"_Highlight",value:function _Highlight(p_toggle){if(p_toggle){if(this._isHighlighted){return;}this._isHighlighted=p_toggle;this._HighlightGain();}else{if(!this._isHighlighted){return;}this._isHighlighted=p_toggle;this._HighlightLost();}}},{key:"_HighlightGain",value:function _HighlightGain(){}},{key:"_HighlightLost",value:function _HighlightLost(){}// ----> Activation
},{key:"isActivable",get:function get(){return this._isActivable;},set:function set(p_value){if(this._isActivable===p_value){return;}this._isActivable=p_value;}},{key:"Activate",value:function Activate(p_evt){if(!this._isActivable){return false;}this._Broadcast(UI_SIGNAL.ACTIVATED,this,p_evt);if(this._selectOnActivation){if(this._isSelectable){this.Select(INPUT.ctrl?!this._isSelected:true);}}return true;}// ----> DATA
},{key:"data",get:function get(){return this._data;},set:function set(p_value){if('_PreprocessData'in this){p_value=this._PreprocessData(p_value);}if(this._data===p_value){return;}var oldValue=this._data;this._data=p_value;if(oldValue){this._dataObserver.Unobserve(oldValue);}this._OnDataChanged(oldValue);this._PostDataChanged(oldValue);if(p_value){this._dataObserver.Observe(p_value);this._OnDataUpdated(p_value);}this._Broadcast(UI_SIGNAL.DATA_CHANGED,this,p_value,oldValue);}},{key:"_OnDataChanged",value:function _OnDataChanged(p_oldData){}},{key:"_PostDataChanged",value:function _PostDataChanged(p_oldData){}},{key:"_OnDataUpdated",value:function _OnDataUpdated(p_data){}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){this._istateEnum.Set(this.constructor.__default_iState);if(this._selectionStack){this._selectionStack.Clear();}this.data=null;this._selectOnActivation=this.default_SelectOnActivation;this.removeAttribute("title");if(this._mouseOver){this._mOut(null);if(this._mouseDown){this._mUp(null);}}else if(this._mouseDown){this._mUpOutside(null);}this.Select(false);this.Focus(false);_get(_getPrototypeOf(Widget.prototype),"_CleanUp",this).call(this);}},{key:"toString",value:function toString(){if(!this._data){return"<".concat(this.constructor.name,"|").concat(this._uinc,">");}else{return"<".concat(this.constructor.name,"|").concat(this._uinc,":{").concat(this._data,"}>");}}}]);return Widget;}(DisplayObjectContainer);_defineProperty(Widget,"__NFO__",{css:["@/common.css"]});_defineProperty(Widget,"__usePaintCallback",true);_defineProperty(Widget,"__default_iState",UI_FLAG.IDLE);module.exports["default"]=module.exports=Widget;},{"./display-object-container":171,"./extensions/ext-mouse":180,"./helpers/flag-enum":184,"./helpers/widget-selection":188,"./input":189,"./mouse":195,"./ui":209,"./ui-flag":206,"./ui-signal":208,"@nkmjs/common":27,"@nkmjs/utils":268}],218:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={INPUT_SIGNAL:require("./lib/input-signal"),InputBase:require("./lib/input-base"),InputField:require("./lib/input-field"),InputFormHandler:require("./lib/input-form-handler"),InputGroup:require("./lib/input-group"),// Inputs
InputText:require("./lib/inputs/input-text"),InputIdentifier:require("./lib/inputs/input-identifier"),InputTextarea:require("./lib/inputs/input-textarea"),InputBoolean:require("./lib/inputs/input-boolean"),InputNumber:require("./lib/inputs/input-number"),InputColor:require("./lib/inputs/input-color"),InputPath:require("./lib/inputs/input-path"),InputFile:require("./lib/inputs/input-file"),InputDirectory:require("./lib/inputs/input-directory"),InputList:require("./lib/inputs/input-list")};},{"./lib/input-base":219,"./lib/input-field":220,"./lib/input-form-handler":221,"./lib/input-group":222,"./lib/input-signal":223,"./lib/inputs/input-boolean":224,"./lib/inputs/input-color":225,"./lib/inputs/input-directory":226,"./lib/inputs/input-file":227,"./lib/inputs/input-identifier":228,"./lib/inputs/input-list":229,"./lib/inputs/input-number":230,"./lib/inputs/input-path":231,"./lib/inputs/input-text":232,"./lib/inputs/input-textarea":233}],219:[function(require,module,exports){/**
 * Input are abstract data manipulator.
 * They don't know what they are manipulating, or why.
 */var _require294=require("@nkmjs/utils"),U=_require294.U;var _require295=require("@nkmjs/common"),NFOS=_require295.NFOS,COMMON_FLAG=_require295.COMMON_FLAG;var _require296=require("@nkmjs/ui-core"),UI=_require296.UI,UI_FLAG=_require296.UI_FLAG,Widget=_require296.Widget,FlagEnum=_require296.FlagEnum;var INPUT_SIGNAL=require("./input-signal");var BaseInput=/*#__PURE__*/function(_Widget4){_inherits(BaseInput,_Widget4);var _super124=_createSuper(BaseInput);function BaseInput(){_classCallCheck(this,BaseInput);return _super124.call(this);}_createClass(BaseInput,[{key:"_Init",value:// ----> Init
function _Init(){_get(_getPrototypeOf(BaseInput.prototype),"_Init",this).call(this);this._currentValue=null;this._changedValue=null;this._invalidInput=false;this._inputErrors=new Array(0);this._externalValidationStack=new Array(0);this._externalSanitizationStack=new Array(0);this._errorFeedbacks=new Array(0);this._updatePreviewOnChange=true;this._submitOnChange=true;this._inputId="";this._sizeEnum=new FlagEnum(UI_FLAG.sizes);this._sizeEnum.Add(this);this._flavorEnum=new FlagEnum(UI_FLAG.flavors);this._flavorEnum.Add(this);}},{key:"size",get:function get(){return this._sizeEnum.currentFlag;}// ----> Current value
/**
     * @type {boolean}
     */,set:function set(p_value){this._sizeEnum.Set(p_value);}},{key:"submitOnChange",get:function get(){return this._submitOnChange;},set:function set(p_value){this._submitOnChange=p_value;}/**
     * @type {*}
     */},{key:"currentValue",get:function get(){return this._currentValue;},set:function set(p_value){if(this._currentValue===p_value){this.changedValue=p_value;return;}var oldValue=this._currentValue;this._currentValue=p_value;this._changedValue=p_value;//Setting current value override the edited value.
this._OnCurrentValueChanged(oldValue);}/**
     * @type {boolean}
     */},{key:"invalidInput",get:function get(){return this._invalidInput;}/**
     * @type {string}
     */},{key:"inputId",get:function get(){return this._inputId;},set:function set(p_value){this._inputId=p_value;}/**
     * @access protected
     * @param {*} p_oldValue 
     */},{key:"_OnCurrentValueChanged",value:function _OnCurrentValueChanged(p_oldValue){this._UpdatePreview();}// ----> Edited value
/**
     * @type {*}
     */},{key:"changedValue",get:function get(){return this._changedValue;},set:function set(p_value){if(this._changedValue===p_value){return;}var oldValue=this._changedValue;this._changedValue=p_value;this._OnValueChanged(oldValue);}/**
     * @access protected
     * @param {*} p_oldValue 
     */},{key:"_OnValueChanged",value:function _OnValueChanged(p_oldValue){this._internalValidateChangedValue();this._Broadcast(INPUT_SIGNAL.VALUE_CHANGED,this,this._changedValue);if(this._updatePreviewOnChange){this._UpdatePreview();}if(this._submitOnChange){this.SubmitValue();}}/**
     * @access protected
     */},{key:"_IsValueChanged",value:function _IsValueChanged(){return this._currentValue!=this._changedValue;}/**
     * @access protected
     */},{key:"_SelectionLost",value:function _SelectionLost(){_get(_getPrototypeOf(BaseInput.prototype),"_SelectionLost",this).call(this);this.SubmitValue();//Auto-commit on selection lost
this.SoftReset();}/**
     * @access protected
     * @param {*} p_value 
     */},{key:"_SanitizeValue",value:function _SanitizeValue(p_value){//Check external validation callbacks
var check=null;for(var i=0,n=this._externalSanitizationStack.length;i<n;i++){check=this._externalSanitizationStack[i];p_value=check.fn.call(check.thisArg,p_value);}return p_value;}/**
     * @access protected
     * @param {*} p_value 
     */},{key:"_ValidateChangedValue",value:function _ValidateChangedValue(p_value){}/**
     * @access protected
     */},{key:"_ClearErrors",value:function _ClearErrors(){this._ClearFeedbacks();this._invalidInput=false;this._inputErrors.length=0;}/**
     * Validate whether the current 'changedValue' is valid or not
     * and generate an error report in the form { type:'', message:'' }
     * Make your life easier : store preset messages.
     * @access protected
     */},{key:"_internalValidateChangedValue",value:function _internalValidateChangedValue(){this._ClearErrors();this._ValidateChangedValue(this._changedValue);//Check external validation callbacks
for(var i=0,n=this._externalValidationStack.length;i<n;i++){var check=this._externalValidationStack[i],result=check.fn.call(check.thisArg,this._changedValue);if(result){this._PushError(result);}}this._invalidInput=this._inputErrors.length>0;if(this._invalidInput){this._internalOnInputError();}return!this._invalidInput;}/**
     * Add a sanitization callback
     * @param {*} p_fn 
     * @param {*} p_thisArg 
     */},{key:"AddSanitization",value:function AddSanitization(p_fn){var p_thisArg=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var item=null;if(U.isObject(p_fn)){item=p_fn;}else{item={fn:p_fn,thisArg:p_thisArg};}this._externalSanitizationStack.push(item);}/**
     * Add a validation callback
     * @param {*} p_fn 
     * @param {*} p_thisArg 
     */},{key:"AddValidation",value:function AddValidation(p_fn){var p_thisArg=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var item=null;if(U.isObject(p_fn)){item=p_fn;}else{item={fn:p_fn,thisArg:p_thisArg};}this._externalValidationStack.push(item);}/**
     * @access protected
     * @param {*} p_err 
     */},{key:"_PushError",value:function _PushError(p_err){if(U.isString(p_err)){p_err={type:COMMON_FLAG.ERROR,message:p_err};}if(this._inputErrors.includes(p_err)){return;}this._inputErrors.push(p_err);this._invalidInput=true;}/**
     * @access protected
     */},{key:"_internalOnInputError",value:function _internalOnInputError(){this._OnInputErrors();this._Broadcast(INPUT_SIGNAL.INPUT_ERROR,this,this._inputErrors);}/**
     * @access protected
     */},{key:"_OnInputErrors",value:function _OnInputErrors(){for(var i=0,n=this._inputErrors.length;i<n;i++){var err=this._inputErrors[i],feedback=this._AddFeedback(err);this._flavorEnum.Bump(err.type);if(feedback){this._errorFeedbacks.push(feedback);}}}/**
     * @access protected
     */},{key:"_UpdatePreview",value:function _UpdatePreview(){}/**
     * @access protected
     * @param {*} p_err 
     */},{key:"_AddFeedback",value:function _AddFeedback(p_err){return null;}/**
     * Concat all error messages associated with a given flag.
     * @access protected
     * @param {*} p_flag
     * @returns {string} 
     */},{key:"_ConcatErrors",value:function _ConcatErrors(p_flag){var p_break=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'<br/>';var str="";for(var i=0,n=this._inputErrors.length,nMinus=n-1;i<n;i++){var obj=this._inputErrors[i];if(obj.type!=p_flag){continue;}str+=obj.message;if(i!=nMinus){str+=p_break;}}return str;}/**
     * @access protected
     */},{key:"_ClearFeedbacks",value:function _ClearFeedbacks(){this._flavorEnum.Set(null);for(var i=0,n=this._errorFeedbacks.length;i<n;i++){this._errorFeedbacks[i].Release();}this._errorFeedbacks.length=0;}// ----> Submit
/**
     * 
     */},{key:"SubmitValue",value:function SubmitValue(){// Silently sanitize value right before submit
// This way it does not intrudes with user input while input happens
this.changedValue=this._SanitizeValue(this._changedValue);// Ignore submit if value is left unchanged
if(!this._IsValueChanged()){return;}if(!this._internalValidateChangedValue()){this.changedValue=this._currentValue;return;}this._Broadcast(INPUT_SIGNAL.VALUE_SUBMITTED,this,this._changedValue);this._UpdatePreview();}// ----> Soft reset input
/**
     * Soft reset input : revert input value back to the stored one, clears feedbacks etc.
     */},{key:"SoftReset",value:function SoftReset(){this.changedValue=this.currentValue;this._ClearErrors();this._UpdatePreview();}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(BaseInput.prototype),"_CleanUp",this).call(this);this._flavorEnum.Set(null);this._ClearErrors();this._externalValidationStack.length=0;this._inputId="";this._currentValue=null;this._changedValue=null;}}]);return BaseInput;}(Widget);_defineProperty(BaseInput,"__NFO__",NFOS.Ext({css:["@/inputs/shared.css"]},Widget,['css']));module.exports["default"]=module.exports=BaseInput;//UI.Register(`nkmjs-input-base`, BaseInput);
},{"./input-signal":223,"@nkmjs/common":27,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],220:[function(require,module,exports){//implement this : https://javascript.info/events-change-input
var _require297=require("@nkmjs/utils"),U=_require297.U,UDOM=_require297.UDOM,C=_require297.C,PATH=_require297.PATH;var _require298=require("@nkmjs/common"),NFOS=_require298.NFOS,COMMON_FLAG=_require298.COMMON_FLAG;var _require299=require("@nkmjs/style"),CSS=_require299.CSS;var _require300=require("@nkmjs/ui-core"),UI=_require300.UI,INPUT=_require300.INPUT,KEYBOARD=_require300.KEYBOARD;var INPUT_SIGNAL=require("./input-signal");var InputBase=require("./input-base");var InputField=/*#__PURE__*/function(_InputBase){_inherits(InputField,_InputBase);var _super125=_createSuper(InputField);function InputField(){_classCallCheck(this,InputField);return _super125.call(this);}_createClass(InputField,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(InputField.prototype),"_Init",this).call(this);this._inputField=null;this._Bind(this._onInput);this._Bind(this._onChange);this._Bind(this._onFocusIn);this._Bind(this._onFocusOut);this._Bind(this._FOut);this._Bind(this._FIn);}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(InputField.prototype),"_PostInit",this).call(this);this._inputField.addEventListener('focus',this._onFocusIn);this._inputField.addEventListener('focusout',this._onFocusOut);this._inputField.addEventListener("input",this._onInput);this._inputField.addEventListener("change",this._onChange);}// ----> DOM
},{key:"_Style",value:function _Style(){return CSS.Extends({':host':{position:"relative",display:"flex",'align-content':"stretch",'align-items':"stretch"},'.field':{flex:"1 1 auto",'min-width':0}},_get(_getPrototypeOf(InputField.prototype),"_Style",this).call(this));}},{key:"_Render",value:function _Render(){this._inputField=UDOM.New("input",{"class":'field'},this._host);//, type:'search'
}},{key:"placeholderValue",set:function set(p_value){this._inputField.setAttribute("placeholder",p_value);}},{key:"_onInput",value:function _onInput(p_evt){this.changedValue=this._GrabValue();}},{key:"_onChange",value:function _onChange(p_evt){this.changedValue=this._GrabValue();}},{key:"_GrabValue",value:function _GrabValue(){return this._inputField.value;}},{key:"_FIn",value:function _FIn(){this._inputField.focus();}},{key:"_FOut",value:function _FOut(p_evt){if(INPUT.shift){return;}if(p_evt){p_evt.preventDefault();}this._inputField.blur();}},{key:"_onFocusIn",value:function _onFocusIn(p_evt){INPUT.ONKeyDown(KEYBOARD._enter,this._FOut);}},{key:"_onFocusOut",value:function _onFocusOut(p_evt){INPUT.OFFKeyDown(KEYBOARD._enter,this._FOut);this.SubmitValue();//this.SoftReset();
}},{key:"_UpdatePreview",value:function _UpdatePreview(){this._inputField.value=this._currentValue;}}]);return InputField;}(InputBase);_defineProperty(InputField,"__NFO__",NFOS.Ext({css:["@/inputs/field.css"]},InputBase,['css']));module.exports["default"]=module.exports=InputField;UI.Register("nkmjs-input-field",InputField);},{"./input-base":219,"./input-signal":223,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],221:[function(require,module,exports){/**
 * For manipulating a group of input as a single input.
 * Abstract handler.
 */var _require301=require("@nkmjs/utils"),U=_require301.U;var _require302=require("@nkmjs/common"),DisposableObjectEx=_require302.DisposableObjectEx;var _require303=require("@nkmjs/collections"),Dictionary=_require303.Dictionary,List=_require303.List;var INPUT_SIGNAL=require("./input-signal");var InputBase=require("./input-base");var InputFormHandler=/*#__PURE__*/function(_DisposableObjectEx25){_inherits(InputFormHandler,_DisposableObjectEx25);var _super126=_createSuper(InputFormHandler);function InputFormHandler(){_classCallCheck(this,InputFormHandler);return _super126.call(this);}_createClass(InputFormHandler,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(InputFormHandler.prototype),"_Init",this).call(this);this._inputList=new List();this._inputValues={};this._errorCount=0;this._invalidForm=false;}},{key:"inputValues",get:function get(){return this._inputValues;}},{key:"invalidForm",get:function get(){return this._invalidForm;}},{key:"Register",value:function Register(p_input){if(!U.isInstanceOf(p_input,InputBase)){throw new Error("InputFormHandler cannot register non-input items.");}if(!this._inputList.Add(p_input)){return;}this._inputValues[p_input.inputId]=p_input.currentValue;p_input._internalValidateChangedValue();if(p_input.invalidInput){this._invalidForm=true;this._Broadcast(INPUT_SIGNAL.FORM_INVALID,this);}else if(!this._invalidForm){this._Broadcast(INPUT_SIGNAL.FORM_READY,this);}p_input.Watch(INPUT_SIGNAL.VALUE_SUBMITTED,this._OnInputSubmit,this);p_input.Watch(INPUT_SIGNAL.VALUE_CHANGED,this._OnInputChanged,this);p_input.Watch(INPUT_SIGNAL.INPUT_ERROR,this._OnInputError,this);}},{key:"Unregister",value:function Unregister(p_input){if(!this._inputList.Remove(p_input)){return;}delete this._inputValues[p_input.inputId];p_input.Unwatch(INPUT_SIGNAL.VALUE_SUBMITTED,this._OnInputSubmit,this);p_input.Unwatch(INPUT_SIGNAL.VALUE_CHANGED,this._OnInputChanged,this);p_input.Unwatch(INPUT_SIGNAL.INPUT_ERROR,this._OnInputError,this);}},{key:"ValidateForm",value:function ValidateForm(){var was=this._invalidForm;this._invalidForm=false;this._errorCount=0;this._inputList.ForEach(this._CheckInput,this);if(this._invalidForm!=was){if(this._invalidForm){// Form is now invalid
this._Broadcast(INPUT_SIGNAL.FORM_INVALID,this);}else{// For is now valid
this._Broadcast(INPUT_SIGNAL.FORM_READY,this);}}return this._invalidForm;}},{key:"_CheckInput",value:function _CheckInput(p_input){if(p_input.invalidInput){this._invalidForm=true;this._errorCount+=p_input._inputErrors.length;}}},{key:"Clear",value:function Clear(){for(var i=0,n=this._inputList.count;i<n;i++){this.Unregister(this._inputList.last);}}},{key:"_OnInputSubmit",value:function _OnInputSubmit(p_input,p_newValue){this.ValidateForm();this._inputValues[p_input.inputId]=p_newValue;}},{key:"_OnInputChanged",value:function _OnInputChanged(p_input,p_newValue){this.ValidateForm();this._inputValues[p_input.inputId]=p_newValue;}},{key:"_OnInputError",value:function _OnInputError(p_input,p_errors){this.ValidateForm();}}]);return InputFormHandler;}(DisposableObjectEx);module.exports["default"]=module.exports=InputFormHandler;},{"./input-base":219,"./input-signal":223,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/utils":268}],222:[function(require,module,exports){'use struct';var _require304=require("@nkmjs/ui-core"),UI=_require304.UI;var InputBase=require("./input-base");/**
 * For manipulating multi-dimensional values (i.e a curve with handles)
 */var InputGroup=/*#__PURE__*/function(_InputBase2){_inherits(InputGroup,_InputBase2);var _super127=_createSuper(InputGroup);function InputGroup(){_classCallCheck(this,InputGroup);return _super127.call(this);}return InputGroup;}(InputBase);module.exports["default"]=module.exports=InputGroup;UI.Register("nkmjs-input-group",InputGroup);},{"./input-base":219,"@nkmjs/ui-core":166}],223:[function(require,module,exports){'use strict';var INPUT_SIGNAL=function INPUT_SIGNAL(){_classCallCheck(this,INPUT_SIGNAL);};_defineProperty(INPUT_SIGNAL,"VALUE_CHANGED",Symbol("valueChanged"));_defineProperty(INPUT_SIGNAL,"VALUE_SUBMITTED",Symbol("valueCommitted"));_defineProperty(INPUT_SIGNAL,"INPUT_ERROR",Symbol("inputError"));_defineProperty(INPUT_SIGNAL,"FORM_READY",Symbol("formReady"));_defineProperty(INPUT_SIGNAL,"FORM_INVALID",Symbol("formInvalid"));module.exports["default"]=module.exports=INPUT_SIGNAL;},{}],224:[function(require,module,exports){'use strict';var _require305=require("@nkmjs/utils"),U=_require305.U,UDOM=_require305.UDOM;var _require306=require("@nkmjs/common"),NFOS=_require306.NFOS;var _require307=require("@nkmjs/style"),CSS=_require307.CSS;var _require308=require("@nkmjs/ui-core"),UI=_require308.UI,TextManipulator=_require308.TextManipulator;var InputField=require("../input-field");var _flag_CHECKED="checked";var InputBoolean=/*#__PURE__*/function(_InputField){_inherits(InputBoolean,_InputField);var _super128=_createSuper(InputBoolean);function InputBoolean(){_classCallCheck(this,InputBoolean);return _super128.call(this);}_createClass(InputBoolean,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(InputBoolean.prototype),"_Init",this).call(this);this._flags.Add(this,_flag_CHECKED);this._label=null;}// ----> DOM
},{key:"label",get:function get(){return this._label;},set:function set(p_value){this._label.Set(p_value);}},{key:"_Style",value:function _Style(){return CSS.Extends({'.field':{'@':["invisible-fill"]}},_get(_getPrototypeOf(InputBoolean.prototype),"_Style",this).call(this));}},{key:"_Render",value:function _Render(){this._label=new TextManipulator(UDOM.New("span",{"class":"label"},this._host));var body=UDOM.New("div",{"class":"body"},this._host);this._handle=UDOM.New("div",{"class":"handle"},body);this._inputField=UDOM.New("input",{"class":'field',type:'checkbox'},this._host);}},{key:"_GrabValue",value:function _GrabValue(){return this._inputField.checked;}},{key:"_UpdatePreview",value:function _UpdatePreview(){this._inputField.checked=this._changedValue;this._flags.Set(_flag_CHECKED,this._changedValue);}}]);return InputBoolean;}(InputField);_defineProperty(InputBoolean,"__NFO__",NFOS.Ext({css:["@/inputs/boolean.css"]},InputField,['css']));module.exports["default"]=module.exports=InputBoolean;UI.Register("nkmjs-input-boolean",InputBoolean);},{"../input-field":220,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],225:[function(require,module,exports){'use strict';var _require309=require("@nkmjs/utils"),U=_require309.U,UDOM=_require309.UDOM;var _require310=require("@nkmjs/common"),NFOS=_require310.NFOS;var _require311=require("@nkmjs/style"),CSS=_require311.CSS;var _require312=require("@nkmjs/ui-core"),UI=_require312.UI,TextManipulator=_require312.TextManipulator;var InputField=require("../input-field");var InputColor=/*#__PURE__*/function(_InputField2){_inherits(InputColor,_InputField2);var _super129=_createSuper(InputColor);function InputColor(){_classCallCheck(this,InputColor);return _super129.call(this);}_createClass(InputColor,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(InputColor.prototype),"_Init",this).call(this);this._label=null;this._body=null;}// ----> DOM
},{key:"label",get:function get(){return this._label;},set:function set(p_value){this._label.Set(p_value);}},{key:"_Style",value:function _Style(){return CSS.Extends({'.field':{'@':["invisible-fill"]}},_get(_getPrototypeOf(InputColor.prototype),"_Style",this).call(this));}},{key:"_Render",value:function _Render(){this._label=new TextManipulator(UDOM.New("span",{"class":"label"},this._host));this._inputField=UDOM.New("input",{"class":'field',type:'color'},this._host);this._body=UDOM.New("div",{"class":'body'},this._host);}},{key:"_UpdatePreview",value:function _UpdatePreview(){_get(_getPrototypeOf(InputColor.prototype),"_UpdatePreview",this).call(this);this._body.style['background-color']=this._changedValue;}}]);return InputColor;}(InputField);_defineProperty(InputColor,"__NFO__",NFOS.Ext({css:["@/inputs/color.css"]},InputField,['css']));module.exports["default"]=module.exports=InputColor;UI.Register("nkmjs-input-color",InputColor);},{"../input-field":220,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],226:[function(require,module,exports){'use strict';var _require313=require("@nkmjs/utils"),U=_require313.U,UDOM=_require313.UDOM;var _require314=require("@nkmjs/ui-core"),UI=_require314.UI;var InputFile=require("./input-file");var InputDirectory=/*#__PURE__*/function(_InputFile){_inherits(InputDirectory,_InputFile);var _super130=_createSuper(InputDirectory);function InputDirectory(){_classCallCheck(this,InputDirectory);return _super130.call(this);}_createClass(InputDirectory,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(InputDirectory.prototype),"_Init",this).call(this);this._openType='openDirectory';}}]);return InputDirectory;}(InputFile);module.exports["default"]=module.exports=InputDirectory;UI.Register("nkmjs-input-directory",InputDirectory);},{"./input-file":227,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],227:[function(require,module,exports){'use strict';var _require315=require("@nkmjs/utils"),U=_require315.U,UDOM=_require315.UDOM;var _require316=require("@nkmjs/common"),COM_ID=_require316.COM_ID;var _require317=require("@nkmjs/actions"),RELAY=_require317.RELAY;var _require318=require("@nkmjs/environment"),ENV=_require318.ENV;var _require319=require('@nkmjs/style'),CSS=_require319.CSS;var _require320=require("@nkmjs/ui-core"),UI=_require320.UI,ToolButton=_require320.ToolButton,UI_FLAG=_require320.UI_FLAG;var InputPath=require("./input-path");var InputFile=/*#__PURE__*/function(_InputPath){_inherits(InputFile,_InputPath);var _super131=_createSuper(InputFile);function InputFile(){_classCallCheck(this,InputFile);return _super131.call(this);}_createClass(InputFile,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(InputFile.prototype),"_Init",this).call(this);this._Bind(this._onPickerChange);this._Bind(this._Picked);// TODO : Handle web-based pick !
// TODO : Add support for drag'n drop
this._openType='openFile';this._picker=null;}// ----> DOM
},{key:"_Style",value:function _Style(){return CSS.Extends({'.input-btn':{flex:"1 1 auto"}},_get(_getPrototypeOf(InputFile.prototype),"_Style",this).call(this));/*
        //This is for the default file picker
        return CSS.Extends({
            '.input-btn':{
                flex:`1 0 30px`,
                'max-width':`30px`
            },
            '.input-btn::-webkit-file-upload-button': {
                visibility: `hidden`
            },
            '.input-btn::before': {
                content: '"..."',
                'box-sizing':`border-box`, 
                display: `inline-block`,
                'border-radius': `3px`,
                padding: `5px 10px`,
                outline: `none`,
                'white-space': `nowrap`,
                '-webkit-user-select': `none`,
                cursor: `pointer`,
                'height':`100%`,
                'width':`30px`,
                'background-color':this.GEC(UI.elBG, UI.sIDLE)
            },
            '.input-btn:hover::before':{
                'background-color':this.GEC(UI.elBG, UI.sFOCUS)
            },
            '.input-btn:active::before':{
                'background-color':this.GEC(UI.elBG, UI.sSELECT)
            }
        }, super._Style());
        */}},{key:"_Render",value:function _Render(){_get(_getPrototypeOf(InputFile.prototype),"_Render",this).call(this);if(ENV.FEATURES.isNodeEnabled){var _this$_picker$options;this._picker=this.Add(ToolButton,"input-btn");this._picker.options=(_this$_picker$options={},_defineProperty(_this$_picker$options,COM_ID.ICON,"%ICON%/icon_more.svg"),_defineProperty(_this$_picker$options,"trigger",{fn:this._Pick,thisArg:this}),_defineProperty(_this$_picker$options,"variant",UI_FLAG.FRAME),_this$_picker$options);this._sizeEnum.Add(this._picker);}else{this._picker=UDOM.New("input",{"class":'input-btn',type:'file'},this._host);this._picker.addEventListener("change",this._onPickerChange);}/*
        this._picker = UDOM.New(`input`, {class:'input-btn', type:'file'}, this._host);
        this._picker.addEventListener(`change`, this._onPickerChange );
        */}},{key:"_Pick",value:function _Pick(){if(ENV.FEATURES.isNodeEnabled){RELAY.ShowOpenDialog({defaultPath:this._currentValue?this._currentValue:"",properties:[this._openType]}).then(this._Picked);}}},{key:"_Picked",value:function _Picked(p_value){var val=p_value.filePaths[0];if(val===undefined){return;}this.changedValue=p_value.filePaths[0];}},{key:"_onPickerChange",value:function _onPickerChange(p_evt){console.log(this._picker.value);console.log(p_evt);}}]);return InputFile;}(InputPath);module.exports["default"]=module.exports=InputFile;UI.Register("nkmjs-input-file",InputFile);},{"./input-path":231,"@nkmjs/actions":1,"@nkmjs/common":27,"@nkmjs/environment":92,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],228:[function(require,module,exports){'use strict';var _require321=require("@nkmjs/utils"),U=_require321.U,UDOM=_require321.UDOM;var _require322=require("@nkmjs/common"),COMMON_FLAG=_require322.COMMON_FLAG;var _require323=require("@nkmjs/ui-core"),UI=_require323.UI,ImageManipulator=_require323.ImageManipulator;var InputField=require("../input-field");var _require324=require("@nkmjs/style"),CSS=_require324.CSS;var ERR_SPACE={type:COMMON_FLAG.ERROR,message:"No space allowed."};var ERR_NUM={type:COMMON_FLAG.ERROR,message:"Must starts with <strong>A-Z, a-z</strong> or <strong>_</strong>"};var ERR_EMPTY={type:COMMON_FLAG.ERROR,message:"Cannot be empty"};var ERR_ILLEGAL_CHARS={type:COMMON_FLAG.ERROR,message:"Can only contains the following characters : <strong>A-Z, a-z, _, 0-9</strong>"};var InputIdentifier=/*#__PURE__*/function(_InputField3){_inherits(InputIdentifier,_InputField3);var _super132=_createSuper(InputIdentifier);function InputIdentifier(){_classCallCheck(this,InputIdentifier);return _super132.call(this);}_createClass(InputIdentifier,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(InputIdentifier.prototype),"_Init",this).call(this);this._issues=new Array(0);this._updatePreviewOnChange=false;this._submitOnChange=false;this._label=null;}// ----> DOM
},{key:"label",get:function get(){return this._label;},set:function set(p_value){this._label.Set(p_value);}},{key:"_Style",value:function _Style(){return CSS.Extends({':host':{display:"flex",'flex-flow':"column nowrap",'align-items':"stretch",'align-content':"stretch"},'.field':{flex:"1 1 auto",width:"auto"}},_get(_getPrototypeOf(InputIdentifier.prototype),"_Style",this).call(this));}},{key:"_Render",value:function _Render(){this._inputField=UDOM.New("input",{"class":'field',type:'search'});this._label=new ImageManipulator(UDOM.New("p",{"class":'error'},this));}},{key:"_OnInputErrors",value:function _OnInputErrors(){_get(_getPrototypeOf(InputIdentifier.prototype),"_OnInputErrors",this).call(this);this._label.Set(this._ConcatErrors(COMMON_FLAG.ERROR,'<br/>'));}},{key:"_ClearFeedbacks",value:function _ClearFeedbacks(){_get(_getPrototypeOf(InputIdentifier.prototype),"_ClearFeedbacks",this).call(this);this._label.Set(null);}},{key:"_ValidateChangedValue",value:function _ValidateChangedValue(p_value){_get(_getPrototypeOf(InputIdentifier.prototype),"_ValidateChangedValue",this).call(this,p_value);var e=false;if(!U.ValidIdentifier(p_value)){if(U.Empty(p_value)){this._PushError(ERR_EMPTY);}else{if(U.StartWithNumber(p_value)){this._PushError(ERR_NUM);e=true;}if(U.ContainsAnySpace(p_value)){this._PushError(ERR_SPACE);e=true;}if(!e){//If none of the above, assume illegal chars.
this._PushError(ERR_ILLEGAL_CHARS);}}}}}]);return InputIdentifier;}(InputField);module.exports["default"]=module.exports=InputIdentifier;UI.Register("nkmjs-input-identifier",InputIdentifier);},{"../input-field":220,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],229:[function(require,module,exports){/**
 * Select a choice amongst a list of available options.
 * Actually this is merely a popup trigger and data forwarder.
 * Leverage tree item browser or create a browser that only display one folder at a time with a breadcrum
 */'use strict';var _require325=require("@nkmjs/utils"),U=_require325.U,UDOM=_require325.UDOM;var _require326=require("@nkmjs/common"),COMMON_FLAG=_require326.COMMON_FLAG;var _require327=require("@nkmjs/ui-core"),UI=_require327.UI;var InputBase=require("../input-base");var _require328=require("@nkmjs/style"),CSS=_require328.CSS;var InputList=/*#__PURE__*/function(_InputBase3){_inherits(InputList,_InputBase3);var _super133=_createSuper(InputList);function InputList(){_classCallCheck(this,InputList);return _super133.call(this);}_createClass(InputList,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(InputList.prototype),"_Init",this).call(this);}// ----> DOM
},{key:"_Style",value:function _Style(){return CSS.Extends({'.field':{}},_get(_getPrototypeOf(InputList.prototype),"_Style",this).call(this));}},{key:"_Render",value:function _Render(){}}]);return InputList;}(InputBase);module.exports["default"]=module.exports=InputList;UI.Register("nkmjs-input-list",InputList);},{"../input-base":219,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],230:[function(require,module,exports){'use strict';var _require329=require("@nkmjs/utils"),U=_require329.U,UDOM=_require329.UDOM;var _require330=require("@nkmjs/common"),NFOS=_require330.NFOS,COMMON_FLAG=_require330.COMMON_FLAG;var _require331=require("@nkmjs/style"),CSS=_require331.CSS;var _require332=require("@nkmjs/ui-core"),UI=_require332.UI;var InputField=require("../input-field");var __slider="slider";var InputNumber=/*#__PURE__*/function(_InputField4){_inherits(InputNumber,_InputField4);var _super134=_createSuper(InputNumber);function InputNumber(){_classCallCheck(this,InputNumber);return _super134.call(this);}_createClass(InputNumber,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(InputNumber.prototype),"_Init",this).call(this);}},{key:"SetSliderData",value:function SetSliderData(){var m_min=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var m_max=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var m_step=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;if(m_min!=m_max){if(!m_step){m_step=(m_max-m_min)/100;}this._inputField.setAttribute('type',"range");this._inputField.setAttribute('min',m_min);this._inputField.setAttribute('max',m_max);this._inputField.setAttribute('step',m_step);this._flags.Set(__slider,true);}else{this._inputField.setAttribute('type',"number");this._inputField.removeAttribute('min');this._inputField.removeAttribute('max');this._inputField.removeAttribute('step');this._flags.Set(__slider,false);}}// ----> DOM
},{key:"_Render",value:function _Render(){this._inputField=UDOM.New("input",{"class":'field',type:'number'},this._host);this._flags.Add(this._inputField,__slider);//this.SetSliderData(0,1,0.01);
}},{key:"_GrabValue",value:function _GrabValue(){var n=Number(this._inputField.value);return Number.isNaN(n)?0:n;}},{key:"_CleanUp",value:function _CleanUp(){this.SetSliderData();_get(_getPrototypeOf(InputNumber.prototype),"_CleanUp",this).call(this);}}]);return InputNumber;}(InputField);_defineProperty(InputNumber,"__NFO__",NFOS.Ext({css:["@/inputs/number.css"]},InputField,['css']));module.exports["default"]=module.exports=InputNumber;UI.Register("nkmjs-input-number",InputNumber);},{"../input-field":220,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],231:[function(require,module,exports){'use strict';var _require333=require("@nkmjs/utils"),U=_require333.U,UDOM=_require333.UDOM,PATH=_require333.PATH;var _require334=require("@nkmjs/common"),COMMON_FLAG=_require334.COMMON_FLAG;var _require335=require("@nkmjs/ui-core"),UI=_require335.UI;var InputField=require("../input-field");var InputPath=/*#__PURE__*/function(_InputField5){_inherits(InputPath,_InputField5);var _super135=_createSuper(InputPath);function InputPath(){_classCallCheck(this,InputPath);return _super135.call(this);}_createClass(InputPath,[{key:"_SanitizeValue",value:function _SanitizeValue(p_value){return PATH.Sanitize(_get(_getPrototypeOf(InputPath.prototype),"_SanitizeValue",this).call(this,p_value));}}]);return InputPath;}(InputField);module.exports["default"]=module.exports=InputPath;UI.Register("nkmjs-input-path",InputPath);},{"../input-field":220,"@nkmjs/common":27,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],232:[function(require,module,exports){'use strict';var _require336=require("@nkmjs/utils"),U=_require336.U,UDOM=_require336.UDOM;var _require337=require("@nkmjs/common"),COMMON_FLAG=_require337.COMMON_FLAG;var _require338=require("@nkmjs/style"),CSS=_require338.CSS;var _require339=require("@nkmjs/ui-core"),UI=_require339.UI;var InputField=require("../input-field");var InputText=/*#__PURE__*/function(_InputField6){_inherits(InputText,_InputField6);var _super136=_createSuper(InputText);function InputText(){_classCallCheck(this,InputText);return _super136.call(this);}_createClass(InputText,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(InputText.prototype),"_Init",this).call(this);this._updatePreviewOnChange=false;this._submitOnChange=false;}// ----> DOM
},{key:"_Render",value:function _Render(){this._inputField=UDOM.New("input",{"class":'field',type:'search'},this._host);}}]);return InputText;}(InputField);module.exports["default"]=module.exports=InputText;UI.Register("nkmjs-input-text",InputText);},{"../input-field":220,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],233:[function(require,module,exports){'use strict';var _require340=require("@nkmjs/utils"),U=_require340.U,UDOM=_require340.UDOM;var _require341=require("@nkmjs/common"),NFOS=_require341.NFOS,COMMON_FLAG=_require341.COMMON_FLAG;var _require342=require("@nkmjs/style"),CSS=_require342.CSS;var _require343=require("@nkmjs/ui-core"),UI=_require343.UI;var InputField=require("../input-field");var InputTextarea=/*#__PURE__*/function(_InputField7){_inherits(InputTextarea,_InputField7);var _super137=_createSuper(InputTextarea);function InputTextarea(){var _this18;_classCallCheck(this,InputTextarea);_this18=_super137.call(this);_defineProperty(_assertThisInitialized(_this18),"expandable",void 0);return _this18;}_createClass(InputTextarea,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(InputTextarea.prototype),"_Init",this).call(this);this._updatePreviewOnChange=false;this._submitOnChange=false;}// ----> DOM
},{key:"_Render",value:function _Render(){this._inputField=UDOM.New("textarea",{"class":'field',rows:3},this._host);}}]);return InputTextarea;}(InputField);_defineProperty(InputTextarea,"__NFO__",NFOS.Ext({css:["@/inputs/expandable.css"]},InputField,['css']));module.exports["default"]=module.exports=InputTextarea;UI.Register("nkmjs-input-textarea",InputTextarea);},{"../input-field":220,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],234:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={CONTROL_SIGNAL:require("./lib/control-signal"),Control:require("./lib/control"),ControlGroup:require("./lib/control-group"),Shell:require("./lib/shell"),Explorer:require("./lib/explorer"),WORKSPACE_CONTEXT:require("./lib/workspace-context"),// Dialogs
DialogBox:require("./lib/dialogs/dialog-box"),DialogInput:require("./lib/dialogs/dialog-input"),DialogLayer:require("./lib/dialogs/dialog-layer"),DialogHandler:require("./lib/dialogs/dialog-handler"),// Drawers
// Editors
Editor:require("./lib/editor"),EditorEx:require("./lib/editors/editor-ex"),EditorSlate:require("./lib/editors/editor-slate"),EditorDrawerNav:require("./lib/editors/editor-drawer-nav"),EditorDrawer:require("./lib/editors/editor-drawer"),// Helpers
Group:require("./lib/helpers/group"),// Inspectors
Inspector:require("./lib/inspector"),InspectorGroup:require("./lib/inspectors/inspector-group"),InspectorItem:require("./lib/inspectors/inspector-item"),InspectorShell:require("./lib/inspectors/inspector-shell"),MetaControlGroup:require("./lib/inspectors/meta-control-group"),MetaControlItem:require("./lib/inspectors/meta-control-item"),HistoryInspectorShell:require("./lib/inspectors/history-inspector-shell"),// Templates
// Items
Tab:require("./lib/items/tab"),StatusBar:require("./lib/items/status-bar"),Tag:require("./lib/items/tag"),Breadcrumb:require("./lib/items/breadcrumb"),BreadcrumbItem:require("./lib/items/breadcrumb-item"),// Workspace
Workspace:require("./lib/workspace/workspace"),WorkspaceCellNav:require("./lib/workspace/workspace-cell-nav"),WorkspaceCell:require("./lib/workspace/workspace-cell"),WorkspaceRoot:require("./lib/workspace/workspace-root")};},{"./lib/control":237,"./lib/control-group":235,"./lib/control-signal":236,"./lib/dialogs/dialog-box":238,"./lib/dialogs/dialog-handler":239,"./lib/dialogs/dialog-input":240,"./lib/dialogs/dialog-layer":241,"./lib/editor":242,"./lib/editors/editor-drawer":244,"./lib/editors/editor-drawer-nav":243,"./lib/editors/editor-ex":245,"./lib/editors/editor-slate":246,"./lib/explorer":247,"./lib/helpers/group":248,"./lib/inspector":249,"./lib/inspectors/history-inspector-shell":250,"./lib/inspectors/inspector-group":251,"./lib/inspectors/inspector-item":252,"./lib/inspectors/inspector-shell":253,"./lib/inspectors/meta-control-group":254,"./lib/inspectors/meta-control-item":255,"./lib/items/breadcrumb":257,"./lib/items/breadcrumb-item":256,"./lib/items/status-bar":258,"./lib/items/tab":259,"./lib/items/tag":260,"./lib/shell":261,"./lib/workspace-context":263,"./lib/workspace/workspace":267,"./lib/workspace/workspace-cell":265,"./lib/workspace/workspace-cell-nav":264,"./lib/workspace/workspace-root":266}],235:[function(require,module,exports){'use strict';var _require344=require("@nkmjs/utils"),U=_require344.U,UDOM=_require344.UDOM;var _require345=require("@nkmjs/common"),POOL=_require345.POOL;var _require346=require("@nkmjs/ui-core"),UI=_require346.UI,UI_SIGNAL=_require346.UI_SIGNAL,ExtExpand=_require346.ExtExpand,ToolButton=_require346.ToolButton,Toolbar=_require346.Toolbar,ImageManipulator=_require346.ImageManipulator,TextManipulator=_require346.TextManipulator;var Control=require("./control.js");/**
 * 
 *  *----------------------*
 *  | + []Title     [][][] |
 *  *----------------------*
 * 
 */var ControlGroup=/*#__PURE__*/function(_Control){_inherits(ControlGroup,_Control);var _super138=_createSuper(ControlGroup);function ControlGroup(){_classCallCheck(this,ControlGroup);return _super138.call(this);}_createClass(ControlGroup,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(ControlGroup.prototype),"_Init",this).call(this);this._extExpand=new ExtExpand();this._extExpand._isExpanded=false;this._extExpand.Watch(UI_SIGNAL.EXPANDED,this._Expand,this);this._extExpand.Watch(UI_SIGNAL.COLLAPSED,this._Collapse,this);this._header=null;this._expandBtn=null;this._icon=null;this._label=null;this._toolbarClass=Toolbar;this._toolbar=null;this._itemWrapper=null;}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(ControlGroup.prototype),"_PostInit",this).call(this);this._extExpand.Setup(this,this._itemWrapper,this._expandBtn);}// ----> DOM
},{key:"_Style",value:function _Style(){return U.Merge(_get(_getPrototypeOf(ControlGroup.prototype),"_Style",this).call(this),{':host':{},'.header':{position:"relative",display:"flex",'flex-direction':"row",'align-items':"center",'align-content':"stretch",'padding':"4px",'box-sizing':"border-box",flex:"0 1 auto"},'.toggle':{flex:"0 0 auto"},'.facade':{flex:"1 1 auto"},'.toolbar':{flex:"0 0 auto"},'.content':{},'.content.expanded':{display:"flex"},'.content.collapsed':{display:"none"}});}},{key:"_Render",value:function _Render(){this._header=UDOM.New("div",{"class":"header"},this._host);this._expandBtn=this.Add(ToolButton,"toggle",this._header);this._icon=new ImageManipulator(UDOM.New("span",{"class":"icon"},this._header));this._label=new TextManipulator(UDOM.New("span",{"class":"label"},this._header));this._toolbar=this.Add(this._toolbarClass,"toolbar",this._header);this._expandBtn.icon='%ICON%/icon_expand_arrow.svg';this._expandBtn.scale=0.75;this._itemWrapper=UDOM.New("div",{"class":"content"},this._host);this.focusArea=this._header;}},{key:"Expand",value:function Expand(){this._extExpand.Expand();}},{key:"_Expand",value:function _Expand(){if(this._data){this._data.expanded=true;}this._expandBtn.rotation=90;}},{key:"Collapse",value:function Collapse(){this._extExpand.Collapse();}},{key:"_Collapse",value:function _Collapse(){if(this._data){this._data.expanded=false;}this._expandBtn.rotation=0;}},{key:"Activate",value:function Activate(p_evt){if(this._expandBtn.focused){return false;}return _get(_getPrototypeOf(ControlGroup.prototype),"Activate",this).call(this,p_evt);}},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(ControlGroup.prototype),"_CleanUp",this).call(this);}}]);return ControlGroup;}(Control);module.exports["default"]=module.exports=ControlGroup;UI.Register("nkmjs-control-group",ControlGroup);},{"./control.js":237,"@nkmjs/common":27,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],236:[function(require,module,exports){'use strict';var CONTROL_SIGNAL=function CONTROL_SIGNAL(){_classCallCheck(this,CONTROL_SIGNAL);};_defineProperty(CONTROL_SIGNAL,"VALUE_CHANGED",Symbol("valueChanged"));_defineProperty(CONTROL_SIGNAL,"VALUE_COMMITTED",Symbol("valueCommitted"));module.exports["default"]=module.exports=CONTROL_SIGNAL;},{}],237:[function(require,module,exports){'use strict';var _require347=require("@nkmjs/utils"),U=_require347.U;var _require348=require("@nkmjs/common"),SIGNAL=_require348.SIGNAL;var _require349=require("@nkmjs/style"),CSS=_require349.CSS;var _require350=require("@nkmjs/data-core"),DATA_SIGNAL=_require350.DATA_SIGNAL,DataBlock=_require350.DataBlock,MetadataObserver=_require350.MetadataObserver;var _require351=require("@nkmjs/ui-core"),UI=_require351.UI,OrientableWidget=_require351.OrientableWidget;var _require352=require("@nkmjs/actions"),CommandAction=_require352.CommandAction;var Editor=require("./editor");var Control=/*#__PURE__*/function(_OrientableWidget3){_inherits(Control,_OrientableWidget3);var _super139=_createSuper(Control);function Control(){_classCallCheck(this,Control);return _super139.call(this);}_createClass(Control,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Control.prototype),"_Init",this).call(this);this._metadataObserver=new MetadataObserver();this._dataObserver.Hook(DATA_SIGNAL.DIRTY,this._OnDataDirty,this);this._dataObserver.Hook(SIGNAL.UPDATED,this._OnDataUpdated,this);}},{key:"context",get:function get(){return this._context;},set:function set(p_value){if(this._context===p_value){return;}var oldValue=this._context;this._context=p_value;this._OnContextChanged(oldValue);}},{key:"_OnContextChanged",value:function _OnContextChanged(p_oldValue){}},{key:"editor",get:function get(){var p=this._parent;while(p!=null){if(U.isInstanceOf(p,Editor)){return p;}p=p._parent;}return null;}},{key:"_Style",value:function _Style(){return CSS.Extends({':host':{position:"relative",display:"flex",flex:"0 1 auto",'min-width':0}},_get(_getPrototypeOf(Control.prototype),"_Style",this).call(this));}// ----> DATA
},{key:"_OnDataChanged",value:function _OnDataChanged(p_oldValue){_get(_getPrototypeOf(Control.prototype),"_OnDataChanged",this).call(this,p_oldValue);if(U.isInstanceOf(this._data,DataBlock)){this._metadataObserver.target=this._data.metadata;}else{this._metadataObserver.target=null;}}},{key:"_OnDataDirty",value:function _OnDataDirty(p_data){this._OnDataUpdated(p_data);// <- Overkill much ?
}},{key:"_CleanUp",value:function _CleanUp(){this.context=null;_get(_getPrototypeOf(Control.prototype),"_CleanUp",this).call(this);}},{key:"_Do",value:function _Do(p_actionClass,p_operation){CommandAction.Do(this,p_actionClass,p_operation);}}]);return Control;}(OrientableWidget);module.exports["default"]=module.exports=Control;UI.Register("nkmjs-control",Control);},{"./editor":242,"@nkmjs/actions":1,"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],238:[function(require,module,exports){'use strict';var _require353=require("@nkmjs/utils"),U=_require353.U,UDOM=_require353.UDOM;var _require354=require("@nkmjs/collections"),Dictionary=_require354.Dictionary,List=_require354.List;var _require355=require("@nkmjs/common"),NFOS=_require355.NFOS,OptionsHandler=_require355.OptionsHandler;var _require356=require("@nkmjs/style"),CSS=_require356.CSS,FONT_FLAG=_require356.FONT_FLAG;var _require357=require("@nkmjs/ui-core"),UI=_require357.UI,UI_SIGNAL=_require357.UI_SIGNAL,Widget=_require357.Widget,TextManipulator=_require357.TextManipulator,ImageManipulator=_require357.ImageManipulator,Frame=_require357.Frame,Toolbar=_require357.Toolbar,ButtonEx=_require357.ButtonEx,UI_FLAG=_require357.UI_FLAG;var _require358=require("@nkmjs/ui-inputs"),INPUT_SIGNAL=_require358.INPUT_SIGNAL,InputBase=_require358.InputBase,InputFormHandler=_require358.InputFormHandler;var _require359=require("@nkmjs/dialog"),DialogInfos=_require359.DialogInfos;var DialogBox=/*#__PURE__*/function(_Widget5){_inherits(DialogBox,_Widget5);var _super140=_createSuper(DialogBox);function DialogBox(){_classCallCheck(this,DialogBox);return _super140.call(this);}_createClass(DialogBox,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(DialogBox.prototype),"_Init",this).call(this);this._formHandler=new InputFormHandler();this._formHandler.Watch(INPUT_SIGNAL.FORM_INVALID,this._OnFormInvalid,this);this._formHandler.Watch(INPUT_SIGNAL.FORM_READY,this._OnFormReady,this);this._header=null;this._body=null;this._footer=null;this._title=null;this._icon=null;this._hasInput=false;this._handles=new Array(0);this._contents=new Array(0);this._submitMap=new Dictionary();this._submitList=new List();this._toolbarClass=Toolbar;this._toolbarDefaultButtonClass=ButtonEx;this._toolbar=null;this._optionsHandler=new OptionsHandler(this._Bind(this._OnOptionsUpdated),this._Bind(this._OnOptionsWillUpdate));this._optionsHandler.Hook("_title","title","!!! MISSING TITLE !!!");this._optionsHandler.Hook("_icon","icon",null);this._optionsHandler.Hook("_message","message",null);this._optionsHandler.Hook("_actions",this._Bind(this.SetActions),null);this._optionsHandler.Hook("_content",this._Bind(this.SetContent));this._Bind(this._Close);this._Bind(this._Submit);}// ----> DOM
},{key:"_Style",value:function _Style(){return CSS.Extends({':host':{display:"flex",'flex-flow':"column",'align-content':"stretch",'align-items':"stretch",'justify-content':"center",overflow:'hidden'},'.header':{},'.footer':{display:"flex",'flex-flow':"column",'align-content':"flex-end",'align-items':"flex-end",flex:"0 0 auto"},'.toolbar':{flex:"0 0 auto"},'.body':{//'overflow-y':`overlay`,
flex:"1 1 auto"}},_get(_getPrototypeOf(DialogBox.prototype),"_Style",this).call(this));}},{key:"_Render",value:function _Render(){this._icon=new ImageManipulator(UDOM.New('div',{"class":"icon"},this._host),false,true);this._header=UDOM.New("div",{"class":"group header"},this._host);this._body=UDOM.New("div",{"class":"group body"},this._host);this._footer=UDOM.New("div",{"class":"group footer"},this._host);this._toolbar=this.Add(this._toolbarClass,"toolbar",this._footer);this._toolbar._defaultButtonClass=this._toolbarDefaultButtonClass;this._toolbar.size=UI_FLAG.SIZE_M;this._title=new TextManipulator(UDOM.New("span",{"class":"title ".concat(FONT_FLAG.MEDIUM)},this._header),false);this._messageElement=null;}},{key:"_OnOptionsWillUpdate",value:function _OnOptionsWillUpdate(p_options){if(!U.isInstanceOf(p_options,DialogInfos)){throw new Error("DialogLayer expect data of type DialogInfos, got ".concat(p_options.constructor.name," instead."));}}},{key:"_OnOptionsUpdated",value:function _OnOptionsUpdated(p_options){this._hasInput=this._formHandler._inputList.count>0;if(this._hasInput){this._formHandler.ValidateForm();}}},{key:"title",get:function get(){return this._title;},set:function set(p_title){this._title.Set(p_title);}},{key:"icon",get:function get(){return this._icon;},set:function set(p_icon){this._icon.Set(p_icon);}},{key:"message",set:function set(p_message){if(!this._messageElement){this._messageElement=UDOM.New("span",{"class":"item message"},this._body);}this._messageElement.innerHTML=p_message;this._contents.push(this._messageElement);}/**
     * 
     * @param {array} p_actions 
     */},{key:"SetActions",value:function SetActions(p_actions){if(p_actions){// Create handles as specified
for(var i=0,n=p_actions.length;i<n;i++){var _opts=p_actions[i];this.CreateHandle(_opts,U.Get(_opts,"cl",null));}}else{// Create a default handle
this.CreateHandle({text:"Close"});}}/**
     * 
     * @param {array} p_content
     */},{key:"SetContent",value:function SetContent(p_content){if(!Array.isArray(p_content)){throw new Error("Cannot build dialog content list out of ".concat(p_content));}for(var i=0,n=p_content.length;i<n;i++){var itemNfos=p_content[i],itemClass=itemNfos.cl,itemData=itemNfos.data;if(!itemClass){throw new Error("Cannot create item with unspecified class.");}var item=this.Add(itemClass,"item",this._body);if(U.isInstanceOf(itemClass,InputBase)){item.inputId=itemNfos.inputId;if(itemNfos.value){item.currentValue=itemNfos.value;}var validations=itemNfos.validations;if(validations){for(var _i27=0,_n22=validations.length;_i27<_n22;_i27++){item.AddValidation(validations[_i27]);}}this._formHandler.Register(item);}if(itemData){item.data=itemData;}this._contents.push(item);}}},{key:"_OnDataUpdated",value:function _OnDataUpdated(p_data){this._Clear();this._optionsHandler.Process(this,p_data);/* DATA FORMAT

        {
            //Dialog title
            [COM_ID.TITLE]:`Dialog title`, 

            //Dialog message
            [COM_ID.MESSAGE]:`Dialog message` //Optional

            //Dialog icon
            [COM_ID.ICON]:`%ICON%/icon_info.svg`, //Optional

            //Dialog actions
            //displayed at the bottom of the dialog.
            actions:[
                {
                    //Regular button options goes here 
                    //Extra parameter stating whether the button closes the popup or not
                    close:true,
                    //Extra submit callback definition to retrieve form values, if any
                    submit:{ fn:func, thisArg:context }
                }
            ]

            //Dialog content
            //Will create widgets in order.
            content:[
                {
                    //Regular item
                    cl:ItemClass
                },
                {
                    //Input item
                    cl:ItemClass,
                    inputId:`inputId`,
                    validations:[
                        { fn:func, thisArg:context }
                    ]
                }
            ]

        }

        */}// ----> Toolbox handles
},{key:"_ClearHandles",value:function _ClearHandles(){var handles=this._handles;while(handles.length!=0){handles.pop().Release();}}},{key:"CreateHandle",value:function CreateHandle(p_options){var p_class=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var handle=this._toolbar.CreateHandle(p_options,p_class);this._handles.push(handle);if(U.Get(p_options,"submit",false)){//TODO : Need to add a generic 'triggered' activation  signal
//to close the dialog box. Otherwise, close by default.
this._submitMap.Set(handle,p_options.submit);this._submitList.Add(handle);handle.Watch(UI_SIGNAL.TRIGGERED,this._Submit);}if(U.Get(p_options,"close",true)){//TODO : Need to add a generic 'triggered' activation signal
//to close the dialog box. Otherwise, close by default.
handle.Watch(UI_SIGNAL.TRIGGERED,this._Close);}return handle;}// ----> Form handling
},{key:"_OnFormInvalid",value:function _OnFormInvalid(p_handler){this._submitList.ForEach(function(p_item){p_item.activable=false;});}},{key:"_OnFormReady",value:function _OnFormReady(p_handler){this._submitList.ForEach(function(p_item){p_item.activable=true;});}// ---->
},{key:"_Close",value:function _Close(){this._data.Consume();}},{key:"_Submit",value:function _Submit(p_source){var cb=this._submitMap.Get(p_source);cb.fn.call(cb.thisArg,this._formHandler.inputValues);}},{key:"_Clear",value:function _Clear(){this._submitMap.Clear();this._submitList.Clear();this._formHandler.Clear();this._ClearHandles();for(var i=0,n=this._contents.length;i<n;i++){var item=this._contents[i];if("Release"in item){this._contents[i].Release();}else{UDOM.Remove(item);}}this._hasInput=false;this._contents.length=0;}},{key:"_CleanUp",value:function _CleanUp(){this._Clear();_get(_getPrototypeOf(DialogBox.prototype),"_CleanUp",this).call(this);}}]);return DialogBox;}(Widget);_defineProperty(DialogBox,"__NFO__",NFOS.Ext({css:["@/dialogs/dialog-box.css"]},Widget,['css']));module.exports["default"]=module.exports=DialogBox;UI.Register('nkmjs-dialog-box',DialogBox);},{"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/dialog":81,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/ui-inputs":218,"@nkmjs/utils":268}],239:[function(require,module,exports){'use strict';var _require360=require("@nkmjs/utils"),U=_require360.U;var _require361=require("@nkmjs/collections"),Dictionary=_require361.Dictionary;var _require362=require("@nkmjs/ui-core"),UI=_require362.UI,LayerContainer=_require362.LayerContainer;var _require363=require("@nkmjs/actions"),ACTION_REQUEST=_require363.ACTION_REQUEST;var _require364=require("@nkmjs/dialog"),DIALOG_SIGNAL=_require364.DIALOG_SIGNAL,DialogInfos=_require364.DialogInfos;var DialogLayer=require("./dialog-layer.js");var _require365=require("@nkmjs/style"),CSS=_require365.CSS;var DialogHandler=/*#__PURE__*/function(_LayerContainer){_inherits(DialogHandler,_LayerContainer);var _super141=_createSuper(DialogHandler);function DialogHandler(){_classCallCheck(this,DialogHandler);return _super141.call(this);}_createClass(DialogHandler,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(DialogHandler.prototype),"_Init",this).call(this);this._RegisterLocalRequestHandler(ACTION_REQUEST.DIALOG,this.HandleDialogRequest);this._layerMap=new Dictionary();}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(DialogHandler.prototype),"_PostInit",this).call(this);this.visible=false;}},{key:"_Style",value:function _Style(){var s=CSS.Extends({':host':{'pointer-events':'none'},'.layer':{'pointer-events':'auto'}},_get(_getPrototypeOf(DialogHandler.prototype),"_Style",this).call(this));s[".".concat(this._layerClassName)]['pointer-events']='auto';return s;}},{key:"HandleDialogRequest",value:function HandleDialogRequest(p_request){this.BringToFront();this.visible=true;var dialogInfos=p_request.GetOption("data",null);if(!dialogInfos){throw new Error("Cannot build dialog from empty DialogInfos");}var newLayer=this.Add(DialogLayer);newLayer.data=dialogInfos;dialogInfos.Watch(DIALOG_SIGNAL.CONSUMED,this._OnDialogConsumed,this);this._layerMap.Set(dialogInfos,newLayer);p_request.HandleSuccess(this);}},{key:"_OnDialogConsumed",value:function _OnDialogConsumed(p_infos){var layer=this._layerMap.Get(p_infos);this._layerMap.Remove(p_infos);layer.Release();}},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(DialogHandler.prototype),"_CleanUp",this).call(this);this.visible=false;}}]);return DialogHandler;}(LayerContainer);module.exports["default"]=module.exports=DialogHandler;UI.Register("nkmjs-dialog-handler",DialogHandler);},{"./dialog-layer.js":241,"@nkmjs/actions":1,"@nkmjs/collections":21,"@nkmjs/dialog":81,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],240:[function(require,module,exports){'use strict';var _require366=require("@nkmjs/ui-core"),UI=_require366.UI,Widget=_require366.Widget;var DialogInput=/*#__PURE__*/function(_Widget6){_inherits(DialogInput,_Widget6);var _super142=_createSuper(DialogInput);function DialogInput(){_classCallCheck(this,DialogInput);return _super142.call(this);}_createClass(DialogInput,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(DialogInput.prototype),"_Init",this).call(this);}},{key:"dialogBox",set:function set(p_value){this._dialogBox=p_value;}},{key:"GetDialogData",value:function GetDialogData(){return null;}}]);return DialogInput;}(Widget);module.exports["default"]=module.exports=DialogInput;UI.Register('nkmjs-dialog-input',DialogInput);},{"@nkmjs/ui-core":166}],241:[function(require,module,exports){'use strict';var _require367=require("@nkmjs/utils"),U=_require367.U,UDOM=_require367.UDOM;var _require368=require("@nkmjs/style"),CSS=_require368.CSS;var _require369=require("@nkmjs/ui-core"),UI=_require369.UI,Layer=_require369.Layer;var _require370=require("@nkmjs/dialog"),DialogInfos=_require370.DialogInfos;var DialogBox=require("./dialog-box.js");var DialogLayer=/*#__PURE__*/function(_Layer2){_inherits(DialogLayer,_Layer2);var _super143=_createSuper(DialogLayer);function DialogLayer(){_classCallCheck(this,DialogLayer);return _super143.call(this);}_createClass(DialogLayer,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(DialogLayer.prototype),"_Init",this).call(this);this._background=null;this._msgBox=null;}// ----> DOM
},{key:"_Style",value:function _Style(){return CSS.Extends({':host':{display:"flex",'flex-flow':"row",'align-content':"center",'align-items':"center",'justify-content':"center"},'.bg':{position:"absolute",top:"0px",left:"0px",width:"100%",height:"100%",'background-color':"rgba(23,23,23,0.3)",'backdrop-filter':"blur(5px)"},'.box':{flex:"1 1 auto",'max-width':"500px"}},_get(_getPrototypeOf(DialogLayer.prototype),"_Style",this).call(this));}},{key:"_Render",value:function _Render(){this._background=UDOM.New("div",{"class":"bg"},this._host);}},{key:"_OnDataChanged",value:function _OnDataChanged(p_oldData){_get(_getPrototypeOf(DialogLayer.prototype),"_OnDataChanged",this).call(this,p_oldData);//TODO : Check if DialogInfos has a preferred dialogBox class set
if(this._msgBox){this._msgBox.Release();this._msgBox=null;}if(!this._data){return;}var nfos=this._data;if(!U.isInstanceOf(nfos,DialogInfos)){throw new Error("DialogLayer expect data of type DialogInfos, got ".concat(this._data.constructor.name," instead."));}var boxClass=U.Default(nfos.dialogClass,DialogBox);this._msgBox=this.Add(boxClass,'box');this._msgBox.data=nfos;}}]);return DialogLayer;}(Layer);module.exports["default"]=module.exports=DialogLayer;UI.Register('nkmjs-dialog-view',DialogLayer);},{"./dialog-box.js":238,"@nkmjs/dialog":81,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],242:[function(require,module,exports){'use strict';var _require371=require("@nkmjs/utils"),U=_require371.U;var _require372=require("@nkmjs/common"),SIGNAL=_require372.SIGNAL,COMMON_FLAG=_require372.COMMON_FLAG,Observer=_require372.Observer;var _require373=require("@nkmjs/actions"),ActionStack=_require373.ActionStack,Command=_require373.Command;var _require374=require("@nkmjs/data-core"),DATA_SIGNAL=_require374.DATA_SIGNAL;var _require375=require("@nkmjs/ui-core"),UI=_require375.UI,MOUSE=_require375.MOUSE,View=_require375.View;/**
 * An editor is an abstract implementation of the generic "editor" concept.
 * It is designed to edit & inspects a single piece of data (no matter how complex).
 * 
 * It has an 'inspectedData' property that allows specific parts or components of the 
 * edited data to be inspected further, and selected more specifically, based on Editor's implementation.
 */var Editor=/*#__PURE__*/function(_View3){_inherits(Editor,_View3);var _super144=_createSuper(Editor);function Editor(){_classCallCheck(this,Editor);return _super144.call(this);}_createClass(Editor,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Editor.prototype),"_Init",this).call(this);//TODO : Find a way to invalidate action stacks // <--- WTF ?
this._actionStack=new ActionStack();this._dataObserver.Hook(DATA_SIGNAL.DIRTY,this._OnDataDirty,this);this._dataObserver.Hook(DATA_SIGNAL.DIRTY_CLEARED,this._OnDataCleaned,this);this._inspectedData=null;this._inspectedObserver=new Observer();this._inspectedObserver.Hook(SIGNAL.RELEASED,this._OnInspectedDataReleased,this);this._flags.Add(this,COMMON_FLAG.WARNING);this._Bind(this.Inspect);}// ----> Data management
},{key:"_OnDataChanged",value:function _OnDataChanged(p_oldData){this._actionStack.Clear();this._commands.context=this._data;_get(_getPrototypeOf(Editor.prototype),"_OnDataChanged",this).call(this,p_oldData);this.inspectedData=null;}},{key:"_PostDataChanged",value:function _PostDataChanged(p_oldData){_get(_getPrototypeOf(Editor.prototype),"_PostDataChanged",this).call(this,p_oldData);if(!this._data){}else{if(this._data.isDirty){this._OnDataDirty(this._data);}else{this._OnDataCleaned(this._data);}}}},{key:"_OnDataDirty",value:function _OnDataDirty(p_data){}},{key:"_OnDataCleaned",value:function _OnDataCleaned(p_data){}// ----> Data
},{key:"inspectedData",get:function get(){return this._inspectedData;},set:function set(p_value){if(this._inspectedData===p_value){return;}var oldValue=this._inspectedData;this._inspectedData=p_value;if(oldValue){this._inspectedObserver.Unobserve(oldValue);}if(p_value){this._inspectedObserver.Observe(p_value);}this._OnInspectedDataChanged(oldValue);}},{key:"_OnInspectedDataChanged",value:function _OnInspectedDataChanged(p_oldData){}},{key:"_OnInspectedDataReleased",value:function _OnInspectedDataReleased(){this.inspectedData=null;}/**
     * Set data to be inspected
     * @param {*} p_data 
     */},{key:"Inspect",value:function Inspect(p_data){this.inspectedData=p_data;}// ----> Actions
},{key:"Do",value:function Do(p_actionClass,p_options){//Group drag-related actions
this._actionStack.ToggleGrouping(UI.dragLength>1);this._actionStack.Do(p_actionClass,p_options);}},{key:"Undo",value:function Undo(){this._actionStack.Undo();}},{key:"Redo",value:function Redo(){this._actionStack.Redo();}}]);return Editor;}(View);module.exports["default"]=module.exports=Editor;UI.Register('nkmjs-editor',Editor);},{"@nkmjs/actions":1,"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],243:[function(require,module,exports){'use strict';var _require376=require("@nkmjs/utils"),U=_require376.U;var _require377=require("@nkmjs/style"),CSS=_require377.CSS;var _require378=require("@nkmjs/ui-core"),UI=_require378.UI,Widget=_require378.Widget,DrawerNav=_require378.DrawerNav;var EditorDrawerNav=/*#__PURE__*/function(_DrawerNav){_inherits(EditorDrawerNav,_DrawerNav);var _super145=_createSuper(EditorDrawerNav);function EditorDrawerNav(){_classCallCheck(this,EditorDrawerNav);return _super145.call(this);}_createClass(EditorDrawerNav,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(EditorDrawerNav.prototype),"_Init",this).call(this);}},{key:"_Style",value:function _Style(){return CSS.Extends({},_get(_getPrototypeOf(EditorDrawerNav.prototype),"_Style",this).call(this));}},{key:"_OpenSettings",value:function _OpenSettings(){console.log("Open Settings");}}]);return EditorDrawerNav;}(DrawerNav);module.exports["default"]=module.exports=EditorDrawerNav;UI.Register('nkmjs-editor-drawer-nav',EditorDrawerNav);},{"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],244:[function(require,module,exports){'use strict';var _require379=require("@nkmjs/utils"),U=_require379.U;var _require380=require("@nkmjs/style"),CSS=_require380.CSS;var _require381=require("@nkmjs/ui-core"),UI=_require381.UI,Widget=_require381.Widget,Drawer=_require381.Drawer;var EditorDrawerNav=require("./editor-drawer-nav");var EditorDrawer=/*#__PURE__*/function(_Drawer){_inherits(EditorDrawer,_Drawer);var _super146=_createSuper(EditorDrawer);function EditorDrawer(){_classCallCheck(this,EditorDrawer);return _super146.call(this);}_createClass(EditorDrawer,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(EditorDrawer.prototype),"_Init",this).call(this);this._navClass=EditorDrawerNav;}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(EditorDrawer.prototype),"_PostInit",this).call(this);//this._controls.order = 2; 
}},{key:"_Style",value:function _Style(){return CSS.Extends({':host':{width:"354px",flex:"0 0 auto",'background-color':"rgba(127,127,127,0.1)"//'border-left':`1px dashed rgba(127,127,127,0.2)`
},'.controls':{'background-color':"rgba(127,127,127,0.0)"}},_get(_getPrototypeOf(EditorDrawer.prototype),"_Style",this).call(this));}}]);return EditorDrawer;}(Drawer);module.exports["default"]=module.exports=EditorDrawer;UI.Register('nkmjs-editor-drawer',EditorDrawer);},{"./editor-drawer-nav":243,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],245:[function(require,module,exports){'use strict';var _require382=require("@nkmjs/utils"),U=_require382.U,UDOM=_require382.UDOM;var _require383=require("@nkmjs/common"),COMMON_FLAG=_require383.COMMON_FLAG;var _require384=require("@nkmjs/style"),CSS=_require384.CSS;var _require385=require("@nkmjs/data-core"),Catalog=_require385.Catalog;var _require386=require("@nkmjs/ui-core"),UI_ID=_require386.UI_ID,UI=_require386.UI,UI_FLAG=_require386.UI_FLAG,View=_require386.View,DOMTemplate=_require386.DOMTemplate,TPLHeaderBodyFooter=_require386.TPLHeaderBodyFooter;var InspectorShell=require("../inspectors/inspector-shell");var HistoryInspectorShell=require("../inspectors/history-inspector-shell");var EditorDrawer=require("./editor-drawer");var Editor=require("../editor");var StatusBar=require("../items/status-bar");var EditorEx=/*#__PURE__*/function(_Editor){_inherits(EditorEx,_Editor);var _super147=_createSuper(EditorEx);function EditorEx(){_classCallCheck(this,EditorEx);return _super147.call(this);}_createClass(EditorEx,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(EditorEx.prototype),"_Init",this).call(this);this._drawerCatalog=new Catalog(false);this._drawer=null;this._inspectorShell=null;this._historyInspector=null;this._viewport=null;this._header=null;this._body=null;this._footer=null;this._topStatus=null;this._bottomStatus=null;}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(EditorEx.prototype),"_PostInit",this).call(this);var confs=new Array(0);this._InitDrawerCatalog(confs);this._drawer.catalog=this._drawerCatalog;var conf=null;var item=null;var view=null;var assign=null;for(var i=0,n=confs.length;i<n;i++){conf=confs[i];item=this._drawerCatalog.Register(conf);view=item.GetOption('view',null);assign=U.Get(conf,"assign",null);console.log("".concat(assign," >> ").concat(view));if(view&&assign){this[assign]=view;}}}},{key:"_InitDrawerCatalog",value:function _InitDrawerCatalog(p_configList){var _p_configList$push;p_configList.push((_p_configList$push={},_defineProperty(_p_configList$push,UI_ID.NAME,"Inspector"),_defineProperty(_p_configList$push,UI_ID.ICON,"%ICON%/icon_parameters.svg"),_defineProperty(_p_configList$push,"viewType",this.constructor.__default_inspectorShellClass),_defineProperty(_p_configList$push,"assign","_inspector"),_p_configList$push));}// TODO : An editor offer streamlined way to 'edit' a datablock and
// store/retrieve metadata into it that are unrelated to actual
// data but instead are only related to editor values (i.e node placement in a graph, etc)
// ----> DOM
},{key:"_Style",value:function _Style(){return CSS.Extends({':host':{position:"relative",display:"flex",'align-items':"stretch",'align-content':"stretch",'min-width':0},':host(.vertical)':{'flex-flow':"row"},':host(.horizontal)':{'flex-flow':"column"},':host(.vertical).fs':{//height:`100%`
},':host(.horizontal).fs':{//width:`100%`
},'.fs':{flex:"0 0 auto"},'.body':{position:"relative",display:"flex",'align-items':"stretch",'align-content':"stretch",flex:"1 1 auto"},'.viewport':{position:"relative",display:"flex",flex:"1 1 auto"},'.drawer':{position:"relative",display:"flex",flex:"0 0 auto"},'.topstatus':{position:"absolute",width:"100%"}},_get(_getPrototypeOf(EditorEx.prototype),"_Style",this).call(this));}},{key:"_Render",value:function _Render(){DOMTemplate.Render(TPLHeaderBodyFooter,this,_defineProperty({},UI_ID.OWNER,this));this._drawer=this.Add(this.constructor.__default_drawerClass,"drawer",this._body);this._viewport=this.Add(this.constructor.__default_viewportClass,"viewport",this._body);this._inspectorShell=this.Add(this.constructor.__default_inspectorShellClass,"inspector",this._body);this._inspectorShell.orientation=UI_FLAG.HORIZONTAL;this._drawer.orientation=UI_FLAG.HORIZONTAL;}// ----> Data management
},{key:"_OnDataChanged",value:function _OnDataChanged(p_oldData){_get(_getPrototypeOf(EditorEx.prototype),"_OnDataChanged",this).call(this,p_oldData);this._inspectorShell.data=this._data;this._inspectorShell.context=this._data;}},{key:"_OnDataDirty",value:function _OnDataDirty(p_data){_get(_getPrototypeOf(EditorEx.prototype),"_OnDataDirty",this).call(this,p_data);this._ToggleWarning(true);}},{key:"_OnDataCleaned",value:function _OnDataCleaned(p_data){_get(_getPrototypeOf(EditorEx.prototype),"_OnDataCleaned",this).call(this,p_data);this._ToggleWarning(false);}},{key:"_ToggleWarning",value:function _ToggleWarning(p_toggle){//TODO : Re-implement warning states / unsaved modification in editor
return;var bar=this._topStatus;if(p_toggle){this._flags.Set(COMMON_FLAG.WARNING,true);bar.flag=COMMON_FLAG.WARNING;bar.text="There are unsaved modifications.";bar.htitle="Unsaved modifications are only affect the ecosystem once applied.";bar.visible=true;}else{this._flags.Set(COMMON_FLAG.WARNING,false);bar.visible=false;}}// ---->
},{key:"Inspect",value:function Inspect(p_data){_get(_getPrototypeOf(EditorEx.prototype),"Inspect",this).call(this,p_data);this._inspectorShell.RequestDisplay();}},{key:"_OnInspectedDataChanged",value:function _OnInspectedDataChanged(p_oldData){_get(_getPrototypeOf(EditorEx.prototype),"_OnInspectedDataChanged",this).call(this,p_oldData);if(this._inspectedData){this._inspectorShell.data=this._inspectedData;}else{this._inspectorShell.data=this._data;}}}]);return EditorEx;}(Editor);_defineProperty(EditorEx,"__default_drawerClass",EditorDrawer);_defineProperty(EditorEx,"__default_inspectorShellClass",InspectorShell);_defineProperty(EditorEx,"__default_historyInspectorClass",HistoryInspectorShell);_defineProperty(EditorEx,"__default_viewportClass",View);module.exports["default"]=module.exports=EditorEx;UI.Register('nkmjs-editor-ex',EditorEx);},{"../editor":242,"../inspectors/history-inspector-shell":250,"../inspectors/inspector-shell":253,"../items/status-bar":258,"./editor-drawer":244,"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],246:[function(require,module,exports){'use strict';var _require387=require("@nkmjs/utils"),U=_require387.U;var _require388=require("@nkmjs/ui-core"),UI=_require388.UI;var EditorEx=require("./editor-ex");var SlateEditor=/*#__PURE__*/function(_EditorEx){_inherits(SlateEditor,_EditorEx);var _super148=_createSuper(SlateEditor);function SlateEditor(){_classCallCheck(this,SlateEditor);return _super148.call(this);}_createClass(SlateEditor,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(SlateEditor.prototype),"_Init",this).call(this);}//TODO : A slate editor is a free-roaming editing space with childs treated as floating nodes.
// ----> DOM
},{key:"_Render",value:function _Render(){_get(_getPrototypeOf(SlateEditor.prototype),"_Render",this).call(this);}}]);return SlateEditor;}(EditorEx);module.exports["default"]=module.exports=SlateEditor;UI.Register('nkmjs-editor-slate',SlateEditor);},{"./editor-ex":245,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],247:[function(require,module,exports){'use strict';var _require389=require("@nkmjs/utils"),U=_require389.U,UDOM=_require389.UDOM;var _require390=require("@nkmjs/ui-core"),UI=_require390.UI,View=_require390.View;var Explorer=/*#__PURE__*/function(_View4){_inherits(Explorer,_View4);var _super149=_createSuper(Explorer);function Explorer(){_classCallCheck(this,Explorer);return _super149.call(this);}_createClass(Explorer,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Explorer.prototype),"_Init",this).call(this);}},{key:"header",get:function get(){return this._header;}},{key:"body",get:function get(){return this._body;}},{key:"footer",get:function get(){return this._footer;}// ----> DOM
},{key:"_Style",value:function _Style(){var shadowSize=5;var shadowColor="rgba(0,0,0,0.5)";return{':host':{position:"relative",flex:"1 1 auto",'min-width':0,display:"flex",'flex-flow':"column nowrap",'align-content':"stretch",'align-items':"stretch",'background-color':"rgba(1,1,1,0.1)"},'.group':{position:"relative",flex:"1 0 auto"},'.header':{flex:"0 0 auto"},'.footer':{flex:"0 0 auto"},'.highlight':{'background-color':"#ff0000"},'.body':{'overflow-y':"overlay",'min-width':0,flex:"1 1 1px",'box-shadow':"inset 0px 11px ".concat(shadowSize,"px -10px ").concat(shadowColor,", inset 0px -11px ").concat(shadowSize,"px -10px ").concat(shadowColor)},'.body::-webkit-scrollbar-track':{'background-color':"rgba(127,127,127,0.05)"},'.body::-webkit-scrollbar':{width:"2px",height:"2px",'background-color':"rgba(127,127,127,0.05)"},'.body::-webkit-scrollbar-thumb':{'background-color':'rgba(255,255,255,0.05)'},'.body:hover::-webkit-scrollbar':{width:"4px",height:"4px"},'.body:hover::-webkit-scrollbar-thumb':{'background-color':'rgba(255,255,255,0.15)'}};}},{key:"_Render",value:function _Render(){this._header=UDOM.New("div",{"class":"header group"},this._host);this._body=UDOM.New("div",{"class":"body group"},this._host);this._footer=UDOM.New("div",{"class":"footer group"},this._host);this._wrapper=this._body;}}]);return Explorer;}(View);module.exports["default"]=module.exports=Explorer;UI.Register('nkmjs-explorer',Explorer);},{"@nkmjs/ui-core":166,"@nkmjs/utils":268}],248:[function(require,module,exports){var _require391=require("@nkmjs/utils"),U=_require391.U,UDOM=_require391.UDOM;var _require392=require("@nkmjs/collections"),Dictionary=_require392.Dictionary;var _require393=require("@nkmjs/ui-core"),UI=_require393.UI,OrientableWidget=_require393.OrientableWidget;var Group=/*#__PURE__*/function(_OrientableWidget4){_inherits(Group,_OrientableWidget4);var _super150=_createSuper(Group);function Group(){_classCallCheck(this,Group);return _super150.call(this);}_createClass(Group,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Group.prototype),"_Init",this).call(this);this._header=null;this._footer=null;this._groupMap=new Dictionary();this._groupList=new Array(0);}// ----> DOM
},{key:"header",get:function get(){return this._header;}},{key:"body",get:function get(){return this._wrapper;}},{key:"footer",get:function get(){return this._footer;}},{key:"_Style",value:function _Style(){return{':host':{position:"relative",display:"flex",flex:"1 1 auto",'margin-bottom':"20px"},'.header':{position:"relative",flex:"0 0 auto"},'.footer':{position:"relative",flex:"0 0 auto"},'.body':{position:"relative",display:"flex",flex:"1 1 auto"},':host(.horizontal) .body':{'flex-flow':"row wrap",'align-content':"flex-start",'align-items':"flex-start"},':host(.vertical) .body':{'flex-flow':"column nowrap",'align-content':"stretch",'align-items':"stretch"}};}},{key:"_Render",value:function _Render(){this._header=UDOM.New("div",{"class":"header"},this._host);this._wrapper=UDOM.New("div",{"class":"body"},this._host);this._footer=UDOM.New("div",{"class":"footer"},this._host);}},{key:"_GetOrCreateGroup",value:function _GetOrCreateGroup(p_key){var p_flags=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_class=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;p_class=U.Default(p_class,Group);var group=this._groupMap.Get(p_key);if(!group){group=this.Add(p_class,"group tile-ctnr",this._viewport.wrapper);this._groupMap.Set(p_key,group);this._groupList.push(group);if(p_flags){for(var member in p_flags){group._flags.Set(member,p_flags[member]);}}this._OnGroupCreated(p_key,group);this._Broadcast(Group.GROUP_CREATED,this,group);}return group;}},{key:"_OnGroupCreated",value:function _OnGroupCreated(p_key,p_group){}},{key:"_ClearGroup",value:function _ClearGroup(p_key){var group=this._groupMap.Get(p_key);if(group){var index=this._groupList.indexOf(group);this._groupList.splice(index,1);this._groupMap.Remove(p_key);group.Release();}}},{key:"_ClearAllGroups",value:function _ClearAllGroups(){this._groupMap.Clear();var list=this._groupList;for(var i=0,n=list.length;i<n;i++){list[i].Release();}list.length=0;}},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(Group.prototype),"_CleanUp",this).call(this);this._ClearAllGroups();}}]);return Group;}(OrientableWidget);_defineProperty(Group,"GROUP_CREATED",Symbol("groupCreated"));module.exports["default"]=module.exports=Group;UI.Register('nkmjs-group',Group);},{"@nkmjs/collections":21,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],249:[function(require,module,exports){/**
 * Inspector role is :
 * - list the content of a data-block
 * - provide a single controls for each exposed data-block element
 * It's very basic implementation of a controller
 * It's supposed to offer editing capability for an active selection inside an editor.
 */'use strict';var _require394=require("@nkmjs/utils"),U=_require394.U;var _require395=require("@nkmjs/common"),SIGNAL=_require395.SIGNAL;var _require396=require("@nkmjs/ui-core"),UI=_require396.UI;var Control=require("./control");var Inspector=/*#__PURE__*/function(_Control2){_inherits(Inspector,_Control2);var _super151=_createSuper(Inspector);function Inspector(){_classCallCheck(this,Inspector);return _super151.call(this);}_createClass(Inspector,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Inspector.prototype),"_Init",this).call(this);this._inspectors=new Array(0);}},{key:"_Style",value:function _Style(){return U.Merge(_get(_getPrototypeOf(Inspector.prototype),"_Style",this).call(this),{':host':{position:"relative",display:"flex",'flex-flow':"column",'align-content':"stretch",'align-items':"stretch",'background-color':"rgba(0,0,0,0.0)"//'background-color':`rgba(0,0,0,0.1)`,
}});}},{key:"AddInspector",value:function AddInspector(p_cl){var p_cssSelector=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;return this._RegisterInspector(this.Add(p_cl,p_cssSelector?"group ".concat(p_cssSelector):"group"));}},{key:"_RegisterInspector",value:function _RegisterInspector(p_inspector){if(this._inspectors.includes(p_inspector)){return;}this._inspectors.push(p_inspector);return p_inspector;}},{key:"_OnDataChanged",value:function _OnDataChanged(p_oldData){_get(_getPrototypeOf(Inspector.prototype),"_OnDataChanged",this).call(this,p_oldData);for(var i=0,n=this._inspectors.length;i<n;i++){var inspector=this._inspectors[i];inspector.context=this._context;inspector.data=this._data;}if(!this._data&&!U.Void(this._context)){// --> Why ?
this.data=this._context;}}}]);return Inspector;}(Control);module.exports["default"]=module.exports=Inspector;UI.Register('nkmjs-inspector',Inspector);},{"./control":237,"@nkmjs/common":27,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],250:[function(require,module,exports){'use strict';var _require397=require("@nkmjs/utils"),U=_require397.U;var _require398=require("@nkmjs/ui-core"),UI=_require398.UI;var InspectorShell=require("./inspector-shell");var HistoryInspectorShell=/*#__PURE__*/function(_InspectorShell){_inherits(HistoryInspectorShell,_InspectorShell);var _super152=_createSuper(HistoryInspectorShell);function HistoryInspectorShell(){_classCallCheck(this,HistoryInspectorShell);return _super152.call(this);}_createClass(HistoryInspectorShell,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(HistoryInspectorShell.prototype),"_Init",this).call(this);}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(HistoryInspectorShell.prototype),"_PostInit",this).call(this);this._icon.Set(null);this._title.Set("HISTORY");this._subtitle.Set("Editor");}// ----> DOM
},{key:"_Style",value:function _Style(){return U.Merge(_get(_getPrototypeOf(HistoryInspectorShell.prototype),"_Style",this).call(this),{':host':{//'background-color':`#f5f5f5`
},'.facade':{},'.navigation':{}});}},{key:"_Render",value:function _Render(){_get(_getPrototypeOf(HistoryInspectorShell.prototype),"_Render",this).call(this);}}]);return HistoryInspectorShell;}(InspectorShell);module.exports["default"]=module.exports=HistoryInspectorShell;UI.Register("nkmjs-history-inspector-shell",HistoryInspectorShell);},{"./inspector-shell":253,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],251:[function(require,module,exports){var _require399=require("@nkmjs/utils"),U=_require399.U,UDOM=_require399.UDOM;var _require400=require("@nkmjs/ui-core"),UI_ID=_require400.UI_ID,UI=_require400.UI,UI_SIGNAL=_require400.UI_SIGNAL,ExtExpand=_require400.ExtExpand,Toolbar=_require400.Toolbar,ToolButton=_require400.ToolButton,DOMTemplate=_require400.DOMTemplate,TPLHeaderBodyFooter=_require400.TPLHeaderBodyFooter,ExtMouse=_require400.ExtMouse,UI_FLAG=_require400.UI_FLAG,MOUSE=_require400.MOUSE,TPLFacadeExpandTitle=_require400.TPLFacadeExpandTitle;var InspectorItem=require("./inspector-item");var InspectorGroup=/*#__PURE__*/function(_InspectorItem){_inherits(InspectorGroup,_InspectorItem);var _super153=_createSuper(InspectorGroup);function InspectorGroup(){var _this19;_classCallCheck(this,InspectorGroup);_this19=_super153.call(this);_this19._staticContentDefault=_this19._staticContent;return _this19;}_createClass(InspectorGroup,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(InspectorGroup.prototype),"_Init",this).call(this);this._extExpand=new ExtExpand();this._extExpand._isExpanded=false;this._extExpand.Watch(UI_SIGNAL.EXPANDED,this._Expand,this);this._extExpand.Watch(UI_SIGNAL.COLLAPSED,this._Collapse,this);this._header=null;this._expandOnHeaderAltActivation=U.Default(this._expandOnHeaderAltActivation,true);this._useGroupExpand=false;this._expandBtnClass=ToolButton;this._expandBtn=null;this._toolbarClass=Toolbar;this._toolbar=null;this._footer=null;this._staticContent=true;//Always build controllers
this._alwaysExpanded=false;//Keep group expanded after release (static content only)
this._interactions.Hook(MOUSE.BTN_LEFT,MOUSE.RELEASE_TWICE,this._Bind(this.AltActivate));}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(InspectorGroup.prototype),"_PostInit",this).call(this);this._extExpand.Setup(this,this._wrapper,this._expandIcon.element);}// ----> DOM
},{key:"staticContent",get:function get(){return this._staticContent;},set:function set(p_value){this._staticContent=p_value;}},{key:"header",get:function get(){return this._header;}},{key:"body",get:function get(){return this._body;}},{key:"footer",get:function get(){return this._footer;}},{key:"_Style",value:function _Style(){return U.Merge(_get(_getPrototypeOf(InspectorGroup.prototype),"_Style",this).call(this),{':host':{//TODO : Implement orientation in styling
position:"relative",display:"flex",'flex-flow':"column nowrap",'align-content':"stretch",'align-items':"stretch",'margin':"5px",'min-width':0},'.header':{position:"relative",display:"flex",'flex-flow':"row nowrap",'align-content':"stretch",'align-items':"stretch",'justify-content':"space-between",flex:"1 1 auto",padding:"12px"},'.expandIcon':{flex:"0 0 auto"},'.facade':{flex:"0 1 auto"},'.toolbar':{transition:"all 0.3s ease",flex:"0 0 auto",opacity:0},':host(.focused) .toolbar':{opacity:1},'.body':{position:"relative",display:"flex",'flex-flow':"column nowrap",'align-content':"stretch",'align-items':"stretch",flex:"1 1 auto"},'.group':{'min-width':0},':host(.collapsed) .body':{display:"none"},':host(.expanded) .body':{display:"flex"}});}},{key:"_Render",value:function _Render(){var _DOMTemplate$Render4;DOMTemplate.Render(TPLHeaderBodyFooter,this,_defineProperty({},UI_ID.OWNER,this));DOMTemplate.Render(TPLFacadeExpandTitle,this._header,(_DOMTemplate$Render4={},_defineProperty(_DOMTemplate$Render4,UI_ID.OWNER,this),_defineProperty(_DOMTemplate$Render4,"expandIcon",{url:"%ICON%/icon_expand_arrow.svg",htitle:"Expand"}),_DOMTemplate$Render4));this._toolbar=this.Add(this._toolbarClass,"toolbar",this._header);this._wrapper=this._body;if(this._useGroupExpand){var _this$_toolbar$Create,_this$_toolbar$Create2;this._expandAllBtn=this._toolbar.CreateHandle((_this$_toolbar$Create={},_defineProperty(_this$_toolbar$Create,UI_ID.ICON,"%ICON%/icon_expand_all.svg"),_defineProperty(_this$_toolbar$Create,"text","Expand All"),_defineProperty(_this$_toolbar$Create,"trigger",{thisArg:this,fn:this.ExpandAll}),_this$_toolbar$Create));this._collapseAllBtn=this._toolbar.CreateHandle((_this$_toolbar$Create2={},_defineProperty(_this$_toolbar$Create2,UI_ID.ICON,"%ICON%/icon_collapse_all.svg"),_defineProperty(_this$_toolbar$Create2,"text","Collapse All"),_defineProperty(_this$_toolbar$Create2,"trigger",{thisArg:this,fn:this.CollapseAll}),_this$_toolbar$Create2));}this.focusArea=this._header;}},{key:"Activate",value:function Activate(p_evt){if(this._toolbar.focused){return false;}return _get(_getPrototypeOf(InspectorGroup.prototype),"Activate",this).call(this,p_evt);}},{key:"AltActivate",value:function AltActivate(p_evt){if(this._toolbar.focused){return;}if(this._expandOnHeaderAltActivation){this._extExpand.Toggle();}}},{key:"Expand",value:function Expand(){this._extExpand.Expand();}},{key:"_Expand",value:function _Expand(){if(this._data&&!this._staticContent){this._BuildContent();}this._expandIcon.element.classList.remove(UI_FLAG.EXPANDED);this._toolbar.hidden=false;}},{key:"Collapse",value:function Collapse(){this._extExpand.Collapse();}},{key:"_Collapse",value:function _Collapse(){if(this._data&&!this._staticContent){this._ClearContent();}this._expandIcon.element.classList.add(UI_FLAG.EXPANDED);this._toolbar.hidden=true;}},{key:"ExpandAll",value:function ExpandAll(){this.Expand();var list=this._displayObjects;var child=null;for(var i=0,n=list.length;i<n;i++){child=list[i];if("Expand"in child){child.Expand();}}}},{key:"CollapseAll",value:function CollapseAll(){var list=this._displayObjects;var child=null;for(var i=0,n=list.length;i<n;i++){child=list[i];if("Collapse"in child){child.Collapse();}}}},{key:"_OnContextChanged",value:function _OnContextChanged(){var context=this._context;var list=this._displayObjects;var child=null;for(var i=0,n=list.length;i<n;i++){child=list[i];if("context"in child){child.context=context;}}}},{key:"_OnDataChanged",value:function _OnDataChanged(p_oldValue){_get(_getPrototypeOf(InspectorGroup.prototype),"_OnDataChanged",this).call(this,p_oldValue);this._ClearContent();if(this._data){if(this._staticContent){this._BuildContent();}else{if(this._extExpand.isExpanded){this._BuildContent();}else if(this._data.expanded){this._extExpand.Expand();}}if(this._alwaysExpanded){this._extExpand.Expand(false);}}else{if(!this._alwaysExpanded){this._extExpand.Collapse();}}}},{key:"_BuildContent",value:function _BuildContent(){}},{key:"_ClearContent",value:function _ClearContent(){}},{key:"_CleanUp",value:function _CleanUp(){this._toolbar.Focus(false);_get(_getPrototypeOf(InspectorGroup.prototype),"_CleanUp",this).call(this);if(!this._alwaysExpanded){this._extExpand.Collapse();}this._extExpand.activator=this._expandBtn;this._staticContent=this._staticContentDefault;}}]);return InspectorGroup;}(InspectorItem);module.exports["default"]=module.exports=InspectorGroup;UI.Register("nkmjs-inspector-group",InspectorGroup);},{"./inspector-item":252,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],252:[function(require,module,exports){var _require401=require("@nkmjs/utils"),U=_require401.U;var _require402=require("@nkmjs/ui-core"),UI=_require402.UI;var _require403=require("@nkmjs/data-core"),DATA_SIGNAL=_require403.DATA_SIGNAL;var Control=require("../control");var InspectorItem=/*#__PURE__*/function(_Control3){_inherits(InspectorItem,_Control3);var _super154=_createSuper(InspectorItem);function InspectorItem(){_classCallCheck(this,InspectorItem);return _super154.call(this);}_createClass(InspectorItem,[{key:"_Init",value:function _Init(){this._ignoreMetaStyle=U.Default(this._ignoreMetaStyle,false);this.default_SelectOnActivation=U.Default(this.default_SelectOnActivation,true);_get(_getPrototypeOf(InspectorItem.prototype),"_Init",this).call(this);if(!this._ignoreMetaStyle){this._metadataObserver.Hook(DATA_SIGNAL.META_MID_UPDATE,"presentation",this._OnMetaPresentationChanged,this);}}},{key:"_OnDataChanged",value:function _OnDataChanged(p_oldValue){_get(_getPrototypeOf(InspectorItem.prototype),"_OnDataChanged",this).call(this,p_oldValue);if(this._data){if(this._data.metadata&&!this._ignoreMetaStyle){this._UpdateMetaPresentation();}}}},{key:"_OnMetaPresentationChanged",value:function _OnMetaPresentationChanged(p_meta,p_path){this._UpdateMetaPresentation();}},{key:"_UpdateMetaPresentation",value:function _UpdateMetaPresentation(){var color=U.HexToRGBAString(this._data.metadata.Get("presentation.color","#000000"),this._data.metadata.Get("presentation.weight",0.1));this.style['box-shadow']="inset 1px 0px 0px ".concat(color);}}]);return InspectorItem;}(Control);module.exports["default"]=module.exports=InspectorItem;UI.Register("nkmjs-inspector-item",InspectorItem);},{"../control":237,"@nkmjs/data-core":52,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],253:[function(require,module,exports){/**
 * Inspector role is :
 * - list the content of a data-block
 * - provide a single controls for each exposed data-block element
 * It's very basic implementation of a controller
 * It's supposed to offer editing capability for an active selection inside an editor.
 */'use strict';var _require404=require("@nkmjs/utils"),U=_require404.U;var _require405=require("@nkmjs/common"),NFOS=_require405.NFOS,BINDINGS=_require405.BINDINGS;var _require406=require("@nkmjs/style"),CSS=_require406.CSS,FONT_FLAG=_require406.FONT_FLAG;var _require407=require("@nkmjs/ui-core"),UI_ID=_require407.UI_ID,UI=_require407.UI,UI_FLAG=_require407.UI_FLAG,View=_require407.View,DOMTemplate=_require407.DOMTemplate,TPLBodyHeaderTitles=_require407.TPLBodyHeaderTitles;var WORKSPACE_CONTEXT=require("../workspace-context");/**
 * An inspector provide micro controls for a given piece of data.
 * An inspector 'context' should be the main data wrapper of the editor it's in,
 * while its actual data is the data to be inspected.
 * 
 * The InspectorShell looks for the most suitable inspector and displays it.
 */var InspectorShell=/*#__PURE__*/function(_View5){_inherits(InspectorShell,_View5);var _super155=_createSuper(InspectorShell);function InspectorShell(){_classCallCheck(this,InspectorShell);return _super155.call(this);}_createClass(InspectorShell,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(InspectorShell.prototype),"_Init",this).call(this);this._context=null;this._inspector=null;this._flags.Add(this,UI_FLAG.FIXED_SIZE);this._flags.Set(UI_FLAG.FIXED_SIZE,true);this._icon=null;this._title=null;this._subtitle=null;this._header=null;this._body=null;}/**
     * Context data when inspector is given a selection to work with.
     * The context is always the data bound to the editor in which the inspector is displayed, if any.
     */},{key:"context",get:function get(){return this._context;},set:function set(p_value){if(this._context===p_value){return;}var oldValue=this._context;this._context=p_value;this._OnContextDataChanged(oldValue);}},{key:"_OnContextDataChanged",value:function _OnContextDataChanged(p_oldValue){if(this._inspector){this._inspector.context=this._context;}}// ----> DOM
},{key:"icon",get:function get(){return this._icon;},set:function set(p_value){this._flags.Set(UI_FLAG.NO_ICON,!this._icon.Set(p_value));}},{key:"title",get:function get(){return this._title;},set:function set(p_value){this._flags.Set(UI_FLAG.NO_LABEL,!this._title.Set(p_value));}},{key:"subtitle",get:function get(){return this._subtitle;},set:function set(p_value){this._subtitle.Set(p_value);}},{key:"header",get:function get(){return this._header;}},{key:"body",get:function get(){return this._body;}},{key:"_Style",value:function _Style(){return CSS.Extends({':host':{'display':"flex",'flex-flow':"column nowrap",'justify-content':"flex-start",'align-items':"stretch",'align-content':"stretch"// Stretches view
},':host(.fixed-size)':{'width':"350px"},'.header':{'flex':'0 0 auto'},'.body':{'flex':'1 1 auto','min-width':'0','display':"flex",'flex-flow':"column nowrap",'justify-content':"flex-start",'align-items':"stretch"},'.inspector':{'flex':'1 1 auto'}},_get(_getPrototypeOf(InspectorShell.prototype),"_Style",this).call(this));}},{key:"_Render",value:function _Render(){var _DOMTemplate$Render5;DOMTemplate.Render(TPLBodyHeaderTitles,this,(_DOMTemplate$Render5={},_defineProperty(_DOMTemplate$Render5,UI_ID.OWNER,this),_defineProperty(_DOMTemplate$Render5,UI_ID.ICON,_defineProperty({},UI_ID.CSS_CL,UI_FLAG.SIZE_S)),_defineProperty(_DOMTemplate$Render5,UI_ID.SUBTITLE,_defineProperty({},UI_ID.CSS_CL,FONT_FLAG.SMALL)),_DOMTemplate$Render5));}//
},{key:"_OnDataChanged",value:function _OnDataChanged(p_oldValue){_get(_getPrototypeOf(InspectorShell.prototype),"_OnDataChanged",this).call(this,p_oldValue);if(this._inspector){// Get rid of the current inspector
this._inspector.Release();this._inspector=null;}if(!this._data){// TODO : Fall back to context ?
this._title.Set("(NO_DATA)");this._subtitle.Set("---");return;}this._title.Set(this._data.id);var ctr=this._data.constructor,nfos=NFOS.Get(this._data);if(nfos){this._subtitle.Set(nfos);this._icon.Set(nfos);}else{this._subtitle.Set(ctr.name);this._icon.Set(null);//TODO : Swap for a '?' icon
}var cl=BINDINGS.Get(WORKSPACE_CONTEXT.DEFAULT_INSPECTOR,ctr);if(!cl){return;}this._inspector=this.Add(cl,"inspector",this._body);this._inspector.context=this._context;this._inspector.data=this._data;}}]);return InspectorShell;}(View);_defineProperty(InspectorShell,"__NFO__",NFOS.Ext({css:["@/views/inspector-shell.css"]},View,['css']));module.exports["default"]=module.exports=InspectorShell;UI.Register('nkmjs-inspector-shell',InspectorShell);},{"../workspace-context":263,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],254:[function(require,module,exports){var _require408=require("@nkmjs/utils"),U=_require408.U;var _require409=require("@nkmjs/collections"),Dictionary=_require409.Dictionary;var _require410=require("@nkmjs/common"),BINDINGS=_require410.BINDINGS,COM_ID=_require410.COM_ID;var _require411=require("@nkmjs/ui-core"),UI=_require411.UI;var InspectorGroup=require("./inspector-group");var MetaControlItem=require("./meta-control-item");var _expandedMetaPaths=new Dictionary();var MetaControlGroup=/*#__PURE__*/function(_InspectorGroup){_inherits(MetaControlGroup,_InspectorGroup);var _super156=_createSuper(MetaControlGroup);function MetaControlGroup(){_classCallCheck(this,MetaControlGroup);return _super156.call(this);}_createClass(MetaControlGroup,[{key:"_Init",value:function _Init(){this._ignoreMetaStyle=true;this.default_SelectOnActivation=false;_get(_getPrototypeOf(MetaControlGroup.prototype),"_Init",this).call(this);this._staticContent=false;this._metaPath='';this._metaID='';this._subCtrls=new Array(0);}// ----> DOM
},{key:"_Style",value:function _Style(){return U.Merge(_get(_getPrototypeOf(MetaControlGroup.prototype),"_Style",this).call(this),{':host':{margin:"5px"},'.header':{'justify-content':"center",padding:"6px"},'.facade':{flex:"1 1 auto"}});}},{key:"metaPath",get:function get(){return this._metaPath;},set:function set(p_value){this._metaPath=p_value;}},{key:"_metaKey",get:function get(){return this._data?"@".concat(this._data.constructor).concat(this._metaPath):"@".concat(this._metaPath);}},{key:"metaID",get:function get(){return this._metaID;},set:function set(p_value){this._metaID=p_value;this._facade.text=p_value;}},{key:"_Expand",value:function _Expand(){_get(_getPrototypeOf(MetaControlGroup.prototype),"_Expand",this).call(this);MetaControlGroup.TogglePathExpansion(this._metaKey,true);}},{key:"_Collapse",value:function _Collapse(){if(this._data){MetaControlGroup.TogglePathExpansion(this._metaKey,false);}_get(_getPrototypeOf(MetaControlGroup.prototype),"_Collapse",this).call(this);}},{key:"_OnDataChanged",value:function _OnDataChanged(p_oldValue){_get(_getPrototypeOf(MetaControlGroup.prototype),"_OnDataChanged",this).call(this,p_oldValue);if(this._data){var result=MetaControlGroup.IsPathExpanded(this._metaKey);if(result){this.Expand();}}}},{key:"_BuildContent",value:function _BuildContent(){_get(_getPrototypeOf(MetaControlGroup.prototype),"_BuildContent",this).call(this);var mData=this._data.metadata;var obj=U.Empty(this._metaPath)?mData._data:mData.Get(this._metaPath,null);if(obj){if(U.isObject(obj)){for(var member in obj){var mPath=U.Empty(this._metaPath)?"".concat(member):"".concat(this._metaPath,".").concat(member),value=obj[member],ctrlClass=BINDINGS.Get("".concat(COM_ID.METAPREFIX).concat(mPath),this._data.constructor,U.isObject(value)?MetaControlGroup:MetaControlItem),ctrl=this.Add(ctrlClass,"group");//if(!ctrl){continue;}
ctrl.metaID=member;ctrl.metaPath=mPath;ctrl.context=this._context;ctrl.data=this._data;this._subCtrls.push(ctrl);}}else{/* This should not happen */}}else{/* Object is null */}}},{key:"_ClearContent",value:function _ClearContent(){while(this._subCtrls.length!=0){this._subCtrls.pop().Release();}}},{key:"_CleanUp",value:function _CleanUp(){this._metaPath='';_get(_getPrototypeOf(MetaControlGroup.prototype),"_CleanUp",this).call(this);}}],[{key:"TogglePathExpansion",value:function TogglePathExpansion(p_path,p_toggle){if(p_toggle){_expandedMetaPaths.Set(p_path,true);}else{_expandedMetaPaths.Remove(p_path);}}},{key:"IsPathExpanded",value:function IsPathExpanded(p_path){return _expandedMetaPaths.Get(p_path);}}]);return MetaControlGroup;}(InspectorGroup);module.exports["default"]=module.exports=MetaControlGroup;UI.Register("nkmjs-meta-control-group",MetaControlGroup);},{"./inspector-group":251,"./meta-control-item":255,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],255:[function(require,module,exports){var _require412=require("@nkmjs/utils"),U=_require412.U,UDOM=_require412.UDOM;var _require413=require("@nkmjs/ui-core"),UI_ID=_require413.UI_ID,UI=_require413.UI,TextManipulator=_require413.TextManipulator;var _require414=require("@nkmjs/data-core"),Metadata=_require414.Metadata,ActionMetadataSet=_require414.ActionMetadataSet;var _require415=require("@nkmjs/ui-inputs"),INPUT_SIGNAL=_require415.INPUT_SIGNAL,InputField=_require415.InputField;var InspectorItem=require("./inspector-item");var MetaControlItem=/*#__PURE__*/function(_InspectorItem2){_inherits(MetaControlItem,_InspectorItem2);var _super157=_createSuper(MetaControlItem);function MetaControlItem(){_classCallCheck(this,MetaControlItem);return _super157.call(this);}_createClass(MetaControlItem,[{key:"_Init",value:function _Init(){this.default_SelectOnActivation=false;this._ignoreMetaStyle=true;_get(_getPrototypeOf(MetaControlItem.prototype),"_Init",this).call(this);this._metaPath='';this._metaID='';this._inputClass=InputField;this._input=null;this._label=null;}// ----> DOM
},{key:"_Style",value:function _Style(){return U.Merge(_get(_getPrototypeOf(MetaControlItem.prototype),"_Style",this).call(this),{':host':{margin:"5px",padding:"6px",display:"flex",'flex-flow':"column",'align-items':"stretch",'align-content':"stretch"},'.facade':{flex:"1 1 auto",'margin-top':"-5px",'margin-bottom':"0px"},'.control':{flex:"1 1 auto"}});}},{key:"_Render",value:function _Render(){_get(_getPrototypeOf(MetaControlItem.prototype),"_Render",this).call(this);this._label=new TextManipulator(UDOM.New("span",{"class":UI_ID.LABEL},this._host));}},{key:"metaPath",get:function get(){return this._metaPath;},set:function set(p_value){this._metaPath=p_value;}},{key:"metaID",get:function get(){return this._metaID;},set:function set(p_value){this._metaID=p_value;this._facade.text=p_value;}},{key:"_OnDataChanged",value:function _OnDataChanged(p_oldValue){_get(_getPrototypeOf(MetaControlItem.prototype),"_OnDataChanged",this).call(this,p_oldValue);if(this._input){this._input.Release();this._input=null;}if(!this._data){return;}var mData=U.isInstanceOf(this._data,Metadata)?this._data:this._data.metadata;var obj=mData.Get(this._metaPath,null);if(U.Void(obj)){return;}this._input=this.Add(this._inputClass,"control");this._OnInputCreated(this._input);this._input.Watch(INPUT_SIGNAL.VALUE_SUBMITTED,this._OnInputValueCommited,this);this._input.currentValue=obj;}},{key:"_OnInputCreated",value:function _OnInputCreated(p_input){}},{key:"_OnInputValueCommited",value:function _OnInputValueCommited(p_input,p_changedValue){var mData=U.isInstanceOf(this._data,Metadata)?this._data:this._data.metadata;var mPath=this._metaPath;this._Do(ActionMetadataSet,{target:mData,path:mPath,value:p_changedValue});this._input.currentValue=mData.Get(mPath,undefined);}},{key:"_CleanUp",value:function _CleanUp(){this._metaPath='';_get(_getPrototypeOf(MetaControlItem.prototype),"_CleanUp",this).call(this);}}]);return MetaControlItem;}(InspectorItem);module.exports["default"]=module.exports=MetaControlItem;UI.Register("nkmjs-meta-control-item",MetaControlItem);},{"./inspector-item":252,"@nkmjs/data-core":52,"@nkmjs/ui-core":166,"@nkmjs/ui-inputs":218,"@nkmjs/utils":268}],256:[function(require,module,exports){var _require416=require("@nkmjs/utils"),U=_require416.U,PATH=_require416.PATH;var _require417=require("@nkmjs/common"),NFOS=_require417.NFOS;var _require418=require("@nkmjs/data-core"),DataBlock=_require418.DataBlock,CatalogItem=_require418.CatalogItem;var _require419=require("@nkmjs/style"),CSS=_require419.CSS,FONT_FLAG=_require419.FONT_FLAG;var _require420=require("@nkmjs/ui-core"),UI_ID=_require420.UI_ID,UI=_require420.UI,UI_FLAG=_require420.UI_FLAG,ButtonBase=_require420.ButtonBase,DOMTemplate=_require420.DOMTemplate,TPLFacadeLabel=_require420.TPLFacadeLabel;var BreadcrumbItem=/*#__PURE__*/function(_ButtonBase3){_inherits(BreadcrumbItem,_ButtonBase3);var _super158=_createSuper(BreadcrumbItem);function BreadcrumbItem(){_classCallCheck(this,BreadcrumbItem);return _super158.call(this);}_createClass(BreadcrumbItem,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(BreadcrumbItem.prototype),"_Init",this).call(this);this._optionsHandler.Hook(UI_ID.ICON,null,"");this._optionsHandler.Hook(UI_ID.LABEL,null,"");this._alwaysDisplayCommand=true;this._icon=null;this._label=null;}// ----> DOM
},{key:"icon",get:function get(){return this._icon;},set:function set(p_value){this._flags.Set(UI_FLAG.NO_ICON,!this._icon.Set(p_value));}},{key:"label",get:function get(){return this._label;},set:function set(p_value){this._flags.Set(UI_FLAG.NO_LABEL,!this._label.Set(p_value));}},{key:"_Render",value:function _Render(){var _DOMTemplate$Render6;DOMTemplate.Render(TPLFacadeLabel,this,(_DOMTemplate$Render6={},_defineProperty(_DOMTemplate$Render6,UI_ID.OWNER,this),_defineProperty(_DOMTemplate$Render6,UI_ID.LABEL,_defineProperty({},UI_ID.CSS_CL,FONT_FLAG.REGULAR)),_DOMTemplate$Render6));this.focusArea=this;}},{key:"_OnDataUpdated",value:function _OnDataUpdated(p_data){_get(_getPrototypeOf(BreadcrumbItem.prototype),"_OnDataUpdated",this).call(this,p_data);//this._label.Set(this._data);
}}]);return BreadcrumbItem;}(ButtonBase);_defineProperty(BreadcrumbItem,"__NFO__",NFOS.Ext({css:["@/items/breadcrum-item.css"]},ButtonBase,['css']));module.exports["default"]=module.exports=BreadcrumbItem;UI.Register("nkmjs-breadcrum-item",BreadcrumbItem);},{"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],257:[function(require,module,exports){var _require421=require("@nkmjs/utils"),U=_require421.U;var _require422=require("@nkmjs/common"),NFOS=_require422.NFOS;var _require423=require("@nkmjs/style"),CSS=_require423.CSS;var _require424=require("@nkmjs/ui-core"),UI=_require424.UI,Toolbar=_require424.Toolbar;var BreadcrumbItem=require("./breadcrumb-item");var Breadcrumb=/*#__PURE__*/function(_Toolbar2){_inherits(Breadcrumb,_Toolbar2);var _super159=_createSuper(Breadcrumb);function Breadcrumb(){_classCallCheck(this,Breadcrumb);return _super159.call(this);}_createClass(Breadcrumb,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Breadcrumb.prototype),"_Init",this).call(this);this._defaultButtonClass=BreadcrumbItem;}// ----> DOM
},{key:"_Style",value:function _Style(){return CSS.Extends({':host':{},':host(.vertical)':{'align-content':"flex-end"},':host(.horizontal)':{'align-content':"flex-end"}},_get(_getPrototypeOf(Breadcrumb.prototype),"_Style",this).call(this));}}]);return Breadcrumb;}(Toolbar);_defineProperty(Breadcrumb,"__NFO__",NFOS.Ext({css:["@/items/breadcrum.css"]},Toolbar,['css']));module.exports["default"]=module.exports=Breadcrumb;UI.Register('nkmjs-breadcrum',Breadcrumb);},{"./breadcrumb-item":256,"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],258:[function(require,module,exports){'use strict';var _require425=require("@nkmjs/ui-core"),UI=_require425.UI,Widget=_require425.Widget;var StatusBar=/*#__PURE__*/function(_Widget7){_inherits(StatusBar,_Widget7);var _super160=_createSuper(StatusBar);function StatusBar(){_classCallCheck(this,StatusBar);return _super160.call(this);}return StatusBar;}(Widget);module.exports["default"]=module.exports=StatusBar;UI.Register("nkmjs-status-bar",StatusBar);},{"@nkmjs/ui-core":166}],259:[function(require,module,exports){'use strict';var _require426=require("@nkmjs/utils"),U=_require426.U;var _require427=require("@nkmjs/common"),NFOS=_require427.NFOS,SIGNAL=_require427.SIGNAL,COMMON_FLAG=_require427.COMMON_FLAG;var _require428=require("@nkmjs/environment"),ENV=_require428.ENV;var _require429=require("@nkmjs/style"),CSS=_require429.CSS;var _require430=require("@nkmjs/data-core"),DATA_SIGNAL=_require430.DATA_SIGNAL,DataObserver=_require430.DataObserver,CATALOG_SIGNAL=_require430.CATALOG_SIGNAL;var _require431=require("@nkmjs/ui-core"),UI_ID=_require431.UI_ID,UI=_require431.UI,MOUSE=_require431.MOUSE,UI_SIGNAL=_require431.UI_SIGNAL,Widget=_require431.Widget,DOMTemplate=_require431.DOMTemplate,ExtMouse=_require431.ExtMouse,UI_FLAG=_require431.UI_FLAG,FlagEnum=_require431.FlagEnum,ImageManipulator=_require431.ImageManipulator,TextManipulator=_require431.TextManipulator,CatalogWidget=_require431.CatalogWidget;var TPLFacadeTab=require("../templates/tpl-facade-tab");var Tab=/*#__PURE__*/function(_CatalogWidget2){_inherits(Tab,_CatalogWidget2);var _super161=_createSuper(Tab);function Tab(){_classCallCheck(this,Tab);return _super161.call(this);}_createClass(Tab,[{key:"_Init",value:// ----> Init
function _Init(){_get(_getPrototypeOf(Tab.prototype),"_Init",this).call(this);this._Bind(this._CloseRequest);this._closeBtn=this._interactions.Add(ExtMouse);this._closeBtn.Hook(MOUSE.BTN_LEFT,MOUSE.RELEASE,this._CloseRequest);this._interactions.Hook(MOUSE.BTN_MIDDLE,MOUSE.RELEASE,this._CloseRequest);}// ----> DOM
/**
     * @returns {ImageManipulator}
     */},{key:"icon",get:function get(){return this._icon;}/**
     * @param {*} p_value
     */,set:function set(p_value){this._icon.Set(p_value);}/**
     * @returns {TextManipulator}
     */},{key:"label",get:function get(){return this._label;}/**
     * @param {string} p_value
     */,set:function set(p_value){this._label.Set(p_value);}/**
     * @returns {ImageManipulator}
     */},{key:"closeIcon",get:function get(){return this._closeIcon;}/**
     * @param {*} p_value
     */,set:function set(p_value){this._closeIcon.Set(p_value);}},{key:"_Style",value:function _Style(){return CSS.Extends({':host':{'position':"relative",'display':"flex",'flex-flow':"row nowrap",'align-items':"center",'align-content':"stretch"}},_get(_getPrototypeOf(Tab.prototype),"_Style",this).call(this));}},{key:"_Render",value:function _Render(){var _DOMTemplate$Render7;DOMTemplate.Render(TPLFacadeTab,this,(_DOMTemplate$Render7={},_defineProperty(_DOMTemplate$Render7,UI_ID.OWNER,this),_defineProperty(_DOMTemplate$Render7,"closeIcon",{htitle:"Close"}),_DOMTemplate$Render7));if(!ENV.FEATURES.isTouchEnabled){this._closeIcon.element.style.opacity=0;}this.focusArea=this;this._closeBtn.element=this._closeIcon.element;}//
},{key:"Activate",value:function Activate(p_evt){if(this._closeBtn.isMouseOver){return false;}return _get(_getPrototypeOf(Tab.prototype),"Activate",this).call(this,p_evt);}//
},{key:"_HighlightGain",value:function _HighlightGain(){if(!ENV.FEATURES.isTouchEnabled){this._closeIcon.element.style.removeProperty("opacity");}}},{key:"_HighlightLost",value:function _HighlightLost(){if(!ENV.FEATURES.isTouchEnabled){this._closeIcon.element.style.opacity=0;}}},{key:"_CloseRequest",value:function _CloseRequest(){if(!this._isActivable){return;}this._Broadcast(UI_SIGNAL.CLOSE_REQUESTED,this);}// ----> DATA    
},{key:"_UpdateInfos",value:function _UpdateInfos(){if(this._itemData){this._flavorEnum.Set(this._itemData.isDirty?COMMON_FLAG.WARNING:null);if(!this._label.Set(this._itemData)){this._label.Set(this._data.options);}if(!this._icon.Set(this._itemData)){this._icon.Set(this._data.options);}}else{this._flavorEnum.Set(null);this._label.Set(this._data.options);this._icon.Set(this._data.options);}}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(Tab.prototype),"_CleanUp",this).call(this);}}]);return Tab;}(CatalogWidget);_defineProperty(Tab,"__NFO__",NFOS.Ext({css:["@/items/tab.css"]},Widget,['css']));module.exports["default"]=module.exports=Tab;UI.Register("nkmjs-tab",Tab);},{"../templates/tpl-facade-tab":262,"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/environment":92,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],260:[function(require,module,exports){'use strict';var _require432=require("@nkmjs/common"),NFOS=_require432.NFOS;var _require433=require("@nkmjs/style"),FONT_FLAG=_require433.FONT_FLAG;var _require434=require("@nkmjs/ui-core"),UI=_require434.UI,UI_FLAG=_require434.UI_FLAG,FlagEnum=_require434.FlagEnum,Widget=_require434.Widget,TextManipulator=_require434.TextManipulator,UI_ID=_require434.UI_ID;var _require435=require("@nkmjs/utils"),UDOM=_require435.UDOM;var Tag=/*#__PURE__*/function(_Widget8){_inherits(Tag,_Widget8);var _super162=_createSuper(Tag);function Tag(){_classCallCheck(this,Tag);return _super162.call(this);}_createClass(Tag,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Tag.prototype),"_Init",this).call(this);this._sizeEnum=new FlagEnum(UI_FLAG.sizes);this._sizeEnum.Add(this);this._flavorEnum=new FlagEnum(UI_FLAG.flavorsExtended);this._flavorEnum.Add(this);}},{key:"size",get:function get(){return this._sizeEnum.currentFlag;},set:function set(p_value){this._sizeEnum.Set(p_value);}},{key:"flavor",get:function get(){return this._flavorEnum.currentFlag;}// ----> DOM
,set:function set(p_value){this._flavorEnum.Set(p_value);}},{key:"label",get:function get(){return this._label;},set:function set(p_value){this._label.Set(p_value);}},{key:"_Render",value:function _Render(){this._label=new TextManipulator(UDOM.New("span",{"class":"".concat(UI_ID.LABEL," ").concat(FONT_FLAG.TAG)},this),false);}}]);return Tag;}(Widget);_defineProperty(Tag,"__NFO__",NFOS.Ext({css:["@/items/tag.css"]},Widget,['css']));module.exports["default"]=module.exports=Tag;UI.Register("nkmjs-tag",Tag);},{"@nkmjs/common":27,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],261:[function(require,module,exports){'use strict';var _require436=require("@nkmjs/utils"),U=_require436.U;var _require437=require("@nkmjs/ui-core"),UI=_require437.UI,LayerContainer=_require437.LayerContainer;var Shell=/*#__PURE__*/function(_LayerContainer2){_inherits(Shell,_LayerContainer2);var _super163=_createSuper(Shell);function Shell(){_classCallCheck(this,Shell);return _super163.call(this);}_createClass(Shell,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Shell.prototype),"_Init",this).call(this);}}]);return Shell;}(LayerContainer);module.exports["default"]=module.exports=Shell;UI.Register("nkmjs-shell",Shell);},{"@nkmjs/ui-core":166,"@nkmjs/utils":268}],262:[function(require,module,exports){'use strict';var _require438=require("@nkmjs/utils"),U=_require438.U,UDOM=_require438.UDOM;var _require439=require("@nkmjs/ui-core"),UI_ID=_require439.UI_ID,DOMTemplate=_require439.DOMTemplate,ImageManipulator=_require439.ImageManipulator,TextManipulator=_require439.TextManipulator;var __closeIcon="_closeIcon";var __icon="_".concat(UI_ID.ICON);var __label="_".concat(UI_ID.LABEL);var TPLFacadeTab=/*#__PURE__*/function(_DOMTemplate8){_inherits(TPLFacadeTab,_DOMTemplate8);var _super164=_createSuper(TPLFacadeTab);function TPLFacadeTab(){var _this20;_classCallCheck(this,TPLFacadeTab);_this20=_super164.call(this);;return _this20;}/*

    get closeIcon() { return this._closeIcon; }
    set closeIcon(p_value) { this._closeIcon.Set(p_value); }

    get icon() { return this._icon; }
    set icon(p_value) { this._flags.Set(UI_FLAG.NO_ICON, !this._icon.Set(p_value)); }

    get label() { return this._label; }
    set label(p_value) {  this._flags.Set(UI_FLAG.NO_LABEL, !this._label.Set(p_value)); }

    */_createClass(TPLFacadeTab,[{key:"Render",value:function Render(p_host){var p_options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var owner=_get(_getPrototypeOf(TPLFacadeTab.prototype),"Render",this).call(this,p_host,p_options),iconOpts=U.Get(p_options,UI_ID.ICON,null),labelOpts=U.Get(p_options,UI_ID.TITLE,null),closeIconOpts=U.Get(p_options,"closeIcon",null),icon=owner[__icon]=new ImageManipulator(owner[__icon],iconOpts&&"autoHide"in iconOpts?iconOpts.autoHide:true),label=owner[__label]=new TextManipulator(owner[__label],labelOpts&&"autoHide"in labelOpts?labelOpts.autoHide:false),closeIcon=owner[__closeIcon]=new ImageManipulator(owner[__closeIcon],closeIconOpts&&"autoHide"in closeIconOpts?closeIconOpts.autoHide:false);if(iconOpts){icon.Set(iconOpts);if(iconOpts[UI_ID.CSS_CL]){icon.element.classList.add(iconOpts[UI_ID.CSS_CL]);}}if(labelOpts){label.Set(labelOpts);if(labelOpts[UI_ID.CSS_CL]){label.element.classList.add(labelOpts[UI_ID.CSS_CL]);}}if(closeIconOpts){closeIcon.Set(closeIconOpts.url);if(closeIconOpts.htitle){closeIcon.element.title=closeIconOpts.htitle;}if(closeIconOpts[UI_ID.CSS_CL]){closeIcon.element.classList.add(closeIconOpts[UI_ID.CSS_CL]);}}return owner;}}],[{key:"_CreateTemplate",value:function _CreateTemplate(){_get(_getPrototypeOf(TPLFacadeTab),"_CreateTemplate",this).call(this);this._Add(UDOM.New("span",{"class":UI_ID.ICON}),__icon);this._Add(UDOM.New("span",{"class":UI_ID.LABEL}),__label);this._Add(UDOM.New("span",{"class":"".concat(UI_ID.ICON," close")}),__closeIcon);}}]);return TPLFacadeTab;}(DOMTemplate);module.exports["default"]=module.exports=TPLFacadeTab;},{"@nkmjs/ui-core":166,"@nkmjs/utils":268}],263:[function(require,module,exports){'use strict';var _require440=require("@nkmjs/common"),CSYMBOL=_require440.CSYMBOL;/**
 * Using Class as key in order to support @nkmjs-common BINDINGS
 */var EDITOR=/*#__PURE__*/function(_CSYMBOL5){_inherits(EDITOR,_CSYMBOL5);var _super165=_createSuper(EDITOR);function EDITOR(){_classCallCheck(this,EDITOR);return _super165.call(this);}return EDITOR;}(CSYMBOL);var DEFAULT_EDITOR=/*#__PURE__*/function(_EDITOR){_inherits(DEFAULT_EDITOR,_EDITOR);var _super166=_createSuper(DEFAULT_EDITOR);function DEFAULT_EDITOR(){_classCallCheck(this,DEFAULT_EDITOR);return _super166.call(this);}return DEFAULT_EDITOR;}(EDITOR);var INSPECTOR=/*#__PURE__*/function(_CSYMBOL6){_inherits(INSPECTOR,_CSYMBOL6);var _super167=_createSuper(INSPECTOR);function INSPECTOR(){_classCallCheck(this,INSPECTOR);return _super167.call(this);}return INSPECTOR;}(CSYMBOL);var DEFAULT_INSPECTOR=/*#__PURE__*/function(_INSPECTOR){_inherits(DEFAULT_INSPECTOR,_INSPECTOR);var _super168=_createSuper(DEFAULT_INSPECTOR);function DEFAULT_INSPECTOR(){_classCallCheck(this,DEFAULT_INSPECTOR);return _super168.call(this);}return DEFAULT_INSPECTOR;}(INSPECTOR);var EDITOR_IN_PLACE=/*#__PURE__*/function(_CSYMBOL7){_inherits(EDITOR_IN_PLACE,_CSYMBOL7);var _super169=_createSuper(EDITOR_IN_PLACE);function EDITOR_IN_PLACE(){_classCallCheck(this,EDITOR_IN_PLACE);return _super169.call(this);}return EDITOR_IN_PLACE;}(CSYMBOL);module.exports["default"]=module.exports={EDITOR:EDITOR,DEFAULT_EDITOR:DEFAULT_EDITOR,INSPECTOR:INSPECTOR,DEFAULT_INSPECTOR:DEFAULT_INSPECTOR,EDITOR_IN_PLACE:EDITOR_IN_PLACE};},{"@nkmjs/common":27}],264:[function(require,module,exports){'use strict';var _require441=require("@nkmjs/utils"),U=_require441.U;var _require442=require("@nkmjs/common"),NFOS=_require442.NFOS;var _require443=require("@nkmjs/ui-core"),UI_ID=_require443.UI_ID,UI=_require443.UI,DrawerNav=_require443.DrawerNav;var Tab=require("../items/tab");var WorkspaceCellNav=/*#__PURE__*/function(_DrawerNav2){_inherits(WorkspaceCellNav,_DrawerNav2);var _super170=_createSuper(WorkspaceCellNav);function WorkspaceCellNav(){_classCallCheck(this,WorkspaceCellNav);return _super170.call(this);}_createClass(WorkspaceCellNav,[{key:"_Init",value:// ----> Init
function _Init(){_get(_getPrototypeOf(WorkspaceCellNav.prototype),"_Init",this).call(this);this._defaultButtonClass=Tab;this._cellOptionsBtn=null;}// ----> DOM
},{key:"_Render",value:function _Render(){var _this$_toolbar$Create3;_get(_getPrototypeOf(WorkspaceCellNav.prototype),"_Render",this).call(this);this._cellOptionsBtn=this._toolbar.CreateHandle((_this$_toolbar$Create3={},_defineProperty(_this$_toolbar$Create3,UI_ID.ICON,"%ICON%/icon_more.svg"),_defineProperty(_this$_toolbar$Create3,"text","More Actions..."),_defineProperty(_this$_toolbar$Create3,"trigger",{thisArg:this,fn:this._OpenSettings}),_this$_toolbar$Create3));/*
        for( let i = 0; i < 3; i++){this._toolbar.CreateHandle({
            text:`Fake ${i}`,
            trigger:{ thisArg:this, fn:this._OpenSettings}});
        }
        */}},{key:"_OpenSettings",value:function _OpenSettings(){}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(WorkspaceCellNav.prototype),"_CleanUp",this).call(this);}}]);return WorkspaceCellNav;}(DrawerNav);_defineProperty(WorkspaceCellNav,"__NFO__",NFOS.Ext({css:["@/views/workspace-cell-nav.css"]},DrawerNav,['css']));module.exports["default"]=module.exports=WorkspaceCellNav;UI.Register('nkmjs-workspace-cell-nav',WorkspaceCellNav);},{"../items/tab":259,"@nkmjs/common":27,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],265:[function(require,module,exports){'use strict';var _require444=require("@nkmjs/utils"),U=_require444.U;var _require445=require("@nkmjs/common"),NFOS=_require445.NFOS;var _require446=require("@nkmjs/data-core"),Catalog=_require446.Catalog,CatalogItem=_require446.CatalogItem;var _require447=require("@nkmjs/ui-core"),UI=_require447.UI,UI_FLAG=_require447.UI_FLAG,Drawer=_require447.Drawer;var WorkspaceCellNav=require("./workspace-cell-nav");var WorkspaceCell=/*#__PURE__*/function(_Drawer2){_inherits(WorkspaceCell,_Drawer2);var _super171=_createSuper(WorkspaceCell);function WorkspaceCell(){_classCallCheck(this,WorkspaceCell);return _super171.call(this);}_createClass(WorkspaceCell,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(WorkspaceCell.prototype),"_Init",this).call(this);this._navClass=WorkspaceCellNav;this._isCollapsable=false;}/**
     * Create a view & a nav item from a catalogItem
     * @param {CatalogHandler} p_handler 
     * @param {data.core.catalog.CatalogItem} p_item 
     */},{key:"_OnCatalogItemAdded",value:function _OnCatalogItemAdded(p_handler,p_item,p_mappedView){if(!U.isInstanceOf(p_item,CatalogItem)){throw new Error("non-catalog item added to workspace cell catalog.");}else if(U.isInstanceOf(p_item,Catalog)){throw new Error("Full catalog item added to workspace cell catalog.");}return _get(_getPrototypeOf(WorkspaceCell.prototype),"_OnCatalogItemAdded",this).call(this,p_handler,p_item,p_mappedView);}},{key:"_OnViewAdded",value:function _OnViewAdded(p_item,p_control,p_view){_get(_getPrototypeOf(WorkspaceCell.prototype),"_OnViewAdded",this).call(this,p_item,p_control,p_view);p_view.RequestDisplay();}}]);return WorkspaceCell;}(Drawer);_defineProperty(WorkspaceCell,"__NFO__",NFOS.Ext({css:["@/views/workspace-cell.css"]},Drawer,['css']));_defineProperty(WorkspaceCell,"__default_orientation",UI_FLAG.HORIZONTAL);module.exports["default"]=module.exports=WorkspaceCell;UI.Register('nkmjs-workspace-cell',WorkspaceCell);},{"./workspace-cell-nav":264,"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],266:[function(require,module,exports){'use strict';var _require448=require("@nkmjs/utils"),U=_require448.U,LOG=_require448.LOG;var _require449=require("@nkmjs/actions"),RELAY=_require449.RELAY,ACTION_REQUEST=_require449.ACTION_REQUEST;var _require450=require("@nkmjs/common"),BINDINGS=_require450.BINDINGS;var _require451=require("@nkmjs/data-core"),Catalog=_require451.Catalog;var _require452=require("@nkmjs/ui-core"),UI=_require452.UI;var WORKSPACE_CONTEXT=require("../workspace-context");var Workspace=require("./workspace.js");var RootWorkspace=/*#__PURE__*/function(_Workspace){_inherits(RootWorkspace,_Workspace);var _super172=_createSuper(RootWorkspace);function RootWorkspace(){_classCallCheck(this,RootWorkspace);return _super172.call(this);}// ----> Init
_createClass(RootWorkspace,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(RootWorkspace.prototype),"_Init",this).call(this);this._rootCatalog=new Catalog();this._rootCatalog.GetOrCreateCatalog({name:'RootCell'});}},{key:"_PostInit",value:function _PostInit(){_get(_getPrototypeOf(RootWorkspace.prototype),"_PostInit",this).call(this);RELAY.Watch(ACTION_REQUEST.EDIT,this._HandleEditRequest,this);RELAY.Watch(ACTION_REQUEST.OPEN,this._HandleOpenRequest,this);RELAY.Watch(ACTION_REQUEST.CREATE,this._HandleCreateRequest,this);this.catalog=this._rootCatalog;}},{key:"rootCatalog",get:function get(){return this._rootCatalog;}// ----> Rendering
},{key:"_Style",value:function _Style(){return U.Merge(_get(_getPrototypeOf(RootWorkspace.prototype),"_Style",this).call(this),{':host':{position:"relative",width:"1px",//!important dirty fix
//height:`100%`,
flex:"1 1 auto",display:"flex"}});}// ----> Request handling
},{key:"_HandleEditRequest",value:function _HandleEditRequest(p_request){if(p_request.handled){return;}var editTarget=p_request.GetOption("data",null),editorClass=p_request.GetOption("editor",null);if(!editTarget){p_request.HandleFail("Editing request has no data.");return;}//TODO : Check if the edit target is already being edited
//TODO : Check if an editor class or reference is specified in the request
if(editorClass){editorClass=BINDINGS.Get(editorClass,editTarget,editorClass);}else{editorClass=BINDINGS.Get(WORKSPACE_CONTEXT.DEFAULT_EDITOR,editTarget);}if(!editorClass){p_request.HandleFail("Could not find editor association for ".concat(editTarget,"."));return;}LOG._("Editing request for ".concat(editTarget," will be handled using ").concat(editorClass.name));this.Host({data:editTarget,viewType:editorClass,name:editTarget.id.name});p_request.HandleSuccess(this);//TODO : Check if there is an editor specified
//if not : 
//find the list of available editor for the request's data
//if there are multiple editor available, open the workbench
//If specified :
//find the list of available editors
//if there are multiple editor available, open the workbench and then open the desired editor
}},{key:"_HandleOpenRequest",value:function _HandleOpenRequest(p_request){//TODO, Fairly same as EDIT ?
}},{key:"_HandleCreateRequest",value:function _HandleCreateRequest(p_request){// TODO
}}]);return RootWorkspace;}(Workspace);module.exports["default"]=module.exports=RootWorkspace;UI.Register("nkmjs-root-workspace",RootWorkspace);},{"../workspace-context":263,"./workspace.js":267,"@nkmjs/actions":1,"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],267:[function(require,module,exports){'use strict';var _require453=require("@nkmjs/utils"),U=_require453.U;var _require454=require("@nkmjs/collections"),List=_require454.List;var _require455=require("@nkmjs/common"),NFOS=_require455.NFOS,POOL=_require455.POOL,SIGNAL=_require455.SIGNAL;var _require456=require("@nkmjs/data-core"),CatalogItem=_require456.CatalogItem,Catalog=_require456.Catalog,CatalogHandler=_require456.CatalogHandler;var _require457=require("@nkmjs/ui-core"),UI=_require457.UI,UI_SIGNAL=_require457.UI_SIGNAL,View=_require457.View;var WorkspaceCell=require("./workspace-cell");var Workspace=/*#__PURE__*/function(_View6){_inherits(Workspace,_View6);var _super173=_createSuper(Workspace);function Workspace(){_classCallCheck(this,Workspace);return _super173.call(this);}_createClass(Workspace,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(Workspace.prototype),"_Init",this).call(this);this._cellDefaultClass=WorkspaceCell;this._cells=new List();this._catalogHandler=new CatalogHandler();this._catalogHandler.Watch(SIGNAL.ITEM_ADDED,this._OnCatalogItemAdded,this);this._catalogHandler.Watch(SIGNAL.ITEM_REMOVED,this._OnCatalogItemRemoved,this);}/**
     * @type {data.core.catalog.Catalog}
     */},{key:"catalog",get:function get(){return this._catalogHandler.catalog;},set:function set(p_value){this._catalogHandler.catalog=p_value;}// ----> Rendering
},{key:"_Style",value:function _Style(){return{':host':{position:"relative",display:"flex"},'.navigation':{position:"relative",flex:"1 1 auto",outline:"1px rgba(0,255,0,0.5) solid",'outline-offset':"-1px"},'.cell':{position:"relative"}};}},{key:"_OnCatalogItemAdded",value:function _OnCatalogItemAdded(p_handler,p_item){if(!U.isInstanceOf(p_item,Catalog)){throw new Error("non-catalog item added to workspace catalog : ".concat(p_item,"."));}var cellClass=p_item.GetOption("cellClass",this._cellDefaultClass),cell=this.Add(cellClass,"cell");p_handler.Set(p_item,cell);if(p_item.data){p_item.data.Watch(SIGNAL.RELEASED,this._OnItemDataReleased,this);}//TODO : Listen to the data in case of release
//if the data is released, then close associated catalog items
this._OnCellCreated(p_item,cell);}},{key:"_OnCellCreated",value:function _OnCellCreated(p_item,p_cell){this._cells.Add(p_item);p_cell.Watch(UI_SIGNAL.FOCUS_REQUESTED,this._OnCellRequestFocus,this);p_cell.catalog=p_item;}},{key:"_OnItemDataReleased",value:function _OnItemDataReleased(p_data){var localCatalog=this.catalog;if(!localCatalog){return;}var dataHolders=localCatalog.FindDataHolders(p_item.data);for(var i=0,n=dataHolders.length;i<n;i++){dataHolders[i].Release();}}},{key:"_OnCatalogItemRemoved",value:function _OnCatalogItemRemoved(p_handler,p_item,p_binding){if(p_item.data){p_item.data.Unwatch(SIGNAL.RELEASED,this._OnItemDataReleased,this);}if(p_binding){this._OnCellRemoved(p_item,p_binding);if(p_binding.parent===this){// Only release if the workspace is still the parent. 
p_binding.Release();}}}},{key:"_OnCellRemoved",value:function _OnCellRemoved(p_item,p_cell){this._cells.Remove(p_item);p_cell.Unwatch(UI_SIGNAL.FOCUS_REQUESTED,this._OnCellRequestFocus,this);}},{key:"_OnCellRequestFocus",value:function _OnCellRequestFocus(p_view){}/**
     * 
     * @param {*} p_options
     */},{key:"Host",value:function Host(p_item){var localCatalog=this._FetchCatalog();if(U.isInstanceOf(p_item,CatalogItem)){// Attempting to host an existing catalog item.
localCatalog.Add(p_item);return;}// Need to create a new item from `p_item` as options
var view=null,viewType=p_item.GetOption("viewType",null),dataHolders=localCatalog.FindDataHolders(p_item.data);for(var i=0,n=dataHolders.length;i<n;i++){var _view=dataHolders[i].GetOption("viewType",null);if(_view&&U.isInstanceOf(_view,viewType)){_view.RequestDisplay();return;}}var item=localCatalog.Register(p_item);// TODO : Find cell associated to catalog and request focus on newly created view
//        let view = this._catalogHandler.Get(item);
//        view.RequestDisplay();
}},{key:"_FetchCatalog",value:function _FetchCatalog(){// Fetch cell catalog
var localCatalog=this.catalog;if(!localCatalog){// No local catalog exists for this workspace. Create one.
var wCat=POOL.Rent(Catalog);localCatalog=wCat.GetOrCreateCatalog({name:'RootCell'});this.catalog=wCat;}else{// TODO : Find the active cell's catalog
// For now just grab the first available catalog.
var cat=null;var n=localCatalog.count;var i=0;while(cat===null||i<n){cat=localCatalog.At(i);if(!U.isInstanceOf(cat,Catalog)){cat=null;}// Get rid of non-catalog items
i++;}if(!cat){localCatalog=localCatalog.GetOrCreateCatalog({name:'RootCell'});}else{localCatalog=cat;}}return localCatalog;}// ----> Pooling
},{key:"_CleanUp",value:function _CleanUp(){_get(_getPrototypeOf(Workspace.prototype),"_CleanUp",this).call(this);}}]);return Workspace;}(View);_defineProperty(Workspace,"__NFO__",NFOS.Ext({css:["@/views/workspace.css"]},View,['css']));module.exports["default"]=module.exports=Workspace;UI.Register('nkmjs-workspace',Workspace);},{"./workspace-cell":265,"@nkmjs/collections":21,"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],268:[function(require,module,exports){'use strict';module.exports["default"]=module.exports={// Generic
U:require("./lib/utils"),UDOM:require("./lib/utils-dom"),PATH:require("./lib/path"),MIME:require("./lib/mime"),LOG:require("./lib/logger")};},{"./lib/logger":269,"./lib/mime":270,"./lib/path":271,"./lib/utils":273,"./lib/utils-dom":272}],269:[function(require,module,exports){'use strict';var LOG=/*#__PURE__*/function(){function LOG(){_classCallCheck(this,LOG);}_createClass(LOG,null,[{key:"toggle",value:function toggle(p_toggle){this._enabled=p_toggle;}},{key:"_",value:function _(p_text){var p_color=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"#818181";var p_bg=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;if(!this._enabled){return;}if(p_bg){console.log("%c ".concat(p_text," "),"background: ".concat(p_bg,"; color: ").concat(p_color,"; border-radius: 5px;"));}else{console.log("%c".concat(p_text," "),"color: ".concat(p_color));}}},{key:"_U",value:function _U(p_name,p_new,p_old){var p_color=arguments.length>3&&arguments[3]!==undefined?arguments[3]:"#818181";var p_bg=arguments.length>4&&arguments[4]!==undefined?arguments[4]:null;if(!this._enabled){return;}if(p_bg){console.log("%c \u2B6E ".concat(p_name," \uD83E\uDC1A '").concat(p_new,"' %c(was '").concat(p_old,"') "),"background: ".concat(p_bg,"; color: ").concat(p_color,"; border-radius: 5px;"),"background: ".concat(p_bg,"; color: ").concat(p_color,"; font-style: italic; border-radius: 5px;"));}else{console.log("%c\u2B6E ".concat(p_name," \uD83E\uDC1A '").concat(p_new,"' %c(was '").concat(p_old,"')"),"color: ".concat(p_color),"color: ".concat(p_color,"; font-style: italic"));}}}]);return LOG;}();module.exports["default"]=module.exports=LOG;},{}],270:[function(require,module,exports){'use strict';var __commonMIMEs=[{ext:".localStorage",desc:"A local storage object in string form",type:"text/plain"},{ext:".aac",desc:"AAC audio",type:"audio/aac"},{ext:".abw",desc:"AbiWord document",type:"application/x-abiword"},{ext:".arc",desc:"Archive document (multiple files embedded)",type:"application/x-freearc"},{ext:".avi",desc:"AVI: Audio Video Interleave",type:"video/x-msvideo"},{ext:".azw",desc:"Amazon Kindle eBook format",type:"application/vnd.amazon.ebook"},{ext:".bin",desc:"Any kind of binary data",type:"application/octet-stream"},{ext:".bmp",desc:"Windows OS/2 Bitmap Graphics",type:"image/bmp"},{ext:".bz",desc:"BZip archive",type:"application/x-bzip"},{ext:".bz2",desc:"BZip2 archive",type:"application/x-bzip2"},{ext:".csh",desc:"C-Shell script",type:"application/x-csh"},{ext:".css",desc:"Cascading Style Sheets (CSS)",type:"text/css"},{ext:".csv",desc:"Comma-separated values (CSV)",type:"text/csv"},{ext:".doc",desc:"Microsoft Word",type:"application/msword"},{ext:".docx",desc:"Microsoft Word (OpenXML)",type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"},{ext:".eot",desc:"MS Embedded OpenType fonts",type:"application/vnd.ms-fontobject"},{ext:".epub",desc:"Electronic publication (EPUB)",type:"application/epub+zip"},{ext:".gz",desc:"GZip Compressed Archive",type:"application/gzip"},{ext:".gif",desc:"Graphics Interchange Format (GIF)",type:"image/gif"},{ext:".htm",desc:"HyperText Markup Language (HTML)",type:"text/html"},{ext:".html",desc:"HyperText Markup Language (HTML)",type:"text/html"},{ext:".ico",desc:"Icon format",type:"image/vnd.microsoft.icon"},{ext:".ics",desc:"iCalendar format",type:"text/calendar"},{ext:".jar",desc:"Java Archive (JAR)",type:"application/java-archive"},{ext:".jpeg",desc:"JPEG images",type:"image/jpeg"},{ext:".jpg",desc:"JPEG images",type:"image/jpeg"},{ext:".js",desc:"JavaScript",type:"text/javascript"},{ext:".json",desc:"JSON format",type:"application/json"},{ext:".jsonld",desc:"JSON-LD format",type:"application/ld+json"},{ext:".mid",desc:"Musical Instrument Digital Interface (MIDI)",type:"audio/midi audio/x-midi"},{ext:".midi",desc:"Musical Instrument Digital Interface (MIDI)",type:"audio/midi audio/x-midi"},{ext:".mjs",desc:"JavaScript module",type:"text/javascript"},{ext:".mp3",desc:"MP3 audio",type:"audio/mpeg"},{ext:".mpeg",desc:"MPEG Video",type:"video/mpeg"},{ext:".mpkg",desc:"Apple Installer Package",type:"application/vnd.apple.installer+xml"},{ext:".odp",desc:"OpenDocument presentation document",type:"application/vnd.oasis.opendocument.presentation"},{ext:".ods",desc:"OpenDocument spreadsheet document",type:"application/vnd.oasis.opendocument.spreadsheet"},{ext:".odt",desc:"OpenDocument text document",type:"application/vnd.oasis.opendocument.text"},{ext:".oga",desc:"OGG audio",type:"audio/ogg"},{ext:".ogv",desc:"OGG video",type:"video/ogg"},{ext:".ogx",desc:"OGG",type:"application/ogg"},{ext:".opus",desc:"Opus audio",type:"audio/opus"},{ext:".otf",desc:"OpenType font",type:"font/otf"},{ext:".png",desc:"Portable Network Graphics",type:"image/png"},{ext:".pdf",desc:"Adobe Portable Document Format (PDF)",type:"application/pdf"},{ext:".php",desc:"Hypertext Preprocessor (Personal Home Page)",type:"application/x-httpd-php"},{ext:".ppt",desc:"Microsoft PowerPoint",type:"application/vnd.ms-powerpoint"},{ext:".pptx",desc:"Microsoft PowerPoint (OpenXML)",type:"application/vnd.openxmlformats-officedocument.presentationml.presentation"},{ext:".rar",desc:"RAR archive",type:"application/vnd.rar"},{ext:".rtf",desc:"Rich Text Format (RTF)",type:"application/rtf"},{ext:".sh",desc:"Bourne shell script",type:"application/x-sh"},{ext:".svg",desc:"Scalable Vector Graphics (SVG)",type:"image/svg+xml"},{ext:".swf",desc:"Small web format (SWF) or Adobe Flash document",type:"application/x-shockwave-flash"},{ext:".tar",desc:"Tape Archive (TAR)",type:"application/x-tar"},{ext:".tif",desc:"Tagged Image File Format (TIFF)",type:"image/tiff"},{ext:".tiff",desc:"Tagged Image File Format (TIFF)",type:"image/tiff"},{ext:".ts",desc:"MPEG transport stream",type:"video/mp2t"},{ext:".ttf",desc:"TrueType Font",type:"font/ttf"},{ext:".txt",desc:"Text, (generally ASCII or ISO 8859-n)",type:"text/plain"},{ext:".vsd",desc:"Microsoft Visio",type:"application/vnd.visio"},{ext:".wav",desc:"Waveform Audio Format",type:"audio/wav"},{ext:".weba",desc:"WEBM audio",type:"audio/webm"},{ext:".webm",desc:"WEBM video",type:"video/webm"},{ext:".webp",desc:"WEBP image",type:"image/webp"},{ext:".woff",desc:"Web Open Font Format (WOFF)",type:"font/woff"},{ext:".woff2",desc:"Web Open Font Format (WOFF)",type:"font/woff2"},{ext:".xhtml",desc:"XHTML",type:"application/xhtml+xml"},{ext:".xls",desc:"Microsoft Excel",type:"application/vnd.ms-excel"},{ext:".xlsx",desc:"Microsoft Excel (OpenXML)",type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},{ext:".xml",desc:"XML",type:"text/xml"},{ext:".xul",desc:"XUL",type:"application/vnd.mozilla.xul+xml"},{ext:".zip",desc:"ZIP archive",type:"application/zip"},{ext:".3gp",desc:"3GPP audio/video container",type:"video/3gpp audio/3gpp"},{ext:".3g2",desc:"3GPP2 audio/video container",type:"video/3gpp2 audio/3gpp2"},{ext:".7z",desc:"7-zip archive",type:"application/x-7z-compressed"}];var MIME=/*#__PURE__*/function(){function MIME(){_classCallCheck(this,MIME);}/**
     * @access protected
     */_createClass(MIME,null,[{key:"_GenerateMap",value:function _GenerateMap(){this._map={};for(var i=0,n=__commonMIMEs.length;i<n;i++){var _m=__commonMIMEs[i];this._map[_m.ext]={mime:_m.type,desc:_m.desc};}}},{key:"mimes",get:function get(){if(!this._map){this._GenerateMap();}return this._map;}/**
     * 
     * @param {string} p_ext 
     */},{key:"Get",value:function Get(p_ext){if(this._map){return this._map[p_ext];}else{this._GenerateMap();}return this._map[p_ext];}/**
     * 
     * @param {object} p_mime 
     * @param {string} p_mime.ext
     * @param {string} p_mime.desc
     * @param {string} p_mime.type
     */},{key:"Set",value:function Set(p_mime){this._map[m.ext]=p_mime;}}]);return MIME;}();module.exports["default"]=module.exports=MIME;},{}],271:[function(require,module,exports){'use strict';var LOG=require("./logger");var PATH=/*#__PURE__*/function(){function PATH(){_classCallCheck(this,PATH);}_createClass(PATH,null,[{key:"SET",value:/**
     * Associate a shortcut to be used by SH & EX methods.
     * @param {string} p_envShortcut %SHORTCUT%
     * @param {string} p_path 
     */function SET(p_envShortcut,p_path){if(this.SYSTEM_MAP.includes(p_envShortcut)&&this.MAP.hasOwnProperty(p_envShortcut)){throw new Error("Cannot override system path (".concat(p_envShortcut,")"));}if(p_envShortcut.length<3||p_envShortcut.substr(0,1)!='%'||p_envShortcut.substr(p_envShortcut.length-1,1)!='%'){//console.warn(`Did not register PATH shorthand "${p_envShortcut}" since it doesn't match the pattern %S%`);
return;}this.MAP[p_envShortcut]=p_path;LOG._("\u2BA5 ".concat(p_envShortcut," \u2BA7 ").concat(p_path),"#7f7f7f");}/**
     * Removes a shortcut from the PATH.
     * @param {string} p_envShortcut 
     */},{key:"UNSET",value:function UNSET(p_envShortcut){delete this.MAP[p_envShortcut];}/**
     * Replaces \ (backslashes) with / (forwardslashes)
     * @param {string} p_string The string to sanitize
     * @returns {string} Sanitized string
     */},{key:"Sanitize",value:function Sanitize(p_string){return p_string.split('\\').join('/');}/**
     * Shrink a path, replacing expanded environment path with their %PATH%
     * @param {string} p_path 
     * @returns {string} Shrinked path
     */},{key:"SHORT",value:function SHORT(p_path){p_path=this.Sanitize(p_path);for(var n in this.MAP){if(this.MAP[n]===""){continue;}p_path=p_path.replace(this.MAP[n],n);}return p_path;}/**
     * Expand a path, replacing the %PATH% variables with their full, associated path
     * @param {string} p_path 
     * @returns {string} Expanded path
     */},{key:"FULL",value:function FULL(p_path){for(var n in this.MAP){p_path=p_path.replace(n,this.MAP[n]);}return this.Sanitize(p_path);}/**
     * Get the parent directory path
     * @param {string} p_path 
     * @returns {string} The path leading up the last `/`
     */},{key:"dir",value:function dir(p_path){var split=this.Sanitize(p_path).split('/');split.pop();return split.join('/');}/**
     * 
     * @param {string} p_path 
     * @returns {string}
     */},{key:"name",value:function name(p_path){var splitBase=p_path.split('/');if(splitBase.length<=1){return this.stripExt(p_path);}var splitEnd=splitBase.pop();while(splitEnd===""&&splitBase.length>=1){splitEnd=splitBase.pop();}return this.stripExt(splitEnd);}/**
     * 
     * @param {string} p_path 
     * @returns {string}
     */},{key:"ext",value:function ext(p_path){if(p_path.includes('?')){var preSplit=p_path.split('?');p_path=preSplit[0];}var splitDot=p_path.split('.');if(splitDot.length<=1){return p_path;}return".".concat(splitDot[splitDot.length-1]);}/**
     * 
     * @param {string} p_path 
     * @returns {string}
     */},{key:"stripExt",value:function stripExt(p_path){var splitDot=p_path.split('.');if(splitDot.length<=1){return p_path;}splitDot.pop();return splitDot.join('.');}/**
     * Return all registered paths that aren't SYSTEM ones.
     */},{key:"extras",get:function get(){var extras={};for(var n in this.MAP){if(!this.SYSTEM_MAP.includes(n)){extras[n]=this.MAP[n];}}return extras;}}]);return PATH;}();_defineProperty(PATH,"APP",'%APP%');_defineProperty(PATH,"APP_DATA",'%APP_DATA%');_defineProperty(PATH,"USER_DATA",'%USER_DATA%');_defineProperty(PATH,"HOME",'%HOME%');_defineProperty(PATH,"TEMP",'%TEMP%');_defineProperty(PATH,"DOCUMENTS",'%DOCUMENTS%');_defineProperty(PATH,"DESKTOP",'%DESKTOP%');_defineProperty(PATH,"LOGS",'%LOGS%');_defineProperty(PATH,"DOWNLOADS",'%DOWNLOADS%');_defineProperty(PATH,"VIDEOS",'%VIDEOS%');_defineProperty(PATH,"PICTURES",'%PICTURES%');_defineProperty(PATH,"MUSIC",'%MUSIC%');_defineProperty(PATH,"SYSTEM_MAP",[PATH.APP_DATA,PATH.USER_DATA,PATH.HOME,PATH.TEMP,PATH.DOCUMENTS,PATH.DESKTOP,PATH.LOGS,PATH.DOWNLOADS,PATH.VIDEOS,PATH.PICTURES,PATH.MUSIC]);_defineProperty(PATH,"MAP",{});module.exports["default"]=module.exports=PATH;},{"./logger":269}],272:[function(require,module,exports){'use strict';var UTILS=require("./utils");var UTILS_DOM=/*#__PURE__*/function(){function UTILS_DOM(){_classCallCheck(this,UTILS_DOM);}/**
     * Create an HTMLElement formatted as
     * <element att=value ></element>
     * @param {string} p_element 
     * @param {object} p_attributes inlined attributes & values
     */_createClass(UTILS_DOM,null,[{key:"New",value:function New(p_element){var p_attributes=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var p_container=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var element=document.createElement(p_element);if(!UTILS.isVoid(p_attributes)){for(var att in p_attributes){element.setAttribute(att,p_attributes[att]);}}if(!UTILS.isVoid(p_container)){UTILS_DOM.Attach(element,p_container);}return element;}},{key:"NewClone",value:function NewClone(p_element){var p_container=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var element=p_element.cloneNode(true);if(!UTILS.isVoid(p_container)){UTILS_DOM.Attach(element,p_container);}return element;}},{key:"Attach",value:function Attach(p_element,p_parent){if("_wrapper"in p_parent){p_parent._wrapper.appendChild(p_element);}else{p_parent.appendChild(p_element);}}/**
     * 
     * @param {*} p_element 
     * @param {*} p_parent 
     * @param {boolean} p_firstChild If true, attach before the firstChild, otherwise attach before the firstChildElement
     */},{key:"AttachFirst",value:function AttachFirst(p_element,p_parent){var p_firstChild=arguments.length>2&&arguments[2]!==undefined?arguments[2]:true;if(p_firstChild&&p_parent.firstChild){p_parent.insertBefore(p_element,p_parent.firstChild);}else if(!p_firstChild&&p_parent.firstChildElement){p_parent.insertBefore(p_element,p_parent.firstChildElement);}else{p_parent.appendChild(p_element);}}/**
     * Remove a node from its parent, if any
     * @param {*} p_node 
     */},{key:"Detach",value:function Detach(p_node){if(!UTILS.isVoid(p_node.parentNode)){p_node.parentNode.removeChild(p_node);}}/**
     * Move a node at the end (front) of the child list
     * @param {*} p_node 
     * @param {boolean} p_frontOfNode If true, move the node at the front of the last child. Otherwise last childElement.
     */},{key:"ToFront",value:function ToFront(p_node){var p_frontOfNode=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(!UTILS.isVoid(p_node.parentNode)){if(p_frontOfNode){if(p_node.parentNode.lastChild){p_node.parentNode.insertAfter(p_node.parentNode.lastChild);}else{p_node.parentNode.appendChild(p_node);}}else{if(p_node.parentNode.lastChildElement){p_node.parentNode.insertAfter(p_node.parentNode.lastChildElement);}else if(p_node.parentNode.lastChild){p_node.parentNode.insertAfter(p_node.parentNode.lastChild);}else{p_node.parentNode.appendChild(p_node);}}}else{throw new Error("Node has no parent.");}}/**
     * Move a node at the beginning (back) of the child list
     * @param {*} p_node 
     * @param {boolean} p_backOfNode If true, move the node at the back of the first child. Otherwise first childElement.
     */},{key:"ToBack",value:function ToBack(p_node){var p_backOfNode=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(!UTILS.isVoid(p_node.parentNode)){if(p_backOfNode){if(p_node.parentNode.firstChild){p_node.parentNode.insertBefore(p_node.parentNode.firstChild);}else{p_node.parentNode.appendChild(p_node);}}else{if(p_node.parentNode.firstChildElement){p_node.parentNode.insertBefore(p_node.parentNode.firstChildElement);}else if(p_node.parentNode.firstChild){p_node.parentNode.insertBefore(p_node.parentNode.firstChild);}else{p_node.parentNode.appendChild(p_node);}}}else{throw new Error("Node has no parent.");}}// ----> Rect utils
},{key:"Rect",value:function Rect(p_element){var p_relative=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var domRect=p_element.getBoundingClientRect();if(!p_relative){return domRect;}var relDom=p_relative.getBoundingClientRect();return DOMRectReadOnly.fromRect({x:domRect.x-relDom.x,y:domRect.y-relDom.y,width:domRect.width,height:domRect.height});}// ----> Scrolling
},{key:"OverflowsY",value:function OverflowsY(p_element){return p_element.scrollHeight>p_element.clientHeight;}},{key:"OverflowsX",value:function OverflowsX(p_element){return p_element.scrollWidth>p_element.clientWidth;}}]);return UTILS_DOM;}();module.exports["default"]=module.exports=UTILS_DOM;},{"./utils":273}],273:[function(require,module,exports){'use strict';var toString=Object.prototype.toString;var UTILS=/*#__PURE__*/function(){function UTILS(){_classCallCheck(this,UTILS);}_createClass(UTILS,null,[{key:"isArray",value:/**
     * Determine if a value is an Array
     *
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an Array, otherwise false
     */function isArray(p_value){return Array.isArray(p_value);}/**
     * Determine if a value is an ArrayBuffer
     *
     * @param {object} val The value to test
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */},{key:"isArrayBuffer",value:function isArrayBuffer(p_value){return toString.call(p_value)==='[object ArrayBuffer]';}/**
     * Determine if a value is an Object
     *
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an Object, otherwise false
     */},{key:"isSymbol",value:function isSymbol(p_value){return _typeof(p_value)==='symbol';}/**
     * Determine if a value is an Object
     *
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an Object, otherwise false
     */},{key:"isObject",value:function isObject(p_value){return p_value!==null&&_typeof(p_value)==='object';}/**
     * Determine if a value is a Function
     *
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an Function, otherwise false
     */},{key:"isFunc",value:function isFunc(p_value){return typeof p_value==='function';}/**
     * Determine if a value is a string
     *
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an string, otherwise false
     */},{key:"isString",value:function isString(p_value){return typeof p_value==='string';}/**
     * Determine if a value is a Number
     *
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an Number, otherwise false
     */},{key:"isNumber",value:function isNumber(p_value){return typeof p_value==='number';}/**
     * Determine if a value is a Boolean
     *
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is a Boolean, otherwise false
     */},{key:"isBool",value:function isBool(p_value){return typeof p_value==='boolean';}/**
     * Determine if a value is undefined
     *
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is undefined, otherwise false
     */},{key:"isUndefined",value:function isUndefined(p_value){return typeof p_value==='undefined';}/**
     * Determine if a value is either undefined or null
     *
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is either undefined or null, otherwise false
     */},{key:"isVoid",value:function isVoid(p_value){return typeof p_value==='undefined'||p_value===null;}/**
     * Determine if a (source) Class or Instance of a constructor is an instance of another (target) Class 
     * or Instance of a given Class.
     *
     * @param {Object|Function} p_source The value to test
     * @param {Object|Function} p_target The value to test against 
     * @returns {boolean} True if p_source is or extends target type, otherwise false
     */},{key:"isInstanceOf",value:function isInstanceOf(p_source,p_target){if(UTILS.isVoid(p_source)||UTILS.isVoid(p_target)){return false;}var AisFunc=typeof p_source==='function',BisFunc=typeof p_target==='function';if(AisFunc&&BisFunc&&p_source===p_target){return true;}var A=AisFunc?p_source.prototype:p_source,B=BisFunc?p_target:p_target.constructor;return A instanceof B;}/**
     * Determine if an object is empty
     *
     * @param {*} p_value The value to test
     * @returns {boolean} True if p_value is empty, otherwise false
     */},{key:"isEmpty",value:function isEmpty(p_value){if(UTILS.isVoid(p_value)||p_value===""){return true;}if(UTILS.isArray(p_value)){return p_value.length===0;}if(UTILS.isObject(p_value)){for(var key in p_value){return false;}return true;}return false;}},{key:"JSONStripEmpty",value:function JSONStripEmpty(p_key,p_value){if(UTILS.isEmpty(p_value)){return undefined;}if(UTILS.isObject(p_value)){for(var k in p_value){if(p_value.hasOwnProperty(k)){return p_value;}}return undefined;}return p_value;}/**
     * Returns the first non-void value
     *
     * @param {*} args A list of values to test
     * @returns {*} The first non-void value, otherwise null.
     */},{key:"Default",value:function Default(){for(var i=0,n=arguments.length;i<n;i++){var val=i<0||arguments.length<=i?undefined:arguments[i];if(!UTILS.isVoid(val)){return val;}}return null;}/**
     * Attempts to get the property value on a given object.
     *
     * @param {object} p_obj The object to extract the property value from
     * @param {string} p_key The property's name
     * @param {*} p_fallback The fallback value that will be returned if the property cannot be found, 
     * or if its value is 'void'
     * @returns {*} The value, otherwise the provided fallback.
     */},{key:"Get",value:function Get(p_obj,p_key){var p_fallback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;if(UTILS.isVoid(p_obj)){return p_fallback;}var val=p_obj[p_key];if(UTILS.isVoid(val)){return p_fallback;}else{return val;}}/**
     * Ensure a value is set on a object.
     *
     * @param {object} p_obj The target object
     * @param {string} p_key The property's name
     * @param {*} p_value The default value to set the property to if it does not exists
     */},{key:"Ensure",value:function Ensure(p_obj,p_key,p_value){if(!(p_key in p_obj)){p_obj[p_key]=p_value;}return p_obj;}/**
     * Ensure a value is set on a object.
     *
     * @param {object} p_obj The target object
     * @param {object} p_kvp The property's name
     */},{key:"EnsureMultiple",value:function EnsureMultiple(p_obj,p_kvp){for(var key in p_kvp){if(!(key in p_obj)){p_obj[key]=p_kvp[key];}}return p_obj;}/**
     * Breaks down a path into an object to the following format :
     * {
     *      path:[catalog, catalog, ...],
     *      item:tailName,
     *      ext:extention,
     * }
     * @param {string} p_stringPath 
     */},{key:"ParsePath",value:function ParsePath(p_stringPath){if(UTILS.isVoid(p_stringPath)){return null;}var parseResult={};var hasProtocol=p_stringPath.includes(UTILS.DELIM_PROTOCOL);if(hasProtocol){var protocolSplit=p_stringPath.split(UTILS.DELIM_PROTOCOL);if(protocolSplit.length!=2){throw new Error("Path '".concat(p_stringPath,"' cannot be parsed (protocol malformed)."));}parseResult.protocol=protocolSplit[0]+UTILS.DELIM_PROTOCOL;p_stringPath=protocolSplit[1];}var hasDrive=p_stringPath.includes(UTILS.DELIM_DRIVE);if(hasDrive){var driveSplit=p_stringPath.split(UTILS.DELIM_DRIVE);if(driveSplit.length>2){throw new Error("Path '".concat(p_stringPath,"' cannot be parsed (drive malformed)."));}parseResult.drive=driveSplit[0]+UTILS.DELIM_PROTOCOL;p_stringPath=driveSplit[1];}var split=p_stringPath.split(UTILS.DELIM_DIR),lastIndex=split.length-1,fname=split[lastIndex],splitEx=fname.split(UTILS.DELIM_EXT);split.splice(lastIndex,1);for(var i=0,n=split.length;i<n;i++){if(split[i]===""){split.splice(i,1);i--;}}parseResult.path=split.join(UTILS.DELIM_DIR)+UTILS.DELIM_DIR;parseResult.pathArray=split;parseResult.name=splitEx[0];parseResult.ext=UTILS.DELIM_EXT+splitEx[splitEx.length-1];return parseResult;}/**
     * Replace backslashes (\) with forward slashes (/) in a given string.
     *
     * @param {string} p_string The base object to append into
     * @returns {string} Fixed string
     */},{key:"FixSlash",value:function FixSlash(p_string){return p_string.split('\\').join('/');}/**
     * Checks whether a value is not equal to any of the provided ones
     *
     * @param {*} p_value The value to test
     * * @param {*} args The values to test against
     * @returns {boolean} False if any of the args values equals the test value, otherwise true.
     */},{key:"isNot",value:function isNot(p_value){for(var i=0,n=arguments.length<=1?0:arguments.length-1;i<n;i++){if((i+1<1||arguments.length<=i+1?undefined:arguments[i+1])===p_value){return false;}}return true;}/**
     * Appends the value of an Object into another. 
     * First-level properties only, no overwriting.
     *
     * @param {object} p_base The base object to append into
     * @param {object} p_source The reference object to fetch values from
     * @returns {object} The p_base object
     */},{key:"Append",value:function Append(p_base,p_source){if(UTILS.isVoid(p_base)){p_base={};}if(UTILS.isVoid(p_source)){return p_base;}for(var member in p_source){if(p_base.hasOwnProperty(member)){continue;}p_base[member]=p_source[member];}return p_base;}/**
     * Merges the value of an Object into another. 
     * Recursive, overwrites (unless p_skipExisting === true)
     *
     * @param {object} p_base The base object to append into
     * @param {object} p_source The reference object to fetch values from
     * @param {object} p_skipExisting Whether or not to overwrite on existing values
     * @returns {object} The p_base object
     */},{key:"Merge",value:function Merge(p_base,p_source){var p_skipExisting=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;if(UTILS.isVoid(p_base)){return p_source;}for(var member in p_source){if(!p_source.hasOwnProperty(member)){continue;}var sourceValue=p_source[member];if(p_base.hasOwnProperty(member)&&!p_skipExisting){//Property exist in base, update its values
var baseValue=p_base[member];if(!UTILS.isArray(baseValue)&&UTILS.isObject(baseValue)){if(!UTILS.isArray(sourceValue)&&UTILS.isObject(sourceValue)){UTILS.Merge(baseValue,sourceValue);}else{p_base[member]=sourceValue;}}else{p_base[member]=sourceValue;}}else{//Simply assign value
p_base[member]=sourceValue;}}return p_base;}/**
     * Copy values from p_source currently missing in p_base.
     * Merge object properties
     * @param {*} p_base 
     * @param {*} p_source 
     * @param {*} p_mergeArrays if true, will unshift array values from source into base when the two values are arrays.
     */},{key:"SetMissing",value:function SetMissing(p_base,p_source){var p_mergeArrays=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;for(var key in p_source){var sourceValue=p_source[key];if(!p_base.hasOwnProperty(key)){if(UTILS.isArray(sourceValue)){p_base[key]=_toConsumableArray(sourceValue);}else if(UTILS.isObject()){p_base[key]=UTILS.SetMissing({},sourceValue);}else{p_base[key]=sourceValue;}}else{var baseValue=p_base[key];if(UTILS.isArray(baseValue)){if(UTILS.isArray(sourceValue)&&p_mergeArrays){for(var i=0,n=sourceValue.length;i<n;i++){if(!baseValue.includes(sourceValue[i])){baseValue.unshift(sourceValue[i]);}}}}else if(UTILS.isObject(baseValue)&&UTILS.isObject(sourceValue)){UTILS.SetMissing(baseValue,sourceValue);}else{// Ignore
}}}return p_base;}/**
     * Set values from p_source to p_base, overriding existing values.
     * Merge objects properties.
     * @param {*} p_base 
     * @param {*} p_source 
     */},{key:"SetOverwrite",value:function SetOverwrite(p_base,p_source){for(var key in p_source){var sourceValue=p_source[key];if(!p_base.hasOwnProperty(key)){if(UTILS.isArray(sourceValue)){p_base[key]=sourceValue;}else if(UTILS.isObject()){p_base[key]=sourceValue;}else{p_base[key]=sourceValue;}}else{var baseValue=p_base[key];if(UTILS.isArray(baseValue)){p_base[key]=sourceValue;}else if(UTILS.isObject(sourceValue)){if(UTILS.isObject(baseValue)){UTILS.SetOverwrite(baseValue,sourceValue);}else{p_base[key]=sourceValue;}}else{p_base[key]=sourceValue;}}}return p_base;}/**
     * Add missing content from p_source into p_base (no duplicates)
     * @param {array} p_base 
     * @param {array} p_source 
     * @returns {array}
     */},{key:"MergeArray",value:function MergeArray(p_base,p_source){if(!p_base){p_base=new Array(0);if(!p_source){return p_base;}p_base=_toConsumableArray(p_source);return p_base;}if(!p_source){return p_base;}for(var i=0,n=p_source.length;i<n;i++){if(!p_base.includes(p_source[i])){p_base.push(p_source[i]);}}return p_base;}/**
     * Clone an Object.
     * Recursive.
     *
     * @param {object} p_base The base object to clone
     * @returns {object} Clone of p_base
     */},{key:"Clone",value:function Clone(p_base){if(!UTILS.isObject(p_base)){throw new Error("Cannot Clone the non-object '".concat(p_base,"'"));}var clone={};for(var member in p_base){if(!p_base.hasOwnProperty(member)){continue;}var value=p_base[member];if(value!=null){if(UTILS.isArray(value)){value=UTILS.CloneArray(value);}else if(UTILS.isObject(value)){value=UTILS.Clone(value);}}clone[member]=value;}return clone;}/**
     * Clone an Array.
     * Recursive.
     *
     * @param {array} p_base The base object to clone
     * @returns {array} Clone of p_base
     */},{key:"CloneArray",value:function CloneArray(p_base){if(!UTILS.isArray(p_base)){throw new Error("Cannot CloneArray the non-array '".concat(p_base,"'"));}var arr=new Array(0);for(var i=0,n=p_base.length;i<n;i++){var arrValue=p_base[i];if(arrValue!=null){if(UTILS.isArray(arrValue)){arrValue=UTILS.CloneArray(arrValue);}else if(UTILS.isObject(arrValue)){arrValue=UTILS.Clone(arrValue);}}arr.push(arrValue);}return arr;}/**
     * Split a 'CamelCase' string into a 'Camel Case' one
     *
     * @param {string} p_string The string to split
     * @returns {string} Spaced string
     */},{key:"CamelSplit",value:function CamelSplit(p_string){return p_string.replace(/([a-z0-9])([A-Z#])/g,'$1 $2');}/**
     * Creates a diff of two array, and 'old' one and a 'new' one,
     * and outputs the result into two array (out & in) that must
     * be provided.
     *
     * @param {array} p_oldArray The old array to compare p_newArray against
     * @param {array} p_newArray The new array to compare p_oldArray against
     * @param {array} p_out Empty Array, will be filled with the items 
     * that are present in p_oldArray, but not in p_newArray
     * @param {array} p_in Empty Array, will be filled with the items 
     * that are not in p_oldArray, but present in p_newArray
     */},{key:"ArrayDiff",value:function ArrayDiff(p_oldArray,p_newArray,p_out,p_in){//Checks the difference between old and new.
//p_out is the items from oldArray not in the new one
//p_int are the items from the newArray not in the old one
if(UTILS.isVoid(p_oldArray)){if(UTILS.isVoid(p_newArray)){return;}//Everything in
for(var i=0,n=p_newArray.length;i<n;i++){p_in.push(p_newArray[i]);}return;}else if(UTILS.isVoid(p_newArray)){if(UTILS.isVoid(p_oldArray)){return;}//Everything out
for(var _i28=0,_n23=p_oldArray.length;_i28<_n23;_i28++){p_out.push(p_oldArray[_i28]);}return;}for(var _i29=0,_n24=p_oldArray.length;_i29<_n24;_i29++){var item=p_oldArray[_i29];if(!p_newArray.includes(item)){p_out.push(item);}}for(var _i30=0,_n25=p_newArray.length;_i30<_n25;_i30++){var _item4=p_oldArray[_i30];if(!p_newArray.includes(_item4)){p_in.push(_item4);}}}/**
     * Creates a diff of two array, and 'old' one and a 'new' one,
     * and call functions for each item that has been either added or removed
     *
     * @param {array} p_oldArray The old array to compare p_newArray against
     * @param {array} p_newArray The new array to compare p_oldArray against
     * @param {array} p_outCallback Will be called each time an item
     * is present in p_oldArray, but not in p_newArray
     * @param {array} p_inCallback Will be called each time an item
     * is not in p_oldArray, but present in p_newArray
     */},{key:"ArrayDiffCallbacks",value:function ArrayDiffCallbacks(p_oldArray,p_newArray,p_outCallback,p_inCallback){if(UTILS.isVoid(p_oldArray)){if(UTILS.isVoid(p_newArray)){return;}//Everything in
for(var i=0,n=p_newArray.length;i<n;i++){p_inCallback(p_newArray[i],i);}return;}else if(UTILS.isVoid(p_newArray)){if(UTILS.isVoid(p_oldArray)){return;}//Everything out
for(var _i31=0,_n26=p_oldArray.length;_i31<_n26;_i31++){p_outCallback(p_oldArray[_i31],_i31);}return;}for(var _i32=0,_n27=p_oldArray.length;_i32<_n27;_i32++){var item=p_oldArray[_i32];if(!p_newArray.includes(item)){p_outCallback(item,_i32);}}for(var _i33=0,_n28=p_newArray.length;_i33<_n28;_i33++){var _item5=p_newArray[_i33];if(!p_oldArray.includes(_item5)){p_inCallback(_item5,_i33);}}}/**
     * Checks the 'inheritance distance' between two Classe or Instances thereof.
     * p_to should be a 'distant child' of p_from, not the other way around.
     *
     * @param {Object|class} p_from The base Class or Instance
     * @param {Object|class} p_to The target Class or Instance
     * @returns {number} The 'distance' if any, otherwise -1
     */},{key:"InheritanceDistance",value:function InheritanceDistance(p_from,p_to){//Return -1 if no inheritance
var dist=0;if(!UTILS.isInstanceOf(p_from,p_to)){return-1;}var cl=Object.getPrototypeOf(p_from);while(cl!=null&&dist<100){if(cl===p_to){return dist;}else{cl=Object.getPrototypeOf(cl);}dist++;}// Seriously, 100+ ?
if(dist===100){console.warn("InheritanceDistance reached 100 iterations. Stopping.");}return-1;}/**
     * Deletes all properties on an a given object.
     * First-level properties only.
     *
     * @param {object} p_obj The object to be emptied
     * @param {boolean} p_returnNewEmpty Wether to return a new empty object or not
     * @returns {object} Either a new object, or the emptied one.
     */},{key:"Clear",value:function Clear(p_obj){var p_returnNewEmpty=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;for(var member in p_obj){delete p_obj[member];}if(p_returnNewEmpty){return{};}}/**
     * Deletes all properties on an a given object, 
     * and clears any value that is an object or an array itself.
     * Recursive.
     *
     * @param {object} p_obj The object to be emptied
     * @param {boolean} p_returnNewEmpty Wether to return a new empty object or not
     * @returns {object} Either a new object, or the emptied one.
     */},{key:"DeepClear",value:function DeepClear(p_obj){var p_returnNewEmpty=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var value=null;for(var member in p_obj){value=p_obj[member];if(UTILS.isArray(value)){UTILS.DeepClearArray(value);}else if(UTILS.isObject(value)){UTILS.DeepClear(value);}p_obj[member]=null;// delete is too slow
}if(p_returnNewEmpty){return{};}}/**
     * Empty an array and clears any value that is an object or an array itself.
     * Recursive.
     *
     * @param {array} p_arr The object to be emptied
     */},{key:"DeepClearArray",value:function DeepClearArray(p_arr){var value=null;while(p_arr.length!=0){value=p_arr.pop();if(UTILS.isArray(value)){UTILS.DeepClearArray(value);}else if(UTILS.isObject(value)){UTILS.DeepClear(value);}}}/**
     * Checks whether two objects contains exactly the same values
     *
     * @param {object} p_source The object to test
     * @param {object} p_other The object to test against
     * @returns {boolean} True if the objects contains the exact same values, otherwise false
     */},{key:"isSame",value:function isSame(p_source,p_other){if(p_source===p_other){return true;}var i=0;for(var member in p_source){i++;if(member in p_other){var value=p_source[member],otherValue=p_other[member];if(value!==otherValue){var tof=_typeof(value),otherTof=_typeof(otherValue);if(tof===otherTof){if(UTILS.isArray(value)){if(!UTILS.isSameArray(value,otherValue)){return false;}}else if(tof==='object'){if(!UTILS.isSame(value,otherValue)){return false;}}else{return false;}}else{return false;}}}else{return false;}}var j=0;for(var _member in p_other){j++;}if(i!=j){return false;}return true;}/**
     * Checks whether two arrays contains exactly the same values at the same index
     *
     * @param {array} p_source The array to test
     * @param {array} p_other The array to test against
     * @returns {boolean} True if the arrays contains the exact same values, otherwise false
     */},{key:"isSameArray",value:function isSameArray(p_source,p_other){if(p_source===p_other){return true;}var n=p_source.length;if(n!=p_other.length){return false;}for(var i=0;i<n;i++){var value=p_source[i],otherValue=p_other[i];if(value!==otherValue){var tof=_typeof(value),otherTof=_typeof(otherValue);if(tof===otherTof){if(UTILS.isArray(value)){if(!UTILS.isSameArray(value,otherValue)){return false;}}else if(tof==='object'){if(!UTILS.isSame(value,otherValue)){return false;}}else{return false;}}else{return false;}}}return true;}/**
     * Join the content of an array from/to specific indices
     *
     * @param {array} p_array The array to join
     * @param {string} p_joinStr string to join with
     * @param {number} p_fromIndex Start join index
     * @param {number} p_toIndex End join index
     * @returns {string} The joined result
     */},{key:"Join",value:function Join(p_array,p_joinStr){var p_fromIndex=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;var p_toIndex=arguments.length>3&&arguments[3]!==undefined?arguments[3]:-1;if(p_toIndex===-1){p_toIndex=p_array.length-1;}var str="".concat(p_array[p_fromIndex]);p_fromIndex++;for(var i=p_fromIndex;i<=p_toIndex;i++){str+="".concat(p_join).concat(p_array[i]);}return str;}},{key:"Resolve",value:function Resolve(p_obj,p_path){var paths=p_path.split('.'),current=p_obj;for(var i=0,n=paths.length;i<n;i++){if(current[paths[i]]===undefined){return undefined;}else{current=current[paths[i]];}}return current;}/*
    static Set(){
        

        if(this._val === p_value){return;}
        let oldValue = this._val;
        this._val = p_value;

        if(oldValue){

        }
        if(p_value){

        }

        this.UpdateCallback(oldValue);

        
    }
    */ // ----> Regex
},{key:"ValidIdentifier",value:function ValidIdentifier(p_str){return /^[A-Za-z_][A-Za-z0-9_]*$/.test(p_str);}},{key:"StartWithNumber",value:function StartWithNumber(p_str){return /^\d/.test(p_str);}},{key:"ContainsAnySpace",value:function ContainsAnySpace(p_str){return p_str.includes(" "," ",//No break space
"\u1680",//Ogham space mark
"\u180E",//Mongolian vowel separator
"\u2000",//EN Quad
"\u2001",//EM Quad
"\u2002",//EN space
"\u2003",//EM space
"\u2004",//1/3
"\u2005",//1/4 EM
"\u2006",//1/6 EM
"\u2007",//Figure space
"\u2008",//punctuation space
"\u2009",//thin space
"\u200A",//hair space
"\u200B",//zero-width space
"\u202F",//narrow no break space
"\u205F",//mathematical space
"\u3000",//ideographic space
"\uFEFF"//zero width nobreak space
);}},{key:"unsafeUID",get:function get(){return"_".concat(Math.random().toString(36).substr(2,9));}},{key:"Move",value:function Move(p_array,p_currentIndex,p_newIndex){if(p_currentIndex===p_newIndex){return;}if(p_currentIndex===-1){throw new Error("Item is not in array");}p_array.splice(p_newIndex,0,p_array.splice(p_currentIndex,1)[0]);}}]);return UTILS;}();_defineProperty(UTILS,"DELIM_PROTOCOL","://");_defineProperty(UTILS,"DELIM_DRIVE",":/");_defineProperty(UTILS,"DELIM_DIR","/");_defineProperty(UTILS,"DELIM_EXT",".");_defineProperty(UTILS,"DELIM_COLON",":");_defineProperty(UTILS,"DELIM_SEMI",";");_defineProperty(UTILS,"DELIM_COMMA",",");_defineProperty(UTILS,"DELIM_PIPE","|");module.exports["default"]=module.exports=UTILS;},{}],274:[function(require,module,exports){// shim for using process in browser
var process=module.exports={};// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error('setTimeout has not been defined');}function defaultClearTimeout(){throw new Error('clearTimeout has not been defined');}(function(){try{if(typeof setTimeout==='function'){cachedSetTimeout=setTimeout;}else{cachedSetTimeout=defaultSetTimout;}}catch(e){cachedSetTimeout=defaultSetTimout;}try{if(typeof clearTimeout==='function'){cachedClearTimeout=clearTimeout;}else{cachedClearTimeout=defaultClearTimeout;}}catch(e){cachedClearTimeout=defaultClearTimeout;}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){//normal enviroments in sane situations
return setTimeout(fun,0);}// if setTimeout wasn't available but was latter defined
if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedSetTimeout(fun,0);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
return cachedSetTimeout.call(null,fun,0);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
return cachedSetTimeout.call(this,fun,0);}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){//normal enviroments in sane situations
return clearTimeout(marker);}// if clearTimeout wasn't available but was latter defined
if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedClearTimeout(marker);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
return cachedClearTimeout.call(null,marker);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
// Some versions of I.E. have different rules for clearTimeout vs setTimeout
return cachedClearTimeout.call(this,marker);}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else{queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;runClearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue);}};// v8 likes predictible objects
function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version='';// empty string to avoid regexp issues
process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[];};process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return'/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};},{}],275:[function(require,module,exports){//
// This code will be at the root of the browserify bundle.
// (important note : this code should not be packaged for electron)
// Since it's not a constructor, it will be executed as soon as the bundle is loaded
// It emulate/compensate for what ElectronApp usually does when run in Electron.
//
// This obviously assume the execution environement has no node capabilities.
//
//
var _require458=require("@nkmjs/utils"),U=_require458.U,PATH=_require458.PATH,LOG=_require458.LOG;var _require459=require("@nkmjs/environment"),ENV=_require459.ENV;var paths={};paths.exe='';paths[PATH.APP]='';paths[PATH.HOME]='';paths[PATH.APP_DATA]='';paths[PATH.USER_DATA]='';paths[PATH.TEMP]='';paths[PATH.DESKTOP]='';paths[PATH.DOCUMENTS]='';paths[PATH.DOWNLOADS]='';paths[PATH.MUSIC]='';paths[PATH.PICTURES]='';paths[PATH.VIDEOS]='';paths[PATH.LOGS]='';LOG.toggle(true);// TODO : argv should be the parsed URL.
ENV.instance.Start({paths:paths,argv:[],webapp:require("./js/app")});},{"./js/app":276,"@nkmjs/environment":92,"@nkmjs/utils":268}],276:[function(require,module,exports){'use strict';var _require460=require("@nkmjs/utils"),U=_require460.U;var _require461=require("@nkmjs/app-core"),AppBase=_require461.AppBase;var _require462=require("@nkmjs/app-core/lib/dialogs"),AutoUpdateDialogBox=_require462.AutoUpdateDialogBox;var _require463=require("@nkmjs/common"),POOL=_require463.POOL,COMMON_FLAG=_require463.COMMON_FLAG;var _require464=require("@nkmjs/dialog"),DialogInfos=_require464.DialogInfos;var _require465=require("@nkmjs/ui-inputs"),InputBase=_require465.InputBase;var _require466=require("@nkmjs/ui-workspace"),Group=_require466.Group,BreadcrumbItem=_require466.BreadcrumbItem,Tag=_require466.Tag,InspectorShell=_require466.InspectorShell,WorkspaceCellNav=_require466.WorkspaceCellNav,DialogBox=_require466.DialogBox,DialogHandler=_require466.DialogHandler,DialogInput=_require466.DialogInput,Editor=_require466.Editor,EditorEx=_require466.EditorEx;var _require467=require("@nkmjs/data-core"),ID=_require467.ID,DataBlock=_require467.DataBlock,Catalog=_require467.Catalog,CatalogItem=_require467.CatalogItem;var _require468=require("@nkmjs/ui-core"),UI=_require468.UI,Layer=_require468.Layer,ButtonBase=_require468.ButtonBase,UI_FLAG=_require468.UI_FLAG,Toolbar=_require468.Toolbar,View=_require468.View,PopIn=_require468.PopIn,Drawer=_require468.Drawer,TreeItem=_require468.TreeItem,DrawerNav=_require468.DrawerNav;var UIItemListLayer=require("./ui-item-list-layer");var UIItem=require("./ui-item");var TestWidget=require("./test-widget");var StyleguideApp=/*#__PURE__*/function(_AppBase){_inherits(StyleguideApp,_AppBase);var _super174=_createSuper(StyleguideApp);function StyleguideApp(){_classCallCheck(this,StyleguideApp);return _super174.call(this);}_createClass(StyleguideApp,[{key:"_Init",value:function _Init(){var _this21=this;_get(_getPrototypeOf(StyleguideApp.prototype),"_Init",this).call(this);this._mainContainer=null;this._layers=[{id:"_mainContainer",cl:UIItemListLayer}];this._ignore=[AutoUpdateDialogBox,UIItem,UIItemListLayer,Group,BreadcrumbItem,DialogHandler,DialogInput,TestWidget];this._buttonConfigs=[{htitle:"htitle A text",label:'Label A',trigger:{thisArg:this,fn:this._TriggerTest,arg:UI_FLAG.SELF},variant:UI_FLAG.FRAME},{htitle:"htitle B text",group:'A',label:'Label B',toggle:{thisArg:this,fn:this._TriggerTest,arg:UI_FLAG.SELF},flavor:COMMON_FLAG.WARNING},{htitle:"htitle C text",group:'A',icon:'_',label:'Label C',toggle:{thisArg:this,fn:this._TriggerTest,arg:UI_FLAG.SELF}},{htitle:"htitle D text",label:'Label D',trigger:{thisArg:this,fn:this._TriggerTest,arg:UI_FLAG.SELF},flavor:UI_FLAG.CTA},{htitle:"htitle E text",icon:'_',trigger:{thisArg:this,fn:this._TriggerTest,arg:UI_FLAG.SELF},variant:UI_FLAG.FRAME,flavor:COMMON_FLAG.WARNING}];this._dialogInfos=POOL.Rent(DialogInfos);this._dialogInfos.options={title:"Title",message:"This is a message !",content:[],actions:this._buttonConfigs};var newData=function newData(p_id){var p_dirty=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var data=POOL.Rent(DataBlock);data.id=ID.New(p_id);if(p_dirty){data.Dirty();}return data;};this._fakeData=[newData("Data A"),newData("Data B",true),newData("Data C",true),newData("Data D"),newData("Data E")];this._catalogSample=Catalog.CreateFrom({name:"I'm a Catalog !"},[{name:"item 0"},{name:"item 1",data:this._fakeData[0]},{name:"folder 0",content:[{name:"subitem 0-0"},{name:"subitem 0-1",data:this._fakeData[1]}]},{name:"item 2"},{name:"folder 1",data:this._fakeData[3],content:[{name:"subitem 1-0"},{name:"subitem 1-1"}]},{name:"item 3"}]);this._drawerCatalog=function(){return Catalog.CreateFrom({name:"Drawer Catalog"},[{name:"View",viewType:View,data:_this21._fakeData[0]},{name:"Editor",viewType:Editor,data:_this21._fakeData[1]},{name:"Extended editor",viewType:EditorEx,data:_this21._fakeData[2]},{name:"InspectorShell",viewType:InspectorShell,data:_this21._fakeData[3]},{name:"Another View",viewType:View,data:_this21._fakeData[4]}]);};console.log(this._dialogInfos);}},{key:"AppReady",value:function AppReady(){_get(_getPrototypeOf(StyleguideApp.prototype),"AppReady",this).call(this);var keys=UI.instance._uiTypes.keys;this._mainContainer.SetVariants([{cl:ButtonBase,variants:[{size:UI_FLAG.SIZE_XS},{size:UI_FLAG.SIZE_S},{size:UI_FLAG.SIZE_L},{size:UI_FLAG.SIZE_M,flavor:COMMON_FLAG.INFOS},{size:UI_FLAG.SIZE_M,flavor:COMMON_FLAG.WARNING},{size:UI_FLAG.SIZE_M,flavor:COMMON_FLAG.ERROR},{size:UI_FLAG.SIZE_M,flavor:UI_FLAG.CTA},{size:UI_FLAG.SIZE_M,variant:UI_FLAG.MINIMAL},{size:UI_FLAG.SIZE_M,variant:UI_FLAG.MINIMAL,flavor:COMMON_FLAG.INFOS},{size:UI_FLAG.SIZE_M,variant:UI_FLAG.MINIMAL,flavor:COMMON_FLAG.WARNING},{size:UI_FLAG.SIZE_M,variant:UI_FLAG.MINIMAL,flavor:COMMON_FLAG.ERROR},{size:UI_FLAG.SIZE_M,variant:UI_FLAG.MINIMAL,flavor:UI_FLAG.CTA},{size:UI_FLAG.SIZE_M,variant:UI_FLAG.FRAME},{size:UI_FLAG.SIZE_M,variant:UI_FLAG.FRAME,flavor:COMMON_FLAG.INFOS},{size:UI_FLAG.SIZE_M,variant:UI_FLAG.FRAME,flavor:COMMON_FLAG.WARNING},{size:UI_FLAG.SIZE_M,variant:UI_FLAG.FRAME,flavor:COMMON_FLAG.ERROR},{size:UI_FLAG.SIZE_M,variant:UI_FLAG.FRAME,flavor:UI_FLAG.CTA}],fn:this._Bind(this._OnButtonCreated)},{cl:InspectorShell,fn:this._Bind(this._Stretch)},{cl:InputBase,variants:[{size:UI_FLAG.SIZE_XS},{size:UI_FLAG.SIZE_S},{size:UI_FLAG.SIZE_L}]},{cl:Toolbar,not:[WorkspaceCellNav,DrawerNav],variants:[{size:UI_FLAG.SIZE_XS},{size:UI_FLAG.SIZE_S},{size:UI_FLAG.SIZE_L}],fn:this._Bind(this._FillToolbar)},{cl:Tag,variants:[{},{size:UI_FLAG.SIZE_XS,flavor:COMMON_FLAG.WARNING},{size:UI_FLAG.SIZE_S,flavor:COMMON_FLAG.ERROR}],fn:this._Bind(this._PopInTag)},{cl:DialogBox,fn:this._Bind(this._FillDialog)},{cl:Drawer,fn:this._Bind(this._FillDrawer)},{cl:TreeItem,fn:this._Bind(this._FillTreeItem)}]);//for (let i = 0, n = keys.length; i < n; i++) {
for(var i=keys.length-1;i>=0;i--){var key=keys[i];if(this._ignore.includes(key)){continue;}var cl=UI.instance._uiTypes.Get(key);this._mainContainer.Handle(cl,key);}}// ----
},{key:"_FillToolbar",value:function _FillToolbar(p_toolbar){if(U.isInstanceOf(p_toolbar,DrawerNav)){return;}for(var i=0,n=this._buttonConfigs.length;i<n;i++){p_toolbar.CreateHandle(this._buttonConfigs[i]);}}},{key:"_FillDialog",value:function _FillDialog(p_dialogBox){p_dialogBox.data=this._dialogInfos;}},{key:"_FillDrawer",value:function _FillDrawer(p_drawer){p_drawer.catalog=this._drawerCatalog();this._Stretch(p_drawer);}},{key:"_FillTreeItem",value:function _FillTreeItem(p_citem){p_citem.data=this._catalogSample;}},{key:"_PopInTag",value:function _PopInTag(p_tagItem){return;PopIn.Pop({content:TestWidget,anchor:p_tagItem,placement:UI_FLAG.TOP_LEFT});}// ----
},{key:"_OnButtonCreated",value:function _OnButtonCreated(p_btn){p_btn.trigger={fn:function fn(btn){btn._flags.Toggle(UI_FLAG.TOGGLED);},arg:UI_FLAG.SELF};//this._PopInTag(p_btn);
}},{key:"_TriggerTest",value:function _TriggerTest(p_source){console.log("triggered : ".concat(p_source));}},{key:"_Stretch",value:function _Stretch(p_source){p_source.parentElement.style.setProperty("align-items","stretch");}}]);return StyleguideApp;}(AppBase);module.exports["default"]=module.exports=StyleguideApp;},{"./test-widget":277,"./ui-item":279,"./ui-item-list-layer":278,"@nkmjs/app-core":15,"@nkmjs/app-core/lib/dialogs":19,"@nkmjs/common":27,"@nkmjs/data-core":52,"@nkmjs/dialog":81,"@nkmjs/ui-core":166,"@nkmjs/ui-inputs":218,"@nkmjs/ui-workspace":234,"@nkmjs/utils":268}],277:[function(require,module,exports){'use strict';var _require469=require("@nkmjs/ui-core"),UI=_require469.UI,Widget=_require469.Widget;var TestWidget=/*#__PURE__*/function(_Widget9){_inherits(TestWidget,_Widget9);var _super175=_createSuper(TestWidget);function TestWidget(){_classCallCheck(this,TestWidget);return _super175.call(this);}_createClass(TestWidget,[{key:"_Style",value:function _Style(){return{':host':{'background-color':'rgb(0,255,0,0.5)','width':'150px','height':'150px','margin':'5px'}};}}]);return TestWidget;}(Widget);module.exports["default"]=module.exports=TestWidget;UI.Register("nkmjs-test-widget",TestWidget);},{"@nkmjs/ui-core":166}],278:[function(require,module,exports){'use strict';var _require470=require("@nkmjs/utils"),U=_require470.U,UDOM=_require470.UDOM;var _require471=require("@nkmjs/ui-core"),UI=_require471.UI,Layer=_require471.Layer,UI_FLAG=_require471.UI_FLAG;var _require472=require("@nkmjs/style"),CSS=_require472.CSS;var UIItem=require("./ui-item");var UIItemListLayer=/*#__PURE__*/function(_Layer3){_inherits(UIItemListLayer,_Layer3);var _super176=_createSuper(UIItemListLayer);function UIItemListLayer(){_classCallCheck(this,UIItemListLayer);return _super176.call(this);}_createClass(UIItemListLayer,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(UIItemListLayer.prototype),"_Init",this).call(this);this._variants=new Array(0);this._itemContainer=null;}// ----> DOM
},{key:"_Style",value:function _Style(){return CSS.Extends({':host':{display:"flex"//zoom:0.8,
},'.list-ctnr':{width:"100%",display:"flex",'flex-flow':"row wrap",'overflow-y':'scroll'},'.item':{flex:"1 1 auto",'min-width':"250px",'min-height':"150px"}},_get(_getPrototypeOf(UIItemListLayer.prototype),"_Style",this).call(this));}},{key:"_Render",value:function _Render(){this._itemContainer=UDOM.New("div",{"class":"list-ctnr"},this);}/**
     * [ { class:xxx, flags:[] } ]
     * @param {*} p_variants 
     */},{key:"SetVariants",value:function SetVariants(p_variants){this._variants=p_variants;}},{key:"Handle",value:function Handle(p_id,p_class){// fetch variations
var variants=null;var callback=null;for(var i=0,n=this._variants.length;i<n;i++){var v=this._variants[i];if(U.isInstanceOf(p_class,v.cl)&&(!v.not||!v.not.includes(p_class))){variants=v.variants;callback=v.fn;}}if(variants){for(var _i34=0,_n29=variants.length;_i34<_n29;_i34++){var item=this.Add(UIItem,"item",this._itemContainer);item.Display(p_id,p_class,variants[_i34]);if(callback){callback(item._sample);}}}else{var _item6=this.Add(UIItem,"item",this._itemContainer);_item6.Display(p_id,p_class);if(callback){callback(_item6._sample);}}}}]);return UIItemListLayer;}(Layer);_defineProperty(UIItemListLayer,"__default_orientation",UI_FLAG.VERTICAL);module.exports["default"]=module.exports=UIItemListLayer;UI.Register("nkmjs-ui-item-list-layer",UIItemListLayer);},{"./ui-item":279,"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}],279:[function(require,module,exports){'use strict';var _require473=require("@nkmjs/utils"),U=_require473.U,UDOM=_require473.UDOM,PATH=_require473.PATH;var _require474=require("@nkmjs/ui-core"),UI=_require474.UI,TextManipulator=_require474.TextManipulator,DisplayObjectContainer=_require474.DisplayObjectContainer;var _require475=require("@nkmjs/style"),CSS=_require475.CSS;var UIItem=/*#__PURE__*/function(_DisplayObjectContain3){_inherits(UIItem,_DisplayObjectContain3);var _super177=_createSuper(UIItem);function UIItem(){_classCallCheck(this,UIItem);return _super177.call(this);}_createClass(UIItem,[{key:"_Init",value:function _Init(){_get(_getPrototypeOf(UIItem.prototype),"_Init",this).call(this);this._label=null;this._errorTf=null;this._sample=null;this._visibilityRatio=0;this._isPainted=false;}// ----> DOM
},{key:"_Style",value:function _Style(){return CSS.Extends({':host':{//transition: 'all 0.10s ease',
//opacity: 0,
margin:"5px",padding:"5px",border:"1px solid #ffffff10",display:"flex",'flex-flow':"column wrap",'overflow':'hidden'},'.label':{'margin-block-start':0,'margin-block-end':0,'margin-bottom':"5px",'transform':'scale(0.8,0.8)'},'.item-wrapper':{position:"relative",padding:"5px",display:"flex",'align-items':"center",'justify-content':"center",flex:"1 1 auto",//'background-color': 'rgba(200,200,200,1)',
'background-image':"url('img/checker_20a.png')",'overflow':'hidden','min-width':0,'min-height':0},'.content':{flex:"1 1 auto"},'p.error':{color:"#ff0000"}},_get(_getPrototypeOf(UIItem.prototype),"_Style",this).call(this));}},{key:"_OnPaintChange",value:function _OnPaintChange(p_value){//this.style.opacity = this._isPainted ? 1 : 0;
}},{key:"_Render",value:function _Render(){this._label=new TextManipulator(UDOM.New("p",{"class":"label"},this));this._wrapper=UDOM.New("div",{"class":"item-wrapper"},this);this._errorTf=new TextManipulator(UDOM.New("p",{"class":"error"},this));}},{key:"Display",value:function Display(p_id,p_class,p_variant){var variants=" ";try{this._errorTf.Set(null);this._sample=this.Add(p_class,"content",this._wrapper);if(p_variant){for(var key in p_variant){if(key==="flags"){var flags=p_variant.flags;for(var i=0,n=flags.length;i<n;i++){this._flags.Set(flags[i],true);}}else{this._sample[key]=p_variant[key];variants+="".concat(p_variant[key]," / ");}}}if("title"in this._sample){this._sample.title=U.CamelSplit("".concat(p_class.name,"Title"));}if("subtitle"in this._sample){this._sample.subtitle=U.CamelSplit("".concat(p_class.name,"Subtitle"));}if("label"in this._sample){this._sample.label=U.CamelSplit("".concat(p_class.name,"Label"));}}catch(e){this._errorTf.Set(e.message);this.order=-1;throw e;console.error(e);}this._label.Set("<b>".concat(p_id,"</b><br/><i>").concat(p_class.name,"</i><br/><i><small>.").concat(variants,"</small></i>"));}}]);return UIItem;}(DisplayObjectContainer);_defineProperty(UIItem,"__NFO__",{css:["@/common.css","css/test.css"]});_defineProperty(UIItem,"__usePaintCallback",true);module.exports["default"]=module.exports=UIItem;UI.Register("nkmjs-ui-item",UIItem);},{"@nkmjs/style":155,"@nkmjs/ui-core":166,"@nkmjs/utils":268}]},{},[275]);