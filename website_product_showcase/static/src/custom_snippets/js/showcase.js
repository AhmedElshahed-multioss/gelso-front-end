/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import { jsonrpc } from "@web/core/network/rpc_service";
import { renderToFragment } from "@web/core/utils/render";

publicWidget.registry.TestimonialSearch = publicWidget.Widget.extend({
  selector: ".template_showcase",
  disabledInEditableMode: false,
  events: {
    "input .form-control": "_onSearchInput", // Handle search bar input
    "click .filter-option": "_onDropdownItemClick", // Handle dropdown clicks
    "click .link-underline": "_onClearFiltersClick", // Handle "Filter löschen"
    "click #list-view-btn": "_onListViewClick", // Handle list view click
    "click #grid-view-btn": "_onGridViewClick", // Handle grid view click
    "click .sort-option": "_onSortOptionClick", // Handle sort option click
  },

  init: function () {
    this._super.apply(this, arguments);
    this.activeFilters = [];
    this.searchQuery = "";
  },

  willStart: function () {
    const parentPromise = this._super.apply(this, arguments);

    // Fetch data for testimonials and categories
    const jsonPromise = jsonrpc(`/showcase`, {}).then((response) => {
      this.testimonials = response.testimonials;
      this.categories = response.categories;
    });

    return Promise.all([parentPromise, jsonPromise]);
  },

  start: function () {
    // Render the template with data
    const renderedElement = renderToFragment(
      "website_product_showcase.showcase_view",
      {
        testimonials: this.testimonials,
        categories: this.categories,
      }
    );

    const selector = $(".template_showcase");
    selector.empty();
    selector.append(renderedElement);

    // Initialize Shuffle.js for "shuffle-container"
    const Shuffle = window.Shuffle;
    const shuffleElement = document.getElementById("shuffle-container");
    const shuffleSizer = shuffleElement.querySelector(".js-shuffle-sizer");
    Shuffle.FILTER_ATTRIBUTE_KEY = "tags";
    if (shuffleElement) {
        this.shuffleInstance = new Shuffle(shuffleElement, {
            itemSelector: ".testimonial-item",
            sizer: shuffleSizer,
            filterMode: "any",
        });
    }
  },

  _applyFadeTransition: function (container, callback) {
    // Apply fade-out effect
    container.css({
      opacity: 0,
      transition: "opacity 0.3s ease-in-out",
    });

    // Execute the callback after the fade-out completes
    setTimeout(() => {
      callback();
      // Apply fade-in effect
      container.css({
        opacity: 1,
      });
    }, 300); // Match transition duration
  },

  _onSearchInput: function (ev) {
    this.searchQuery = $(ev.currentTarget).val().toLowerCase();
    this._applyFilters();
  },

  _onDropdownItemClick: function (ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const $tag = $(ev.currentTarget); // The clicked <a> element
    const tag = $tag.data("tag"); // Retrieve the value of data-tag

    // Toggle active class
    $tag.toggleClass("active");
    if ($tag.hasClass("active")) {
      this.activeFilters.push(tag); // Add the tag to active filters
    } else {
      // Remove the tag from active filters
      this.activeFilters = this.activeFilters.filter((filter) => filter !== tag);
    }

    // Apply the updated filters
    this.shuffleInstance.filter(this.activeFilters);
  },

  _onClearFiltersClick: function (ev) {
    ev.preventDefault();
    this.activeFilters = [];
    this.searchQuery = "";
    this.$el.find(".form-control").val(""); // Clear search input
    this._applyFilters();
  },

  _onListViewClick: function (ev) {
    // Toggle visibility of layouts using d-none and d-block
    $("#shuffle-container").removeClass("d-block").addClass("d-none"); // Hide grid layout

    // Destroy the old instance
    if (this.shuffleInstance) {
      this.shuffleInstance.destroy();
    }

    $("#list-container").removeClass("d-none").addClass("d-block"); // Show list layout

    // Initialize Shuffle.js for "list-container" (if required)
    const listElement = document.getElementById("list-container");
    if (listElement) {
      const listSizer = listElement.querySelector(".js-shuffle-sizer");
      this.shuffleInstance = new Shuffle(listElement, {
        itemSelector: ".list-group-item",
        sizer: listSizer,
        filterMode: "any",
      });
    }

    // Update button states
    $("#list-view-btn").addClass("active");
    $("#grid-view-btn").removeClass("active");

    console.log("Switched to list view");
  },

  _onGridViewClick: function (ev) {
    $("#list-container").removeClass("d-block").addClass("d-none"); // Hide list layout

    // Destroy the old instance
    if (this.shuffleInstance) {
      this.shuffleInstance.destroy();
    }

    $("#shuffle-container").removeClass("d-none").addClass("d-block"); // Show grid layout

    // Initialize Shuffle.js for "shuffle-container"
    const shuffleElement = document.getElementById("shuffle-container");
    const shuffleSizer = shuffleElement.querySelector(".js-shuffle-sizer");
    Shuffle.FILTER_ATTRIBUTE_KEY = "tags";
    if (shuffleElement) {
      this.shuffleInstance = new Shuffle(shuffleElement, {
        itemSelector: ".testimonial-item",
        sizer: shuffleSizer,
        filterMode: "any",
      });
    }


    // Update button states
    $("#grid-view-btn").addClass("active");
    $("#list-view-btn").removeClass("active");


    console.log("Switched to grid view");
  },

  _onSortOptionClick: function (ev) {
    ev.preventDefault();
    ev.stopPropagation();

    // Get the sort key from data-sort attribute
    const $sortLink = $(ev.currentTarget);
    const sortKey = $sortLink.data("sort"); // e.g. "name-asc", "date-newest", "lead-time", etc.

    // You can store the chosen sortKey if you like, or just directly call sorting
    this._applySorting(sortKey);
  },

  _applySorting: function (sortKey) {

    // Example: parse the sortKey and call shuffleInstance.sort()
    let sorter = null;   // If we want a custom "by" function
    let reverse = false; // If we want to reverse the result

    switch (sortKey) {
      case "name-asc":
        // Sort by the data-name attribute (string, ascending)
        sorter = (element) => {
          return element.getAttribute("data-name") || "";
        };
        break;

      case "date-newest":
        // Sort by date, newest first => we'll interpret the date attribute
        sorter = (element) => {
          // Suppose data-date is in "YYYY-MM-DD" or a full datetime
          const dateAttr = element.getAttribute("data-date");
          return dateAttr ? new Date(dateAttr).getTime() : 0;
        };
        // Because we want newest first, we can do reverse = true
        reverse = true;
        break;

      case "lead-time":
        // Sort by numeric lead time, ascending
        sorter = (element) => {
          const val = element.getAttribute("data-lead-time");
          return val ? parseInt(val, 10) : 0;
        };
        break;

      case "guarantee":
        // Sort by guarantee, let's assume also numeric.
        // If it's a string, handle it like data-name.
        sorter = (element) => {
          const val = element.getAttribute("data-guarantee");
          return val ? parseInt(val, 10) : 0;
        };
        break;
    }

    // Now apply shuffle's sort
    this.shuffleInstance.sort({
      by: sorter,
      reverse: reverse,
      // Optional: "randomize" or "compare" can be used if you want custom compare function
    });
  },

  _applyFilters: function () {
    const searchQuery = this.searchQuery;
    const activeFilters = this.activeFilters;

    this.shuffleInstance.filter((element) => {
      const tags = element.getAttribute("data-tags").toLowerCase();

      // Try finding <h4>, otherwise look for <p.fw-bold>
      const h4El = element.querySelector("h4");
      const pEl = element.querySelector("p.fw-bold");

      let name = "";
      if (h4El) {
        name = h4El.textContent.toLowerCase();
      } else if (pEl) {
        name = pEl.textContent.toLowerCase();
      }

      const matchesSearch = searchQuery ? name.includes(searchQuery) : true;
      const matchesFilters = activeFilters.length
        ? activeFilters.some((filter) => tags.includes(filter.toLowerCase()))
        : true;

      return matchesSearch && matchesFilters;
    });
  },
});