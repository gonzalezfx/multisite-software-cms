@extends('layouts.site') @section('content')

<div class="main">
    <div class="container-fluid centered-width">
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <h1 class="text-center">
                    Soporte
                </h1>
            </div>
        </div>
    </div>
</div>

@if(false && !empty($currentSite->software_guides_url))
<div class="main bg-soft-gray">
    <div class="container-fluid centered-width">
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <h2 class="text-center">
                    Manuales de usuario
                </h2>

                <div class="text-center html-special-content">
                    <p class="mb-1">
                        En el siguiente enlace podrás encontrar los manuales de
                        usuario para el uso de MyApp.
                    </p>
                    <p>
                        Para visualizar los manuales necesitarás ingresar con
                        tus datos de acceso de tu cuenta.
                    </p>
                </div>

                <a href="{{ GeneralHelper::getUrlWithHttp($currentSite->software_guides_url) }}" class="btn btn-primary centered-btn mt-3">
                    Ir a Manuales de Usuario
                </a>
            </div>
        </div>
    </div>
</div>
@endif

<div class="main">
    <div class="container-fluid centered-width">
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="text-center html-special-content">
                    {!! $supportPoliciesPage->introduction !!}
                </div>

                <a class="btn btn-primary centered-btn mt-3"
                   href="{{ route('site.supportPolicies', ['site' => $currentSite->slug]) }}">Ir a Políticas de
                    Soporte</a>
            </div>
        </div>
    </div>
</div>
@endsection
