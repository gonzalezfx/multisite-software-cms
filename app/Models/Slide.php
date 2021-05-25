<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Casts\Html;

class Slide extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'slide';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_line',
        'second_line',
        'third_line',
        'image_url',
        'button_icon_url',
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
        'first_line' => Html::class,
        'second_line' => Html::class,
        'third_line' => Html::class,
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
