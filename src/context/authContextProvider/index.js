import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";

const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const history = useHistory();
  const [admin, setAdmin ] = useState(false);
  const [authState, setAuthState] = useState({
    status: 'pending',
    error: null,
    user: null,
  })

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function getUserInfo() {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/signin', {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
        );
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
        setAuthState({
          ...authState,
          user: null,
          error: e,
          status: 'done'
        });
      }
    }

    if (authState.user === null && token) {
      getUserInfo();
    } else {
      setAuthState({
        ...authState,
        error: null,
        user: null,
        status: 'done'
      });
    }
  }, []);

  function login(data) {
    localStorage.setItem('token', data.accessToken);
    setAuthState({
      ...authState,
      user: {
        username: data.username,
        email: data.email,
        roles: data.roles,
        id: data.id,
      }
    })
    isAdmin(data.roles);
  }

  function isAdmin(data){
    if ( data[0].includes("ROLE_ADMIN")) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }

  function logout() {
    localStorage.clear();
    setAuthState({
      ...authState,
      user: null,
    })
    setAdmin(false);
    history.push('/login');
  }

  function getAdmin() {
    return admin;
  }

  const providerData = {
    ...authState,
    login,
    logout,
    getAdmin,
  };

  return (
      <AuthContext.Provider value={providerData}>
        {authState.status === 'done' && children}
        {authState.status === 'pending' &&
        <div className="page__container page__center">
          <p>Loading...</p>
        </div>
     }
      </AuthContext.Provider>
  );
}

function useAuthState() {
  const authState = useContext(AuthContext);
  const isDone = authState.status === 'done';
  const isAuthenticated = authState.user !== null && isDone;

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
