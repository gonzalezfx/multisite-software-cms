<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        /*
        *  Re-set the public folder path to a location relative from the app root folder
        *  Useful in cases when you publish public folder in apache root but app root is outside
        *  apache web root to prevent access from internet
        */
        $relativePublicPath = env('RELATIVE_PUBLIC_PATH', '');

        if (!empty($relativePublicPath)) {
            $this->app->bind(
                'path.public',
                function () use ($relativePublicPath) {
                    return base_path().'/'.$relativePublicPath;
                }
            );
        }

        /*
        *  Force Laravel URL generation and scheme
        */
        $appProxyUrl = env('APP_PROXY_URL', null);

        if (!empty($appProxyUrl)) {
            URL::forceRootUrl($appProxyUrl);
        }

        if (strpos($appProxyUrl, 'https://') !== false) {
            URL::forceScheme('https');
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        setlocale(LC_ALL, 'es_MX');
    }
}
