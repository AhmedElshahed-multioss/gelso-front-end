import base64
from odoo import models, fields, api, tools, _
from odoo.exceptions import ValidationError

from odoo.addons.web_editor.tools import get_video_embed_code, get_video_thumbnail


class SolutionMedia(models.Model):
    _name = 'solution_search.media'
    _description = 'Solution Media'
    _inherit = ['image.mixin']

    name = fields.Char("Name", required=True)
    sequence = fields.Integer(default=10)

    image_1920 = fields.Image()

    video_url = fields.Char('Video URL',
                            help='URL of a video for showcasing your product.')
    embed_code = fields.Html(compute="_compute_embed_code", sanitize=False)

    @api.onchange('video_url')
    def _onchange_video_url(self):
        if not self.image_1920:
            thumbnail = get_video_thumbnail(self.video_url)
            self.image_1920 = thumbnail and base64.b64encode(thumbnail) or False

    @api.depends('video_url')
    def _compute_embed_code(self):
        for image in self:
            image.embed_code = get_video_embed_code(image.video_url) or False

    @api.constrains('video_url')
    def _check_valid_video_url(self):
        for image in self:
            if image.video_url and not image.embed_code:
                raise ValidationError(
                    _("Provided video URL for '%s' is not valid. Please enter a valid video URL.", image.name))
