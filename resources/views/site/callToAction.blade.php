@if (!empty($currentSite->call_to_action_title) ||
!empty($currentSite->call_to_action_text))
<div class="main {{ isset($backgroundClass) ? $backgroundClass : '' }}">
    <div class="container-fluid centered-width">
        <div class="html-special-content text-center">
            <h2>{{ $currentSite->call_to_action_title }}</h2>
            <div class="html-special-content">
                {!! $currentSite->call_to_action_text !!}
            </div>
        </div>

        @if (!empty($currentSite->call_to_action_button_label) &&
        !empty($currentSite->call_to_action_button_url))
        <a
            href="{{ $currentSite->call_to_action_button_url }}"
            class="btn btn-primary centered-btn mt-4"
        >
            <span class="svg-icon">
                @php include(public_path('img/send-email-icon.svg')) @endphp
            </span>
            <span>
                {{$currentSite->call_to_action_button_label}}
            </span>
        </a>
        @endif
    </div>
</div>
@endif
