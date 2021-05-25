@extends('layouts.site') @section('content')

<div class="main">
    <div class="container-fluid centered-width">
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <h1 class="text-center">
                    Contacto
                </h1>

                <p class="text-center">
                    Por favor rellene el siguiente formulario con su información
                </p>

                @include('site.contactForm')
            </div>
        </div>
    </div>
</div>

@endsection
