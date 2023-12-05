import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Note, defaultNote } from "../data/Note";
import { ActivatedRoute, Router } from "@angular/router";
import {
    HtmlEditorService,
    LinkService,
    RichTextEditorModule,
    ToolbarService,
} from "@syncfusion/ej2-angular-richtexteditor";
import { FormsModule, NgForm } from "@angular/forms";
import { DataService } from "../data/data.service";

@Component({
    selector: "pm-note",
    standalone: true,
    imports: [CommonModule, FormsModule, RichTextEditorModule],
    templateUrl: "./note.component.html",
    styleUrl: "./note.component.css",
    providers: [ToolbarService, LinkService, HtmlEditorService],
})
export class NoteComponent implements OnInit {
    notes: Note[] = [];
    updatedNote: Note = defaultNote;
    id = "0";
    modifiable = false;
    public tools: object = {
        type: "Expand",
        items: [
            "Bold",
            "Italic",
            "Underline",
            "StrikeThrough",
            "FontName",
            "Formats",
            //FontSize,
            //"FontColor",
            //"BackgroundColor",
            "LowerCase",
            "UpperCase",
            "Alignments",
            "OrderedList",
            "UnorderedList",
            "Outdent",
            "Indent",
            "|",
            "Undo",
            "Redo",
        ],
    };
    public maxLength = 400;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService
    ) {}

    ngOnInit() {
        this.id = String(this.route.snapshot.paramMap.get("id"));
        this.dataService.getNoteById(this.id).subscribe(
            (response) => {
                this.updatedNote = JSON.parse(response)[0];
                this.modifiable =
                    JSON.parse(
                        localStorage.getItem("logged") || "{username: '' }"
                    ).username !== this.updatedNote.username;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    updateNote() {
        this.dataService.updateNoteById(this.updatedNote).subscribe(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    deleteNote() {
        this.dataService.deleteNoteById(this.id).subscribe(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
        this.router.navigateByUrl("/home");
    }

    onEnter(form: NgForm) {
        this.updatedNote.content = form.value.content;
        this.updateNote();
        this.router.navigateByUrl("/home");
    }
}
