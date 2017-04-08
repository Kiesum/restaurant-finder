// import React, { Component } from 'react'
// import RemoveFavorite from './RemoveFavorite'
// import { Row, Col } from 'react-bootstrap'
// import Radium from 'radium'
// import firebase from 'firebase'
// import { auth, ref } from '../config/constants'
// import RestaurantMeta from './RestaurantMeta'
// import RestaurantDetails from './RestaurantDetails'

// export default class Favorite extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       detailsVisible: false
//     }
//   }

//   toggleDetails() {
//     this.setState({ detailsVisible: !this.state.detailsVisible });
//   }

//   render() {
//     return (
//       <div> 
//         <Row className="restaurant-row">
//           <li className="list-item">
//             <Col style={styles.col} xs={12} md={4}><img style={styles.image} src={this.props.info.image_url} /></Col> 
//             <Col xs={10} xsOffset={1} mdOffset={0} md={4} className="info-container" > 
//               <RestaurantMeta info={this.props.info} />
//               <RemoveFavorite key={this.props.info.id} key_id={this.props.info.id} />
//               <button className="secondary-btn" onClick={this.toggleDetails.bind(this)}>Toggle map</button>
//             </Col>
//               { this.state.detailsVisible && 
//                 <Col md={12} style={styles.col}>
//                   <RestaurantDetails address={this.props.info.address} latitude={this.props.info.latitude} longitude={this.props.info.longitude} />
//                 </Col>
//               }
//           </li>
//         </Row>
//       </div>
//     )
//   }
// }

// const styles = {
//   col: {
//     padding: "0"
//   },
//   image: {
//     width: "100%",
//     padding: "0",
//     height: "325px",
//     objectFit: "cover"
//   },
//   list: {
//     listStyle: "none",
//     padding: "0",
//   },
//   infoContainer: {
//     display: "inline-block",
//     textAlign: "center",
//     padding: "30px",
//     background: "#FFFFFF",
//     position: "relative",
//     top: "-30px",
//     border: "1px solid rgb(210, 210, 210)",

//     ':hover': {
//       background: "grey"
//     },
//   },
//   name: {
//     color: "#000000",
//     marginTop: "0"
//   },
//   text: {
//     padding: "5px 0"
//   }
// }