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
    user: UserInterface = {
        email: null,
        username: null,
        password: null,
        confirmPassword: null,
        gender: null,
    };
    error = false;

    constructor(private router: Router, private dataService: DataService) {}

    ngOnInit() {
        if (localStorage.getItem("logged") !== "") {
            this.router.navigateByUrl("/home");
        }
    }

    onEnter(form: NgForm) {
        if (form.valid) {
            this.dataService.register(this.user).subscribe(
                (response) => {
                    this.router.navigateByUrl("/login");
                },
                (error) => {
                    if (error.status) {
                        console.log("Error Status Code:", error.status);
                        this.error = true;
                    }
                }
            );
        }
    }
}
