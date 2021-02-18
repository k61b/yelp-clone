import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './routes/Home'
import UpdatePage from './routes/UpdatePage'
import DetailPage from './routes/DetailPage'
import { PlacesContextProvider } from './context/PlacesContext'

const App = () => {
    return (
        <PlacesContextProvider>
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/places/:id/update" component={UpdatePage} />
                        <Route exact path="/places/:id" component={DetailPage} />
                    </Switch>
                </Router>
            </div>
        </PlacesContextProvider>
    )
}

export default App