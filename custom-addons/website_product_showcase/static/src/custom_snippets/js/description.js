/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import { jsonrpc } from "@web/core/network/rpc_service";
import { renderToFragment } from "@web/core/utils/render";

publicWidget.registry.TestimonialSearch = publicWidget.Widget.extend({
  selector: ".template_description",
  disabledInEditableMode: false,

  init: function () {
    this._super.apply(this, arguments);
    this.activeFilters = [];
    this.searchQuery = "";
  },

  willStart: function () {
    const parentPromise = this._super.apply(this, arguments);

    // Fetch data for testimonials and categories
    const jsonPromise = jsonrpc(`/showcase/<model("testimonial"):testimonial`, {}).then((response) => {
      this.testimonials = response.testimonials;
      this.categories = response.categories;
    });

    return Promise.all([parentPromise, jsonPromise]);
  },

  start: function () {
    // Render the template with data
    const renderedElement = renderToFragment(
      "website_product_showcase.snippet_description",
      {
        testimonials: this.testimonials,
      }
    );

    const selector = $(".template_description");
    selector.empty();
    selector.append(renderedElement);
  },
});