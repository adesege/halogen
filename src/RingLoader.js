var React = require('react');
var PropTypes = require('prop-types');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var rightRotateKeyframes = {
  '0%': {
    transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'

  },
  '100%': {
    transform: 'rotateX(180deg) rotateY(360deg) rotateZ(360deg)'
  }
};

/**
 * @type {Object}
 */
var leftRotateKeyframes = {
  '0%': {
    transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
  },
  '100%': {
    transform: 'rotateX(360deg) rotateY(180deg) rotateZ(360deg)'
  }
};

/**
 * @type {String}
 */
var rightRotateAnimationName = insertKeyframesRule(rightRotateKeyframes);

/**
 * @type {String}
 */
var leftRotateAnimationName = insertKeyframesRule(leftRotateKeyframes);

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
     * @param {String} size
     * @return {Object}
     */
  getCircleStyle(size) {
    return {
      width: size,
      height: size,
      border: `${size / 10}px solid ${this.props.color}`,
      opacity: 0.4,
      borderRadius: '100%',
      verticalAlign: this.props.verticalAlign
    };
  }

  /**
     * @param  {Number} i
     * @return {Object}
     */
  getAnimationStyle(i) {
    var animation = [i === 1 ? rightRotateAnimationName : leftRotateAnimationName, '2s', '0s', 'infinite', 'linear'].join(' ');
    var animationFillMode = 'forwards';
    var perspective = '800px';

    return {
      perspective: perspective,
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

    if (i) {
      return assign(
        this.getCircleStyle(size),
        this.getAnimationStyle(i),
        {
          position: 'absolute',
          top: 0,
          left: 0
        }
      );
    }

    return {
      width: size,
      height: size,
      position: 'relative'
    };
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
