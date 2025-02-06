/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import { jsonrpc } from "@web/core/network/rpc_service";
import { renderToFragment } from "@web/core/utils/render";

publicWidget.registry.CustomerTestimonial = publicWidget.Widget.extend({
    selector: ".customer-testimonial-section",
    disabledInEditableMode: false,

    willStart: function () {
        return jsonrpc(`/customer_testimonial`, {}).then((response) => {
            this.testimonial = response.testimonial;
        });
    },

    start: function () {
        const renderedElement = renderToFragment(
            "website_product_showcase.snippet_customer_testimonial",
            { testimonial: this.testimonial }
        );

        const selector = $(".customer-testimonial-section");
        selector.empty();
        selector.append(renderedElement);
    },
});
