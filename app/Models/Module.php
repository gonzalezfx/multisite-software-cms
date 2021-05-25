<?php

namespace App\Models;

use App\Casts\Html;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'module';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'content',
        'icon_url',
        'image_url',
        'listable_bonus',
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
