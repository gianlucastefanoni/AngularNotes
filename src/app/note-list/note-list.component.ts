import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Note } from "../data/Note";
import { Router, RouterLink } from "@angular/router";
import { UserInterface } from "../data/UserInterface";
import { DataService } from "../data/data.service";
import { SafeHtmlPipe } from "../pipe/safe-html.pipe";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "hw-note-list",
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, SafeHtmlPipe],
    templateUrl: "./note-list.component.html",
    styleUrl: "./note-list.component.css",
    encapsulation: ViewEncapsulation.None,
})
export class NoteListComponent implements OnInit {
    @Input() user!: UserInterface;
    newPath = "../assets/Group 1.svg";
    notes: Note[] = [];
    filteredNotes: Note[] = [];
    pinnedNotes: Note[] = [];
    searchField = "";
    constructor(private dataService: DataService, private router: Router) {}

    ngOnInit() {
        this.dataService
            .getNotesByUsername(this.user.username || "")
            .subscribe({
                next: (response) => {
                    this.notes = JSON.parse(response);
                    this.filteredNotes = this.notes;
                },
                error: (error) => {
                    console.log(error);
                },
            });
        this.dataService
            .getPinnedNotesByUsername(this.user.username || "")
            .subscribe({
                next: (response) => {
                    this.pinnedNotes = JSON.parse(response);
                },
                error: (error) => {
                    console.log(error);
                },
            });
    }

    createNewNote() {
        const id = this.dataService.generateId(8);
        const newNote = {
            id: id,
            title: "Title",
            username: this.user.username || "",
            content: "Content",
            pinned: false,
        };
        this.dataService.createNewNote(newNote).subscribe({
            next: () => {
                this.router.navigateByUrl("/notes/" + id);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    onSearchChange() {
        this.filteredNotes = this.notes.filter(
            (note) =>
                note.title
                    ?.toLowerCase()
                    .includes(this.searchField.toLowerCase()) ||
                note.content
                    ?.toLowerCase()
                    .includes(this.searchField.toLowerCase())
        );
    }

    addToPinned(note: Note) {
        note.pinned = true;
        this.dataService.updatePinnedNoteById(note).subscribe({
            next: (response) => {
                console.log(response);
                this.ngOnInit();
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    removeFromPinned(note: Note) {
        note.pinned = false;
        this.dataService.updatePinnedNoteById(note).subscribe({
            next: (response) => {
                console.log(response);
                this.ngOnInit();
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
}
