from odoo import models, fields, api


class SolutionTag(models.Model):
    _name = 'solution_search.tag'
    _description = 'Tag'
    _inherit = ['website.seo.metadata']
    _order = 'sequence ASC'

    sequence = fields.Integer(string='Sequence', default=10)
    name = fields.Char(string='Name', required=True)
    description = fields.Html(string='Description', translate=True)
    category_id = fields.Many2one('solution_search.tag.category', string='Category')
    solution_ids = fields.Many2many('solution_search.solution', string='Entry')

