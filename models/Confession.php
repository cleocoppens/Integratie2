<?php

use Illuminate\Database\Eloquent\Model;

class Confession extends Model
{
    protected $fillable = ['location', 'content', 'recognition_count'];
}
