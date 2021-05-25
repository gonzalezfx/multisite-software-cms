<?php

namespace App\Http\Controllers\API;

use App\Helpers\GeneralHelper;
use App\Models\Page;
use App\Http\Resources\API\PageResource;
use App\Http\Controllers\Controller;
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
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return PageResource::collection(Page::fromSite($request->site_id)->get());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function show(Page $page)
    {
        return new PageResource($page);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Page $page)
    {
        $this->validate(
            $request,
            [
                'title' => 'nullable|max:100',
                'introduction' => 'nullable|max:2000',
                'content' => 'nullable|string',
                'image_url' => 'nullable|max:300',
            ]
        );

        $prevImageUrl = $page->image_url;

        $page->update(
            $request->only(
                [
                    'title',
                    'introduction',
                    'content',
                    'image_url',
                ]
            )
        );

        GeneralHelper::deleteFileIfDifferent($prevImageUrl, $page->image_url);

        return new PageResource($page);
    }
}
