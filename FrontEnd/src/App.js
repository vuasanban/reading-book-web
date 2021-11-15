import "./App.css";

import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route } from "react-router-dom";
import {
  BrowserRouter,
  Redirect,
} from "react-router-dom/cjs/react-router-dom.min";

import { User } from "./components/User";
import { BookDetailRoute } from "./Route/BookDetailRoute";
import { BookLibraryRoute } from "./Route/BooklLibaryRoute";
import { BookReaderRoute } from "./Route/BookReaderRoute";
import { BookTypeRoute } from "./Route/BookTypeRoute";
import { BookUploadRoute } from "./Route/BookUploadRoute";
import { HomeRoute } from "./Route/HomeRoute";

const BookContext = createContext({});
export { BookContext };

function App() {
  const [isSeeingDetail, setIsSeeingDetail] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [token, setToken] = useCookies(["token"]);
  const [userFullname, setUserFullname] = useState("");
  const [userLastname, setUserLastname] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [isLoaded, setIsLoad] = useState(null);
  const [favourite, setFavourite] = useState([]);
  useEffect(() => {
    async function fetchAPI() {
      let resp = await fetch("http://127.0.0.1:8000/book", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });
      resp = await resp.json();
      if (!resp["detail"]) {
        setBookList(resp);
      }
    }
    fetchAPI();
  }, [token.token]);

  useEffect(() => {
    if (userFullname) {
      const tmp = userFullname.split(" ");
      setUserLastname(tmp[tmp.length - 1]);
    }
  }, [userFullname]);

  useEffect(() => {
    async function fetchAPI() {
      let resp = await fetch(`http://127.0.0.1:8000/favourite/${idUser}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });
      resp = await resp.json();
      setFavourite(resp);
    }
    if (idUser !== null) fetchAPI();
  }, [idUser]);

  useEffect(() => {
    async function fetchAPI() {
      let resp = await fetch("http://127.0.0.1:8000/isAdmin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });
      resp = await resp.json();
      if (!resp.detail) {
        setIsAdmin(true);
      }
      setIsLoad(true);
    }
    fetchAPI();
  }, [token.token]);
  const providerValue = {
    isSeeingDetail,
    setIsSeeingDetail,
    bookList,
    setBookList,
    token,
    setToken,
    userFullname,
    setUserFullname,
    userLastname,
    setUserLastname,
    isAdmin,
    setIsAdmin,
    idUser,
    setIdUser,
    favourite,
    setFavourite,
  };
  return (
    <BookContext.Provider value={providerValue}>
      <BrowserRouter>
        <Route exact path="/" component={HomeRoute} />

        {/* {token["token"] ? (
          <>
            <Route exact path="/library" component={BookLibraryRoute} />
            <Route exact path="/library/:id" component={BookDetailRoute} />
            <Route exact path="/type/:type" component={BookTypeRoute} />
            <Route exact path="/type/:type/:id" component={BookDetailRoute} />
            <Route exact path="/read/:id" component={BookReaderRoute} />
          </>
        ) : (
          // <Redirect to="/login" />
        )} */}
        <Route exact path="/library">
          {token["token"] ? <BookLibraryRoute /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/library/:id">
          {token["token"] ? <BookDetailRoute /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/type/:type">
          {token["token"] ? <BookTypeRoute /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/type/:type/:id">
          {token["token"] ? <BookDetailRoute /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/read/:id">
          {token["token"] ? <BookReaderRoute /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/upload" component={BookUploadRoute}>
          {isLoaded ? (
            isAdmin ? (
              <BookUploadRoute />
            ) : (
              <Redirect to="/library" />
            )
          ) : (
            ""
          )}
        </Route>
        <Route exact path="/login">
          {token["token"] ? <Redirect to="/library" /> : <User />}
        </Route>
        <Route exact path="/signup" component={User} />
      </BrowserRouter>
    </BookContext.Provider>

    // <div style={{ position: "relative" }}>
    //   {/* <div className="overlay"></div> */}
    //   {/* <Header></Header> */}
    //   {/* <Home></Home> */}
    //   {/* <Books></Books> */}
    //   {/* <BookLibrary></BookLibrary> */}

    // </div>
  );
}

export default App;
