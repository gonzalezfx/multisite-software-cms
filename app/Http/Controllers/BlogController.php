<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Site;

class BlogController extends Controller
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
     * Show the post list view
     *
     * @param  \App\Models\Site $site
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Site $site)
    {
        $posts = Post::fromSite($site->id)->get();

        return view(
            'blog.index',
            [
                'posts' => $posts,
            ]
        );
    }

    /**
     * Show post detail.
     *
     * @param  \App\Models\Post $post
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function view(Site $site, Post $post)
    {
        return view(
            'blog.view',
            [ 'post' => $post ]
        );
    }
}
