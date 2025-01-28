/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import { jsonrpc } from "@web/core/network/rpc_service";
import { renderToFragment } from "@web/core/utils/render";

// SELECTOR: .template_list_tags
// TEMPLATE: website_product_showcase.snippet_all_tags

publicWidget.registry.AllTagsSnippet = publicWidget.Widget.extend({
  selector: ".template_list_tags",
  disabledInEditableMode: false,

  willStart: function () {
    const parentPromise = this._super.apply(this, arguments);

    // Make a JSON-RPC call to fetch all testimonial data
    const jsonPromise = jsonrpc(`/tags/json`, {}).then((response) => {
      this.categories = response;
    });

    return Promise.all([parentPromise, jsonPromise]);
  },

  start: function () {
    // Render the template with the testimonial data
    let renderedElement = renderToFragment(
      "website_product_showcase.snippet_all_tags",
      {
        categories: this.categories,
        tags: this.tags,
      }
    );

    // Append rendered element to the template
    let selector = $(".template_list_tags");
    selector.empty();
    selector.append(renderedElement);
  },
});
