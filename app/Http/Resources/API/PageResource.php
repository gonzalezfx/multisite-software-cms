<?php

namespace App\Http\Resources\API;

use App\Helpers\GeneralHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
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
            'introduction' => $this->introduction,
            'content' => $this->content,
            'image_url' => $this->image_url,
            'full_image_url' => GeneralHelper::getPublicUrl($this->image_url),
            'site_id' => $this->site_id,
        ];
    }
}
