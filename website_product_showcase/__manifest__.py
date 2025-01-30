{
    'name': "website_product_showcase",

    'summary': "A showcase model for Gelso AG to create and categorise products on their website.",

    'description': """
    A showcase model for Gelso AG to create and categorise products on their webs.
    """,

    'author': "Multioss",
    'website': "https://www.multioss.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'website',
    'version': '0.1',
    'application': True,
    'installable': True,
    'license': 'AGPL-3',

    # any module necessary for this one to work correctly
    'depends': ['base', 'product', 'website_sale', 'web_editor'],

    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'website_product_showcase/static/src/scss/custom_style.scss',
            'website_product_showcase/static/src/scss/bootstrap_overrides.scss',
            'website_product_showcase/static/src/custom_snippets/xml/snippet_templates.xml',
            'website_product_showcase/static/src/custom_snippets/js/list_testimonials.js',
            'website_product_showcase/static/src/custom_snippets/js/single_testimonial.js',
            'website_product_showcase/static/src/custom_snippets/js/list_tags.js',
            'website_product_showcase/static/src/custom_snippets/js/list_testimonials_by_tag.js',
            'website_product_showcase/static/src/custom_snippets/js/showcase.js',
            'website_product_showcase/static/src/custom_snippets/js/faq_testimonial.js',
            'website_product_showcase/static/src/custom_snippets/js/certificates.js',
            'website_product_showcase/static/src/custom_snippets/js/customer_testimonial.js',
            'website_product_showcase/static/src/custom_snippets/js/shuffle/shuffle.js',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
        ]

    },
    'data': [
        'security/ir.model.access.csv',
        'views/showcase_views.xml',
        'views/showcase_menus.xml',
        'views/templates.xml',
        'views/themes.xml'
    ],
}
# -*- coding: utf-8 -*-
