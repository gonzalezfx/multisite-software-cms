@extends('layouts.site', [ 'extraBodyClass' => 'with-banner' ])
@section('content')

<div class="home-banner top-banner rsDefault">
    @foreach ($slides as $slide)
    <div class="rsContent">
        <div class="banner-content">
            <div class="left-container">
                <div class="html-special-content first-line">
                    {{ $slide->first_line }}
                </div>

                <div class="html-special-content second-line">
                    {{ $slide->second_line }}
                </div>

                <div class="html-special-content third-line">
                    {{ $slide->third_line }}
                </div>

                @if (!empty($slide->button_url) && !empty($slide->button_label))
                <div class="banner-button">
                    <a href="{{ GeneralHelper::getUrlWithHttp($slide->button_url) }}" class="{{ GeneralHelper::isYoutubeUrl($slide->button_url) ? 'fancybox-trigger iframe' : '' }}">
                        @if (!empty($slide->button_icon_url))
                            <span class="svg-icon">
                                @if (Storage::disk('public')->exists($slide->button_icon_url))
                                    @php
                                        echo Storage::disk('public')->get($slide->button_icon_url)
                                    @endphp
                                @endif
                            </span>
                        @endif
                        {{ $slide->button_label }}
                    </a>
                </div>
                @endif
            </div>

            <div class="right-container">
                <div class="image-container">
                    <img src="{{ GeneralHelper::getPublicUrl($slide->image_url) }}" />
                </div>
            </div>
        </div>
    </div>
    @endforeach
</div>

@php
    $lastBackgroundColor = \App\Models\Section::BACKGROUND_TYPE_WHITE;
@endphp

@foreach ($sections as $section)
    @php
        $isCentered = $section->alignment_type == \App\Models\Section::ALIGNMENT_TYPE_CENTER;
        $isRight = $section->alignment_type == \App\Models\Section::ALIGNMENT_TYPE_RIGHT;
        $isLeft = $section->alignment_type == \App\Models\Section::ALIGNMENT_TYPE_LEFT;
        $lastBackgroundColor = $section->background_type;
    @endphp

    <div class="main {{ $lastBackgroundColor == \App\Models\Section::BACKGROUND_TYPE_SOFT_GRAY ? 'bg-soft-gray' : '' }}">
        <div class="container-fluid centered-width">
            <div class="row">
                <div class="col-lg-{{ $isCentered ? '12' : '6' }} col-md-12 {{ $isLeft ? 'order-lg-last order-xl-last' : 'order-lg-first order-xl-first' }}">
                    <h2 class="{{
                            $isCentered ? 'text-center' : 'text-lg-left text-md-center'
                        }} secondary-font-family">
                        {{ $section->title }}
                    </h2>

                    @if ($section->content)
                        <div class="html-special-content {{
                                $isCentered ? 'text-center' : 'text-lg-left text-md-center'
                            }}">
                            {!! $section->content !!}
                        </div>
                    @endif

                    @if ($section->listable_bonus)
                        <ul class="bonus-list {{ $isCentered ? 'cards-list' : 'mt-3' }}">
                            @foreach ($section->listable_bonus as $bonus)
                            <li>
                                <span>
                                    {{ $bonus }}
                                </span>
                            </li>
                            @endforeach
                        </ul>
                    @endif

                    @if (!$isCentered)
                        </div>

                        <div class="col-lg-6 col-md-12 {{ $isLeft ? 'order-lg-first order-xl-first' : 'order-lg-last order-xl-last' }}">
                    @endif

                    @if (!empty($section->image_url))
                        <div class="image-container {{ $isCentered ? 'mt-5 d-table centered-image' : '' }}">
                            <img src="{{ GeneralHelper::getPublicUrl($section->image_url) }}" />
                        </div>
                    @endif

                </div>
            </div>
        </div>
    </div>
@endforeach

@php
    $lastBackgroundColor = GeneralHelper::getNextBackgroundColor($lastBackgroundColor);
@endphp

@include('site.callToAction', [
    'backgroundClass' => $lastBackgroundColor == \App\Models\Section::BACKGROUND_TYPE_SOFT_GRAY ? 'bg-soft-gray' : '',
])

@php
    $lastBackgroundColor = GeneralHelper::getNextBackgroundColor($lastBackgroundColor);
@endphp

<div class="main {{ $lastBackgroundColor == \App\Models\Section::BACKGROUND_TYPE_SOFT_GRAY ? 'bg-soft-gray' : '' }}">
    <div class="container-fluid centered-width">
        <div class="row">
            <div class="col-lg-12 col-md-12">
                <h2 class="text-center">Testimonios</h2>

                <div class="gallery-widget mt-4">
                    <div class="gallery-items-list testimonials-list">
                        @foreach ($testimonials as $testimonial)
                            <div class="gallery-item">
                                <div class="testimonial-item">
                                    @if (!empty($testimonial->logo_url))
                                    <div class="image-container rounded-circle mb-3">
                                        <img src="{{ GeneralHelper::getPublicUrl($testimonial->logo_url) }}" />
                                    </div>
                                    @endif

                                    <p class="text-center text-brand-color font-weight-bold">
                                        {{ $testimonial->company_name }}
                                    </p>
                                    <p class="text-center testimonial-description">
                                        {!! $testimonial->description !!}
                                    </p>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="main">
    <div class="container-fluid centered-width">
        <h2 class="text-center secondary-font-family">
            Contáctanos
        </h2>

        <p class="text-center">
            Por favor rellene el siguiente formulario con su información
        </p>

        @include('site.contactForm')
    </div>
</div>

@endsection
