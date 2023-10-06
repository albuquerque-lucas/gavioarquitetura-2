<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'area', 
        'year',
        'address',
        'image_url',
        'category_id',
        'active_carousel',
    ];

    public function images()
    {
        return $this->hasMany(ProjectImage::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
