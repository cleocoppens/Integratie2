<?php

use Illuminate\Database\Eloquent\Model;

class GalleryPhoto extends Model
{
    public $timestamps  = false;
    protected $fillable = ['filename', 'alt'];
}
