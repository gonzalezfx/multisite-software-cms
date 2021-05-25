<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AjaxImageUploadController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*
*  Admin panel
*/
Route::get('/admin', [ AdminController::class, 'index' ])->name('admin'); // To have a named route
Route::get('/admin/{path}', [ AdminController::class, 'index' ])->where('path', '.*'); // To allow react fake routes


/*
*  Authentication
*/
Auth::routes();

/*
*  Ajax uploads
*/
Route::post('/ajaxImageUpload', [ AjaxImageUploadController::class, 'save' ])->name('ajaxImageUpload');

/*
*  CSRF Token Refresh
*/
Route::get(
    'refresh-csrf',
    function () {
        return csrf_token();
    }
)->middleware('auth');

Route::get('/', [ HomeController::class, 'index' ])
    ->name('home');

/*
*  Dynamic Site Routes
*/
Route::get('/{site:slug}', [ SiteController::class, 'index' ])
    ->name('site.home')
    ->middleware([ 'site.required' ]);
Route::get('/{site:slug}/modulos', [ SiteController::class, 'modules' ])
    ->name('site.modules')
    ->middleware([ 'site.required' ]);
Route::get('/{site:slug}/ayuda-soporte', [ SiteController::class, 'helpAndSupport' ])
    ->name('site.helpAndSupport')
    ->middleware([ 'site.required' ]);

/*
*  Contact
*/
Route::get('/{site:slug}/contacto', [ SiteController::class, 'contact' ])
    ->name('site.contact')
    ->middleware([ 'site.required' ]);
Route::post('/{site:slug}/sendContact', [ SiteController::class, 'sendContact' ])
    ->name('site.sendContact')
    ->middleware([ 'site.required' ]);
Route::get('/{site:slug}/blog', [ BlogController::class, 'index' ])
    ->name('site.blog.index')
    ->middleware([ 'site.required' ]);
Route::get('/{site:slug}/blog/{post}', [ BlogController::class, 'view' ])
    ->name('site.blog.view')
    ->middleware([ 'site.required' ]);

/*
*  Informative pages
*/
Route::get('/{site:slug}/politicas-de-privacidad', [ PageController::class, 'privacyPolicies' ])
    ->name('site.privacyPolicies')
    ->middleware([ 'site.required' ]);
Route::get('/{site:slug}/terminos-y-condiciones', [ PageController::class, 'termsAndConditions' ])
    ->name('site.termsAndConditions')
    ->middleware([ 'site.required' ]);
Route::get('/{site:slug}/politicas-de-soporte', [ PageController::class, 'supportPolicies' ])
    ->name('site.supportPolicies')
    ->middleware([ 'site.required' ]);
