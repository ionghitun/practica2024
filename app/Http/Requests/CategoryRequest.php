<?php

namespace App\Http\Requests;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'order' => ['required', 'numeric'],
        ];
    }

    public function updateOrCreate(?Category $category = null): void
    {
        if (!$category) {
            $category = new Category();
        }

        $category->name = $this->get('name');
        $category->order = $this->get('order');
        $category->save();
    }
}
