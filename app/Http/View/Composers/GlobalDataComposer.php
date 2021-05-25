<?php

namespace App\Http\View\Composers;

use App\Helpers\GeneralHelper;
use App\Models\Site;
use Illuminate\View\View;

class GlobalDataComposer
{
    /**
     * Bind data to the view.
     *
     * @param View $view
     *
     * @return void
     */
    public function compose(View $view)
    {
        $currentSite = GeneralHelper::getCurrentSite();

        $view->with(
            'currentSite',
            $currentSite
        );
    }
}
