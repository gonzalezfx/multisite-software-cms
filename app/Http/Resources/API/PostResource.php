<?php

namespace App\Http\Resources\API;

use App\Helpers\GeneralHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'author' => $this->author,
            'introduction' => $this->introduction,
            'content' => $this->content,
            'image_url' => $this->image_url,
            'full_image_url' => GeneralHelper::getPublicUrl($this->image_url),
            'created_at' => $this->created_at,
            'site_id' => $this->site_id,
        ];
    }
}
