@extends('layouts.site', [
    'includeFacebookWidgets' => true
])
@section('content')

<div class="home-banner blog-banner top-banner rsDefault">
    <div class="rsContent">
        <div class="banner-content">
            <div class="left-container">
                <div class="html-special-content second-line">
                    {{ $post->title }}
                </div>

                <div class="html-special-content third-line">
                    {{ date('d-m-Y', strtotime($post->created_at)) }}
                    <p class="text-dark font-weight-bold mb-0">
                        {{ $post->author }}
                    </p>
                </div>
            </div>

            <div class="right-container">
                <div class="image-container">
                    <img src="{{ GeneralHelper::getPublicUrl($post->image_url) }}" />
                </div>
            </div>
        </div>
    </div>
</div>

<div class="main">
    <div class="container-fluid centered-width">
        <div class="row">
            <div class="col-lg-12 col-md-12">
                <div class="html-special-content">
                    {!! $post->content !!}
                </div>
            </div>
        </div>
    </div>
</div>

@php
    $postUrl = route('site.blog.view', [
        'site' => $currentSite->slug,
        'post' => $post->id
    ]);
@endphp

<div class="main">
    <div class="container-fluid centered-width">
        <div class="row">
            <div class="col-lg-12 col-md-12">
                <div class="d-table m-auto">
                    <p class="text-center font-weight-bold text-dark d-inline-block mr-2">
                        <span>Compartir en: </span>
                    </p>
                    <div class="fb-share-button" data-href="{{ $postUrl }}" data-layout="button_count" data-size="large">
                        <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode($postUrl) }}%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">
                            Compartir
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@include('site.callToAction', [ 'backgroundClass' => 'bg-soft-gray' ])
@endsection
