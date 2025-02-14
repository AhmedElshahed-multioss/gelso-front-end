/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";


const SolutionSearch = publicWidget.Widget.extend({
    selector: '.s_solution_search',
    disabledInEditableMode: true,
    events: {
        'click .tag-filter': '_onTagFilterClick',
        'click .form-check-input': '_onFormCheckInputClick',
        'click .reset-filters': '_onResetFiltersClick',
    },
    init: function () {
        this._super.apply(this, arguments);
        this.activeFilters = [];
        const Shuffle = window.Shuffle; // Assumes you're using the UMD version of Shuffle (for example, from unpkg.com).
        const element = document.getElementById('shuffle-container');
        const sizer = element.querySelector('.js-shuffle-sizer');
        Shuffle.FILTER_ATTRIBUTE_KEY = 'tags';
        this.shuffleInstance = new Shuffle(element, {
            itemSelector: '.solution-item',
            sizer: sizer, // could also be a selector: '.js-shuffle-sizer'
            filterMode: 'any'
        });
    },
    _onTagFilterClick: function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        const $tag = $(ev.currentTarget);
        // get tag data attribute value
        const tag = $tag.data('tag');
        // toggle active class
        $tag.toggleClass('active');
        if ($tag.hasClass('active')) {
            $tag.find('input').prop('checked', true);
        } else {
            $tag.find('input').prop('checked', false);
        }
        // add or remove tag from activeFilters, if it is the first filter that is set, disable all other filters and leave the clicked one active
        // if the last filter is removed, enable all filters again
        if ($tag.hasClass('active')) {
            this.activeFilters.push(tag);
            if (this.activeFilters.length === 1) {
                var $tags = this.$el.find('.tag-filter').not($tag);
                $tags.removeClass('active');
                $tags.find('input').prop('checked', false);
            }
        } else {
            this.activeFilters = this.activeFilters.filter(function (item) {
                return item !== tag;
            });
            if (this.activeFilters.length === 0) {
                this.$el.find('.tag-filter').removeClass('active');
                this.$el.find('.tag-filter input').prop('checked', true);
            }
        }
        this.shuffleInstance.filter(this.activeFilters);

        return false;
    },

    _onResetFiltersClick: function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        this.activeFilters = [];
        this.$el.find('.tag-filter').removeClass('active');
        this.$el.find('.tag-filter input').prop('checked', true);
        this.shuffleInstance.filter(this.activeFilters);
    }
});

publicWidget.registry.solution_search = SolutionSearch;

export default SolutionSearch;
