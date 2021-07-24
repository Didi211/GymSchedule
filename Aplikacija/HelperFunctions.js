export class Helpers
{
    static CreateMainWindow()
    {
        let glavniProzor = document.createElement("div");
        glavniProzor.className = "mainWindow";
        document.body.appendChild(glavniProzor);
        return glavniProzor;
    }
}