<?php

namespace App\Http\Resources\API;

use App\Helpers\GeneralHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class SiteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'show_in_home' => $this->show_in_home,
            'logo_url' => $this->logo_url,
            'full_logo_url' => GeneralHelper::getPublicUrl($this->logo_url),
            'contact_email' => $this->contact_email,
            'chat_facebook' => $this->chat_facebook,
            'chat_whatsapp' => $this->chat_whatsapp,
            'facebook_url' => GeneralHelper::getUrlWithHttp($this->facebook_url),
            'linkedin_url' => GeneralHelper::getUrlWithHttp($this->linkedin_url),
            'youtube_url' => GeneralHelper::getUrlWithHttp($this->youtube_url),
            'call_to_action_title' => $this->call_to_action_title,
            'call_to_action_text' => $this->call_to_action_text,
            'call_to_action_button_label' => $this->call_to_action_button_label,
            'call_to_action_button_url' => GeneralHelper::getUrlWithHttp($this->call_to_action_button_url),
            'software_url' => GeneralHelper::getUrlWithHttp($this->software_url),
            'software_guides_url' => GeneralHelper::getUrlWithHttp($this->software_guides_url),
        ];
    }
}
