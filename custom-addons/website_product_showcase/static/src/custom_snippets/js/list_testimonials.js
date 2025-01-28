/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import {jsonrpc} from "@web/core/network/rpc_service";
import {renderToFragment} from "@web/core/utils/render";

// SELECTOR: .template_list_all_testimonials
// TEMPLATE: website_product_showcase.snippet_all_testimonials

publicWidget.registry.AllTestimonialsSnippet = publicWidget.Widget.extend({
    selector: ".template_list_all_testimonials",
    disabledInEditableMode: false,

    willStart: function () {
        const parentPromise = this._super.apply(this, arguments);

        // Make a JSON-RPC call to fetch all testimonial data
        const jsonPromise = jsonrpc(`/testimonials`, {})
            .then((response) => {
                this.testimonials = response;
            })

        return Promise.all([parentPromise, jsonPromise]);
    },

    start: function () {
        // Render the template with the testimonial data
        let renderedElement = renderToFragment('website_product_showcase.snippet_all_testimonials', {
            testimonials: this.testimonials
        })

        // Append rendered element to the template
        let selector = $('.template_list_all_testimonials')
        selector.empty();
        selector.append(renderedElement);
    }
});