var jwtDecode = require('jwt-decode');
const jwt = require('jsonwebtoken') 
const key = '67324814a307ba404b6749759d73c0a49e466b4b95b6a9b08ee5695caa8cb2512c04cdf367a0f85bd1464b4c1335c348f92484336a5c8518b303608440e5acc8'

const decode = ((params) => {
    return new Promise(function(resolve, reject) {
        try{
           
            jwt.verify(params, key, (err, verifiedJwt) => {
                if(err){
                   return  reject(401)
                }else{
                    const decoded = jwtDecode(params);
                    console.log(decoded)
                    return resolve(decoded)
                };
            })
        }
        catch(err){
            return reject(401)
        }        

    });
})



const sign =  (params) => {

    try{
        const accessToken = jwt.sign({
            // 1 hour expiration
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12),
            data: params
          }, key);

          return accessToken;
    }
    catch(err){
        return null
    }        


}


module.exports ={
    decode: decode,
    sign : sign,
}


