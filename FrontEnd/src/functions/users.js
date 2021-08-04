const axios = require('axios');
let path = 'https://partnertaubackend.herokuapp.com/'
// let path = 'http://localhost:3001/'


export const  login = async (params) =>{
    const resp = await axios.post(path+'Home', params);
    console.log(resp);
    if(resp)
    {
        localStorage.setItem('token',resp.data.Token)
    }
    return resp;
}

export const  createUser = async (params) =>{
    const resp = await axios.post(path+'Signup', params);
    console.log(resp);
    return resp;
}


export const  ResetPass = async (params) =>{
    const resp = await axios.post(path+'Password', params);
    console.log(resp);
    return resp;
}

