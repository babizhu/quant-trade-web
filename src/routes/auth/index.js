import { Component } from 'react';
import { withRouter, routerRedux } from 'dva/router';
import { connect } from 'dva';

class Auth extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    console.log(dispatch);
    console.log('Author.componentWillMount');
  }
  render() {
    const { children } = this.props;

    return { children };
  }
}


Auth.propTypes = {};
Auth.defaultProps = {};

// export default Author;
// export default withRouter(connect(() => ())(Author));
export default withRouter(connect(({ loading }) => ({ loading }))(Auth));

