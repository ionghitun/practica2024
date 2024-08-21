<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function list()
    {
        return Inertia::render('Categories/List', [
            'categories' => Category::orderBy('order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Categories/AddEdit');
    }

    public function update(Category $category)
    {
        return Inertia::render('Categories/AddEdit', [
            'category' => $category,
        ]);
    }

    public function store(CategoryRequest $request, ?Category $category = null)
    {
        $request->updateOrCreate($category);

        return redirect()->route('categories.list')->with(['success' => 'Category saved.']);
    }

    public function delete(Category $category)
    {
        if ($category->products()->count()) {
            return redirect()->back()->with(['error' => 'Category contains products that are associated with it.']);
        }

        $category->delete();

        return redirect()->route('categories.list')->with(['success' => 'Category deleted.']);
    }
}
