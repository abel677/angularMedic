import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGender, IPerson, IUser } from 'src/app/interfaces';
import { GenderService } from 'src/app/services/gender.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PersonService } from 'src/app/services/person.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-personal-contact',
  templateUrl: './personal-contact.component.html',
  styleUrls: ['./personal-contact.component.css'],
})
export class PersonalContactComponent implements OnInit {
  store = inject(StoreService);
  genderService = inject(GenderService);
  personService = inject(PersonService);
  fb = inject(FormBuilder);
  genders: IGender[] = [];
  isEdit: boolean = false;

  form: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    typeBlood: ['', [Validators.required]],
    direction: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    securityNumber: ['',[Validators.required]],
    idGender: ['', [Validators.required]],
    idUser: [''],
    idPatient: [''],
  });

  person: IPerson[] = [];
  user?: IUser;

  ngOnInit(): void {
    this.getUser();
    this.getPerson();
    this.getGender();
  }
  getUser() {
    this.user = this.store.getUser();
    this.form.controls['idUser'].setValue(this.user.id);
  }
  getPerson() {
    this.personService.getPersonIdUser(this.user?.id || 0).subscribe({
      next: (person) => {        
        this.person = person;
        localStorage.setItem('person', JSON.stringify(person[0]));
        this.form.patchValue(this.person[0]);
        if (this.person[0]?.id) {
          this.isEdit = true;
        } else {
          this.isEdit = false;
        }
      },
    });
  }

  getGender() {
    this.genderService.getGenders().subscribe((data) => (this.genders = data));
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isEdit) {
        this.onEdit();
      } else {
        this.onRegister();
      }
    } else {
      this.form.markAllAsTouched();
      alert('invalid fields');
    }
  }

  onRegister() {
    this.personService
      .postPerson(this.form.value)
      .subscribe((data) => console.log(data));
    this.getPerson();
  }

  onEdit() {
    this.personService
      .updatePerson(this.form.value)
      .subscribe({
        next:(res) => {
          alert(res.message)
        }
      });
  }
}
