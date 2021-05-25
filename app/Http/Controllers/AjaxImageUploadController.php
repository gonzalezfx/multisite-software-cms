<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class AjaxImageUploadController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Save uploaded image
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function save(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'file_url' => 'required|mimes:jpeg,png,jpg,gif,svg,pdf,doc,docx|max:5000',
            ]
        );

        if ($validator->passes() && $request->file('file_url')->isValid()) {
            $image = $request->file('file_url');
            $fileContent = File::get($image);

            $uniqueFolder = date('Y/m/d/').uniqid("", true);
            $fileFolder = 'uploads/ajax/'.$uniqueFolder;
            $relativePath = $fileFolder.'/'.$image->getClientOriginalName();

            $saved = Storage::disk('public')->put($relativePath, $fileContent);

            return response()->json(
                [
                    'success' => $saved,
                    'data' => [
                        'full_url' => Storage::disk('public')->url($relativePath),
                        'relative_url' => $relativePath,
                        'name' => $image->getClientOriginalName(),
                        'extension' => $image->getClientOriginalExtension(),
                    ],
                ]
            );
        }

        return response()->json(
            [
                'error' => $validator->errors()->all(),
            ],
            400
        );
    }
}
