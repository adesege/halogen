var React = require('react');
var PropTypes = require('prop-types');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
  '0%, 100%': {
    transform: 'scale(0)'
  },
  '50%': {
    transform: 'scale(1.0)'
  }
};

/**
 * @type {String}
 */
var animationName = insertKeyframesRule(keyframes);

/**
     * @type {Object}
     */
var propTypes = {
  loading: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.string
};

/**
         * @return {Object}
         */
var defaultProps = {
  loading: true,
  color: '#ffffff',
  size: '60px'
};

class Loader extends React.Component {
  /**
     * @return {Object}
     */
  getBallStyle() {
    return {
      backgroundColor: this.props.color,
      width: this.props.size,
      height: this.props.size,
      borderRadius: '100%',
      opacity: 0.6,
      position: 'absolute',
      top: 0,
      left: 0,
      verticalAlign: this.props.verticalAlign
    };
  }

  /**
     * @param  {Number} i
     * @return {Object}
     */
  getAnimationStyle(i) {
    var animation = [animationName, '2s', i == 1 ? '1s' : '0s', 'infinite', 'ease-in-out'].join(' ');
    var animationFillMode = 'both';

    return {
      animation: animation,
      animationFillMode: animationFillMode
    };
  }

  /**
     * @param  {Number} i
     * @return {Object}
     */
  getStyle(i) {
    if (i) {
      return assign(
        this.getBallStyle(i),
        this.getAnimationStyle(i)
      );
    }

    return assign({
      width: this.props.size,
      height: this.props.size,
      position: 'relative'
    });
  }

  /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
  renderLoader(loading) {
    if (loading) {
      return (
        <div id={this.props.id} className={this.props.className}>
          <div style={this.getStyle()}>
            <div style={this.getStyle(1)} />
            <div style={this.getStyle(2)} />
          </div>
        </div>
      );
    }

    return null;
  }

  render() {
    return this.renderLoader(this.props.loading);
  }
}

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

module.exports = Loader;
