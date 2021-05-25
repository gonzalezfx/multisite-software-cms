<?php

namespace App\Http\Controllers\API;

use App\Helpers\GeneralHelper;
use App\Models\Slide;
use App\Http\Resources\API\SlideResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SlideController extends Controller
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
        $this->validate(
            $request,
            [
                'site_id' => 'nullable|exists:site,id',
            ]
        );

        return SlideResource::collection(Slide::fromSite($request->site_id)->get());
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
                'first_line' => 'nullable|max:200',
                'second_line' => 'nullable|max:200',
                'third_line' => 'nullable|max:1000',
                'image_url' => 'required|max:300',
                'button_icon_url' => 'nullable|max:300',
                'button_label' => 'nullable|max:300',
                'button_url' => 'nullable|max:300',
                'site_id' => 'required|exists:site,id',
            ]
        );

        $slide = Slide::create(
            $request->all()
        );

        return new SlideResource($slide);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Slide  $slide
     * @return \Illuminate\Http\Response
     */
    public function show(Slide $slide)
    {
        return new SlideResource($slide);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Slide  $slide
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Slide $slide)
    {
        $this->validate(
            $request,
            [
                'first_line' => 'sometimes|nullable|max:200',
                'second_line' => 'sometimes|nullable|max:200',
                'third_line' => 'sometimes|nullable|max:1000',
                'image_url' => 'sometimes|required|max:300',
                'button_icon_url' => 'sometimes|nullable|max:300',
                'button_label' => 'sometimes|nullable|max:300',
                'button_url' => 'sometimes|nullable|max:300',
            ]
        );

        $prevImageUrl = $slide->image_url;

        $slide->update(
            $request->all()
        );

        GeneralHelper::deleteFileIfDifferent($prevImageUrl, $slide->image_url);

        return new SlideResource($slide);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Slide  $slide
     * @return \Illuminate\Http\Response
     */
    public function destroy(Slide $slide)
    {
        $slide->delete();

        GeneralHelper::deleteFileAndFolder($slide->image_url);
        GeneralHelper::deleteFileAndFolder($slide->button_icon_url);

        return response()->json(null, 204);
    }
}
