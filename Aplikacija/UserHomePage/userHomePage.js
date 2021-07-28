import { Headers } from  "../headers.js";
import { Helpers } from "../HelperFunctions.js";
import { UserHomePageForm } from "./userHomePageForm.js";

//creating header
let headers = new Headers();
headers.createClientHeader();

//changing title 
document.title = "Client HomePage";

//creating main window
Helpers.CreateMainWindow();

//creating forms inside main window
let userForm = new UserHomePageForm();
userForm.DrawForm();

//adding links for profile page and logout
let url = "../Profile/profilePage.html";
headers.addProfileIconUrl(url);
url = "../HomePage/homePage.html";
headers.addLogOutUrl(url);

