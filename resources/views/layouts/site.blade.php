<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <meta name="base-url" content="{{ url('/') }}" />

    <title>{{ config('app.name', '') }}</title>

    <link type="image/x-icon" rel="icon" href="{{ asset('img/favicon.png') }}" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,400;0,700;1,100;1,400;1,700&display=swap"
          rel="stylesheet" />

    <!-- Styles -->
    <link href="{{ mix('css/site.css') }}" rel="stylesheet" />
</head>

@php $isHome = Request::routeIs('site.home'); $finalBodyClass = $isHome ?
'is-home' : ''; $finalBodyClass .= !empty($finalBodyClass) ? ' ' : '';
$finalBodyClass .= isset($extraBodyClass) ? $extraBodyClass : ''; @endphp

<body class="{{ $finalBodyClass }}">
    <div class="ajax-loader">
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>

    <div class="header-wrapper">
        <div class="top-bar">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <ul class="social-list">
                            @if ($currentSite && !empty($currentSite->facebook_url))
                            <li>
                                <a href="{{ $currentSite->facebook_url }}">
                                    <span class="svg-icon">
                                        @php
                                        include(public_path('img/facebook-icon.svg'))
                                        @endphp
                                    </span>
                                </a>
                            </li>
                            @endif

                            @if ($currentSite && !empty($currentSite->linkedin_url))
                            <li>
                                <a href="{{ $currentSite->linkedin_url }}">
                                    <span class="svg-icon">
                                        @php
                                        include(public_path('img/linkedin-icon.svg'))
                                        @endphp
                                    </span>
                                </a>
                            </li>
                            @endif

                            @if ($currentSite && !empty($currentSite->youtube_url))
                            <li>
                                <a href="{{ $currentSite->youtube_url }}">
                                    <span class="svg-icon">
                                        @php
                                        include(public_path('img/youtube-icon.svg'))
                                        @endphp
                                    </span>
                                </a>
                            </li>
                            @endif
                        </ul>
                    </div>

                    <div class="col-md-6 col-sm-6 col-xs-12 align-items-center d-flex justify-content-end">
                        <ul class="fast-access-menu">
                            @if ($currentSite)
                            <li>
                                <a href="{{
                                            route('site.helpAndSupport', ['site' => $currentSite->slug])
                                        }}">
                                    <span class="svg-icon">
                                        @php
                                        include(public_path('img/support-icon.svg'))
                                        @endphp
                                    </span>
                                    <span>
                                        Soporte
                                    </span>
                                </a>
                            </li>
                            @endif

                            @if ($currentSite)
                            <li>
                                <a href="{{ GeneralHelper::getUrlWithHttp($currentSite->software_url) }}">
                                    <span class="svg-icon">
                                        @php
                                        include(public_path('img/login-icon.svg'))
                                        @endphp
                                    </span>
                                    <span>
                                        Acceder
                                    </span>
                                </a>
                            </li>
                            @endif
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <header class="main-header">
            <div class="container-fluid">
                <div class="row">
                    <div class="container-logo col-lg-3 col-md-3 col-sm-12 col-xs-12 d-flex align-items-center">
                        <a class="header-logo"
                           href="{{ $currentSite ? route('site.home', ['site' => $currentSite->slug]) : route('home') }}">
                            @if ($currentSite)
                                @if (Storage::disk('public')->exists($currentSite->logo_url))
                                    @php
                                        echo Storage::disk('public')->get($currentSite->logo_url)
                                    @endphp
                                @endif
                            @else
                                @php
                                    include(public_path('img/logo.svg'))
                                @endphp
                            @endif
                        </a>
                    </div>

                    <div class="col-lg-7 col-md-5 col-sm-12 col-xs-12 align-items-center d-flex justify-content-end order-lg-2 order-md-3">
                        @if ($currentSite)
                        <nav class="header-menu">
                            <ul>
                                <li class="{{ $isHome ? 'active' : '' }}">
                                    <a href="{{ route('site.home', ['site' => $currentSite->slug]) }}">Inicio</a>
                                </li>
                                <li class="{{ Request::routeIs('site.modules') ? 'active' : '' }}">
                                    <a href="{{ route('site.modules', ['site' => $currentSite->slug]) }}">Módulos</a>
                                </li>
                                <li class="{{ Request::routeIs('site.blog.index') || Request::routeIs('site.blog.view') ? 'active' : '' }}">
                                    <a href="{{ route('site.blog.index', ['site' => $currentSite->slug]) }}">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        @endif
                    </div>

                    <div class="col-lg-2 col-md-9 col-sm-12 col-xs-12 d-flex align-items-center justify-content-end order-lg-3 order-md-2">
                        @if ($currentSite)
                        <a class="btn btn-primary contact-btn"
                           href="{{ route('site.contact', ['site' => $currentSite->slug]) }}">
                            Contáctanos
                        </a>
                        @endif
                    </div>
                </div>
            </div>

            <div class="menu-trigger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
        <!--.main-header-->
    </div>
    <!--.header-wrapper-->

    <main class="wrapper">
        @yield('content')
    </main>

    <div class="main footer-wrapper" id="footer">
        <div class="container-fluid footer centered-width">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <a href="{{ $currentSite ? route('site.home', ['site' => $currentSite->slug]) : route('home') }}"
                       class="footer-logo centered-image d-table">
                        @if ($currentSite)
                            @if (Storage::disk('public')->exists($currentSite->logo_url))
                                @php
                                    echo Storage::disk('public')->get($currentSite->logo_url)
                                @endphp
                            @endif
                        @else
                            @php include(public_path('img/logo.svg')) @endphp
                        @endif
                    </a>
                </div>
            </div>
        </div>

        <div class="container-fluid subfooter">
            <div class="row">
                <div class="col-lg-12">
                    <p class="text-center">
                        {{ config('app.name', '') }}&copy; {{ date('Y') }} Todos los
                        derechos reservados.
                    </p>

                    <ul class="subfooter-info">
                        <li>
                            <a href="{{ route('site.privacyPolicies', ['site' => $currentSite->slug]) }}">Políticas de
                                privacidad</a>
                        </li>
                        <li>
                            <a href="{{ route('site.termsAndConditions', ['site' => $currentSite->slug]) }}">Términos y
                                condiciones</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    @if (!empty($aditionalScripts))
        @foreach($aditionalScripts as $scriptUrl)
            <script src="{{ $scriptUrl }}"></script>
        @endforeach
    @endif

    <script src="{{ mix('js/site.js') }}" defer></script>

    @if (isset($currentSite) && (!empty($currentSite->chat_whatsapp) || !empty($currentSite->chat_facebook)))
        @php
            $whatsAppString = '';
            $facebookString = '';

            if (!empty($currentSite->chat_whatsapp)) {
                $whatsAppString = $currentSite->chat_whatsapp;
            }
            if (!empty($currentSite->chat_facebook)) {
                $facebookString = $currentSite->chat_facebook;
            }
        @endphp

        <!-- GetButton.io widget -->
        <script type="text/javascript">
            (function() {
                    var options = {
                        whatsapp: '{{ $whatsAppString }}',
                        facebook: '{{ $facebookString }}',
                        call_to_action: 'Escríbenos', // Call to action
                        position: 'right', // Position may be 'right' or 'left'
                    };
                    var proto = document.location.protocol,
                        host = 'getbutton.io',
                        url = proto + '//static.' + host;
                    var s = document.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = url + '/widget-send-button/js/init.js';
                    s.onload = function() {
                        WhWidgetSendButton.init(host, proto, options);
                    };
                    var x = document.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s, x);
                })();
        </script>
        <!-- /GetButton.io widget -->
    @endif

    <!-- Facebook Widgets Script -->
    @if (isset($includeFacebookWidgets))
        <div id="fb-root"></div>
        <script async defer crossorigin="anonymous" src="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v10.0" nonce="k1HH5KZ1"></script>
    @endif
</body>

</html>
