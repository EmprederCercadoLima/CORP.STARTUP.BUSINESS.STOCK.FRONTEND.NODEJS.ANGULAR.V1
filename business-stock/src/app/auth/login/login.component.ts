import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CryptoUtil } from 'src/app/utils/crypto.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  getHashes : any
  postLogin: any;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) { }

  public formSubmitted = false;

  public loginForm = this.formBuilder.group({
    email: [ '', [ Validators.required, Validators.email ]],
    password: [ '', [ Validators.required ]]
  })

  ngOnInit() { 
    this.authService.getHashes().subscribe(
        (sucess) => {
            this.getHashes = sucess
        }, 
        (error) => {
            console.error("NgxLoginComponent::ngOnInit::error", error)
        }
    );
  }

  login() {
    const { email, password } = this.loginForm.value

      const encryptDataEmail = CryptoUtil.encryptData(email, this.getHashes.data.hashes.from, this.getHashes.data.keys.from);
      const encryptDataPassword = CryptoUtil.encryptData(password, this.getHashes.data.hashes.to, this.getHashes.data.keys.to);
      const encryptCredentials = CryptoUtil.encryptData(JSON.stringify({ encryptDataEmail, encryptDataPassword }), this.getHashes.data.hashes.from, this.getHashes.data.keys.to);

      const postLogin = {
          id: this.getHashes.data.id,
          hash: encryptCredentials
      }

      this.authService.postLogin(postLogin).subscribe(
          (sucess) => {
              this.router.navigate(["/dashboard"])
          }, 
          (error) => {
              console.error("NgxLoginComponent::ngOnInit::error", error)
          }
      )
  }
}
