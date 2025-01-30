# -*- coding: utf-8 -*-
from odoo import models, fields, api
from odoo.tools import html_translate


class TestimonialTag(models.Model):
    _name = 'testimonial.tag'
    _description = 'Testimonial Product Tag'
    _order = 'sequence ASC'

    sequence = fields.Integer(string='Sequence', default=10)

    name = fields.Char(string="Tag Name", required=True, translate=True)
    description = fields.Text(string='Description', translate=True)
    color = fields.Integer(related="category_id.color", string='Color Index', store=True)
    testimonial_product_ids = fields.Many2many('testimonial', string='Tags')
    category_id = fields.Many2one('testimonial.tag.category', string='Tag Categories')

    _sql_constraints = [
        ('name_uniq', 'unique (name)', 'This tag already exists!')
    ]
