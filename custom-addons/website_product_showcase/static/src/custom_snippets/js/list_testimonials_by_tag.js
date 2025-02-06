/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import { jsonrpc } from "@web/core/network/rpc_service";
import { renderToFragment } from "@web/core/utils/render";

publicWidget.registry.TestimonialsByTagSnippet = publicWidget.Widget.extend({
    selector: ".template_testimonials_by_tag",
    disabledInEditableMode: false,

    willStart: function () {
        const parentPromise = this._super.apply(this, arguments);

        let dataset = this.$el.get(0).dataset.showTheseTags;
        let showNumber = dataset === undefined ? [] : JSON.parse(dataset).map(item => item.id).map(Number);

        const jsonPromise = jsonrpc(`/testimonials_by_tag`, {"tag_ids": showNumber})
            .then((response) => {
                this.testimonials = response;
            });

        return Promise.all([parentPromise, jsonPromise]);
    },

    start: function () {

        // 1) Render all testimonials
        const renderedElement = renderToFragment(
            "website_product_showcase.snippet_testimonials_by_tag",
            { testimonials: this.testimonials }
        );
        this.$el.empty().append(renderedElement);

        // 2) Initially show only 3 items
        this.displayLimit = 3;
        this._updateItemVisibility();

        // 3) Attach click handler for the "Mehr anzeigen" button
        this.$el.find("#load-mehr").on("click", this._onLoadMehr.bind(this));

        return this._super(...arguments);
    },


    _onLoadMehr: function (ev) {
        ev.preventDefault();
        this.displayLimit += 3;
        this._updateItemVisibility();
    },


    _updateItemVisibility: function () {
        const $items = this.$el.find("#testimonials-row > div.col-12");

        $items.each((index, item) => {
            if (index < this.displayLimit) {
                $(item).show();
            } else {
                $(item).hide();
            }
        });

        // If we've shown them all, hide the button
        if (this.displayLimit >= $items.length) {
            this.$el.find("#load-mehr").hide();
        }
    },
});