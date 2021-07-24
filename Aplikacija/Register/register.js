import {Headers} from  "../headers.js";
import { Helpers } from "../HelperFunctions.js";
import { RegisterForm } from "./registerForm.js";

//creating header
let headers = new Headers();
headers.createRegisterHeader();

//chaning title 
document.title = "Register";

//creating main window
Helpers.CreateMainWindow();

//Creating register form
let regForm = new RegisterForm();
regForm.DrawForm(); 

// let gymPicker = new GymForm();

// gymPicker.CreateGymPicker(".mainWindow");