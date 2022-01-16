import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './Main';
import './App.css';
import { useEffect, useState, createContext } from 'react';


export const MarkerContext = createContext({ markers: null, setMarkers: () => { }, hoveredMarkerId: null, setHoveredMarkerId: () => { }, focused: null, setFocused: () => { }, visibleMarker: null, setVisibleMarker: () => { } })


function App() {
  const [markers, setMarkers] = useState([]);
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [focused, setFocused] = useState(null);
  const [visibleMarker, setVisibleMarker] = useState(null);

  useEffect(() => {
    const savedMarkers = JSON.parse(localStorage.getItem("markers"))
    if (savedMarkers) {
      setMarkers(savedMarkers);
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("markers", JSON.stringify(markers))
  }, [markers])


  return (
    <div className="App">
      <Router>
        <MarkerContext.Provider value={{ markers, setMarkers, hoveredMarkerId, setHoveredMarkerId, focused, setFocused, visibleMarker, setVisibleMarker }}>
          <Switch>
            <Route exact path="/">
              <Dashboard>
                <Main />
              </Dashboard>
            </Route>
          </Switch>
        </MarkerContext.Provider>
      </Router>
    </div>
  );
}

export default App;
