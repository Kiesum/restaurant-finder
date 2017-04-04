import React, { Component } from 'react'
import axios from 'axios'

export default class Restaurants extends Component {

  getRestaurants() {
    axios.get('https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=49.246292&longitude=-123.116226&radius=1000', {
      headers: { Authorization: 'Bearer bMY2yIMUnKvctqwOUfWHMNY5NizpViecWCATNXC86FdsCipcXl05EOJWZp4MMOw3pV-lkoE-sIj-b4GsSUMnQXFvpsZ-B1-dHCuop0RLBLc3WxisMPQeHXhUPjnjWHYx' }
    })
      .then(function(response){
        console.log(response.data); // ex.: { user: 'Your User'}
        console.log(response.status); // ex.: 200
      });  

  }

  render () {
    return (
      <div>
        <button onClick={this.getRestaurants.bind(this)}>get rest</button>
        Restaurants
      </div>
    )
  }
}

