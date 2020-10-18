import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjectService } from 'src/app/services/projects/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private fb: FormBuilder, private projectService: ProjectService,
              private authService: AuthService) { }

  projectForm: FormGroup;
  submitted = false;
  success;
  error;
  projects: Project[];
  add = false;

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      id: [null],
      projectName : ['', Validators.required],
      details: ['', [Validators.required, Validators.minLength(10)]],
      status : ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      userId: ['']
      });
    this.loadProjects();
  }

  // tslint:disable-next-line: typedef
  loadProjects(){
    this.projectService.getProjects().subscribe(data => {
      this.projects = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Project)
        } ;
      });
    });
  }

  // tslint:disable-next-line: typedef
  get f() {return this.projectForm.controls; }

  // tslint:disable-next-line: typedef
  submit(){
    this.submitted = true;
    console.log(this.projectForm);

    if (this.projectForm.valid){
      const project: Project = {
        id: this.f.id.value,
        projectName: this.f.projectName.value,
        details: this.f.details.value,
        status: this.f.status.value,
        startDate: this.f.startDate.value,
        endDate: this.f.endDate.value,
        userId: this.authService.user.uid,
      };

      if (project.id === null){
        this.projectService.saveProject(project).then(x => {this.success = true;
                                                            this.add = false;
                                                            this.submitted = false;
                                                            this.projectForm.reset();
      })
      .catch(x => {this.error = x; this.add = false; this.submitted = false; this.projectForm.reset(); });
      }
      else{
        this.projectService.updateProject(project).then(x => {this.success = true;
                                                              this.add = false;
                                                              this.submitted = false;
                                                              this.projectForm.reset();
                                                          })
        .catch(x => {this.error = x; this.add = false; this.submitted = false; this.projectForm.reset(); });
      }
    }
  }

  // tslint:disable-next-line: typedef
  editClick(project){
    this.projectForm.patchValue(project);
    this.add = true;
  }

  // tslint:disable-next-line: typedef
  cancelled(){
    this.projectForm.reset();
    this.add = false;
  }

}
