import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserInterface } from "../data/UserInterface";
import { DataService } from "../data/data.service";

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

    constructor(private router: Router, private dataService: DataService) {}

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

    ngOnInit() {
        if (localStorage.getItem("logged") !== "") {
            this.router.navigateByUrl("/home");
        }
    }

    onEnter(form: NgForm) {
        const user: UserInterface = {
            email: "",
            username: this._username,
            password: this.password,
            confirmPassword: "",
            gender: "",
        };
        if (form.valid) {
            this.dataService.login(user).subscribe({
                next: () => {
                    localStorage.setItem("logged", JSON.stringify(user));
                    this.error = false;
                    this.router.navigateByUrl("/home");
                },
                error: (error) => {
                    console.log(error);
                    this.errorMsg = error.error;
                    this.error = true;
                },
            });
        }
    }

    onSignup() {
        this.router.navigateByUrl("/signup");
    }
}
