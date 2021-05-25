<?php

namespace App\Http\Controllers\API;

use App\Helpers\GeneralHelper;
use App\Models\Section;
use App\Http\Resources\API\SectionResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class SectionController extends Controller
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

        return SectionResource::collection(Section::fromSite($request->site_id)->get());
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
                'title' => 'required|max:100',
                'content' => 'nullable|string',
                'alignment_type' => [
                    'required',
                    Rule::in(
                        [
                            Section::ALIGNMENT_TYPE_LEFT,
                            Section::ALIGNMENT_TYPE_CENTER,
                            Section::ALIGNMENT_TYPE_RIGHT,
                        ]
                    ),
                ],
                'background_type' => [
                    'required',
                    Rule::in(
                        [
                            Section::BACKGROUND_TYPE_WHITE,
                            Section::BACKGROUND_TYPE_SOFT_GRAY,
                            Section::BACKGROUND_TYPE_BRAND_COLOR,
                        ]
                    ),
                ],
                'image_url' => 'nullable|max:300',
                'listable_bonus' => 'nullable|array',
                'listable_bonus.*' => 'nullable|max:300',
                'button_label' => 'nullable|max:300',
                'button_url' => 'nullable|max:300',
                'site_id' => 'required|exists:site,id',
            ]
        );

        $section = Section::create(
            $request->all()
        );

        return new SectionResource($section);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function show(Section $section)
    {
        return new SectionResource($section);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Section $section)
    {
        $this->validate(
            $request,
            [
                'title' => 'sometimes|required|max:100',
                'content' => 'sometimes|nullable|string',
                'alignment_type' => [
                    'sometimes',
                    'required',
                    Rule::in(
                        [
                            Section::ALIGNMENT_TYPE_LEFT,
                            Section::ALIGNMENT_TYPE_CENTER,
                            Section::ALIGNMENT_TYPE_RIGHT,
                        ]
                    ),
                ],
                'background_type' => [
                    'sometimes',
                    'required',
                    Rule::in(
                        [
                            Section::BACKGROUND_TYPE_WHITE,
                            Section::BACKGROUND_TYPE_SOFT_GRAY,
                            Section::BACKGROUND_TYPE_BRAND_COLOR,
                        ]
                    ),
                ],
                'image_url' => 'sometimes|nullable|max:300',
                'listable_bonus' => 'sometimes|nullable|array',
                'listable_bonus.*' => 'sometimes|nullable|max:300',
                'button_label' => 'sometimes|nullable|max:300',
                'button_url' => 'sometimes|nullable|max:300',
                'site_id' => 'sometimes|required|exists:site,id',
            ]
        );

        $prevImageUrl = $section->image_url;

        $section->update(
            $request->all()
        );

        GeneralHelper::deleteFileIfDifferent($prevImageUrl, $section->image_url);

        return new SectionResource($section);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function destroy(Section $section)
    {
        $section->delete();

        GeneralHelper::deleteFileAndFolder($section->image_url);

        return response()->json(null, 204);
    }
}
