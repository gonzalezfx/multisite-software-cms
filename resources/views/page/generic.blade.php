@extends('layouts.site')

@section('content')

<div class="main">

    <div class="container-fluid centered-width">

        <div class="row">

            <div class="col-md-12 col-sm-12 col-xs-12">

                <h2 class="text-center">{{ $page->title }}</h2>

                <div class="html-special-content mt-5">
                    {!! $page->content !!}
                </div>
            </div>

        </div>

    </div>

</div>

@include('site.callToAction', [
    'backgroundClass' => 'bg-soft-gray'
])

@endsection
