<?php
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    const UPDATED_AT = null;
    protected $fillable = ['author', 'location', 'stars', 'quote', 'anonymous'];
}
