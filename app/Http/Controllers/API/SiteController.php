<?php

namespace App\Http\Controllers\API;

use App\Helpers\GeneralHelper;
use App\Models\Site;
use App\Http\Resources\API\SiteResource;
use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SiteController extends Controller
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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SiteResource::collection(Site::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate(
            $request,
            [
                'name' => 'required|max:40',
                'slug' => 'required|max:40',
                'show_in_home' => 'required|boolean',
                'logo_url' => 'nullable|max:300',
                'contact_email' => 'nullable|max:60',
                'chat_facebook' => 'nullable|max:60',
                'chat_whatsapp' => 'nullable|max:60',
                'facebook_url' => 'nullable|max:60',
                'linkedin_url' => 'nullable|max:60',
                'youtube_url' => 'nullable|max:60',
                'call_to_action_title' => 'nullable|max:200',
                'call_to_action_text' => 'nullable|max:2000',
                'call_to_action_button_label' => 'nullable|max:40',
                'call_to_action_button_url' => 'nullable|max:100',
                'software_url' => 'nullable|max:100',
                'software_guides_url' => 'nullable|max:100',
            ]
        );

        DB::beginTransaction();

        $site = Site::create(
            $request->all()
        );
        Page::create(
            [
                'title' => 'Políticas de privacidad',
                'keyword' => 'privacy_policies',
                'site_id' => $site->id,
            ]
        );
        Page::create(
            [
                'title' => 'Términos y condiciones',
                'keyword' => 'terms_and_conditions',
                'site_id' => $site->id,
            ]
        );
        Page::create(
            [
                'title' => 'Políticas de soporte',
                'keyword' => 'support_policies',
                'site_id' => $site->id,
            ]
        );

        DB::commit();

        return new SiteResource($site);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Site  $site
     * @return \Illuminate\Http\Response
     */
    public function show(Site $site)
    {
        return new SiteResource($site);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Site  $site
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Site $site)
    {
        $this->validate(
            $request,
            [
                'name' => 'required|max:40',
                'slug' => 'required|max:40',
                'show_in_home' => 'required|boolean',
                'logo_url' => 'nullable|max:300',
                'contact_email' => 'nullable|max:60',
                'chat_facebook' => 'nullable|max:60',
                'chat_whatsapp' => 'nullable|max:60',
                'facebook_url' => 'nullable|max:60',
                'linkedin_url' => 'nullable|max:60',
                'youtube_url' => 'nullable|max:60',
                'call_to_action_title' => 'nullable|max:200',
                'call_to_action_text' => 'nullable|max:2000',
                'call_to_action_button_label' => 'nullable|max:40',
                'call_to_action_button_url' => 'nullable|max:100',
                'software_url' => 'nullable|max:100',
                'software_guides_url' => 'nullable|max:100',
            ]
        );

        $prevLogoUrl = $site->logo_url;

        $site->update(
            $request->all()
        );

        GeneralHelper::deleteFileIfDifferent($prevLogoUrl, $site->logo_url);

        return new SiteResource($site);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Site  $site
     * @return \Illuminate\Http\Response
     */
    public function destroy(Site $site)
    {
        $site->delete();

        GeneralHelper::deleteFileAndFolder($site->logo_url);

        return response()->json(null, 204);
    }
}
