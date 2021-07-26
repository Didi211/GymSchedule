import {Headers} from  "../headers.js";
import { Helpers } from "../HelperFunctions.js";
import { ProfileForm } from "./profileForm.js";

//creating header
let headers = new Headers();
headers.createProfileHeader();

//chaning title 
document.title = "Profile";

//creating main window
Helpers.CreateMainWindow();
// Helpers.CreateGymPicker(document.body);

let profile = new ProfileForm();
profile.DrawForm();
