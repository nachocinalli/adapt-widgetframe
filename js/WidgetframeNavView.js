import Adapt from 'core/js/adapt';
import tooltips from 'core/js/tooltips';
import NavigationButtonView from 'core/js/views/NavigationButtonView';
import WidgetframeView from './WidgetframeView';
import drawer from 'core/js/drawer';
import notify from 'core/js/notify';

export default class WidgetframeNavView extends NavigationButtonView {
  events() {
    return {
      click: 'onWidgetframeClicked'
    };
  }

  attributes() {
    return {
      ...super.attributes(),
      'aria-expanded': false,
      'data-tooltip-id': this.model.get('_id')
    };
  }

  initialize(options) {
    super.initialize(options);
    this.setupEventListeners();
    this.render();

    tooltips.register({
      _id: this.model.get('_id'),
      ...(this.model.get('_navTooltip') || {})
    });
    this.popupView = null;
    this._isPopupOpen = false;
  }

  setupEventListeners() {
    this.listenTo(Adapt, {
      remove: this.remove,
      'drawer:closed': this.drawerClosed
    });
  }

  onWidgetframeClicked(event) {
    if (event && event.preventDefault) event.preventDefault();

    const courseConfig = this.model.get('_courseConfig');
    const renderMode = courseConfig._renderMode;
    if (renderMode === 'drawer') {
      this.openDrawer(courseConfig);
    } else {
      this.openPopup(courseConfig);
    }
  }

  openDrawer(model) {
    this.$el.attr('aria-expanded', true);

    drawer.openCustomView(
      new WidgetframeView({
        model
      }).$el,
      false,
      this.model.get('_drawerPosition')
    );
  }

  drawerClosed() {
    this.$el.attr('aria-expanded', false);
  }

  openPopup(model) {
    if (this._isPopupOpen) return;

    this._isPopupOpen = true;
    this.popupView = new WidgetframeView({
      model
    });
    notify.popup({
      _attributes: { 'data-adapt-id': 'widgetframe' },
      _view: this.popupView,
      _isCancellable: true,
      _showCloseButton: true,
      _classes: 'widgetframe'
    });

    this.listenToOnce(Adapt, {
      'popup:closed': this.onPopupClosed
    });
  }

  onPopupClosed() {
    this._isPopupOpen = false;
  }

  static get template() {
    return 'widgetframeNav.jsx';
  }
}
