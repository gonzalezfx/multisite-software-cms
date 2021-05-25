@extends('layouts.site') @section('content')

<div class="main mb-5">
    <div class="container-fluid centered-width">
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <h1 class="text-center">
                    Módulos
                </h1>
            </div>
        </div>
    </div>
</div>

@php
    $lastBackgroundColor = \App\Models\Section::BACKGROUND_TYPE_WHITE;
@endphp

@foreach ($modules as $module)
    @php
        $lastBackgroundColor = GeneralHelper::getNextBackgroundColor($lastBackgroundColor);
    @endphp

    <div class="main module-item-section {{ $lastBackgroundColor == \App\Models\Section::BACKGROUND_TYPE_SOFT_GRAY ? 'bg-soft-gray' : '' }}">
        <div class="container-fluid centered-width">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="module-icon">
                        <span class="svg-icon">
                            @if (Storage::disk('public')->exists($module->icon_url))
                                @php
                                    echo Storage::disk('public')->get($module->icon_url)
                                @endphp
                            @endif
                        </span>
                    </div>
                    <h3 class="text-center">
                        {{ $module->name }}
                    </h3>

                    <div class="text-center html-special-content">
                        {!! $module->content !!}
                    </div>

                    @if ($module->listable_bonus)
                        <ul class="bonus-list cards-list mt-4">
                            @foreach ($module->listable_bonus as $bonus)
                            <li>
                                <span>
                                    {{ $bonus }}
                                </span>
                            </li>
                            @endforeach
                        </ul>
                    @endif

                    @if (!empty($module->image_url))
                        <div class="image-container mt-5 d-table centered-image">
                            <img src="{{ GeneralHelper::getPublicUrl($module->image_url) }}" />
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
    'backgroundClass' => $lastBackgroundColor == \App\Models\Section::BACKGROUND_TYPE_SOFT_GRAY ? 'bg-soft-gray' : ''
])

@endsection
