var React = require('react');
var PropTypes = require('prop-types');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
  '0%': {
    transform: 'scale(1)',
    opacity: 1
  },
  '45%': {
    transform: 'scale(0.1)',
    opacity: 0.7
  },
  '80%': {
    transform: 'scale(1)',
    opacity: 1
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
  size: '15px',
  margin: '2px'
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
      margin: this.props.margin,
      borderRadius: '100%',
      verticalAlign: this.props.verticalAlign
    };
  }

  /**
     * @param  {Number} i
     * @return {Object}
     */
  getAnimationStyle(i) {
    var animation = [animationName, '0.75s', `${i * 0.12}s`, 'infinite', 'cubic-bezier(.2,.68,.18,1.08)'].join(' ');
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
    return assign(
      this.getBallStyle(i),
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
          <div style={this.getStyle(1)} />
          <div style={this.getStyle(2)} />
          <div style={this.getStyle(3)} />
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
