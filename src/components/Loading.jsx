import {Component} from 'react';
import PropTypes from 'prop-types';

import mohLogo from '../assets/images/moh.png';

class Loading extends Component {
  render() {
    const {size} = this.props;
    if (size === 'big') {
      return (
        <div id="loading">
          <img src={mohLogo} alt="Loading" />
        </div>
      );
    }
    return <>Loading</>;
  }
}

Loading.props = {
  size: PropTypes.string.isRequired,
};

export default Loading;
