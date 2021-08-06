import { Headers } from "../headers.js";
import { Helpers } from "../HelperFunctions.js";
import { ProfileForm } from "./profileForm.js";

//creating header
let headers = new Headers();
headers.createProfileHeader();

//chaning title
document.title = "Profile";

//creating main window
let helper = new Helpers();
helper.CreateMainWindow();
// Helpers.CreateGymPicker(document.body);

let profile = new ProfileForm();
profile.DrawForm();

//adding links for going back and loggin out
let urlHome = "../UserHomePage/userHomePage.html";
headers.addGoBackUrl(urlHome);
headers.addLogoUrl(urlHome);
urlHome = "../HomePage/homePage.html";
headers.addLogOutUrl(urlHome);
