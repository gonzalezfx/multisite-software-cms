<div class="contact-form-container">
    @if(Session::has('success'))
        <div class="alert alert-success">
            {{ Session::get('success') }}
            @php Session::forget('success'); @endphp
        </div>
    @else

    @if ($errors->first('general'))
        <div class="alert alert-danger">
            {{ $errors->first('general') }}
        </div>
    @endif

    <form
        method="POST"
        action="{{ route('site.sendContact', ['site' => $currentSite->slug]) }}"
        class="disable-on-submit mt-5"
    >
        @csrf

        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <label for="name">Nombre</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Ingrese su nombre"
                    value="{{ old('name') }}"
                />
                @error('name')
                <span class="text-danger">{{ $message }}</span>
                @endif
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
                <label for="email">Correo</label>
                <input
                    type="text"
                    name="email"
                    placeholder="Ingrese un correo"
                    value="{{ old('email') }}"
                />
                @error('email')
                <span class="text-danger">{{ $message }}</span>
                @endif
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
                <label for="phone">Teléfono</label>
                <input
                    type="text"
                    name="phone"
                    placeholder="Ingrese un teléfono"
                    value="{{ old('phone') }}"
                />
                @error('phone')
                <span class="text-danger">{{ $message }}</span>
                @endif
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <label for="description">
                    Comentarios
                </label>
                <textarea
                    name="description"
                    value="{{ old('description') }}"
                ></textarea>
                @error('description')
                <span class="text-danger">{{ $message }}</span>
                @endif
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <button type="submit" class="btn btn-primary submit-block-btn">
                    <div class="svg-icon">
                        @php include(public_path('img/send-email-icon.svg'))
                        @endphp
                    </div>
                    Enviar
                </button>
            </div>
        </div>
    </form>
    @endif
</div>
