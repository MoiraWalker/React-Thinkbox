import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";

const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const history = useHistory();
  const [authState, setAuthState] = useState({
    status: 'pending',
    error: null,
    user: null,
  })

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function getUserInfo() {
      try {
        // We kunnen de gebruikersdata ophalen omdat we onszelf authenticeren met de token
        const response = await axios.get('https://polar-lake-14365.herokuapp.com/api/user', {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
        );

        console.log(response);

        // met het resultaat vullen we de context
        setAuthState({
          ...authState,
          user: {
            id: response.id,
            username: response.username,
            email: response.email,
          },
          status: 'done',
        });

      } catch (e) {
        // Gaat er toch iets mis? Dan zetten we de error in de context
        setAuthState({
          ...authState,
          user: null,
          error: e,
          status: 'done'
        });
      }
    }

    // als we GEEM userinformatie meer in de applicatie hebben, maar er staat WEL een token in
    // local storage, gaan we handmatig de gebuikersdata ophalen door de getUserInfo functie van hierboven aan te roepen
    if (authState.user === null && token) {
      getUserInfo();
    } else {
      // Als er geen ingelogde gebruiker hoeft te zijn, zetten we de context naar de basis state
      setAuthState({
        ...authState,
        error: null,
        user: null,
        status: 'done'
      });
    }
  }, []);

  function login(data) {
    // 1. de token willen we in de local storage zetten
    localStorage.setItem('token', data.accessToken);

    // 2. de user-informatie willen we in de context zetten
    setAuthState({
      ...authState,
      user: {
        username: data.username,
        email: data.email,
        roles: data.roles,
      }
    })

    // 3. als dat allemaal gelukt is, willen we doorgelinkt worden naar de profielpagina!
    // Dit doen we in het component dat deze functie aanroept, zelf!
  }

  function logout() {
    // 1. Maak local storage leeg
    localStorage.clear();
    // 2. Haal de user uit de context-state
    setAuthState({
      ...authState,
      user: null,
    })
    history.push('/login');
  }

  // als je hem helemaal uit zou schrijven en als variabele mee zou geven aan AuthContext.Provider:
  // const providerData = {
  //   ...authState,
  //   login: login,
  //   logout: logout,
  // };

  return (
      <AuthContext.Provider value={{ ...authState, login, logout }}>
        {authState.status === 'done' && children}
        {authState.status === 'pending' && <p>Loading...</p>}
      </AuthContext.Provider>
  );
}

function useAuthState() {
  const authState = useContext(AuthContext);

  // iemand is geauthoriseerd wanneer de status === 'done'
  // en als er een gebruiker in de authState staat
  const isDone = authState.status === 'done';
  const isAuthenticated = authState.user !== null && isDone;

  // console.log('Ik ben authenticated:', isAuthenticated);

  return {
    ...authState,
    isAuthenticated: isAuthenticated,
  }
}

export {
  AuthContext,
  useAuthState,
  AuthContextProvider,
}
