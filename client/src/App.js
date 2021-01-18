import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import client from './config/graphql'
import MainPage from './pages/MainPage'
import Movies from './pages/Movies'
import TvSeries from './pages/TvSeries'
import DetailMovie from './pages/DetailMovie'
import DetailSerie from './pages/DetailSerie'
import EditMovie from './pages/EditMovie'
import EditSerie from './pages/EditSerie'

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path='/tv/Detail/:id'>
            <DetailSerie />
          </Route>
          <Route path='/movie/Detail/:id'>
            <DetailMovie />
          </Route>
          <Route path='/tv/Edit/:id'>
            <EditSerie />
          </Route>
          <Route path='/movie/Edit/:id'>
            <EditMovie />
          </Route>
          <Route path='/movies'>
            <Movies />
          </Route>
          <Route path='/tv'>
            <TvSeries />
          </Route>
          <Route path='/'>
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
