
function initializeItemCombobox() {

    $(function () {
        $.widget("custom.combobox", {
            _create: function () {
                this.wrapper = $("<span>")
                    .addClass("custom-combobox")
                    .insertAfter(this.element);

                this.element.hide();
                this._createAutocomplete();
                //this._createShowAllButton();
            },

            _createAutocomplete: function () {
                var selected = this.element.children(":selected"),
                    value = selected.val() ? selected.text() : "";

                this.input = $("<input>")
                    .appendTo(this.wrapper)
                    .val(value)
                    .attr("title", "")
                    .attr('id', 'AutoBox')
                    .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
                    .autocomplete({
                        delay: 0,
                        minLength: 0,
                        source: this._source.bind(this)
                    })
                    .tooltip({
                        classes: {
                            "ui-tooltip": "ui-state-highlight"
                        }
                    });

                this._on(this.input, {
                    autocompleteselect: function (event, ui) {

                        if (ui.item.value === -2){
                            //generic item
                            ShowItemModal($("#AutoBox")[0].value)
                        }
                        else if (ui.item.value != -1){//check if clicking 'no result

                            ui.item.option.selected = false;
                            this._trigger("select", event, {
                                item: ui.item.option
                            });
                            SpawnItemfromJSON(ui.item.option.value);
                        }
                        
                    },

                    autocompletechange: "_removeIfInvalid"
                });
            },

            _source: function (request, response) {
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                var items = this.element.children("option").map(function () {
                    var text = $(this).text();
                    if (this.value && (!request.term || matcher.test(text)))
                        return {
                            label: text,
                            value: text,
                            option: this
                        };
                })

                if (items.length === 0){
                    items.push( {
                        label: "No Results Found",
                        value: -1,
                        option: null
                    });
                    items.push( {
                        label: "Create Item",
                        value: -2,
                        option: null
                    });
                }

                response(items);
            },

            _removeIfInvalid: function (event, ui) {

                // Selected an item, nothing to do
                if (ui.item) {
                    return;
                }

                // Search for a match (case-insensitive)
                var value = this.input.val(),
                    valueLowerCase = value.toLowerCase(),
                    valid = false;
                this.element.children("option").each(function () {
                    if ($(this).text().toLowerCase() === valueLowerCase) {
                        this.selected = valid = true;
                        return false;
                    }
                });

                // Found a match, nothing to do
                if (valid) {
                    return;
                }

                // Remove invalid value
                // this.input
                //     .val("")
                //     .attr("title", value + " didn't match any item")
                //     .tooltip("open");
                // this.element.val("");
                // this._delay(function () {
                //     this.input.tooltip("close").attr("title", "");
                // }, 2500);
                // this.input.autocomplete("instance").term = "";
            },

            _destroy: function () {
                this.wrapper.remove();
                this.element.show();
            }
        });
        $("#EquipmentComboBox").combobox();

        var input = this.input, wasOpen = false;
        $("#AutoBox").on("mousedown", function () {
            //wasOpen = input.autocomplete( "widget" ).is( ":visible" );
            wasOpen = $("#AutoBox").autocomplete("widget").is(":visible");
        })
        $("#AutoBox").on("click", function () {
            $("#AutoBox").trigger("focus");

            // Close if already visible
            if (wasOpen) {
                return;
            }

            // Pass empty string as value to search for, displaying all results
            if ($("#AutoBox")[0].value.length > 0){
                $("#AutoBox").autocomplete("search", $("#AutoBox")[0].value);
            }
            else{
                $("#AutoBox").autocomplete("search", "");
            }
            
        });

        $( "#AutoBox" ).on( "autocompleteclose", function( event, ui ) {

            if (itemSelected){
                itemSelected = false;
                this.value = ""
            }

        });

        var itemSelected = false;
        $( "#AutoBox" ).on( "autocompleteselect", function( event, ui ) {
                itemSelected = true;
        });
    });
}
