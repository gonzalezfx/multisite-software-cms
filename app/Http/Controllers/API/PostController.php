<?php

namespace App\Http\Controllers\API;

use App\Helpers\GeneralHelper;
use App\Models\Post;
use App\Http\Resources\API\PostResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostController extends Controller
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

        return PostResource::collection(Post::fromSite($request->site_id)->get());
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
                'author' => 'required|max:100',
                'introduction' => 'required|max:2000',
                'content' => 'required|string',
                'image_url' => 'required|max:300',
                'site_id' => 'required|exists:site,id',
            ]
        );

        $post = Post::create(
            $request->all()
        );

        return new PostResource($post);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $this->validate(
            $request,
            [
                'title' => 'sometimes|required|max:100',
                'author' => 'sometimes|required|max:100',
                'introduction' => 'sometimes|required|max:2000',
                'content' => 'sometimes|required|string',
                'image_url' => 'sometimes|required|max:300',
                'site_id' => 'sometimes|required|exists:site,id',
            ]
        );

        $prevImageUrl = $post->image_url;

        $post->update(
            $request->all()
        );

        GeneralHelper::deleteFileIfDifferent($prevImageUrl, $post->image_url);

        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();

        GeneralHelper::deleteFileAndFolder($post->image_url);

        return response()->json(null, 204);
    }
}
