import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FolderService } from "../services/folder.service";

@Component({
  selector: "app-folder-folderform",
  templateUrl: "./folderform.component.html"
})

export class FolderformComponent {
   folderForm: FormGroup;
  isEditMode: boolean = false;
  folderId: number = -1;

  constructor(
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _folderService: FolderService
  ) {
    // Initialize folderForm with form controls and validators
    this.folderForm = _formbuilder.group({
      folderName: ["", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern(/^[0-9a-zA-ZæøåÆØÅ. -]{2,100}$/)
      ]],
      folderDescription: ["", [Validators.maxLength(150)]],
    });
  }

  // Handle form submission
  onSubmit() {
    const newFolder = this.folderForm.value;
    if (this.isEditMode) {
      // Update existing folder
      this._folderService.updateFolder(this.folderId, newFolder)
        .subscribe(response => {
          if (response.success) {
            console.log("Folder updated successfully");
            this._router.navigate(["/folder/" + this.folderId]);
          } else {
            console.log("Folder update failed");
          }
        });
    } else {
      // Create a new folder
      this._folderService.createFolder(newFolder)
        .subscribe(response => {
          if (response.success) {
            console.log(response.message);
            this._router.navigate(["/library"]);
          } else {
            console.log("Folder creation failed");
          }
        });
    }
  }

  // Navigate back to folders based on the edit mode
  backToFolders() {
    if (this.isEditMode) {
      this._router.navigate(["/folder/" + this.folderId]);
    } else {
      this._router.navigate(["/library"]);
    }
  }

  // Initialize component
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      // Check the mode parameter to determine whether it's in create or update mode
      if (params["mode"] === "create") {
        this.isEditMode = false; // Create mode
      } else if (params["mode"] === "update") {
        this.isEditMode = true; // Edit mode
        this.folderId = +params["id"];
        this.loadItemForEdit(this.folderId);
      }
    });
    // Perform folder form validation
    this.validationFolder();
  }

  loadItemForEdit(folderId: number): void {
    // Call the getFolderById method of the folder service to fetch folder details.
    this._folderService.getFolderById(folderId)
      .subscribe({
        // Success callback (next): Invoked when folder details are successfully retrieved.
        next: (folder: any) => {
          // Update the folderForm with the retrieved folder details.
          this.folderForm.patchValue({
            folderName: folder.FolderName,
            folderDescription: folder.FolderDescription
          });
        },
        // Error callback: Invoked when an error occurs during the fetch operation.
        error: (error: any) => {
          console.error("Error loading folder for edit: ", error);
        }
      });
  }

  validationFolder() {
    const myInput: HTMLInputElement | null = document.getElementById("folderName") as HTMLInputElement;
    const validatationFolder: HTMLElement | null = document.getElementById("validatationFolder");
    if (validatationFolder) {
      validatationFolder.style.display = "none";
    }

    if (myInput && validatationFolder) {
      myInput.addEventListener("input", () => {
        validatationFolder.style.display = "block"
      });
      setTimeout(() => {
        validatationFolder.style.display = "block";
      }, 10000);
    }
  }
}
