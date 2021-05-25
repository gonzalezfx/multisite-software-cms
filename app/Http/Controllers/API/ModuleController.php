<?php

namespace App\Http\Controllers\API;

use App\Helpers\GeneralHelper;
use App\Models\Module;
use App\Http\Resources\API\ModuleResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ModuleController extends Controller
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

        return ModuleResource::collection(Module::fromSite($request->site_id)->get());
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
                'name' => 'required|max:100',
                'content' => 'nullable|string',
                'icon_url' => 'nullable|max:300',
                'listable_bonus' => 'nullable|array',
                'listable_bonus.*' => 'nullable|max:300',
                'image_url' => 'nullable|max:300',
                'site_id' => 'required|exists:site,id',
            ]
        );

        $module = Module::create(
            $request->all()
        );

        return new ModuleResource($module);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Module  $module
     * @return \Illuminate\Http\Response
     */
    public function show(Module $module)
    {
        return new ModuleResource($module);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Module  $module
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Module $module)
    {
        $this->validate(
            $request,
            [
                'name' => 'sometimes|required|max:100',
                'content' => 'sometimes|nullable|max:6000',
                'icon_url' => 'sometimes|nullable|max:300',
                'image_url' => 'sometimes|nullable|max:300',
                'listable_bonus' => 'sometimes|nullable|array',
                'listable_bonus.*' => 'sometimes|nullable|max:300',
                'site_id' => 'sometimes|required|exists:site,id',
            ]
        );

        $prevImageUrl = $module->icon_url;

        $module->update(
            $request->all()
        );

        GeneralHelper::deleteFileIfDifferent($prevImageUrl, $module->icon_url);

        return new ModuleResource($module);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Module  $module
     * @return \Illuminate\Http\Response
     */
    public function destroy(Module $module)
    {
        $module->delete();

        GeneralHelper::deleteFileAndFolder($module->icon_url);

        return response()->json(null, 204);
    }
}
