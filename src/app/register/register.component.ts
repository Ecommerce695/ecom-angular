import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm: FormGroup;
loading:false;
submitted:false;
confirmPasswordError = false;
error:'';



  constructor(private formBuilder:FormBuilder,private userService:UserServiceService) { }

  initializeForm(){
    this.registerForm = this.formBuilder.group({
      username:['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
  }


get f(){
  return this.registerForm.controls;
}
checkConfirmPassword(){
  if(this.registerForm.value.confirmPassword === this.registerForm.value.password){
    this.confirmPasswordError = false;
  } else{
    this.confirmPasswordError = true;
  }

 }

onSubmit(){
  this.userService.register(this.registerForm.value)
  .pipe(first())
 .subscribe(
     (data: any) => {
       console.log(data);
       
     
     },
     error => {
      this.error = error;
      this.loading = false;
  });
}


  ngOnInit() {
    this.initializeForm();
  }

}
