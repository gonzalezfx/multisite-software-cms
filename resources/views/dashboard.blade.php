@extends('layouts.admin')

@section('content')
    <div id="app" base-url="{{ url('/') }}" admin-base-uri="{{ $adminBaseURI }}">
    </div>
@endsection
