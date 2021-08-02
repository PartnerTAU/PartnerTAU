const axios = require('axios');
let path = 'https://partnertaubackend.herokuapp.com/'
// let path = 'http://localhost:3001/'

//let path = path+''

export const  login = async (params) =>{
    //option 2 for async/await handling
    const resp = await axios.post(path+'Home', params);
    console.log(resp);
    if(resp)
    {
        localStorage.setItem('token',resp.data.Token)
        //console.log(resp.data.Token)
    }
    return resp;
}

// export const  checkemail = async (params) =>{
//     //option 2 for async/await handling
//     const resp = await axios.post(path+'checkemail', params);
//     console.log(resp);
//     if(resp == 200)
//     {
//         return true;
//     }
//     return false;
// }

export const  createUser = async (params) =>{
    //option 2 for async/await handling
    const resp = await axios.post(path+'Signup', params);
    console.log(resp);
    return resp;
}


export const  ResetPass = async (params) =>{
    //option 2 for async/await handling
    const resp = await axios.post(path+'Password', params);
    console.log(resp);
    return resp;
}

// export const  SignOut = async () =>{
//     //option 2 for async/await handling
//     const resp = await axios.post(path+'');
//     console.log(resp);
//     return resp;
// }
