/**
 * 
 * @employSchema
 * @eventListeners
 * @sensibleDefaults
 * @svgSrc
 * @documentation
 * @documentationApi
 * @iconUniformNames
 * @minimizeProperties
 * @objectifyEventListeners
 * @parentElementSelector
 * @distinctEventListeners
 * @propertiesElemUnderscore
 * @propertify
 * @propertyNamingConventions
 * @methodNamingConventions
 * @htmlReadyMethods
 */




/**
 * 
 * @param {Object}                   schema
 * @param {HTMLElement|CSSRule}      schema.parent
 * @param {String}                  [schema.title]
 * @param {Boolean}                 [schema.htmlReady]
 * @param {String}                  [schema.name]
 * @param {String}                  [schema.form]
 * @param {Number}                  [schema.tabindex]
 * @param {SVGElement}              [schema.iconView]
 * @param {SVGElement}              [schema.iconHide]
 * @param {Boolean}                 [schema.autocomplete]
 * @param {Boolean}                 [schema.autofocus]
 * @param {Boolean}                 [schema.spellcheck]
 * @param {Boolean}                 [schema.selectoonfocus]
 * @param {Function}                [schema.onInput]
 * @param {Object[]}                [schema.eventListeners]
 * @param {'input'}                  schema.eventListeners[].type
 * @param {Function}                 schema.eventListeners[].listener
 */
function PasswordBox( schema ) {

    /**
     * 
     * @property
     * @private
     */
    this._selectoonfocus = false;

    /**
     * 
     * @property
     * @private
     */
    this._parentElem = null;

    /**
     * 
     * @property
     * @private
     */
    this.titleSpanElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._sampElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._inputElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._iconElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._iconViewSrc = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><defs/><path d='M19.6 2.56L16.26 5.7C14.99 5.27 13.57 5 12 5 4.45 5 0 11.55 0 11.55s1.93 2.95 5.15 5.14l-2.92 2.9 1.42 1.42L21.02 3.98 19.6 2.56zM13.6 8.34a3.99 3.99 0 00-5.27 5.2L6.6 15.26a18.17 18.17 0 01-4.06-3.66C4.03 9.95 7.35 7 12.02 7c.92 0 1.8.12 2.6.32L13.6 8.34zm-2.89 7.43l5.1-5a3.99 3.99 0 01-5.1 5zM24 11.55S19.75 19 12.02 19c-1.38 0-2.67-.3-3.86-.74l1.62-1.58c.71.2 1.46.32 2.24.32 4.79 0 8.1-3.53 9.5-5.36a15.3 15.3 0 00-3.59-2.96l1.5-1.46A16.62 16.62 0 0124 11.55z'/></svg>";

    /**
     * 
     * @property
     * @private
     */
    this._iconHideSrc = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><defs/><path d='M12.02 7c4.75 0 8.06 3.01 9.5 4.64-1.4 1.83-4.71 5.36-9.5 5.36-4.43 0-7.94-3.54-9.48-5.4C4.03 9.94 7.35 7 12 7zm0-2C4.45 5 0 11.55 0 11.55S4.83 19 12.02 19C19.75 19 24 11.55 24 11.55S19.7 5 12.02 5zM12 8a4 4 0 100 8 4 4 0 000-8z'/></svg>";

    /**
     * 
     * @property
     * @private
     */
    this._onInputCallback = null;

    /**
     * 
     * @property
     * @private
     */
    this._inputId = null;

    /**
     * @property
     * @private
     */
    this._inputName = null;




    var autofocus = false;

    if ( schema.hasOwnProperty( 'autofocus' ) ) {

        autofocus = schema.autofocus;

    }

    if ( schema.hasOwnProperty( 'name' ) ) {

        this._inputName = schema.name;

    }

    if ( schema.hasOwnProperty( 'iconView' ) ) {

        this._iconViewSrc = schema.iconView;

    }

    if ( schema.hasOwnProperty( 'iconHide' ) ) {

        this._iconHideSrc = schema.iconHide;

    }

    if ( schema.hasOwnProperty( 'selectoonfocus' ) ) {

        this._selectoonfocus = schema.selectoonfocus;

    }

    if ( typeof schema.parent === 'object' ) {

        this._parentElem = schema.parent;

    } else if ( typeof schema.parent === 'string' ) {

        this._parentElem = document.querySelector( schema.parent );
        this._inputId = 'passwordbox_' + schema.parent.replace( '.', '' );

    }

    if ( schema.hasOwnProperty( 'htmlReady' ) && schema.htmlReady === true ) {

        this._createFromHTML();

    } else {

        this._createFromSchema( schema );

    }

    if ( schema.hasOwnProperty( 'eventListeners' ) ) {

        for ( var i = 0 ; i < schema.eventListeners.length ; i++ ) {

            if ( schema.eventListeners[ i ].type === 'input' ) {

                this._onInputCallback = schema.eventListeners[ i ].listener;

            }

        }

    }

    if ( schema.hasOwnProperty( 'onInput' ) ) {

        this._onInputCallback = schema.onInput;

    }

    this._inputElem.addEventListener( 'input', this._evt_input_inputElem.bind( this ) );
    this._iconElem.addEventListener( 'click', this._evt_click_iconElem.bind( this ) );

    this._parentElem.addEventListener( 'click', this._evt_click_parentElem.bind( this ) );

    if ( autofocus === true ) {

        this._inputElem.setAttribute( 'autofocus', true );
        this._inputElem.focus();

    }

};

/**
 * 
 * @param {String} errorMessage 
 */
PasswordBox.prototype.setError = function( errorMessage ) {

    this._parentElem.classList.add( 'error' );
    this._sampElem.textContent = errorMessage;

};

/**
 * 
 */
PasswordBox.prototype.clearError = function() {

    this._parentElem.classList.remove( 'error' );
    this._sampElem.textContent = '';

};

/**
 * 
 * @param {String} value 
 */
PasswordBox.prototype.setValue = function( value ) {

    this._inputElem.value = value;

};

/**
 * 
 * @returns {String}
 */
PasswordBox.prototype.getValue = function() {

    return this._inputElem.value;

};

/**
 * 
 * @param {String} title 
 */
PasswordBox.prototype.setTitle = function( title ) {

    this.titleSpanElem.innerHTML = title;

};

/**
 * 
 */
PasswordBox.prototype.focus = function() {

    this._evt_click_parentElem();

};




/**
 * 
 * @private
 * @param {Event} evt 
 */
PasswordBox.prototype._evt_click_iconElem = function( evt ) {

    if ( this._iconElem.classList.contains( 'hide' ) === true ) {

        this._iconElem.classList.remove( 'hide' );
        this._inputElem.setAttribute( 'type', 'password' );
        this._iconElem.innerHTML = this._iconViewSrc;

    } else {

        this._iconElem.classList.add( 'hide' );
        this._inputElem.setAttribute( 'type', 'text' );
        this._iconElem.innerHTML = this._iconHideSrc;

    }

};

/**
 * 
 * @private
 */
PasswordBox.prototype._evt_click_parentElem = function() {

    if ( this._inputElem !== null ) {

        this._inputElem.focus();

    }

    if ( this._selectoonfocus === true ) {

        this._inputElem.select();

    }

};

/**
 * 
 * @private
 * @param {Event} evt 
 */
PasswordBox.prototype._evt_input_inputElem = function( evt ) {

    if ( this._inputElem.value !== '' ) {

        this.clearError();

    }
    
    if ( this._onInputCallback !== null ) {

        this._onInputCallback( evt );

    }

};

/**
 * 
 * @private
 * @method
 */
PasswordBox.prototype._createFromHTML = function() {

    this.titleSpanElem  = this._parentElem.querySelector( '.title' );
    this._sampElem      = this._parentElem.querySelector( '.errorElem' );
    this._inputElem     = this._parentElem.querySelector( 'input' );
    this._iconElem      = this._parentElem.querySelector( '.icon' );

    if ( this._inputElem.hasAttribute( 'name' ) ) {

        this._inputName = this._inputElem.getAttribute( 'name' );

    }

};

/**
 * 
 * @private
 * @method
 * @param {Object} schema 
 */
PasswordBox.prototype._createFromSchema = function( schema ) {

    var autocomplete    = false;
    var spellcheck      = false;

    if ( schema.hasOwnProperty( 'autocomplete' ) ) {

        autocomplete = schema.autocomplete;

    }

    if ( schema.hasOwnProperty( 'spellcheck' ) ) {

        spellcheck = schema.spellcheck;

    }

    var fragment = document.createDocumentFragment();

    var titleElem = document.createElement( 'DIV' );
    titleElem.classList.add( 'upperRow' );
    fragment.appendChild( titleElem );

    this.titleSpanElem = document.createElement( 'LABEL' );
    this.titleSpanElem.classList.add( 'title' );
    this.titleSpanElem.innerHTML = schema.title;
    titleElem.appendChild( this.titleSpanElem );

    this._sampElem = document.createElement( 'SAMP' );
    this._sampElem.classList.add( 'errorElem' );
    titleElem.appendChild( this._sampElem );

    var bodyElem = document.createElement( 'DIV' );
    bodyElem.classList.add( 'body' );
    fragment.appendChild( bodyElem );

    this._inputElem = document.createElement( 'INPUT' );
    this._inputElem.classList.add( 'inputElem' );
    this._inputElem.setAttribute( 'type', 'password' );
    this._inputElem.spellcheck = spellcheck;
    bodyElem.appendChild( this._inputElem );

    if ( this._inputId !== null ) {

        this.titleSpanElem.setAttribute( 'for', this._inputId );
        this._inputElem.id = this._inputId;

    }

    if ( autocomplete === true ) {

        this._inputElem.autocomplete = 'on';

    }

    if ( this._inputName !== null ) {

        this._inputElem.setAttribute( 'name', this._inputName );

    }

    if ( schema.hasOwnProperty( 'tabindex' ) === true ) {

        this._inputElem.setAttribute( 'tabindex', schema.tabindex );

    }

    if ( schema.hasOwnProperty( 'form' ) === true ) {

        this._inputElem.setAttribute( 'form', schema.form );

    }

    this._iconElem = document.createElement( 'SPAN' );
    this._iconElem.classList.add( 'icon' );
    this._iconElem.innerHTML = this._iconViewSrc
    bodyElem.appendChild( this._iconElem );

    this._parentElem.appendChild( fragment );

};