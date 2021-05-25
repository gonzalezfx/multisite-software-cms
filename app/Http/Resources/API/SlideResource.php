<?php

namespace App\Http\Resources\API;

use App\Helpers\GeneralHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class SlideResource extends JsonResource
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
            'first_line' => $this->first_line,
            'second_line' => $this->second_line,
            'third_line' => $this->third_line,
            'image_url' => $this->image_url,
            'full_image_url' => GeneralHelper::getPublicUrl($this->image_url),
            'button_icon_url' => $this->button_icon_url,
            'full_button_icon_url' => GeneralHelper::getPublicUrl($this->button_icon_url),
            'button_label' => $this->button_label,
            'button_url' => GeneralHelper::getUrlWithHttp($this->button_url),
            'site_id' => $this->site_id,
        ];
    }
}
