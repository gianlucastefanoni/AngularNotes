import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "hw-root",
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent {
    pageTitle = "hello-world";
    logoPath = "../assets/images.png";
    logoWidth = 70;

    constructor(private router: Router) {}

    isLogged(): boolean {
        return localStorage.getItem("logged") === "" ? true : false;
    }
    disconnect() {
        localStorage.setItem("logged", "");
        this.router.navigateByUrl("/login");
    }
}
