import React from "react";
import './App.css';
import {useFormik} from 'formik'
import { useState } from 'react';
import Popup from './Components/Popup';
 var validate=values =>{
  const errors={};
  if(!values.FirstName){
   errors.FirstName ="*Required";
  }else if(values.FirstName.length >10){
    errors.FirstName="*Must Be 10 Characters or Less";
  }
  if(!values.LastName){
    errors.LastName ="*Required";
   }else if(values.LastName.length >10){
     errors.LastName="*Must Be 10 Characters or Less";
   }
   if(!values.Email){
    errors.Email ="*Required";
   }else if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.Email)){
     errors.Email="*Invalid Email Address";
   }
   if(!values.Password){
    errors.Password ="*Required";
   }else if(values.Password.length >10){  
     errors.Password="*Maximum 10 Characters";
   }else if(values.Password.length <3){
    errors.Password="*Minimum 5 characters"
   }
   if(!values.ConfirmPassword){
    errors.ConfirmPassword ="*Required";
   }else if(values.Password !== values.ConfirmPassword) {
     errors.ConfirmPassword="*Password Must Match";
   }
   return errors;
}
const App=()=>{
  const [bool, setBool]= useState(0);
  const formik= useFormik({
    initialValues : {
      FirstName:'',
      LastName:'',
      Email:'',
      Password:'',
      ConfirmPassword:'',

    },
    validate,
    onSubmit :(values, {resetForm}) => 
     {
      if(bool){
        setBool(0);
        resetForm({values : ''});
      }else{
        setBool(1)
        console.log(values);
      }

    }
  });
  console.log(formik.values);
  return(
    <div className="main">
      <div className="sign-up-form">
        <h2>SIGN-UP HERE</h2>
        <form onSubmit={formik.handleSubmit}>
          <input type="text" placeholder="FirstName..."
          name="FirstName" autoComplete="off" onChange={formik.handleChange} 
           value={formik.values.FirstName} onBlur={formik.handleBlur}/>
           {
            formik.touched.FirstName &&  formik.errors.FirstName ? <span> {formik.errors.FirstName}</span> :null
           }
          <input type="text" placeholder="LastName..."
          name="LastName" autoComplete="off" onChange={formik.handleChange}
          value={formik.values.LastName} onBlur={formik.handleBlur}/>
           {
             formik.touched.LastName && formik.errors.LastName ? <span>{formik.errors.LastName}</span> :null
           }
            <input type="text" placeholder="Email..."
          name="Email" autoComplete="off" onChange={formik.handleChange}
          value={formik.values.Email} onBlur={formik.handleBlur}/>
          {
             formik.touched.Email && formik.errors.Email ? <span>{formik.errors.Email}</span> :null
          }
          <input type="password" placeholder="Password"
          name="Password" autoComplete="off" onChange={formik.handleChange}
          value={formik.values.Password} onBlur={formik.handleBlur}/>
          {
            formik.touched.Password && formik.errors.Password ? <span>{formik.errors.Password} </span> :null
          }
          <input type="password" placeholder="ConfirmPassword"
          name= "ConfirmPassword" autoComplete="off" onChange={formik.handleChange}
          value={formik.values.ConfirmPassword} onBlur={formik.handleBlur}/>
          {
              formik.touched.ConfirmPassword && formik.errors.ConfirmPassword ? <span> {formik.errors.ConfirmPassword} </span>:null
          }
          <input type="submit" value="submit"/>
        </form>
      </div>
      <div className="message-box">
      {
          bool ? (<Popup onClick ={formik.handleSubmit}/>) :null
      }
      </div>
    </div>
  );
}
export default App;
