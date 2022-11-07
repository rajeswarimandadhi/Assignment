import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { CustomerModel } from './customer-dashboard.model';
@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  formValue !: FormGroup;
  customerData !: any;
  customerObj : CustomerModel = new CustomerModel();
  showAdd !: boolean;
  showUpdate !: boolean;
  @Input() receive !: string;
  @Input() mobileSpecification !: any;
  role:string =""
  constructor(private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
    this.getCustomerDetails();
    this.role = localStorage.getItem('userType')!
  }
  clickAddCustomer(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postCustomerDetails() {
    this.customerObj.FirstName = this.formValue.value.firstName;
     this.customerObj.LastName = this.formValue.value.lastName;
     this.customerObj.Email = this.formValue.value.email;
     this.customerObj.Mobile = this.formValue.value.mobile;
     this.customerObj.Salary = this.formValue.value.salary;
    this.api.PostCustomer(this.customerObj)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('close');
      ref?.click();
      this.getCustomerDetails();
      })
  }
  getCustomerDetails() {
    this.api.GetCustomers()
    .subscribe(res=>{
      this.customerData = res.customerDetails;

    })
  }
  editCustomerDetail(){
     this.customerObj.FirstName = this.formValue.value.firstName;
     this.customerObj.LastName = this.formValue.value.lastName;
     this.customerObj.Email = this.formValue.value.email;
     this.customerObj.Mobile = this.formValue.value.mobile;
     this.customerObj.Salary = this.formValue.value.salary;
    this.api.UpdateCustomer(this.customerObj)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('close');
      ref?.click();
      this.getCustomerDetails();
    })
  }
  onEdit(row : any){
    this.customerObj.Id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    this.showUpdate = true;
    this.showAdd = false;
  }

  deleteCustomerDetail(row : any){
   let clickedYes = confirm("Are you sure want to delete");
   if(clickedYes){
    this.api.DeleteCustomer(row.id)
    .subscribe(res=>{
      alert("Deleted Successfully");
      this.getCustomerDetails();
    })
   }

  }
}

