import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { login, createUser } from "../../functions/users";

function Loginui() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    var reponse = await login(data);
    console.log(reponse);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "center",
          flexDirection: "column",
        }}
      >
        <div style={{margin: '25px 0'}}>Sign In</div>
        <div style={{border: '1px solid', padding: '15px'}}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{margin: '25px 0',display: 'flex',flexDirection:'row'}}>
                <div style={{width: '100px'}}>Username</div>
                <div> <input type="text" {...register("username")} /></div>
              
             
            </div>
            <div style={{margin: '25px 0',display: 'flex',flexDirection:'row'}}>
              
              <div style={{width: '100px'}}>Password</div>
              <div><input {...register("password")} type="password" /></div>
            </div>

            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Loginui;
