// import * as React from 'react'
// import {
//     BrowserRouter as Router,
//     Route,  
//     Link
// } from 'react-router-dom'

// const Sandwiches = () => <h2>Sandiches</h2>
// const Tacos = () => <h2>Tacos</h2>

// const  routes = [
//     {
//         path : '/sandwiches',
//         component : Sandwiches,
//     },
//     {
//         path: '/tacos',
//         component  : Tacos,
//     }
// ]

// export default function App1(){
//     return(
//         <Router>
//         <div>
//             <ul>
//                 <li><Link to='/tacos' >Tacos</Link></li>
//                 <li><Link to='/sandwiches' >Sandwiches</Link></li>
//             </ul>
//         </div> 

//         {routes.map((route) => (
//            <Route 
//            path={route.path}
//            exact = {route.exact}
//            >
//             <route.component
//            </Route>
//         )) }
//         </Router>
//     )
// }