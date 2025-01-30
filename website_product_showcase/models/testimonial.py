# -*- coding: utf-8 -*-
from odoo import models, fields, api
from odoo.tools import html_translate
from markupsafe import escape as html_escape


class Testimonial(models.Model):
    _name = 'testimonial'
    _description = 'Testimonial Product'
    _order = 'sequence ASC'

    sequence = fields.Integer(string='Sequence', default=10)

    name = fields.Char(string='Name', required=True, translate=True)
    summary = fields.Text(string='Summary', required=True, translate=True)
    description = fields.Text(string='Description', translate=True)
    reference_number = fields.Char()
    guarantee = fields.Selection([
        ('month', '1 Month'),
        ('year', '1 Year'),
        ('lifetime', 'Lifetime'), ], default='month')
    date_delivered = fields.Date(string='Project End Date', required=True)
    date_received = fields.Date(string='Project Start Date', required=True)
    lead_time = fields.Integer(compute="_compute_lead_time", store=True)
    similar_product_ids = fields.Many2many(
        comodel_name='testimonial',
        relation='testimonial_similar_rel',
        column1='name',
        column2='similar_id',
        string='Similar Products'
    )
    media_ids = fields.Many2many('product.template', string='Media')
    certification_image = fields.Image(string='Certification Image (Optional)')
    certification_text = fields.Text(string='Certification Text (Optional)')
    customer_id = fields.Many2one('res.partner', string='Customer')

    customer_permission = fields.Selection([
        ('0', 'No Customer Information Visible'),
        ('1', 'Customer Information Visible WITHOUT contact details'),
        ('2', 'Customer Information Visible WITH contact details'), ], default='0')

    tags = fields.Many2many('testimonial.tag', 'id', string='Tags')

    @api.depends("date_received", "date_delivered")
    def _compute_lead_time(self):
        for record in self:
            if record.date_received and record.date_delivered:
                record.lead_time = (record.date_delivered - record.date_received).days
            else:
                record.lead_time = 0
