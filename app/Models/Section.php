<?php

namespace App\Models;

use App\Casts\Html;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    const ALIGNMENT_TYPE_LEFT = 1;
    const ALIGNMENT_TYPE_CENTER = 2;
    const ALIGNMENT_TYPE_RIGHT = 3;

    const BACKGROUND_TYPE_WHITE = 1;
    const BACKGROUND_TYPE_SOFT_GRAY = 2;
    const BACKGROUND_TYPE_BRAND_COLOR = 3;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'section';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'content',
        'image_url',
        'alignment_type',
        'background_type',
        'listable_bonus',
        'button_label',
        'button_url',
        'site_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'listable_bonus' => 'array',
        'content' => Html::class,
    ];

    /**
     * Scope a query to only include only from specific site
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int|null $siteId
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFromSite($query, $siteId)
    {
        if ($siteId) {
            return $query->where('site_id', $siteId);
        }
         return $query;
    }
}
