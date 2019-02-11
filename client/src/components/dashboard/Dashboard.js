import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      return this.props.history.push('/login')
    }
  }

  render() {
    const { user } = this.props.auth

    return (
      <div className="dashboard">
        <div className="row">
          <div className="col-md-12">
            <h2 className="display-5 mb-5">
              Welcome to Breakthrough Innovation Lab
            </h2>
            <div>
              <p className="lead text-muted mb-0">
                Username: <strong>{user.username}</strong>
              </p>
              <p className="lead text-muted">
                Email: <strong>{user.email}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  {}
)(Dashboard)
