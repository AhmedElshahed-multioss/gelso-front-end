# -*- coding: utf-8 -*-
from odoo import models, fields, api
from odoo.tools import html_translate


class TestimonialTagCategory(models.Model):
    _name = 'testimonial.tag.category'
    _description = 'Testimonial Product Tag Category'
    _order = 'sequence ASC'

    sequence = fields.Integer(string='Sequence', default=10)

    name = fields.Char(string="Tag Category Name", required=True, translate=True)
    description = fields.Text(string='Description', translate=True)
    tag_ids = fields.One2many('testimonial.tag', 'category_id', string='Tags')
    color = fields.Integer(string='Color Index', default=0)

    _sql_constraints = [
        ('name_uniq', 'unique (name)', 'This tag category already exists!')
    ]
