<?php

use App\Http\Controllers\API\ModuleController;
use App\Http\Controllers\API\SiteController;
use App\Http\Controllers\API\PageController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\SectionController;
use App\Http\Controllers\API\SlideController;
use App\Http\Controllers\API\TestimonialController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get(
    '/user',
    function (Request $request) {
        return $request->user();
    }
);

Route::apiResources(
    [
        'sites' => SiteController::class,
        'slides' => SlideController::class,
        'sections' => SectionController::class,
        'modules' => ModuleController::class,
        'posts' => PostController::class,
        'testimonials' => TestimonialController::class,
        'users' => UserController::class,
    ]
);

Route::get('/sites/bySlug/{site:slug}', [ SiteController::class, 'show' ])->name('api.sites.bySlug');

Route::apiResource('pages', PageController::class)->except(
    [
        'store',
        'destroy',
    ]
);
