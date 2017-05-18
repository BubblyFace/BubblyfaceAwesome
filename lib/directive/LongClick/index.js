import LongClick from './src/LongClick'
import Vue from 'vue'

LongClick.install = function () {
    Vue.directive('longclick', LongClick);
}

export default LongClick
