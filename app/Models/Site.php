<?php

namespace App\Models;

use App\Casts\Html;
use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'site';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'show_in_home',
        'logo_url',
        'contact_email',
        'chat_facebook',
        'chat_whatsapp',
        'facebook_url',
        'linkedin_url',
        'youtube_url',
        'call_to_action_title',
        'call_to_action_text',
        'call_to_action_button_label',
        'call_to_action_button_url',
        'software_url',
        'software_guides_url',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'show_in_home' => 'boolean',
        'call_to_action_text' => Html::class,
    ];
}
