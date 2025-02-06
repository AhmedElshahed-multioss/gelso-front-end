# -*- coding: utf-8 -*-
from odoo import models, fields, api


class TestimonialImage(models.Model):
    _name = 'testimonial.image'
    _description = 'Testimonial Image'
    _order = 'sequence ASC'

    sequence = fields.Integer(string='Sequence', default=10)

    name = fields.Char(string='Image Name', required=True, translate=True)
    description = fields.Text(string='Image Description', translate=True)
    image = fields.Image(string='Image File')
