var React = require('react');
var PropTypes = require('prop-types');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
  '25%': {
    transform: 'rotateX(180deg) rotateY(0)'
  },
  '50%': {
    transform: 'rotateX(180deg) rotateY(180deg)'
  },
  '75%': {
    transform: 'rotateX(0) rotateY(180deg)'
  },
  '100%': {
    transform: 'rotateX(0) rotateY(0)'
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
  size: '50px'
};

class Loader extends React.Component {
  /**
     * @return {Object}
     */
  getSquareStyle() {
    return {
      backgroundColor: this.props.color,
      width: this.props.size,
      height: this.props.size,
      verticalAlign: this.props.verticalAlign
    };
  }

  /**
     * @param  {Number} i
     * @return {Object}
     */
  getAnimationStyle(i) {
    var animation = [animationName, '3s', '0s', 'infinite', 'cubic-bezier(.09,.57,.49,.9)'].join(' ');
    var animationFillMode = 'both';
    var perspective = '100px';

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
    return assign(
      this.getSquareStyle(i),
      this.getAnimationStyle(i),
      {
        display: 'inline-block'
      }
    );
  }

  /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
  renderLoader(loading) {
    if (loading) {
      return (
        <div id={this.props.id} className={this.props.className}>
          <div style={this.getStyle()} />
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
