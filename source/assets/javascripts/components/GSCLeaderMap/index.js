import React from 'react'
import merge from 'lodash/object/merge'
import RaceMap from '../RaceMap'
import routeString from '../../../data/route.js'
import 'es6-shim'
import 'whatwg-fetch'
import promise from 'es6-promise'
promise.polyfill()

const routeData = JSON.parse(routeString)

export default React.createClass({
  propTypes: {
    selectedTeam: React.PropTypes.string,
    onTeamSelection: React.PropTypes.func
  },

  defaultProps () {
    return {
      selectedTeam: '',
      onTeamSelection: () => {}
    }
  },

  getInitialState () {
    return {
      teams: []
    }
  },

  componentWillMount () {
    this.fetchTeams()
  },

  fetchTeams () {
    fetch('assets/data/teams.json')
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        this.setState({
          teams: response.results.map((result) => {
            return merge({}, result, result.team)
          })
        })
      })
  },

  render () {
    return (
        !!this.state.teams.length &&
          <RaceMap
            route={ routeData }
            onRacerSelection={ this.props.onTeamSelection }
            selectedRacer={ this.props.selectedTeam }
            racers={ this.state.teams } />
    )
  }
})
