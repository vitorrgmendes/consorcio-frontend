import { Component } from '@angular/core';
import { VisibilityService } from '../../services/visibility.service';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl, FormsModule } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-register-screen',
    standalone: true,
    templateUrl: './register-screen.component.html',
    styleUrl: './register-screen.component.css',
    providers: [
      {
        provide: STEPPER_GLOBAL_OPTIONS,
        useValue: {showError: false},
      },
    ],
    imports: [MatStepperModule, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatInputModule,FormsModule,
      RouterOutlet, RouterLink, RouterLinkActive,MatIconModule]
})
export class RegisterScreenComponent {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  firstStepCompleted = false;
  secondStepCompleted = false;

  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = '';

  constructor(private _formBuilder: FormBuilder, private visibilityService: VisibilityService) {
    this.setupEmailListener();
    this.visibilityService.setShowComponent(false);
  }

  setupEmailListener() {
    this.email.statusChanges.pipe(
      takeUntilDestroyed()
    ).subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'Preencha este campo!';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Insira um e-mail válido';
    } else {
      this.errorMessage = '';
    }
  }

  onStepChange(step: number) {
    if (step === 0) {
      this.firstStepCompleted = true;
    } else if (step === 1) {
      this.secondStepCompleted = true;
    }
  }
}
