import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { UserInterface } from "../data/UserInterface";

@Component({
    selector: "hw-login",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
    private _username = "";
    private _password = "";
    allUsers: UserInterface[] = [];
    error = false;
    errorMsg = "Error in login";

    constructor(private router: Router) {}

    get username(): string {
        return this._username;
    }
    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }
    set password(value: string) {
        this._password = value;
    }

    ngOnInit(): void {
        this.allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    }

    onEnter() {
        console.log(this._username + " " + this._password);
        const tempUser = this.allUsers.find(
            (user) => user.username === this._username
        );
        if (tempUser !== null && tempUser !== undefined)
            if (this._password === tempUser.password) {
                localStorage.setItem("logged", JSON.stringify(tempUser));
                this.router.navigateByUrl("/home");
            } else {
                this.errorMsg = "Wrong password";
                this.error = true;
            }
        else {
            this.errorMsg = "User not found";
            this.error = true;
        }
    }
    onSignup() {
        this.router.navigateByUrl("/signup");
    }
}
