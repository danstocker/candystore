/*global dessert, troop, sntls, shoeshine, candystore */
troop.postpone(candystore, 'DropdownButton', function (ns, className) {
    "use strict";

    var base = shoeshine.Widget,
        self = base.extend(className)
            .addTrait(shoeshine.JqueryWidget);

    /**
     * @name candystore.DropdownButton.create
     * @function
     * @returns {candystore.DropdownButton}
     */

    /**
     * @class
     * @extends shoeshine.Widget
     */
    candystore.DropdownButton = self
        .addPrivateMethods(/** @lends candystore.DropdownButton# */{
            /** @private */
            _updateCssClasses: function () {
                if (this.dropdownList.isOpen) {
                    this
                        .removeCssClass('dropdown-closed')
                        .addCssClass('dropdown-open');
                } else {
                    this
                        .removeCssClass('dropdown-open')
                        .addCssClass('dropdown-closed');
                }
            }
        })
        .addMethods(/** @lends candystore.DropdownButton# */{
            /** @ignore */
            init: function () {
                base.init.call(this);

                this
                    .elevateMethod('onDropdownOpen')
                    .elevateMethod('onDropdownClose');

                this.createLabelWidget()
                    .setChildName('dropdown-label')
                    .addToParent(this);

                /** @type {candystore.Dropdown} */
                this.dropdownList = this.createDropdownListWidget();
            },

            /** @ignore */
            afterAdd: function () {
                base.afterAdd.call(this);

                this._updateCssClasses();

                this
                    .subscribeTo(candystore.Popup.EVENT_POPUP_OPEN, this.onDropdownOpen)
                    .subscribeTo(candystore.Popup.EVENT_POPUP_CLOSE, this.onDropdownClose);
            },

            /**
             * @returns {string}
             * @ignore
             */
            contentMarkup: function () {
                return this.getChild('dropdown-label').toString();
            },

            /**
             * Override to specify custom label.
             * @returns {candystore.Label}
             */
            createLabelWidget: function () {
                return candystore.Label.create();
            },

            /**
             * Override to specify custom dropdown list.
             * @returns {candystore.Dropdown}
             */
            createDropdownListWidget: function () {
                return candystore.Dropdown.create();
            },

            /**
             * @param {shoeshine.WidgetEvent} event
             * @ignore
             */
            onDropdownOpen: function (event) {
                if (event.senderWidget === this.dropdownList) {
                    this._updateCssClasses();
                }
            },

            /**
             * @param {shoeshine.WidgetEvent} event
             * @ignore
             */
            onDropdownClose: function (event) {
                if (event.senderWidget === this.dropdownList) {
                    this._updateCssClasses();
                }
            },

            /** @ignore */
            onClick: function (event) {
                this.dropdownList
                    .setChildName('dropdown-list')
                    .addToParent(this)
                    .openPopup();

                event.stopPropagation();
            }
        });

    self.on('click', '', 'onClick');
});
