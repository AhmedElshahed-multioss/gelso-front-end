/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import { renderToFragment } from "@web/core/utils/render";

publicWidget.registry.CertificatesSection = publicWidget.Widget.extend({
    selector: ".certificates-section",
    disabledInEditableMode: false,

    start: function () {
        // Dummy data for now
        const certificates = [
            { id: 1, icon_class: "fas fa-certificate", title: "ISO 9001", subtitle: "(Qualitätsmanagement)" },
            { id: 2, icon_class: "fas fa-leaf", title: "ISO 14001", subtitle: "(Umweltmanagement)" },
            { id: 3, icon_class: "fas fa-bolt", title: "ISO 50001", subtitle: "(Energiemanagement)" },
            { id: 4, icon_class: "fas fa-briefcase", title: "ISO 45001", subtitle: "(Arbeitsschutzmanagement)" }
        ];

        const renderedElement = renderToFragment(
            "website_product_showcase.snippet_certificates",
            { certificates: certificates }
        );

        const selector = $(".certificates-section");
        selector.empty();
        selector.append(renderedElement);
    },
});