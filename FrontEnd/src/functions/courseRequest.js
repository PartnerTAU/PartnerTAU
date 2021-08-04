import axios from "axios"

axios.defaults.headers.common['Authorization'] = "Bearer " + (localStorage.getItem('token') ?localStorage.getItem('token') : "" );


export const  getOpenRequests = () =>{
    return axios.get('http://localhost:3001/GetActiveRequestedByUserId')
    .then(function (response) {
      return response.data  
    })
    .catch(function (error) { 
        return error
    })   
}



export const  markAsResolved = (id) =>{

  var req = {
    id : id
  }
  return axios.post('http://localhost:3001/maekAsResolved',req)
  .then(function (response) {

    return response.data
    
  
  })
  .catch(function (error) {
     
      return error
  })
  

}

