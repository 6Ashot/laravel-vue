<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Employee;
use App\Models\Company;
use App\Http\Requests\CreateEmployeeRequest;


class EmployeesController extends Controller
{

    public function index()
    {
        $employees = Employee::with('company')->paginate(10);
        return response($employees, 200);
    }

    public function create()
    {
        $companies = Company::all();
        return response($companies, 200);
    }


    public function store(CreateEmployeeRequest $request)
    {
        $data = [
            'firstName' => $request['firstName'],
            'lastName' => $request['lastName'],
            'company_id' => $request['company_id'],
            'email' => $request['email'],
            'phone' => $request['phone']
        ];
        if(Employee::create($data)){
            return response(['message' => 'Employee was added!'], 201);
        }else{
            return response(['message' => 'Something gone worng'], 403);
        }
        
    }


    public function edit(Employee $employee)
    {
        $companies = Company::all();
        return response()->json(['employee' => $employee, 'companies' => $companies], 200);
    }


    public function update(CreateEmployeeRequest $request, Employee $employee)
    {
        $employee->firstName = $request->input('firstName');
        $employee->lastName = $request->input('lastName');
        $employee->company_id = $request->input('company_id');
        $employee->email = $request->input('email');
        $employee->phone = $request->input('phone');
        if($employee->save()){
            return response('Changes saved' , 200);
        }else{
            return response(['message' => 'Something gone worng'], 403);
        }

    }


    public function destroy(Employee $employee)
    {
        if($employee->delete()){
            return response($employee , 200);
        }else{
            return response(['message' => 'Something gone worng'], 403);
        }
        
    }
}
