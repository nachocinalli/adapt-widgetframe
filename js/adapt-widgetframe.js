import Adapt from 'core/js/adapt';
import NavigationButtonModel from 'core/js/models/NavigationButtonModel';
import WidgetframeNavView from './WidgetframeNavView';
import navigation from 'core/js/navigation';

class Widgetframe extends Backbone.Controller {
  initialize() {
    this.listenTo(Adapt, { 'app:dataReady': this.onDataReady });
  }

  static get courseConfig() {
    return Adapt.course.get('_widgetframe');
  }

  static get globalsConfig() {
    return Adapt.course.get('_globals')?._extensions?._widgetframe;
  }

  onDataReady() {
    const courseConfig = Widgetframe.courseConfig;
    if (!courseConfig?._isEnabled) return;
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.listenTo(Adapt, {
      remove: this.remove,
      'router:contentObject': this.onContentObject
    });
  }

  onContentObject(pageModel) {
    const contentObjectModel = pageModel.get('_widgetframe');
    if (contentObjectModel?._isEnabled === false) return;
    if ($('.nav__navigationwidgetframe').length) return;
    const { _navOrder = 100, _showLabel = true, navLabel = '', _navTooltip = {}, _drawerPosition = 'auto' } = Widgetframe.globalsConfig ?? {};
    const model = new NavigationButtonModel({
      _id: 'navigationwidgetframe',
      _order: _navOrder,
      _classes: 'btn-icon nav__btn nav__navigationwidgetframe widgetframe__nav',
      _iconClasses: 'icon-light-bulb',
      _role: 'button',
      _showLabel,
      ariaLabel: navLabel,
      _navTooltip,
      _courseConfig: Widgetframe.courseConfig,
      _drawerPosition
    });

    navigation.addButton(
      new WidgetframeNavView({
        model
      })
    );
  }

  remove() {
    $('.nav__navigationwidgetframe').remove();
  }
}

export default new Widgetframe();
