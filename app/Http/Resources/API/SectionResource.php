<?php

namespace App\Http\Resources\API;

use App\Helpers\GeneralHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class SectionResource extends JsonResource
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
            'title' => $this->title,
            'content' => $this->content,
            'image_url' => $this->image_url,
            'full_image_url' => GeneralHelper::getPublicUrl($this->image_url),
            'alignment_type' => $this->alignment_type,
            'background_type' => $this->background_type,
            'listable_bonus' => $this->listable_bonus,
            'button_label' => $this->button_label,
            'button_url' => GeneralHelper::getUrlWithHttp($this->button_url),
            'site_id' => $this->site_id,
        ];
    }
}
