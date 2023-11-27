import { Component, OnInit } from "@angular/core";
import { UserInterface } from "../data/UserInterface";

@Component({
    selector: "hw-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
    user: UserInterface = {
        email: null,
        username: null,
        password: null,
        confirmPassword: null,
        gender: null,
    };
    welcomeMsg = "Welcome ";
    logged = false;

    ngOnInit(): void {
        const tempUser = localStorage.getItem("logged");
        this.user = tempUser !== null ? JSON.parse(tempUser) : "";
        this.welcomeMsg =
            "Welcome " +
            (this.user !== null && this.user.username
                ? this.user.username
                : "");
        this.logged = tempUser !== null ? true : false;
    }
}
