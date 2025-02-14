from odoo import models, fields, api


class SolutionTagCategory(models.Model):
    _name = 'solution_search.tag.category'
    _description = 'Tag Category'
    _inherit = ['website.seo.metadata']
    _order = 'sequence ASC'

    sequence = fields.Integer(string='Sequence', default=10)
    name = fields.Char(string='Name', required=True, translate=True)
    tag_ids = fields.One2many('solution_search.tag', 'category_id', string='Tags')

    _sql_constraints = [
        ('name_uniq', 'unique (name)', 'Category name already exists!')
    ]
