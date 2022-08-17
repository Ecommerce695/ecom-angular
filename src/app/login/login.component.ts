import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  returnUrl: string;

  constructor(private formBuilder:FormBuilder,private user:UserServiceService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
        private router: Router,) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      // email: ['', [Validators.required ,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      // password: ['', [Validators.required, Validators.minLength(6)]]
      username:[''],
      password:['']
   });
   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
// get username(){return this.loginForm.get('username')}
// get password(){return this.loginForm.get('password')}

  get f() { return this.loginForm.controls; }





  onSubmit() {
    this.submitted = true;
   
   
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe(
        data => {
           // this.router.navigate([this.returnUrl]);
        },
        error => {
            this.error = error;
            this.loading = false;
        });
        // console.log(results);
        //console.log(this.user);
        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
}

  }

