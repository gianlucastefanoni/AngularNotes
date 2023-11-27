import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserInterface } from "../data/UserInterface";
import { DataService } from "../data/data.service";

@Component({
    selector: "pm-register",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./register.component.html",
    styleUrl: "./register.component.css",
})
export class RegisterComponent implements OnInit {
    allUsers: UserInterface[] = [];
    user: UserInterface = {
        email: null,
        username: null,
        password: null,
        confirmPassword: null,
        gender: null,
    };

    constructor(private router: Router, private dataService: DataService) {}

    ngOnInit() {
        this.allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    }
    private notExists(): boolean {
        const tempUser = this.allUsers.find(
            (user) => user.username === this.user.username
        );
        return tempUser === null || tempUser === undefined;
    }

    onEnter(form: NgForm) {
        if (form.valid && this.notExists()) {
            this.allUsers.push(this.user);
            localStorage.setItem("users", JSON.stringify(this.allUsers));
            this.router.navigateByUrl("/login");
        }
    }
}
