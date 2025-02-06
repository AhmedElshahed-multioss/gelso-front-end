/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import { renderToFragment } from "@web/core/utils/render";

publicWidget.registry.FAQTestimonial = publicWidget.Widget.extend({
    selector: ".faq-testimonial-section",
    disabledInEditableMode: false,

    start: function () {
        // Dummy data for now
        const faq_items = [
            { id: 1, question: "Welche Frage könnte hier wohl stehen?", answer: "Lorem ipsum dolor sit amet..." },
            { id: 2, question: "Mit dieser Frage können die Kund:innen überzeugt werden?", answer: "Lorem ipsum dolor sit amet..." },
            { id: 3, question: "Das hier sollte wohl eine Art FAQ zum Testamonial sein?", answer: "Lorem ipsum dolor sit amet..." }
        ];

        const renderedElement = renderToFragment(
            "website_product_showcase.snippet_faq_testimonial",
            { faq_items: faq_items }
        );

        const selector = $(".faq-testimonial-section");
        selector.empty();
        selector.append(renderedElement);
    },
});
