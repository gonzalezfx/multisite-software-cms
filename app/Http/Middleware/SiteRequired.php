<?php

namespace App\Http\Middleware;

use App\Helpers\GeneralHelper;
use Closure;

class SiteRequired
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $currentSite = GeneralHelper::getCurrentSite();

        if (!$currentSite) {
            abort(404);
        }

        return $next($request);
    }
}
