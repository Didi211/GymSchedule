import  {GymForm} from "./gymPicForm.js";
import {Headers} from  "../headers.js";
import { LoginForm } from "./loginForm.js";
import {Helpers} from "../HelperFunctions.js";

//creating header
let headers = new Headers();
headers.createHeader(); 

//chaning title
document.title = "Home Page";

//creating main window of a page
Helpers.CreateMainWindow();

//creating gym part 
let gymForm = new GymForm();
gymForm.DrawForm();

//creating login part
let loginForm = new LoginForm();
loginForm.DrawForm();

