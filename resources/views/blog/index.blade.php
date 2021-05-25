@extends('layouts.site') @section('content')

<div class="main">
    <div class="container-fluid centered-width">
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <h1 class="text-center">
                    Blog
                </h1>
            </div>
        </div>
    </div>
</div>

@php
    $lastBackgroundColor = \App\Models\Section::BACKGROUND_TYPE_WHITE;
    $lastIsLeft = false;
@endphp

@foreach ($posts as $post)
    @php
        $lastBackgroundColor = GeneralHelper::getNextBackgroundColor($lastBackgroundColor);
    @endphp

<div class="main {{ $lastBackgroundColor == \App\Models\Section::BACKGROUND_TYPE_SOFT_GRAY ? 'bg-soft-gray' : '' }}">
    <div class="container-fluid centered-width">
        <div class="row">
            <div class="col-lg-6 col-md-12 {{ $lastIsLeft ? 'order-last' : 'order-first' }}">
                <div class="image-container">
                    <img src="{{ GeneralHelper::getPublicUrl($post->image_url) }}" style="width: 100%" />
                </div>
            </div>

            <div class="col-lg-6 col-md-12 mt-md-4 {{ $lastIsLeft ? 'order-first' : 'order-last' }}">
                <h2>{{ $post->title }}</h2>

                <div class="html-special-content mt-2">
                    {{ $post->introduction }}
                </div>

                <a class="btn btn-primary mt-3 ml-auto mr-auto d-table d-lg-inline-block"
                   href="{{ route('site.blog.view', ['site' => $currentSite->slug, 'post' => $post->id]) }}">
                    Leer mas...
                </a>
            </div>
        </div>
    </div>
</div>
@endforeach

@php
    $lastBackgroundColor = GeneralHelper::getNextBackgroundColor($lastBackgroundColor);
@endphp

@include('site.callToAction', [
    'backgroundClass' => $lastBackgroundColor == \App\Models\Section::BACKGROUND_TYPE_SOFT_GRAY ? 'bg-soft-gray' : ''
])

@endsection
