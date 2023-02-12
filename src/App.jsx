import React, { useState } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import routes from '../src/router'

function App () {
  return <Router>
    <Routes>
      {
        routes.map(route => {
          return <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        })
      }
    </Routes>
  </Router>
}

export default App