/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import {jsonrpc} from "@web/core/network/rpc_service";

publicWidget.registry.DynamicSolutionSnippet = publicWidget.Widget.extend({
    selector: '.solution_tab_snippet',
    disabledInEditableMode: true,
    start: function () {
        var self = this;
        var data = jsonrpc('/solution_tabs', {
            'tags': this.$target.data('tags'),
        }).then((data) => {
            self.$target.find('.container').empty().html($(data).find('.container').html());
        });
    }
});

export default publicWidget.registry.DynamicSolutionSnippet;