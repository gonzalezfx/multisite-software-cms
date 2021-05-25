<?php

namespace App\Mail;

use App\Models\Site;
use Illuminate\Bus\Queueable;
use Illuminate\Http\Request;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Contact extends Mailable
{
    use Queueable, SerializesModels;

    public $request;

    public $site;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Request $request, Site $site)
    {
        $this->request = $request;
        $this->site = $site;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('[Proces '.$this->site->name.'] Nuevo contacto de página web')
            ->markdown('email.site.contact');
    }
}
