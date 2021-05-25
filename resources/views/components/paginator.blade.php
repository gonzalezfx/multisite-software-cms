@if ($items->hasPages())
    <div class="list-view-paginator {{ isset($extraContainerClass) ? $extraContainerClass : '' }}">
        @php
            $nextPageUrl = $items->nextPageUrl();
            $prevPageUrl = $items->previousPageUrl();
            $lastPage = $items->lastPage();
            $lastPageToShow = min($lastPage, 6);
            $currentPage = $items->currentPage();
        @endphp

        <ul>
            <li class="prev-page {{ !$prevPageUrl ? 'disabled' : '' }}">
                <a href="{{ $prevPageUrl ?? 'javascript:;' }}">
                    <span class="svg-icon">
                        @php include(public_path('img/arrow-left.svg')) @endphp
                    </span>
                </a>
            </li>

            @for ($pageCounter=1; $pageCounter <= $lastPageToShow; $pageCounter++)
                <li class="{{ $pageCounter == $currentPage ? 'selected' : '' }}">
                    <a href="{{ $items->url($pageCounter) }}">{{ $pageCounter }}</a>
                </li>
            @endfor

            @if ($lastPage > $lastPageToShow)
                <li class="disabled">
                    ...
                </li>

                <li>
                    <a href="{{ $items->url($lastPage) }}">{{ $lastPage }}</a>
                </li>
            @endif

            <li class="next-page {{ !$nextPageUrl ? 'disabled' : '' }}">
                <a href="{{ $nextPageUrl ?? 'javascript:;' }}">
                    <span class="svg-icon">
                        @php include(public_path('img/arrow-right.svg')) @endphp
                    </span>
                </a>
            </li>
        </ul>
    </div>
@endif
