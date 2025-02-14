{
    'name': 'Solution Search',
    'summary': 'Solution Search',
    'description': 'Module to search for solutions (examples) on the website',
    'category': 'Website',
    'version': '1.23',
    'depends': ['website', 'website_blog'],
    'data': [
        'security/ir.model.access.csv',
        'views/solution_views.xml',
        'views/snippets.xml',
        'views/templates.xml'
    ],
    'assets': {
        'web.assets_frontend': [
            'solution_search/static/src/scss/solutions.scss',
            'solution_search/static/src/js/shuffle.js',
            'solution_search/static/src/js/solutions.js',
            'solution_search/static/src/snippets/tabbed_solutions/000.js',
            'solution_search/static/src/snippets/tabbed_solutions/000.scss',
        ]
    },
    'application': True,
    'installable': True
}
