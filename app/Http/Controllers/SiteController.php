<?php

namespace App\Http\Controllers;

use App\Helpers\GeneralHelper;
use App\Mail\Contact;
use App\Models\Module;
use App\Models\Page;
use App\Models\Property;
use App\Models\Section;
use App\Models\Site;
use App\Models\Slide;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SiteController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Show the site main page
     * @param  \App\Models\Site $site
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Site $site)
    {
        $slides = Slide::fromSite($site->id)->get();
        $sections = Section::fromSite($site->id)->get();
        $testimonials = Testimonial::fromSite($site->id)->get();

        return view(
            'site/index',
            [
                'slides' => $slides,
                'sections' => $sections,
                'testimonials' => $testimonials,
            ]
        );
    }

    /**
     * Show the site modules page
     *
     * @param  \App\Models\Site $site
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function modules(Site $site)
    {
        $modules = Module::fromSite($site->id)->get();

        return view(
            'site/modules',
            [
                'modules' => $modules,
            ]
        );
    }

    /**
     * Show the site modules page
     *
     * @param  \App\Models\Site $site
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function helpAndSupport(Site $site)
    {
        $supportPoliciesPage = Page::fromSite($site->id)->where('keyword', 'support_policies')->first();

        return view(
            'site/helpAndSupport',
            [
                'supportPoliciesPage' => $supportPoliciesPage,
            ]
        );
    }

    /**
     * Show Contact page
     *
     * @param  \App\Models\Site $site
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function contact(Site $site)
    {
        return view('site.contact');
    }

    /**
     * Send Contact email
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Site $site
     * @return \Illuminate\Http\Response
     */
    public function sendContact(Request $request, Site $site)
    {
        $request->validate(
            [
                'name' => 'required:min:2',
                'email' => 'required|email',
                'phone' => 'required|max:14',
                'description' => 'required|max:500',
            ],
            [
                'min' => 'Debe ingresar al menos :min caracteres',
                'max' => 'No puede contener más de :max caracteres',
                'required' => 'Este campo es obligatorio',
                'email' => 'Debe ingresar un correo válido',
            ]
        );

        if (!empty($site->contact_email)) {
            Mail::to($site->contact_email)->send(new Contact($request, $site));

            $responseMessage = 'Mensaje enviado exitosamente. Gracias por contactarnos '.$request->name.', en breve ';
            $responseMessage .= 'nos pondremos en contacto.';

            return redirect()->route('site.contact', [ 'site' => $site->slug ])->with('success', $responseMessage);
        } else {
            return back()->withErrors(
                [
                    'general' => 'Lo sentimos, ocurrió un error interno.',
                ]
            );
        }
    }
}
