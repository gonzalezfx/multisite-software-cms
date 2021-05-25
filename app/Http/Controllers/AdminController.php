<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        // We not use Request because request could be different if using reverse proxy
        $schemeAndHost = parse_url(route('admin'));
        $adminBaseURI = str_replace($schemeAndHost['scheme'].'://'.$schemeAndHost['host'], '', route('admin'));

        if (array_key_exists('port', $schemeAndHost)) {
            $adminBaseURI = str_replace(':'.$schemeAndHost['port'], '', $adminBaseURI);
        }

        return view(
            'dashboard',
            [
                'adminBaseURI' => $adminBaseURI,
            ]
        );
    }
}
