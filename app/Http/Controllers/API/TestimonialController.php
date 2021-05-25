<?php

namespace App\Http\Controllers\API;

use App\Helpers\GeneralHelper;
use App\Models\Testimonial;
use App\Http\Resources\API\TestimonialResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TestimonialController extends Controller
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

        return TestimonialResource::collection(Testimonial::fromSite($request->site_id)->get());
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
                'company_name' => 'required|max:100',
                'description' => 'required|max:2000',
                'logo_url' => 'required|max:300',
                'site_id' => 'required|exists:site,id',
            ]
        );

        $testimonial = Testimonial::create(
            $request->all()
        );

        return new TestimonialResource($testimonial);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\Response
     */
    public function show(Testimonial $testimonial)
    {
        return new TestimonialResource($testimonial);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Testimonial $testimonial)
    {
        $this->validate(
            $request,
            [
                'company_name' => 'sometimes|required|max:100',
                'description' => 'sometimes|required|max:2000',
                'logo_url' => 'sometimes|required|max:300',
                'site_id' => 'sometimes|required|exists:site,id',
            ]
        );

        $prevImageUrl = $testimonial->logo_url;

        $testimonial->update(
            $request->all()
        );

        GeneralHelper::deleteFileIfDifferent($prevImageUrl, $testimonial->logo_url);

        return new TestimonialResource($testimonial);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\Response
     */
    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        GeneralHelper::deleteFileAndFolder($testimonial->logo_url);

        return response()->json(null, 204);
    }
}
