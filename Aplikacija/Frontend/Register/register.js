import { Headers } from "../headers.js";
import { Helpers } from "../HelperFunctions.js";
import { RegisterForm } from "./registerForm.js";

//creating header
let headers = new Headers();
headers.createRegisterHeader();

//chaning title
document.title = "Register";

//creating main window
let helper = new Helpers();
helper.CreateMainWindow();

//Creating register form
let regForm = new RegisterForm();
regForm.DrawForm();

//adding link for going back and logo
let url = "../HomePage/homePage.html";
headers.addGoBackUrl(url);
headers.addLogoUrl(url);
