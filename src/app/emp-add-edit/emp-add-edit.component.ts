import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  education: string[] = ['10th', '12th', 'Diploma', 'Under Graduate', 'Post Graduate'];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    public _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: null,
      gender: '',
      education: '',
      company: '',
      experience: 0,
      package: 0,
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.empForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      const formData = this.empForm.value;
      if (this.data) {
        // If data is provided, it's an edit operation
        formData.id = this.data.id;
        this._empService.updateEmployee(formData).subscribe({
          next: (val: any) => {
            alert('Employee updated successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        // If data is not provided, it's an add operation
        this._empService.addEmployee(formData).subscribe({
          next: (val: any) => {
            alert('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }
}
