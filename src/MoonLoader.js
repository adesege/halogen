var React = require('react');
var PropTypes = require('prop-types');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
  '100%': {
    transform: 'rotate(360deg)'
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
  size: PropTypes.string,
  margin: PropTypes.string
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
     * @param  {String} size
     * @return {Object}
     */
  getBallStyle(size) {
    return {
      width: size,
      height: size,
      borderRadius: '100%',
      verticalAlign: this.props.verticalAlign
    };
  }

  /**
     * @param  {Number} i
     * @return {Object}
     */
  getAnimationStyle(i) {
    var animation = [animationName, '0.6s', '0s', 'infinite', 'linear'].join(' ');
    var animationFillMode = 'forwards';

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
    var size = parseInt(this.props.size, 10);
    var moonSize = size / 7;

    if (i == 1) {
      return assign(
        this.getBallStyle(moonSize),
        this.getAnimationStyle(i),
        {
          backgroundColor: this.props.color,
          opacity: '0.8',
          position: 'absolute',
          top: size / 2 - moonSize / 2
        }
      );
    } else if (i === 2) {
      return assign(
        this.getBallStyle(size),
        {
          border: `${moonSize}px solid ${this.props.color}`,
          opacity: 0.1
        }
      );
    } else {
      return assign(
        this.getAnimationStyle(i),
        {
          position: 'relative'
        }
      );
    }
  }

  /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
  renderLoader(loading) {
    if (loading) {
      return (
        <div id={this.props.id} className={this.props.className}>
          <div style={this.getStyle(0)}>
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
