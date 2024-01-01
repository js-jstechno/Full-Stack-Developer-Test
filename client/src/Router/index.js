import { BrowserRouter, Route, Routes } from "react-router-dom"

import SignIn from "../Pages/signin/index"
import MovieList from "../Pages/MovieList"
import EditMovie from "../Pages/EditMovie"
import CreateMovie from "../Pages/CreateMovie"
import EmptyState from "../Pages/EmptyState"
// import HomePage from "../Pages/Home"

const Router = () => {
    return (<>
   

    <BrowserRouter >
      <Routes>
        <Route path="/" Component={SignIn} /> 
        <Route path="/signIn" Component={SignIn} />
        <Route path="/EmptyState" Component={EmptyState} /> 
        <Route path="/MovieList" Component={MovieList} /> 
        <Route path="/EditMovie/:id" Component={EditMovie} /> 
        <Route path="/CreateMovie" Component={CreateMovie} /> 
      </Routes>
    </BrowserRouter>
  

    
    </>)
}
export default Router