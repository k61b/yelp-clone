import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './routes/Home'
import UpdatePage from './routes/UpdatePage'
import DetailPage from './routes/DetailPage'
import { RestaurantsContextProvider } from './context/RestaurantContext'

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/restaurants/:id/update" component={UpdatePage} />
                        <Route exact path="/restaurants/:id" component={DetailPage} />
                    </Switch>
                </Router>
            </div>
        </RestaurantsContextProvider>
    )
}

export default App