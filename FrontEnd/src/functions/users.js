const axios = require('axios');


export const  login = async (params) =>{
    //option 2 for async/await handling
    const resp = await axios.post('http://localhost:3001/Home', params);
    console.log(resp);
    if(resp)
    {
        localStorage.setItem('token',resp.data)
    }
    return resp;
}

export const  checkemail = async (params) =>{
    //option 2 for async/await handling
    const resp = await axios.post('http://localhost:3001/checkemail', params);
    console.log(resp);
    if(resp == 200)
    {
        return true;
    }
    return false;
}

export const  createUser = async (params) =>{
    //option 2 for async/await handling
    const resp = await axios.post('http://localhost:3001/Signup', params);
    console.log(resp);
    return resp;
}

// export const  SignOut = async () =>{
//     //option 2 for async/await handling
//     const resp = await axios.post('http://localhost:3001/');
//     console.log(resp);
//     return resp;
// }
