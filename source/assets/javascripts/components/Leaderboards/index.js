'use strict'

import React from 'react'
import Tabs from 'hui/navigation/Tabs'
import Leaderboard from './Leaderboard'

let getUrl = function(url, attibutes) {
  for(let attibuteKey in attibutes) {
    url = url.replace('{{ ' + attibuteKey + ' }}', attibutes[attibuteKey])
  }

  return url
}

let api = {
  raised: 'https://everydayhero.com/api/v2/campaigns/{{ campaignId }}/leaderboard.json?type=team&limit=200&include_pages=true',
  distance: 'https://everydayhero.com/api/v2/campaigns/{{ campaignId }}/leaderboard.json?type=team&limit=200&include_pages=true',
  elevation: 'https://everydayhero.com/api/v2/campaigns/{{ campaignId }}/leaderboard.json?type=team&limit=200&include_pages=true'
}

export default React.createClass({
  displayName: 'Leaderboards',

  getInitialState: function() {
    return {
      active: 0,
      currentPage: 0,
      count: 3
    }
  },

  getDefaultProps: function() {
    return {
      campaignId: 'au-19283'
    }
  },

  handleChange: function(active) {
    this.setState({
      active
    })
  },

  render: function() {
    let state = this.state
    let props = this.props
    let tabs = [
      {
        label: 'Raised',
        content: <Leaderboard key="raised" url={ getUrl(api.raised, { campaignId: props.campaignId } ) } onSelect={ props.onSelect }/>
      },
      {
        label: 'Distance',
        content: <div key="raised">Distance</div>
      },
      {
        label: 'Elevation',
        content: <div key="raised">Distance</div>
      }
    ]

    return (
      <div className="Leaderboards">
        <Tabs onChange={ this.handleChange } active={ this.state.active } tabs={ tabs }/>
      </div>
    )
  }
})
