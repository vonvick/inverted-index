// import the angular package and other components

import angular from 'angular';

import InvertedIndex from './inverted-index.js';

angular.module('indexApp', [])
  .controller('InvertedIndexController', InvertedIndex);