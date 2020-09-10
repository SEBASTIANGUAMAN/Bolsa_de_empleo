<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource("professional", "JobBoard\ProfessionalController");
Route::apiResource("compania", "JobBoard\CompanyController");