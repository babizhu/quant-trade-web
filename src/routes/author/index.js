import { Component } from 'react';
import { withRouter, routerRedux } from 'dva/router';
import { connect } from 'dva';

class Author extends Component {
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


Author.propTypes = {};
Author.defaultProps = {};

// export default Author;
// export default withRouter(connect(() => ())(Author));
export default withRouter(connect(({ loading }) => ({ loading }))(Author));

