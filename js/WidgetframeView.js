import Adapt from 'core/js/adapt';
import { templates } from 'core/js/reactHelpers';
import React from 'react';
import ReactDOM from 'react-dom';
export default class WidgetframeView extends Backbone.View {
  className() {
    const renderMode = this.model._renderMode;
    return ['widgetframe__inner', `widgetframe-${renderMode}`].filter(Boolean).join(' ');
  }

  initialize() {
    this.listenTo(Adapt, 'remove', this.remove);
    this.render();
  }

  render() {
    ReactDOM.render(<templates.widgetframeView {...this.model} />, this.el);
  }
}
