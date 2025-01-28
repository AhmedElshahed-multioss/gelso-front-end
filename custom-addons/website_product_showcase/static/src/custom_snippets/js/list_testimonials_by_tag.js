/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import {jsonrpc} from "@web/core/network/rpc_service";
import {renderToFragment} from "@web/core/utils/render";

// SELECTOR: .template_testimonials_by_tag
// TEMPLATE: website_product_showcase.snippet_testimonials_by_tag

publicWidget.registry.TestimonialsByTagSnippet = publicWidget.Widget.extend({
    selector: ".template_testimonials_by_tag",
    disabledInEditableMode: false,

    willStart: function () {
        const parentPromise = this._super.apply(this, arguments);

        // Read the data-show-testimonial attribute from the widget's element
        let dataset = this.$el.get(0).dataset.showTheseTags;
        let showNumber = dataset === undefined ? [] : JSON.parse(dataset).map(item => item.id).map(Number);

        // Make a JSON-RPC call to fetch all testimonial data
        const jsonPromise = jsonrpc(`/testimonials_by_tag`, {"tag_ids": showNumber})
            .then((response) => {
                this.testimonials = response;
            })

        return Promise.all([parentPromise, jsonPromise]);
    },

    start: function () {
        // Render the template with the testimonial data
        let renderedElement = renderToFragment('website_product_showcase.snippet_testimonials_by_tag', {
            testimonials: this.testimonials
        })

        // Append rendered element to the template
        let selector = $('.template_testimonials_by_tag')
        selector.empty();
        selector.append(renderedElement);
    }
});