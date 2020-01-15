import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetService } from '../set.service';
@Component({
  selector: 'nx-apollo-example-set-form',
  templateUrl: './set-form.component.html',
  styleUrls: ['./set-form.component.css']
})
export class SetFormComponent {
  newSetForm: FormGroup;

  constructor(private setService: SetService, private fb: FormBuilder) {

    this.newSetForm = this.fb.group(
      {
        name: ['', Validators.required],
        year: ['', Validators.required],
        numParts: [100, Validators.required]
      }
    )
  }

  createSet() {
    if (this.newSetForm.valid) {
      const newSet = { name: this.newSetForm.get('name').value, year: this.newSetForm.get('year').value, numParts: +this.newSetForm.get('numParts').value };

      this.setService.addSet(newSet).subscribe(() => {
        this.newSetForm.reset();
      });
    }

  }
}
