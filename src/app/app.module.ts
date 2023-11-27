import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";
import { NoteListComponent } from "./note-list/note-list.component";
import { NoteComponent } from "./note/note.component";

@NgModule({
    declarations: [AppComponent, HomeComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        LoginComponent,
        NoteListComponent,
        RouterModule.forRoot([
            { path: "home", component: HomeComponent },
            { path: "login", component: LoginComponent },
            { path: "signup", component: RegisterComponent },
            { path: "notes/:id", component: NoteComponent },
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "**", redirectTo: "home", pathMatch: "full" },
        ]),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
