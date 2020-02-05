<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Company;
use App\Http\Requests\CreateCompanieRequest;
use Illuminate\Support\Facades\File;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function index()
    {   
        $companies = Company::paginate(10);
        return response($companies, 200);
    }

    /**
    auth('api')->user()
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCompanieRequest $request)
    {
        $fileName = '';
        if ($request->file('logo')) {
            $fileName = $request->file('logo')->store('/public');
            $fileName = str_replace('public', 'storage', $fileName);
        }
        $website = '';
        if($request['website']){
            $website = $request['website'];
        }
        $data = [
            'name' => $request['name'],
            'email' => $request['email'],
            'logo' => $fileName,
            'website' => $website
        ];
        if(Company::create($data)){
            return response(['message' => 'Company was created'], 201);
        }else{
            return response(['message' => 'Something gone worng'], 403);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Company $company)
    {
        if($company){
            return response($company);
        }else{
            return response(['message' => 'Something gone worng'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Company $company)
    {
        $company->name = $request['name'];
        $company->email = $request['email'];
        $company->website = $request['website'];
        if ($request->logo) {
            if ($company->logo != '') {
                unlink(storage_path('app/public/'.str_replace('storage/', '', $company->logo)));
            }
            $fileName = $request->file('logo')->store('/public');
            $fileName = str_replace('public', 'storage', $fileName);
            $company->logo = $fileName;
            
        }
        if($company->save()){
            return response($company, 200);

        }else{
            return response(['message' => 'Something gone worng'], 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company)
    {
        if ($company->logo != '') {
            unlink(storage_path('app/public/'.str_replace('storage/', '', $company->logo)));
        }
        if($company->delete()){
            return response($company);
        }else{
            return response(['message' => 'Something gone worng'], 403);
        }
        
    }
}
