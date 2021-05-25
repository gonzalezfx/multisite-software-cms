<?php

namespace App\Http\Resources\API;

use App\Helpers\GeneralHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class ModuleResource extends JsonResource
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
            'content' => $this->content,
            'icon_url' => $this->icon_url,
            'full_icon_url' => GeneralHelper::getPublicUrl($this->icon_url),
            'image_url' => $this->image_url,
            'full_image_url' => GeneralHelper::getPublicUrl($this->image_url),
            'listable_bonus' => $this->listable_bonus,
            'site_id' => $this->site_id,
        ];
    }
}
