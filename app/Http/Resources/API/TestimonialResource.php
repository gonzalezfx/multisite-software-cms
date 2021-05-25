<?php

namespace App\Http\Resources\API;

use App\Helpers\GeneralHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
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
            'company_name' => $this->company_name,
            'description' => $this->description,
            'logo_url' => $this->logo_url,
            'full_logo_url' => GeneralHelper::getPublicUrl($this->logo_url),
            'site_id' => $this->site_id,
        ];
    }
}
