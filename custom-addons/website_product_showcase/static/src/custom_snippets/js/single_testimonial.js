/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import { jsonrpc } from "@web/core/network/rpc_service";
import { renderToFragment } from "@web/core/utils/render";

// SELECTOR: .template_single_testimonial
// TEMPLATE: website_product_showcase.snippet_single_testimonial

publicWidget.registry.TestimonialsSingleSnippet = publicWidget.Widget.extend({
  selector: ".template_single_testimonial",
  disabledInEditableMode: false,

  willStart: function () {
    const parentPromise = this._super.apply(this, arguments);

    // Read the data-show-testimonial attribute from the widget's element
    let dataset = this.$el.get(0).dataset.showTestimonial;

    // First render (before user selection in options) uses first testimonial in database
    let route =
      dataset === undefined
        ? `/testimonials`
        : `/testimonials/json_single/${parseInt(dataset)}`;

    const jsonPromise = jsonrpc(route, {}).then((response) => {
      this.testimonial = response[0];
    });
    return Promise.all([parentPromise, jsonPromise]);
  },

  start: function () {
    // Render the template with the testimonial data
    let renderedElement = renderToFragment(
      "website_product_showcase.snippet_single_testimonial",
      {
        testimonial: this.testimonial,
      }
    );

    // Append rendered element to the template
    let selector = $(".template_single_testimonial");
    selector.empty();
    selector.append(renderedElement);
  },
});
