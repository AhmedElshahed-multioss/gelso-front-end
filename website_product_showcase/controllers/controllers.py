import json
from odoo import http
from odoo.http import request


class Main(http.Controller):

    @http.route('/customer_testimonial', type='json', auth='public')
    def get_customer_testimonial(self):
        # Dummy Data
        testimonial = {
            "image": "/website_product_showcase/static/src/assets/customer.png",
            "quote": "Die Zusammenarbeit mit Gelso war extrem Vorteilhaft und ging professionell und im Zeitrahmen über die Bühne",
            "name": "Jane Doe",
            "position": "CTO Google"
        }

        return {"testimonial": testimonial}

    @http.route('/certificates', type='json', auth='public')
    def get_certificates(self):
        dummy_data = [
            {'id': 1, 'icon_class': "fas fa-certificate", 'title': "ISO 9001", 'subtitle': "(Qualitätsmanagement)"},
            {'id': 2, 'icon_class': "fas fa-leaf", 'title': "ISO 14001", 'subtitle': "(Umweltmanagement)"},
            {'id': 3, 'icon_class': "fas fa-bolt", 'title': "ISO 50001", 'subtitle': "(Energiemanagement)"},
            {'id': 4, 'icon_class': "fas fa-briefcase", 'title': "ISO 45001", 'subtitle': "(Arbeitsschutzmanagement)"},
        ]

        return {'certificates': dummy_data}

    @http.route('/faq_testimonials', type='json', auth='public')
    def get_faq_testimonials(self):
        dummy_data = [
            {'id': 1, 'question': "Welche Frage könnte hier wohl stehen?", 'answer': "Lorem ipsum dolor sit amet..."},
            {'id': 2, 'question': "Mit dieser Frage können die Kund:innen überzeugt werden?",
             'answer': "Lorem ipsum dolor sit amet..."},
            {'id': 3, 'question': "Das hier sollte wohl eine Art FAQ zum Testamonial sein?",
             'answer': "Lorem ipsum dolor sit amet..."},
        ]

        return {'faq_items': dummy_data}

    # Route for the showcase page
    @http.route('/showcase', type='json', auth='public')
    def show_showcase(self, tags=False, page=1, **kw):
        base_domain = []
        domain = base_domain
   
        testimonials = request.env['testimonial'].search(domain)
        testimonials_data = testimonials.read()

        categories = request.env['testimonial.tag.category'].sudo().search([])
        categories_data = []
        for x in range(len(categories)):
            # Build a list of tags
            tag_list = []
            for y in range(len(categories[x].tag_ids)):
                tag_list.append({
                    'id': categories[x].tag_ids[y].id,
                    'name': categories[x].tag_ids[y].name,
                })
            # Add Tags to Result
            categories_data.append({
                'id': categories[x].id,
                'name': categories[x].name,
                'tag_ids': tag_list,
            })

        return {
            'testimonials': testimonials_data,
            'categories': categories_data,

        }

    # Route to get all testimonials in JSON format
    @http.route('/testimonials', type='json', auth='none')
    def testimonials_json(self):
        records = request.env['testimonial'].sudo().search([])
        return records.read(['id', 'name', 'summary', 'description', 'media_ids', 'tags'])

    # Route to get a single testimonial in JSON format
    @http.route('/testimonials/json_single/<model("testimonial"):record>', type='json', auth='public')
    def my_model_json_single(self, record):
        return record.read()

    # Route to get tags and categories JSON format
    @http.route('/tags/json', type='json', auth='none')
    def tags_json(self):
        categories = request.env['testimonial.tag.category'].sudo().search([])
        results = []
        for x in range(len(categories)):
            # Build a list of tags
            tag_list = []
            for y in range(len(categories[x].tag_ids)):
                tag_list.append({
                    'id': categories[x].tag_ids[y].id,
                    'name': categories[x].tag_ids[y].name,
                })
            # Add Tags to Result
            results.append({
                'id': categories[x].id,
                'name': categories[x].name,
                'tag_ids': tag_list,
            })
        return results

    # Route to get all testimonials filtered by tag in JSON format
    @http.route('/testimonials_by_tag/', type='json', auth='none')
    def testimonials_by_tag(self):
        data = request.get_json_data()  # Get the JSON body from the POST request
        tag_ids = data['params']['tag_ids']
        if tag_ids:
            # Assuming `tags` is a Many2many field on the 'testimonial' model
            records = request.env['testimonial'].sudo().search([
                ("tags", "in", tag_ids)
            ])
        else:
            records = request.env['testimonial'].sudo().search([])

        return records.read([
            'id',
            'name',
            'summary',
            'description',
            'media_ids',
            'tags'
        ])
        # return tag_ids
