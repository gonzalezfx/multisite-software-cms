<?php

namespace App\Http\Controllers;

use App\Helpers\GeneralHelper;
use App\Models\Page;
use App\Models\Site;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Show Privacy policy page.
     *
     * @param \App\Models\Site $site
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function privacyPolicies(Site $site)
    {
        $page = Page::fromSite($site->id)->where('keyword', 'privacy_policies')->first();

        if (!$page) {
            abort(404);
        }

        return view(
            'page.generic',
            [
                'page' => $page,
            ]
        );
    }

    /**
     * Show Terms and conditions page.
     *
     * @param \App\Models\Site $site
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function termsAndConditions(Site $site)
    {
        $page = Page::fromSite($site->id)->where('keyword', 'terms_and_conditions')->first();

        if (!$page) {
            abort(404);
        }

        return view(
            'page.generic',
            [
                'page' => $page,
            ]
        );
    }

    /**
     * Show Support Policies page.
     *
     * @param \App\Models\Site $site
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function supportPolicies(Site $site)
    {
        $page = Page::fromSite($site->id)->where('keyword', 'support_policies')->first();

        if (!$page) {
            abort(404);
        }

        return view(
            'page.generic',
            [
                'page' => $page,
            ]
        );
    }
}
