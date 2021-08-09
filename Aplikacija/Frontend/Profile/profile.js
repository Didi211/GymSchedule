import { ClientPageApi } from "../Api/ClientPageApi.js";
import { ApiClientPageURL } from "../apiKonstante.js";
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

let id = helper.ExtractIDFromCookie("id");
let api = new ClientPageApi();
let user = await api.GetUser(id);
let profile = new ProfileForm(user);

await profile.DrawForm();

//adding links for going back and loggin out
let urlHome = "../UserHomePage/userHomePage.html";
headers.addGoBackUrl(urlHome);
headers.addLogoUrl(urlHome);
urlHome = "../HomePage/homePage.html";
headers.addLogOutUrl(urlHome);
