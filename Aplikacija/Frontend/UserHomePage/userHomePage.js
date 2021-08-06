import { Headers } from "../headers.js";
import { UserHomePageForm } from "./userHomePageForm.js";
import { Helpers } from "../HelperFunctions.js";
import { ClientPageApi } from "../Api/ClientPageApi.js";

//creating header
let headers = new Headers();
headers.createClientHeader();

//changing title
document.title = "Client HomePage";

//creating main window
let helper = new Helpers();
helper.CreateMainWindow();

// //creating forms inside main window
let id = helper.ExtractIDFromCookie("id");
let api = new ClientPageApi();
let user = await api.GetUser(id);
let userForm = new UserHomePageForm(user);
await userForm.DrawForm();

//adding links for profile page and logout
let url = "../Profile/profilePage.html";
headers.addProfileIconUrl(url);
url = "../HomePage/homePage.html";
headers.addLogOutUrl(url);
