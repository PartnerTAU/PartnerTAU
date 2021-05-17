import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import moment from 'moment'



export const ProtectedRoute =({component:  Component, ...rest}) =>{
    const history = useHistory();
    return (
        <Route {...rest} 
        render={props => {
            const user = localStorage.getItem('token')
            if(user) {
                
                const token = localStorage.getItem('token');
                var decodedToken=jwt_decode(token, {complete: true});
                var dateNow = new Date();
                var exp = new Date(decodedToken.exp);
                
                if(exp < dateNow)
                {
                    return <Component {...props}   />
                }
                else
                {
                    localStorage.removeItem('token')
                    history.push("/login")
                    return  <Redirect    to={{
                          pathname:'/login'
                      }} />
                }
                   
                
            }
            else
            {
                history.push("/login")
                    return  <Redirect    to={{
                          pathname:'/login'
                      }} />
                 
            }
               
            }}
        /> 
    )
}