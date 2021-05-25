@component('mail::message')
## Nuevo contacto en página web {{ $site->name }}

@component('mail::panel')
Nombre: {{ $request->name }}

Email: {{ $request->email }}

Teléfono: {{ $request->has('phone') ? $request->phone : ''}}

Comentarios: {{ $request->has('description') ? $request->description : ''}}

@endcomponent

@endcomponent
