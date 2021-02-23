## TAGS

There is a variety of custom tag associated with member and functions, the most common being access modifiers.  
Since we're in javascript, these are merely semantic and cannot be _enforced_ on a language level, but they give important information when it comes to how a function is intended to be used.

| Tag | Description |
|---|---|
|<h4 class="name demo"><span class="attrib-tags"><span class="type-signature-tag tag-static">static</span></span></h4> | Static member or function
|<h4 class="name demo"><span class="attrib-tags"><span class="type-signature-tag tag-protected">protected</span></span></h4> | Protected member or function. Used internally
|<h4 class="name demo"><span class="attrib-tags"><span class="type-signature-tag tag-read-only">read-only</span></span></h4>|Read only member (has only a getter)
|<h4 class="name demo"><span class="attrib-tags"><span class="type-signature-tag tag-debug">debug</span></span></h4>|Intended for debug
|<h4 class="name demo"><span class="attrib-tags"><span class="type-signature-tag tag-slow">slow</span></span></h4>|Slow (usually because it triggers a reflow)
|<h4 class="name demo"><span class="attrib-tags"><span class="type-signature-tag tag-override-me">override-me</span></span></h4>|You most likely want to override this function (while retaining original behavior)


_Note: A minimal version of these tag can be seen in the navigation menu, mostly to make it easy to spot 'override-me' functions & members._

## INHERITANCE & DISCREET MEMBERS

If a function or member is inherited, and/or not overrided in a meaningful manner (== not worthy of having their doc printed in full), the full documentation is only accessible in the extended class -- which is linked anyway.

On top of that, some members have their doc flagged `@discreet` in the code source. A `@discreet` member or function is only documented in its original class, and its doc is <ins>not inherited</ins> in order to unclutter the doc from low-interest content. A good example of that are all the transformation members & functions in {@link ui.core.DisplayObject|DisplayObject}, which can only be seen in the base class but won't show up in inherited members.
