import {Component} from 'react';
import PropTypes from 'prop-types';

import carrotLoader from '../assets/images/carrot-loader-fast.gif';

class Loading extends Component {
  render() {
    const {size} = this.props;
    if (size === 'big') {
      return (
        <div id="loading">
          <img src={carrotLoader} alt="Loading" />
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
