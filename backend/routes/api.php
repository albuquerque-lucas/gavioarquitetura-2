<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/projects', ProjectsController::class);
Route::apiResource('/categories', CategoriesController::class);
Route::apiResource('/admin/users', UserController::class);
Route::post('/admin/login', [UserController::class, 'login']);
Route::get("projects/category/{id}", [ProjectsController::class, "getByCategory"]);